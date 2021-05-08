"use strict";

var module = angular.js('TakuMahiApp', ['ngResource', 'ngStorage']);

module.factory('hoursDAO', function ($resource) {
return $resource('/api/staff/hours/:userId');
});

