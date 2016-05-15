appFilters.filter('dictselector',function() {
  return function(obj, pk, key) {
    var nat = {};
    angular.forEach(obj,function(a) {
      var k = (key ? key : 'code');
      if(a[k] == pk) {
        nat = a;
      }
    });

    return nat;
  };
})
