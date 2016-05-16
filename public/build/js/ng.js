function ngResourceConfig(e,t){e.decorator("$resource",["$delegate",function(e){return function(){return arguments.length>0&&(arguments[0]=arguments[0].replace(/\/$/,"\\/")),arguments.length>2&&angular.forEach(arguments[2],function(e){e&&e.url&&(e.url=e.url.replace(/\/$/,"\\/"))}),e.apply(e,arguments)}}]),e.factory("resourceEnforceSlashInterceptor",function(){return{request:function(e){return e.url=e.url.replace(/[\/\\]+$/,"/"),e}}}),t.interceptors.push("resourceEnforceSlashInterceptor")}ngResourceConfig.$inject=["$provide","$httpProvider"],angular.module("ngResource").config(["$provide","$httpProvider",ngResourceConfig]);var app=angular.module("App",["daterangepicker","angular-loading-bar","ui.router","ui.bootstrap","ui.grid","ui.grid.pinning","ui.grid.pagination","ui.grid.exporter","ui.select","ngFileUpload","ngResource","ngAnimate","ngTouch","ngSanitize","restangular","appServices","appFilters","appControllers"]).run(["$rootScope","$state","$timeout","GlobalService",function(e,t,r,i){e.$on("$stateChangeStart",function(e,t,r,i,o){return t.authenticate?!0:void 0})}]),appServices=angular.module("appServices",[]),appFilters=angular.module("appFilters",[]),appControllers=angular.module("appControllers",[]);app.config(["cfpLoadingBarProvider",function(e){e.includeSpinner=!1}]),app.config(["$stateProvider","$urlRouterProvider","$httpProvider","RestangularProvider",function(e,t,r,i){t.otherwise("/login"),e.state("/chat",{url:"/chat",views:{main:{controller:"ChatCtrl",templateUrl:"public/partials/chat/index.html"}}}).state("signout",{url:"/signout",views:{loginWrapper:{controller:["$rootScope","$state",function(e,t){t.transitionTo("login")}],template:""}}}).state("login",{url:"/login",views:{loginWrapper:{controller:"LoginCtrl",templateUrl:"public/partials/login/login.form.html"}}})}]).run(["$rootScope","GlobalService","$timeout",function(e,t,r){e.sidenav={parent:"",selected:"",location:"",style:{}},e.constants={pageTitle:"",showMainWrapper:!1,isAuthenticated:!1},e.alert=[],e.throwAlertNotification=function(t,r,i,o){e.alert[t]={show:o,msg:r,label:i}},e.removeAlertNotification=function(t){e.alert[t]={}},e.removeAllAlertNotification=function(){e.alert=[]}}]),appServices.service("CustomerService",["$rootScope","Restangular",function(e,t){var r=this,i={"Content-Type":"application/x-www-form-urlencoded; charset=UTF-8"};r.getCustomerListBySignUpTime=function(e){return t.all("customerFilterBySignupTime.sctl").customPOST("","",{day:e},i)},r.getCustomerList=function(e){return t.all("customerSearchByEmailOrNameOrPhone.sctl").customPOST("","",{emailAddress:e},i)},r.getCustomerListByHost=function(e){return t.all("customerSearchBySignupHost.sctl").customPOST("","",{itemsPerPage:100,limit:100,offset:0,signupHost:e},i)},r.getProfile=function(e){return t.all("getCustomerProfile.sctl").customPOST("","",{eid:e},i)},r.updateCustomerHost=function(e){return t.all("updateCustomerHost.sctl").customPOST("","",e,i)},r.updateCustomerGeneralInfo=function(e){return t.all("updateCustomerGeneralInfo.sctl").customPOST("","",e,i)},r.updateCustomerExtendedInfo=function(e){return t.all("updateCustomerExtendedInfo.sctl").customPOST("","",e,i)},r.updateCustomerTierInfo=function(e){return t.all("updateCustomerTierInfo.sctl").customPOST("","",e,i)},r.updateBaseCurrency=function(e){return t.all("updateBaseCurrency.sctl").customPOST("","",e,i)},r.getValidCustomerHosts=function(){return t.all("getValidHosts.sctl").customPOST("","",{},i)},r.getCustomerCardInfo=function(e){return t.all("getCardInfo.sctl").customPOST("","",{eid:e},i)},r.addCustomerCardComment=function(e){return t.all("addComment.sctl").customPOST("","",e,i)},r.getCustomerCardRequestList=function(){return t.all("getCardRequests.sctl").customPOST("","",{},i)},r.processCardAssignment=function(e){return t.all("processCardAssignment.sctl").customPOST("","",e,i)},r.cancelCardRequest=function(e){return t.all("cancelCardRequest.sctl").customPOST("","",e,i)},r.createAssignCard=function(e){return t.all("createAndAssignCard.sctl").customPOST("","",e,i)},r.assignPosDevice=function(e){return t.all("assignPosDevice.sctl").customPOST("","",e,i)},r.getOpenPosDeviceRequests=function(){return t.all("getOpenPosDeviceRequests.sctl").customPOST("","",{},i)},r.getPosDeviceRequest=function(e){return t.all("getPosDeviceRequest.sctl").customPOST("","",e,i)},r.addPrivateCard=function(e){return t.all("addPrivCard.sctl").customPOST("","",e,i)},r.fillPosDeviceRequest=function(e){return t.all("fillPosDeviceRequest.sctl").customPOST("","",e,i)},r.processCardReassignment=function(e){return t.all("processCardReassignment.sctl").customPOST("","",e,i)},r.getComments=function(e){return t.all("getComments.sctl").customPOST("","",e,i)},r.addComment=function(e){return t.all("addComment.sctl").customPOST("","",e,i)},r.getCustomerAlerts=function(e){return t.all("getCustomerAlerts.sctl").customPOST("","",e,i)},r.resolveAlert=function(e){return t.all("resolveAlert.sctl").customPOST("","",e,i)},r.getAllPendingSignUps=function(e){return t.all("getPendingSignups.sctl").customPOST("","",e,i)},r.resendActivationKey=function(e){return t.all("resendActivationKey.sctl").customPOST("","",e,i)},r.sendSignupReminder=function(e){return t.all("sendSignupReminder.sctl").customPOST("","",e,i)},r.deletePendingSignUp=function(e){return t.all("deletePendingSignup.sctl").customPOST("","",e,i)},r.getOutstandingAlerts=function(){return t.all("getOutstandingAlerts.sctl").customPOST("","",{},i)},r.initTxnGeneral=function(){return t.all("initTxnGeneral.sctl").customPOST("","",{},i)},r.submitTxnGeneral=function(e){return t.all("submitTxnGeneral.sctl").customPOST("","",e,i)},r.confirmTxnGeneral=function(e){return t.all("confirmTxnGeneral.sctl").customPOST("","",e,i)},r.getPromoAuditList=function(e){return t.all("getPromoAuditList.sctl").customPOST("","",e,i)},r.approvePromoAudit=function(e){return t.all("approvePromoAudit.sctl").customPOST("","",e,i)},r.rejectPromoAudit=function(e){return t.all("rejectPromoAudit.sctl").customPOST("","",e,i)},r.getCustomerPoids=function(e){return t.all("getCustomerPoids.sctl").customPOST("","",e,i)},r.approvePoid=function(e){return t.all("approvePoid.sctl").customPOST("","",e,i)},r.deleteCustomerPoid=function(e){return t.all("deleteCustomerPoid.sctl").customPOST("","",e,i)},r.getCustomerActivityLog=function(e){return t.all("getCustomerActivityLog.sctl").customPOST("","",e,i)},r.sendCustomerEmail=function(e){return t.all("sendCustomerEmail.sctl").customPOST("","",e,i)},r.changeCustomerPin=function(e){return t.all("changeCustomerPin.sctl").customPOST("","",e,i)},r.updateCustomerStatus=function(e){return t.all("updateCustomerStatus.sctl").customPOST("","",e,i)}}]),appServices.service("GlobalService",["$rootScope",function(e){}]),appServices.factory("PublicJsonFactory",["Restangular",function(e){return e.withConfig(function(e){e.setBaseUrl("json/")})}]),appServices.service("ListService",["$rootScope","PublicJsonFactory",function(e,t){var r=this;r.retrieveCountryList=function(){return t.all("countries.json").getList()},r.retrieveMaritalStatusList=function(){return t.all("marital.json").getList()},r.retrieveAllCurrencies=function(){return t.all("currency.json").getList()},r.retrieveAllPoids=function(){return t.all("poid.json").getList()},r.retrieveAllTapDevices=function(){return t.all("tapdevices.json").getList()},r.retrieveAllPrivilegeCardIssuer=function(){return t.all("privilegecardissuer.json").getList()},r.retrieveAllPreviousDates=function(){return t.all("previousdates.json").getList()}}]),appFilters.filter("arraysum",function(){return function(e){if(null===e)return!1;var t=0;return angular.forEach(e,function(e){t+=parseInt(e),console.log("value",e,t)}),t}}),appFilters.filter("daterangefilter",function(){return function(e,t,r){if(null===e)return!1;var i=[];return angular.forEach(e,function(e){var o=moment(e.activityDate),a=moment(t,"DD-MM-YYYY"),n=moment(r,"DD-MM-YYYY");o>=a&&n>=o&&(console.log("thiz",o),i.push(e))}),i}}),appFilters.filter("dictselector",function(){return function(e,t,r){var i={};return angular.forEach(e,function(e){var o=r?r:"code";e[o]==t&&(i=e)}),i}}),appControllers.controller("ChatCtrl",["$scope","$rootScope",function(e,t){}]),appControllers.controller("CompanyProfileCtrl",["$scope","$rootScope",function(e,t){}]),appControllers.controller("CustomerProfileCtrl",["$scope","$rootScope","$filter","$interval","$location","$timeout","$state","$stateParams","$uibModal","CustomerService","FeesService","ListService","MerchantServices","uiGridConstants","Upload",function(e,t,r,i,o,a,n,s,c,l,d,u,m,f,p){o.path().split("/")[2];t.sidenav={pageTitle:"Company Center",parent:"member",selected:"customer.search",isMembershibTabOpen:!0},e.accrd={customerProfile:!0},e.customer={proofsids:{form:{},list:{}},poid:{},host:{},poidLabel:"",profile:{},eProfile:{},birthDatePicker:{date:"",opts:{singleDatePicker:!0,startDate:null,endDate:null}},nationality:{},maritalStatus:{},baseCurrency:{},tab:{},tier:[],fees:{},frmdiv:{general:!1,extended:!1,fees:!1,base_currency:!1},isEditMode:{general:!1,extended:!1,fees:!1,base_currency:!1},funds:{},carddevices:{},comments:{},alerts:{},activitylog:{}},e.poids=[],e.countries=[],e.marital=[],e.currencies=[],e.hosts=[],e.getProfile=function(t){l.getProfile(t).then(function(t){t.isSuccess?(e.customer.profile=t.profile,e.customer.eprofile=t.profile,e.customer.birthDatePicker.date=moment(t.profile.birthDate).format("YYYY-MM-DD"),e.customer.birthDatePicker.opts.startDate=moment(t.profile.birthDate).format("YYYY-MM-DD"),a(function(){e.customer.fees.selected=r("dictselector")(e.customer.tier,t.profile.tierId,"refCode"),e.customer.baseCurrency.selected=r("dictselector")(e.currencies,t.profile.baseCurrency)},50),e.loadAllPoids()):n.go("customersearch")},function(e){n.go("customersearch")})},e.sendEmailForm=function(){t.removeAlertNotification("sendEmailMessageCallback"),e.customer.emailForm={},e.modalInstance=c.open({templateUrl:"public/partials/member/customer.profile/forms/_sendemail.modal.html",scope:e,size:"md",backdrop:"static"})},e.sendCustomerEmail=function(){var r=e.customer.profile.entityId,i=e.customer.emailForm,o={eid:r,subject:i.subject,message:i.message};l.sendCustomerEmail(o).then(function(e){if(e.isSuccess){var r="Email has been successfully sent!";t.throwAlertNotification("sendEmailMessageCallback",r,"alert-success",!0)}else t.throwAlertNotification("sendEmailMessageCallback",e.error.msg,"alert-danger",!0)},function(e){var r="Server Error : Please contact administrator";t.throwAlertNotification("sendEmailMessageCallback",r,"alert-danger",!0)})},e.changePinForm=function(){t.removeAlertNotification("sendEmailMessageCallback"),e.customer.pin="",e.modalInstance=c.open({templateUrl:"public/partials/member/customer.profile/forms/_changepin.modal.html",scope:e,size:"md",backdrop:"static"})},e.changeCustomerPin=function(){var r={eid:e.customer.profile.entityId,newPin:e.customer.pin};l.changeCustomerPin(r).then(function(e){if(e.isSuccess){var r="Pin has been successfully changed!";t.throwAlertNotification("changePinCallback",r,"alert-success",!0)}else t.throwAlertNotification("changePinCallback",e.error.msg,"alert-danger",!0)},function(e){var r="Server Error : Please contact administrator";t.throwAlertNotification("changePinCallback",r,"alert-danger",!0)})},e.updateCustomerStatusConfirmation=function(){t.removeAlertNotification("updateCustomerStatusCallback"),e.modalInstance=c.open({templateUrl:"public/partials/member/customer.profile/_updatecustomer.status.confirmation.modal.html",scope:e,size:"md",backdrop:"static"})},e.updateCustomerStatus=function(r){var i={eid:e.customer.profile.entityId,isActive:r};l.updateCustomerStatus(i).then(function(r){if(r.isSuccess){e.getProfile(s.profileId),e.closeModal()}else t.throwAlertNotification("updateCustomerStatusCallback",r.error.msg,"alert-danger",!0)},function(e){var r="Server Error : Please contact administrator";t.throwAlertNotification("updateCustomerStatusCallback",r,"alert-danger",!0)})},e.loadAllPoids=function(){var t=e.customer.profile.entityId;l.getCustomerPoids({eid:t}).then(function(t){e.customer.proofsids.list=t.poidList,angular.forEach(e.customer.proofsids.list,function(e){"UNDECIDED"==e.approvalStatus?(e.labels="label label-warning",e.lstatus="For Review"):"APPROVED"==e.approvalStatus?(e.labels="label label-success",e.lstatus="Approved"):"REJECTED"==e.approvalStatus&&(e.labels="label label-danger",e.lstatus="Rejected")})})},e.uploadPoid=function(){e.customer.poidImageFile={},t.removeAlertNotification("uploadPoidCallback"),u.retrieveAllPoids().then(function(t){angular.forEach(t,function(t){e.poids.push({code:t.code,name:t.name})})}),e.modalInstance=c.open({templateUrl:"public/partials/member/customer.profile/_poid.modal.html",scope:e,size:"sm",backdrop:"static"})},e.poidUpload=function(r){if(r&&e.customer.poid.selected)r.upload=p.upload({url:"/gtcvbankadmin/poidupload.sctl",data:{poidImageFile:r,poidType:e.customer.poid.selected.code,poidDescription:"",eid:e.customer.profile.entityId}}),r.upload.then(function(i){a(function(){r.result=i.data,i.data.isSuccess?(e.loadAllPoids(),e.closeModal()):t.throwAlertNotification("uploadPoidCallback",i.data.error.msg,"alert-danger",!0)})},function(e){if(e.status>0)var r="Server Error : Please contact administrator";t.throwAlertNotification("uploadPoidCallback",r,"alert-danger",!0)});else{var i="Missing Image and Type. Please try again!";t.throwAlertNotification("uploadPoidCallback",i,"alert-danger",!0)}},e.viewPoid=function(i){if(e.customer.proofsids.form=r("dictselector")(e.customer.proofsids.list,i,"poidKey"),"APPROVED"==e.customer.proofsids.form.approvalStatus){var o="This ID is already approved!";t.throwAlertNotification("approvePoidCallback",o,"alert-success",!0)}e.modalInstance=c.open({templateUrl:"public/partials/member/customer.profile/_view.poid.modal.html",scope:e,size:"md",backdrop:"static"})},e.approvePoid=function(){var r=e.customer.proofsids.form,i={poidKey:r.poidKey,isApproved:!0,comments:r.applyComments};l.approvePoid(i).then(function(r){if(r.isSuccess){var i="Successfully approved proof of identity.";t.throwAlertNotification("approvePoidCallback",i,"alert-success",!0),e.customer.proofsids.form.approvalStatus="APPROVED",e.loadAllPoids()}else t.throwAlertNotification("approvePoidCallback",r.error.msg,"alert-danger",!0)},function(e){var r="Server Error : Please contact administrator";t.throwAlertNotification("approvePoidCallback",r,"alert-danger",!0)})},e.deletePoid=function(r,i){t.removeAlertNotification("deletePOIDCallback");var o=e.customer.proofsids.form;o.eid=r,o.poidKey=i,e.modalInstance=c.open({templateUrl:"public/partials/member/customer.profile/_deletepoid.confirmation.modal.html",scope:e,size:"md",backdrop:"static"})},e.deleteCustomerPoid=function(){var r=e.customer.proofsids.form,i={eid:r.eid,poidKey:r.poidKey};l.deleteCustomerPoid(i).then(function(r){r.isSuccess?(e.customer.proofsids.form={},e.closeModal(),e.loadAllPoids()):t.throwAlertNotification("deletePOIDCallback",r.error.msg,"alert-danger",!0)},function(e){var r="Server Error : Please contact administrator";t.throwAlertNotification("deletePOIDCallback",r,"alert-danger",!0)})},e.showCustomerQRCode=function(){e.modalInstance=c.open({templateUrl:"public/partials/member/customer.profile/_qrcode.modal.html",scope:e,size:"md",backdrop:"static"})},e.editHost=function(){l.getValidCustomerHosts().then(function(t){e.hosts=t.hostList}),e.modalInstance=c.open({templateUrl:"public/partials/member/customer.profile/_hosts.modal.html",scope:e,size:"sm",backdrop:"static"})},e.updateCustomerHost=function(){var t=e.customer.profile.entityId;if(t){var r={eid:t,siteHost:e.customer.host.selected.host};l.updateCustomerHost(r).then(function(t){e.customer.profile.signupHost=r.siteHost,e.customer.eprofile.signupHost=r.siteHost}),e.closeModal()}},e.closeModal=function(){e.modalInstance.dismiss()},e.saveGeneral=function(){var t=e.customer.eprofile;t.birthMm=moment(e.customer.birthDatePicker.date).format("MM"),t.birthDd=moment(e.customer.birthDatePicker.date).format("DD"),t.birthYear=moment(e.customer.birthDatePicker.date).format("YYYY");var r={entityId:t.entityId,title:t.title,emailAddress:t.emailAddress,firstName:t.firstName,lastName:t.lastName,numberStreet:t.numberStreet,birthMm:t.birthMm,birthDd:t.birthDd,birthYear:t.birthYear,addressExtraInfo:t.addressExtraInfo,externalId:t.externalId,mobilePhone:t.mobilePhone,cityTown:t.cityTown,homePhone:t.homePhone,provState:t.provState,country:t.country,postalCode:t.postalCode,entityId:t.entityId};l.updateCustomerGeneralInfo(r).then(function(t){e.customer.profile=t.profile}),e.customer.frmdiv.general=!1},e.saveExtended=function(){var t=e.customer.eprofile,r={entityId:t.entityId,nationality:e.customer.nationality.selected.code,identityNumber:t.identityNumber,placeOfBirth:t.placeOfBirth,mothersMaidenName:t.mothersMaidenName,occupation:t.occupation,maritalStatus:e.customer.maritalStatus.selected.code,natureOfWork:t.natureOfWork,employer:t.employer};l.updateCustomerExtendedInfo(r).then(function(t){e.customer.profile=t.profile}),e.customer.frmdiv.extended=!1},e.saveFees=function(){var t=e.customer.eprofile,r={eid:t.entityId,tierId:parseInt(e.customer.fees.selected.refCode)};l.updateCustomerTierInfo(r).then(function(t){e.customer.profile=t.profile}),e.customer.frmdiv.fees=!1},e.saveBaseCurrency=function(){var t=e.customer.eprofile,r={eid:t.entityId,currency:e.customer.baseCurrency.selected.code};l.updateBaseCurrency(r).then(function(t){e.customer.profile=t.profile}),e.customer.frmdiv.base_currency=!1},e.updateForm=function(t){switch(e.getProfile(s.profileId),t){case"general":e.customer.frmdiv.general=!0,e.customer.isEditMode.general=!e.customer.isEditMode.general;break;case"extended":e.customer.frmdiv.extended=!0,e.customer.isEditMode.extended=!e.customer.isEditMode.extended,e.customer.nationality.selected=r("dictselector")(e.countries,e.customer.profile.nationality),e.customer.maritalStatus.selected=r("dictselector")(e.marital,e.customer.profile.maritalStatus);break;case"fees":e.customer.frmdiv.fees=!0,e.customer.isEditMode.fees=!e.customer.isEditMode.fees;break;case"base_currency":e.customer.frmdiv.base_currency=!0,e.customer.isEditMode.base_currency=!e.customer.isEditMode.fees}},e.cancelEdit=function(t){switch(t){case"general":e.customer.frmdiv.general=!e.customer.frmdiv.general,e.customer.isEditMode.general=!e.customer.isEditMode.general;break;case"extended":e.customer.frmdiv.extended=!e.customer.frmdiv.extended,e.customer.isEditMode.extended=!e.customer.isEditMode.extended;break;case"fees":e.customer.frmdiv.fees=!e.customer.frmdiv.fees,e.customer.isEditMode.fees=!e.customer.isEditMode.fees;break;case"base_currency":e.customer.frmdiv.base_currency=!e.customer.frmdiv.base_currency,e.customer.isEditMode.base_currency=!e.customer.isEditMode.base_currency}};var g=function(){d.getReferenceDataList("TIER").then(function(t){t.isSuccess&&(e.customer.tier=t.refDataList)},function(e){})},h=function(){u.retrieveCountryList().then(function(t){angular.forEach(t,function(t){e.countries.push({code:t.Code,name:t.Name})})})},v=function(){u.retrieveMaritalStatusList().then(function(t){angular.forEach(t,function(t){e.marital.push({code:t.code,name:t.name})})})},C=function(){u.retrieveAllCurrencies().then(function(t){angular.forEach(t,function(t){e.currencies.push({code:t.code,name:t.name})})})};e.initCustomerProfile=function(){g(),h(),v(),C(),e.getProfile(s.profileId)},e.initProfileChronology=function(){};var P=function(){var t={"apply.daterangepicker":function(t,r){var i=moment(e.customer.funds.dtp.startDate).format("YYYY-MM-DD"),o=moment(e.customer.funds.dtp.endDate).format("YYYY-MM-DD");e.getFundActivities(e.customer.profile.entityId,i,o)}};e.customer.funds={dtp:{startDate:moment.now(),endDate:moment.now(),opts:{locale:{format:"MMMM D, YYYY"},eventHandlers:t}},grid:{data:[],paginationPageSizes:[25,50,75,100],paginationPageSize:25,width:"*",enableFiltering:!0,flatEntityAccess:!0,showGridFooter:!0,fastWatch:!0,data:[],gridReloadingMessage:"",isGridReloading:!1,showGridLoading:function(){},hideGridLoading:function(){},columnDefs:[{name:"Date",field:"activityDate",width:"20%"},{name:"Ref #",field:"txnRef",width:"10%"},{name:"Description",field:"activityDesc",width:"40%"},{name:"Debit",field:"prepostBalance",width:"10%"},{name:"Credit",field:"postBalance",width:"10%"},{name:"Balance",field:"postBalance",width:"10%"}]}}};e.getFundActivities=function(t,r,i){var r=moment(r),i=moment(i),o=i.diff(r,"months");m.getFundActivities(t,o).then(function(t){e.customer.funds.grid.data=[],t.fundActivityList&&t.isSuccess&&(e.customer.funds.grid.data=t.fundActivityList)})},e.initFunds=function(){P(),e.getFundActivities(e.customer.profile.entityId,moment().format("YYYY-MM-DD"),moment().format("YYYY-MM-DD"))},e.customer.carddevices={gridAPI:{},grid:{data:[],paginationPageSizes:[25,50,75,100],paginationPageSize:25,width:"*",enableFiltering:!0,flatEntityAccess:!0,showGridFooter:!0,data:[],gridReloadingMessage:"",isGridReloading:!1,showGridLoading:function(){},hideGridLoading:function(){},onRegisterApi:function(t){e.customer.carddevices.gridAPI=t},columnDefs:[{name:"Card ID",field:"cardId",width:"10%"},{name:"Card #",field:"lastFourDigits",width:"10%"},{name:"Currency",field:"cardCurrency",width:"10%"},{name:"Balance",field:"cardBalance",width:"10%"},{name:"Activation Key",field:"activationKey",width:"15%"},{name:"Request Date",field:"requestDate",width:"15%"},{name:"Activation Date",field:"activationDate",width:"15%"},{name:"Status",field:"cardStatus",width:"10%"},{name:"edit",displayName:"",pinnedLeft:!0,cellTemplate:'<a class="dg-action-link" title="Comment" ng-click="grid.appScope.addCardComment(row.entity.lastFourDigits)"><i class="glyphicon glyphicon-comment"></i></a> <a title="Reassign" ng-click="grid.appScope.reAssignCard(row.entity.cardId)" class="dg-action-link"><i class="glyphicon glyphicon-random"></i></a>',enableFiltering:!1,width:"5%"}]}},e.getAllPrepaidCards=function(t){l.getCustomerCardInfo(t).then(function(t){e.customer.carddevices.grid.data=[],t.customerCardList&&t.isSuccess&&(e.customer.carddevices.grid.data=t.customerCardList),i(function(){e.customer.carddevices.gridAPI.core.handleWindowResize()},10,500)})},e.addCardComment=function(t){e.customerCard={number:t,comment:""},e.modalInstance=c.open({templateUrl:"public/partials/member/customer.profile/forms/_fund.addcomment.modal.html",scope:e,size:"md",backdrop:"static"})},e.saveCardComment=function(){var t={eid:e.customer.profile.entityId,comment:e.customerCard.comment};l.addCustomerCardComment(t).then(function(t){e.customerCard={}}),e.closeModal()},e.reAssignCard=function(r){t.removeAlertNotification("cardReassignment"),e.customerCard={cardId:r},e.modalInstance=c.open({templateUrl:"public/partials/member/customer.profile/forms/_fund.reassigncard.modal.html",scope:e,size:"md",backdrop:"static"})},e.processCardReassignment=function(){var r=e.customerCard,i={cardId:r.cardId,oldCardNumber:r.oldCard,newCardNumber:r.newCard,issuerReference:r.bankAccount};l.processCardReassignment(i).then(function(r){if(r.isSuccess){var i="Successfully Reassigned Card.";t.throwAlertNotification("cardReassignmentSuccessCallback",i,"alert-success",!0),e.card.form={}}else t.throwAlertNotification("cardReassignment",r.error.msg,"alert-danger",!0)},function(e){var r="Server Error : Please contact administrator";t.throwAlertNotification("cardReassignment",r,"alert-danger",!0)})},e.initCardDevices=function(){var r=e.customer.profile.entityId;e.getAllPrepaidCards(r),t.removeAlertNotification("cardReassignmentSuccessCallback")},e.customer.comments={form:{},gridAPI:{},grid:{data:[],paginationPageSizes:[25,50,75,100],paginationPageSize:25,width:"*",enableFiltering:!0,flatEntityAccess:!0,showGridFooter:!0,data:[],gridReloadingMessage:"",isGridReloading:!1,showGridLoading:function(){},hideGridLoading:function(){},onRegisterApi:function(t){e.customer.comments.gridAPI=t}}},e.customer.comments.grid.columnDefs=[{name:"Comment ID",field:"commentId",width:"10%"},{name:"Comment",field:"comment",width:"45%"},{name:"Timestamp",field:"createDate",width:"25%"},{name:"Contributor",field:"contributorId",width:"20%"}],e.getAllComments=function(t){l.getComments({eid:t}).then(function(t){e.customer.comments.grid.data=[],t.commentList&&t.isSuccess&&(e.customer.comments.grid.data=t.commentList),i(function(){e.customer.comments.gridAPI.core.handleWindowResize()},10,500)})},e.addComment=function(){t.removeAlertNotification("addComment"),e.modalInstance=c.open({templateUrl:"public/partials/member/customer.profile/forms/_comments.addcomment.modal.html",scope:e,size:"md",backdrop:"static"})},e.saveComment=function(){var r=e.customer.comments.form,i={eid:e.customer.profile.entityId,comment:r.comment};l.addComment(i).then(function(r){if(r.isSuccess){var i="Successfully added comment";t.throwAlertNotification("addCommentSuccessCallback",i,"alert-success",!0),e.getAllComments(e.customer.profile.entityId),e.closeModal()}else t.throwAlertNotification("addComment",r.error.msg,"alert-danger",!0)},function(e){var r="Server Error : Please contact administrator";t.throwAlertNotification("addComment",r,"alert-danger",!0)})},e.initComments=function(){var r=e.customer.profile.entityId;e.getAllComments(r),t.removeAlertNotification("addCommentSuccessCallback")},e.customer.alerts={form:{},gridAPI:{},grid:{data:[],paginationPageSizes:[25,50,75,100],paginationPageSize:25,width:"*",enableFiltering:!0,flatEntityAccess:!0,showGridFooter:!0,data:[],gridReloadingMessage:"",isGridReloading:!1,showGridLoading:function(){},hideGridLoading:function(){},onRegisterApi:function(t){e.customer.alerts.gridAPI=t}}},e.customer.alerts.grid.columnDefs=[{name:"Alert ID",field:"alertId",width:"5%"},{name:"Date",field:"alertDate",width:"20%"},{name:"Category",field:"category",width:"17%"},{name:"Alert Text",field:"alertText",width:"20%"},{name:"Resolved By",field:"resolvedBy",width:"10%"},{name:"Resolved Date",field:"resolvedDate",width:"10%"},{name:"Resolution",field:"resolution",width:"15%"},{name:"edit",displayName:"",pinnedLeft:!0,cellTemplate:'<a class="dg-action-link" title="Resolve" ng-click="grid.appScope.resolveAlertModal(row.entity.alertId)"><i class="glyphicon glyphicon-ok"></i></a>',enableFiltering:!1,width:"3%"}],e.getAllAlerts=function(t){l.getCustomerAlerts({entityId:t}).then(function(t){e.customer.alerts.grid.data=[],t.adminAlertList&&t.isSuccess&&(e.customer.alerts.grid.data=t.adminAlertList),i(function(){e.customer.alerts.gridAPI.core.handleWindowResize()},10,500)})},e.resolveAlertModal=function(r){e.customer.alerts.form.alertId=r,t.removeAlertNotification("resolveAlert"),e.modalInstance=c.open({templateUrl:"public/partials/member/customer.profile/forms/_alert.resolve.modal.html",scope:e,size:"md",backdrop:"static"})},e.resolveAlert=function(){var r=e.customer.alerts.form,i={alertId:r.alertId,resolution:r.resolution};l.resolveAlert(i).then(function(i){if(i.isSuccess){var o="Successfully resolve alert #"+r.alertId;t.throwAlertNotification("resolveAlertSuccessCallback",o,"alert-success",!0),e.getAllAlerts(e.customer.profile.entityId),e.closeModal()}else t.throwAlertNotification("resolveAlert",i.error.msg,"alert-danger",!0)},function(e){var r="Server Error : Please contact administrator";t.throwAlertNotification("resolveAlert",r,"alert-danger",!0)})},e.initAlerts=function(){var r=e.customer.profile.entityId;e.getAllAlerts(r),t.removeAlertNotification("resolveAlertSuccessCallback")},e.customer.activitylog={gridAPI:{},grid:{data:[],paginationPageSizes:[25,50,75,100],paginationPageSize:25,width:"*",enableFiltering:!0,flatEntityAccess:!0,showGridFooter:!0,data:[],gridReloadingMessage:"",isGridReloading:!1,showGridLoading:function(){},hideGridLoading:function(){},onRegisterApi:function(t){e.customer.activitylog.gridAPI=t}}},e.customer.activitylog.grid.columnDefs=[{name:"Activity ID",field:"alertId",width:"10%"},{name:"Activity Date",field:"alertDate",width:"20%"},{name:"Category",field:"category",width:"20%"},{name:"Description",field:"alertText",width:"40%"},{name:"IP Address",field:"resolvedBy",width:"10%"}],e.getCustomerActivityLog=function(t){l.getCustomerActivityLog({eid:t}).then(function(t){e.customer.activitylog.grid.data=[],t.adminAlertList&&t.isSuccess&&(e.customer.activitylog.grid.data=t.adminAlertList),i(function(){e.customer.activitylog.gridAPI.core.handleWindowResize()},10,500)})},e.initActivityLog=function(){var t=e.customer.profile.entityId;e.getCustomerActivityLog(t)}}]),appControllers.controller("CustomerSearchCtrl",["$scope","$rootScope","$location","$filter","$stateParams","$timeout","CustomerService","FeesService","uiGridConstants",function(e,t,r,i,o,a,n,s,c){var l=r.path().split("/")[2];t.sidenav={pageTitle:"Company Center",parent:"member",selected:l,isMembershibTabOpen:!0,style:{}},a(function(){t.sidenav.style.customersearch={background:"#39a085"}},0),e.filter={signUpDate:{},signUpHost:{}},e.fSignupHost=[],e.fDateObj=[{name:"Last 24hrs",day:"1"},{name:"Last 3 days",day:"3"},{name:"Last 10 days",day:"10"},{name:"Last Month",day:"31"},{name:"Last 6 Months",day:"186"},{name:"Remove Filter",day:"none"}],e.customer={gridApi:{},searchEmail:"",list:[],dataGridOptions:{paginationPageSizes:[25,50,75,100],paginationPageSize:25,width:"*",enableHorizontalScrollbar:!0,enableVerticalScrollbar:!0,enableFiltering:!0,flatEntityAccess:!0,showGridFooter:!0,fastWatch:!0,data:[],gridReloadingMessage:"",isGridReloading:!1,showGridLoading:function(){e.customer.dataGridOptions.isGridReloading=!0,e.customer.dataGridOptions.gridReloadingMessage="Loading all transaction records..."},hideGridLoading:function(){e.customer.dataGridOptions.isGridReloading=!1,e.customer.dataGridOptions.gridReloadingMessage=""},onRegisterApi:function(t){e.customer.gridApi=t}}},e.customer.dataGridOptions.columnDefs=[{name:"edit",displayName:"",pinnedLeft:!0,cellTemplate:'<a class="dg-action-link" ui-sref="customerprofile({ profileId: row.entity.entityId })">Edit</a>',enableFiltering:!1,width:"3%"},{name:"Customer ID",field:"entityId",width:"12%",pinnedLeft:!0},{name:"Email Address",field:"emailAddress",width:"15%"},{name:"First Name",field:"firstName",width:"15%"},{name:"Last Name",field:"lastName",width:"15%"},{name:"Mobile #",field:"mobilePhone",width:"10%"},{name:"Home #",field:"homePhone",width:"10%"},{name:"Account Status",field:"status",width:"10%"},{name:"ID Uploaded",field:"",width:"7%"},{name:"Extended Profile",field:"",width:"15%"},{name:"Profile Status",field:"verificationStatus",width:"8%"},{name:"Signup Date",field:"signupDate",width:"15%"},{name:"Activation Date",field:"",width:"15%"},{name:"Host",field:"signupHost",width:"15%"},{name:"Existing Loyalty",field:"",width:"15%"},{name:"Tier",field:"tierId",width:"5%"}],e.exportCustomerData=function(t,r){var i=angular.element(document.querySelectorAll(".custom-csv-link-location"));e.customer.gridApi.exporter.csvExport(t,r,i)},e.getReferenceRuleHost=function(){s.getReferenceDataList("RULEHOST").then(function(t){t.isSuccess&&(angular.forEach(t.refDataList,function(t){e.fSignupHost.push(t)}),e.fSignupHost.push({refType:"none",refCode:"none",refValue:"Remove Filter"}))})},e.getCustomerListBySignUpTime=function(){var t=e.filter.signUpDate.selected.day;e.customer.dataGridOptions.data=[],"none"!==t?(e.customer.dataGridOptions.showGridLoading(),n.getCustomerListBySignUpTime(t).then(function(t){t.isSuccess&&t.customerList&&(e.customer.list=t.customerList,e.customer.dataGridOptions.data=t.customerList)}),e.customer.dataGridOptions.hideGridLoading()):(e.filter.signUpDate={},e.getCustomerList())},e.getCustomerListByHost=function(){var t=e.filter.signUpHost.selected.refValue,r=e.filter.signUpHost.selected.refCode;e.customer.dataGridOptions.data=[],"none"!==r?(e.customer.dataGridOptions.showGridLoading(),n.getCustomerListByHost(t).then(function(t){t.isSuccess&&t.customerList&&(e.customer.list=t.customerList,e.customer.dataGridOptions.data=t.customerList),e.customer.dataGridOptions.hideGridLoading()})):(e.filter.signUpHost={},e.getCustomerList());
},e.getCustomerList=function(){e.customer.dataGridOptions.data=[],e.customer.dataGridOptions.showGridLoading(),n.getCustomerList(e.customer.searchEmail).then(function(t){t.isSuccess&&t.customerList&&(e.customer.list=t.customerList,e.customer.dataGridOptions.data=t.customerList),e.customer.dataGridOptions.hideGridLoading()})},e.getReferenceRuleHost(),e.getCustomerList()}]);