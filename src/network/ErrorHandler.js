export class NetworkError {
    constructor(desc) {
        if(!desc) {
            this.desc = "통신 에러";
        } else {
            this.desc = desc;
        }

    }

    getErrorMessage() {
        return this.desc;
    }
}

export class ServerError {    //300 ~ 500 에러 발생 시 처리용 커스텀 에러 클래스
    constructor(error) {
        this.status = error?.response?.status;
    }

    getErrorMessage() {
        return getErrorTypeMessage(this.status);
    }
}

const getErrorTypeMessage = function(status){
    switch(status) {
        case 400:
            return '400 error';
        case 401:
            // router.push({name: 'WebLogin'});    //401에러 발생 시 로그인 시키고 메인화면으로 이동시킴
            return '401 error';
        case 500:
            return '500 error';
        default:
            return 'server error';
    }
}