(function() {
    angular.module("app").controller("reservasController", reservasController);

    reservasController.$inject = ['$scope','reservasAPI', 'salasAPI', 'usuariosAPI'];
    
    function reservasController($scope, reservasAPI, salasAPI, usuariosAPI) {
    
        var vm = $scope;
    
        vm.tituloApp = "Listagem de reservas";
        vm.reservas = [];
        var carregaReservas = function() {
            reservasAPI.getReservas()
            .then(function(response) {
                vm.reservas = response.data;
            })
            .catch(function(response) {
                var mensagem = "Deu erro: " + response.status + " - " + response.statusText;
                vm.mensagemDeErro = !!response.data.error ? response.data.error : mensagem;
            });
        };
        vm.usuarios = [];
        var carregaUsuarios = function() {
            usuariosAPI.getUsuarios()
            .then(function(response) {
                vm.usuarios = response.data;
            })
            .catch(function(response) {
                var mensagem = "Deu erro: " + response.status + " - " + response.statusText;
                vm.mensagemDeErro = !!response.data.error ? response.data.error : mensagem;
            });
        };
        vm.salas = [];
        var carregaSalas = function() {
            salasAPI.getSalas()
            .then(function(response) {
                vm.salas = response.data;
            })
            .catch(function(response) {
                var mensagem = "Deu erro: " + response.status + " - " + response.statusText;
                vm.mensagemDeErro = !!response.data.error ? response.data.error : mensagem;
            });
        };
        vm.adicionarReserva = function(reserva) {
            var novaReserva = angular.copy(reserva);
            reservasAPI.saveReserva(novaReserva)
            .then(function(response) {
                delete vm.reserva;
                vm.reservaForm.$setPristine();
                carregaReservas();
            })
            .catch(function(response) {
                var mensagem = "Deu erro: " + response.status + " - " + response.statusText;
                vm.mensagemDeErro = !!response.data.error ? response.data.error : mensagem;
            });
        };
        vm.removerReserva = function(reservaParaRemover) {
            if(!confirm('Deseja realmente excluir?')) { 
                return; 
            };
            reservasAPI.removeReserva(reservaParaRemover)
            .then(function(response) {
                carregaReservas();
            })
            .catch(function(response) {
                var mensagem = "Deu erro: " + response.status + " - " + response.statusText;
                vm.mensagemDeErro = !!response.data.error ? response.data.error : mensagem;
            });
        };
        vm.editarReserva = function(reservaParaEditar) {
            vm.reserva = angular.copy(reservaParaEditar);
            vm.reserva.dhInicio = convertData(reservaParaEditar.dhInicio);
            vm.reserva.dhFinal = convertData(reservaParaEditar.dhFinal);
        };
        
        var convertData = function(dataLong) {
            if (!dataLong) {
                return;
            }
            return new Date(dataLong);
        };
        vm.ordenarPor = function(nomeDoCampo) {
            vm.campoParaOrdenacao = nomeDoCampo;
            vm.direcaoDaOrdenacao = !vm.direcaoDaOrdenacao;
        };
        carregaReservas();
        carregaUsuarios();
        carregaSalas();
    };
})();