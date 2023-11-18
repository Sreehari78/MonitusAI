# ai_generator.py
from langchain.document_loaders.csv_loader import CSVLoader
from langchain.vectorstores import FAISS
from langchain.embeddings.openai import OpenAIEmbeddings
from langchain.prompts import PromptTemplate
from langchain.chains import LLMChain
from dotenv import load_dotenv
from concurrent.futures import ThreadPoolExecutor
from transformers import AutoModelForCausalLM, AutoTokenizer, pipeline


def generate_responses(input_text, faiss_vectorizer):
    def generate_response_for_medicine(input_text):
        output = retrieve_info(input_text)

        model_name_or_path = "TheBloke/zephyr-7B-alpha-GPTQ"
        model = AutoModelForCausalLM.from_pretrained(
            model_name_or_path,
            device_map="auto",
            trust_remote_code=False,
            revision="main",
        )

        tokenizer = AutoTokenizer.from_pretrained(model_name_or_path, use_fast=True)

        prompt_template = """
        You are an intelligent chatbot that predicts adverse drug reactions.
        I will provide you a prescribed drugs, patient's age, sex, weight, the previous medical conditions, possible drug drug interactions which may or may not have dosage all as a single prompt also a list of known adverse reactions.
        You will accurately predict what the list of possible adverse drug reactions.
        1/ Response should be very similar or even identical to the past drug reactions, in terms of length, tone of voice, logical arguments, and other details

        2/ If the prescription is not relevant enough, then try to mimic the style of possible adverse drug reaction

        Below is a list of prompts with details of the drug prescribed,patient information like gender and past medical history,and possible drug drug interactions that may occur:
        {input}
        Here is a list of adverse drug reactions that occurred in similar scenarios:
        {output}
        Give the output in the following format in under 30 words just give the values without any tags:
        Drug Name only||
        Short description of possible interactions with any other drugs if any or any allergies to the medicine||
        list of adverse drug reactions not medical conditions||
        risk level assessment as H for high and M for Medium and L for Low for the prescription and make that rating the last character in the output after a comma
        """

        input_ids = tokenizer(prompt_template, return_tensors="pt").input_ids.cuda()
        reply = model.generate(
            inputs=input_ids,
            temperature=0.7,
            do_sample=True,
            top_p=0.95,
            top_k=40,
            max_new_tokens=512,
        )
        print(tokenizer.decode(reply[0]))
        print("\n\nGenerated Response: " + result + "\n")

        # 2. Function for similarity search

    def retrieve_info(query):
        similar_response = faiss_vectorizer.similarity_search(query, k=10)
        page_contents_array = [doc.page_content for doc in similar_response]
        return page_contents_array

    with ThreadPoolExecutor() as executor:
        executor.map(generate_response_for_medicine, input_text)
