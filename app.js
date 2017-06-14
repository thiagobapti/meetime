var app = angular.module('App', []);

app.controller('CarController', ['$scope', 'CarService', 'PipedriveService', function($scope, CarService, PipedriveService){

	allowedColors = ['BRANCO', 'BRANCA', 'PRETO', 'PRETA', 'VERDE'];

	$scope.alertMessage = undefined;

	$scope.pipedriveToken = '075d87aa876589a9f8e8af4da45ac963ec2f5b34';

	$scope.car = undefined;

	$scope.customers = undefined;

	$scope.customer = undefined;

	$scope.cars = [];

	init = (function(){

		loadCars();

	})();

	$scope.new = function(){

		if(!validateToken())
			return;

		$scope.alertMessage = 'Carregando lista de clientes...';

		PipedriveService.listPersons($scope.pipedriveToken)
		.then(function(response){

			$scope.customers = response.data.data;
			$scope.car = {};

		}, function(error){

			alert('Erro ao buscar listagem de clientes');

		}).finally(function(){
			
			$scope.alertMessage = null;

		});

	};

	$scope.edit = function(car){
		
		if(!validateToken())
			return;

		$scope.alertMessage = 'Carregando lista de clientes...';

		PipedriveService.listPersons($scope.pipedriveToken)
		.then(function(response){

			$scope.customers = response.data.data;
			$scope.car = car;

			angular.forEach($scope.customers, function(customer){
			
				if(customer.id === car.customerID){
					$scope.customer = customer;
				}
			
			});

		}, function(error){

			alert('Erro ao buscar listagem de clientes');

		}).finally(function(){
			
			$scope.alertMessage = null;

		});

	};

	$scope.remove = function(car){

		CarService.remove(car.id)
		.then(function(response){

			loadCars();

		}, function(error){

			alert('Erro ao remover veículo');

		}).finally(function(){
			
			$scope.alertMessage = null;

		});

	};

	$scope.save = function(){

		if(!validateForm())
			return;

		$scope.alertMessage = 'Salvando registro...';

		$scope.car.customerID = $scope.customer.id;

		CarService.save($scope.car)
		.then(function(data){
		
			loadCars();
			$scope.car = undefined;

		}, function(error){
			alert('Erro ao salvar registro');

		}).finally(function(){
			
			$scope.alertMessage = null;

		});

	};

	function loadCars(){
		$scope.alertMessage = 'Carregando lista de carros...';

		CarService.list()
		.then(function(data){
		
			$scope.cars = data;

		}, function(error){
			alert('Erro ao buscar listagem de carros');

		}).finally(function(){
			
			$scope.alertMessage = null;

		});
	}


	function validateToken(){

		if(!$scope.pipedriveToken){

			alert('Para prosseguir informe seu Pipedrive Token');
			return false;
		}

		return true;
	}

	function validateForm(){

		var year;
		var now = new Date();

		if(!$scope.car){
			alert('Erro ao validar dados');
			return false;
		}

		if(!$scope.customer){
			alert('Necessário selecionar o cliente para prosseguir');
			return false;
		}

		if(!$scope.car.model || !$scope.car.model.trim()){
			alert('Necessário informar o modelo para prosseguir');
			return false;	
		}

		year = parseInt($scope.car.year);

		if(isNaN(year) || year < (now.getFullYear() - 30) || year > now.getFullYear() ){
			alert('Verifique o ano do veículo, apenas carros com até 30 anos de uso são aceitos');
			return false;		
		}

		if(!$scope.car.color || allowedColors.indexOf($scope.car.color.trim().toUpperCase()) == -1 ){
			alert('Verifique a cor do veículo, apenas carros brancos, pretos e verdes são aceitos');
			return false;		
		}

		return true;
	}

}]);

angular.element(document).ready(function() {

	angular.bootstrap(document, ['App']);

});