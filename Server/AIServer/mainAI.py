# main.py
from AIServer.summarizer import summarize_pdf_content
from AIServer.drug_interactions import get_drug_interactions
from AIServer.ai_generator import generate_responses
from AIServer.vectorizer import load_faiss_vectorizer
import io
import fitz
import base64
import json
import pymongo
from db_operations import add_or_increment_side_effects

def predict(name,ehr,prescription):
    print(ehr)
    summary_text = summarize_pdf_content(ehr+prescription)
    print(summary_text)
    interaction_result = get_drug_interactions(summary_text)
    print(interaction_result)
    # Load the serialized faiss_vectorizer
    faiss_vectorizer = load_faiss_vectorizer()

    input_list=generate_responses(interaction_result, faiss_vectorizer)
    all_side_effects = []
    def parse_item(item):
        drug_name, interactions, side_effects, risk_level = item.split("||")

        first_five_items = side_effects.split(",")[:5]
        all_side_effects.append(side_effects.split(","))
        # Join the items back into a string if needed
        side_effects = ",".join(first_five_items)
        risk_color_mapping = {
            "L": "#90EE90",
            "none": "#90EE90",
            "M": "#FFF39A",
            "H": "#FF7F7F"
        }
        #MongoDB insert
        
        return {
            "Riskinfo": risk_level,
            "Risk_level": risk_color_mapping.get(risk_level),
            "risk_level_hover": "#cc2f23",
            "DrugName": drug_name,
            "PossibleInteractions": interactions,
            "SideEffects": side_effects,
        }

    # Convert the input list to a list of dictionaries
    output_list = [parse_item(item) for item in input_list]

    client = pymongo.MongoClient("mongodb://localhost:27017/")   
    db = client["monitus_db"]
    patient_collection = db['patients']
    medicines_collection = db["medicines"]
    patient = patient_collection.find_one({"name": name})
    if patient:
        # Update the prescribed medicines for the found patient
        medicines = []
        adrs = []
        i=0
        for item in output_list:
            medicines.append(item['DrugName'])
            adrs.append(item['SideEffects'])
            medicine = medicines_collection.find_one({"name": item['DrugName']})
            add_or_increment_side_effects(medicine,all_side_effects[i]) 
            i+=1
        patient_collection.update_one(
            {"name": name},
            {"$set": {"prescribed_medicines": medicines, "possible_adverse_drug_reactions": adrs}})
    else:
        print(f"No patient found with the name '{name}'")
    


    # Print or save the JSON
    print(output_list)
    return output_list

