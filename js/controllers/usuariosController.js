angular.module("app").controller("usuariosController", usuariosController);

function usuariosController($scope, usuariosAPI) {

    $scope.tituloApp = "Listagem de usuários";
    $scope.usuarios = [];
    var carregarUsuarios = function() {
        usuariosAPI.getUsuarios()
        .then(function(response) {
            $scope.usuarios = response.data;
        })
        .catch(function(response) {
            var mensagem = "Deu erro: " + response.status + " - " + response.statusText;
            $scope.mensagemDeErro = !!response.data.error ? response.data.error : mensagem;
        });
    };

    $scope.adicionarUsuario = function(usuario) {
        var novoUsuario = angular.copy(usuario);
        usuariosAPI.saveUsuario(novoUsuario)
        .then(function(response) {
            delete $scope.usuario;
            $scope.usuarioForm.$setPristine();
            carregarUsuarios();
        })
        .catch(function(response) {
            var mensagem = "Deu erro: " + response.status + " - " + response.statusText;
            $scope.mensagemDeErro = !!response.data.error ? response.data.error : mensagem;
        });
    };
    $scope.removerUsuario = function(usuarioParaRemover) {
        if(!confirm('Deseja realmente excluir?')) { 
            return; 
        };
        usuariosAPI.removeUsuario(usuarioParaRemover)
        .then(function(response) {
            carregarUsuarios();
        })
        .catch(function(response) {
            var mensagem = "Deu erro: " + response.status + " - " + response.statusText;
            $scope.mensagemDeErro = !!response.data.error ? response.data.error : mensagem;
        });
    };
    $scope.editarUsuario = function(usuarioParaEditar) {
        $scope.usuario = angular.copy(usuarioParaEditar);
    };
    $scope.ordenarPor = function(nomeDoCampo) {
        $scope.campoParaOrdenacao = nomeDoCampo;
        $scope.direcaoDaOrdenacao = !$scope.direcaoDaOrdenacao;
    };
    carregarUsuarios();
};