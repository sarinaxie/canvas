from flask import Flask
from flask import render_template
from flask import Response, request, jsonify
app = Flask(__name__)

subs = []
cur_sub_id = 0
@app.route('/')
def home():
    return render_template('home.html', title='home', subs=subs)

@app.route('/save_entry', methods=['GET','POST'])
def save_entry():
    global subs
    global cur_sub_id
    json_data = request.get_json()
    new_record = {
        "id": cur_sub_id,
        "text": json_data["text"]
    }
    subs.append(new_record)
    cur_sub_id += 1
    return jsonify(subs=subs)

@app.route('/delete_entry', methods=['GET', 'POST'])
def delete_entry():
    global subs    
    json_data = request.get_json()
    id = json_data["id"]
    for record in subs:
        if record["id"] == int(id):
            print("found")
            subs.remove(record)
    return jsonify(subs=subs)

@app.route('/otp')
def otp():
    return render_template('otp.html', title='otp')    

@app.route('/canvas')
def canvas():
    return render_template('canvas.html', title='canvas')

@app.route('/test')
def testcanvas():
    return render_template('test.html', title='testcanvas')

if __name__ == '__main__':
   app.run(debug = True)
   # app.run(host="0.0.0.0", port=80)




