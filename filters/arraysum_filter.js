appFilters.filter('arraysum',function() {
  return function(a) {
    if (a === null) return false;
    var sum = 0;
    angular.forEach(a,function(value) {
      sum = sum + (parseInt(value));
      console.log("value", value, sum);
    });

    return sum;
  };
})
