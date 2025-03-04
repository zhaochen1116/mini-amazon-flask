from flask import Flask, request, jsonify
app = Flask(__name__)

@app.route("/recommend/<user_id>", methods=["GET"])
def recomment(user_id):
 recommended_products = ["Product A", "Product B", "Product C"]
 return jsonify({"user": user_id, "recommendatons": recommended_products})

if __name__=="_main_":
 app.run(host="0.0.0.0", port=5001)