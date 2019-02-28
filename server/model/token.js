const mongoose = require('mongoose')

let TokenSchema = new mongoose.Schema(
    {
        start:  {
            type:Number,
            required: true,
            unique: true,
        },
        end:  {
            type:Number,
            required: true,
            unique: true,
        },
        tokens: Array,
        tag: String,
    }
)

module.exports = mongoose.model('Token', TokenSchema)