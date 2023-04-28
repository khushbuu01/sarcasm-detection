from flask import Flask
from flask import request
from flask_cors import CORS, cross_origin
from transformers import AutoModelForSequenceClassification
from transformers import AutoTokenizer
import string

app = Flask(__name__)

cors = CORS(app, resources={r"/foo": {"origins": "*"}})
app.config['CORS_HEADERS'] = 'Content-Type'

def preprocess_data(text: str) -> str:
   return text.lower().translate(str.maketrans("", "", string.punctuation)).strip()

@app.route('/sarcasm' , methods = ['POST'])
@cross_origin(origin='*',headers=['Content-Type','Authorization'])
def show_data():
    data = request.json
    MODEL_PATH = "helinivan/english-sarcasm-detector"
    tokenizer = AutoTokenizer.from_pretrained(MODEL_PATH)
    model = AutoModelForSequenceClassification.from_pretrained(MODEL_PATH)
    text = data["message"]
    tokenized_text = tokenizer([preprocess_data(text)], padding=True, truncation=True, max_length=256, return_tensors="pt")
    output = model(**tokenized_text)
    probs = output.logits.softmax(dim=-1).tolist()[0]
    confidence = max(probs)
    prediction = probs.index(confidence)
    results = {"is_sarcastic": prediction, "confidence": confidence}
    return results    

if __name__ == '__main__':
    app.run(debug=True)
    
    
    


