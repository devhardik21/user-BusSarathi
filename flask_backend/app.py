# app.py
import sqlite3
from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

bus_positions = {
    1: [[ [28.6139, 77.2090], [28.6189, 77.2190], [28.6239, 77.2290], [28.6289, 77.2190], [28.6339, 77.2090] ], 0],
    2: [[ [28.5245, 77.1855], [28.5345, 77.1955], [28.5445, 77.2055] ], 0]
}

def get_db_connection():
    conn = sqlite3.connect('database.db')
    conn.row_factory = sqlite3.Row
    return conn

@app.route("/api/buses", methods=['GET'])
def get_buses():
    # ... (this function stays the same)
    conn = get_db_connection()
    query = "SELECT * FROM buses WHERE 1=1"
    params = []

    bus_number_query = request.args.get('bus')
    from_location_query = request.args.get('from')
    to_location_query = request.args.get('to')

    if bus_number_query and bus_number_query.strip():
        query += " AND number = ?"
        params.append(bus_number_query)
    
    if from_location_query and from_location_query.strip():
        query += " AND from_location LIKE ?"
        params.append(f"%{from_location_query}%")

    if to_location_query and to_location_query.strip():
        query += " AND to_location LIKE ?"
        params.append(f"%{to_location_query}%")

    buses_rows = conn.execute(query, params).fetchall()
    conn.close()

    buses_list = [dict(row) for row in buses_rows]
    return jsonify(buses_list)

@app.route("/api/bus/<int:bus_id>", methods=['GET'])
def get_bus_details(bus_id):
    conn = get_db_connection()
    bus = conn.execute('SELECT * FROM buses WHERE id = ?', (bus_id,)).fetchone()
    stops_rows = conn.execute('SELECT name, eta FROM stops WHERE bus_id = ? ORDER BY stop_order', (bus_id,)).fetchall()
    conn.close()
    
    if bus is None:
        return jsonify({"error": "Bus not found"}), 404
        
    bus_details = dict(bus)
    bus_details['stops'] = [dict(row) for row in stops_rows]
    
    # --- ADD THIS ---
    # Include the full route path from our simulation data
    if bus_id in bus_positions:
        bus_details['route_path'] = bus_positions[bus_id][0]
    
    return jsonify(bus_details)

@app.route("/api/bus/<int:bus_id>/location", methods=['GET'])
def get_bus_location(bus_id):
    # ... (this function stays the same)
    if bus_id not in bus_positions:
        return jsonify({"error": "Bus not found"}), 404

    route, index = bus_positions[bus_id]
    current_coords = route[index]
    bus_positions[bus_id][1] = (index + 1) % len(route)
    
    return jsonify({
        "id": bus_id,
        "position": current_coords
    })

if __name__ == "__main__":
    app.run(debug=True)