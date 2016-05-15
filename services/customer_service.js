appServices.service('CustomerService', ['$rootScope','Restangular',
	function($rootScope, Restangular){
	   var self = this;

		 var urlEncodedHeaders = {
        'Content-Type': "application/x-www-form-urlencoded; charset=UTF-8",
     };

		 self.getCustomerListBySignUpTime = function(day) {
				return Restangular.all('customerFilterBySignupTime.sctl').customPOST('','',{day:day}, urlEncodedHeaders);
		 };

		 self.getCustomerList = function(q) {
			 return Restangular.all('customerSearchByEmailOrNameOrPhone.sctl').customPOST('','',{emailAddress:q}, urlEncodedHeaders);
		 };

		 self.getCustomerListByHost = function(host) {
			 	return Restangular.all('customerSearchBySignupHost.sctl').customPOST('','',{itemsPerPage:100,limit:100,offset:0,signupHost:host}, urlEncodedHeaders);
		 };

		 self.getProfile = function(profileId) {
			  return Restangular.all('getCustomerProfile.sctl').customPOST('','',{eid:profileId}, urlEncodedHeaders);
		 };

		 self.updateCustomerHost = function(obj) {
			 return Restangular.all('updateCustomerHost.sctl').customPOST('','',obj, urlEncodedHeaders);
		 };

		 self.updateCustomerGeneralInfo = function(obj) {
			 return Restangular.all('updateCustomerGeneralInfo.sctl').customPOST('','',obj, urlEncodedHeaders);
		 }

		 self.updateCustomerExtendedInfo = function(obj) {
			 return Restangular.all('updateCustomerExtendedInfo.sctl').customPOST('','',obj, urlEncodedHeaders);
		 }

		 self.updateCustomerTierInfo = function(obj) {
			 return Restangular.all('updateCustomerTierInfo.sctl').customPOST('','',obj, urlEncodedHeaders);
		 }

		 self.updateBaseCurrency = function(obj) {
			 return Restangular.all('updateBaseCurrency.sctl').customPOST('','',obj, urlEncodedHeaders);
		 }

		 self.getValidCustomerHosts = function() {
			 return Restangular.all('getValidHosts.sctl').customPOST('','',{}, urlEncodedHeaders);
		 }

		 self.getCustomerCardInfo = function(eid) {
			 return Restangular.all('getCardInfo.sctl').customPOST('','',{eid:eid}, urlEncodedHeaders);
		 }

		 self.addCustomerCardComment = function(obj) {
			 return Restangular.all('addComment.sctl').customPOST('','',obj, urlEncodedHeaders);
		 }

		 self.getCustomerCardRequestList = function() {
			 return Restangular.all('getCardRequests.sctl').customPOST('','',{}, urlEncodedHeaders);
		 }

		 self.processCardAssignment = function(obj) {
			 return Restangular.all('processCardAssignment.sctl').customPOST('','',obj, urlEncodedHeaders);
		 }

		 self.cancelCardRequest = function(obj) {
			 return Restangular.all('cancelCardRequest.sctl').customPOST('','',obj, urlEncodedHeaders);
		 }

		 self.createAssignCard = function(obj) {
			 return Restangular.all('createAndAssignCard.sctl').customPOST('','',obj, urlEncodedHeaders);
		 }

		 self.assignPosDevice = function(obj) {
			 return Restangular.all('assignPosDevice.sctl').customPOST('','',obj, urlEncodedHeaders);
		 }

		 self.getOpenPosDeviceRequests = function() {
			 return Restangular.all('getOpenPosDeviceRequests.sctl').customPOST('','',{}, urlEncodedHeaders);
		 }

		 self.getPosDeviceRequest = function(obj) {
			 return Restangular.all('getPosDeviceRequest.sctl').customPOST('','',obj, urlEncodedHeaders);
		 }

		 self.addPrivateCard = function(obj) {
			 return Restangular.all('addPrivCard.sctl').customPOST('','',obj, urlEncodedHeaders);
		 }

		 self.fillPosDeviceRequest = function(obj) {
			 return Restangular.all('fillPosDeviceRequest.sctl').customPOST('','',obj, urlEncodedHeaders);
		 }

		 self.processCardReassignment = function(obj) {
			 return Restangular.all('processCardReassignment.sctl').customPOST('','',obj, urlEncodedHeaders);
		 }

		 self.getComments = function(obj) {
			 return Restangular.all('getComments.sctl').customPOST('','',obj, urlEncodedHeaders);
		 }

		 self.addComment = function(obj) {
			 return Restangular.all('addComment.sctl').customPOST('','',obj, urlEncodedHeaders);
		 }

		 self.getCustomerAlerts = function(obj) {
			 return Restangular.all('getCustomerAlerts.sctl').customPOST('','',obj, urlEncodedHeaders);
		 }

		 self.resolveAlert = function(obj) {
			 return Restangular.all('resolveAlert.sctl').customPOST('','',obj, urlEncodedHeaders);
		 };

		 self.getAllPendingSignUps = function(obj) {
			 return Restangular.all('getPendingSignups.sctl').customPOST('','',obj, urlEncodedHeaders);
		 };

		 self.resendActivationKey = function(obj) {
			 return Restangular.all('resendActivationKey.sctl').customPOST('','',obj, urlEncodedHeaders);
		 };

		 self.sendSignupReminder = function(obj) {
			 return Restangular.all('sendSignupReminder.sctl').customPOST('','',obj, urlEncodedHeaders);
		 };

		 self.deletePendingSignUp = function(obj) {
			 return Restangular.all('deletePendingSignup.sctl').customPOST('','',obj, urlEncodedHeaders);
		 };

		 self.getOutstandingAlerts = function() {
			 return Restangular.all('getOutstandingAlerts.sctl').customPOST('','',{}, urlEncodedHeaders);
		 };

		 self.initTxnGeneral = function() {
			 return Restangular.all('initTxnGeneral.sctl').customPOST('','',{}, urlEncodedHeaders);
		 };

		 self.submitTxnGeneral = function(obj) {
			 return Restangular.all('submitTxnGeneral.sctl').customPOST('','',obj, urlEncodedHeaders);
		 };

		 self.confirmTxnGeneral = function(obj) {
			 return Restangular.all('confirmTxnGeneral.sctl').customPOST('','',obj, urlEncodedHeaders);
		 };

		 self.getPromoAuditList = function(obj) {
			 return Restangular.all('getPromoAuditList.sctl').customPOST('','',obj, urlEncodedHeaders);
		 };

		 self.approvePromoAudit = function(obj) {
			 return Restangular.all('approvePromoAudit.sctl').customPOST('','',obj, urlEncodedHeaders);
		 };

		 self.rejectPromoAudit = function(obj) {
			 return Restangular.all('rejectPromoAudit.sctl').customPOST('','',obj, urlEncodedHeaders);
		 };

		 self.getCustomerPoids = function(obj) {
			 return Restangular.all('getCustomerPoids.sctl').customPOST('','',obj, urlEncodedHeaders);
		 };

		 self.approvePoid = function(obj) {
			 return Restangular.all('approvePoid.sctl').customPOST('','',obj, urlEncodedHeaders);
		 };

		 self.deleteCustomerPoid = function(obj) {
			 return Restangular.all('deleteCustomerPoid.sctl').customPOST('','',obj, urlEncodedHeaders);
		 };

		 self.getCustomerActivityLog = function(obj) {
			 return Restangular.all('getCustomerActivityLog.sctl').customPOST('','',obj, urlEncodedHeaders);
		 };

		 self.sendCustomerEmail = function(obj) {
			 return Restangular.all('sendCustomerEmail.sctl').customPOST('','',obj, urlEncodedHeaders);
		 };

		 self.changeCustomerPin = function(obj) {
			 return Restangular.all('changeCustomerPin.sctl').customPOST('','',obj, urlEncodedHeaders);
		 };

		 self.updateCustomerStatus = function(obj) {
			 return Restangular.all('updateCustomerStatus.sctl').customPOST('','',obj, urlEncodedHeaders);
		 };

}])
