angular.module("app").config(AppConfig);

AppConfig.$inject = ['$routeProvider'];
function AppConfig($routeProvider) {
$routeProvider
    .when('/', {
        templateUrl: 'views/home.html',
        controller: 'homeController'
    })
    .when('/locais', {
        templateUrl: 'views/locais.html',
        controller: 'locaisController'
    })
    .when('/salas', {
        templateUrl: 'views/salas.html',
        controller: 'salasController'
    })
    .when('/usuarios', {
        templateUrl: 'views/usuarios.html',
        controller: 'usuariosController'
    })
    .when('/reservas', {
        templateUrl: 'views/reservas.html',
        controller: 'reservasController'
    })
    .otherwise({redirectTo: "/"});
}

