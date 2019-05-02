angular.module("app").value("configAPI", {
    resourceLocais: "http://localhost:8080/reservasalas/locais",
    resourceSalas: "http://localhost:8080/reservasalas/salas",
    resourceUsuarios: "http://localhost:8080/reservasalas/usuarios",
    resourceReservas: "http://localhost:8080/reservasalas/reservas"
});