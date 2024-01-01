import axios from "axios";

const delay = () => new Promise((resolve) => setTimeout(resolve, 1000));

const collectionApi = axios.create({
    baseURL: "http://localhost:5050",
})

export const collectionsUrlEndpoint = "/api/v1/collections";

export const getCollections = async () => {
    await delay();
    const response = await collectionApi.get(collectionsUrlEndpoint);
    return response.data;
}

export const createCollection = async ({diseaseTerm, title}) => {
    await delay();
    const response = await collectionApi.post(collectionsUrlEndpoint, {diseaseTerm, title});
    return response.data;
}