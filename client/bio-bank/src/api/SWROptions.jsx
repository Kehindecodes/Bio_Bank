export const createCollectionOptions = (newCollection) => {
    return {
        // optismistic data displays until we populate the cache
        optimisticData:(collections) => [...collections.result, newCollection].sort((a, b) => b.id - a.id),
        populateCache: true,
        revalidate: true,
        rollbackOnError: true,
    }
    
}

export const addSampleOptions = (newSample) => {
    return {
        optimisticData:(samples) => [...samples, newSample],
        populateCache: true,
        revalidate: false,
        rollbackOnError: true,
    }
    
}