const mongoose = require('mongoose')

const tagSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    questions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Question"
    }],
    id: {
        type: String,
        required: true,
        unique: true
    }
}, { timestamps: true })

const Tag = mongoose.model('Tag', tagSchema)
module.exports = Tag;