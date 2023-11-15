# main.py
import concurrent.futures
from faiss_loader import load_faiss, retrieve_info
from pdf_processor import get_pdf_content, process_pdf_content
from ai_processor import generate_response

# Load FAISS once
db = load_faiss()


# Function to process each patient in parallel
def process_patient(patient_number):
    pdf_content = get_pdf_content(patient_number)
    if pdf_content:
        all_text = process_pdf_content(pdf_content)
        input_text = all_text
        output = retrieve_info(db, input_text)
        result = generate_response(input_text, output)
        print(f"Generated Response for patient {patient_number}: {result}")


# List of patient numbers to process in parallel
patient_numbers_to_process = [1, 2, 3, 4]  # Add more patient numbers as needed

# Run patient processing in parallel
with concurrent.futures.ThreadPoolExecutor() as executor:
    executor.map(process_patient, patient_numbers_to_process)
