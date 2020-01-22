(function () {
    'use strict';

    setup.service('zendeskService', ["$q", function ($q) {

        return {
            saveIdSunshine: function(data) {
                var deferred = $q.defer();

                var sunshine_data = {
                    "data": {"type": 'idfields_chat', "external_id": data, "attributes":{
                        "field_id": data 
                    }}
                }

                client.request({
                    url: '/api/sunshine/objects/records',
                    type: 'POST',
                    contentType: 'application/json',
                    data: JSON.stringify(sunshine_data),
                }).then(
                    function(response) {
                        console.log(response);
                        deferred.resolve(response.external_id);
                    }
                );
                return deferred.promise;
            },
            deleteIdSunshine: function(data) {
                var deferred = $q.defer();

                client.request({
                    url: '/api/sunshine/objects/records?type=idfields_chat&external_id=' + data,
                    type: 'DELETE',
                    contentType: 'application/json',
                }).then(
                    function(response) {
                        deferred.resolve(response);
                    }
                );
                return deferred.promise;
            },
            getAllFields: function () {

                var deferred = $q.defer();

                client.request({
                    url: '/api/v2/ticket_fields.json',
                    type:'GET',
                    contentType: 'application/json',
                }).then(
                    function (response) {
                        deferred.resolve(response.ticket_fields);
                    }
                );
                return deferred.promise;
            },

            getFieldsSunshine: function(){
                var deferred = $q.defer();
                
                client.request({
                    url: '/api/sunshine/objects/records?type=idfields_chat',
                    type:'GET',
                    contentType: 'application/json',
                }).then(
                    function (response) {
                        console.log(response.data);
                        deferred.resolve(response.data);
                    }
                );
                return deferred.promise;
            },
               
        }
      }]);
})();