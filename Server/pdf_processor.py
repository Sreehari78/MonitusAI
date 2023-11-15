# pdf_processor.py
import io
import fitz


def get_pdf_content(patient_number):
    # ... (your existing code)
    return pdf_content


def process_pdf_content(pdf_content):
    doc = fitz.open(stream=io.BytesIO(pdf_content))
    all_text = ""
    for page in doc:
        all_text += page.get_text() + chr(12)
    doc.close()
    return all_text
