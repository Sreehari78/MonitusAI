from httpx import get
import pymongo
import gridfs
from bson import Binary, ObjectId
from array import array

# Connect to MongoDB server
client = pymongo.MongoClient("mongodb://localhost:27017/")
db = client["monitus_db"]


def insert_user(username, password, role):
    # Insert user data into the 'users' collection
    users_collection = db["users"]
    user_data = {"username": username, "password": password, "role": role}
    return users_collection.insert_one(user_data)


def insert_patient(
    name,
    pdf,
    observed_adrs,
    possible_adrs,
    patient_referred_doctors,
    patient_referred_nurses,
    patient_prescribed_medicines,
):
    # Insert patient data into the 'patients' collection
    patients_collection = db["patients"]
    patient_data = {
        "name": name,
        "pdf_file": pdf,
        "possible_adverse_drug_reactions": possible_adrs,
        "observed_adverse_drug_reactions": observed_adrs,
        "referred_doctors": patient_referred_doctors,
        "referred_nurses": patient_referred_nurses,
        "prescribed_medicines": patient_prescribed_medicines,
    }

    return patients_collection.insert_one(patient_data)


def get_user(username, password):
    # Get user data from the 'users' collection
    users_collection = db["users"]
    user = users_collection.find_one({"username": username, "password": password})
    return user


def get_side_effects_stats(med_name):
    # Get medicine details from the 'medicines' collection
    medicines_collection = db["medicines"]
    medicine = medicines_collection.find_one({"name": med_name})
    if medicine: 
        formatted_data = []
        # Iterate through the list and format each element
        for item in medicine["sideEffects"]:
            if 'name' in item and 'count' in item:
                formatted_item = {
                    'id': item['name'],
                    'label': item['name'],
                    'value': item['count']
                }
                formatted_data.append(formatted_item)
        return formatted_data
    else:
        return None


def get_all_medicines():
    # Get all medicine details from the 'medicines' collection.
    medicines_collection = db["medicines"]
    medicines = list(medicines_collection.find({}, {"name": 1, "_id": 0}))
    print(medicines)
    medicine_list = [medcine["name"] for medcine in medicines]
    print(medicine_list)
    return medicine_list


def get_patient(patient_id):
    # Get all patient details from the 'patients' collection.
    patients_collection = db["patients"]
    patient = patients_collection.find_one({"_id": ObjectId(patient_id)})

    return patient


def get_all_patients():
    # Get all patient names and IDs from the 'patients' collection
    patients_collection = db["patients"]

    # Query all documents in the collection
    patients = list(patients_collection.find({}, {"name": 1, "_id": 0}))
    names_list = [patient["name"] for patient in patients]

    return names_list


def get_patient_ehr(patient_name):
    patients_collection = db["patients"]

    # Find the patient by Name
    patient = patients_collection.find_one({"name": patient_name})

    if patient and "pdf_file" in patient:
        pdf_binary = patient["pdf_file"]
        return pdf_binary
    else:
        return "PDF not found for the given patient ID"


def add_or_increment_side_effects(patient_name, side_effects):
    patients_collection = db["patients"]
    patients = patients_collection.find_one({"name": patient_name})
    print("Patient")
    print(patients)
    if not patients:
        return "Patient not found"
    prescribed_medicines = patients.get("prescribed_medicines")

    print("Prescribed Medicines")
    print(prescribed_medicines)
    medicines_collection = db["medicines"]
    # Check if the medicine exists
    for current_medicine in prescribed_medicines:
        medicine = medicines_collection.find_one({"name": current_medicine})
        # print(medicine)
        if medicine:
            medicine_name = medicine["name"]
            # Iterate over each side effect in the list of side effects
            for side_effect in side_effects:
                side_effect_name = side_effect
                side_effect_count = 1
                print(side_effect_name)

                side_effect_exists = False
                # Check if the side effect already exists for the medicine
                print("Medicine")
                print(medicine)
                for existing_side_effect in medicine["sideEffects"]:
                    if existing_side_effect["name"] == side_effect_name:
                        # If side effect exists, increment its count
                        medicines_collection.update_one(
                            {
                                "name": medicine_name,
                                "sideEffects.name": side_effect_name,
                            },
                            {"$inc": {"sideEffects.$.count": side_effect_count}},
                        )
                        side_effect_exists = True
                        print(
                            f"Side effect '{side_effect_name}' count incremented for medicine '{medicine_name}'"
                        )
                        break

                # If side effect doesn't exist, add it to the medicine
                if not side_effect_exists:
                    medicines_collection.update_one(
                        {"name": medicine_name},
                        {
                            "$push": {
                                "sideEffects": {
                                    "name": side_effect_name,
                                    "count": side_effect_count,
                                }
                            }
                        },
                    )
                    print(
                        f"Side effect '{side_effect_name}' added for medicine '{medicine_name}'"
                    )

        else:
            # If medicine doesn't exist, create a new medicine entry with the side effects
            new_medicine = {"name": current_medicine, "sideEffects": side_effects}
            medicines_collection.insert_one(new_medicine)
            print(f"Medicine '{current_medicine}' with side effects added")


def get_adr_list(name):
    patient_collection = db["patients"]  # Replace 'patients' with your collection name
    patient = patient_collection.find_one({"name": name})
    print(patient)
    # return "hehe"
    # Find all documents where possible adverse drug reactions exist
    if patient:
        print(f"Patient: {patient['name']}")
        # possible_reactions = patient['possible_adverse_drug_reactions']
        # print("Possible Adverse Drug Reactions:")
        # for reaction in possible_reactions:
        #     print(f"- {reaction}")
        #     allreactions=allreaction
        possible_reactions = patient["possible_adverse_drug_reactions"]
        if possible_reactions:  # Check if reactions exist
            combined_list = []

            for reaction in possible_reactions:
                combined_list.extend(
                    reaction.split(", ")
                )  # Split the first reaction by comma and space
            return combined_list

    else:
        return(f"No patient found with the name: {name}")
