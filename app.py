import flask as fk
from flask import request as rq
from dbext import db
import models

app = fk.Flask(__name__)
##app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://leo:tiger20122012@localhost:3060/flask_website?charset=utf8'
app.config['SQLALCHEMY_DATABASE_URI'] ='sqlite:///database.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)

@app.after_request
def add_header(response):
    """
    Add headers to both force latest IE rendering engine or Chrome Frame,
    and also to cache the rendered page for 10 minutes.
    """
    response.headers['X-UA-Compatible'] = 'IE=Edge,chrome=1'
    response.headers['Cache-Control'] = 'public, max-age=0'
    return response

@app.route('/')
def entry():
    return fk.render_template('home.html')

@app.route('/home.html')
def home():
    return fk.render_template('home.html')

@app.route('/gallery.html')
def gallery():
    return fk.render_template('gallery.html')

@app.route('/contact.html')
def contact():
    return fk.render_template('contact.html',md=models)

@app.route('/jukebox.html')
def jukebox():
    return fk.render_template('jukebox.html',md=models)

@app.route('/bio.html')
def bio():
    return fk.render_template('bio.html')

@app.route('/video.html')
def video():
    return fk.render_template('video.html')

@app.route('/like', methods=['POST','GET'])
def like():
    index = rq.args.get('index')or '0'
    isUpdate = rq.args.get('isUpdate') or '0'
    if(isUpdate == '1'):
        models.updateTrackStat(index)

    count = str(models.getTrackStat(index))
    return count

@app.route('/send-contact',methods=['POST','GET'])
def sendContact():
    name = rq.args.get('name') or '0'
    e_mail = rq.args.get('e_mail') or '0'
    phone = rq.args.get('phone') or '0'
    website = rq.args.get('website') or '0'
    comment = rq.args.get('comment') or '0'

    models.addUserContact(name, e_mail, phone, website, comment)
    return 'Get Request Received'

if __name__ == '__main__':
    app.run(debug=True,host='0.0.0.0',port='5000')
