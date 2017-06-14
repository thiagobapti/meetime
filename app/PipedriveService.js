app.service('PipedriveService', ['$http', function($http){

	this.listPersons = function(token){

		return $http({
			method : "GET",
			url : "https://api.pipedrive.com/v1/persons?start=0&api_token="+token
		});

	};

}]);