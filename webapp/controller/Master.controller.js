sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageBox",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel, MessageBox, Filter, FilterOperator) {
        "use strict";

        return Controller.extend("iitp.zacmapr.controller.Master", {
            onInit: function () {

            },

			// 조회
			onSearch: function(oEvent){
				let oModel = this.getView().getModel("main");
				let oEdit = oModel.setProperty('/editMode', false);
						
				let oFilter = oModel.getProperty('/filter');

				let mFilter = [];
				for(let sKey in oFilter){
					let oVal = oFilter[sKey];
					if(oVal) {
						mFilter.push(new Filter({
							path: sKey,
							operator: FilterOperator.Contains,
							value1: oVal,
						}));
					}
				}

                // let oTable = this.byId("idTable");
                // let oBinding = oTable.getBinding("items");
                // oBinding.filter(mFilter);

				let oModelS = this.getOwnerComponent().getModel();
				oModelS.read('/ES_TEMP_DSet', {
					filters : mFilter,
					success : function(oEvent){
						if(oEvent.results.length > 0){
							oModel.setProperty('/it_data', oEvent.results);
						}
                        
					},
					error : function(oEvent){
						MessageBox.show('조회 실패');
					}
				})
			},

			onSelect : function(oEvent){
				let oCompo = this.getOwnerComponent().getRouter();
				let path = oEvent.getSource().getBindingContextPath().substr(9);
				oCompo.navTo("detail",{
					num : window.encodeURIComponent(path)
				});
			},

        });
    });
