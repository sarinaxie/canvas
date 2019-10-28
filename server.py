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
vname = ""
v_fpaths = {
    "Sylvain": "sylvain.mp4",
    "Byleth-Edelgard": "byleth_edelgard.mp4"
}
del_fname = ""

@app.route('/about')
def about():
    return render_template('about.html', title='about')
@app.route('/gallery')
def gallery():
    return render_template('gallery.html', title='gallery')

@app.route('/fe3h')
def fe3h():
    return render_template('fe3h.html', title='fe3h', fname=fname, vname=vname, del_fname=del_fname)

@app.route('/create_ss', methods=['GET', 'POST'])
def create_ss():
    global counter
    global fname
    json_data = request.get_json()
    timestamp = json_data['time']
    vidname = json_data['vname']
    print("vidname", vidname)

    os.chdir('/mnt/c/Users/Sarina/Documents/websites/fe3h/static/images')
    # os.chdir('/home/ec2-user/fe3h/static/images')
    #still need some version of this because user can change image without reloading the page
    if counter > 0:
        old_fname = str(counter-1) + '.png'
        rm_call = 'rm ' + old_fname
        subprocess.call(rm_call, shell=True)  
    fname = str(counter) + '.png'
    ffmpeg_call = 'ffmpeg -hide_banner -ss ' + timestamp + ' -i /mnt/c/Users/Sarina/Documents/websites/fe3h/' + v_fpaths[vidname] + ' -vf scale=768:-1 -frames:v 1 ' + fname
    # ffmpeg_call = 'ffmpeg -hide_banner -ss ' + timestamp + ' -i /home/ec2-user/fe3h/' + v_fpaths[vidname] + ' -vf scale=768:-1 -frames:v 1 ' + fname
    print("ffmpeg_call", ffmpeg_call)
    subprocess.call(ffmpeg_call, shell=True)
    counter += 1
    return jsonify(fname = fname)

@app.route('/delete_ss', methods=['POST'])
def delete_ss():
    json_data = request.get_json()
    d_fname = json_data['del_fname']
    os.chdir('/mnt/c/Users/Sarina/Documents/websites/fe3h/static/images')
    rm_call = 'rm ' + d_fname
    subprocess.call(rm_call, shell=True)
    return jsonify(success=True)

if __name__ == '__main__':
   app.run(debug = True)
   # app.run(host="0.0.0.0", port=80)




