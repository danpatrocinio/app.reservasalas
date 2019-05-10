angular.module("app").controller("locaisController", locaisController);

function locaisController($scope, locaisAPI) {

    $scope.tituloApp = "Listagem de locais";
    $scope.locais = [];
    var carregarLocais = function() {
        locaisAPI.getLocais()
        .then(function(response) {
            $scope.locais = response.data;
        })
        .catch(function(response) {
            var mensagem = "Deu erro: " + response.status + " - " + response.statusText;
            $scope.mensagemDeErro = !!response.data.error ? response.data.error : mensagem;
        });
    };

    $scope.adicionarLocal = function(local) {
        var novoLocal = angular.copy(local);
        locaisAPI.saveLocal(novoLocal)
        .then(function(response) {
            delete $scope.local;
            $scope.localForm.$setPristine();
            carregarLocais();
        })
        .catch(function(response) {
            var mensagem = "Deu erro: " + response.status + " - " + response.statusText;
            $scope.mensagemDeErro = !!response.data.error ? response.data.error : mensagem;
        });
    };

    $scope.removerLocal = function(localParaRemover) {
        if(!confirm('Deseja realmente excluir?')) { 
            return; 
        };
        locaisAPI.removeLocal(localParaRemover)
        .then(function(response) {
            carregarLocais();
        })
        .catch(function(response) {
            var mensagem = "Deu erro: " + response.status + " - " + response.statusText;
            $scope.mensagemDeErro = !!response.data.error ? response.data.error : mensagem;
        });
    };
    $scope.editarLocal = function(localParaEditar) {
        $scope.local = angular.copy(localParaEditar);
    };
    $scope.ordenarPor = function(nomeDoCampo) {
        $scope.campoParaOrdenacao = nomeDoCampo;
        $scope.direcaoDaOrdenacao = !$scope.direcaoDaOrdenacao;
    };
    carregarLocais();
};