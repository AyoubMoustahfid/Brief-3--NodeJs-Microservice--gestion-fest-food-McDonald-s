const CodePromo = require('./../models/codePromoModel')


exports.getAllCodePromo = (req, res) => {

    CodePromo.find()
      .exec((err, codePromos) => {
          if(err){
              return res.status(500).json({
                  error : err
              })
          }

          res.json({
              codePromos
          })
      })
}


exports.createCodePromo = (req, res) => {
    const codePromo = new CodePromo(req.body);

    codePromo.save((err, codePromo) => {
        if(err){
            return res.status(400).json({
                error: 'bad Request !'
            })
        }

        res.json({
            codePromo: codePromo
        })
    }) 
}

exports.deleteCodePromo = (req, res) => {

    let codePromo = req.codePromo;

    codePromo.remove((err, codePromo) => {

        if(err) {
            return res.status(404).json({
                error: "table not found !"
            })
        }

        res.status(204).json({
            message: 'Table deleted '
        })

    })

}

exports.codePromoId = (req, res, next, id) => {

    CodePromo.findById(id).exec((err, codePromo) => {

        if(err || !codePromo) {
            return res.status(404).json({
                error: "Table not found !"
            })
        }

        req.codePromo = codePromo;
        next()
    })

}


exports.updateCodePromo = (req, res) => {

    let codePromo = req.codePromo;

    codePromo.code = req.body.code;
    codePromo.gagner = req.body.gagner;

    codePromo.save((err, codePromo) => {

        if(err) {
            return res.status(400).json({
                error: "bad request !"
            })
        }

        res.json({
            codePromo,
            message: 'Table updated '
        })

    })

}
