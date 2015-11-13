var app = angular.module('code_api',[]); //initialize the angular app module

//registration controller to get a token
//makes use of $http POST to the endpoint given
app.controller('reg_ctrl',function($scope,$http){
	$scope.register = function(){
	    var reg_token = {
	    	"email": this.email,
	    	"github": this.github
		};
		$http.post('http://challenge.code2040.org/api/register',{
			"email":this.email,
			"github":this.github
		}).success(function(response){
			var result = response;
			$scope.token = result.result;
		});
	};

});

//controller for stageI. 
//function gen_string generates a string from the Code2040 API
//function rev_string reverses the given string
app.controller('reverse_ctrl',function($scope,$http){
	$scope.gen_string = function(){
		$http.post('http://challenge.code2040.org/api/getstring',{
			"token":"QSTW8u52WU"
		}).success(function(response){
			var result = response;
			$scope.word = result.result;
		});
	};

	$scope.rev_string = function(){
		var len = $scope.word.length;
		$scope.reverse = "";
		if(len==0 || len ==1){
			$scope.reverse = $scope.word;
		} else {
			for(var i=len-1; i>-1; i--){
				$scope.reverse += $scope.word.charAt(i);
			}
		}
	};

	$scope.validate_string = function(){
		console.log("clicked v str");
		$http.post('http://challenge.code2040.org/api/validatestring',{
			"token":"QSTW8u52WU",
			"string":$scope.reverse
		}).success(function(response){
			$scope.answer = "response.result";
		});
	};
});

// controller for stage II .
// get_haystack gets an array from the API with $http
// find_needle gets the position of the 'needle' in the array
app.controller('needle_ctrl',function($scope,$http){
	$scope.get_haystack = function(){
		$http.post('http://challenge.code2040.org/api/haystack',{
			"token":"QSTW8u52WU"
		}).success(function(response){
			var result = response;
			$scope.haystack = result.result.haystack;
			$scope.needle = result.result.needle;
		});
	};

	$scope.find_needle = function(){
		var len = $scope.haystack.length;
		if(!len) $scope.position = -1;
		if(len == 1){
			$scope.position = 0;
		}else{
			$scope.position = $scope.haystack.indexOf($scope.needle);
		}
	};

	$scope.validate_needle = function(){
		console.log("clicked v nidl");
		$http.post('http://challenge.code2040.org/api/validateneedle',{
			"token":"QSTW8u52WU",
			"needle":$scope.position
		}).success(function(response){
			$scope.answer = "response.result";
		});
	};

});

// controller for stage initialize
// get_array gets an array from the API
// make_array creates an array composed of elements from the first array that don't have a substring that matches prefix
//send_result posts the array to the given endpoint.
app.controller('prefix_ctrl',function($scope,$http){
	$scope.get_array = function(){
		$http.post('http://challenge.code2040.org/api/prefix',{
			"token":"QSTW8u52WU"
		}).success(function(response){
			var result = response;
			$scope.prefixo = result.result.prefix;
			$scope.list = result.result.array;
		});
	};

	$scope.make_array = function(){
		var list_len = $scope.list.length;
		var prefix_len = $scope.prefixo.length;
		var list2 = [];
		for(var i=0; i<list_len;i++){
			if($scope.list[i].substr(0,prefix_len) != $scope.prefixo){
				list2.push($scope.list[i]);
			}
		}
		$scope.result_array = list2;
	};

	$scope.send_result = function(){
		$http.post('http://challenge.code2040.org/api/validateprefix',{
			"token":"QSTW8u52WU",
			"array":$scope.result_array
		}).success(function(response){
			$scope.answer = "response.result";
		});
	};
});


//controller for stage IV
// get_date retrives a date in ISO format from the API
// add_interval converts the date into seconds, then adds the interval to the the converted time
// The total seconds is then converted back to ISO format
// post_result posts the resulting date to the API
app.controller('date_ctrl',function($scope, $http){

	$scope.get_date = function(){
		$http.post('http://challenge.code2040.org/api/time',{
			"token":"QSTW8u52WU"
		}).success(function(response){
			var result = response;
			$scope.datum = result.result.datestamp;
			$scope.interval = result.result.interval;
		});
	};

	$scope.add_interval = function(){
		var dt = $scope.datum.split(/[: T-]/).map(parseFloat);
		var datu = new Date (dt[0], dt[1] - 1, dt[2], dt[3] || 0, dt[4] || 0, dt[5] || 0, 0);
		var datum_secs = (datu.getTime())/100;
		var new_time = datum_secs + $scope.interval;
		var new_date = new Date (new_time * 100);
		var new_date_iso = new_date.toISOString();
		$scope.new_iso_date = new_date_iso;
	};

	$scope.post_result = function(){
		$http.post('http://challenge.code2040.org/api/validatetime',{
			"token":"QSTW8u52WU",
			"datestamp":$scope.new_iso_date
		}).success(function(response){
			var result = response;
			$scope.feedback = result.result;
		});
	};

});


