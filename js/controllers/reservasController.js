angular.module("app").controller("reservasController", function($scope, reservasAPI, salasAPI, usuariosAPI) {
    $scope.tituloApp = "Listagem de reservas";
    $scope.reservas = [];
    var carregaReservas = function() {
        reservasAPI.getReservas()
        .then(function(response) {
            $scope.reservas = response.data;
        })
        .catch(function(response) {
            var mensagem = "Deu erro: " + response.status + " - " + response.statusText;
            $scope.mensagemDeErro = !!response.data.error ? response.data.error : mensagem;
        });
    };
    $scope.usuarios = [];
    var carregaUsuarios = function() {
        usuariosAPI.getUsuarios()
        .then(function(response) {
            $scope.usuarios = response.data;
        })
        .catch(function(response) {
            var mensagem = "Deu erro: " + response.status + " - " + response.statusText;
            $scope.mensagemDeErro = !!response.data.error ? response.data.error : mensagem;
        });
    };
    $scope.salas = [];
    var carregaSalas = function() {
        salasAPI.getSalas()
        .then(function(response) {
            $scope.salas = response.data;
        })
        .catch(function(response) {
            var mensagem = "Deu erro: " + response.status + " - " + response.statusText;
            $scope.mensagemDeErro = !!response.data.error ? response.data.error : mensagem;
        });
    };
    $scope.adicionarReserva = function(reserva) {
        var novaReserva = angular.copy(reserva);
        reservasAPI.saveReserva(novaReserva)
        .then(function(response) {
            delete $scope.reserva;
            $scope.reservaForm.$setPristine();
            carregaReservas();
        })
        .catch(function(response) {
            var mensagem = "Deu erro: " + response.status + " - " + response.statusText;
            $scope.mensagemDeErro = !!response.data.error ? response.data.error : mensagem;
        });
    };
    $scope.removerReserva = function(reservaParaRemover) {
        if(!confirm('Deseja realmente excluir?')) { 
            return; 
        };
        reservasAPI.removeReserva(reservaParaRemover)
        .then(function(response) {
            carregaReservas();
        })
        .catch(function(response) {
            var mensagem = "Deu erro: " + response.status + " - " + response.statusText;
            $scope.mensagemDeErro = !!response.data.error ? response.data.error : mensagem;
        });
    };
    $scope.editarReserva = function(reservaParaEditar) {
        $scope.reserva = angular.copy(reservaParaEditar);
        $scope.reserva.dhInicio = convertData(reservaParaEditar.dhInicio);
        $scope.reserva.dhFinal = convertData(reservaParaEditar.dhFinal);
    };
    
    var convertData = function(dataLong) {
        if (!dataLong) {
            return;
        }
        return new Date(dataLong);
    };
    $scope.ordenarPor = function(nomeDoCampo) {
        $scope.campoParaOrdenacao = nomeDoCampo;
        $scope.direcaoDaOrdenacao = !$scope.direcaoDaOrdenacao;
    };
    carregaReservas();
    carregaUsuarios();
    carregaSalas();
});