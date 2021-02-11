const mongoose = require("mongoose");
const {ObjectId} = require('mongodb')


const souCategorySchema = new mongoose.Schema({
    name: {
        type: String,
        maxlength: 32,
        trim: true,
        unique: true
    },
    category: {
        type: ObjectId,
        ref: 'Category',
        require: true
    }
}, {timestamps: true});



module.exports = mongoose.model("SouCategory", souCategorySchema)

