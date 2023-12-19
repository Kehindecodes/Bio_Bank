const Sample = require('../models/Sample');

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
        const sample = await Sample.create({
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
    addSample,
    getAllSamples
}


