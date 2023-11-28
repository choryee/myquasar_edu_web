import defaultAPI from '@/network/AxiosConfig'
import {ServerError, NetworkError} from '@/network/ErrorHandler'

/**
 * 200 or not
 * @param axiosMethod
 * @param resolve
 * @param reject
 */
function processing(axiosMethod, resolve, reject){
    axiosMethod.then(res=>{
        disposeResult(res, resolve, reject)
    }).catch(err=>{
        reject(new ServerError(err))
    })
}

/**
 * 200번 성공시 처리
 * @param res
 * @param resolve
 * @param reject
 */
function disposeResult(res, resolve, reject){
    if(res.data.hasOwnProperty('resultCode')) {
        res.data.resultCode === 0
            ? resolve(res.data)
            : alert(res.data?.message);
    } else {
        if (res.data.hasOwnProperty("message")) {
            alert(res.data.message);
        } else {
            alert("네트워크 에러");
        }
    }
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
    },
    PATCH:function(url,params,headers){
        return new Promise((resolve, reject)=>{
            const instance = defaultAPI.patch(url, {params: params, headers: headers || {}})
            processing(instance, resolve, reject)
        })
    }
}