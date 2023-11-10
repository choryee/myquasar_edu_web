import Protocol from '@/network/Protocol'

export default{
    auth : {
        login(params, header){
            return Protocol.POST('login', params, header)
        },
        adminPasswordChange(params,header){
            return Protocol.PATCH('auth/password')
        }
    },
    employee : {
        employeeInsert(params ,header){
            return Protocol.POST('employee/insert', params, header)
        },
        employeeList(params, header){
            return Protocol.GET('employee/list', params, header)
        },
        employeeDelete(params, header){
            return Protocol.DELETE('employee/delete/', params, header)
        },
        employeeUpdate(params, header){
            return Protocol.PUT('employee/update/', params, header)
        }
    },
    dayoff : {
        dayoffObligation(params, header){
            return Protocol.POST('dayoff/obligation/', params, header)
        },
        dayoffWorkSave(params, header){
            return Protocol.POST('dayoff/work/save', params, header)
        },
        dayoffWorkInfo(params, header){
            return Protocol.GET('dayoff/work/info', params, header)
        },
        dayoffWorkDelete(params, header){
            return Protocol.DELETE('dayoff/work/delete', params, header)
        },
        dayoffUse(params, header){
            return Protocol.GET('dayoff/employee', params, header)
        },
        dayoffRemaining(params, header){
            return Protocol.GET('dayoff/employee/remaining', params, header)
        },
    },
    calender : {
        calenderPatternInsert(params, header){
            return Protocol.POST('calender/pattern/Insert', params, header)
        },
        calenderPatternInfo(params, header){
            return Protocol.GET('calender/pattern/info', params, header)
        },
        calenderPatternDelete(params, header){
            return Protocol.DELETE('/calender/pattern/delete', params, header)
        }
    }
}