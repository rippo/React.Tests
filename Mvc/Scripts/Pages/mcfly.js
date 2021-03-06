﻿/**
_._
_.-="_-         _
_.-="   _-          | ||"""""""---._______     __..
___.===""""-.______-,,,,,,,,,,,,`-''----" """""       """""  __'
__.--""     __        ,'                   o \           __        [__|
__-""=======.--""  ""--.=================================.--""  ""--.=======:
]       [w] : /        \ : |========================|    : /        \ :  [w] :
V___________:|          |: |========================|    :|          |:   _-"
V__________: \        / :_|=======================/_____: \        / :__-"
-----------'  ""____""  `-------------------------------'  ""____""
____    ____         ________  __
|_   \  /   _|       |_   __  |[  |
|   \/   |   .---.   | |_ \_| | |   _   __
| |\  /| |  / /'`\]  |  _|    | |  [ \ [  ]
_| |_\/_| |_ | \__.  _| |_     | |   \ '/ /
|_____||_____|'.___.'|_____|   [___][\_:  /
\__.'
*/
!function (a) {
    if ("object" == typeof exports && "undefined" != typeof module)
        module.exports = a();
    else if ("function" == typeof define && define.amd)
        define([], a);
    else {
        var b;
        "undefined" != typeof window ? b = window : "undefined" != typeof global ? b = global : "undefined" != typeof self && (b = self), b.McFly = a();
    }
}(function () {
    var a;
    return function d(a, b, c) {
        function e(g, h) {
            if (!b[g]) {
                if (!a[g]) {
                    var i = "function" == typeof require && require;
                    if (!h && i)
                        return i(g, !0);
                    if (f)
                        return f(g, !0);
                    var j = new Error("Cannot find module '" + g + "'");
                    throw j.code = "MODULE_NOT_FOUND", j;
                }
                var k = b[g] = { exports: {} };
                a[g][0].call(k.exports, function (b) {
                    var c = a[g][1][b];
                    return e(c ? c : b);
                }, k, k.exports, d, a, b, c);
            }
            return b[g].exports;
        }
        for (var f = "function" == typeof require && require, g = 0; g < c.length; g++)
            e(c[g]);
        return e;
    }({ 1: [function (a, b) {
                b.exports = a("./lib/McFly");
            }, { "./lib/McFly": 5 }], 2: [function (a, b) {
                "use strict";
                function f(a, b) {
                    return setTimeout(function () {
                        throw b && b.stack && console.error(b.stack), b;
                    }, 0), a();
                }
                function g(a) {
                    this.callback = a;
                }
                var d = a("./Dispatcher"), e = a("es6-promise").Promise;
                g.prototype.dispatch = function () {
                    return e.resolve(this.callback.apply(this, arguments)).then(function (a) {
                        return new e(function (b, c) {
                            if (!a)
                                return c();
                            if (!a.actionType)
                                return f(c, "Payload object requires an actionType property");
                            try  {
                                d.dispatch(a);
                            } catch (e) {
                                f(c, e);
                            }
                            b();
                        });
                    });
                }, b.exports = g;
            }, { "./Dispatcher": 4, "es6-promise": 9 }], 3: [function (a, b) {
                "use strict";
                function f(a) {
                    var c, f, b = {};
                    for (c in a)
                        a.hasOwnProperty(c) && (f = new d(a[c]), b[c] = f.dispatch.bind(f));
                    e(this, b);
                }
                var d = a("./Action"), e = a("object-assign");
                b.exports = f;
            }, { "./Action": 2, "object-assign": 14 }], 4: [function (a, b) {
                "use strict";
                var d = a("flux").Dispatcher, e = new d;
                b.exports = e;
            }, { flux: 10 }], 5: [function (a, b) {
                "use strict";
                function h() {
                    this.actions = {}, this.stores = [], this.dispatcher = d;
                }
                var d = a("./Dispatcher"), e = a("./Store"), f = a("./ActionsFactory"), g = a("object-assign");
                h.prototype.createStore = function (a, b) {
                    var c = new e(a, b);
                    return c.dispatcherID = this.dispatcher.register(c.callback), this.stores.push(c), c;
                }, h.prototype.createActions = function (a) {
                    var b = new f(a);
                    return g(this.actions, b), b;
                }, b.exports = h;
            }, { "./ActionsFactory": 3, "./Dispatcher": 4, "./Store": 6, "object-assign": 14 }], 6: [function (a, b) {
                "use strict";
                function g(a, b) {
                    var c = this;
                    this.callback = b, f(!a.callback, '"callback" is a reserved name and cannot be used as a method name.'), f(!a.mixin, '"mixin" is a reserved name and cannot be used as a method name.'), e(this, d.prototype, a), this.mixin = { componentDidMount: function () {
                            var b, a = (console.warn || console.log).bind(console);
                            this.storeDidChange || a("A component that uses a McFly Store mixin is not implementing storeDidChange. onChange will be called instead, but this will no longer be supported from version 1.0."), b = this.storeDidChange || this.onChange, b || a("A change handler is missing from a component with a McFly mixin. Notifications from Stores are not being handled."), this.listener = function () {
                                this.isMounted() && b();
                            }.bind(this), c.addChangeListener(this.listener);
                        }, componentWillUnmount: function () {
                            this.listener && c.removeChangeListener(this.listener);
                        } };
                }
                var d = a("events").EventEmitter, e = a("object-assign"), f = a("invariant");
                g.prototype.getDispatchToken = function () {
                    return this.dispatcherID;
                }, g.prototype.emitChange = function () {
                    this.emit("change");
                }, g.prototype.addChangeListener = function (a) {
                    this.on("change", a);
                }, g.prototype.removeChangeListener = function (a) {
                    this.removeListener("change", a);
                }, b.exports = g;
            }, { events: 7, invariant: 13, "object-assign": 14 }], 7: [function (a, b) {
                function d() {
                    this._events = this._events || {}, this._maxListeners = this._maxListeners || void 0;
                }
                function e(a) {
                    return "function" == typeof a;
                }
                function f(a) {
                    return "number" == typeof a;
                }
                function g(a) {
                    return "object" == typeof a && null !== a;
                }
                function h(a) {
                    return void 0 === a;
                }
                b.exports = d, d.EventEmitter = d, d.prototype._events = void 0, d.prototype._maxListeners = void 0, d.defaultMaxListeners = 10, d.prototype.setMaxListeners = function (a) {
                    if (!f(a) || 0 > a || isNaN(a))
                        throw TypeError("n must be a positive number");
                    return this._maxListeners = a, this;
                }, d.prototype.emit = function (a) {
                    var b, c, d, f, i, j;
                    if (this._events || (this._events = {}), "error" === a && (!this._events.error || g(this._events.error) && !this._events.error.length)) {
                        if (b = arguments[1], b instanceof Error)
                            throw b;
                        throw TypeError('Uncaught, unspecified "error" event.');
                    }
                    if (c = this._events[a], h(c))
                        return !1;
                    if (e(c))
                        switch (arguments.length) {
                            case 1:
                                c.call(this);
                                break;
                            case 2:
                                c.call(this, arguments[1]);
                                break;
                            case 3:
                                c.call(this, arguments[1], arguments[2]);
                                break;
                            default:
                                for (d = arguments.length, f = new Array(d - 1), i = 1; d > i; i++)
                                    f[i - 1] = arguments[i];
                                c.apply(this, f);
                        }
                    else if (g(c)) {
                        for (d = arguments.length, f = new Array(d - 1), i = 1; d > i; i++)
                            f[i - 1] = arguments[i];
                        for (j = c.slice(), d = j.length, i = 0; d > i; i++)
                            j[i].apply(this, f);
                    }
                    return !0;
                }, d.prototype.addListener = function (a, b) {
                    var c;
                    if (!e(b))
                        throw TypeError("listener must be a function");
                    if (this._events || (this._events = {}), this._events.newListener && this.emit("newListener", a, e(b.listener) ? b.listener : b), this._events[a] ? g(this._events[a]) ? this._events[a].push(b) : this._events[a] = [this._events[a], b] : this._events[a] = b, g(this._events[a]) && !this._events[a].warned) {
                        var c;
                        c = h(this._maxListeners) ? d.defaultMaxListeners : this._maxListeners, c && c > 0 && this._events[a].length > c && (this._events[a].warned = !0, console.error("(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.", this._events[a].length), "function" == typeof console.trace && console.trace());
                    }
                    return this;
                }, d.prototype.on = d.prototype.addListener, d.prototype.once = function (a, b) {
                    function d() {
                        this.removeListener(a, d), c || (c = !0, b.apply(this, arguments));
                    }
                    if (!e(b))
                        throw TypeError("listener must be a function");
                    var c = !1;
                    return d.listener = b, this.on(a, d), this;
                }, d.prototype.removeListener = function (a, b) {
                    var c, d, f, h;
                    if (!e(b))
                        throw TypeError("listener must be a function");
                    if (!this._events || !this._events[a])
                        return this;
                    if (c = this._events[a], f = c.length, d = -1, c === b || e(c.listener) && c.listener === b)
                        delete this._events[a], this._events.removeListener && this.emit("removeListener", a, b);
                    else if (g(c)) {
                        for (h = f; h-- > 0;)
                            if (c[h] === b || c[h].listener && c[h].listener === b) {
                                d = h;
                                break;
                            }
                        if (0 > d)
                            return this;
                        1 === c.length ? (c.length = 0, delete this._events[a]) : c.splice(d, 1), this._events.removeListener && this.emit("removeListener", a, b);
                    }
                    return this;
                }, d.prototype.removeAllListeners = function (a) {
                    var b, c;
                    if (!this._events)
                        return this;
                    if (!this._events.removeListener)
                        return 0 === arguments.length ? this._events = {} : this._events[a] && delete this._events[a], this;
                    if (0 === arguments.length) {
                        for (b in this._events)
                            "removeListener" !== b && this.removeAllListeners(b);
                        return this.removeAllListeners("removeListener"), this._events = {}, this;
                    }
                    if (c = this._events[a], e(c))
                        this.removeListener(a, c);
                    else
                        for (; c.length;)
                            this.removeListener(a, c[c.length - 1]);
                    return delete this._events[a], this;
                }, d.prototype.listeners = function (a) {
                    var b;
                    return b = this._events && this._events[a] ? e(this._events[a]) ? [this._events[a]] : this._events[a].slice() : [];
                }, d.listenerCount = function (a, b) {
                    var c;
                    return c = a._events && a._events[b] ? e(a._events[b]) ? 1 : a._events[b].length : 0;
                };
            }, {}], 8: [function (a, b) {
                function e() {
                }
                var d = b.exports = {};
                d.nextTick = function () {
                    var a = "undefined" != typeof window && window.setImmediate, b = "undefined" != typeof window && window.postMessage && window.addEventListener;
                    if (a)
                        return function (a) {
                            return window.setImmediate(a);
                        };
                    if (b) {
                        var c = [];
                        return window.addEventListener("message", function (a) {
                            var b = a.source;
                            if ((b === window || null === b) && "process-tick" === a.data && (a.stopPropagation(), c.length > 0)) {
                                var d = c.shift();
                                d();
                            }
                        }, !0), function (a) {
                            c.push(a), window.postMessage("process-tick", "*");
                        };
                    }
                    return function (a) {
                        setTimeout(a, 0);
                    };
                }(), d.title = "browser", d.browser = !0, d.env = {}, d.argv = [], d.on = e, d.addListener = e, d.once = e, d.off = e, d.removeListener = e, d.removeAllListeners = e, d.emit = e, d.binding = function () {
                    throw new Error("process.binding is not supported");
                }, d.cwd = function () {
                    return "/";
                }, d.chdir = function () {
                    throw new Error("process.chdir is not supported");
                };
            }, {}], 9: [function (b, c) {
                !function (b, d) {
                    !function () {
                        "use strict";
                        function e(a) {
                            return "function" == typeof a || "object" == typeof a && null !== a;
                        }
                        function f(a) {
                            return "function" == typeof a;
                        }
                        function g(a) {
                            return "object" == typeof a && null !== a;
                        }
                        function k() {
                        }
                        function r() {
                            return function () {
                                b.nextTick(w);
                            };
                        }
                        function s() {
                            var a = 0, b = new p(w), c = document.createTextNode("");
                            return b.observe(c, { characterData: !0 }), function () {
                                c.data = a = ++a % 2;
                            };
                        }
                        function t() {
                            var a = new MessageChannel;
                            return a.port1.onmessage = w, function () {
                                a.port2.postMessage(0);
                            };
                        }
                        function u() {
                            return function () {
                                setTimeout(w, 1);
                            };
                        }
                        function w() {
                            for (var a = 0; m > a; a += 2) {
                                var b = v[a], c = v[a + 1];
                                b(c), v[a] = void 0, v[a + 1] = void 0;
                            }
                            m = 0;
                        }
                        function y() {
                        }
                        function D() {
                            return new TypeError("You cannot resolve a promise with itself");
                        }
                        function E() {
                            return new TypeError("A promises callback cannot return that same promise.");
                        }
                        function F(a) {
                            try  {
                                return a.then;
                            } catch (b) {
                                return C.error = b, C;
                            }
                        }
                        function G(a, b, c, d) {
                            try  {
                                a.call(b, c, d);
                            } catch (e) {
                                return e;
                            }
                        }
                        function H(a, b, c) {
                            n(function (a) {
                                var d = !1, e = G(c, b, function (c) {
                                    d || (d = !0, b !== c ? K(a, c) : M(a, c));
                                }, function (b) {
                                    d || (d = !0, N(a, b));
                                }, "Settle: " + (a._label || " unknown promise"));
                                !d && e && (d = !0, N(a, e));
                            }, a);
                        }
                        function I(a, b) {
                            b._state === A ? M(a, b._result) : a._state === B ? N(a, b._result) : O(b, void 0, function (b) {
                                K(a, b);
                            }, function (b) {
                                N(a, b);
                            });
                        }
                        function J(a, b) {
                            if (b.constructor === a.constructor)
                                I(a, b);
                            else {
                                var c = F(b);
                                c === C ? N(a, C.error) : void 0 === c ? M(a, b) : f(c) ? H(a, b, c) : M(a, b);
                            }
                        }
                        function K(a, b) {
                            a === b ? N(a, D()) : e(b) ? J(a, b) : M(a, b);
                        }
                        function L(a) {
                            a._onerror && a._onerror(a._result), P(a);
                        }
                        function M(a, b) {
                            a._state === z && (a._result = b, a._state = A, 0 === a._subscribers.length || n(P, a));
                        }
                        function N(a, b) {
                            a._state === z && (a._state = B, a._result = b, n(L, a));
                        }
                        function O(a, b, c, d) {
                            var e = a._subscribers, f = e.length;
                            a._onerror = null, e[f] = b, e[f + A] = c, e[f + B] = d, 0 === f && a._state && n(P, a);
                        }
                        function P(a) {
                            var b = a._subscribers, c = a._state;
                            if (0 !== b.length) {
                                for (var d, e, f = a._result, g = 0; g < b.length; g += 3)
                                    d = b[g], e = b[g + c], d ? T(c, d, e, f) : e(f);
                                a._subscribers.length = 0;
                            }
                        }
                        function Q() {
                            this.error = null;
                        }
                        function S(a, b) {
                            try  {
                                return a(b);
                            } catch (c) {
                                return R.error = c, R;
                            }
                        }
                        function T(a, b, c, d) {
                            var g, h, i, j, e = f(c);
                            if (e) {
                                if (g = S(c, d), g === R ? (j = !0, h = g.error, g = null) : i = !0, b === g)
                                    return N(b, E()), void 0;
                            } else
                                g = d, i = !0;
                            b._state !== z || (e && i ? K(b, g) : j ? N(b, h) : a === A ? M(b, g) : a === B && N(b, g));
                        }
                        function U(a, b) {
                            try  {
                                b(function (b) {
                                    K(a, b);
                                }, function (b) {
                                    N(a, b);
                                });
                            } catch (c) {
                                N(a, c);
                            }
                        }
                        function W(a, b, c, d) {
                            this._instanceConstructor = a, this.promise = new a(y, d), this._abortOnReject = c, this._validateInput(b) ? (this._input = b, this.length = b.length, this._remaining = b.length, this._init(), 0 === this.length ? M(this.promise, this._result) : (this.length = this.length || 0, this._enumerate(), 0 === this._remaining && M(this.promise, this._result))) : N(this.promise, this._validationError());
                        }
                        function bb() {
                            throw new TypeError("You must pass a resolver function as the first argument to the promise constructor");
                        }
                        function cb() {
                            throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
                        }
                        function eb(a, b) {
                            this._id = ab++, this._label = b, this._state = void 0, this._result = void 0, this._subscribers = [], y !== a && (f(a) || bb(), this instanceof eb || cb(), U(this, a));
                        }
                        var h;
                        h = Array.isArray ? Array.isArray : function (a) {
                            return "[object Array]" === Object.prototype.toString.call(a);
                        };
                        var i = h;
                        Date.now || function () {
                            return (new Date).getTime();
                        }, Object.create || function (a) {
                            if (arguments.length > 1)
                                throw new Error("Second argument not supported");
                            if ("object" != typeof a)
                                throw new TypeError("Argument must be an object");
                            return k.prototype = a, new k;
                        };
                        var x, m = 0, n = function (a, b) {
                            v[m] = a, v[m + 1] = b, m += 2, 2 === m && x();
                        }, o = "undefined" != typeof window ? window : {}, p = o.MutationObserver || o.WebKitMutationObserver, q = "undefined" != typeof Uint8ClampedArray && "undefined" != typeof importScripts && "undefined" != typeof MessageChannel, v = new Array(1e3);
                        x = "undefined" != typeof b && "[object process]" === {}.toString.call(b) ? r() : p ? s() : q ? t() : u();
                        var z = void 0, A = 1, B = 2, C = new Q, R = new Q;
                        W.prototype._validateInput = function (a) {
                            return i(a);
                        }, W.prototype._validationError = function () {
                            return new Error("Array Methods must be provided an Array");
                        }, W.prototype._init = function () {
                            this._result = new Array(this.length);
                        };
                        var X = W;
                        W.prototype._enumerate = function () {
                            for (var a = this.length, b = this.promise, c = this._input, d = 0; b._state === z && a > d; d++)
                                this._eachEntry(c[d], d);
                        }, W.prototype._eachEntry = function (a, b) {
                            var c = this._instanceConstructor;
                            g(a) ? a.constructor === c && a._state !== z ? (a._onerror = null, this._settledAt(a._state, b, a._result)) : this._willSettleAt(c.resolve(a), b) : (this._remaining--, this._result[b] = this._makeResult(A, b, a));
                        }, W.prototype._settledAt = function (a, b, c) {
                            var d = this.promise;
                            d._state === z && (this._remaining--, this._abortOnReject && a === B ? N(d, c) : this._result[b] = this._makeResult(a, b, c)), 0 === this._remaining && M(d, this._result);
                        }, W.prototype._makeResult = function (a, b, c) {
                            return c;
                        }, W.prototype._willSettleAt = function (a, b) {
                            var c = this;
                            O(a, void 0, function (a) {
                                c._settledAt(A, b, a);
                            }, function (a) {
                                c._settledAt(B, b, a);
                            });
                        };
                        var Y = function (a, b) {
                            return new X(this, a, !0, b).promise;
                        }, Z = function (a, b) {
                            function f(a) {
                                K(d, a);
                            }
                            function g(a) {
                                N(d, a);
                            }
                            var c = this, d = new c(y, b);
                            if (!i(a))
                                return N(d, new TypeError("You must pass an array to race.")), d;
                            for (var e = a.length, h = 0; d._state === z && e > h; h++)
                                O(c.resolve(a[h]), void 0, f, g);
                            return d;
                        }, $ = function (a, b) {
                            var c = this;
                            if (a && "object" == typeof a && a.constructor === c)
                                return a;
                            var d = new c(y, b);
                            return K(d, a), d;
                        }, _ = function (a, b) {
                            var c = this, d = new c(y, b);
                            return N(d, a), d;
                        }, ab = 0, db = eb;
                        eb.all = Y, eb.race = Z, eb.resolve = $, eb.reject = _, eb.prototype = { constructor: eb, then: function (a, b, c) {
                                var d = this, e = d._state;
                                if (e === A && !a || e === B && !b)
                                    return this;
                                d._onerror = null;
                                var f = new this.constructor(y, c), g = d._result;
                                if (e) {
                                    var h = arguments[e - 1];
                                    n(function () {
                                        T(e, f, h, g);
                                    });
                                } else
                                    O(d, f, a, b);
                                return f;
                            }, "catch": function (a, b) {
                                return this.then(null, a, b);
                            } };
                        var fb = function () {
                            var a;
                            a = "undefined" != typeof d ? d : "undefined" != typeof window && window.document ? window : self;
                            var b = "Promise" in a && "resolve" in a.Promise && "reject" in a.Promise && "all" in a.Promise && "race" in a.Promise && function () {
                                var b;
                                return new a.Promise(function (a) {
                                    b = a;
                                }), f(b);
                            }();
                            b || (a.Promise = db);
                        }, gb = { Promise: db, polyfill: fb };
                        "function" == typeof a && a.amd ? a(function () {
                            return gb;
                        }) : "undefined" != typeof c && c.exports ? c.exports = gb : "undefined" != typeof this && (this.ES6Promise = gb);
                    }.call(this);
                }.call(this, b("_process"), "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {});
            }, { _process: 8 }], 10: [function (a, b) {
                b.exports.Dispatcher = a("./lib/Dispatcher");
            }, { "./lib/Dispatcher": 11 }], 11: [function (a, b) {
                "use strict";
                function g() {
                    this.$Dispatcher_callbacks = {}, this.$Dispatcher_isPending = {}, this.$Dispatcher_isHandled = {}, this.$Dispatcher_isDispatching = !1, this.$Dispatcher_pendingPayload = null;
                }
                var d = a("./invariant"), e = 1, f = "ID_";
                g.prototype.register = function (a) {
                    var b = f + e++;
                    return this.$Dispatcher_callbacks[b] = a, b;
                }, g.prototype.unregister = function (a) {
                    d(this.$Dispatcher_callbacks[a], "Dispatcher.unregister(...): `%s` does not map to a registered callback.", a), delete this.$Dispatcher_callbacks[a];
                }, g.prototype.waitFor = function (a) {
                    d(this.$Dispatcher_isDispatching, "Dispatcher.waitFor(...): Must be invoked while dispatching.");
                    for (var b = 0; b < a.length; b++) {
                        var c = a[b];
                        this.$Dispatcher_isPending[c] ? d(this.$Dispatcher_isHandled[c], "Dispatcher.waitFor(...): Circular dependency detected while waiting for `%s`.", c) : (d(this.$Dispatcher_callbacks[c], "Dispatcher.waitFor(...): `%s` does not map to a registered callback.", c), this.$Dispatcher_invokeCallback(c));
                    }
                }, g.prototype.dispatch = function (a) {
                    d(!this.$Dispatcher_isDispatching, "Dispatch.dispatch(...): Cannot dispatch in the middle of a dispatch."), this.$Dispatcher_startDispatching(a);
                    try  {
                        for (var b in this.$Dispatcher_callbacks)
                            this.$Dispatcher_isPending[b] || this.$Dispatcher_invokeCallback(b);
                    } finally {
                        this.$Dispatcher_stopDispatching();
                    }
                }, g.prototype.isDispatching = function () {
                    return this.$Dispatcher_isDispatching;
                }, g.prototype.$Dispatcher_invokeCallback = function (a) {
                    this.$Dispatcher_isPending[a] = !0, this.$Dispatcher_callbacks[a](this.$Dispatcher_pendingPayload), this.$Dispatcher_isHandled[a] = !0;
                }, g.prototype.$Dispatcher_startDispatching = function (a) {
                    for (var b in this.$Dispatcher_callbacks)
                        this.$Dispatcher_isPending[b] = !1, this.$Dispatcher_isHandled[b] = !1;
                    this.$Dispatcher_pendingPayload = a, this.$Dispatcher_isDispatching = !0;
                }, g.prototype.$Dispatcher_stopDispatching = function () {
                    this.$Dispatcher_pendingPayload = null, this.$Dispatcher_isDispatching = !1;
                }, b.exports = g;
            }, { "./invariant": 12 }], 12: [function (a, b) {
                "use strict";
                var d = function (a, b, c, d, e, f, g, h) {
                    if (!a) {
                        var i;
                        if (void 0 === b)
                            i = new Error("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");
                        else {
                            var j = [c, d, e, f, g, h], k = 0;
                            i = new Error("Invariant Violation: " + b.replace(/%s/g, function () {
                                return j[k++];
                            }));
                        }
                        throw i.framesToPop = 1, i;
                    }
                };
                b.exports = d;
            }, {}], 13: [function (a, b) {
                "use strict";
                var d = function (a, b, c, d, e, f, g, h) {
                    if (!a) {
                        var i;
                        if (void 0 === b)
                            i = new Error("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");
                        else {
                            var j = [c, d, e, f, g, h], k = 0;
                            i = new Error("Invariant Violation: " + b.replace(/%s/g, function () {
                                return j[k++];
                            }));
                        }
                        throw i.framesToPop = 1, i;
                    }
                };
                b.exports = d;
            }, {}], 14: [function (a, b) {
                "use strict";
                function d(a) {
                    if (null == a)
                        throw new TypeError("Object.assign cannot be called with null or undefined");
                    return Object(a);
                }
                b.exports = Object.assign || function (a) {
                    for (var c, e, f, g = d(a), h = 1; h < arguments.length; h++) {
                        e = arguments[h], f = Object.keys(Object(e));
                        for (var i = 0; i < f.length; i++)
                            try  {
                                g[f[i]] = e[f[i]];
                            } catch (j) {
                                void 0 === c && (c = j);
                            }
                    }
                    if (c)
                        throw c;
                    return g;
                };
            }, {}] }, {}, [1])(1);
});
//# sourceMappingURL=mcfly.js.map
