(function () {
    'use strict';
    var controllerId = 'adminController';
    angular.module('app').controller(controllerId, ['common', adminController]);

    function adminController(common) {
        var getLogFn = common.logger.getLogFn;
        var log = getLogFn(controllerId);

        var admin = this;
        admin.title = 'Admin';

        activate();

        function activate() {
            common.activateController([], controllerId)
                .then(function () { log('Activated Admin View'); });
                
        }
    }
})();