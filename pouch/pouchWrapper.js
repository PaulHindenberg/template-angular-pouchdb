/**
 * Created by paulhindenberg on 09.06.14.
 */
app.factory('myPouch', [function() {
    var mydb = new PouchDB('ng-pouch-my', {adapter:'websql'});
    return mydb;
}]);

app.factory('pouchWrapper', ['$q', '$rootScope', 'myPouch', 'LoginService', 'ConfigService', function($q, $rootScope, myPouch, LoginService, ConfigService) {

    function syncError(err){
        console.log('syncError:');
        console.log(err);
    }

    return {
        sync: function(){
            var sync = PouchDB.sync('ng-pouch-my', ConfigService.getRemoteCouch(), {live: true})
                .on('change', function (info) {
                    // handle change
                    console.log(':: onChange');
                    console.log(info);
                }).on('complete', function (info) {
                    // handle complete
                    console.log(':: onComplete');
                    console.log(info);
                }).on('uptodate', function (info) {
                    // handle up-to-date
                    console.log(':: onUpToDate');
                    console.log(info);
                }).on('error', function (err) {
                    // handle error
                    console.log(':: onError');
                    console.log(err);
                });
        }
        ,addTestData: function(howManySir) {
            var deferred = $q.defer();
            var i=0;
            var docs = [];
            while(i<howManySir){
                i++;
                docs.push({example: 'exampletext_'+i});
            }

            myPouch.bulkDocs(docs, function(err, res) {
                $rootScope.$apply(function() {
                    if (err) {
	                    console.log('::could not apply testdata');
                        deferred.reject(err)
                    } else {
                        deferred.resolve(res)
                    }
                });
            });

            return deferred.promise;
        }
        ,destroy: function(){
            var deferred = $q.defer();
            myPouch.destroy(function(err, info) {
                $rootScope.$apply(function() {
                    if (err) {
                        deferred.reject(err)
                    } else {
                        deferred.resolve(info)
                    }
                });
            });
            return deferred.promise;
        }
        ,createIndex: function(){
            console.log('::: start creating index')

            var designDoc = {
                _id: '_design/my_index',
                views: {
                    'my_index': {
                        map: function(doc) {
                            emit(doc.example);
                        }.toString()
                    }
                }
            };

            myPouch.put(designDoc).then(function (info) {
                // design doc created
                console.log('::info: index created')
            }).catch(function (err) {
                 if (err.name === 'conflict'){
                     console.log('::design doc already exists');
                 }
            });
        }
    }
}]);