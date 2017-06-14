app.service('CarService', ['$http', function($http){

	this.list = function(){

		return $http({
			method : "GET",
			url : "https://meetime-df656.firebaseio.com/Carros.json"
		})
		.then(function(response){

			// Converte os dados que chegam como objeto para array 

			var auxArr = [];

			for(var carID in response.data){

				response.data[carID].id = carID;

				auxArr.push(response.data[carID]);

			}

			return auxArr;

		});

	};

	this.remove = function(id){

		return $http({
			method : 'DELETE',
			url : 'https://meetime-df656.firebaseio.com/Carros/'+id+'.json'
		});

	};

	this.save = function(car){

		if(car.hasOwnProperty('id'))
			return edit(car);
		else
			return add(car);

	};

	function add(car){

		return $http({
			method : 'POST',
			url : 'https://meetime-df656.firebaseio.com/Carros.json',
			data:car
		});

	}
	function edit(car){

		var id = car.id;
		delete car.id;

		return $http({
			method : 'PUT',
			url : 'https://meetime-df656.firebaseio.com/Carros/'+id+'.json',
			data:car
		});

	}

}]);