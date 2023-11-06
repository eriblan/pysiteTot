from flask_app import app
from flask import jsonify, request

# Add initial User
current_id = 0
users = {str(current_id): {"name": "Jonass"}}


@app.route("/api/users", methods=["GET", "POST"])
def handle_users():
    global current_id
    if request.method == "GET":
        return jsonify({"users": users})

    elif request.method == "POST":
        # Recieved new request to add a user
        try:
            data = request.get_json()
            print("printing the data recieved from frontend", data)
            current_id += 1
            users[str(current_id)] = data

            return jsonify({"message": "Users updated successfully"})
        except Exception as e:
            print("Error occured: ", e)
            return jsonify({"message": "could not update users"}), 500


# @app.route("/api/users/<user_id>", methods=["GET", "PUT", "DELETE"])
# def handle_user(user_id):
#     """
#     This function takes an ID as dynamic URL parameter, for example 0
#     Note:
#     - GET method is only available for debugging purposes, to test for a specific user
#     open the browser with for example http://localhost:5000/api/users/0 to see the data

#     - The assignment is to implement the PUT and DELETE methods for the specific ID, see assignment for specific instructions
#     """
#     if user_id in users:
#         if request.method == "GET":
#             return jsonify(users[user_id])
        
#         if request.method == "DELETE":
#             del users[user_id]
#             return jsonify({"message": "User deleted"}), 200

#         if request.method == "PUT":
#             if (request.json['name']):
#                 users[user_id]['name'] = request.json['name']
#                 return jsonify({"message": "User updated"}), 200
#             else:
#                 return jsonify({"message": "Empty username"}), 400

#     else:
#         return jsonify({"message": "User not found"}), 404


@app.route("/api/users/<user_id>", methods=["GET", "PUT", "DELETE"])
def handle_user(user_id):
    """
    This function takes an ID as dynamic URL parameter, for example 0
    Note:
    - GET method is only available for debugging purposes, to test for a specific user
    open the browser with for example http://localhost:5000/api/users/0 to see the data

    - The assignment is to implement the PUT and DELETE methods for the specific ID, see assignment for specific instructions
    """
    if user_id not in users:
        return jsonify({"message": "User not found"}), 404

    if request.method == "GET":
        return jsonify(users[user_id])

    if request.method == "DELETE":
        del users[user_id]
        return jsonify({"message": f"User {user_id} deleted"}), 200

    if request.method == "PUT":
        request_data = request.get_json()
        name = request_data.get('name')
        if name:
            users[user_id]['name'] = name
            return jsonify({"message": "User updated"}), 200
        else:
            return jsonify({"message": "Empty username"}), 400