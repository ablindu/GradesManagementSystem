(function () {
    'use strict';
    angular.module("app")
        .controller("dashboardController",
        ["common", "datacontext", "dashboardService", dashboardController]);

    function dashboardController(common, datacontext, dashboardService) {
        var getLogFn = common.logger.getLogFn;
        var log = getLogFn("dashboardController");

        var dashboard = this;
        dashboard.news = {
            title: 'Grades Management System',
            description: 'System that manage laboratory grades and attendances of students.'
        };
        dashboard.messageCount = 0;
        var date = new Date();
        dashboard.dateNow = date.getDate() + ' -' + date.getMonth() + ' -' + date.getFullYear();
        dashboard.people = [];
        dashboard.classes = [];
        dashboard.title = 'Dashboard';
        dashboard.selectedOption = '';
        dashboard.updateGradesTable = function () {
            if (dashboard.selectedOption !== '')
                log('Selected course: ' + dashboard.selectedOption);
        };
        activate();

        function activate() {
            var promises = [getMessageCount(), getPeople(), getCoursesForYear(1)];
            common.activateController(promises, "dashboardController")
                .then(function () { log('Activated Dashboard View'); });
        }

        function getMessageCount() {
            return datacontext.getMessageCount().then(function (data) {
                return dashboard.messageCount = data;
            });
        }

        function getPeople() {
            return datacontext.getPeople().then(function (data) {
                return dashboard.people = data;
            });
        }

        function getCoursesForYear(year) {
            dashboardService.course.getCourseForYear({ year: year },
                function (onSuccessData) {
                    dashboard.classes = onSuccessData;
                },
                function (errorResponse) {

                    if (errorResponse.data.exceptionMessage)
                        error(errorResponse.data.exceptionMessage);
                    if (errorResponse.data.error)
                        error(errorResponse.data.error_description);
                });
        }
    }
})();