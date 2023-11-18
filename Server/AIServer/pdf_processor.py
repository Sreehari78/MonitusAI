# pdf_processor.py
import io
import fitz
import pymongo
from pymongo import MongoClient
from gridfs import GridFS
from bson.objectid import ObjectId

client = MongoClient("mongodb://localhost:27017/")
db = client[
    "patient_database"
]  # Replace 'patient_database' with your actual database name

# Access the 'patients' collection and the GridFS object
patients_collection = db["patients"]
fs = GridFS(db, collection="patient_files")


def get_pdf_content(patient_number):
    # Your existing code
    patient_data = patients_collection.find_one({"patient_number": patient_number})

    if patient_data:
        pdf_id = patient_data.get("pdf_id")

        if pdf_id:
            pdf_file = fs.get(ObjectId(pdf_id))
            pdf_content = pdf_file.read()

            # Decode the PDF content to string using 'latin-1' encoding
            try:
                decoded_pdf_content = pdf_content.decode("latin-1")
            except UnicodeDecodeError as e:
                print(f"Error decoding PDF content: {e}")
                decoded_pdf_content = ""

            return decoded_pdf_content
        else:
            print("No PDF file associated with this patient.")
            return None
    else:
        print(f"No patient found with number {patient_number}")
        return None
