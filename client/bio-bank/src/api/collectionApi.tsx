import axios from "axios";
import { Collection, Collections } from "../types/types";

const delay = () => new Promise((resolve) => setTimeout(resolve, 1000));

const collectionApi = axios.create({
    baseURL: "http://localhost:5050",
})

export const collectionsUrlEndpoint: string = "/api/v1/collections";

export const getCollections = async (): Promise<Collections> => {
    try {
        await delay();
        const response = await collectionApi.get(collectionsUrlEndpoint);
        return response.data;
    } catch (error) {
        console.error("Error fetching collections:", error);
        throw error;
    }
}



export const createCollection = async ({diseaseTerm, title}: Collection) : Promise<Collection> => {
    try {
        await delay();
        const response = await collectionApi.post(collectionsUrlEndpoint, {diseaseTerm, title});
        return response.data;
    }catch(error){
        console.error("Error creating collection:", error);
        throw error;
    }
    
}