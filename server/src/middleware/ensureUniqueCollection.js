const Collection = require('../models/Collection');

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