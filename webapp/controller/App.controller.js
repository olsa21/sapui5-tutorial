sap.ui.define([
    "sap/ui/core/mvc/Controller",
], function (Controller) {
    "use strict";
    return Controller.extend("sap.ui.demo.walkthrough.controller.App", {
        onShowHello: function () {
            alert("Hello World!");
            //sap.ui.getCore().byId("button2").setText("New");

        },
        onShowsecondButton: function () {
            alert("Second Button");
            
        }
    });
});