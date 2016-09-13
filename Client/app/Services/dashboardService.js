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
                })
        }
    }
})()