import defaultAPI from '@/network/AxiosConfig'
import {ServerError, NetworkError} from '@/network/ErrorHandler'

function processing(axiosMethod, resolve, reject){
    axiosMethod.then(res=>{
        disposeResult(res, resolve, reject)
    }).catch(err=>{
        reject(new ServerError(err))
    })
}
function disposeResult(res, resolve, reject){
    if(res.data.hasOwnProperty('resultCode'))
        res.data.resultCode === 0
            ? resolve(res.data)
            : reject(new NetworkError(res.data.desc))
}

export default{
    GET: function(url, params, headers){
        return new Promise((resolve, reject)=>{
            const instance = defaultAPI.get(url, {params: params, headers: headers || {}})
            processing(instance, resolve, reject)
        })
    },
    POST: function(url, params, headers){
        return new Promise((resolve, reject)=>{
            const instance = defaultAPI.post(url, params, {headers: headers || {}})
            processing(instance, resolve, reject)
        })
    },
    PUT: function(url, params, headers){
        return new Promise((resolve, reject)=>{
            const instance = defaultAPI.put(url, params, {headers: headers || {}})
            processing(instance, resolve, reject)
        })
    },
    DELETE: function(url, params, headers){
        return new Promise((resolve, reject)=>{
            const instance = defaultAPI.delete(url, {params: params, headers: headers || {}})
            processing(instance, resolve, reject)
        })
    }
}