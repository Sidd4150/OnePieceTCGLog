import requests
import database
import time
from itertools import zip_longest

productID = "68"

def getGroups():
  
    # Send GET request to the URL
    result = requests.get(f"https://tcgcsv.com/tcgplayer/{productID}/groups")
    
    # Check if the response was successful
    if result.status_code == 200:
        print("Data successfully fetched!")
        return result.json()  # Return JSON if successful
    else:
        print(f"Failed to fetch data. Status code: {result.status_code}")
        return None


def parseJSON(json_data):
    try:
        # Extract the 'results' key which contains the relevant group data
        results = json_data.get('results', [])
        
        # Return the list of groups
        return results
    except Exception as e:
        print(f"Error parsing JSON: {e}")
        return []


def getProductPrice(parsed_data) :
    count = 0 
    for group in parsed_data:
        groupID = group.get("groupId")
        abbr = group.get("abbreviation")
        result = requests.get(f"https://tcgcsv.com/tcgplayer/{productID}/{groupID}/products")
        result = result.json()
        data = parseJSON(result)
        result2 = requests.get(f"https://tcgcsv.com/tcgplayer/{productID}/{groupID}/prices")
        result2 = result2.json()
        dataPrice = parseJSON(result2)
        time.sleep(.05)
        
        for group_product,group_price in zip(data, dataPrice):
            if len(group_product.get("extendedData")) != 0:

                name = group_product.get("name")
                img = group_product.get("imageUrl")
                marketPrice = group_price.get("marketPrice")
                
                extended = group_product.get("extendedData")


            
                dataStruct = {
                    "name":name,
                    "img":img,
                    "setName":abbr,
                    "price":marketPrice,
                    "groupID": groupID, 
                }
                print(dataStruct)
                database.addtoDataBase(dataStruct)



def main():
    # Fetch the data
    json_data = getGroups()
    #create database
    database.createDataBase()

    if json_data:
        parsed_data = parseJSON(json_data)
        getProductPrice(parsed_data)

    else:
        print("No data fetched from the server.")

# Run the main function
main()
