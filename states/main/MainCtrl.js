/**
 * Created by paulhindenberg on 09.08.14.
 */
app.controller('MainCtrl', function($scope, $log, LoginService, ConfigService, pouchWrapper){

    $scope.generateTestData = function(){
      pouchWrapper.addTestData(20).then(function(res){
          $log.log(':: onGenerateTestData')
          $log.log(res);
      });
    };


    $scope.startSync = function(){
      pouchWrapper.sync();
    };

    $scope.deleteDB = function(){
        pouchWrapper.destroy().then(function(res){
            $log.log(':: onDeleteDB')
            $log.log(res);
        });
    }
})
