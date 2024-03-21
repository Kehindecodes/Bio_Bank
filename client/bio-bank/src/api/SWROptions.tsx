import { Collection, Collections, Sample } from "../types/types";


/**
 * Create options object for collection including optimistic data display, cache population, and error rollback.
 *
 * @param {Collection} newCollection - The new collection to be added.
 * @return {Object} The options object containing optimisticData function, populateCache flag, revalidate flag, and rollbackOnError flag.
 */
export const createCollectionOptions = (newCollection:Collection)  => {
    return {
        // optismistic data displays until we populate the cache
        optimisticData: (currentData: Collections | undefined) => {
            if (!currentData) {
                // If currentData is undefined, return an empty Collections object
                return { result: [], totalRecords: 0 };
            }
            // Add the newCollection to the existing collections and return the updated Collections object
            return {
                ...currentData,
                result: [newCollection, ...currentData.result],
                totalRecords: currentData.totalRecords + 1,
            };
        },
        populateCache: true,
        revalidate: true,
        rollbackOnError: true,
    }
    
}

export const addSampleOptions = (newSample: Sample) => {
    return {
        optimisticData:(samples: Sample[]) => [...samples, newSample],
        populateCache: true,
        revalidate: false,
        rollbackOnError: true,
    }
    
}