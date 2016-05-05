/// <reference path="../../../../server/typings/main/ambient/jquery/index.d.ts" />
/// <reference path="../../../../server/typings/main/ambient/angular/index.d.ts" />

var phonecatApp = angular.module('restaurantApp', []);

phonecatApp.controller('PhoneListCtrl', function ($scope) {
    $scope.phones = [
        {'name': 'Nexus S',
            'snippet': 'Fast just got faster with Nexus S.'},
        {'name': 'Motorola XOOM™ with Wi-Fi',
            'snippet': 'The Next, Next Generation tablet.'},
        {'name': 'MOTOROLA XOOM™',
            'snippet': 'The Next, Next Generation tablet.'}
    ];
});