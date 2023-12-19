const Collection = require('../models/Collection');

async function checkCollection(req, res, next) {
    const collectionId = req.params.collectionId;
    const collection = await Collection.findOne({
        where: {
            id: collectionId
        }
    });
    if (!collection) {
        return res.status(404).json({
            message: 'Collection not found'
        });
    }
    next();
}

module.exports = {
    checkCollection
}