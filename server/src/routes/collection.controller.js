const Collection = require("../models/Collection");
const Sample = require('../models/Sample');
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
// add a new sample to a collection
async function addSample(req, res) {
    const collectionId = req.params.collectionId;
    const { donorCount, materialType } = req.body;
    if (!donorCount) {
        return res.status(400).json({
            message: "donorCount is required",
        });
    }
    // make sure donorCount is a number
    if (typeof donorCount !== "number") {
        return res.status(400).json({
            message: "donorCount must be a number",
        });
    }
    if (!materialType) {
        return res.status(400).json({
            message: "materialType is required",
        });
    }
    try {
        await Sample.create({
            collectionId,
            donorCount,
            materialType
        });
        res.status(201).json({});
    } catch (error) {
        res.status(500).json({ error: "Failed to create sample" });
    }
}

// get all samples in a collection
async function getAllSamples(req, res) {
    const collectionId = req.params.collectionId;
    try {
        const samples = await Sample.findAll({
            where: {
                collectionId: collectionId
            }
        });
        res.status(200).json(samples);
    } catch (error) {
        res.status(500).json({ error: "Failed to get samples" });
    }
}



module.exports = {
    createCollection,
    getAllCollection,
    addSample,
    getAllSamples
};
