
import sqlite3
from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware  # Import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins (for development, specify your frontend URL like "http://localhost:3000")
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods (GET, POST, etc.)
    allow_headers=["*"],  # Allows all headers
)

class DataInput(BaseModel): 
    name: str
    img: str
    setName: str
    price: float
    groupID: int

@app.get("/api/data")
async def get_data(data: DataInput):
    # Log the received data
    print(f"Received data: {data}")
    
    # Respond with a JSON response
    return JSONResponse(content={"message": "Data received successfully PythonBack", "receivedData": {data}})

@app.get("/api/cards")
async def get_cards():
    try:
        with sqlite3.connect("cards.db") as conn:
            cursor = conn.cursor()
            cursor.execute("SELECT * FROM cards")
            rows = cursor.fetchall()

            if not rows:
                print("No cards found in database.")
            
            cards = []
            for row in rows:
                card = {
                    "id": row[0],
                    "name": row[1],
                    "img": row[2],
                    "setName": row[3],
                    "price": row[4],
                    "groupID": row[5]
                }
                
                cards.append(card)

            return JSONResponse(content={"cards": cards})

    except sqlite3.Error as e:
        print(f"Database error: {e}")  # Log database errors
        return JSONResponse(status_code=500, content={"message": f"Error fetching data: {e}"})

    except Exception as e:
        print(f"Unexpected error: {e}")  # Log other errors
        return JSONResponse(status_code=500, content={"message": f"Unexpected error: {e}"})

