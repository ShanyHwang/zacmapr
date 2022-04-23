sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageBox",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
	'sap/ui/core/Fragment',
	"sap/viz/ui5/data/FlattenedDataset",
    "sap/viz/ui5/controls/common/feeds/FeedItem",
	'sap/viz/ui5/format/ChartFormatter',
	'sap/viz/ui5/api/env/Format',
	'./InitPage'
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel, MessageBox, Filter, FilterOperator,
		 Fragment, FlattenedDataset, FeedItem, ChartFormatter, Format, InitPageUtil) {
        "use strict";

        return Controller.extend("iitp.zacmapr.controller.Master", {
            onInit: function () {

				Format.numericFormatter(ChartFormatter.getInstance());
				var formatPattern = ChartFormatter.DefaultPattern;

				let oPopOver = this.getView().byId("idPopOver1");
				let oVizFrame = this.getView().byId("vizFrame1");
				oPopOver.connect(oVizFrame.getVizUid());
				oPopOver.setFormatString(formatPattern.STANDARDFLOAT);
				InitPageUtil.initPageSettings(this.getView());
				
            },
			_validateInput: function (oInput) {
				var sValueState = "None";
				var bValidationError = false;
				// var oBinding = oInput.getBinding("value");
	

				if(oInput.getValue() === ""){
					sValueState = "Error";
					bValidationError = true;	
				}

				// try {
				// 	// oBinding.getType().validateValue(oInput.getValue());
				// 	if(oInput.getValue() )
				// } catch (oException) {
				// 	sValueState = "Error";
				// 	bValidationError = true;
				// }
	
				oInput.setValueState(sValueState);
	
				return bValidationError;
			},

			// validateValue: function (oValue) {
			// 	// The following Regex is only used for demonstration purposes and does not cover all variations of email addresses.
			// 	// It's always better to validate an address by simply sending an e-mail to it.
			// 	var rexMail = /^[0-9]$/g;
			// 	if (!oValue.match(rexMail)) {
			// 		throw new ValidateException("'" + oValue + "' is not a number");
			// 	}
			// },

			// 조회
			onSearch: function(oEvent){
				let oModel = this.getView().getModel("main");
				let oEdit = oModel.setProperty('/editMode', false);
				let oFilter = oModel.getProperty('/filter');
				let mFilter = [];
				// let oTable = this.byId("idTable");
                // let oBinding = oTable.getBinding("items");
                // oBinding.filter(mFilter);
				let oModelS = this.getOwnerComponent().getModel();
				
				let oView = this.getView(),
				aInputs = [
				oView.byId("fbukrs"),
				oView.byId("fgjahr")
				],
					bValidationError = false;

				aInputs.forEach(function (oInput) {
					bValidationError = this._validateInput(oInput) || bValidationError;
				}, this); 

				if (!bValidationError) {
				
			

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



				oModelS.read('/ES_MONPRSet', {
					filters : mFilter,
					success : function(oEvent){
						if(oEvent.results.length > 0){
							oModel.setProperty('/it_data', oEvent.results);

							let it_data = oModel.getProperty('/it_data');
							// for(let i=0; i<it_data.length; i++){
							// 	it_data[i].menge = Math.round(it_data[0].menge);
								
							// }
						}
                        
					},
					error : function(oEvent){
						MessageBox.show('조회 실패');
					}
				})

				// oModelS.read('/ES_MAPRSet', {
				// 	filters : mFilter,
				// 	success : function(oEvent){
				// 		if(oEvent.results.length > 0){
				// 			oModel.setProperty('/it_data2', oEvent.results);
				// 			let it_data2 = oModel.getProperty('/it_data2');
				// 			for(let i=0; i<it_data2.length; i++){
				// 				it_data2[i].spmon = it_data2[i].spmon.slice(0,4) + '.' + it_data2[i].spmon.slice(4,6);
				// 			}
				// 		}
                        
				// 	},
				// 	error : function(oEvent){
				// 		MessageBox.show('조회 실패');
				// 	}
					
				// })


			} else {
				MessageBox.alert("검색조건을 입력해주세요.");
			}


			},
			handlePopoverPress: function (oEvent) {
				var oButton = oEvent.getSource(),
					oView = this.getView();
	
				// create popover
				if (!this._pPopover) {
					this._pPopover = Fragment.load({
						id: oView.getId(),
						name: "sap.m.sample.Popover.view.Popover",
						controller: this
					}).then(function(oPopover) {
						oView.addDependent(oPopover);
						oPopover.bindElement("/ProductCollection/0");
						return oPopover;
					});
				}
				this._pPopover.then(function(oPopover) {
					oPopover.openBy(oButton);
				});
			},

			onSelect : function(oEvent){
				// let oCompo = this.getOwnerComponent().getRouter();
				// let path = oEvent.getSource().getBindingContextPath().substr(9);
				// oCompo.navTo("detail",{
				// 	num : window.encodeURIComponent(path)
					
				// });
				let oModel = this.getView().getModel("main");
				// oModel.getProperty('/filter/matnr') = 
				let oEdit = oModel.setProperty('/editMode', false);
				let oItem = oEvent.getSource();
				let oBindingContext = oItem.getBindingContext("main").getPath();
				let oData = oModel.getProperty(oBindingContext);
				let oFilter = oModel.getProperty('/filter');
				// let oFilter = oModel.getProperty('/filter2');

				oFilter.matnr = oData.matnr;
				let mFilter = [];
				// let oTable = this.byId("idTable");
                // let oBinding = oTable.getBinding("items");
                // oBinding.filter(mFilter);
				
				let oModelS = this.getOwnerComponent().getModel();
				
				let oView = this.getView(),
				aInputs = [
				oView.byId("fbukrs"),
				oView.byId("fgjahr")
				],
					bValidationError = false;

				aInputs.forEach(function (oInput) {
					bValidationError = this._validateInput(oInput) || bValidationError;
				}, this); 

				if (!bValidationError) {
				
			

				for(let sKey in oFilter){
					let oVal = oFilter[sKey];
					if(oVal) {
						mFilter.push(new Filter({
							path: sKey,
							operator: FilterOperator.Contains,
							value1: oVal,
						}));
					}
				}}
				oModelS.read('/ES_MAPRSet', {
					filters : mFilter,
					success : function(oEvent){
						if(oEvent.results.length > 0){
							oModel.setProperty('/it_data2', oEvent.results);
							let it_data2 = oModel.getProperty('/it_data2');
							for(let i=0; i<it_data2.length; i++){
								it_data2[i].spmon = it_data2[i].spmon.slice(0,4) + '.' + it_data2[i].spmon.slice(4,6);
							}
						}
                        
					},
					error : function(oEvent){
						MessageBox.show('조회 실패');
					}
					
				})
					
			},
			onValueHelpRequestForBukrs: function (oEvent) {
				this._bukrs = oEvent.getSource().getId();
				if(!this._oValueHelpDialog){
				this._oValueHelpDialog = sap.ui.xmlfragment(
				"iitp.zacmapr.view.vhBuk",
				this
				);
				this.getView().addDependent(this._oValueHelpDialog);
				}
				this._oValueHelpDialog.open();
			},
			onValueHelpRequestForGjahr: function (oEvent) {
				this._gjahr = oEvent.getSource().getId();
				if(!this._oValueHelpDialog1){
				this._oValueHelpDialog1 = sap.ui.xmlfragment(
				"iitp.zacmapr.view.vhGja",
				this
				);
				this.getView().addDependent(this._oValueHelpDialog1);
				}
				this._oValueHelpDialog1.open();
			},
			onValueHelpClose: function(oEvent){
				let oSelectedItem = oEvent.getParameter("selectedItem");
				if(oSelectedItem){
				let oInput = this.getView().byId(this._bukrs);
				oInput.setValue(oSelectedItem.getTitle());
				}
			},
			onValueHelpClose1: function(oEvent){
				let oSelectedItem = oEvent.getParameter("selectedItem");
				if(oSelectedItem){
				let oInput = this.getView().byId(this._gjahr);
				oInput.setValue(oSelectedItem.getTitle());
				}
			},
			onValueHelpSearch: function(oEvent){
				    let sValue = oEvent.getParameter("value");
				
				    let oFilter = Filter(
				        "bukrs",
				        "EQ",
				        sValue
				    );
				    oEvent.getSource().getBinding("items").filter(oFilter);
			},
			onValueHelpSearch1: function(oEvent){
				let sValue = oEvent.getParameter("value");
			
				let oFilter = Filter(
					"gjahr",
					"EQ",
					sValue
				);
				oEvent.getSource().getBinding("items").filter(oFilter);
			}
				
        });
    });
