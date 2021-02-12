const mongoose = require("mongoose");


const codePromoSchema = new mongoose.Schema({
    code: {
        type: String,
        require : true,
        maxlength: 32,
        trim: true,
        unique: true
    },
    isValid: {
        type : Boolean,
        default : true
    },
    gagner: {
        type : Number,
        required : true
    }
}, {timestamps: true});


module.exports = mongoose.model("CodePromo", codePromoSchema)