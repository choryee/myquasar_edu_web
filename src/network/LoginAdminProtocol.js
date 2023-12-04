import Protocol from "@/network/Protocol";

export default {
    async login(params){
        try {
            let url='http://localhost:8080/login';
            await Protocol.POST(url,params);
        }catch (error){
            error.processingError();
        }
    },
    async adminChangePwd(params){
        try {
            let url = 'http://localhost:8080/api/v1/users/user/update';
            const response = await Protocol.POST(url, params);
            return response;  // 해결된 값 반환
        } catch (error) {
            console.error('adminChangePwd 중 오류 발생:', error);
            throw error;  // 호출 코드에서 잡히도록 에러 다시 던지기
        }
    }
}