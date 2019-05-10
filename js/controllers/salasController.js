(function () {
    
    'use strict';

    angular.module("app").controller("salasController", salasController);

    salasController.$inject = ['$scope', 'salasAPI', 'locaisAPI'];

    function salasController($scope, salasAPI, locaisAPI) {
    
        var vm = $scope;

        vm.tituloApp = "Listagem de salas";
        vm.salas = [];
        var carregarSalas = function() {
            salasAPI.getSalas()
            .then(function(response) {
                vm.salas = response.data;
            })
            .catch(function(response) {
                var mensagem = "Deu erro: " + response.status + " - " + response.statusText;
                vm.mensagemDeErro = !!response.data.error ? response.data.error : mensagem;
            });
        };
        vm.locais = [];
        var carregaLocais = function() {
            locaisAPI.getLocais()
            .then(function(response) {
                vm.locais = response.data;
            })
            .catch(function(response) {
                var mensagem = "Deu erro: " + response.status + " - " + response.statusText;
                vm.mensagemDeErro = mensagem;
            });
        };
        vm.adicionarSala = function(sala) {
            var novaSala = angular.copy(sala);
            salasAPI.saveSala(novaSala)
            .then(function(response) {
                delete vm.sala;
                vm.salaForm.$setPristine();
                carregarSalas();
            })
            .catch(function(response) {
                var mensagem = "Deu erro: " + response.status + " - " + response.statusText;
                vm.mensagemDeErro = !!response.data.error ? response.data.error : mensagem;
            });
        };
    
        vm.removerSala = function(salaParaRemover) {
            if(!confirm('Deseja realmente excluir?')) { 
                return; 
            };
            salasAPI.removeSala(salaParaRemover)
            .then(function(response) {
                carregarSalas();
            })
            .catch(function(response) {
                var mensagem = "Deu erro: " + response.status + " - " + response.statusText;
                vm.mensagemDeErro = !!response.data.error ? response.data.error : mensagem;
            });
        };
        vm.editarSala = function(salaParaEditar) {
            vm.sala = angular.copy(salaParaEditar);
        };
        vm.ordenarPor = function(nomeDoCampo) {
            vm.campoParaOrdenacao = nomeDoCampo;
            vm.direcaoDaOrdenacao = !vm.direcaoDaOrdenacao;
        };
        carregarSalas();
        carregaLocais();
    };
})();

