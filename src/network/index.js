import Protocol from '@/network/Protocol'

export default{
    auth : {
        login(params, header){
            return Protocol.POST('user/login', params, header)
        }
    }
}