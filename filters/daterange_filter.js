appFilters.filter('daterangefilter',function() {
  return function(a,b,c) {
    if (a === null) return false;
    var obj = [];
    angular.forEach(a,function(data) {
      var activityDate = moment(data.activityDate);
      var s = moment(b, "DD-MM-YYYY");
      var e = moment(c, "DD-MM-YYYY");

      if (activityDate >= s && activityDate <= e) {
        console.log("thiz",activityDate);
        obj.push(data);
      }
    });

    return obj;
  };
})
