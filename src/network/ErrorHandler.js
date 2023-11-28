
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
        this.error = error;
    }

    processingError() {
        if(this.error.response.hasOwnProperty('status') && this.error.response.hasOwnProperty('data')) {
            const message = this.error.response.data.hasOwnProperty('message') ? this.error.response.data.message : "알 수 없는 오류가 발생했습니다.";
            switch (this.error.response.status) {
                case 400:
                    alert(message);
                    break;
                case 401:
                    alert("로그인을 해주세요.");
                    // router.push({name: 'WebLogin'});    //401에러 발생 시 로그인 시키고 메인화면으로 이동시킴
                    break;
                case 403:
                    alert("허용되지 않은 접근입니다.");
                    break;
                case 500:
                    alert(message);
                    break;
                default:
                    alert(message);
            }
        }
    }
}