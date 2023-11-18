import pymongo
from pymongo import MongoClient
from gridfs import GridFS
from bson.objectid import ObjectId
import io
import fitz  # PyMuPDF
import openai
import requests
import re
import monitus_server
from concurrent.futures import ThreadPoolExecutor




def the_ai():
    if pdf_content:
        # Open the PDF content directly using fitz
        doc = fitz.open(stream=io.BytesIO(pdf_content))
        all_text = ""
        for page in doc:
                all_text += page.get_text() + chr(12)
        # Perform actions with the doc object as needed
        # (e.g., extract text, perform analysis, etc.)

        # Close the document when done
        doc.close()
    else:
        print("PDF content not found.")



    ##SUMMARIZER    
    client = openai.OpenAI(
        # defaults to os.environ.get("OPENAI_API_KEY")
        api_key="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",
    )

    chat_completion = client.chat.completions.create(
        messages=[
            {
                "role": "system", "content" : "You are ChatGPT, a large language model that is trained to accept a patient's health record and return a summary specific details about this person in the format: current mediations names only||age,gender,known medical conditions and previous injuries,has allergies. End the sentence with ||. Also list it all out in 1 sentence comma seperated\nKnowledge cutoff: 2021-09-01\nCurrent date: 2023-03-02"},{"role": "user", "content" : all_text
            }
        ],
        model="gpt-3.5-turbo",
        max_tokens=100,
    )
    print(chat_completion.choices[0].message.content)
    result=chat_completion.choices[0].message.content

    input_text=result
    # Extract medicine names until the '||' delimiter
    medicine_names = input_text.split('||')[0]

    # Remove leading and trailing whitespaces
    medicine_names = medicine_names.strip()

    # Remove all spaces
    medicine_names = medicine_names.replace(" ", "")


    ##GENERATING DRUG DRUG INTERACTIONS
    resulting_list = medicine_names.split(",")
    rxcui_list = ""

    for drug_name in resulting_list:
        api_url = "https://rxnav.nlm.nih.gov/REST/drugs.json?name=" + drug_name
        response = requests.get(api_url)

        try:
            rxcui = response.json()['drugGroup']['conceptGroup'][1]['conceptProperties'][1]['rxcui']
        except KeyError:
            # If the primary path is not available, try an alternative path
            try:
                rxcui = response.json()['drugGroup']['conceptGroup'][2]['conceptProperties'][1]['rxcui']
            except KeyError:
                rxcui = "RxCUI not found"

        print(rxcui)
        rxcui_list = rxcui_list + rxcui + "+"
    rxcui_list = rxcui_list[:-1]
    print(rxcui_list)

    api_url = "https://rxnav.nlm.nih.gov/REST/interaction/list.json?rxcuis=" + rxcui_list
    response = requests.get(api_url)
    if response.status_code == 200:
        data = response.json()

        # Extracting and printing ONCHigh
        onchigh_set = next((item for item in data.get('fullInteractionTypeGroup', []) if item.get('sourceName') == 'ONCHigh'), None)
        print("Severity from ONCHigh:")
        
        if onchigh_set is not None:
            for interaction in onchigh_set.get('fullInteractionType', []):
                for interaction_pair in interaction.get('interactionPair', []):
                    severity = interaction_pair.get('severity')
                    if severity:
                        print(severity)
                        result=result+severity
                    else:
                        print("No severity information available")
        else:
            print("No data found for ONCHigh")
        # Extracting and printing descriptions from DrugBank
        drugbank_interactions = [
            interaction for interaction in data.get('fullInteractionTypeGroup', [])
            if interaction.get('sourceName') == 'DrugBank'
        ]

        print("\nDescriptions from DrugBank:")
        unique_descriptions = set()  # Using a set to store unique descriptions

        if not any(drugbank_interactions):
            print("No descriptions found for DrugBank interactions.")
        else:
            for interaction in drugbank_interactions:
                if 'fullInteractionType' in interaction:
                    for full_interaction in interaction['fullInteractionType']:
                        if 'interactionPair' in full_interaction:
                            for interaction_pair in full_interaction['interactionPair']:
                                if 'description' in interaction_pair:
                                    unique_descriptions.add(interaction_pair['description'])

            # Printing unique descriptions
            for description in unique_descriptions:
                print(description)
                result=result+description

    else:
        print("Request was not successful. Status code:", response.status_code)


    print("Result before AI: "+result)
    match = re.search(r'\|\|(.+?)\|\|', input_text)

    if match:
        extracted_text = match.group(1)
        print("Extracted Text:", extracted_text)


    resulting_with_description = [(medicine+extracted_text+description) for medicine in resulting_list]
    result=resulting_with_description
    print("Result with description ")
    print(result)
    ##THE AI
    from langchain.document_loaders.csv_loader import CSVLoader
    from langchain.vectorstores import FAISS
    from langchain.embeddings.openai import OpenAIEmbeddings
    from langchain.prompts import PromptTemplate
    from langchain.chat_models import ChatOpenAI
    from langchain.chains import LLMChain
    from dotenv import load_dotenv

    import os
    import openai
    OPENAI_API_KEY="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"
    # Configure OpenAI
    openai_api_base="https://api.openai.com/v1/",
    openai_api_key=OPENAI_API_KEY,
    temperature=0,
    engine="gpt-3.5-turbo"

    from langchain.vectorstores import Chroma
    from langchain.text_splitter import RecursiveCharacterTextSplitter

    from langchain.chains import RetrievalQA
    from langchain.document_loaders import TextLoader
    from langchain.document_loaders import PyPDFLoader
    from langchain.document_loaders import DirectoryLoader

    from InstructorEmbedding import INSTRUCTOR
    from langchain.embeddings import HuggingFaceInstructEmbeddings

    from langchain.embeddings import HuggingFaceBgeEmbeddings

    model_name = "BAAI/bge-base-en"
    encode_kwargs = {'normalize_embeddings': True}  # set True to compute cosine similarity

    model_norm = HuggingFaceBgeEmbeddings(
        model_name=model_name,
        model_kwargs={'device': 'cpu'},  # Change to 'cuda' for GPU if desired
        encode_kwargs=encode_kwargs
    )

    # 1. Vectorize the sales response CSV data
    loader = CSVLoader(file_path="D:\\Pranav\\Repository\\Python\\Records\\try1.csv")
    documents = loader.load()
    embeddings = model_norm
    db = FAISS.from_documents(documents, embeddings)

    # 2. Function for similarity search
    def retrieve_info(query):
        similar_response = db.similarity_search(query, k=6)

        page_contents_array = [doc.page_content for doc in similar_response]

        return page_contents_array

    llm = ChatOpenAI(
    openai_api_base="https://api.openai.com/v1/",
    openai_api_key=OPENAI_API_KEY,
    temperature=0,
    # engine="gpt-3.5-turbo"
    )

    template = """
    You are an intelligent chatbot that predicts adverse drug reactions.
    I will provide you a prescribed drugs, patient's age, sex, weight, the previous medical conditions, possible drug drug interactions which may or may not have dosage all as a single prompt also a list of known adverse reactions.
    You will accurately predict what the list of possible adverse drug reactions.
    1/ Response should be very similar or even identical to the past drug reactions, in terms of length, tone of voice, logical arguments, and other details

    2/ If the prescription is not relevant enough, then try to mimic the style of possible adverse drug reaction

    Below is a list of prompts with details of the drug prescribed,patient information like gender and past medical history,and possible drug drug interactions that may occur:
    {input}
    Here is a list of adverse drug reactions that occurred in similar scenarios:
    {output}
    Give the output in the following format in under 50 words just give the values without any tags:
    Drug Name only||
    Short description of possible interactions with any other drugs if any or any allergies to the medicine||
    list of adverse drug reactions not medical conditions||
    risk level assessment as H for high and M for Medium and L for Low for the prescription and make that rating the last character in the output after a comma
    """

    prompt = PromptTemplate(template=template, input_variables=["input", "output"])

    # Create an LLMChain instance with the prompt and ChatOpenAI instance
    chain = LLMChain(prompt=prompt, llm=llm)

    # 4. Retrieval augmented generation
    # def generate_response(input):
    #     output = retrieve_info(input)
    #     response = chain.run(input=input, output=output)
    #     return response

    # for medicine in result:
    #     input_text = medicine
    #     print("Input Text:", input_text)
    #     output = retrieve_info(input_text)  # Assuming you have defined this function
    #     result = chain.run(input=input_text, output=output)  # Fixed input parameter
    #     print("Generated Response:", result)

    output=""
    def generate_response_for_medicine(medicine):
        input_text = medicine
        # print(f"Input Text for {medicine}: {input_text}")
        
        # Assuming retrieve_info and chain are defined in the global scope
        output = retrieve_info(input_text)
        result = chain.run(input=input_text, output=output)  # Fixed input parameter

        print("Generated Response: "+result+"\n")
        output=result+"|||"

    # Using ThreadPoolExecutor to parallelize the generation of responses
    with ThreadPoolExecutor() as executor:
        executor.map(generate_response_for_medicine, result)
    return output