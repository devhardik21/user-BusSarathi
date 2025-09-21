# setup_database.py
import sqlite3

connection = sqlite3.connect('database.db')
cursor = connection.cursor()

# 1. Create the buses table (if it doesn't exist)
cursor.execute("""
CREATE TABLE IF NOT EXISTS buses (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    number TEXT NOT NULL,
    departure TEXT,
    arrival TEXT,
    from_location TEXT,
    to_location TEXT
)
""")

# 2. Create the new stops table
# We link each stop to a bus using 'bus_id'
# 'stop_order' determines the sequence of stops on the route
cursor.execute("""
CREATE TABLE IF NOT EXISTS stops (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    bus_id INTEGER NOT NULL,
    name TEXT NOT NULL,
    eta TEXT NOT NULL,
    stop_order INTEGER NOT NULL,
    FOREIGN KEY (bus_id) REFERENCES buses (id)
)
""")

# 3. Clear existing data to prevent duplicates when re-running
cursor.execute("DELETE FROM buses")
cursor.execute("DELETE FROM stops")


# 4. Define and insert sample data
buses_to_insert = [
    (1, 'Express Line', '302', '2:00 PM', '4:30 PM', 'City A', 'City B'),
    (2, 'City Hopper', '450', '2:15 PM', '5:00 PM', 'City C', 'City D'),
    (3, 'Metro Connect', '110', '2:30 PM', '4:45 PM', 'City A', 'City D')
]
cursor.executemany("INSERT INTO buses (id, name, number, departure, arrival, from_location, to_location) VALUES (?, ?, ?, ?, ?, ?, ?)", buses_to_insert)

stops_to_insert = [
    # Route for Bus 1 (Express Line)
    (1, 'Central Bus Stand', '5 mins', 1),
    (1, 'City Market', '12 mins', 2),
    (1, 'Tech Park Gate 1', '25 mins', 3),
    # Route for Bus 2 (City Hopper)
    (2, 'Downtown Metro', '3 mins', 1),
    (2, 'Uptown Circle', '15 mins', 2),
    (2, 'Final Terminus', '30 mins', 3),
]
cursor.executemany("INSERT INTO stops (bus_id, name, eta, stop_order) VALUES (?, ?, ?, ?)", stops_to_insert)


connection.commit()
connection.close()

print("Database created and populated successfully with buses and stops!")