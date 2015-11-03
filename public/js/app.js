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
	}




});