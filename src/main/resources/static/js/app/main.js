const NS = "YWM";
(function (global, factory) {
        "use strict";

        if (typeof exports === 'object' && typeof module !== 'undefined') {
            factory(exports);
        }
        else if (typeof define === 'function' && define.amd) {
            define(['exports'], factory)
        }
        else { // Browser
            factory((global[NS] = {}))
        }
    }(this, function (exports) {
        'use strict';

        const version = "v_1.0.0";
        const author = "Herbert Yu";


        var lastId = 0; // Number Last unique ID used by [`stamp()`](#util-stamp)

        // @function stamp(obj: Object): Number
        // Returns the unique ID of an object, assigning it one if it doesn't have it.
        function stamp(obj) {
            let key = "_" + NS + "_id";
            obj[key] = obj[key] || ++lastId;
            return obj[key];
        }

        // @function trim(str: String): String
        // Compatibility polyfill for [String.prototype.trim](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String/Trim)
        function trim(str) {
            return str.trim ? str.trim() : str.replace(/^\s+|\s+$/g, '');
        }

        // @function splitWords(str: String): String[]
        // Trims and splits the string on whitespace and returns the array of parts.
        function splitWords(str) {
            return trim(str).split(/\s+/);
        }

        let Util = {
            extend: function (destination, ...src) {
                var property, j, source, len = arguments.length;

                for (j = 1; j < len; j++) {
                    source = arguments[j];
                    for (property in source) {
                        destination[property] = source[property];
                    }
                }
                return destination;
            },
            extendNotOverride: function (destination, ...src) { //已有的相同属性不覆盖
                var property, j, source, len = arguments.length;

                for (j = 1; j < len; j++) {
                    source = arguments[j];
                    for (property in source) {
                        if (destination[property]) {
                            continue;
                        }
                        destination[property] = source[property];
                    }
                }
                return destination;
            },

            getHowManyDaysOfMonth(Year, Month) { //获取一个月 有多少天
                var temp = new Date(Year, Month, 1);
                return new Date(temp.getTime() - 864e5).getDate();
            },
            getDateFirst: function (date) {
                if (!(date instanceof Date)) {
                    if (typeof date == "number" && !isNaN(date)) {  //date 也可以为long类型 时间戳
                        date = new Date(date);
                    } else {
                        throw new Error("非法参数date");
                    }
                }
                return date.setHours(0, 0, 0, 0)
            },
            getDateLast: function (date) {
                if (!(date instanceof Date)) {
                    if (typeof date == "number" && !isNaN(date)) {  //date 也可以为long类型 时间戳
                        date = new Date(date);
                    } else {
                        throw new Error("非法参数date");
                    }
                }
                return date.setHours(23, 59, 59, 999)
            },
            getMonthFirst: function (date) {
                if (!(date instanceof Date)) {
                    if (typeof date == "number" && !isNaN(date)) {  //date 也可以为long类型 时间戳
                        date = new Date(date);
                    } else {
                        throw new Error("非法参数date");
                    }
                }
                date.setDate(1);
                date.setHours(0, 0, 0, 0);
                return date.getTime();
            },
            getMonthLast: function (date) {
                if (!(date instanceof Date)) {
                    if (typeof date == "number" && !isNaN(date)) {  //date 也可以为long类型 时间戳
                        date = new Date(date);
                    } else {
                        throw new Error("非法参数date");
                    }
                }
                let days = TXiss.getHowManyDaysOfMonth(date.getFullYear(), date.getMonth() + 1);
                date.setDate(days);
                return date.setHours(23, 59, 59, 999)
            },

            /**
             * 将 Date/时间戳 转化为指定格式的String:
             * 年(y)可以用 1-4 个占位符、月(M)、日(d)、12小时(h)、24小时(H)、分(m)、秒(s)、毫秒(S)只能用 1 个占位符(是 1-3 位的数字)、周(E)、季度(q)可以用 1-2 个占位符
             * formatDateTime(date,"yyyy-MM-dd hh:mm:ss:S")==> 2006-07-02 08:09:04:423
             * formatDateTime(date,"yyyy-MM-dd E HH:mm:ss") ==> 2009-03-10 二 20:09:04
             * formatDateTime(date,"yyyy-MM-dd EE hh:mm:ss") ==> 2009-03-10 周二 08:09:04
             * formatDateTime(date,"yyyy-MM-dd EEE hh:mm:ss") ==> 2009-03-10 星期二 08:09:04
             * formatDateTime(date,"yyyy-M-d h:m:s.S") ==> 2006-7-2 8:9:4.18
             * formatDateTime(date,"yyyy年MM月dd日 HH:mm:ss") ==> 2018年12月04日 13:56:04
             * formatDateTime(date,"HH时mm分ss秒") ==> 14时01分17秒
             */
            formatDateTime: function (date, fmt) {

                if (!(date instanceof Date)) {
                    if (typeof date == "number" && !isNaN(date)) {  //date 也可以为long类型 时间戳
                        date = new Date(date);
                    } else {
                        return "";
                    }
                }

                fmt = fmt || "yyyy-MM-dd HH:mm";
                var o = {
                    "M+": date.getMonth() + 1, //月份
                    "d+": date.getDate(), //日
                    "h+": date.getHours() % 12 == 0 ? 12 : date.getHours() % 12, //小时
                    "H+": date.getHours(), //小时
                    "m+": date.getMinutes(), //分
                    "s+": date.getSeconds(), //秒
                    "q+": Math.floor((date.getMonth() + 3) / 3), //季度
                    "S": date.getMilliseconds() //毫秒
                };
                var week = {
                    "0": "\u65e5",
                    "1": "\u4e00",
                    "2": "\u4e8c",
                    "3": "\u4e09",
                    "4": "\u56db",
                    "5": "\u4e94",
                    "6": "\u516d"
                };
                if (/(y+)/.test(fmt)) {
                    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
                }
                if (/(E+)/.test(fmt)) {
                    fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "\u661f\u671f" : "\u5468") : "") + week[date.getDay() + ""]);
                }
                for (var k in o) {
                    if (new RegExp("(" + k + ")").test(fmt)) {
                        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
                    }
                }
                return fmt;
            },

            parseDate: function (str) {
                return new Date(str.replace(/-/g, "/"));
            },

            writeScript: function (url) {
                document.write("<scr" + "ipt type='text/javascript' src=" + url + "></sc" + "ript>");
            },
            getScriptWithPromise: function (url) {
                return new Promise(function (resolve, reject) {
                        var js_script = document.createElement('script');
                        js_script.type = "text/javascript";
                        js_script.src = url;
                        document.getElementsByTagName('head')[0].appendChild(js_script);
                        js_script.onload = function () {
                            resolve();
                        };
                    }
                );
            },
            getScriptAsync: function (url, onSuccess, onError) {
                // if (_inspectBrowser() && !TXiss.browser.isIE) { //use promise
                //
                //     var promise = TXiss.getScriptWithPromise(url);
                //     promise.then(onSuccess).catch(onError);
                //
                // } else { //use callback
                var js_script = document.createElement('script');
                js_script.type = "text/javascript";
                js_script.src = url;
                js_script.onload = function () {
                    try {
                        onSuccess();
                    } catch (e) {
                        TXiss.warn(e);
                        onError(e);
                    }
                };
                js_script.onerror = onError;
                document.getElementsByTagName('head')[0].appendChild(js_script);
                // }
            },
            loadCssFile: function (url) {
                var head = document.getElementsByTagName('HEAD').item(0);
                var style = document.createElement('link');
                style.href = url;
                style.rel = 'stylesheet';
                style.type = 'text/css';
                head.appendChild(style);
            },
            playAudio: function (src) { //音频文件地址
                if (!src) {
                    return;
                }
                var body = document.body;
                var div = document.createElement('div');
                div.setAttribute('id', 'playAudio');
                div.style.width = '0px';
                div.style.height = '0px';
                div.style.position = 'absolute';
                div.style.top = '-1111px';

                if (!!window.ActiveXObject) {
                    div.innerHTML = '<embed id="music" volume="0" src="' + src + '" type="application/x-mplayer2" autostart="true" loop="false" height="0" width="0" ></embed>';
                    setTimeout(function () {
                        div.parentNode.removeChild(div);
                    }, 2000)
                } else {
                    div.innerHTML = '<audio id="music" preload="auto" volume="1" src="' + src + '"></audio>';
                    div.children[0].play();
                    div.children[0].addEventListener('ended', function () {
                        div.parentNode.removeChild(div);
                    }, false);
                }
                body.appendChild(div);
            },

            //RGB 颜色转 16进制颜色
            rgbToHex: function (r, g, b) { //rgbToHex(255, 165, 1); // 'ffa501'
                return ((r << 16) + (g << 8) + b).toString(16).padStart(6, '0');
            },
            //window.location.search 转 JS 对象
            urlParamToObj: function (search) { //let search = '?ie=utf-8&f=8&rsv_bp=1&rsv_idx=1&tn=baidu&wd=js&rsv_pq=a86b5e5f0007bceb&rsv_t=1e1fAVan%2BVlnkhJHFB0BIGLdLM2slszYMJBTTfFkmyyBUzBpw0ggeuVDE50&rqlang=cn&rsv_enter=0&inputT=1287&rsv_sug3=5&rsv_sug1=3&rsv_sug7=101&rsv_sug2=0&rsv_sug4=1907'
                return JSON.parse(`{"${decodeURIComponent(search.substring(1)).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"')}"}`);
            },

            addURLParam: function (url, name, value) {
                url += (url.indexOf("?") == -1 ? "?" : "&");
                url += encodeURIComponent(name) + "=" + encodeURIComponent(value);
                return url;
            },

            addURLParams: function (url, name_value_map) { //
                if (name_value_map && Object.getOwnPropertyNames(name_value_map).length > 0) {
                    for (var name in name_value_map) {
                        return TXiss.addURLParam(url, name, name_value_map[name]);
                    }
                }
                return url;
            },

            toParams: function (name_value_map) {
                var str = "";
                if (name_value_map && Object.getOwnPropertyNames(name_value_map).length > 0) {
                    for (var name in name_value_map) {
                        str += (str.indexOf("?") == -1 ? "?" : "&");
                        str += encodeURIComponent(name) + "=" + encodeURIComponent(name_value_map[name]);
                    }
                }
                return str;
            },

            getDistance: function (lat1, lng1, lat2, lng2) {
                if (lat1 <= 0 || lng1 <= 0 || lat2 <= 0 || lng2 < 0) {
                    return "";
                }
                var radLat1 = lat1 * Math.PI / 180.0;
                var radLat2 = lat2 * Math.PI / 180.0;
                var a = radLat1 - radLat2;
                var b = lng1 * Math.PI / 180.0 - lng2 * Math.PI / 180.0;
                var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) +
                    Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
                s = s * 6378.137;// EARTH_RADIUS;
                s = Math.round(s * 10000) / 10000;

                return (s <= 1) ? (s * 1000).toFixed(0) + "m" : s.toFixed(1) + "km";
            },

            hashCode: function (str) {
                if (typeof str != "string") {
                    str = JSON.stringify(str);
                }
                var hash = 0;
                if (str.length == 0) return hash;
                for (let i = 0; i < str.length; i++) {
                    let char = str.charCodeAt(i);
                    hash = ((hash << 5) - hash) + char;
                    hash = hash & hash;
                }
                return hash;
            },

            /**
             * 对电话和姓名身份证等字符串 进行部分隐藏处理
             * @param str 字符串
             * @param frontLen 前面保留位数
             * @param endLen 后面保留位数
             * @returns {string}
             */
            replaceWithXing: function (str, frontLen, endLen) {
                var len = str.length - frontLen - endLen;
                var xing = '';
                for (var i = 0; i < len; i++) {
                    xing += '*';
                }
                return str.substring(0, frontLen) + xing + str.substring(str.length - endLen);
            },
            replaceMobileWithXing: function (str) {
                return this.replaceWithXing(str, 3, 4);
            },
            replaceIdcardWithXing: function (str) {
                return this.replaceWithXing(str, 6, 4);
            },

            IdcardValid: function (code, strict) {
                let city = {
                    11: "北京", 12: "天津", 13: "河北", 14: "山西",
                    15: "内蒙古", 21: "辽宁", 22: "吉林", 23: "黑龙江 ",
                    31: "上海", 32: "江苏", 33: "浙江", 34: "安徽",
                    35: "福建", 36: "江西", 37: "山东", 41: "河南",
                    42: "湖北 ", 43: "湖南", 44: "广东", 45: "广西",
                    46: "海南", 50: "重庆", 51: "四川", 52: "贵州",
                    53: "云南", 54: "西藏 ", 61: "陕西", 62: "甘肃",
                    63: "青海", 64: "宁夏", 65: "新疆", 71: "台湾",
                    81: "香港", 82: "澳门", 91: "国外 "
                };
                let tip = "success";
                let pass = true;

                if (!code || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(code)) {
                    tip = "身份证号码[格式]错误";
                    pass = false;
                }

                if (strict) {
                    if (!city[code.substr(0, 2)]) {
                        tip = "身份证号码[地址编码]错误";
                        pass = false;
                    } else {
                        //18位身份证需要验证最后一位校验位
                        if (code.length == 18) {
                            code = code.split('');
                            //∑(ai×Wi)(mod 11)
                            //加权因子
                            var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
                            //校验位
                            var parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
                            var sum = 0;
                            var ai = 0;
                            var wi = 0;
                            for (var i = 0; i < 17; i++) {
                                ai = code[i];
                                wi = factor[i];
                                sum += ai * wi;
                            }
                            var last = parity[sum % 11];
                            if (parity[sum % 11] != code[17]) {
                                tip = "身份证号码[校验位]错误";
                                pass = false;
                            }
                        }
                    }
                }
                return {pass: pass, tip: tip};
            },

            /**
             * debouncing, executes the function if there was no new event in $wait milliseconds
             * @param func
             * @param wait 毫秒
             * @param scope
             * @returns {Function}
             */
            debounce: function (func, wait, scope) {
                var timeout;
                return function () {
                    var context = scope || this, args = arguments;
                    var later = function () {
                        timeout = null;
                        func.apply(context, args);
                    };
                    clearTimeout(timeout);
                    timeout = setTimeout(later, wait);
                };
            },

            /**
             * in case of a "storm of events", this executes once every $threshold
             * @param fn
             * @param threshhold 毫秒
             * @param scope
             * @returns {Function}
             */
            throttle: function (fn, threshhold, scope) {
                threshhold || (threshhold = 250);
                var last,
                    deferTimer;
                return function () {
                    var context = scope || this;

                    var now = +new Date,
                        args = arguments;
                    if (last && now < last + threshhold) {
                        // hold on to it
                        clearTimeout(deferTimer);
                        deferTimer = setTimeout(function () {
                            last = now;
                            fn.apply(context, args);
                        }, threshhold);
                    } else {
                        last = now;
                        fn.apply(context, args);
                    }
                };
            },

            uuidByTime: function () {
                var d = new Date().getTime();
                var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                    var r = (d + Math.random() * 16) % 16 | 0;
                    d = Math.floor(d / 16);
                    return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
                });
                return uuid;
            },

            uuid: function (len, radix) {
                len = len || 32;
                radix = radix || 16;

                var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
                var uuid = [], i;
                radix = radix || chars.length;

                if (len) {
                    // Compact form
                    for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix];
                } else {
                    // rfc4122, version 4 form
                    var r;

                    // rfc4122 requires these characters
                    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
                    uuid[14] = '4';

                    // Fill in random data. At i==19 set the high bits of clock sequence as
                    // per rfc4122, sec. 4.1.5
                    for (i = 0; i < 36; i++) {
                        if (!uuid[i]) {
                            r = 0 | Math.random() * 16;
                            uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
                        }
                    }
                }

                return uuid.join('');
            },


        };


        let Events = {
            /* @method on(type: String, fn: Function, context?: Object): this
         * Adds a listener function (`fn`) to a particular event type of the object. You can optionally specify the context of the listener (object the this keyword will point to). You can also pass several space-separated types (e.g. `'click dblclick'`).
         *
         * @alternative
         * @method on(eventMap: Object): this
         * Adds a set of type/listener pairs, e.g. `{click: onClick, mousemove: onMouseMove}`
         */
            on: function (types, fn, context) {

                // types can be a map of types/handlers
                if (typeof types === 'object') {
                    for (var type in types) {
                        // we don't process space-separated events here for performance;
                        // it's a hot path since Layer uses the on(obj) syntax
                        this._on(type, types[type], fn);
                    }

                } else {
                    // types can be a string of space-separated words
                    types = splitWords(types);

                    for (var i = 0, len = types.length; i < len; i++) {
                        this._on(types[i], fn, context);
                    }
                }

                return this;
            },

            /* @method off(type: String, fn?: Function, context?: Object): this
         * Removes a previously added listener function. If no function is specified, it will remove all the listeners of that particular event from the object. Note that if you passed a custom context to `on`, you must pass the same context to `off` in order to remove the listener.
         *
         * @alternative
         * @method off(eventMap: Object): this
         * Removes a set of type/listener pairs.
         *
         * @alternative
         * @method off: this
         * Removes all listeners to all events on the object. This includes implicitly attached events.
         */
            off: function (types, fn, context) {

                if (!types) {
                    // clear all listeners if called without arguments
                    delete this._events;

                } else if (typeof types === 'object') {
                    for (var type in types) {
                        this._off(type, types[type], fn);
                    }

                } else {
                    types = splitWords(types);

                    for (var i = 0, len = types.length; i < len; i++) {
                        this._off(types[i], fn, context);
                    }
                }

                return this;
            },

            // attach listener (without syntactic sugar now)
            _on: function (type, fn, context) {
                this._events = this._events || {};

                /* get/init listeners for type */
                var typeListeners = this._events[type];
                if (!typeListeners) {
                    typeListeners = [];
                    this._events[type] = typeListeners;
                }

                if (context === this) {
                    // Less memory footprint.
                    context = undefined;
                }
                var newListener = {fn: fn, ctx: context},
                    listeners = typeListeners;

                // check if fn already there
                for (var i = 0, len = listeners.length; i < len; i++) {
                    if (listeners[i].fn === fn && listeners[i].ctx === context) {
                        return;
                    }
                }

                listeners.push(newListener);
            },

            _off: function (type, fn, context) {
                var listeners,
                    i,
                    len;

                if (!this._events) {
                    return;
                }

                listeners = this._events[type];

                if (!listeners) {
                    return;
                }

                if (!fn) {
                    // Set all removed listeners to noop so they are not called if remove happens in fire
                    for (i = 0, len = listeners.length; i < len; i++) {
                        listeners[i].fn = falseFn;
                    }
                    // clear all listeners for a type if function isn't specified
                    delete this._events[type];
                    return;
                }

                if (context === this) {
                    context = undefined;
                }

                if (listeners) {

                    // find fn and remove it
                    for (i = 0, len = listeners.length; i < len; i++) {
                        var l = listeners[i];
                        if (l.ctx !== context) {
                            continue;
                        }
                        if (l.fn === fn) {

                            // set the removed listener to noop so that's not called if remove happens in fire
                            l.fn = falseFn;

                            if (this._firingCount) {
                                /* copy array in case events are being fired */
                                this._events[type] = listeners = listeners.slice();
                            }
                            listeners.splice(i, 1);

                            return;
                        }
                    }
                }
            },

            // @method fire(type: String, data?: Object, propagate?: Boolean): this
            // Fires an event of the specified type. You can optionally provide an data
            // object — the first argument of the listener function will contain its
            // properties. The event can optionally be propagated to event parents.
            fire: function (type, data, propagate) {
                if (!this.listens(type, propagate)) {
                    return this;
                }

                var event = Util.extend({}, data, {
                    type: type,
                    target: this,
                    sourceTarget: data && data.sourceTarget || this
                });

                if (this._events) {
                    var listeners = this._events[type];

                    if (listeners) {
                        this._firingCount = (this._firingCount + 1) || 1;
                        for (var i = 0, len = listeners.length; i < len; i++) {
                            var l = listeners[i];
                            l.fn.call(l.ctx || this, event);
                        }

                        this._firingCount--;
                    }
                }

                if (propagate) {
                    // propagate the event to parents (set with addEventParent)
                    this._propagateEvent(event);
                }

                return this;
            },

            // @method listens(type: String): Boolean
            // Returns `true` if a particular event type has any listeners attached to it.
            listens: function (type, propagate) {
                var listeners = this._events && this._events[type];
                if (listeners && listeners.length) {
                    return true;
                }

                if (propagate) {
                    // also check parents for listeners if event propagates
                    for (var id in this._eventParents) {
                        if (this._eventParents[id].listens(type, propagate)) {
                            return true;
                        }
                    }
                }
                return false;
            },

            // // @method once(…): this
            // // Behaves as [`on(…)`](#evented-on), except the listener will only get fired once and then removed.
            // once: function (types, fn, context) {
            //
            //     if (typeof types === 'object') {
            //         for (var type in types) {
            //             this.once(type, types[type], fn);
            //         }
            //         return this;
            //     }
            //
            //     var handler = bind(function () {
            //         this
            //             .off(types, fn, context)
            //             .off(types, handler, context);
            //     }, this);
            //
            //     // add a listener that's executed once and removed after that
            //     return this
            //         .on(types, fn, context)
            //         .on(types, handler, context);
            // },

            // @method addEventParent(obj: Evented): this
            // Adds an event parent - an `Evented` that will receive propagated events
            addEventParent: function (obj) {
                this._eventParents = this._eventParents || {};
                this._eventParents[stamp(obj)] = obj;
                return this;
            },

            // @method removeEventParent(obj: Evented): this
            // Removes an event parent, so it will stop receiving propagated events
            removeEventParent: function (obj) {
                if (this._eventParents) {
                    delete this._eventParents[stamp(obj)];
                }
                return this;
            },

            _propagateEvent: function (e) {
                for (var id in this._eventParents) {
                    this._eventParents[id].fire(e.type, extend({
                        layer: e.target,
                        propagatedFrom: e.target
                    }, e), true);
                }
            }
        };


        // Disable search and ordering by default
        // $.extend($.fn.dataTable.defaults, {
        //     searching: false,
        //     ordering: false
        // });
        //https://www.datatables.net/manual/
        const Table = function ($target, ops = {}) {
            let param = {
                autoWidth: typeof ops.autoWidth != "undefined" ? ops.autoWidth : true, //是否自适应宽度
                deferRender: true,
                info: typeof ops.info != "undefined" ? ops.info : true, //是否显示页脚信息，DataTables插件左下角显示记录数 <Showing 0 to 0 of 0 entries>
                lengthChange: typeof ops.lengthChange != "undefined" ? ops.lengthChange : false,
                ordering: false, //是否启动各个字段的排序功能
                paging: typeof ops.paging != "undefined" ? ops.paging : true,
                processing: false, //DataTables载入数据时，是否显示‘进度’提示
                // scrollX: true,
                scrollY: true,
                searching: false, //是否启动过滤、搜索功能
                bServerSide: typeof ops.bServerSide != "undefined" ? ops.bServerSide : true,//开启此模式后，你对datatables的每个操作 每页显示多少条记录、下一页、上一页、排序（表头）、搜索，这些都会传给服务器相应的值
                stateSave: false,//使用sessionStorage或localStorage保存datatable信息（pagination position, display length, filtering and sorting）
                // renderer: "bootstrap",
                sAjaxDataProp: ops.sAjaxDataProp || "content",

                //Callbacks
                createdRow: function (row, data, index) {
                    // $(row).data("test","test-"+index); 没起效？
                    row.setAttribute("data-test", "test-" + index);
                    // $(row).addClass( 'important' );
                    // console.log("createdRow:", row, data, index);
                    ops.createdRow && ops.createdRow(...arguments);
                },
                rowCallback: function (row, data, displayNum, displayIndex, dataIndex) {
                    // console.log("rowCallback: ", row, data, displayNum, displayIndex, dataIndex);
                    ops.rowCallback && ops.rowCallback(...arguments);
                },
                footerCallback: function (row, data, start, end, display) {
                    // console.log("footerCallback:", row, data, start, end, display);
                    ops.footerCallback && ops.footerCallback(...arguments);
                },
                drawCallback: function (settings) {
                    console.log('DataTables has redrawn the table', settings);
                    // var startIndex = this.api().context[0]._iDisplayStart;//获取到本页开始的条数
                    // this.api().column(0).nodes().each(function (cell, i) {
                    //     //翻页序号连续
                    //     cell.innerHTML = startIndex + i + 1;
                    // });
                    ops.drawCallback && ops.drawCallback(...arguments);
                },
                formatNumber: function (toFormat) {
                    console.log("formatNumber: ", toFormat);
                },
                headerCallback: function (thead, data, start, end, display) {
                    // $(thead).find('th').eq(0).html( 'Displaying '+(end-start)+' records' );
                    console.log("headerCallback: ", start, end);
                },
                infoCallback: function (settings, start, end, max, total, pre) {
                    var api = this.api();
                    var pageInfo = api.page.info();

                    return 'Page ' + (pageInfo.page + 1) + ' of ' + pageInfo.pages;
                },
                initComplete: function (settings, json) {
                    console.log("initComplete!");
                    // $('div.loading').remove();
                    ops.initComplete && ops.initComplete(...arguments);
                },

                displayStart: 0,
                lengthMenu: ops.lengthMenu || [10, 20, 30, 50], //更改显示记录数  也可以：[ [10, 25, 50, -1], [10, 25, 50, "All"] ]
                pageLength: ops.pageLength || 10, //默认显示的记录数
                pagingType: ops.pagingType || "full_numbers", //numbers、simple、simple_numbers、full、full_numbers、first_last_numbers； input
                rowId: ops.rowId || "id", //tr DOM ID

                // stripeClasses: [ 'strip1', 'strip2', 'strip3' ],
                tabIndex: 0, //键盘导航table 0:默认文档流，-1:禁用
                language: {
                    emptyTable: "Nothing found",
                    zeroRecords: "Nothing found",
                    // info: "Showing page _PAGE_ of _PAGES_",
                    // infoEmpty: "No records available",
                    lengthMenu: "每页 _MENU_ 条记录",
                    paginate: {
                        first: "首页",
                        last: "末页",
                        next: "下一页",
                        previous: "上一页",
                    }
                },
                bScrollCollapse: true, //是否开启DataTables的高度自适应，当数据条数不够分页数据条数的时候，插件高度是否随数据条数而改变
                columns: ops.columns,  //columns 优先级>columnDefs; 同一columnDefs内 上面的优先级>下面的
                columnDefs: ops.columnDefs || [
                    // { targets: [0], width: "20%"},
                    {targets: '_all', visible: true}
                ],
                dom: ops.dom || '<"top"lf>rt<"bottom"ip><"clear">', //https://www.datatables.net/examples/basic_init/dom.html
            };

            if (ops.data) {
                param.data = ops.data;
                param.bServerSide = false;
            }

            if (param.bServerSide) {
                if (!ops.serverPromise) {
                    console.error("服务端处理请指定serverPromise请求数据!");
                    return;
                }
                param.ajax = function (data, callback, settings) {
                    let page = data.start / data.length;
                    let params = {
                        page: page,
                        size: data.length,
                    };
                    ops.serverPromise(params).then(function (res) {
                        //封装返回数据
                        let returnData = {
                            content: [],
                            draw: data.draw,//这里直接自行返回了draw计数器,应该由后台返回
                            recordsTotal: 0,
                            recordsFiltered: 0,
                        };
                        if (res) {
                            returnData.recordsTotal = res.totalElements;//返回数据全部记录
                            returnData.recordsFiltered = res.totalElements;//后台不实现过滤功能，每次查询均视作全部结果
                            if (res.content) {
                                returnData.content = res.content;//返回的数据列表
                                //console.log(returnData);
                            }
                        }
                        //调用DataTables提供的callback方法，代表数据已封装完成并传回DataTables进行渲染
                        //此时的数据需确保正确无误，异常判断应在执行此回调前自行处理完毕
                        callback(returnData);
                    });
                }
            }
            let dataTable = $target.DataTable(param);
            console.log("dataTable", dataTable);
            return dataTable;
        };


        const Pager = {
            /**
             * @param integer page 当前页
             * @param integer totalPages 总页数
             * @param integer showNum 最多显示多少个页码
             */
            range: function (page, totalPages, showNum = 5) {
                //当前页面小于1 则为1
                page = page < 1 ? 1 : page;
                //当前页大于总页数 则为总页数
                page = page > totalPages ? totalPages : page;
                //页数小当前页 则为当前页
                totalPages = totalPages < page ? page : totalPages;

                //计算开始页
                let start = page - Math.floor(showNum / 2);
                start = start < 1 ? 1 : start;
                //计算结束页
                let end = page + Math.floor(showNum / 2);
                end = end > totalPages ? totalPages : end;

                //当前显示的页码个数不够最大页码数，进行左右调整
                let $_curPageNum = end - start + 1;
                //左调整
                if ($_curPageNum < showNum && start > 1) {
                    start = start - (showNum - $_curPageNum);
                    start = start < 1 ? 1 : start;
                    $_curPageNum = end - start + 1;
                }
                //右边调整
                if ($_curPageNum < showNum && end < totalPages) {
                    end = end + (showNum - $_curPageNum);
                    end = end > totalPages ? totalPages : end;
                }
                return {
                    start: start,
                    end: end,
                }
            }
        };

        const _WebSocket = {
            _delegate: null,
            _initialized: false,
            init: function (options) {
                var _this = this;
                if (!_this.isSupported()) {
                    console.error('您的浏览器不支持WebSocket');
                    return;
                }
                var op = Util.extend({
                    callback: _this._defaultCbk,
                    url: null,
                    reconnect: false
                }, options);
                if (!op.url) {
                    console.error("初始化WebSocket失败，无效的请求地址");
                    return;
                }
                try {
                    _this._delegate = new WebSocket(op.url);
                } catch (error) {
                    return;
                }
                _this._initialized = true;

                //连接发生错误的回调方法
                _this._delegate.onerror = function () {
                    console.log("[ws onerror]与服务器连接失败...");
                };

                //连接成功建立的回调方法
                _this._delegate.onopen = function (event) {
                    console.log("[ws onopen]与服务器连接成功...");
                };

                //接收到消息的回调方法
                _this._delegate.onmessage = function (event) {
                    console.log("[ws onmessage]", event);
                    op.callback(event.data);
                };

                //连接关闭的回调方法
                _this._delegate.onclose = function () {
                    _this._delegate._initialized = false;
                    console.log("[ws onclose]已关闭当前链接");
                    if (op.reconnect) {
                        // 自动重连
                        setTimeout(function () {
                            _this.open(op);
                        }, 5000);
                    }
                }
            },
            _defaultCbk: function (data) {
                var _this = this;
                if (typeof data == "string") {
                    let msg = JSON.parse(data);
                    console.log("Received data string", msg);
                    if (msg.socketSessionId) {
                        _this._delegate.sessionId = msg.socketSessionId;
                    }
                }

                if (data instanceof ArrayBuffer) {
                    console.log("Received data arraybuffer");
                }

                if (data instanceof Blob) {
                    console.log("Received data blob");
                }
            },
            open: function (options) {
                var _this = this;
                if (_this._initialized) {
                    _this.close();
                }
                this.init(options);
                //监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
                window.onbeforeunload = function () { //also unload
                    console.log("[ws onbeforeunload]窗口关闭了");
                    _this.close();
                }
            },
            isSupported: function () {
                return typeof WebSocket != "undefined" && 'WebSocket' in window;
            },
            send: function (message) {
                if (!this._delegate) {
                    return;
                }
                this._delegate.send(message);
            },
            close: function () {
                if (!this._delegate) {
                    return;
                }
                this._delegate.close();
            }
        };


        const _Log = function () {
            console.log.apply(console, arguments);
        };

        exports.version = version;
        exports.author = author;
        exports.Util = Util;
        exports.Events = Events;
        exports.Table = Table;
        exports.Pager = Pager;
        exports.WebSocket = _WebSocket;
        exports.Log = _Log;

        let oldNS = window[NS];
        exports.noConflict = function () {
            window[NS] = oldNS;
            return this;
        };

        window[NS] = exports;

    })
)


const formToObject = form =>
    Array.from(new FormData(form))
        .reduce(
            (acc, [key, value]) => ({
                ...acc,
                [key]: value}),
            {}
        );