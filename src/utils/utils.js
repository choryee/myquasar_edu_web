
// 날짜 관련 유틸
// dateUtil.format(new Date(), 'yyyy-MM-dd hh:mm:ss (KS)')  =>  '2023-01-01 12:30:43 (화)'
export const dateUtil = {
    format: function(date, formatter){
        if (!date.valueOf()) return null;
        const weekKorName = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
        const weekKorShortName = ["일", "월", "화", "수", "목", "금", "토"];
        const weekEngName = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const weekEngShortName = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        const padStart = (n) => n.toString().padStart(2, '0')
        return formatter.replace(/(yyyy|yy|MM|dd|KS|KL|ES|EL|HH|hh|mm|ss|a\/p)/gi, function ($1) {
            switch ($1) {
                case "yyyy":
                    return date.getFullYear(); // 년 (4자리)
                case "yy":
                    return padStart(date.getFullYear() % 1000); // 년 (2자리)
                case "MM":
                    return padStart(date.getMonth() + 1); // 월 (2자리)
                case "dd":
                    return padStart(date.getDate()); // 일 (2자리)
                case "KS":
                    return weekKorShortName[date.getDay()]; // 요일 (짧은 한글)
                case "KL":
                    return weekKorName[date.getDay()]; // 요일 (긴 한글)
                case "ES":
                    return weekEngShortName[date.getDay()]; // 요일 (짧은 영어)
                case "EL":
                    return weekEngName[date.getDay()]; // 요일 (긴 영어)
                case "HH":
                    return padStart(date.getHours()); // 시간 (24시간 기준, 2자리)
                case "hh":
                    const h = date.getHours() % 12
                    return padStart(h?h:12); // 시간 (12시간 기준, 2자리)
                case "mm":
                    return padStart(date.getMinutes()); // 분 (2자리)
                case "ss":
                    return padStart(date.getSeconds()); // 초 (2자리)
                case "a/p":
                    return date.getHours() < 12 ? "오전" : "오후"; // 오전/오후 구분
                default:
                    return $1;
            }
        })
    }
}

// 단위 관련 유틸
export const unitUtil = {
    meterToKilometer: (meter, digits) => (parseInt(meter) / 1000).toFixed(digits || 2),
    secondToTime: (second) => Math.floor(parseInt(second) / 3600).toString().padStart(2, '0') + ':' + Math.floor(parseInt(second) % 3600 / 60).toString().padStart(2, '0'),
    removeSecond: (time) => time.split(':').filter((e, i)=>i<2).join(':')
}
