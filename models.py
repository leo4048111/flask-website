from datetime import datetime
from dbext import db
from sqlalchemy import func

# Music access statistic
class TrackStat(db.Model):
    __tablename__ = 'track_stat'
    track_index = db.Column(db.Integer, primary_key=True, autoincrement=False)
    thumb_up_count = db.Column(db.Integer)

# Contact access , init view
class UserContact(db.Model):
    __tablename__ = 'user_contact'
    name = db.Column(db.Text, nullable=False)
    e_mail = db.Column(db.Text, nullable=False)
    phone = db.Column(db.Text, nullable=False)
    website = db.Column(db.Text, nullable=False)
    comment = db.Column(db.Text, nullable=False)
    contact_id = db.Column(db.Integer, primary_key=True, nullable=False)
    time = db.Column(db.DateTime, default=datetime.utcnow())

def updateTrackStat(index):
    track = TrackStat.query.filter(TrackStat.track_index == index).first()
    track.thumb_up_count += 1
    db.session.commit()

def getTrackStat(index):
    cnt = db.session.query(TrackStat.thumb_up_count).filter(TrackStat.track_index == index).first()
    #cnt = TrackStat.query.with_entities(TrackStat.thumb_up_count).first()
    return cnt[0]

def getUserContact():
    #get current comment count
    cur_comment_count = db.session.query(func.max(UserContact.contact_id)).scalar()
    l = []
    l.append(cur_comment_count)
    #init query
    query = db.session.query(UserContact.contact_id,
                             UserContact.name,
                             UserContact.comment,
                             UserContact.time)
    for elem in query:
        l.append(dict(elem))

    #return result as list
    return l

def addUserContact(name,e_mail,phone,website,comment):
    ##query database and get highest contact_id
    query = db.session.query(UserContact.name, UserContact.comment).filter(UserContact.name == name)
    for row in query:
        if row.comment == comment:
            return

    id = db.session.query(func.max(UserContact.contact_id)).scalar()
    if not id:
        id = 1
    else:
        id += 1
    contact = UserContact(name=name,
                       e_mail=e_mail,
                       phone=phone,
                       website=website,
                       comment=comment,
                       contact_id=id)
    db.session.add(contact)
    db.session.commit()
    return