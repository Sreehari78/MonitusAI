# drug_interactions.py
import requests
import re


def get_drug_interactions(summary_text):
    # Your existing drug interaction logic
    # Return drug_names and interaction_result

    input_text = summary_text
    # Extract medicine names until the '||' delimiter
    medicine_names = input_text.split("||")[0]
    summary_text = input_text.split("||")[1]

    # Remove leading and trailing whitespaces
    medicine_names = medicine_names.strip()

    # Remove all spaces
    medicine_names = medicine_names.replace(" ", "")

    ##GENERATING DRUG DRUG INTERACTIONS
    resulting_list = medicine_names.split(",")
    rxcui_list = ""

    for drug_name in resulting_list:
        api_url = "https://rxnav.nlm.nih.gov/REST/drugs.json?name=" + drug_name
        response = requests.get(api_url)

        try:
            rxcui = response.json()["drugGroup"]["conceptGroup"][1][
                "conceptProperties"
            ][1]["rxcui"]
        except KeyError:
            # If the primary path is not available, try an alternative path
            try:
                rxcui = response.json()["drugGroup"]["conceptGroup"][2][
                    "conceptProperties"
                ][1]["rxcui"]
            except KeyError:
                rxcui = ""
                print("No rxcui found for", drug_name)

        print(rxcui)
        rxcui_list = rxcui_list + rxcui + "+"
    rxcui_list = rxcui_list[:-1]
    print(rxcui_list)

    api_url = (
        "https://rxnav.nlm.nih.gov/REST/interaction/list.json?rxcuis=" + rxcui_list
    )
    response = requests.get(api_url)
    if response.status_code == 200:
        data = response.json()

        # Extracting and printing ONCHigh
        onchigh_set = next(
            (
                item
                for item in data.get("fullInteractionTypeGroup", [])
                if item.get("sourceName") == "ONCHigh"
            ),
            None,
        )
        print("Severity from ONCHigh:")

        if onchigh_set is not None:
            for interaction in onchigh_set.get("fullInteractionType", []):
                for interaction_pair in interaction.get("interactionPair", []):
                    severity = interaction_pair.get("severity")
                    if severity:
                        print(severity)
                        summary_text = summary_text + severity
                    else:
                        print("No severity information available")
        else:
            print("No data found for ONCHigh")
        # Extracting and printing descriptions from DrugBank
        drugbank_interactions = [
            interaction
            for interaction in data.get("fullInteractionTypeGroup", [])
            if interaction.get("sourceName") == "DrugBank"
        ]

        print("\nDescriptions from DrugBank:")
        unique_descriptions = set()  # Using a set to store unique descriptions

        if not any(drugbank_interactions):
            print("No descriptions found for DrugBank interactions.")
        else:
            for interaction in drugbank_interactions:
                if "fullInteractionType" in interaction:
                    for full_interaction in interaction["fullInteractionType"]:
                        if "interactionPair" in full_interaction:
                            for interaction_pair in full_interaction["interactionPair"]:
                                if "description" in interaction_pair:
                                    unique_descriptions.add(
                                        interaction_pair["description"]
                                    )

            # Printing unique descriptions
            print(unique_descriptions)
            for description in unique_descriptions:
                print(description)
                summary_text = summary_text + description
    
    else:
        print("Request was not successful. Status code:", response.status_code)
    match = re.search(r"\|\|(.+?)\|\|", input_text)
    extracted_text = ""
    if match:
        extracted_text = match.group(1)
        print("Extracted Text:", extracted_text)

    resulting_with_description = [
        (medicine + extracted_text + summary_text) for medicine in resulting_list
    ]

    return resulting_with_description
