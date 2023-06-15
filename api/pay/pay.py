from flask_restful import Resource

from api.database.db import take_db


class Paypal(Resource):
    def createPayment(self, paypalid, buyer, amount, status):
        payment_db = take_db()
        payment_db.execute('INSERT INTO payment (paypalid, buyer, amount, status) VALUES (?, ?, ?, ?)',
                           (paypalid, buyer, amount, status))
        payment_db.commit()