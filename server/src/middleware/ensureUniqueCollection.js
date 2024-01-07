const Collection = require('../models/Collection');

/**
 * Ensures that the collection title is unique before saving it.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 */
async function ensureUniqueCollection(req, res, next) {
    const {title} = req.body;
    const collection = await Collection.findOne({where: {title}});
    if(collection){
        return res.status(400).json({
            message: 'Collection already exists'
        })
    }
    next();
}

module.exports = {
    ensureUniqueCollection
}