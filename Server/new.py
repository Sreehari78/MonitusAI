import pymongo
from pymongo import MongoClient
from gridfs import GridFS
from bson.objectid import ObjectId
import io
import fitz  # PyMuPDF
import openai
import requests

##THE AI
from langchain.document_loaders.csv_loader import CSVLoader
from langchain.vectorstores import FAISS
from langchain.embeddings.openai import OpenAIEmbeddings
from langchain.prompts import PromptTemplate
from langchain.chat_models import ChatOpenAI
from langchain.chains import LLMChain
from dotenv import load_dotenv

import openai

OPENAI_API_KEY = "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"
# Configure OpenAI
openai_api_base = ("https://api.openai.com/v1/",)
openai_api_key = (OPENAI_API_KEY,)
temperature = (0,)
engine = "gpt-3.5-turbo"

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
encode_kwargs = {"normalize_embeddings": True}  # set True to compute cosine similarity

model_norm = HuggingFaceBgeEmbeddings(
    model_name=model_name,
    model_kwargs={"device": "cpu"},  # Change to 'cuda' for GPU if desired
    encode_kwargs=encode_kwargs,
)

# 1. Vectorize the sales response CSV data
loader = CSVLoader(file_path="D:\\Richard\\CyientiFiQ\\MonitusAI\\try1.csv")
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

Below is a list of prompts with details of the patient and the drugs that are prescribed,adverse drug reactions,:
{input}
Here is a list of adverse drug reactions that occurred in similar scenarios:
{output}
Give the output in the following format in under 50 words just give the values without any tags:
Drug Name only,
list of adverse drug reactions not medical conditions with a short description with explanation,
risk level assessment as H for high and M for Medium and L for Low for the prescription and make that rating the last character in the output after a comma
"""

prompt = PromptTemplate(template=template, input_variables=["input", "output"])

# Create an LLMChain instance with the prompt and ChatOpenAI instance
chain = LLMChain(prompt=prompt, llm=llm)


# 4. Retrieval augmented generation
def generate_response(input):
    output = retrieve_info(input)
    response = chain.run(input=input, output=output)
    return response


input_text = "35 year old female is described 3mg ofloxaxin for 5 days for a urinary tract infection. She has no other medical conditions and is not taking any other medications. She has no known allergies"

# aimodel()

print("Input Text:", input_text)
output = retrieve_info(input_text)
result = chain.run(input=input_text, output=output)  # Fixed input parameter

print("Generated Response:", result)
