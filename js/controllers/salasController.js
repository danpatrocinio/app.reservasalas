angular.module("app").controller("salasController", salasController);

function salasController($scope, salasAPI, locaisAPI) {

    $scope.tituloApp = "Listagem de salas";
    $scope.salas = [];
    var carregarSalas = function() {
        salasAPI.getSalas()
        .then(function(response) {
            $scope.salas = response.data;
        })
        .catch(function(response) {
            var mensagem = "Deu erro: " + response.status + " - " + response.statusText;
            $scope.mensagemDeErro = !!response.data.error ? response.data.error : mensagem;
        });
    };
    $scope.locais = [];
    var carregaLocais = function() {
        locaisAPI.getLocais()
        .then(function(response) {
            $scope.locais = response.data;
        })
        .catch(function(response) {
            var mensagem = "Deu erro: " + response.status + " - " + response.statusText;
            $scope.mensagemDeErro = mensagem;
        });
    };
    $scope.adicionarSala = function(sala) {
        var novaSala = angular.copy(sala);
        salasAPI.saveSala(novaSala)
        .then(function(response) {
            delete $scope.sala;
            $scope.salaForm.$setPristine();
            carregarSalas();
        })
        .catch(function(response) {
            var mensagem = "Deu erro: " + response.status + " - " + response.statusText;
            $scope.mensagemDeErro = !!response.data.error ? response.data.error : mensagem;
        });
    };

    $scope.removerSala = function(salaParaRemover) {
        if(!confirm('Deseja realmente excluir?')) { 
            return; 
        };
        salasAPI.removeSala(salaParaRemover)
        .then(function(response) {
            carregarSalas();
        })
        .catch(function(response) {
            var mensagem = "Deu erro: " + response.status + " - " + response.statusText;
            $scope.mensagemDeErro = !!response.data.error ? response.data.error : mensagem;
        });
    };
    $scope.editarSala = function(salaParaEditar) {
        $scope.sala = angular.copy(salaParaEditar);
    };
    $scope.ordenarPor = function(nomeDoCampo) {
        $scope.campoParaOrdenacao = nomeDoCampo;
        $scope.direcaoDaOrdenacao = !$scope.direcaoDaOrdenacao;
    };
    carregarSalas();
    carregaLocais();
};