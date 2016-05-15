appControllers.controller('CustomerProfileCtrl', ['$scope','$rootScope','$filter', '$interval','$location', '$timeout', '$state','$stateParams', '$uibModal','CustomerService','FeesService','ListService','MerchantServices','uiGridConstants', 'Upload',
  function($scope, $rootScope, $filter, $interval, $location, $timeout, $state, $stateParams, $uibModal, CustomerService, FeesService, ListService, MerchantServices, uiGridConstants, Upload) {

    var current_url = $location.path().split("/")[2];

    $rootScope.sidenav = {
      pageTitle             : 'Company Center',
      parent                : 'member',
      selected              : 'customer.search',
      isMembershibTabOpen   : true,
    };

    $scope.accrd = {
      customerProfile : true,
    };

    $scope.customer = {
      proofsids : {
        form: {},
        list: {},
      },

      poid      : {},
      host      : {},
      poidLabel : '',
      profile   : {},
      eProfile  : {},
      birthDatePicker : {
        date : "",
        opts: {
          //locale: { format: "MMMM D, YYYY", },
          singleDatePicker: true,
          startDate: null,
          endDate: null,
        }
      },

      nationality   : {},
      maritalStatus : {},
      baseCurrency  : {},

      tab     : {},
      tier    : [],
      fees    : {},
      frmdiv  : {
        general       : false,
        extended      : false,
        fees          : false,
        base_currency : false,
      },
      isEditMode : {
        general       : false,
        extended      : false,
        fees          : false,
        base_currency : false,
      },

      funds       : {},
      carddevices : {},
      comments    : {},
      alerts      : {},
      activitylog : {},
    };

    $scope.poids      = [];
    $scope.countries  = [];
    $scope.marital    = [];
    $scope.currencies = [];
    $scope.hosts      = [];

    $scope.getProfile = function(profileId) {
      CustomerService.getProfile(profileId).then(function(result) {
        if(result.isSuccess) {
          $scope.customer.profile = result.profile;
          $scope.customer.eprofile = result.profile;

          // Set POID Label
          // if(result.profile.identityApprovalStatus == 'UNDECIDED') {
          //   var poidLabel = { msg : 'FOR REVIEW', style: 'label-warning', };
          // } else if(result.profile.identityApprovalStatus == 'DECLINED') {
          //   var poidLabel = { msg : 'DECLINED', style: 'label-danger', };
          // } else {
          //   var poidLabel = { msg : 'APPROVED', style: 'label-success', };
          // }
          // $scope.customer.poidLabel = poidLabel;

          // set up birthdate selection object
          $scope.customer.birthDatePicker.date = moment(result.profile.birthDate).format("YYYY-MM-DD");
          $scope.customer.birthDatePicker.opts.startDate = moment(result.profile.birthDate).format("YYYY-MM-DD");

          $timeout(function() {
            $scope.customer.fees.selected         = $filter('dictselector')($scope.customer.tier, result.profile.tierId, 'refCode');
            $scope.customer.baseCurrency.selected = $filter('dictselector')($scope.currencies, result.profile.baseCurrency);
          },50)

          $scope.loadAllPoids();
        } else {
          $state.go('customersearch');
        }
      }, function(error) {
        $state.go('customersearch');
      });
    };

    $scope.sendEmailForm = function() {
      $rootScope.removeAlertNotification('sendEmailMessageCallback');
      $scope.customer.emailForm = {};
      $scope.modalInstance=$uibModal.open({
        templateUrl: 'public/partials/member/customer.profile/forms/_sendemail.modal.html',
        scope:$scope,
        size: 'md',
        backdrop: 'static',
      });
    };

    $scope.sendCustomerEmail = function() {
      var eid = $scope.customer.profile.entityId;
      var form = $scope.customer.emailForm;

      var params = {
        eid:eid,
        subject:form.subject,
        message:form.message,
      };

      CustomerService.sendCustomerEmail(params).then(function(result) {
        if(!result.isSuccess) {
          $rootScope.throwAlertNotification("sendEmailMessageCallback",result.error.msg, "alert-danger", true);
        } else {
          var msg = "Email has been successfully sent!";
          $rootScope.throwAlertNotification("sendEmailMessageCallback",msg, "alert-success", true);
        }
      }, function(error) {
        var msg = "Server Error : Please contact administrator";
        $rootScope.throwAlertNotification("sendEmailMessageCallback", msg, "alert-danger", true);
      });
    };

    $scope.changePinForm = function() {
      $rootScope.removeAlertNotification('sendEmailMessageCallback');
      $scope.customer.pin = "";

      $scope.modalInstance=$uibModal.open({
        templateUrl: 'public/partials/member/customer.profile/forms/_changepin.modal.html',
        scope:$scope,
        size: 'md',
        backdrop: 'static',
      });
    };

    //changeCustomerPin
    $scope.changeCustomerPin = function() {
      var params = {
        eid  : $scope.customer.profile.entityId,
        newPin     : $scope.customer.pin
      };

      CustomerService.changeCustomerPin(params).then(function(result) {
        if(!result.isSuccess) {
          $rootScope.throwAlertNotification("changePinCallback",result.error.msg, "alert-danger", true);
        } else {
          var msg = "Pin has been successfully changed!";
          $rootScope.throwAlertNotification("changePinCallback",msg, "alert-success", true);
        }
      }, function(error) {
        var msg = "Server Error : Please contact administrator";
        $rootScope.throwAlertNotification("changePinCallback", msg, "alert-danger", true);
      });
    };

    $scope.updateCustomerStatusConfirmation = function() {
      $rootScope.removeAlertNotification('updateCustomerStatusCallback');

      $scope.modalInstance=$uibModal.open({
        templateUrl: 'public/partials/member/customer.profile/_updatecustomer.status.confirmation.modal.html',
        scope:$scope,
        size: 'md',
        backdrop: 'static',
      });
    };

    $scope.updateCustomerStatus = function(status) {
      var params = {
        eid: $scope.customer.profile.entityId,
        isActive:status,
      };

      CustomerService.updateCustomerStatus(params).then(function(result) {
        if(!result.isSuccess) {
          $rootScope.throwAlertNotification("updateCustomerStatusCallback",result.error.msg, "alert-danger", true);
        } else {
          var msg = "Successfully update customer status!";
          //$rootScope.throwAlertNotification("updateCustomerStatusCallback",msg, "alert-success", true);
          $scope.getProfile($stateParams.profileId);
          $scope.closeModal();
        }
      }, function(error) {
        var msg = "Server Error : Please contact administrator";
        $rootScope.throwAlertNotification("updateCustomerStatusCallback", msg, "alert-danger", true);
      });
    };

    $scope.loadAllPoids = function() {
      var eid = $scope.customer.profile.entityId;
      CustomerService.getCustomerPoids({eid:eid}).then(function(result) {
        $scope.customer.proofsids.list  = result.poidList;
        angular.forEach($scope.customer.proofsids.list, function(a) {
          if(a.approvalStatus == "UNDECIDED") {
            a.labels  = "label label-warning";
            a.lstatus = "For Review";
          } else if(a.approvalStatus == "APPROVED") {
            a.labels = "label label-success";
            a.lstatus = "Approved";
          } else if(a.approvalStatus == "REJECTED") {
            a.labels = "label label-danger";
            a.lstatus = "Rejected";
          }
        });
      });
    };

    $scope.uploadPoid = function() {
      // Get All Poids
      $scope.customer.poidImageFile = {};
      $rootScope.removeAlertNotification('uploadPoidCallback');
      ListService.retrieveAllPoids().then(function(result) {
        angular.forEach(result, function(data) {$scope.poids.push({ code: data.code, name: data.name, }); });
      });

      $scope.modalInstance=$uibModal.open({
        templateUrl: 'public/partials/member/customer.profile/_poid.modal.html',
        scope:$scope,
        size: 'sm',
        backdrop: 'static',
      });

    };

    $scope.poidUpload = function(file) {
      if(file && $scope.customer.poid.selected) {
        file.upload = Upload.upload({
          url: '/gtcvbankadmin/poidupload.sctl',
          data: {
            poidImageFile   : file,
            poidType        : $scope.customer.poid.selected.code,
            poidDescription : "",
            eid             : $scope.customer.profile.entityId,
          },
        });

        file.upload.then(function (response) {
          $timeout(function () {
            file.result = response.data;
            if(response.data.isSuccess) {
              $scope.loadAllPoids();
              $scope.closeModal();
            } else { $rootScope.throwAlertNotification("uploadPoidCallback",response.data.error.msg, "alert-danger", true); }
          });
        }, function (response) {
          if (response.status > 0)
            var msg = "Server Error : Please contact administrator";
            $rootScope.throwAlertNotification("uploadPoidCallback", msg, "alert-danger", true);
        });
      } else {
        var msg = "Missing Image and Type. Please try again!";
        $rootScope.throwAlertNotification("uploadPoidCallback", msg, "alert-danger", true);
      }
    };

    $scope.viewPoid = function(poidPk) {
      $scope.customer.proofsids.form = $filter('dictselector')($scope.customer.proofsids.list,poidPk,"poidKey");

      if($scope.customer.proofsids.form.approvalStatus == "APPROVED") {
        var msg = "This ID is already approved!";
        $rootScope.throwAlertNotification("approvePoidCallback",msg, "alert-success", true);
      }

      $scope.modalInstance=$uibModal.open({
        templateUrl: 'public/partials/member/customer.profile/_view.poid.modal.html',
        scope:$scope,
        size: 'md',
        backdrop: 'static',
      });
    };

    $scope.approvePoid = function() {
      var form = $scope.customer.proofsids.form;
      var params = {
        poidKey     : form.poidKey,
        isApproved  : true,
        comments    : form.applyComments,
      };

      CustomerService.approvePoid(params).then(function(result) {
        if(!result.isSuccess) {
          $rootScope.throwAlertNotification("approvePoidCallback",result.error.msg, "alert-danger", true);
        } else {
          var msg = "Successfully approved proof of identity.";
          $rootScope.throwAlertNotification("approvePoidCallback",msg, "alert-success", true);
          $scope.customer.proofsids.form.approvalStatus = "APPROVED";

          $scope.loadAllPoids();
        }
      }, function(error) {
        var msg = "Server Error : Please contact administrator";
        $rootScope.throwAlertNotification("approvePoidCallback", msg, "alert-danger", true);
      });
    };

    $scope.deletePoid = function(eid, poidKey) {
      $rootScope.removeAlertNotification('deletePOIDCallback');

      var form = $scope.customer.proofsids.form;
      form.eid = eid;
      form.poidKey = poidKey;

      $scope.modalInstance=$uibModal.open({
        templateUrl: 'public/partials/member/customer.profile/_deletepoid.confirmation.modal.html',
        scope:$scope,
        size: 'md',
        backdrop: 'static',
      });
    };

    $scope.deleteCustomerPoid = function() {
      var form = $scope.customer.proofsids.form;
      var params = {
        eid     : form.eid,
        poidKey : form.poidKey,
      };

      CustomerService.deleteCustomerPoid(params).then(function(result) {
        if(!result.isSuccess) {
          $rootScope.throwAlertNotification("deletePOIDCallback",result.error.msg, "alert-danger", true);
        } else {
          $scope.customer.proofsids.form = {};
          $scope.closeModal();
          $scope.loadAllPoids();
        }
      }, function(error) {
        var msg = "Server Error : Please contact administrator";
        $rootScope.throwAlertNotification("deletePOIDCallback", msg, "alert-danger", true);
      });

    };

    $scope.showCustomerQRCode = function() {
      $scope.modalInstance=$uibModal.open({
        templateUrl: 'public/partials/member/customer.profile/_qrcode.modal.html',
        scope:$scope,
        size: 'md',
        backdrop: 'static',
      });
    };

    $scope.editHost = function() {
      CustomerService.getValidCustomerHosts().then(function(result) {
        $scope.hosts = result.hostList;
      });

      $scope.modalInstance=$uibModal.open({
        templateUrl: 'public/partials/member/customer.profile/_hosts.modal.html',
        scope:$scope,
        size: 'sm',
        backdrop: 'static',
      });
    };

    $scope.updateCustomerHost = function() {
      var eid = $scope.customer.profile.entityId;

      if(eid) {
        var params = {
          eid       : eid,
          siteHost  : $scope.customer.host.selected.host,
        };

        CustomerService.updateCustomerHost(params).then(function(result) {
          $scope.customer.profile.signupHost = params.siteHost;
          $scope.customer.eprofile.signupHost = params.siteHost;
        });

        $scope.closeModal();
      }
    };

    $scope.closeModal = function() {
      $scope.modalInstance.dismiss();
    };

    $scope.saveGeneral = function() {
      var eprofile = $scope.customer.eprofile;

      eprofile.birthMm = moment($scope.customer.birthDatePicker.date).format("MM");
      eprofile.birthDd = moment($scope.customer.birthDatePicker.date).format("DD");
      eprofile.birthYear = moment($scope.customer.birthDatePicker.date).format("YYYY");

      var params = {
        entityId          : eprofile.entityId,
        title             : eprofile.title,
        emailAddress      : eprofile.emailAddress,
        firstName         : eprofile.firstName,
        lastName          : eprofile.lastName,
        numberStreet      : eprofile.numberStreet,
        birthMm           : eprofile.birthMm,
        birthDd           : eprofile.birthDd,
        birthYear         : eprofile.birthYear,
        addressExtraInfo  : eprofile.addressExtraInfo,
        externalId        : eprofile.externalId,
        mobilePhone       : eprofile.mobilePhone,
        cityTown          : eprofile.cityTown,
        homePhone         : eprofile.homePhone,
        provState         : eprofile.provState,
        country           : eprofile.country,
        postalCode        : eprofile.postalCode,
        entityId          : eprofile.entityId,
      };

      CustomerService.updateCustomerGeneralInfo(params).then(function(result) {
        $scope.customer.profile = result.profile;
      });

      $scope.customer.frmdiv.general = false;
    };

    $scope.saveExtended = function() {
      var eprofile = $scope.customer.eprofile;

      var params = {
        entityId          : eprofile.entityId,
        nationality       : $scope.customer.nationality.selected.code,
        identityNumber    : eprofile.identityNumber,
        placeOfBirth      : eprofile.placeOfBirth,
        mothersMaidenName : eprofile.mothersMaidenName,
        occupation        : eprofile.occupation,
        maritalStatus     : $scope.customer.maritalStatus.selected.code,
        natureOfWork      : eprofile.natureOfWork,
        employer          : eprofile.employer,
      };

      CustomerService.updateCustomerExtendedInfo(params).then(function(result) {
        $scope.customer.profile = result.profile;
      });

      $scope.customer.frmdiv.extended = false;
    };

    $scope.saveFees = function() {
      var eprofile = $scope.customer.eprofile;
      var params = {
        eid     : eprofile.entityId,
        tierId  : parseInt($scope.customer.fees.selected.refCode),
      };

      CustomerService.updateCustomerTierInfo(params).then(function(result) {
        $scope.customer.profile = result.profile;
      });

      $scope.customer.frmdiv.fees = false;
    };

    $scope.saveBaseCurrency = function() {
      var eprofile = $scope.customer.eprofile;
      var params = {
        eid       : eprofile.entityId,
        currency  : $scope.customer.baseCurrency.selected.code,
      };

      CustomerService.updateBaseCurrency(params).then(function(result) {
        $scope.customer.profile = result.profile;
      });

      $scope.customer.frmdiv.base_currency = false;
    };

    $scope.updateForm = function(formSelected) {
      // Update bindings
      $scope.getProfile($stateParams.profileId);

      switch(formSelected) {
        case 'general':
          $scope.customer.frmdiv.general      = true;
          $scope.customer.isEditMode.general  = !$scope.customer.isEditMode.general;
          break;

        case 'extended':
          $scope.customer.frmdiv.extended      = true;
          $scope.customer.isEditMode.extended  = !$scope.customer.isEditMode.extended;

          $scope.customer.nationality.selected    = $filter('dictselector')($scope.countries,$scope.customer.profile.nationality);
          $scope.customer.maritalStatus.selected  = $filter('dictselector')($scope.marital,$scope.customer.profile.maritalStatus);
          break;

        case 'fees':
          $scope.customer.frmdiv.fees      = true;
          $scope.customer.isEditMode.fees  = !$scope.customer.isEditMode.fees;
          break;

        case 'base_currency':
          $scope.customer.frmdiv.base_currency      = true;
          $scope.customer.isEditMode.base_currency  = !$scope.customer.isEditMode.fees;
          break;
      }
    };

    $scope.cancelEdit = function(formSelected) {
      switch(formSelected) {
        case 'general':
          $scope.customer.frmdiv.general      = !$scope.customer.frmdiv.general;
          $scope.customer.isEditMode.general  = !$scope.customer.isEditMode.general;
          break;

        case 'extended':
          $scope.customer.frmdiv.extended      = !$scope.customer.frmdiv.extended;
          $scope.customer.isEditMode.extended  = !$scope.customer.isEditMode.extended;
          break;

        case 'fees':
          $scope.customer.frmdiv.fees      = !$scope.customer.frmdiv.fees;
          $scope.customer.isEditMode.fees  = !$scope.customer.isEditMode.fees;
          break;

        case 'base_currency':
          $scope.customer.frmdiv.base_currency      = !$scope.customer.frmdiv.base_currency;
          $scope.customer.isEditMode.base_currency  = !$scope.customer.isEditMode.base_currency;
          break;
      }
    };

    var getRefTierList = function() {
      FeesService.getReferenceDataList("TIER").then(function(result) {
        if(result.isSuccess) {
          $scope.customer.tier = result.refDataList;
        }
      }, function(error) {
      });
    };

    var getCountryList = function() {
      ListService.retrieveCountryList().then(function(result) {
        angular.forEach(result, function(data) {$scope.countries.push({ code: data.Code, name: data.Name, }); });
      });
    };

    var getMaritalStatusList = function() {
      ListService.retrieveMaritalStatusList().then(function(result) {
        angular.forEach(result, function(data) { $scope.marital.push({code: data.code, name: data.name, }); });
      });
    };

    var getCurrencies = function() {
      ListService.retrieveAllCurrencies().then(function(result) {
        angular.forEach(result, function(data) { $scope.currencies.push({code: data.code, name: data.name, }); });
      });
    };

    $scope.initCustomerProfile = function() {
      getRefTierList();
      getCountryList();
      getMaritalStatusList();
      getCurrencies();

      $scope.getProfile($stateParams.profileId);
    };

    $scope.initProfileChronology = function() {};

    /*
      Funds Tab
    */

    var setFundsDateSelection = function() {
      var eventHandlers = {
        'apply.daterangepicker' : function(ev, picker) {

          var startDate = moment($scope.customer.funds.dtp.startDate).format("YYYY-MM-DD");
          var endDate   = moment($scope.customer.funds.dtp.endDate).format("YYYY-MM-DD");

          $scope.getFundActivities($scope.customer.profile.entityId, startDate, endDate);

        },
      };

      $scope.customer.funds = {
        dtp: {
          startDate: moment.now(),
          endDate: moment.now(),
          opts: {
            locale: { format: "MMMM D, YYYY", },
            eventHandlers: eventHandlers
          },
        },
        grid : {

          data : [],
          paginationPageSizes: [25, 50, 75, 100],
          paginationPageSize: 25,
          width: '*',
          //enableHorizontalScrollbar: true,
          //enableVerticalScrollbar: true,
          enableFiltering: true,
          flatEntityAccess: true,
          showGridFooter: true,
          fastWatch: true,
          data: [],
          gridReloadingMessage: "",
          isGridReloading: false,
          showGridLoading: function() {},
          hideGridLoading: function() {},
          columnDefs : [
            {name:'Date', field:'activityDate', width:'20%'},
            {name:'Ref #', field:'txnRef', width:'10%'},
            {name:'Description', field:'activityDesc', width:'40%'},
            {name:'Debit', field:'prepostBalance', width:'10%'},
            {name:'Credit', field:'postBalance', width:'10%'},
            {name:'Balance', field:'postBalance', width:'10%'},
          ]
        },
      };
    };

    $scope.getFundActivities = function(eid, startDate, endDate) {
      //$scope.transactionLogsGridOptions.isGridReloading = true;
      //$scope.reports.transactionLoader = 'Loading all transaction records...';

      // Get Month difference for the mean time
       var startDate  = moment(startDate);
       var endDate    = moment(endDate);
       var diff       = endDate.diff(startDate,'months');

      MerchantServices.getFundActivities(eid, diff).then(function(result) {

        $scope.customer.funds.grid.data = [];
        if(result.fundActivityList && result.isSuccess) {
          $scope.customer.funds.grid.data = result.fundActivityList;
        }

        // $interval( function() {
        //   $scope.customer.funds.gridAPI.core.handleWindowResize();
        // }, 10, 500);

        // $scope.transactionLogsGridOptions.isGridReloading = false;
        // $scope.reports.transactionLoader = '';

      });
    };

    $scope.initFunds = function() {
      setFundsDateSelection();
      $scope.getFundActivities($scope.customer.profile.entityId, moment().format("YYYY-MM-DD"), moment().format("YYYY-MM-DD"));
    };


    /*
      Card Devices Tab
    */

    $scope.customer.carddevices = {
      gridAPI : {},
      grid: {
        data : [],
        paginationPageSizes: [25, 50, 75, 100],
        paginationPageSize: 25,
        width: '*',
        //enableHorizontalScrollbar: true,
        //enableVerticalScrollbar: true,
        enableFiltering: true,
        flatEntityAccess: true,
        showGridFooter: true,
        //fastWatch: true,
        data: [],
        gridReloadingMessage: "",
        isGridReloading: false,
        showGridLoading: function() {  },
        hideGridLoading: function() {},
        onRegisterApi: function(gridApi) {
          $scope.customer.carddevices.gridAPI = gridApi;
        },
        columnDefs : [
          {name:'Card ID', field:'cardId', width:'10%'},
          {name:'Card #', field:'lastFourDigits', width:'10%'},
          {name:'Currency', field:'cardCurrency', width:'10%'},
          {name:'Balance', field:'cardBalance', width:'10%'},
          {name:'Activation Key', field:'activationKey', width:'15%'},
          {name:'Request Date', field:'requestDate', width:'15%'},
          {name:'Activation Date', field:'activationDate', width:'15%'},
          {name:'Status', field:'cardStatus', width:'10%'},
          {
            name: 'edit', displayName: '',pinnedLeft:true,
            cellTemplate: '<a class="dg-action-link" title="Comment" ng-click="grid.appScope.addCardComment(row.entity.lastFourDigits)"><i class="glyphicon glyphicon-comment"></i></a> <a title="Reassign" ng-click="grid.appScope.reAssignCard(row.entity.cardId)" class="dg-action-link"><i class="glyphicon glyphicon-random"></i></a>',
            enableFiltering:false, width:'5%'
          },
        ]
      },
    };

    $scope.getAllPrepaidCards = function(eid) {
      CustomerService.getCustomerCardInfo(eid).then(function(result) {

        $scope.customer.carddevices.grid.data = [];
        if(result.customerCardList && result.isSuccess) {
          $scope.customer.carddevices.grid.data = result.customerCardList;
        }

        $interval( function() {
          $scope.customer.carddevices.gridAPI.core.handleWindowResize();
        }, 10, 500);

      });

    };

    $scope.addCardComment = function(cardNumber) {
      $scope.customerCard = {
        number : cardNumber,
        comment : '',
      };

      $scope.modalInstance=$uibModal.open({
        templateUrl: 'public/partials/member/customer.profile/forms/_fund.addcomment.modal.html',
        scope:$scope,
        size: 'md',
        backdrop: 'static',
      });
    };

    $scope.saveCardComment = function() {
      var params = {
        eid: $scope.customer.profile.entityId,
        comment : $scope.customerCard.comment,
      };

      CustomerService.addCustomerCardComment(params).then(function(result) {
        $scope.customerCard = {};
      });

      $scope.closeModal();
    };

    $scope.reAssignCard = function(cardId) {
      $rootScope.removeAlertNotification('cardReassignment');
      $scope.customerCard = {
        cardId : cardId,
      };

      $scope.modalInstance=$uibModal.open({
        templateUrl: 'public/partials/member/customer.profile/forms/_fund.reassigncard.modal.html',
        scope:$scope,
        size: 'md',
        backdrop: 'static',
      });
    };

    $scope.processCardReassignment = function() {
      var form = $scope.customerCard;
      var params = {
        cardId          : form.cardId,
        oldCardNumber   : form.oldCard,
        newCardNumber   : form.newCard,
        issuerReference : form.bankAccount
      };

      CustomerService.processCardReassignment(params).then(function(result) {
        if(!result.isSuccess) {
          $rootScope.throwAlertNotification("cardReassignment",result.error.msg, "alert-danger", true);
        } else {
          var msg = "Successfully Reassigned Card.";
          $rootScope.throwAlertNotification("cardReassignmentSuccessCallback",msg, "alert-success", true);
          $scope.card.form = {};
        }
      }, function(error) {
        var msg = "Server Error : Please contact administrator";
        $rootScope.throwAlertNotification("cardReassignment", msg, "alert-danger", true);
      });
    };


    $scope.initCardDevices = function() {
      var eid = $scope.customer.profile.entityId;
      $scope.getAllPrepaidCards(eid);

      $rootScope.removeAlertNotification('cardReassignmentSuccessCallback');
    };

    /*
      Comments Tab
    */

    $scope.customer.comments = {
      form: {},
      gridAPI:{},
      grid: {
        data: [],
        paginationPageSizes: [25, 50, 75, 100],
        paginationPageSize: 25,
        width: '*',
        //enableHorizontalScrollbar: true,
        //enableVerticalScrollbar: true,
        enableFiltering: true,
        flatEntityAccess: true,
        showGridFooter: true,
        //fastWatch: true,
        data: [],
        gridReloadingMessage: "",
        isGridReloading: false,
        showGridLoading: function() {},
        hideGridLoading: function() {},
        onRegisterApi: function(gridApi) {
          $scope.customer.comments.gridAPI = gridApi;
        },
      },
    };

    $scope.customer.comments.grid.columnDefs = [
      {name:'Comment ID', field:'commentId', width:'10%'},
      {name:'Comment', field:'comment', width:'45%'},
      {name:'Timestamp', field:'createDate', width:'25%'},
      {name:'Contributor', field:'contributorId', width:'20%'},
    ];

    $scope.getAllComments = function(eid) {
      CustomerService.getComments({eid:eid}).then(function(result) {
        // if(result.isSuccess) {
        //   $scope.customer.comments.grid.data = result.commentList;
        //
        //   // Redraw UI Grid after initializing the tabs
        //   $interval( function() {
        //     $scope.customer.comments.gridAPI.core.handleWindowResize();
        //   }, 10, 500);
        // }

        $scope.customer.comments.grid.data = [];
        if(result.commentList && result.isSuccess) {
          $scope.customer.comments.grid.data = result.commentList;
        }

        $interval( function() {
          $scope.customer.comments.gridAPI.core.handleWindowResize();
        }, 10, 500);

      });
    };

    $scope.addComment = function() {
      $rootScope.removeAlertNotification('addComment');
      $scope.modalInstance=$uibModal.open({
        templateUrl: 'public/partials/member/customer.profile/forms/_comments.addcomment.modal.html',
        scope:$scope,
        size: 'md',
        backdrop: 'static',
      });
    };

    $scope.saveComment = function() {
      var form = $scope.customer.comments.form;
      var params = {
        eid:$scope.customer.profile.entityId,
        comment:form.comment,
      };

      CustomerService.addComment(params).then(function(result) {
        if(!result.isSuccess) {
          $rootScope.throwAlertNotification("addComment",result.error.msg, "alert-danger", true);
        } else {
          var msg = "Successfully added comment";
          $rootScope.throwAlertNotification("addCommentSuccessCallback",msg, "alert-success", true);
          $scope.getAllComments($scope.customer.profile.entityId);
          $scope.closeModal();
        }
      }, function(error) {
        var msg = "Server Error : Please contact administrator";
        $rootScope.throwAlertNotification("addComment", msg, "alert-danger", true);
      });

    }

    $scope.initComments = function() {
      var eid = $scope.customer.profile.entityId;
      $scope.getAllComments(eid);

      $rootScope.removeAlertNotification('addCommentSuccessCallback');
    };

    /*
      Alerts Tab
    */

    $scope.customer.alerts = {
      form: {},
      gridAPI:{},
      grid: {
        data: [],
        paginationPageSizes: [25, 50, 75, 100],
        paginationPageSize: 25,
        width: '*',
        //enableHorizontalScrollbar: true,
        //enableVerticalScrollbar: true,
        enableFiltering: true,
        flatEntityAccess: true,
        showGridFooter: true,
        //fastWatch: true,
        data: [],
        gridReloadingMessage: "",
        isGridReloading: false,
        showGridLoading: function() {},
        hideGridLoading: function() {},
        onRegisterApi: function(gridApi) {
          $scope.customer.alerts.gridAPI = gridApi;
        },
      },
    };

    $scope.customer.alerts.grid.columnDefs = [
      {name:'Alert ID', field:'alertId', width:'5%'},
      {name:'Date', field:'alertDate', width:'20%'},
      {name:'Category', field:'category', width:'17%'},
      {name:'Alert Text', field:'alertText', width:'20%'},
      {name:'Resolved By', field:'resolvedBy', width:'10%'},
      {name:'Resolved Date', field:'resolvedDate', width:'10%'},
      {name:'Resolution', field:'resolution', width:'15%'},
      {
        name: 'edit', displayName: '',pinnedLeft:true,
        cellTemplate: '<a class="dg-action-link" title="Resolve" ng-click="grid.appScope.resolveAlertModal(row.entity.alertId)"><i class="glyphicon glyphicon-ok"></i></a>',
        enableFiltering:false, width:'3%'
      },
    ];

    $scope.getAllAlerts = function(eid) {
      CustomerService.getCustomerAlerts({entityId:eid}).then(function(result) {

        $scope.customer.alerts.grid.data = [];
        if(result.adminAlertList && result.isSuccess) {
          $scope.customer.alerts.grid.data = result.adminAlertList;
        }

        $interval( function() {
          $scope.customer.alerts.gridAPI.core.handleWindowResize();
        }, 10, 500);

      });
    };

    $scope.resolveAlertModal = function(alertId) {
      $scope.customer.alerts.form.alertId = alertId;

      $rootScope.removeAlertNotification('resolveAlert');
      $scope.modalInstance=$uibModal.open({
        templateUrl: 'public/partials/member/customer.profile/forms/_alert.resolve.modal.html',
        scope:$scope,
        size: 'md',
        backdrop: 'static',
      });
    };

    $scope.resolveAlert = function() {
      var form = $scope.customer.alerts.form;
      var params = {
        alertId     : form.alertId,
        resolution  : form.resolution,
      };

      CustomerService.resolveAlert(params).then(function(result) {
        if(!result.isSuccess) {
          $rootScope.throwAlertNotification("resolveAlert",result.error.msg, "alert-danger", true);
        } else {
          var msg = "Successfully resolve alert #" + form.alertId ;
          $rootScope.throwAlertNotification("resolveAlertSuccessCallback",msg, "alert-success", true);
          $scope.getAllAlerts($scope.customer.profile.entityId);
          $scope.closeModal();
        }
      }, function(error) {
        var msg = "Server Error : Please contact administrator";
        $rootScope.throwAlertNotification("resolveAlert", msg, "alert-danger", true);
      });
    };

    $scope.initAlerts = function() {
      var eid = $scope.customer.profile.entityId;
      $scope.getAllAlerts(eid);

      $rootScope.removeAlertNotification('resolveAlertSuccessCallback');
    };


    /* Activity Log Tab */
    $scope.customer.activitylog = {
      gridAPI:{},
      grid: {
        data: [],
        paginationPageSizes: [25, 50, 75, 100],
        paginationPageSize: 25,
        width: '*',
        //enableHorizontalScrollbar: true,
        //enableVerticalScrollbar: true,
        enableFiltering: true,
        flatEntityAccess: true,
        showGridFooter: true,
        //fastWatch: true,
        data: [],
        gridReloadingMessage: "",
        isGridReloading: false,
        showGridLoading: function() {},
        hideGridLoading: function() {},
        onRegisterApi: function(gridApi) {
          $scope.customer.activitylog.gridAPI = gridApi;
        },
      },
    };

    $scope.customer.activitylog.grid.columnDefs = [
      {name:'Activity ID', field:'alertId', width:'10%'},
      {name:'Activity Date', field:'alertDate', width:'20%'},
      {name:'Category', field:'category', width:'20%'},
      {name:'Description', field:'alertText', width:'40%'},
      {name:'IP Address', field:'resolvedBy', width:'10%'},
    ];

    $scope.getCustomerActivityLog = function(eid) {
      CustomerService.getCustomerActivityLog({eid:eid}).then(function(result) {

        $scope.customer.activitylog.grid.data = [];
        if(result.adminAlertList && result.isSuccess) {
          $scope.customer.activitylog.grid.data = result.adminAlertList;
        }

        $interval( function() {
          $scope.customer.activitylog.gridAPI.core.handleWindowResize();
        }, 10, 500);

      });
    };

    $scope.initActivityLog = function() {
      var eid = $scope.customer.profile.entityId;
      $scope.getCustomerActivityLog(eid);
    };
}]);
