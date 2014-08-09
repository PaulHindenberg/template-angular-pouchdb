/**
 * Created with JetBrains WebStorm.
 * User: paulhindenberg
 * Date: 09.08.14
 * Time: 12:01
 * To change this template use File | Settings | File Templates.
 */
angular.element(document).ready(function(){
    //thats the place to go if yah need to do stuff before angular gets bound to the dom ≠Paul
   angular.module('app');
   angular.bootstrap(document,['app']);
});