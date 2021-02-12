const Table = require('./../models/tableModel')


exports.getAllTable = (req, res) => {

    Table.find()
      .exec((err, tables) => {
          if(err){
              return res.status(500).json({
                  error : err
              })
          }

          res.json({
              tables
          })
      })
}


exports.createTable = (req, res) => {
    const table = new Table(req.body);

    table.save((err, table) => {
        if(err){
            return res.status(400).json({
                error: 'bad Request !'
            })
        }

        res.json({
            table: table
        })
    }) 
}

exports.deleteTable = (req, res) => {

    let table = req.table;

    table.remove((err, table) => {

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

exports.tableId = (req, res, next, id) => {

    Table.findById(id).exec((err, table) => {

        if(err || !table) {
            return res.status(404).json({
                error: "Table not found !"
            })
        }

        req.table = table;
        next()
    })

}


exports.updateTable = (req, res) => {

    let table = req.table;

    table.name = req.body.name;

    table.save((err, table) => {

        if(err) {
            return res.status(400).json({
                error: "bad request !"
            })
        }

        res.json({
            table,
            message: 'Table updated '
        })

    })

}
