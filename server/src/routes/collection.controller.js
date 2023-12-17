const Collection = require('../models/Collection');
async function createCollection(req, res) {
    try {
        const {diseaseTerm, title} = req.body;
        if(!diseaseTerm){
            return res.status(400).json({
                message: 'diseaseTerm is required'
            })
        }
        if(!title){
            return res.status(400).json({
                message: 'title is required'
            })
        }
     await Collection.create({
            diseaseTerm,
            title
        })
        res.status(201).json({});

    } catch (error) {
        res.status(500).json({error: 'Failed to create collection'});
    }
}

async function getAllCollection(req, res) {
    try {
        const collections = await Collection.findAll();
        res.status(200).json(collections);
    } catch (error) {
        res.status(500).json({error: 'Failed to get collections'});
    }
}

module.exports = {
    createCollection,
    getAllCollection
}