(function () {
    'use strict';
    angular.module('app').controller("dashboardController",
        ['common', 'datacontext', dashboardController]);

    function dashboardController(common, datacontext) {
        var getLogFn = common.logger.getLogFn;
        var log = getLogFn("dashboardController");

        var vm = this;
        vm.news = {
            title: 'Grades Management System',
            description: 'System that manage laboratory grades and attendances of students.'
        };
        vm.messageCount = 0;
        var date = new Date();
        vm.dateNow = date.getDate()+' -'+ date.getMonth()+' -'+ date.getFullYear();
        vm.people = [];
        vm.classes= [];
        vm.title = 'Dashboard';

        activate();

        function activate() {
            var promises = [getMessageCount(), getPeople(), getClasses()];
            common.activateController(promises, "dashboardController")
                .then(function () { log('Activated Dashboard View'); });
            //.then();
        }

        function getMessageCount() {
            return datacontext.getMessageCount().then(function (data) {
                return vm.messageCount = data;
            });
        }

        function getPeople() {
            return datacontext.getPeople().then(function (data) {
                return vm.people = data;
            });
        }
         function getClasses() {
            return datacontext.getClasses().then(function (data) {
                return vm.classes = data;
            });
        }
    }
})();