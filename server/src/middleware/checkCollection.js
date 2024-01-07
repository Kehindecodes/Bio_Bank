const Collection = require('../models/Collection');

/**
 * Checks if a collection exists and calls the next middleware if it does.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 */
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