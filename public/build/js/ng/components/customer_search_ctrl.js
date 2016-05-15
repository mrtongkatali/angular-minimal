appControllers.controller('CustomerSearchCtrl', ['$scope','$rootScope','$location','$filter', '$stateParams', '$timeout', 'CustomerService','FeesService','uiGridConstants',
  function($scope, $rootScope, $location, $filter, $stateParams, $timeout, CustomerService, FeesService, uiGridConstants) {

    var current_url = $location.path().split("/")[2];

    $rootScope.sidenav = {
      pageTitle             : 'Company Center',
      parent                : 'member',
      selected              : current_url,
      isMembershibTabOpen   : true,
      style                 : {},
    };

    $timeout(function() { $rootScope.sidenav.style.customersearch = {background : "#39a085" }; },0);

    $scope.filter = {
      signUpDate : {},
      signUpHost : {},
    };

    $scope.fSignupHost = [];
    $scope.fDateObj = [
      {name: 'Last 24hrs', day: '1'},
      {name: 'Last 3 days', day: '3'},
      {name: 'Last 10 days', day: '10'},
      {name: 'Last Month', day: '31'},
      {name: 'Last 6 Months', day: '186'},
      {name: 'Remove Filter', day: 'none'},
    ];

    $scope.customer = {
      gridApi : {},
      searchEmail: "",
      list  : [],
      dataGridOptions : {
        paginationPageSizes: [25, 50, 75, 100],
        paginationPageSize: 25,
        width: '*',
        enableHorizontalScrollbar: true,
        enableVerticalScrollbar: true,
        enableFiltering: true,
        flatEntityAccess: true,
        showGridFooter: true,
        fastWatch: true,
        data: [],
        gridReloadingMessage: "",
        isGridReloading: false,
        showGridLoading: function() {
          $scope.customer.dataGridOptions.isGridReloading = true;
          $scope.customer.dataGridOptions.gridReloadingMessage = 'Loading all transaction records...';
        },
        hideGridLoading: function() {
          $scope.customer.dataGridOptions.isGridReloading = false;
          $scope.customer.dataGridOptions.gridReloadingMessage = '';
        },
        onRegisterApi: function(gridApi){
          $scope.customer.gridApi = gridApi;
        }
      },
    }

    $scope.customer.dataGridOptions.columnDefs = [
      //{name: 'edit', displayName: '',pinnedLeft:true, cellTemplate: '<a class="dg-action-link" ng-click="grid.appScope.viewCustomerProfile(row.entity.entityId)">Edit</a>',enableFiltering:false, width:'3%'},
      {name: 'edit', displayName: '',pinnedLeft:true, cellTemplate: '<a class="dg-action-link" ui-sref="customerprofile({ profileId: row.entity.entityId })">Edit</a>',enableFiltering:false, width:'3%'},
      {name:'Customer ID', field:'entityId', width:'12%',pinnedLeft:true},
      {name:'Email Address', field:'emailAddress', width:'15%'},
      {name:'First Name', field:'firstName', width:'15%'},
      {name:'Last Name', field:'lastName', width:'15%'},
      {name:'Mobile #', field:'mobilePhone', width:'10%'},
      {name:'Home #', field:'homePhone', width:'10%'},
      {name:'Account Status', field:'status', width:'10%'},
      {name:'ID Uploaded', field:'', width:'7%'},
      {name:'Extended Profile', field:'', width:'15%'},
      {name:'Profile Status', field:'verificationStatus', width:'8%'},
      {name:'Signup Date', field:'signupDate', width:'15%'},
      {name:'Activation Date', field:'', width:'15%'},
      {name:'Host', field:'signupHost', width:'15%'},
      {name:'Existing Loyalty', field:'', width:'15%'},
      {name:'Tier', field:'tierId', width:'5%'},
    ];

    $scope.exportCustomerData = function(row, column){
      var myElement = angular.element(document.querySelectorAll(".custom-csv-link-location"));
      $scope.customer.gridApi.exporter.csvExport( row, column, myElement );
    };

    $scope.getReferenceRuleHost = function() {
      FeesService.getReferenceDataList("RULEHOST").then(function(result) {
        if(result.isSuccess) {
          angular.forEach(result.refDataList, function(a) { $scope.fSignupHost.push(a); });
          $scope.fSignupHost.push({refType: 'none', refCode: 'none', refValue: 'Remove Filter'});
        }
      });
    };

    $scope.getCustomerListBySignUpTime = function() {
      var day = $scope.filter.signUpDate.selected.day;
      $scope.customer.dataGridOptions.data = [];

      if(day !== "none") {
        $scope.customer.dataGridOptions.showGridLoading();
        CustomerService.getCustomerListBySignUpTime(day).then(function(result) {
          if(result.isSuccess && result.customerList) {
            $scope.customer.list = result.customerList;
            $scope.customer.dataGridOptions.data = result.customerList;
          }
        });
        $scope.customer.dataGridOptions.hideGridLoading();
      } else {
        $scope.filter.signUpDate = {};
        $scope.getCustomerList();
      }
    };

    $scope.getCustomerListByHost = function() {
      var host      = $scope.filter.signUpHost.selected.refValue;
      var host_code = $scope.filter.signUpHost.selected.refCode;

      $scope.customer.dataGridOptions.data = [];

      if (host_code !== "none") {
        $scope.customer.dataGridOptions.showGridLoading();
        CustomerService.getCustomerListByHost(host).then(function(result) {
          if(result.isSuccess && result.customerList) {
            $scope.customer.list = result.customerList;
            $scope.customer.dataGridOptions.data = result.customerList;
          }
          $scope.customer.dataGridOptions.hideGridLoading();
        });
      } else {
        $scope.filter.signUpHost = {};
        $scope.getCustomerList();
      }
    };

    $scope.getCustomerList = function() {
      $scope.customer.dataGridOptions.data = [];

      $scope.customer.dataGridOptions.showGridLoading();
      CustomerService.getCustomerList($scope.customer.searchEmail).then(function(result) {
        if(result.isSuccess && result.customerList) {
          $scope.customer.list = result.customerList;
          $scope.customer.dataGridOptions.data = result.customerList;
        }
        $scope.customer.dataGridOptions.hideGridLoading();
      });
    };

    $scope.getReferenceRuleHost();
    $scope.getCustomerList();

}]);
