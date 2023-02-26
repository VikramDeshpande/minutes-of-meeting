const mongoose = require('mongoose')
const Schema = mongoose.Schema

const SummarySchema = new Schema(
    {
        title: {
            type: String,
        },
        transcript: {
            type: String,
        },
        summary: {
            type: String,
        },
    },
    {
        timestamps: true,
    },
)

module.exports = mongoose.model('Summary', SummarySchema)
//db.summaries.find()
