import pymongo

def add_or_increment_side_effects(medicine_name, side_effects):
    client = pymongo.MongoClient("mongodb://localhost:27017/")   
    db = client["monitus_db"]  # Use your actual database name here
    medicines_collection = db["medicines"]  # Use your actual collection name here

    # Check if the medicine exists
    medicine = medicines_collection.find_one({"name": medicine_name})

    if medicine:
        # Iterate over each side effect in the list
        for side_effect in side_effects:
            side_effect_name = side_effect["name"]
            side_effect_count = side_effect["count"]

            side_effect_exists = False
            # Check if the side effect already exists for the medicine
            for existing_side_effect in medicine["sideEffects"]:
                if existing_side_effect["name"] == side_effect_name:
                    # If side effect exists, increment its count
                    medicines_collection.update_one(
                        {"name": medicine_name, "sideEffects.name": side_effect_name},
                        {"$inc": {"sideEffects.$.count": side_effect_count}}
                    )
                    side_effect_exists = True
                    print(f"Side effect '{side_effect_name}' count incremented for medicine '{medicine_name}'")
                    break
            
            # If side effect doesn't exist, add it to the medicine
            if not side_effect_exists:
                medicines_collection.update_one(
                    {"name": medicine_name},
                    {"$push": {
                        "sideEffects": {
                            "name": side_effect_name,
                            "count": side_effect_count
                        }
                    }}
                )
                print(f"Side effect '{side_effect_name}' added for medicine '{medicine_name}'")

    else:
        # If medicine doesn't exist, create a new medicine entry with the side effects
        new_medicine = {
            "name": medicine_name,
            "sideEffects": side_effects
        }
        medicines_collection.insert_one(new_medicine)
        print(f"Medicine '{medicine_name}' with side effects added")

# Example usage:
side_effects_list = [
    {"name": "Nausea", "count": 1},
    {"name": "Headache", "count": 1},
    {"name": "Dizziness", "count": 1}
]

add_or_increment_side_effects("Paracetamol", side_effects_list)
