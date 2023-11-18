from pdf_processor import get_pdf_content
from summarizer import summarize_pdf_content
from drug_interactions import get_drug_interactions
from ai_generator import generate_responses
from vectorizer import load_faiss_vectorizer

pdf_content = """
Personal Information
-------------------
First Name: Stuart
Last Name: Little
Date of Birth: 17/05/99
Patient Identifier: 123
Gender: Male
Blood Type: O+

Address
-------
123 Oceanfront Drive
Honolulu, Hawaii
Zip Code: 6905011

Emergency Contacts
-------------------
Spouse: Lisa Bonet
   Relationship: Spouse
   Phone: (555) 987-6543

Sister: Sarah Johnson
   Relationship: Sister
   Phone: (555) 789-1234

Health Insurance
----------------
Insurance Company: XYZ Health Insurance Company
Plan: Gold Plus Health Plan
Phone: (555) 123-4567
Member ID: AB1234567890
Group Number: S
Social Security Number: AAA-GG-SSSS

Medical History
----------------
Conditions: Stomach Ulcers
Medications:
   - Steroids

Primary Care Physician
----------------------
Name: Dr. Sarah Smith
Specialty: General Physician
Phone: (554) 347-7842

Medical Center
--------------
Name: Truman Medical Centre

Vaccination History
--------------------
Date Received: 17/05/99
Patient Identifier: 123
Vaccination: Dislocated Shoulder

Current Medications
--------------------
Type       | Medication Name | Dose | Frequency | Indication                    | Note
-----------|-----------------|------|------------|-------------------------------|----------------------
Blood Pressure | Lisinopril       | 10mg | 1/day      | none                          | for blood pressure control
Diabetes   | Metformin        | -    | 1/day      | none                          | for type 2 diabetes
Pain Relief | Paracetamol      | 500mg | 2/day      | none                          | none
"""
if pdf_content:
    summary_text = summarize_pdf_content(pdf_content)
    interaction_result = get_drug_interactions(summary_text)
    print(interaction_result)
    # Load the serialized faiss_vectorizer
    faiss_vectorizer = load_faiss_vectorizer()

    generate_responses(interaction_result, faiss_vectorizer)
else:
    print("PDF content not found.")
