(function () {
    "use strict";
    angular
        .module("app")
        .factory("dashboardService",
        ["$resource", "appSettings", "userService", dashboardService]);

    function dashboardService($resource, appSettings, userService) {
        var token = "Bearer " + userService.getProfile().token;

        return {
            course: $resource(appSettings.serverpath + "/api/Course/GetCourseForYear",
                { year: '@year' },
                {
                    'getCourseForYear': {
                        method: 'GET',
                        isArray: true,
                        headers: { 'Authorization': token }
                    }/*,
                    'createCourse':{
                        method: 'POST',
                        headers: { 'Authorization': token}
                    },
                    'updateCourse':{
                        method:'PUT',
                        headers: { 'Authorization': token}
                    }*/
                }),
            grades: $resource(appSettings.serverpath + '/api/Grades/GetGradesByCourse',
                { courseId: '@courseId' },
                {
                    'getCourseForYear': {
                        method: 'GET',
                        isArray: true,
                        headers: { 'Authorization': token }
                    }
                }),
            attendances: $resource(appSettings.serverpath + '/api/Attendance/GetAttendancesByCourse',
                { courseId: '@courseId' },
                {
                    'getAttendancesForCourse': {
                        method: 'GET',
                        isArray: true,
                        headers: { 'Authorization': token }
                    }
                })
        }
    }
})()