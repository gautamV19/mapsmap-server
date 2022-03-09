const Question = require("../models/question");
const Tag = require("../models/tag");

module.exports.create = async function (req, res) {
    try {
        const { question: qDesc, tags, body } = req.body;

        let question = await Question.create({
            question: qDesc,
            body,
            createdBy: req.user.id
        });

        question = await question.populate("tags");
        question.tags = tags;
        await question.save();

        tags.forEach(async tagId => {
            const tag = await Tag.findById(tagId).populate("questions");
            tag.questions.push(question.id);
            await tag.save();
        })

        question = await question.populate("createdBy", "name email")
        question = await question.populate("tags", "title");
        await question.save();
        return res.status(200).json({
            success: true,
            data: {
                question
            },
            message: "Question created!",
        });
    } catch (err) {
        console.log("Error in creating question --->", err);
    }
}

module.exports.getQuestion = async function (req, res) {
    const questionId = req.query.questionId;
    let question = await Question.findById(questionId).populate("question body vote createdBy tags", "name email title");
    return res.status(200).json({
        message: "This is the tag",
        success: true,
        data: {
            question
        },
    });
}