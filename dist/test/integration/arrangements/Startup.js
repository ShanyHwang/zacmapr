sap.ui.define(["sap/ui/test/Opa5","iitp/zacmapr/localService/mockserver"],function(t,a){"use strict";return t.extend("iitp.zacmapr.test.integration.arrangements.Startup",{iStartMyApp:function(t){var i=t||{};i.delay=i.delay||50;var e=a.init(i);this.iWaitForPromise(e);this.iStartMyUIComponent({componentConfig:{name:"iitp.zacmapr",async:true},hash:i.hash,autoWait:i.autoWait})}})});