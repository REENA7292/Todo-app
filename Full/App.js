var app = angular.module('todoApp', []);
app.controller('TodoController', function ($scope, $http) {
$scope.tasks = [];
$scope.addTask = function () {
if ($scope.newTask) {
$scope.tasks.push($scope.newTask);
$scope.newTask = '';
$scope.saveTasks();
}
};
$scope.removeTask = function (index) {
$scope.tasks.splice(index, 1);
$scope.saveTasks();
};
$scope.saveTasks = function () {
$http.post('/api/saveTasks', { tasks: $scope.tasks })
.then(function (response) {
console.log('Tasks saved successfully');
})
.catch(function (error) {
console.error('Error saving tasks: ' + error);
});
};
$http.get('/api/getTasks')
.then(function (response) {
$scope.tasks = response.data.tasks;
})
.catch(function (error) {
console.error('Error loading tasks: ' + error);
});
});