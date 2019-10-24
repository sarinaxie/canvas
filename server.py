from flask import Flask
from flask import render_template
from flask import Response, request, jsonify
import os
import subprocess

app = Flask(__name__)

subs = []
cur_sub_id = 0
counter = 0
fname = ""

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
    return render_template('fe3h.html', title='fe3h', fname=fname)

@app.route('/send_time', methods=['GET', 'POST'])
def send_time():
    global counter
    global fname
    json_data = request.get_json()
    timestamp = json_data['time']

    os.chdir('/mnt/c/Users/Sarina/Documents/websites/me/static/images')
    if counter > 0:
        old_fname = str(counter-1) + '.png'
        rm_call = 'rm ' + old_fname
        subprocess.call(rm_call, shell=True)    
    fname = str(counter) + '.png'
    ffmpeg_call = 'ffmpeg -hide_banner -ss ' + timestamp + ' -i /mnt/c/Users/Sarina/Documents/websites/me/byleth_edelgard.mp4 -vf scale=768:-1 -frames:v 1 ' + fname
    subprocess.call(ffmpeg_call, shell=True)
    counter += 1
    return jsonify(fname = fname)

@app.route('/wipfe3h')
def wipfe3h():
    return render_template('wipfe3h.html', title='wipfe3h')

if __name__ == '__main__':
   app.run(debug = True)
   # app.run(host="0.0.0.0", port=80)




