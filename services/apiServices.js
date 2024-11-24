import { axiosInstance } from "./Axios";

export function apiServices(){
    async function GET(url, params={}){
        try{
            const response = await axiosInstance.get(url, {params});
            return response;
        }catch(e){
            console.error(`GET ${url} failed: `, e);
            throw e;
        }
    }

    async function POST(url, data={}){
        try{
            const response = await axiosInstance.post(url, data);
            return response;
        }catch(e){
            console.error(`POST ${url} failed: `, e);
            throw e;
        }
    }

    return{
        GET,
        POST
    }
}