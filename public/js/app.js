var app = angular.module('code_api',[]);

//QSTW8u52WU-token 
//3L91MgSBNS-

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
});

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
		if(len == 0 || len == 1){
			$scope.position = 0;
		}else{
			$scope.position = $scope.haystack.indexOf($scope.needle);
		}
	};
});

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


});


