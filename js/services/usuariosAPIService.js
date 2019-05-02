angular.module("app").factory("usuariosAPI", function($http, configAPI) {
    var _getUsuarios = function() {
        return $http.get(configAPI.resourceUsuarios);
    };

    var _saveUsuario = function(usuario) {
        if (!!usuario.id) {
            return $http.put(configAPI.resourceUsuarios + "/" + usuario.id, usuario)
        }
        return $http.post(configAPI.resourceUsuarios, usuario);
    };

    var _removeUsuario = function(usuarioParaRemover) {
        var url = configAPI.resourceUsuarios + "/" + usuarioParaRemover.id;
        return $http.delete(url);
    }

    return {
        getUsuarios: _getUsuarios,
        saveUsuario: _saveUsuario,
        removeUsuario: _removeUsuario
    };
});