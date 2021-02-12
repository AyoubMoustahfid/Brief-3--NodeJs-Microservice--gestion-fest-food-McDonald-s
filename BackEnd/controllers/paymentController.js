const Payment = require('./../models/paymentModel');


exports.createPayment = (req, res) => {
    const payment = new Payment(req.body);

    payment.save((err, payment) => {
        if(err){
            return res.status(400).json({
                error: 'bad Request !'
            })
        }

        res.json({
            payment: payment
        })
    }) 
}

exports.getAllPayment = (req, res) => {

    Payment.find()
    .exec((err, payments) => {
        if(err){
            return res.status(500).json({
                error: err
            })
        }

        res.json({
            payments
        })
    })
}


