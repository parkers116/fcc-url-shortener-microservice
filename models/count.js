const mongoose = require('mongoose')
const Schema = mongoose.Schema

var countSchema = new Schema(
    {
        count: Number,
    },
    { collection: 'count' }
)

mongoose.model('count', countSchema)
