(function() {

    'use strict';

    angular.module("app").controller("usuariosController", usuariosController);

    usuariosController.$inject = ['$scope', 'usuariosAPI'];

    function usuariosController($scope, usuariosAPI) {
        
        var vm = $scope;

        vm.tituloApp = "Listagem de usuários";
        vm.usuarios = [];
        var carregarUsuarios = function() {
            usuariosAPI.getUsuarios()
            .then(function(response) {
                vm.usuarios = response.data;
            })
            .catch(function(response) {
                var mensagem = "Deu erro: " + response.status + " - " + response.statusText;
                vm.mensagemDeErro = !!response.data.error ? response.data.error : mensagem;
            });
        };

        vm.adicionarUsuario = function(usuario) {
            var novoUsuario = angular.copy(usuario);
            usuariosAPI.saveUsuario(novoUsuario)
            .then(function(response) {
                delete vm.usuario;
                vm.usuarioForm.$setPristine();
                carregarUsuarios();
            })
            .catch(function(response) {
                var mensagem = "Deu erro: " + response.status + " - " + response.statusText;
                vm.mensagemDeErro = !!response.data.error ? response.data.error : mensagem;
            });
        };
        vm.removerUsuario = function(usuarioParaRemover) {
            if(!confirm('Deseja realmente excluir?')) { 
                return; 
            };
            usuariosAPI.removeUsuario(usuarioParaRemover)
            .then(function(response) {
                carregarUsuarios();
            })
            .catch(function(response) {
                var mensagem = "Deu erro: " + response.status + " - " + response.statusText;
                vm.mensagemDeErro = !!response.data.error ? response.data.error : mensagem;
            });
        };
        vm.editarUsuario = function(usuarioParaEditar) {
            vm.usuario = angular.copy(usuarioParaEditar);
        };
        vm.ordenarPor = function(nomeDoCampo) {
            vm.campoParaOrdenacao = nomeDoCampo;
            vm.direcaoDaOrdenacao = !vm.direcaoDaOrdenacao;
        };
        carregarUsuarios();
    };
})();
