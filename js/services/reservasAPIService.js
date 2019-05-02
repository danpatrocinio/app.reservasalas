angular.module("app").factory("reservasAPI", function($http, configAPI) {
    var _getReservas = function() {
        return $http.get(configAPI.resourceReservas);
    };

    var _saveReserva = function(reserva) {
        if (!!reserva.id) {
            return $http.put(configAPI.resourceReservas + "/" + reserva.id, reserva);
        }
        return $http.post(configAPI.resourceReservas, reserva);
    };

    var _removeReserva = function(reservaParaRemover) {
        var url = configAPI.resourceReservas + "/" + reservaParaRemover.id;
        return $http.delete(url);
    }

    return {
        getReservas: _getReservas,
        saveReserva: _saveReserva,
        removeReserva: _removeReserva
    };
});