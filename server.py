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

@app.route('/fe3h')
def fe3h():
    return render_template('fe3h.html', title='fe3h', fname=fname)

@app.route('/send_time', methods=['GET', 'POST'])
def send_time():
    global counter
    global fname
    json_data = request.get_json()
    timestamp = json_data['time']

    os.chdir('/mnt/c/Users/Sarina/Documents/websites/fe3h/static/images')
    # os.chdir('/home/ec2-user/fe3h/static/images')
    if counter > 0:
        old_fname = str(counter-1) + '.png'
        rm_call = 'rm ' + old_fname
        subprocess.call(rm_call, shell=True)    
    fname = str(counter) + '.png'
    ffmpeg_call = 'ffmpeg -hide_banner -ss ' + timestamp + ' -i /mnt/c/Users/Sarina/Documents/websites/fe3h/byleth_edelgard.mp4 -vf scale=768:-1 -frames:v 1 ' + fname
    # ffmpeg_call = 'ffmpeg -hide_banner -ss ' + timestamp + ' -i /home/ec2-user/fe3h/byleth_edelgard.mp4 -vf scale=768:-1 -frames:v 1 ' + fname
    subprocess.call(ffmpeg_call, shell=True)
    counter += 1
    return jsonify(fname = fname)

if __name__ == '__main__':
   app.run(debug = True)
   # app.run(host="0.0.0.0", port=80)




