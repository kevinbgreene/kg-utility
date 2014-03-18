!function(exports) {
    "use strict";
    function isUndefined(value) {
        return "undefined" == typeof value;
    }
    function isDefined(value) {
        return "undefined" != typeof value;
    }
    function isObject(value) {
        return null != value && "object" == typeof value;
    }
    function isString(value) {
        return "string" == typeof value;
    }
    function isNumber(value) {
        return "number" == typeof value;
    }
    function isDate(value) {
        return "[object Date]" == toString.apply(value);
    }
    function isArray(value) {
        return "[object Array]" == toString.apply(value);
    }
    function isFunction(value) {
        return "function" == typeof value;
    }
    function isBoolean(value) {
        return "boolean" == typeof value;
    }
    function size(obj, ownPropsOnly) {
        var key, count = 0;
        if (isArray(obj) || isString(obj)) return obj.length;
        if (isObject(obj)) {
            for (key in obj) (!ownPropsOnly || obj.hasOwnProperty(key)) && count++;
            return count;
        }
    }
    var idCounter = 0;
    "undefined" == typeof exports.kg && (exports.kg = {}), kg.uniqueId = function() {
        return idCounter++;
    }, kg.log = function(msg, data) {
        "undefined" != typeof console && console.log(msg, data);
    }, kg.extend = function(obj1, obj2) {
        var key = null;
        for (key in obj2) obj1[key] = obj2[key];
        return obj1;
    }, kg.formatTime = function(time) {
        var mm = Math.floor(time / 60), ss = Math.floor(time - 60 * mm), mins = 10 > mm ? "0" + mm : mm, secs = 10 > ss ? "0" + ss : ss;
        return mins + ":" + secs;
    }, kg.getQueryString = function(key, defaultValue) {
        null === defaultValue && (defaultValue = ""), key = key.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&amp;]" + key + "=([^&amp;#]*)"), qs = regex.exec(window.location.href);
        return null == qs ? defaultValue : qs[1];
    }, kg.size = size, kg.isUndefined = isUndefined, kg.isDefined = isDefined, kg.isObject = isObject, 
    kg.isString = isString, kg.isNumber = isNumber, kg.isDate = isDate, kg.isArray = isArray, 
    kg.isFunction = isFunction, kg.isBoolean = isBoolean;
}(window, window.document), function(exports, kg) {
    "use strict";
    function init() {
        exports.navigator.standalone && (sniffer.standalone = !0), sniffer.touch = function() {
            return "ontouchstart" in document.documentElement;
        }(), sniffer.audio = function() {
            var r = !1, a = document.createElement("audio");
            return r = a.canPlayType("audio/mpeg"), a = null, r;
        }(), sniffer.pushState = !(!window.history || !window.history.pushState), sniffer.transition = !!cssSupports("transition") && !!cssSupports("transform"), 
        void 0 !== window.devicePixelRatio && (sniffer.pixelDensity = window.devicePixelRatio), 
        (screen.width >= 1200 || sniffer.pixelDensity >= 1.5) && (sniffer.highRes = !0), 
        ("undefined" != typeof document.documentElement.webkitRequestFullScreen || "undefined" != typeof document.documentElement.mozRequestFullScreen || "undefined" != typeof document.documentElement.requestFullScreen) && (sniffer.fullscreen = !0);
    }
    function cssSupports(property) {
        var div = document.createElement("div"), len = vendorPrefixes.length, adjustedProperty = "";
        if (property in div.style) return div = null, {
            prop: property,
            vendor: "default",
            combined: property
        };
        for (adjustedProperty = property.replace(/^[a-z]/, function(val) {
            return val.toUpperCase();
        }); len--; ) if (vendorPrefixes[len] + adjustedProperty in div.style) return div = null, 
        {
            prop: property,
            vendor: vendorPrefixes[len],
            combined: vendorPrefixes[len] + adjustedProperty
        };
        return div = null, !1;
    }
    if ("undefined" != typeof kg) {
        var vendorPrefixes = [ "Webkit", "Moz", "ms", "Ms" ], sniffer = {
            pixelDensity: 1,
            fullscreen: !1,
            inApplicationMode: null,
            isTouchDevice: !1,
            isHighRes: !1,
            transitionEndEvent: null,
            allowsFullscreen: !1,
            isIPhone: !1
        };
        sniffer.css = cssSupports, init(), kg.sniffer = sniffer;
    }
}(window, window.kg);