const mongoose = require('mongoose')

const tagSchema = new mongoose.Schema({
    title: {
        type: 'string',
        required: true,
        unique: true
    },
    questions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Question"
    }]
}, { timestamps: true })

const Tag = mongoose.model('Tag', tagSchema)
module.exports = Tag;