import { Request, Response, NextFunction } from 'express';
import Collection from '../models/Collection';

/**
 * Checks if a collection exists and calls the next middleware if it does.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 */
export async function checkCollection(req: Request, res: Response, next: NextFunction): Promise<void>  {
    const collectionId = req.params.collectionId;
    const collection = await Collection.findOne({
        where: {
            id: collectionId
        }
    });
    if (!collection) {
       res.status(404).json({
            message: 'Collection not found'
        });
    }
    next();
}

