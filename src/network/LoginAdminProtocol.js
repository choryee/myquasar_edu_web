import Protocol from "@/network/Protocol";

export default {
    async login(params){
        try {
            let url='http://localhost:8080/login';
            await Protocol.POST(url,params);
        }catch (error){
            error.processingError();
        }
    }
}