!function a(b,c,d){function e(g,h){if(!c[g]){if(!b[g]){var i="function"==typeof require&&require;if(!h&&i)return i(g,!0);if(f)return f(g,!0);throw new Error("Cannot find module '"+g+"'")}var j=c[g]={exports:{}};b[g][0].call(j.exports,function(a){var c=b[g][1][a];return e(c?c:a)},j,j.exports,a,b,c,d)}return c[g].exports}for(var f="function"==typeof require&&require,g=0;g<d.length;g++)e(d[g]);return e}({1:[function(a){var b,c;a("./index"),b=function(){function a(){$(document).ready(function(){return angular.bootstrap(document,["quickstartApp"],{strictDi:!0})})}return a.prototype.run=function(){return["$rootScope","$state","$httpBackend",function(a,b){return a.$state=b,a.$on("$stateChangeStart",function(){return function(){}}(this)),a.$on("$stateChangeError",function(a,b,c,d,e){return console.error(a,b,c,d,e)})}]},a.prototype.config=function(){return["$urlRouterProvider","$provide",function(a,b){return a.otherwise("/"),b.decorator("$exceptionHandler",["$delegate",function(a){return function(b,c){var d;return a(b,c),d={exception:b,cause:c},console.error("$exceptionHandler::ERROR:",b.msg,d)}}])}]},a}(),c=new b,angular.module("quickstartApp",["application"]).config(c.config()).run(c.run())},{"./index":20}],2:[function(){var a;a=function(){function a(a){this.$scope=a}return a.$inject=["$scope"],a}(),angular.module("quickstartApp.state.controllers.StateController",[]).controller("StateController",a)},{}],3:[function(a){a("./controllers/state_controller"),angular.module("quickstartApp.state",["quickstartApp.state.controllers.StateController"]).config(["$stateProvider",function(a){return a.state("myState",{url:"/",templateUrl:"app/state/templates/layout.html",controller:"StateController"})}])},{"./controllers/state_controller":2}],4:[function(){var a,b=function(a,b){return function(){return a.apply(b,arguments)}};a=function(){function a(a,c,d,e,f,g){this._scope=a,this._CanvasService=c,this._SpotService=d,this._LiveCanvasService=e,this._window=g,this._addColumn=b(this._addColumn,this),this._addRow=b(this._addRow,this),this._getSpots=b(this._getSpots,this),this._handleResize=b(this._handleResize,this),this._handleUnlockSpot=b(this._handleUnlockSpot,this),this._handleReserveSpot=b(this._handleReserveSpot,this),this._handleDrawingSave=b(this._handleDrawingSave,this),this._scope.stop=void 0,this._scope.$on("canvas:resize",this._handleResize),this._scope.$on("spot:lock",this._handleReserveSpot),this._scope.$on("spot:unlock",this._handleUnlockSpot),this._scope.$on("spot:save",this._handleDrawingSave),this._LiveCanvasService.on("spot.updated",function(a){return function(b){return console.log("LiveCanvasService spot.updated",b),a._scope.$broadcast("spot:update",b)}}(this)),this._LiveCanvasService.on("spot.reserved",function(a){return function(b){return a._CanvasService.reserveSpot(b,a._scope.spots)}}(this)),this._LiveCanvasService.on("spot.unreserved",function(a){return function(b){return console.log("spot.unreserved",b),a._CanvasService.unreserveSpot(b,a._scope.spots)}}(this)),this._LiveCanvasService.on("hello",function(){return function(a){return console.log("hello from ",a)}}(this)),this._scope.refreshCanvas=function(a){return function(b){var c,d;return a._CanvasService.setCoordinates({lat:null!=(c=null!=b?b.lat:void 0)?c:0,"long":null!=(d=null!=b?b["long"]:void 0)?d:0}),a._getSpots({height:a._window.innerHeight,width:a._window.innerWidth})}}(this),this._scope.addRowInterval=function(a){return function(b){var c;return c=function(){return a._addRow(b)},a._scope.stop=f(c,500)}}(this),this._scope.addColumnInterval=function(a){return function(b){var c;return c=function(){return a._addColumn(b)},a._scope.stop=f(c,500)}}(this),this._scope.stopInterval=function(a){return function(){return angular.isDefined(a._scope.stop)?(f.cancel(a._scope.stop),a._scope.stop=void 0):void 0}}(this),this._scope.zoomIn=function(a){return function(){return a._CanvasService.increaseProportions(),a._scope.refreshCanvas(a._scope.getCurrentPosition())}}(this),this._scope.zoomOut=function(a){return function(){return a._CanvasService.decreaseProportions(),a._scope.refreshCanvas(a._scope.getCurrentPosition())}}(this),this._scope.getCurrentPosition=function(a){return function(){return{lat:a._scope.spots.rows[0].tiles[0].x,"long":a._scope.spots.rows[0].tiles[0].y}}}(this)}return a.$inject=["$scope","CanvasService","SpotService","LiveCanvasService","$interval","$window"],a.prototype._handleDrawingSave=function(a,b){return a.stopPropagation(),console.log("CanvasController spot:save",b),this._scope.$broadcast("spot:update",b),this._SpotService.saveData(b),this._LiveCanvasService.emit("spot.update",b)},a.prototype._handleReserveSpot=function(a,b){return a.stopPropagation(),this._LiveCanvasService.emit("spot.lock",b)},a.prototype._handleUnlockSpot=function(a,b){return a.stopPropagation(),this._LiveCanvasService.emit("spot.unlock",b),this._scope.$apply(function(a){return function(){return a._CanvasService.unreserveSpot(b,a._scope.spots)}}(this))},a.prototype._handleResize=function(a){return a.stopPropagation(),this._scope.refreshCanvas()},a.prototype._getSpots=function(a){return this._scope.spots=this._CanvasService.getSpotsForProportions(a)},a.prototype._addRow=function(a){return this._CanvasService.addRow(this._scope.spots,a)},a.prototype._addColumn=function(a){return this._CanvasService.addColumn(this._scope.spots,a)},a}(),angular.module("quickstartApp.common.canvas.controllers.CanvasController",[]).controller("CanvasController",a)},{}],5:[function(){angular.module("quickstartApp.common.canvas.directives.CanvasDirective",[]).directive("magicCanvas",["$rootScope","$window",function(a,b){return{restrict:"E",controller:"CanvasController",templateUrl:"common/canvas/templates/layout.html",link:function(a,c){var d,e;return e=function(){return a.$emit("canvas:resize"),c.find(".canvas_wrapper").css({height:b.innerHeight,width:b.innerWidth})},d=function(){return function(){return a.$apply(e)}}(this),e(),angular.element(b).bind("resize",_.throttle(d,1e3))}}}])},{}],6:[function(a){a("./controllers/canvas_controller"),a("./services/canvas_service"),a("./services/live_canvas_service"),a("./directives/canvas_directive"),angular.module("quickstartApp.common.canvas",["quickstartApp.common.canvas.services.CanvasService","quickstartApp.common.canvas.services.LiveCanvasService","quickstartApp.common.canvas.controllers.CanvasController","quickstartApp.common.canvas.directives.CanvasDirective"])},{"./controllers/canvas_controller":4,"./directives/canvas_directive":5,"./services/canvas_service":7,"./services/live_canvas_service":8}],7:[function(){var a,b=function(a,b){return function(){return a.apply(b,arguments)}};angular.module("quickstartApp.common.canvas.services.CanvasService",[]).service("CanvasService",a=function(){function a(){this.getSpotsForProportions=b(this.getSpotsForProportions,this),this.setCoordinates=b(this.setCoordinates,this),this.addColumn=b(this.addColumn,this),this.addRow=b(this.addRow,this),this.unreserveSpot=b(this.unreserveSpot,this),this.reserveSpot=b(this.reserveSpot,this),this.decreaseProportions=b(this.decreaseProportions,this),this.increaseProportions=b(this.increaseProportions,this)}return a.prototype._Proportions={width:150,height:194},a.prototype._coordonates={lat:0,"long":0},a.prototype.increaseProportions=function(){return this._Proportions.width+=10,this._Proportions.height+=14},a.prototype.decreaseProportions=function(){return this._Proportions.width-=15,this._Proportions.height-=21},a.prototype.reserveSpot=function(a,b){var c,d,e,f,g,h;for(e=b.rows,f=[],c=0,d=e.length;d>c;c++)g=e[c],f.push(function(){var b,c,d,e;for(d=g.tiles,e=[],b=0,c=d.length;c>b;b++)h=d[b],e.push(h.y===a.y&&h.x===a.x?h.status="reserved":void 0);return e}());return f},a.prototype.unreserveSpot=function(a,b){var c,d,e,f,g,h;for(console.log("CanvasService",a,b),e=b.rows,f=[],c=0,d=e.length;d>c;c++)g=e[c],f.push(function(){var b,c,d,e;for(d=g.tiles,e=[],b=0,c=d.length;c>b;b++)h=d[b],e.push(h.y===a.y&&h.x===a.x?h.status="free":void 0);return e}());return f},a.prototype.addRow=function(a,b){return console.log(a,b),"up"===b&&(a.rows.unshift({tiles:_.map(_.first(a.rows).tiles,function(a){return function(b){return{y:b.y-1,x:b.x,height:a._Proportions.height,width:a._Proportions.width}}}(this))}),a.rows.pop()),"down"===b?(a.rows.push({tiles:_.map(_.last(a.rows).tiles,function(a){return function(b){return{y:b.y+1,x:b.x,height:a._Proportions.height,width:a._Proportions.width}}}(this))}),a.rows.shift()):void 0},a.prototype.addColumn=function(a,b){return"right"===b?_.map(a.rows,function(a){return function(b){return b.tiles.push({x:_.last(b.tiles).x+1,y:_.first(b.tiles).y,height:a._Proportions.height,width:a._Proportions.width}),b.tiles.shift()}}(this)):"left"===b?_.map(a.rows,function(a){return function(b){return b.tiles.unshift({x:_.first(b.tiles).x-1,y:_.first(b.tiles).y,height:a._Proportions.height,width:a._Proportions.width}),b.tiles.pop()}}(this)):void 0},a.prototype.setCoordinates=function(a){return this._coordonates.lat=a.lat,this._coordonates["long"]=a["long"]},a.prototype.getSpotsForProportions=function(a){var b,c,d,e;return d=Math.floor(a.height/this._Proportions.height),e=Math.floor(a.width/this._Proportions.width),{rows:function(){var a,f,g,h;for(h=[],b=a=f=this._coordonates["long"],g=this._coordonates["long"]+d;g>=f?g>a:a>g;b=g>=f?++a:--a)h.push({tiles:function(){var a,d,f,g;for(g=[],c=a=d=this._coordonates.lat,f=this._coordonates.lat+e;f>=d?f>a:a>f;c=f>=d?++a:--a)g.push({x:c,y:b,height:this._Proportions.height,width:this._Proportions.width,status:"loading"});return g}.call(this)});return h}.call(this)}},a}())},{}],8:[function(){angular.module("quickstartApp.common.canvas.services.LiveCanvasService",[]).factory("LiveCanvasService",["socketFactory","BASEHOST",function(a,b){var c,d;return c=io.connect(b+"/LiveCanvas"),d=a({ioSocket:c})}])},{}],9:[function(){var a,b=function(a,b){return function(){return a.apply(b,arguments)}};a=function(){function a(a,c){this._scope=a,this._SpotService=c,this._getData=b(this._getData,this),this._scope.data=this._getData(),this._scope.$on("drawing:save",function(a){return function(b,c){return console.log("spotControler drawing:save",c),a._scope.$emit("spot:save",c)}}(this)),this._scope.$on("spot:update",function(a){return function(b,c){return c.hPos===a._scope.spotOpts.x&&c.vPos===a._scope.spotOpts.y?(console.log("spotControler spot:updated",c),a._scope.$broadcast("draw:data",c.drawingDataUrl)):void 0}}(this)),this._scope.data.then(function(a){return function(b){var c;return(null!=(c=b.data)?c.drawingDataUrl:void 0)?a._scope.$broadcast("draw:data",b.data.drawingDataUrl):a._scope.$broadcast("free:data",b)}}(this))}return a.$inject=["$scope","SpotService"],a.prototype._getData=function(){return this._SpotService.getData({hPos:this._scope.spotOpts.x,vPos:this._scope.spotOpts.y})},a}(),angular.module("quickstartApp.common.spot.controllers.SpotController",[]).controller("SpotController",a)},{}],10:[function(){angular.module("quickstartApp.common.spot.directives.CanvasSpotDirective",[]).directive("canvasSpot",["$rootScope","$compile","$modal","$window","BASEURL",function(a,b,c,d,e){return{restrict:"A",link:function(a){return a._listenForDrawing=function(){return function(b){return b.preventDefault(),console.log("_listenForDrawing"),a.$broadcast("drawing:save",{hPos:a.spotOpts.x,vPos:a.spotOpts.y,drawingDataUrl:b.data})}}(this),a._openDrawingFrame=function(){return function(){return c({title:"drawing frame",show:!0,animation:"am-fade-and-scale",backdropAnimation:"am-fade",contentTemplate:"common/spot/templates/draw_canvas_frame.html",scope:a})}}(this),a.saveDrawing=function(){return function(){return d.frames[0].postMessage("save.frame",e)}}(this),a._unreserveSpot=function(){return function(b){return a.$emit("spot:unlock",b)}}(this),a._reserveSpot=function(){return function(b){return a.$emit("spot:lock",b)}}(this),a.$on("modal.show",function(){return function(b){return b.stopPropagation(),d.addEventListener("message",a._listenForDrawing)}}(this)),a.$on("modal.hide",function(){return function(b){return b.stopPropagation(),d.removeEventListener("message",a._listenForDrawing),a._unreserveSpot(a.spotOpts)}}(this)),a.$on("spot:connect",function(){return function(b,c){return b.stopPropagation(),a.spotOpts=c.spotOpts,a._reserveSpot(c.spotOpts),a._openDrawingFrame(c.spotOpts)}}(this))}}}])},{}],11:[function(){angular.module("quickstartApp.common.spot.directives.DrawingCanvasDirective",[]).directive("drawingCanvas",["$rootScope","$compile","$window",function(){return{restrict:"E",template:'<div><iframe class="drawingCanvasFrame" width="550" height="711" src="harmony_canvas/index.html"> </iframe></div>',link:function(a,b){return a._initDrawingPad=function(){return function(){var a;return a=b.find(".drawingCanvasFrame")}}(this),a._initDrawingPad()}}}])},{}],12:[function(){angular.module("quickstartApp.common.spot.directives.SpotDirective",[]).directive("spotTile",["$rootScope",function(){return{restrict:"E",scope:{spotOpts:"="},controller:"SpotController",templateUrl:"common/spot/templates/layout.html",link:function(a,b){return b.bind("mouseover",function(){return"free"===a.spotOpts.status?b.addClass("hovered"):void 0}),b.bind("mouseleave",function(){return b.removeClass("hovered")}),a.$watch("spotOpts.status",function(){return function(a,c){if(null!=a&&a!==c)switch(a){case"reserved":return b.find(".drawing").addClass("connected");case"free":return b.find(".drawing").removeClass("connected")}}}(this)),a.connectFrame=function(){return function(){return a.$emit("spot:connect",{scopeRef:a,spotOpts:a.spotOpts}),null}}(this),a.$on("free:data",function(){return function(b,c){return console.log("free:data",c),a.spotOpts.status="free"}}(this)),a.$on("draw:data",function(){return function(c,d){var e;return a.spotOpts.status="drawing",c.preventDefault(),b.unbind(),e=new Image,e.className="drawing",e.src=d,b.find(".drawing").removeClass("connected"),b.find(".drawingCanvas").html(e)}}(this))}}}])},{}],13:[function(a){a("./controllers/spot_controller"),a("./services/spot_service"),a("./directives/spot_directive"),a("./directives/canvas_spot_directive"),a("./directives/drawing_canvas_directive"),angular.module("quickstartApp.common.spot",["quickstartApp.common.spot.services.SpotService","quickstartApp.common.spot.controllers.SpotController","quickstartApp.common.spot.directives.SpotDirective","quickstartApp.common.spot.directives.CanvasSpotDirective","quickstartApp.common.spot.directives.DrawingCanvasDirective"])},{"./controllers/spot_controller":9,"./directives/canvas_spot_directive":10,"./directives/drawing_canvas_directive":11,"./directives/spot_directive":12,"./services/spot_service":14}],14:[function(){angular.module("quickstartApp.common.spot.services.SpotService",[]).factory("SpotService",["$http","BASEURL",function(a,b){return{saveData:function(c){return a.post(b+"/api/spot/",{data:c})},getData:function(c){return a({url:b+"/api/spot/",params:c})}}}])},{}],15:[function(a){a("./services/module_extension"),a("./services/observable_mixin"),a("./services/request_aborter_service"),angular.module("quickstartApp.common.utils",["quickstartApp.common.utils.services.Module","quickstartApp.common.utils.services.ObservableMixin","quickstartApp.common.utils.services.RequestAborterMixin"])},{"./services/module_extension":16,"./services/observable_mixin":17,"./services/request_aborter_service":18}],16:[function(){angular.module("quickstartApp.common.utils.services.Module",[]).factory("Module",function(){var a;return a=function(){function a(){}return a.extend=function(a){var b,c,d;for(b in a)d=a[b],"extend"!==b&&"include"!==b&&(this[b]=d);return null!=(c=a.extended)&&c.apply(this),this},a.include=function(a,b){var c,d,e;for(c in a)e=a[c],"extend"!==c&&"include"!==c&&(b&&"Function"==typeof e&&(e=b(e)),this.prototype[c]=e);return null!=(d=a.included)&&d.apply(this),this},a}()})},{}],17:[function(){var a,b,c=[].slice;b=function(a,b){var c,d,e,f,g,h,i,j,k,l,m;switch(h=[b[0],b[1],b[2]],c=h[0],d=h[1],e=h[2],f=(null!=a?a.length:void 0)||0,g=-1,b.length){case 0:for(i=[];++g<f;)i.push(a[g].cb.call(a[g].ctx));return i;case 1:for(j=[];++g<f;)j.push(a[g].cb.call(a[g].ctx,c));return j;case 2:for(k=[];++g<f;)k.push(a[g].cb.call(a[g].ctx,c,d));return k;case 3:for(l=[];++g<f;)l.push(a[g].cb.call(a[g].ctx,c,d,e));return l;default:for(m=[];++g<f;)m.push(a[g].cb.apply(a[g].ctx,b));return m}},a={on:function(a,b,c){var d;return"function"==typeof b&&"string"==typeof a&&(null==this._events&&(this._events={}),null==(d=this._events)[a]&&(d[a]=[]),this._events[a].push({cb:b,ctx:c})),this},off:function(a,b){var c,d,e,f,g,h,i;if(d=null!=(h=this._events)?h[a]:void 0,a&&b&&(null!=d?d.length:void 0)){for(this._events[a]=i=[],e=f=0,g=d.length;g>f;e=++f)c=d[e],c.cb!==b&&i.push(c);i.length?this._events[a]=i:delete this._events[a]}else a&&"undefined"==typeof b&&(null!=d?d.length:void 0)&&delete this._events[a];return this},trigger:function(){var a,d,e,f,g,h,i;return e=arguments[0],d=2<=arguments.length?c.call(arguments,1):[],f=null!=(g=this._events)?g[e]:void 0,a=null!=(h=this._events)?h.all:void 0,(e&&f||a)&&((null!=f?f.length:void 0)&&b(f,d),(null!=a?a.length:void 0)&&(i=d,i.unshift(e),b(a,i))),this}},angular.module("quickstartApp.common.utils.services.ObservableMixin",[]).factory("ObservableMixin",function(){return a})},{}],18:[function(){angular.module("quickstartApp.common.utils.services.RequestAborterMixin",[]).factory("RequestAborterMixin",["$q",function(a){return{registerPendingRequest:function(){return this._deferred=a.defer(),this._aborter=this._deferred.promise},killRequest:function(){return this._deferred.resolve()}}}])},{}],19:[function(a,b){b.exports={baseurl:"http://infinite-canvases.herokuapp.com",basehost:"http://infinite-canvases.herokuapp.com:5000"}},{}],20:[function(a){var b;a("./app/state/index"),a("./common/canvas/index"),a("./common/spot/index"),a("./common/utils/index"),b=a("./config.json"),angular.module("application",["templates","ngAnimate","ngResource","lodash","ui.router","btford.socket-io","mgcrea.ngStrap","quickstartApp.common.utils","quickstartApp.common.canvas","quickstartApp.common.spot","quickstartApp.state"]).constant("BASEURL",b.baseurl).constant("BASEHOST",b.basehost)},{"./app/state/index":3,"./common/canvas/index":6,"./common/spot/index":13,"./common/utils/index":15,"./config.json":19}]},{},[1]);
//# sourceMappingURL=client.build.js.map