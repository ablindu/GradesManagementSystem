(function () {
    'use strict';

    var serviceId = 'datacontext';
    angular.module('app').factory(serviceId, ['common', datacontext]);

    function datacontext(common) {
        var $q = common.$q;

        var service = {
            getPeople: getPeople,
            getClasses: getClasses,
            getMessageCount: getMessageCount
        };

        return service;

        function getMessageCount() { return $q.when(12); }

        function getPeople() {
            var people = [
                { w1: 8, w2: 8, w3: 9, w4: 7, w5: 8, w6: 8, w7: 9, w8: 7, w9: 8, w10: 8, w11: 9, w12: 7, w13: 5 ,w14: 10 },
                /* { firstName: 'Ward', lastName: 'Bell', age: 31, location: 'California' },
                 { firstName: 'Colleen', lastName: 'Jones', age: 21, location: 'New York' },
                 { firstName: 'Madelyn', lastName: 'Green', age: 18, location: 'North Dakota' },
                 { firstName: 'Ella', lastName: 'Jobs', age: 18, location: 'South Dakota' },
                 { firstName: 'Landon', lastName: 'Gates', age: 11, location: 'South Carolina' },
                 { firstName: 'Haley', lastName: 'Guthrie', age: 35, location: 'Wyoming' }*/
            ];
            return $q.when(people);
        };
        function getClasses() {
            var classes = [
                { name: 'Frontend' },
                { name: '.Net programming' },
                { name: 'Cloud computing' },
                { name: 'Java' }
            ];
            return $q.when(classes);
        }

    }
})();