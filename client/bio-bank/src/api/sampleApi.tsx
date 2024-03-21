import axios from "axios";
import { Sample } from "../types/types";

 export const delay = () => new Promise((resolve) => setTimeout(resolve, 1000));

const sampleApi = axios.create({
    baseURL: "http://localhost:5050",
})

export const samplesUrlEndpoint = "/api/v1/collections/:collectionId/samples";

export const getSamples = async (collectionId: string): Promise<Sample[]> => {
    try {
        await delay();
        const response = await sampleApi.get(samplesUrlEndpoint.replace(":collectionId", collectionId));
        return response.data;

    } catch (error) {
        console.error("Error fetching samples:", error);
        throw error;
    }
   
}

export const addSample = async ( collectionId: string, {donorCount, materialType}: Sample): Promise<Sample> => {
    try{
        await delay();
        const response = await sampleApi.post(samplesUrlEndpoint.replace(":collectionId", collectionId), {
            donorCount,
            materialType
        })
        return response.data;
    }
    catch(error){
        console.error("Error adding sample:", error);
        throw error;
    }
}