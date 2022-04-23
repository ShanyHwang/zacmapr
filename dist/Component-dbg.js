sap.ui.define([
        "sap/ui/core/UIComponent",
        "sap/ui/Device",
        "iitp/zacmapr/model/models",
        "sap/ui/model/json/JSONModel"
    ],
    function (UIComponent, Device, models, JSONModel) {
        "use strict";

        return UIComponent.extend("iitp.zacmapr.Component", {
            metadata: {
                manifest: "json"
            },

            /**
             * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
             * @public
             * @override
             */
            init: function () {
                // call the base component's init function
                UIComponent.prototype.init.apply(this, arguments);

                // enable routing
                this.getRouter().initialize();

                // set the device model
                this.setModel(models.createDeviceModel(), "device");

                let oModel = new JSONModel({
                    create : {
                        spmon : '',
                        matnr : ''		
                    }
                    ,filter : {
                        spmon : '',
                        matnr : ''
                    },
                    it_data  : [],
                    it_data2 : [],
                    editMode : false
                });

                this.setModel(oModel, "main");

            }
        });
    }
);