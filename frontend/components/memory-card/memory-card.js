'use strict';

app.component('memoryCard', {
  templateUrl: 'components/memory-card/memory-card.html',
  styleUrls: ['components/memory-card/memory-card.css'],
  controller: function($scope) {
    $scope.blah = 'hello world';
  }
});
