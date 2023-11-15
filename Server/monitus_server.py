from flask import Flask, request, jsonify
import db_operations as my_db

app = Flask(__name__)


@app.route("/insert_user", methods=["POST"])
def add_user():
    my_db.insert_user(
        my_db.connect_to_mongodb(),
        request.form["username"],
        request.form["password"],
        request.form["role"],
    )

    return "User added successfully!"

@app.route("/insert_medicine", methods=["POST"])
def add_medicine():
    my_db.insert_medicine(
        my_db.connect_to_mongodb(),
        request.form["med_name"],
        request.form["med_side_effects"],
    )

    return "Medicine added successfully!"

@app.route("/insert_patient", methods=["POST"])
def add_patient():
    my_db.get_pdf(my_db.connect_to_mongodb())
    my_db.insert_patient(
        my_db.connect_to_mongodb(),
        request.form["name"],
        my_db.get_pdf(my_db.connect_to_mongodb()),
        request.form["possible_adrs"],
        request.form["observed_adrs"],
        request.form["patient_referred_doctors"],
        request.form["patient_referred_nurses"],
        request.form["patient_prescribed_medicines"],
    )

    return "Patient added successfully!"

@app.route("/login", methods=["POST"])
def login():
    username = request.form["username"]
    password = request.form["password"]

    # Check if the user is valid
    user = my_db.get_user(my_db.connect_to_mongodb(),username, password)
    if user:
        return f"Welcome, {username}!"
    else:
        return "Invalid credentials. Please try again."


@app.route("/get_medicines", methods=["POST"])
def view_medicines(med_name):
    medicine = my_db.get_medicine(my_db.connect_to_mongodb(), med_name)

    # Check if the medicine is valid
    if medicine:
        return jsonify(medicine)
    else:
        return jsonify({"error": "Medicine not found"})

@app.route('/get_patient', methods=['POST'])
def view_patient(patient_id):
    patient = my_db.get_patient(my_db.connect_to_mongodb(), patient_id)

    # Check if the patient is valid
    if patient:
        return jsonify(patient)
    else:
        return jsonify({"error": "Patient not found"})


if __name__ == "__main__":
    app.run(debug=True)
