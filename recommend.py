from flask import Flask, request, jsonify
app = Flask(__name__)

@app.route("/recommend/<user_id>", methods=["GET"])
def recomment(user_id):
 recommended_products = ["Product A", "Product B", "Product C"]
 return jsonify({"user": user_id, "recommendations": recommended_products})

if __name__ == "__main__":
 print("Starting Flask server...")
 app.run(host="0.0.0.0", port=5001, debug=True)
