angular.module('MetronicApp')
.service('dashboardService',function  ($http,$interval,API_URL,json2csv) {
  var dashboardService = {};
  var lo_data  ={};
  var lo_fdata ={};
  var la_deliver;
  	// dashboardService.timeout = 0;

  	lo_fdata.drivers = [];
  	var stop;
	dashboardService.get_init = function  () {
		get_API();
		// lo_data.account = 0;
		if(stop){
			$interval.cancel(stop);
		}
		stop = $interval(function() {
			get_API();
		},500)

    // get driver list from local csv file
    json2csv.ConvertToJSON()
    .then(function (result) {
      la_deliver = result.data
    })
	}
	function get_API() {
		$http({
		  method: 'GET',
		  url: API_URL+'MobMonitor/OrderList',
		}).then(function successCallback(response) {
			// console.log(response)
			lo_data.orders = response.data.ea_orders;
			// dashboardService.save(lo_data.orders);
			// var ll = dashboardService.get();
			// console.log("liangliang",ll);
			lo_data.statas = response.data.ea_stats;
			// lo_data.account +=1;
			 setOrders();
			 //dashboardService.save(lo_data.orders);
		}, function errorCallback(response) {
		   // alertService.alert(response);
		});
    function findDeliver(deliver) {
        return deliver.Name === "Nathan";
    }
		function setOrders() {
			lo_fdata.new_order = [];
			lo_fdata.change_addr_order = [];
			lo_fdata.new_user_order = [];
			lo_fdata.reject_order = [];
			lo_fdata.confirm_order = [];
			lo_fdata.delivering_order = [];
			lo_fdata.complete_order = [];
		   // var ia_drivers = [];
      //  console.log(lo_data.orders)
			_.forEach( lo_data.orders, function(order, key) {
			  // console.log(order, key);
        // console.log(order.status)
				switch(order.status) {
				  case '0':
					  lo_fdata.new_order.push(order)
					  break;
				  case '60':
					   lo_fdata.change_addr_order.push(order)
					  break;
				  case '5':
					   lo_fdata.reject_order.push(order)
					  break;
				  case '90':
					   lo_fdata.reject_order.push(order)
					  break;
				  case '55':
					   lo_fdata.new_user_order.push(order)
					  break;
				  case '10':
					  lo_fdata.confirm_order.push(order)
					  break;
				  case '20':
					   lo_fdata.delivering_order.push(order)
					  break;
				  case '30':
					   lo_fdata.delivering_order.push(order)
					  break;
				  case '40':
					   lo_fdata.complete_order.push(order)
					  break;
				}
      });

			// console.log(lo_fdata.delivering_order)

			// 初始化司机order list
			_.forEach(la_deliver,function(driver) {
				driver.orders = [];
			})


      _.forEach(lo_fdata.delivering_order,function(order) {

        // console.log(la_deliver)
        // la_deliver.find(findDeliver).orders.push(order)
        // console.log()
        if(_.findIndex(la_deliver, function(o) { return o.Name == order.deliver; }) == -1){
          // console.log(order.deliver)
        }

      })
      // console.log(la_deliver)

      // 初始化司机order list
      // _.forEach(lo_fdata.drivers,function(driver) {
      //   driver.orders = [];
      // })


			// 分配order到司机 order list
			// _.forEach(lo_fdata.delivering_order,function(order) {
			//    	var driver_index = _.findIndex(lo_fdata.drivers, function(driver) {
			// 	  return driver.deliver == order.deliver;
			// 	});
			// 	if(driver_index == '-1'){
			// 		var driver = {}
			// 		driver.deliver = order.deliver;
			// 		driver.orders = [];
			// 		driver.orders.push(order)
			// 		lo_fdata.drivers.push(driver)
			// 	}else{
			// 		var driver_order_index = _.findIndex(lo_fdata.drivers, function(driver) {
			// 			return driver.deliver == order.deliver;
			// 		});
			// 		lo_fdata.drivers[driver_index].orders.push(order)
			// 	}
			// });



			// 从司机表中移除无单的司机
			// _.forEach(lo_fdata.drivers,function(driver,key) {
			// 	if(driver.orders.length == 0){
			// 		lo_fdata.drivers.splice(key,1);
			// 	}
			// });
		};
	};




	dashboardService.get_orders = function  () {
			if (lo_data.statas !== null){
				// console.log("lo_data in service",lo_data)
				return lo_data;
			}
	}
	dashboardService.get_fomat = function  () {
		if (lo_fdata.statas !== null){
			return lo_fdata;
		}
	}
  dashboardService.find_order = function  (oid) {
    serach_order = _.find(lo_data.orders, function(order){
        return order.oid == oid;
    });
    return serach_order
	}
	var audio = new Audio('audio/pikapi.wav');
	function play_audio () {
		// dashboardService.timeout = 30;
		// var timeout = $interval(function() {
		// 	if(dashboardService.timeout > 0){
		// 		dashboardService.timeout  -= 1

		// 	}else{
		// 		$interval.cancel(timeout);
		// 	}
		// 	// console.log(dashboardService.timeout)
		// },1000)
		// audio.play();
    console.log(lo_fdata.new_order)
		// $interval(function() {
		// 	if(lo_fdata.new_order.length + lo_fdata.change_addr_order.length + lo_fdata.new_user_order.length > 0 ){
		// 			audio.play();
    //
		// 	}
		// },30000)
	}
	play_audio();
  return dashboardService
})
