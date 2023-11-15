import re
import pymongo
import gridfs
from bson import Binary, ObjectId


def connect_to_mongodb():
    # Connect to MongoDB server
    client = pymongo.MongoClient("mongodb://localhost:27017/")
    db = client["monitus_db"]
    return db


def insert_user(db, username, password, role):
    # Insert user data into the 'users' collection
    users_collection = db["users"]
    user_data = {"username": username, "password": password, "role": role}
    return users_collection.insert_one(user_data)


def insert_medicine(db, med_name, reported_side_effects):
    # Insert medicine data into the 'medicines' collection
    medicines_collection = db["medicines"]
    medicine_data = {
        "name": med_name,
        "stats": reported_side_effects,
    }
    return medicines_collection.insert_one(medicine_data)


def insert_patient(db, name, pdf_binary, observed_adrs, possible_adrs, patient_referred_doctors, patient_referred_nurses, patient_prescribed_medicines,):
    # Insert patient data into the 'patients' collection
    patients_collection = db["patients"]
    patient_data = {
        "name": name,
        "pdf_file": pdf_binary,
        "possible_adverse_drug_reactions": possible_adrs,
        "observed_adverse_drug_reactions": observed_adrs,
        "referred_doctors": patient_referred_doctors,
        "referred_nurses": patient_referred_nurses,
        "prescribed_medicines": patient_prescribed_medicines,
    }
    return patients_collection.insert_one(patient_data)


def get_pdf(db):
    # Read PDF file as binary
    with open("D:\\Softwares\\Codes\\D3CODE\\Monitus\\Server\\JohnDoe.pdf", "rb") as pdf_file:
        pdf_binary = Binary(pdf_file.read())

    # Create a new GridFS instance
    fs = gridfs.GridFS(db)

    # Store the PDF file in GridFS
    pdf_id = fs.put(pdf_binary, filename="John_Doe.pdf")
    return pdf_id


def get_user(db, username, password):
    # Get user data from the 'users' collection
    users_collection = db["users"]
    user = users_collection.find_one({"username": username, "password": password})
    return user


def get_medicine(db, med_name):
    # Get all medicine details from the 'medicines' collection.
    medicines_collection = db["medicines"]
    medicine = medicines_collection.find_one({"name": med_name})
    return medicine

def get_patient(db, patient_id):
    # Get all patient details from the 'patients' collection.
    patients_collection = db["patients"]
    patient = patients_collection.find_one({"_id": ObjectId(patient_id)})
    return patient

