from flask import Flask
from flask import render_template
from flask import Response, request, jsonify
import os
import subprocess

app = Flask(__name__)

subs = []
cur_sub_id = 0
img_fn = ""

@app.route('/')
def home():
    return render_template('home.html', title='home', subs=subs)

@app.route('/textbox')
def textbox():
    return render_template('textbox.html', title='textbox', subs=subs)

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


@app.route('/fe3h')
def fe3h():
    return render_template('fe3h.html', title='fe3h')

@app.route('/send_time', methods=['GET', 'POST'])
def send_time():
    print("in send time)")
    json_data = request.get_json()
    timestamp = json_data['time']
    os.chdir('/mnt/c/Users/Sarina/Documents/websites/me/static/images')
    subprocess.call('rm byleth.png', shell=True)
    subprocess.call('ffmpeg -ss 00:00:25 -i /mnt/c/Users/Sarina/Documents/websites/me/byleth_edelgard.mp4 -frames:v 1 byleth.png', shell=True)
    return jsonify("ok")



if __name__ == '__main__':
   app.run(debug = True)
   # app.run(host="0.0.0.0", port=80)




