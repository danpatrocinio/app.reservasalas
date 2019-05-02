angular.module("app").factory("locaisAPI", function($http, configAPI) {
    var _getLocais = function() {
        return $http.get(configAPI.resourceLocais);
    };

    var _saveLocal = function(local) {
        if (!!local.id) {
            return $http.put(configAPI.resourceLocais + "/" + local.id, local)
        }
        return $http.post(configAPI.resourceLocais, local);
    };

    var _removeLocal = function(localParaRemover) {
        var url = configAPI.resourceLocais + "/" + localParaRemover.id;
        return $http.delete(url);
    }

    return {
        getLocais: _getLocais,
        saveLocal: _saveLocal,
        removeLocal: _removeLocal
    };
});