import { Request, Response, NextFunction } from 'express';
import Sample from '../models/Sample';


export async function preventDuplicateSamplesInCollection(req: Request, res: Response, next: NextFunction) {
    const {materialType} = req.body;
    const collectionId : number = Number(req.params.collectionId);
    const sample = await Sample.findOne({where: {collectionId, materialType}});
    if(sample){
        return res.status(400).json({
            message: 'This sample type already exists in this collection'
        })
    }
    next();
}

