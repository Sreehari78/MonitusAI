# ai_generator.py
from langchain.document_loaders.csv_loader import CSVLoader
from langchain.vectorstores import FAISS
from langchain.embeddings.openai import OpenAIEmbeddings
from langchain.prompts import PromptTemplate
from langchain.chat_models import ChatOpenAI
from langchain.chains import LLMChain
from dotenv import load_dotenv
from concurrent.futures import ThreadPoolExecutor

# Your existing AI model and response generation logic

OPENAI_API_KEY = "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"
# Configure OpenAI
openai_api_base = ("https://api.openai.com/v1/",)
openai_api_key = (OPENAI_API_KEY,)
temperature = (0,)
engine = "gpt-3.5-turbo"

# 1. Setup FAISS vectorizer

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
list of not more than 10 adverse drug reactions not medical conditions||
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

# Using ThreadPoolExecutor to parallelize the generation of responses


def generate_responses(input_text, faiss_vectorizer):
    generatedresponses =[]
    def generate_response_for_medicine(input_text):
        # print(f"Input Text for {medicine}: {input_text}")

        # Assuming retrieve_info and chain are defined in the global scope
        output = retrieve_info(input_text)
        print(output)
        print("\n\n\n")
        result = chain.run(input=input_text, output=output)  # Fixed input parameter

        print("\n\nGenerated Response: " + result + "\n")
        generatedresponses.append(result)
        print(generatedresponses)
        # 2. Function for similarity search

    def retrieve_info(query):
        similar_response = faiss_vectorizer.similarity_search(query, k=10)
        page_contents_array = [doc.page_content for doc in similar_response]
        return page_contents_array

    with ThreadPoolExecutor() as executor:
        executor.map(generate_response_for_medicine, input_text)
    return generatedresponses