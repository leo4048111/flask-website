import flask as fk
app = fk.Flask(__name__)

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
    return fk.render_template('contact.html')

@app.route('/jukebox.html')
def jukebox():
    return fk.render_template('jukebox.html')

@app.route('/bio.html')
def bio():
    return fk.render_template('bio.html')

@app.route('/video.html')
def video():
    return fk.render_template('video.html')

if __name__ == '__main__':
    app.run(debug=True)
