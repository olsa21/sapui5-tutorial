sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History",
	"sap/m/MessageToast"
], function (Controller, History, MessageToast) {
	"use strict";
	return Controller.extend("sap.ui.demo.walkthrough.controller.Detail", {
		onInit: function () {
			var oRouter = this.getOwnerComponent().getRouter();
			oRouter.getRoute("detail").attachPatternMatched(this._onObjectMatched, this);
		},
		//Callback-Funktion
		_onObjectMatched: function (oEvent) {
			this.byId("rating").reset();
			//bindElement erzeugt Bindungskontext und erhält den Modellnamen sowie den Pfad zu einem Element 
			this.getView().bindElement({
				path: "/" + window.decodeURIComponent(oEvent.getParameter("arguments").invoicePath),
				model: "invoice"
			});
		},
		onNavBack: function () {
			var oHistory = History.getInstance();
			//getPreviousHash() : string|undefined
			var sPreviousHash = oHistory.getPreviousHash();

			if(sPreviousHash !== undefined){
				//Gehe ein Schritt in der Historie zurück
				window.history.go(-1);
			}else{
				//direkt auf die overview Seite gehen
				var oRouter = this.getOwnerComponent().getRouter();
				oRouter.navTo("overview", {}, true);
			}
		},

		onRatingChange: function (oEvent) {
			var fValue = oEvent.getParameter("value");
			var oResourceBundle = this.getView().getModel("i18n").getResourceBundle();

			MessageToast.show(oResourceBundle.getText("ratingConfirmation", [fValue]));
		}
	});
});