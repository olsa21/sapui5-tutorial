sap.ui.define([
    'sap/ui/core/Control',
    'sap/ui/core/Icon',
    "sap/m/Label"
], function(Control, Icon, Text) {
    'use strict';
    return Control.extend("sap.ui.demo.walkthrough.control.TextWithIcon", {
        metadata : {
            properties : {
                text: {type : "string", defaultValue : "Add to CART"},
                iconName: {type : "string", defaultValue : "cart"},
            },
            aggregations : {
                _icon : {type : "sap.ui.core.Icon", multiple: false, visibility : "visible"},
                _label : {type : "sap.m.Label", multiple: false, visibility : "visible"}
            },
            events : {}
        },
        init : function () {
            this.setAggregation("_icon", new Icon({
                src: "sap-icon://" + this.getIconName(),
                size: "1rem"
            }));
            this.setAggregation("_label", new Text({
                text: this.getText()
            }).addStyleClass("sapUiTinyMarginBegin"));

            //this.getAggregation("_icon").setIcon
            //Sthis.getAggregation("_label").setText(this.getText());
            console.log(this.getText());
            //Set in xml given arguments
        },
		renderer : function (oRm, oControl) {
			oRm.openStart("div", oControl);
			oRm.class("textWithIcon");
			oRm.openEnd();
			oRm.renderControl(oControl.getAggregation("_icon").setSrc("sap-icon://" + oControl.getIconName()));
			oRm.renderControl(oControl.getAggregation("_label").setText(oControl.getText()));
			oRm.close("div");
            console.log("=>"+oControl.getIconName());
		}

    });
});