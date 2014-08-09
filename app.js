var app = angular.module('app', ['ui.router','app.services'])

.run(function() {
})


// this is for globally unsubscribing from events, there was some discussion in the iNet coz of event bubbling
.config(['$provide', function($provide){
    $provide.decorator('$rootScope', ['$delegate', function($delegate){

        Object.defineProperty($delegate.constructor.prototype, '$onRootScope', {
            value: function(name, listener){
                var unsubscribe = $delegate.$on(name, listener);
                this.$on('$destroy', unsubscribe);

                return unsubscribe;
            },
            enumerable: false
        });


        return $delegate;
    }]);
}])