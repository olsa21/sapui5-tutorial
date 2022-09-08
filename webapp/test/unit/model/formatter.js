/*global QUnit*/

sap.ui.define([
    "sap/ui/demo/walkthrough/model/formatter",
    "sap/ui/model/resource/ResourceModel"
], function (formatter, ResourceModel) {
    "use strict";

    QUnit.module("Formatting functions", {
        beforeEach: function () {
            //Sprache ermitteln
            var sLocale = sap.ui.getCore().getConfiguration().getLanguage();

            (sLocale === "de" || sLocale === "en" || sLocale === "en_US") ? sLocale = "_" + sLocale : sLocale = ""

            this._oResourceModel = new ResourceModel({
                bundleUrl: sap.ui.require.toUrl("sap/ui/demo/walkthrough") + "/i18n/i18n" + sLocale + ".properties"
            });
        },
        afterEach: function () {
            this._oResourceModel.destroy();
        }
    });


    QUnit.test("Should return the translated texts", function (assert) {

        // Arrange
        // this.stub() does not support chaining and always returns the right data
        // even if a wrong or empty parameter is passed.
        // Aufruf vom echtem Formatter: this.getView().getModel("i18n").getResourceBundle();
        // gibt etwas zurück was getView() hat was getModel() hat was dann das erstellte ResourceBundle zurückgibt.
        var oModel = this.stub();
        oModel.withArgs("i18n").returns(this._oResourceModel);
        var oViewStub = {
            getModel: oModel
        };
        var oControllerStub = {
            getView: this.stub().returns(oViewStub)
        };

        // System under test, Formatter wird an View gebunden
        var fnIsolatedFormatter = formatter.statusText.bind(oControllerStub);

        //Get Resource
        var resourceBundle = this._oResourceModel.getResourceBundle();
        console.log("lang_code=" + resourceBundle.getText("lang_code"));

        // Assert
        assert.strictEqual(fnIsolatedFormatter("A"), resourceBundle.getText("invoiceStatusA"), "The long text for status A is correct");

        assert.strictEqual(fnIsolatedFormatter("B"), resourceBundle.getText("invoiceStatusB"), "The long text for status B is correct");

        assert.strictEqual(fnIsolatedFormatter("C"), resourceBundle.getText("invoiceStatusC"), "The long text for status C is correct");

        assert.strictEqual(fnIsolatedFormatter("Foo"), "Foo", "The long text for status Foo is correct");
    });

});