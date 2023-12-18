const Collection = require("../models/Collection");
// create a new collection
async function createCollection(req, res) {
    try {
        const { diseaseTerm, title } = req.body;
        if (!diseaseTerm) {
            return res.status(400).json({
                message: "diseaseTerm is required",
            });
        }
        if (!title) {
            return res.status(400).json({
                message: "title is required",
            });
        }
        await Collection.create({
            diseaseTerm,
            title,
        });
        res.status(201).json({});
    } catch (error) {
        res.status(500).json({ error: "Failed to create collection" });
    }
}

async function getAllCollection(req, res) {
    const offset = parseInt(req.query?.offset) || 0;
    const limit = parseInt(req.query?.limit) || 10;
    try {
        const collections = await Collection.findAll({
            offset: offset,
            limit: limit,
        });
         res.status(200).json(collections);
    } catch (error) {
         res.status(500).json({ error: "Failed to get collections" });
    }
}

module.exports = {
    createCollection,
    getAllCollection,
};
