import useSWR,{ useSWRConfig } from "swr"
import axios from "axios"

const API_URL = "http://localhost:5050"

const fetcher = async (url) => {
  const response =  await axios.get(url)
  return response.data
}

function getCollection(){
  const { data, error, } = useSWR(`${API_URL}/v1/api/collections`, fetcher)
  return {data, error}
}

export  {getCollection}