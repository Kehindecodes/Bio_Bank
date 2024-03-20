import { Request, Response } from 'express';
import Collection from '../models/Collection';
import Sample from '../models/Sample';

// create a new collection
 export async function createCollection(req: Request, res: Response): Promise<void>  {
    try {
        // validate request body
        if (!req.body) {
            res.json({
                message: "request body is required",
            });
        }
        const { diseaseTerm, title } = req.body;
        if (!diseaseTerm) {
            res.status(400).json({
                message: "diseaseTerm is required",
            });
        }
        if (!title) {
            res.status(400).json({
                message: "title is required",
            });
        }
        const collection = await Collection.create({
            diseaseTerm,
            title,
        });
        res.status(201).json(collection);
    } catch (error) {
        res.status(500).json({ error: "Failed to create collection" });
    }
}

 export async function getAllCollection(req: Request, res: Response) : Promise<void> {
    try {
        const collections = await Collection.findAll({});
        // get total records in the database
        const totalRecords: number = await Collection.count();
         res.status(200).json({
            result: collections,
            totalRecords: totalRecords,
        });
    } catch (error) {
        res.status(500).json({ error: "Failed to get collections" });
    }
}
// add a new sample to a collection
export async function addSample(req: Request, res: Response) : Promise<void> {
    const collectionId = req.params.collectionId;
    const { donorCount, materialType } = req.body;
    if (!donorCount) {
        res.status(400).json({
            message: "donorCount is required",
        });
    }
    // check if donorCount is a number
    if (typeof donorCount !== "number") {
        res.status(400).json({
            message: "donorCount must be a number",
        });
    }
    if (!materialType) {
        res.status(400).json({
            message: "materialType is required",
        });
    }
    try {
        const sample = await Sample.create({
            collectionId,
            donorCount,
            materialType,
        });
        res.status(201).json(sample);
    } catch (error) {
        res.status(500).json({ error: "Failed to create sample" });
    }
}

// get all samples in a collection
 export async function getAllSamples(req: Request, res : Response) : Promise<void> {
    const collectionId = req.params.collectionId;
    try {
        const samples = await Sample.findAll({
            where: {
                collectionId: collectionId,
            },
        });
        res.status(200).json(samples);
    } catch (error) {
        res.status(500).json({ error: "Failed to get samples" });
    }
}
