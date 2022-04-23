sap.ui.define(["sap/base/util/ObjectPath","sap/ushell/services/Container"],function(e){"use strict";e.set(["sap-ushell-config"],{defaultRenderer:"fiori2",bootstrapPlugins:{RuntimeAuthoringPlugin:{component:"sap.ushell.plugins.rta",config:{validateAppVersion:false}},PersonalizePlugin:{component:"sap.ushell.plugins.rta-personalize",config:{validateAppVersion:false}}},renderers:{fiori2:{componentData:{config:{enableSearch:false,rootIntent:"Shell-home"}}}},services:{LaunchPage:{adapter:{config:{groups:[{tiles:[{tileType:"sap.ushell.ui.tile.StaticTile",properties:{title:"App Title",targetURL:"#iitpzacmapr-display"}}]}]}}},ClientSideTargetResolution:{adapter:{config:{inbounds:{"iitpzacmapr-display":{semanticObject:"iitpzacmapr",action:"display",description:"A Fiori application.",title:"App Title",signature:{parameters:{}},resolutionResult:{applicationType:"SAPUI5",additionalInformation:"SAPUI5.Component=iitp.zacmapr",url:sap.ui.require.toUrl("iitp/zacmapr")}}}}}},NavTargetResolution:{config:{enableClientSideTargetResolution:true}}}});var i={init:function(){if(!this._oBootstrapFinished){this._oBootstrapFinished=sap.ushell.bootstrap("local");this._oBootstrapFinished.then(function(){sap.ushell.Container.createRenderer().placeAt("content")})}return this._oBootstrapFinished}};return i});