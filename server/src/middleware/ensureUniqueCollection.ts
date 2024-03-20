import { Request, Response, NextFunction } from 'express';
import Collection from '../models/Collection';

/**
 * Ensures that the collection title is unique before saving it.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 */
export async function ensureUniqueCollection(req: Request, res: Response, next: NextFunction) {
    const {title} = req.body;
    const collection = await Collection.findOne({where: {title}});
    if(collection){
        return res.status(400).json({
            message: 'Collection already exists'
        })
    }
    next();
}