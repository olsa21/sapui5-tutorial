sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"../model/formatter",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], function (Controller, JSONModel, formatter, Filter, FilterOperator) {
	"use strict";

	return Controller.extend("sap.ui.demo.walkthrough.controller.InvoiceList", {
        formatter: formatter,
		onInit : function () {
			var oViewModel = new JSONModel({
				currency: "EUR"
			});
			this.getView().setModel(oViewModel, "view");
		},
		onFilterInvoices : function (oEvent) {
			// build filter array
			var aFilter = [];
			var sQuery = oEvent.getParameter("query");
			console.log("HALLO=>"+oEvent)
			if (sQuery) {
				aFilter.push(new Filter("ProductName", FilterOperator.Contains, sQuery));
			}

			// filter binding
			var oList = this.byId("invoiceList");
			var oBinding = oList.getBinding("items");
			oBinding.filter(aFilter);
		},
		onOrder: function(sButtonText){
			switch(sButtonText){
				case 'byName': var sSortKey = "ProductName";
				case 'byQuantity': var sSortKey = "Quantity";
			}

			var oList=this.byId("invoiceList"), 
            oBinding = oList.getBinding("items");
            
            this.bDescending= !this.bDescending; //switches the boolean back and forth from ascending to descending
            var bGroup = false;

            oBinding.sort(new sap.ui.model.Sorter(sSortKey, this.bDescending, bGroup));
		},
		onPress: function (oEvent) {
			var oRouter = this.getOwnerComponent().getRouter();
			oRouter.navTo("detail");
		}
	});
});