import json
from os import name
from flask import Flask, request, jsonify
import db_operations as my_db
from flask_cors import CORS
from AIServer.mainAI import predict
import urllib3
import re

app = Flask(__name__)
CORS(app)

@app.route("/insert_user", methods=["POST"])
def add_user():
    my_db.insert_user(    
        request.form["username"],
        request.form["password"],
        request.form["role"],
    )

    return "User added successfully!"

@app.route("/login", methods=["POST"])
def login():
    username = request.form["username"]
    password = request.form["password"]

    # Check if the user is valid
    user = my_db.get_user(username, password)
    if user:
        return jsonify({f"Welcome, {username}!"})
    else:
        return jsonify({"Invalid credentials. Please try again."})


@app.route('/get_patient', methods=['POST'])
def view_patient(patient_id):
    patient = my_db.get_patient( patient_id)

    # Check if the patient is valid
    if patient:
        return jsonify(patient)
    else:
        return jsonify({"error": "Patient not found"}), 400

@app.route('/upload', methods=['POST'])
def upload_file():
    try:
        data = request.get_json()
        print( data)
        pdf_data = data.get('pdfData')
        url = pdf_data['Url']
        print(url)
        name = data.get('name')
        print(name)
        
        import wget
        filename = wget.download(url)

        print("Downloaded file:", filename)
        print("URL:", url)

        # Open the file with the 'utf-8' encoding
        with open(filename, "r", encoding="utf-8") as file1:
            # Read and print the contents of the file
            out=file1.read()
            pdf_file=re.sub(r'\n\s*\n', '\n', out)
        print(pdf_file)
        print("hello")
        my_db.insert_patient(
        name,
        pdf_file,
        [],[],[],[],[]
    )

        return jsonify({'message': 'Upload successful'}), 200
    except Exception as e:
        return jsonify({'error': str(e)})


@app.route('/get_all_patient', methods=['POST'])
def get_all_patient():
    all_patient_data = my_db.get_all_patients()
    return jsonify({"names" : all_patient_data})

@app.route('/get_prediction', methods=['POST'])
def get_prediction():
    data = request.get_json()
    name = data.get('name')
    print(data.get('prescription'))
    ehr = my_db.get_patient_ehr(name)
    out=predict(name, ehr,data.get('prescription'))
    print(jsonify(result=out))
    return jsonify({"result" : out})

@app.route('/get_adr', methods=['POST'])
def get_adr():
    data = request.get_json()
    patient_name = data.get('patient')
    print(patient_name)
    adr_list = my_db.get_adr_list(patient_name)
    print(adr_list)

    return jsonify({"reaction" : adr_list})

@app.route('/reported_adrs', methods=['POST'])
def reported_adrs():
    data = request.get_json()
    side_effects = data.get('adrs')
    patient_name = data.get('patient')
    print(data)
    print(patient_name)
    print(side_effects)
    my_db.add_or_increment_side_effects(patient_name, side_effects)
    return jsonify({"reaction" : "success"})

@app.route("/get_stats", methods=["POST"])
def get_stats():
    data = request.get_json()
    med_name= data.get('drug')
    print(med_name)
    return jsonify({"sideEffects" : my_db.get_side_effects_stats( med_name)})

@app.route("/get_all_medicines", methods=["POST"])
def get_all_medicines():
    return jsonify({"medicines" : my_db.get_all_medicines()})
    
if __name__ == "__main__":
    app.run(debug=True)
