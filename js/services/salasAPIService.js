angular.module("app").factory("salasAPI", function($http, configAPI) {
    var _getSalas = function() {
        return $http.get(configAPI.resourceSalas);
    };

    var _saveSala = function(sala) {
        if (!!sala.id) {
            return $http.put(configAPI.resourceSalas + "/" + sala.id, sala)
        }
        return $http.post(configAPI.resourceSalas, sala);
    };

    var _removeSala = function(salaParaRemover) {
        var url = configAPI.resourceSalas + "/" + salaParaRemover.id;
        return $http.delete(url);
    }

    return {
        getSalas: _getSalas,
        saveSala: _saveSala,
        removeSala: _removeSala
    };
});