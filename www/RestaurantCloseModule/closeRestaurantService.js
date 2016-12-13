angular.module('myApp')
  .service('closeRestaurantService', function ($http, $timeout,$q) {
    // getCloseRestaurants

    /*  input:
      response.data.ev_result:  0 ok | 1 fail
      response.data.ev_message: error message
      response.data.ea_restaurant:
      [
        {
          rid :"123"
          rr_name :"cccccc"
          start_time :"aaa"
          end_time :"nnn"
          close_id :"123"
        }
      ]

      export:
      {
          rid :"123",
          name:"ccccc",
          start_time: "aaa",
          end_time:"bbb"
          close_id:"123"
      }
    */

    function getCloseRestaurants() {
      var deferred = $q.defer();
        //init data
          var closeRestaurants = [];

          // successCallback
          var successCallback = (response)=>{

            const data = response.data;
            _.forEach(closeRestaurant, function(restaurant, id) {
               var data = {};
               data.rid = restaurant.rid;
               data.name = restaurant.rr_name;
               data.start_time = restaurant.start_time;
               data.end_time = restaurant.end_time;
               data.close_id = restaurant.close_id;
               closeRestaurants.push(data);
              })
        deferred.resolve(closeRestaurants)
          }
          // successCallback end

          //errorCallback
          var errorCallback = (response)=>{
        deferred.reject(response)
          }
          // errorCallback end

          $http({
             method: 'GET',
             url: "http://test.norgta.com/public/api/v1/rr_close",
             headers: {
               'Content-Type': 'application/json',
               'Authortoken': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE0ODA5NTM4NjcsImV4cCI6MTUxMjQ4OTg2NywiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsIkdpdmVuTmFtZSI6IkpvaG5ueSIsIlN1cm5hbWUiOiJSb2NrZXQifQ.-WTLfPc5k7IZ-e_T5JfTAGXK0ZjB8xmaBecj1lo1Aj4'
             }
           }).then(successCallback,errorCallback)
       return deferred.promise

    }
    // getCloseRestaurants end

    function getQTest(){
      var deferred = $q.defer();
      var QTEstArray=[];
      var TestObject = {test:"test"};
      QTEstArray.push(TestObject);
      $timeout(function () {
      deferred.resolve(QTEstArray)
      console.log(QTEstArray)
       }, 500);

     return deferred.promise
    }

    function updateCloseRestaurant(){
      $http({
        method:"PUT",
        url:"http://test.norgta.com/public/api/v1/rr_close/close_id",
        data: {restaurant_information: crc.updateRestaurantInformation},
        config:""
      })
     .then(
         function(response){
           // success callback
         },
         function(response){
           // failure callback
         }
      );
    }
  function addCloseRestaurant(){
    $http({
      method: 'POST',
      url: 'http://test.norgta.com/public/api/v1/rr_close/',
      headers: {
        'Authortoken': "",
      },
      data: {restaurant_information: crc.newCloseRestaurant }
    }).then(function successCallback(response) {
        console.log(response)
    }, function errorCallback(response) {
      console.log(response)
      });
      }

    return ({
      getCloseRestaurants : getCloseRestaurants,
      updateCloseRestaurant: updateCloseRestaurant,
      addCloseRestaurant : addCloseRestaurant,
      getQTest : getQTest
    })


});