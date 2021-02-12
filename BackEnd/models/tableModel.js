const mongoose = require("mongoose");


const tableSchema = new mongoose.Schema({
    name: {
        type: String,
        require : true,
        maxlength: 32,
        trim: true,
        unique: true
    },
    isDisponible: {
        type : Boolean,
        default : true
    }
}, {timestamps: true});


module.exports = mongoose.model("Table", tableSchema)