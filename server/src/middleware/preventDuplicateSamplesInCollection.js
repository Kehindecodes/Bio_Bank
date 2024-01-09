const Sample = require('../models/Sample');


async function preventDuplicateSamplesInCollection(req, res, next) {
    const {materialType} = req.body;
    const collectionId = req.params.collectionId;
    const sample = await Sample.findOne({where: {collectionId, materialType}});
    if(sample){
        return res.status(400).json({
            message: 'This sample type already exists in this collection'
        })
    }
    next();
}

module.exports = {
    preventDuplicateSamplesInCollection
}