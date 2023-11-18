# main.py
from AIServer.summarizer import summarize_pdf_content
from AIServer.drug_interactions import get_drug_interactions
from AIServer.ai_generator import generate_responses
from AIServer.vectorizer import load_faiss_vectorizer
import io
import fitz
import base64

def predict(ehr,prescription):
    print(ehr)
    summary_text = summarize_pdf_content(ehr+prescription)
    print(summary_text)
    interaction_result = get_drug_interactions(summary_text)
    print(interaction_result)
    # Load the serialized faiss_vectorizer
    faiss_vectorizer = load_faiss_vectorizer()

    generate_responses(interaction_result, faiss_vectorizer)
