const Tag = require('../models/tag')

module.exports.getQuestions = async function (req, res) {
    const tagId = req.query.tagId;
    console.log(tagId);
    const tag = await Tag.findById(tagId).populate("questions", "question body vote createdBy");
    return res.status(200).json({
        message: "This is the tag",
        success: true,
        data: {
            tag,
            questions: tag.questions
        },
    });
}

module.exports.create = async function (req, res) {
    const { title } = req.body;
    const tag = await Tag.create({ title });
    return res.status(200).json({
        message: "Tag created successfully",
        success: true,
        data: {
            tag
        },
    });
}