# main.py
from AIServer.summarizer import summarize_pdf_content
from AIServer.drug_interactions import get_drug_interactions
from AIServer.ai_generator import generate_responses
from AIServer.vectorizer import load_faiss_vectorizer
import io
import fitz
import base64
from flask import Flask, request, jsonify
import db_operations as my_db
from flask_cors import CORS
from AIServer.mainAI import predict

# pdf=my_db.get_patient_pdf('StuartLittle')
# print("Base64 Length:", len(pdf))
# print("Base64 Content:", pdf)
# Decode base64 string to binary
# pdf_binary = base64.b64decode(pdf)
# print(pdf_binary)
# try:
#     doc = fitz.open(stream=io.BytesIO(pdf_binary))
# # Other processing code...
# except fitz.fitz.FileDataError as e:
#     print(f"Error opening PDF: {e}")
# except Exception as e:
#     print(f"Unexpected error: {e}")

# # Read the content of each page
# all_text = ""
# for page_number in range(doc.page_count):
#     page = doc[page_number]
#     text = page.get_text()
#     all_text += text
# # Close the PDF document
# doc.close()


