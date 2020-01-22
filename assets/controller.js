(function () {
    'use strict';

    setup.controller('appController', ['$scope', 'zendeskService', function ($scope, zendeskService) {
        $scope.fieldList = {
            field: []
        };

        zendeskService.getAllFields().then(function(data){
            var ZDFields = data;
            zendeskService.getFieldsSunshine().then(function(data){
                var SunFields = data;
                angular.forEach(ZDFields, function(field) {
                    if(field.active != false){
                        field.checked = false;
                    angular.forEach(SunFields, function(sunshine){
                        if(sunshine.external_id == field.id){
                            field.checked = true;   
                        }
                    });        
                    $scope.fieldList.field.push(field);            
                }
                
                });
            });
        });
        
        $scope.saveFieldId = function(data){
            if(data.checked){
                var id = data.id;
                zendeskService.saveIdSunshine(id).then(function(data){
                    console.log("OK!");
                });
            }
            else
            {
                var id = data.id;
                zendeskService.deleteIdSunshine(id).then(function(data){
                    console.log("OK!");
                });
            }
           
        }
        
        


    }]);
})();