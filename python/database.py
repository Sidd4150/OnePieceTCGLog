import sqlite3

sql_schema = """
       CREATE TABLE IF NOT EXISTS cards (
            id INTEGER PRIMARY KEY AUTOINCREMENT,  
            name TEXT NOT NULL,                   
            img TEXT,                             
            setName TEXT,                             
            price REAL,                           
            groupID INTEGER          
        );"""




def addtoDataBase(data):
    try:
        with sqlite3.connect("cards.db") as conn:
            cursor = conn.cursor()
            sql = ''' INSERT INTO cards(name,img,setName,price,groupID)
              VALUES(?,?,?,?,?) '''
            
            cursor.execute(
                sql, 
                (
                    data["name"],
                    data["img"], 
                    data["setName"],
                    data["price"],
                    data["groupID"],
                  
                  )
                ) 
        
            conn.commit()   #commit changes
            print("added data")
    except sqlite3.Error as e:
        print(e)


def createDataBase():
    try:
        with sqlite3.connect("cards.db") as conn:
            cursor = conn.cursor()
            cursor.execute("DROP TABLE IF EXISTS cards")
            cursor.execute(sql_schema)  #create table if not exist
        
            conn.commit()   #commit changes
            print("table created")
    except sqlite3.Error as e:
        print(e)

    
