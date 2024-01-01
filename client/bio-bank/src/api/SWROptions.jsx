export const createCollectionOptions = (newCollection) => {
    return {
        // optismistic data displays until we populate the cache
        optimisticData:(collections) => [...collections.result, newCollection].sort((a, b) => b.id - a.id),
        populateCache: (newCollection, collections) => [...collections.result, newCollection].sort((a, b) => b.id - a.id),
        revalidate: false,
        rollbackOnError: true,
    }
    
}

export const addSampleOptions = (newSample) => {
    return {
        optimisticData:(samples) => [...samples.result, newSample],
        populateCache: (added, samples) => [...samples.result, added],
        revalidate: false,
        rollbackOnError: true,
    }
    
}