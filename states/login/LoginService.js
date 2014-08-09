/**
 * Created by paulhindenberg on 09.08.14.
 */
angular.module('app.services', [])
.factory('LoginService', function($http, $q, ConfigService) {
    return {
        login: function(){
            return true;
        }
    }
})
