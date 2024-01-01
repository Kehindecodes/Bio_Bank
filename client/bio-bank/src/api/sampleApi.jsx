import axios from "axios";

const delay = () => new Promise((resolve) => setTimeout(resolve, 1000));

const sampleApi = axios.create({
    baseURL: "http://localhost:5050",
})

export const samplesUrlEndpoint = "/api/v1/collections/:collectionId/samples";

export const getSamples = async (collectionId) => {
    await delay();
    const response = await sampleApi.get(samplesUrlEndpoint.replace(":collectionId", collectionId));
    return response.data;
}

export const AddSample = async ({collectionId, donorCount, materialType}) => {
    await delay();
    const response = await sampleApi.post(samplesUrlEndpoint.replace(":collectionId", collectionId), {
        donorCount,
        materialType
    })
}