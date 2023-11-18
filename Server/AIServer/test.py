from pymongo import MongoClient

def update_or_create_drug(db, drug_info):
    collection = db['medicines']

    # Check if the drug already exists based on its name
    existing_drug = collection.find_one({'name': drug_info['name']})

    if existing_drug:
        # If the drug exists, update its information
        for stat in drug_info['stats']:
            print(stat)
            # Using $addToSet to add the stat if it doesn't exist in the array
            # Using $inc to increment the count for the existing stats
            collection.update_one(
                {'_id': existing_drug['_id'], 'stats.reported_adrs': stat['reported_adrs']},
                {'$addToSet': {'stats': stat}, '$inc': {'stats.$.count': 1}}
            )
    else:
        print("No existing drug found")
        # If the drug doesn't exist, create a new document
        # collection.insert_one(drug_info)

# Example usage
def main():
   client = MongoClient('mongodb://localhost:27017')
   database = client['monitus_db']

   drug_info_to_update = {
      'name': 'Aspirin',
      'stats': [
         {'reported_adrs': 'nausea', 'count': 1},
         {'reported_adrs': 'headache', 'count': 1},
         {'reported_adrs': 'stomach ache', 'count': 1},
      ],
   }

   update_or_create_drug(database, drug_info_to_update)

if __name__ == "__main__":
   main()