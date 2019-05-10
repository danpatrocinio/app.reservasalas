(function() {
    
    'use strict';

    angular.module("app").controller("locaisController", locaisController);

    locaisController.$inject = ['$scope', 'locaisAPI'];

    function locaisController($scope, locaisAPI) {
    
        var vm = $scope;

        vm.tituloApp = "Listagem de locais";
        vm.locais = [];
        var carregarLocais = function() {
            locaisAPI.getLocais()
            .then(function(response) {
                vm.locais = response.data;
            })
            .catch(function(response) {
                var mensagem = "Deu erro: " + response.status + " - " + response.statusText;
                vm.mensagemDeErro = !!response.data.error ? response.data.error : mensagem;
            });
        };
    
        vm.adicionarLocal = function(local) {
            var novoLocal = angular.copy(local);
            locaisAPI.saveLocal(novoLocal)
            .then(function(response) {
                delete vm.local;
                vm.localForm.$setPristine();
                carregarLocais();
            })
            .catch(function(response) {
                var mensagem = "Deu erro: " + response.status + " - " + response.statusText;
                vm.mensagemDeErro = !!response.data.error ? response.data.error : mensagem;
            });
        };
    
        vm.removerLocal = function(localParaRemover) {
            if(!confirm('Deseja realmente excluir?')) { 
                return; 
            };
            locaisAPI.removeLocal(localParaRemover)
            .then(function(response) {
                carregarLocais();
            })
            .catch(function(response) {
                var mensagem = "Deu erro: " + response.status + " - " + response.statusText;
                vm.mensagemDeErro = !!response.data.error ? response.data.error : mensagem;
            });
        };
        vm.editarLocal = function(localParaEditar) {
            vm.local = angular.copy(localParaEditar);
        };
        vm.ordenarPor = function(nomeDoCampo) {
            vm.campoParaOrdenacao = nomeDoCampo;
            vm.direcaoDaOrdenacao = !vm.direcaoDaOrdenacao;
        };
        carregarLocais();
    };
})();