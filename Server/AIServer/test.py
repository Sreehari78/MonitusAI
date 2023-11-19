from pymongo import MongoClient

def get_adr(name):
    allreactions=""
    client = MongoClient('mongodb://localhost:27017')
    db = client['monitus_db']
    patient_collection = db['patients']  # Replace 'patients' with your collection name
    patient = patient_collection.find_one({"name": name})
    # Find all documents where possible adverse drug reactions exist
    if patient:
        print(f"Patient: {patient['name']}")
        # possible_reactions = patient['possible_adverse_drug_reactions']
        # print("Possible Adverse Drug Reactions:")
        # for reaction in possible_reactions:
        #     print(f"- {reaction}")
        #     allreactions=allreaction
        possible_reactions = patient['possible_adverse_drug_reactions']
        if possible_reactions:  # Check if reactions exist
            combined_list = []

            for reaction in possible_reactions:
                combined_list.extend(reaction.split(', '))  # Split the first reaction by comma and space
            print(combined_list)
        
    else:
        print(f"No patient found with the name: {name}")

def main():
    client = MongoClient('mongodb://localhost:27017')
    database = client['monitus_db']  # Replace 'monitus_db' with your database name

    # Find and display all possible adverse drug reactions for patients
    get_adr("Pranav New")

if __name__ == "__main__":
    main()
