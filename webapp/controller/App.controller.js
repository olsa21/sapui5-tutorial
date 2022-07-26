sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
], function (Controller, MessageToast) {
    "use strict";
    return Controller.extend("sap.ui.demo.walkthrough.controller.App", {
        onShowHello: function () {
            MessageToast.show("Hello World",{
                duration: 50,
            });
            //alert("Hello World!");
            //sap.ui.getCore().byId("button2").setText("New");

        },
        onShowsecondButton: function () {
            alert("Second Button");
            
        }
    });
});