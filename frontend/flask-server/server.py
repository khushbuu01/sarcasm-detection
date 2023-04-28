from flask import Flask
import paralleldots as pd
from flask import request
from flask_cors import CORS, cross_origin

app = Flask(__name__)

cors = CORS(app, resources={r"/foo": {"origins": "*"}})
app.config['CORS_HEADERS'] = 'Content-Type'

# CORS(app)

# @app.route('/sarcasm')
# def members():
#     pd.set_api_key("FgMM8nwGyhIfy9Q09n6uuSgXev1vnnq9eNTX6QK7CXo")
#     sarcasm = pd.sarcasm("I like long walks, especially when they are taken by people who annoy me.")
#     return sarcasm


@app.route('/sarcasm' , methods = ['POST'])
@cross_origin(origin='*',headers=['Content-Type','Authorization'])
def show_data():
    data = request.json
    print(data["message"])
    pd.set_api_key("FgMM8nwGyhIfy9Q09n6uuSgXev1vnnq9eNTX6QK7CXo")
    sarcasm = pd.sarcasm(data["message"])
    print(sarcasm)
    return sarcasm    

if __name__ == '__main__':
    app.run(debug=True)
    