const Collection = require("../models/Collection");
const Sample = require('../models/Sample');
const { getPagination } = require("../services/query");
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
    const { skip, limit } = getPagination(req.query);
    try {
        const collections = await Collection.findAll({
            offset: skip,
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
    // check if donorCount is a number
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
    const { skip, limit } = getPagination(req.query);
    try {
        const samples = await Sample.findAll({
            where: {
                collectionId: collectionId
            },
            offset: skip,
            limit: limit,

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
