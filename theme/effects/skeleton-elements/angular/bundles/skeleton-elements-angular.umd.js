(function (global, factory) {
        typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common')) :
        typeof define === 'function' && define.amd ? define('skeleton-elements/angular', ['exports', '@angular/core', '@angular/common'], factory) :
        (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global['skeleton-elements'] = global['skeleton-elements'] || {}, global['skeleton-elements'].angular = {}), global.ng.core, global.ng.common));
}(this, (function (exports, i0, i1) { 'use strict';

        function _interopNamespace(e) {
                if (e && e.__esModule) return e;
                var n = Object.create(null);
                if (e) {
                        Object.keys(e).forEach(function (k) {
                                if (k !== 'default') {
                                        var d = Object.getOwnPropertyDescriptor(e, k);
                                        Object.defineProperty(n, k, d.get ? d : {
                                                enumerable: true,
                                                get: function () {
                                                        return e[k];
                                                }
                                        });
                                }
                        });
                }
                n['default'] = e;
                return Object.freeze(n);
        }

        var i0__namespace = /*#__PURE__*/_interopNamespace(i0);
        var i1__namespace = /*#__PURE__*/_interopNamespace(i1);

        var SkeletonBlockComponent = /** @class */ (function () {
            function SkeletonBlockComponent() {
            }
            return SkeletonBlockComponent;
        }());
        SkeletonBlockComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.1", ngImport: i0__namespace, type: SkeletonBlockComponent, deps: [], target: i0__namespace.ɵɵFactoryTarget.Component });
        SkeletonBlockComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.1", type: SkeletonBlockComponent, selector: "skeleton-block", inputs: { width: "width", height: "height", effect: "effect", borderRadius: "borderRadius" }, host: { properties: { "class.skeleton-effect-fade": "effect === \"fade\"", "class.skeleton-effect-pulse": "effect === \"pulse\"", "class.skeleton-effect-wave": "effect === \"blink\" || effect === \"wave\"", "style.width": "width", "style.height": "height", "style.border-radius": "borderRadius" }, classAttribute: "skeleton-block" }, ngImport: i0__namespace, template: "<ng-content></ng-content>", isInline: true });
        i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.1", ngImport: i0__namespace, type: SkeletonBlockComponent, decorators: [{
                    type: i0.Component,
                    args: [{
                            selector: 'skeleton-block',
                            template: "<ng-content></ng-content>",
                            host: {
                                class: 'skeleton-block',
                                '[class.skeleton-effect-fade]': 'effect === "fade"',
                                '[class.skeleton-effect-pulse]': 'effect === "pulse"',
                                '[class.skeleton-effect-wave]': 'effect === "blink" || effect === "wave"',
                                '[style.width]': 'width',
                                '[style.height]': 'height',
                                '[style.border-radius]': 'borderRadius',
                            },
                        }]
                }], propDecorators: { width: [{
                        type: i0.Input
                    }], height: [{
                        type: i0.Input
                    }], effect: [{
                        type: i0.Input
                    }], borderRadius: [{
                        type: i0.Input
                    }] } });

        /*! *****************************************************************************
        Copyright (c) Microsoft Corporation.

        Permission to use, copy, modify, and/or distribute this software for any
        purpose with or without fee is hereby granted.

        THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
        REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
        AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
        INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
        LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
        OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
        PERFORMANCE OF THIS SOFTWARE.
        ***************************************************************************** */
        /* global Reflect, Promise */
        var extendStatics = function (d, b) {
            extendStatics = Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
                function (d, b) { for (var p in b)
                    if (Object.prototype.hasOwnProperty.call(b, p))
                        d[p] = b[p]; };
            return extendStatics(d, b);
        };
        function __extends(d, b) {
            if (typeof b !== "function" && b !== null)
                throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
            extendStatics(d, b);
            function __() { this.constructor = d; }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        }
        var __assign = function () {
            __assign = Object.assign || function __assign(t) {
                for (var s, i = 1, n = arguments.length; i < n; i++) {
                    s = arguments[i];
                    for (var p in s)
                        if (Object.prototype.hasOwnProperty.call(s, p))
                            t[p] = s[p];
                }
                return t;
            };
            return __assign.apply(this, arguments);
        };
        function __rest(s, e) {
            var t = {};
            for (var p in s)
                if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
                    t[p] = s[p];
            if (s != null && typeof Object.getOwnPropertySymbols === "function")
                for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                        t[p[i]] = s[p[i]];
                }
            return t;
        }
        function __decorate(decorators, target, key, desc) {
            var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
            if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
                r = Reflect.decorate(decorators, target, key, desc);
            else
                for (var i = decorators.length - 1; i >= 0; i--)
                    if (d = decorators[i])
                        r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
            return c > 3 && r && Object.defineProperty(target, key, r), r;
        }
        function __param(paramIndex, decorator) {
            return function (target, key) { decorator(target, key, paramIndex); };
        }
        function __metadata(metadataKey, metadataValue) {
            if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
                return Reflect.metadata(metadataKey, metadataValue);
        }
        function __awaiter(thisArg, _arguments, P, generator) {
            function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
            return new (P || (P = Promise))(function (resolve, reject) {
                function fulfilled(value) { try {
                    step(generator.next(value));
                }
                catch (e) {
                    reject(e);
                } }
                function rejected(value) { try {
                    step(generator["throw"](value));
                }
                catch (e) {
                    reject(e);
                } }
                function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
                step((generator = generator.apply(thisArg, _arguments || [])).next());
            });
        }
        function __generator(thisArg, body) {
            var _ = { label: 0, sent: function () { if (t[0] & 1)
                    throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
            return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function () { return this; }), g;
            function verb(n) { return function (v) { return step([n, v]); }; }
            function step(op) {
                if (f)
                    throw new TypeError("Generator is already executing.");
                while (_)
                    try {
                        if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
                            return t;
                        if (y = 0, t)
                            op = [op[0] & 2, t.value];
                        switch (op[0]) {
                            case 0:
                            case 1:
                                t = op;
                                break;
                            case 4:
                                _.label++;
                                return { value: op[1], done: false };
                            case 5:
                                _.label++;
                                y = op[1];
                                op = [0];
                                continue;
                            case 7:
                                op = _.ops.pop();
                                _.trys.pop();
                                continue;
                            default:
                                if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                                    _ = 0;
                                    continue;
                                }
                                if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                                    _.label = op[1];
                                    break;
                                }
                                if (op[0] === 6 && _.label < t[1]) {
                                    _.label = t[1];
                                    t = op;
                                    break;
                                }
                                if (t && _.label < t[2]) {
                                    _.label = t[2];
                                    _.ops.push(op);
                                    break;
                                }
                                if (t[2])
                                    _.ops.pop();
                                _.trys.pop();
                                continue;
                        }
                        op = body.call(thisArg, _);
                    }
                    catch (e) {
                        op = [6, e];
                        y = 0;
                    }
                    finally {
                        f = t = 0;
                    }
                if (op[0] & 5)
                    throw op[1];
                return { value: op[0] ? op[1] : void 0, done: true };
            }
        }
        var __createBinding = Object.create ? (function (o, m, k, k2) {
            if (k2 === undefined)
                k2 = k;
            Object.defineProperty(o, k2, { enumerable: true, get: function () { return m[k]; } });
        }) : (function (o, m, k, k2) {
            if (k2 === undefined)
                k2 = k;
            o[k2] = m[k];
        });
        function __exportStar(m, o) {
            for (var p in m)
                if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p))
                    __createBinding(o, m, p);
        }
        function __values(o) {
            var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
            if (m)
                return m.call(o);
            if (o && typeof o.length === "number")
                return {
                    next: function () {
                        if (o && i >= o.length)
                            o = void 0;
                        return { value: o && o[i++], done: !o };
                    }
                };
            throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
        }
        function __read(o, n) {
            var m = typeof Symbol === "function" && o[Symbol.iterator];
            if (!m)
                return o;
            var i = m.call(o), r, ar = [], e;
            try {
                while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
                    ar.push(r.value);
            }
            catch (error) {
                e = { error: error };
            }
            finally {
                try {
                    if (r && !r.done && (m = i["return"]))
                        m.call(i);
                }
                finally {
                    if (e)
                        throw e.error;
                }
            }
            return ar;
        }
        /** @deprecated */
        function __spread() {
            for (var ar = [], i = 0; i < arguments.length; i++)
                ar = ar.concat(__read(arguments[i]));
            return ar;
        }
        /** @deprecated */
        function __spreadArrays() {
            for (var s = 0, i = 0, il = arguments.length; i < il; i++)
                s += arguments[i].length;
            for (var r = Array(s), k = 0, i = 0; i < il; i++)
                for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                    r[k] = a[j];
            return r;
        }
        function __spreadArray(to, from, pack) {
            if (pack || arguments.length === 2)
                for (var i = 0, l = from.length, ar; i < l; i++) {
                    if (ar || !(i in from)) {
                        if (!ar)
                            ar = Array.prototype.slice.call(from, 0, i);
                        ar[i] = from[i];
                    }
                }
            return to.concat(ar || from);
        }
        function __await(v) {
            return this instanceof __await ? (this.v = v, this) : new __await(v);
        }
        function __asyncGenerator(thisArg, _arguments, generator) {
            if (!Symbol.asyncIterator)
                throw new TypeError("Symbol.asyncIterator is not defined.");
            var g = generator.apply(thisArg, _arguments || []), i, q = [];
            return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
            function verb(n) { if (g[n])
                i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
            function resume(n, v) { try {
                step(g[n](v));
            }
            catch (e) {
                settle(q[0][3], e);
            } }
            function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
            function fulfill(value) { resume("next", value); }
            function reject(value) { resume("throw", value); }
            function settle(f, v) { if (f(v), q.shift(), q.length)
                resume(q[0][0], q[0][1]); }
        }
        function __asyncDelegator(o) {
            var i, p;
            return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
            function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
        }
        function __asyncValues(o) {
            if (!Symbol.asyncIterator)
                throw new TypeError("Symbol.asyncIterator is not defined.");
            var m = o[Symbol.asyncIterator], i;
            return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
            function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
            function settle(resolve, reject, d, v) { Promise.resolve(v).then(function (v) { resolve({ value: v, done: d }); }, reject); }
        }
        function __makeTemplateObject(cooked, raw) {
            if (Object.defineProperty) {
                Object.defineProperty(cooked, "raw", { value: raw });
            }
            else {
                cooked.raw = raw;
            }
            return cooked;
        }
        ;
        var __setModuleDefault = Object.create ? (function (o, v) {
            Object.defineProperty(o, "default", { enumerable: true, value: v });
        }) : function (o, v) {
            o["default"] = v;
        };
        function __importStar(mod) {
            if (mod && mod.__esModule)
                return mod;
            var result = {};
            if (mod != null)
                for (var k in mod)
                    if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
                        __createBinding(result, mod, k);
            __setModuleDefault(result, mod);
            return result;
        }
        function __importDefault(mod) {
            return (mod && mod.__esModule) ? mod : { default: mod };
        }
        function __classPrivateFieldGet(receiver, state, kind, f) {
            if (kind === "a" && !f)
                throw new TypeError("Private accessor was defined without a getter");
            if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
                throw new TypeError("Cannot read private member from an object whose class did not declare it");
            return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
        }
        function __classPrivateFieldSet(receiver, state, value, kind, f) {
            if (kind === "m")
                throw new TypeError("Private method is not writable");
            if (kind === "a" && !f)
                throw new TypeError("Private accessor was defined without a setter");
            if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
                throw new TypeError("Cannot write private member to an object whose class did not declare it");
            return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
        }

        function multiplySvgPointsService(points, iconSize, width, height) {
            var iconMaxSize = Math.min(width, height) * 0.5;
            var scale = iconMaxSize / iconSize;
            return points.replace(/([0-9,\.]{1,})/g, function (coords) {
                var _a = __read(coords.split(',').map(function (p) { return parseFloat(p); }), 2), _x = _a[0], _y = _a[1];
                var x = _x * scale + width / 2 - (iconSize * scale) / 2;
                var y = _y * scale + height / 2 - (iconSize * scale) / 2;
                if (iconMaxSize >= 100) {
                    return Math.round(x) + "," + Math.round(y);
                }
                return x + "," + y;
            });
        }

        var SkeletonAvatarComponent = /** @class */ (function () {
            function SkeletonAvatarComponent() {
                this.size = 48;
                this.showIcon = true;
                this.borderRadius = '50%';
            }
            SkeletonAvatarComponent.prototype.multiplyPoints = function (pointsString) {
                return multiplySvgPointsService(pointsString, 56, this.size, this.size);
            };
            return SkeletonAvatarComponent;
        }());
        SkeletonAvatarComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.1", ngImport: i0__namespace, type: SkeletonAvatarComponent, deps: [], target: i0__namespace.ɵɵFactoryTarget.Component });
        SkeletonAvatarComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.1", type: SkeletonAvatarComponent, selector: "skeleton-avatar", inputs: { size: "size", color: "color", showIcon: "showIcon", iconColor: "iconColor", borderRadius: "borderRadius", effect: "effect" }, host: { properties: { "class.skeleton-effect-fade": "effect === \"fade\"", "class.skeleton-effect-pulse": "effect === \"pulse\"", "class.skeleton-effect-wave": "effect === \"blink\" || effect === \"wave\"" }, classAttribute: "skeleton-avatar" }, ngImport: i0__namespace, template: "<svg\n      xmlns=\"http://www.w3.org/2000/svg\"\n      [attr.width]=\"size\"\n      [attr.height]=\"size\"\n      [attr.viewBox]=\"'0 0 ' + size + ' ' + size\"\n      preserveAspectRatio=\"none\"\n    >\n      <rect\n        [attr.width]=\"size\"\n        [attr.height]=\"size\"\n        fillRule=\"evenodd\"\n        [style.fill]=\"color\"\n        [attr.rx]=\"borderRadius\"\n      />\n      <path\n        *ngIf=\"showIcon\"\n        [style.fill]=\"iconColor\"\n        [attr.d]=\"\n          multiplyPoints(\n            'M28.22461,27.1590817 C34.9209931,27.1590817 40.6829044,21.1791004 40.6829044,13.3926332 C40.6829044,5.69958662 34.8898972,0 28.22461,0 C21.5594557,0 15.7663156,5.82423601 15.7663156,13.4549579 C15.7663156,21.1791004 21.5594557,27.1590817 28.22461,27.1590817 Z M8.66515427,56 L47.7841986,56 C52.6739629,56 54.4181241,54.5984253 54.4181241,51.8576005 C54.4181241,43.8219674 44.358068,32.7341519 28.22461,32.7341519 C12.0600561,32.7341519 2,43.8219674 2,51.8576005 C2,54.5984253 3.74402832,56 8.66515427,56 Z'\n          )\n        \"\n      />\n    </svg>\n    <ng-content></ng-content>", isInline: true, directives: [{ type: i1__namespace.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] });
        i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.1", ngImport: i0__namespace, type: SkeletonAvatarComponent, decorators: [{
                    type: i0.Component,
                    args: [{
                            selector: 'skeleton-avatar',
                            host: {
                                class: 'skeleton-avatar',
                                '[class.skeleton-effect-fade]': 'effect === "fade"',
                                '[class.skeleton-effect-pulse]': 'effect === "pulse"',
                                '[class.skeleton-effect-wave]': 'effect === "blink" || effect === "wave"',
                            },
                            template: "<svg\n      xmlns=\"http://www.w3.org/2000/svg\"\n      [attr.width]=\"size\"\n      [attr.height]=\"size\"\n      [attr.viewBox]=\"'0 0 ' + size + ' ' + size\"\n      preserveAspectRatio=\"none\"\n    >\n      <rect\n        [attr.width]=\"size\"\n        [attr.height]=\"size\"\n        fillRule=\"evenodd\"\n        [style.fill]=\"color\"\n        [attr.rx]=\"borderRadius\"\n      />\n      <path\n        *ngIf=\"showIcon\"\n        [style.fill]=\"iconColor\"\n        [attr.d]=\"\n          multiplyPoints(\n            'M28.22461,27.1590817 C34.9209931,27.1590817 40.6829044,21.1791004 40.6829044,13.3926332 C40.6829044,5.69958662 34.8898972,0 28.22461,0 C21.5594557,0 15.7663156,5.82423601 15.7663156,13.4549579 C15.7663156,21.1791004 21.5594557,27.1590817 28.22461,27.1590817 Z M8.66515427,56 L47.7841986,56 C52.6739629,56 54.4181241,54.5984253 54.4181241,51.8576005 C54.4181241,43.8219674 44.358068,32.7341519 28.22461,32.7341519 C12.0600561,32.7341519 2,43.8219674 2,51.8576005 C2,54.5984253 3.74402832,56 8.66515427,56 Z'\n          )\n        \"\n      />\n    </svg>\n    <ng-content></ng-content>",
                        }]
                }], propDecorators: { size: [{
                        type: i0.Input
                    }], color: [{
                        type: i0.Input
                    }], showIcon: [{
                        type: i0.Input
                    }], iconColor: [{
                        type: i0.Input
                    }], borderRadius: [{
                        type: i0.Input
                    }], effect: [{
                        type: i0.Input
                    }] } });

        var SkeletonTextDirective = /** @class */ (function () {
            function SkeletonTextDirective() {
            }
            return SkeletonTextDirective;
        }());
        SkeletonTextDirective.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.1", ngImport: i0__namespace, type: SkeletonTextDirective, deps: [], target: i0__namespace.ɵɵFactoryTarget.Directive });
        SkeletonTextDirective.ɵdir = i0__namespace.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.1.1", type: SkeletonTextDirective, selector: "[skeleton-text]", inputs: { effect: "effect" }, host: { properties: { "class.skeleton-effect-fade": "effect === \"fade\"", "class.skeleton-effect-pulse": "effect === \"pulse\"", "class.skeleton-effect-wave": "effect === \"blink\" || effect === \"wave\"" }, classAttribute: "skeleton-text" }, ngImport: i0__namespace });
        i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.1", ngImport: i0__namespace, type: SkeletonTextDirective, decorators: [{
                    type: i0.Directive,
                    args: [{
                            selector: '[skeleton-text]',
                            host: {
                                class: 'skeleton-text',
                                '[class.skeleton-effect-fade]': 'effect === "fade"',
                                '[class.skeleton-effect-pulse]': 'effect === "pulse"',
                                '[class.skeleton-effect-wave]': 'effect === "blink" || effect === "wave"',
                            },
                        }]
                }], ctorParameters: function () { return []; }, propDecorators: { effect: [{
                        type: i0.Input
                    }] } });

        var SkeletonImageComponent = /** @class */ (function () {
            function SkeletonImageComponent() {
                this.width = 1200;
                this.height = 600;
                this.showIcon = true;
            }
            SkeletonImageComponent.prototype.multiplyPoints = function (pointsString) {
                return multiplySvgPointsService(pointsString, 56, this.width, this.height);
            };
            return SkeletonImageComponent;
        }());
        SkeletonImageComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.1", ngImport: i0__namespace, type: SkeletonImageComponent, deps: [], target: i0__namespace.ɵɵFactoryTarget.Component });
        SkeletonImageComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.1", type: SkeletonImageComponent, selector: "skeleton-image", inputs: { width: "width", height: "height", color: "color", showIcon: "showIcon", iconColor: "iconColor", effect: "effect", borderRadius: "borderRadius" }, host: { properties: { "class.skeleton-effect-fade": "effect === \"fade\"", "class.skeleton-effect-pulse": "effect === \"pulse\"", "class.skeleton-effect-wave": "effect === \"blink\" || effect === \"wave\"" }, classAttribute: "skeleton-image" }, ngImport: i0__namespace, template: "<svg\n      xmlns=\"http://www.w3.org/2000/svg\"\n      [attr.width]=\"width\"\n      [attr.height]=\"height\"\n      [attr.viewBox]=\"'0 0 ' + width + ' ' + height\"\n      [style.border-radius]=\"borderRadius\"\n      preserveAspectRatio=\"none\"\n    >\n      <polygon\n        [style.fill]=\"color\"\n        fillRule=\"evenodd\"\n        [attr.points]=\"\n          '0 0 ' + width + ' 0 ' + width + ' ' + height + ' 0 ' + height\n        \"\n      />\n      <path\n        *ngIf=\"showIcon\"\n        [style.fill]=\"iconColor\"\n        [attr.d]=\"\n          multiplyPoints(\n            'M7.7148,49.5742 L48.2852,49.5742 C53.1836,49.5742 55.6446,47.1367 55.6446,42.3086 L55.6446,13.6914 C55.6446,8.8633 53.1836,6.4258 48.2852,6.4258 L7.7148,6.4258 C2.8398,6.4258 0.3554,8.8398 0.3554,13.6914 L0.3554,42.3086 C0.3554,47.1602 2.8398,49.5742 7.7148,49.5742 Z M39.2851,27.9414 C38.2304,27.0039 37.0351,26.5118 35.7695,26.5118 C34.457,26.5118 33.3085,26.9571 32.2304,27.918 L21.6366,37.3867 L17.3007,33.4492 C16.3163,32.582 15.2617,32.1133 14.1366,32.1133 C13.1054,32.1133 12.0976,32.5586 11.1366,33.4258 L4.1288,39.7305 L4.1288,13.8789 C4.1288,11.4414 5.4413,10.1992 7.7851,10.1992 L48.2147,10.1992 C50.535,10.1992 51.8708,11.4414 51.8708,13.8789 L51.8708,39.7539 L39.2851,27.9414 Z M17.8163,28.1992 C20.8398,28.1992 23.3241,25.7149 23.3241,22.668 C23.3241,19.6445 20.8398,17.1367 17.8163,17.1367 C14.7695,17.1367 12.2851,19.6445 12.2851,22.668 C12.2851,25.7149 14.7695,28.1992 17.8163,28.1992 Z'\n          )\n        \"\n      />\n    </svg>\n    <ng-content></ng-content>", isInline: true, directives: [{ type: i1__namespace.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] });
        i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.1", ngImport: i0__namespace, type: SkeletonImageComponent, decorators: [{
                    type: i0.Component,
                    args: [{
                            selector: 'skeleton-image',
                            host: {
                                class: 'skeleton-image',
                                '[class.skeleton-effect-fade]': 'effect === "fade"',
                                '[class.skeleton-effect-pulse]': 'effect === "pulse"',
                                '[class.skeleton-effect-wave]': 'effect === "blink" || effect === "wave"',
                            },
                            template: "<svg\n      xmlns=\"http://www.w3.org/2000/svg\"\n      [attr.width]=\"width\"\n      [attr.height]=\"height\"\n      [attr.viewBox]=\"'0 0 ' + width + ' ' + height\"\n      [style.border-radius]=\"borderRadius\"\n      preserveAspectRatio=\"none\"\n    >\n      <polygon\n        [style.fill]=\"color\"\n        fillRule=\"evenodd\"\n        [attr.points]=\"\n          '0 0 ' + width + ' 0 ' + width + ' ' + height + ' 0 ' + height\n        \"\n      />\n      <path\n        *ngIf=\"showIcon\"\n        [style.fill]=\"iconColor\"\n        [attr.d]=\"\n          multiplyPoints(\n            'M7.7148,49.5742 L48.2852,49.5742 C53.1836,49.5742 55.6446,47.1367 55.6446,42.3086 L55.6446,13.6914 C55.6446,8.8633 53.1836,6.4258 48.2852,6.4258 L7.7148,6.4258 C2.8398,6.4258 0.3554,8.8398 0.3554,13.6914 L0.3554,42.3086 C0.3554,47.1602 2.8398,49.5742 7.7148,49.5742 Z M39.2851,27.9414 C38.2304,27.0039 37.0351,26.5118 35.7695,26.5118 C34.457,26.5118 33.3085,26.9571 32.2304,27.918 L21.6366,37.3867 L17.3007,33.4492 C16.3163,32.582 15.2617,32.1133 14.1366,32.1133 C13.1054,32.1133 12.0976,32.5586 11.1366,33.4258 L4.1288,39.7305 L4.1288,13.8789 C4.1288,11.4414 5.4413,10.1992 7.7851,10.1992 L48.2147,10.1992 C50.535,10.1992 51.8708,11.4414 51.8708,13.8789 L51.8708,39.7539 L39.2851,27.9414 Z M17.8163,28.1992 C20.8398,28.1992 23.3241,25.7149 23.3241,22.668 C23.3241,19.6445 20.8398,17.1367 17.8163,17.1367 C14.7695,17.1367 12.2851,19.6445 12.2851,22.668 C12.2851,25.7149 14.7695,28.1992 17.8163,28.1992 Z'\n          )\n        \"\n      />\n    </svg>\n    <ng-content></ng-content>",
                        }]
                }], propDecorators: { width: [{
                        type: i0.Input
                    }], height: [{
                        type: i0.Input
                    }], color: [{
                        type: i0.Input
                    }], showIcon: [{
                        type: i0.Input
                    }], iconColor: [{
                        type: i0.Input
                    }], effect: [{
                        type: i0.Input
                    }], borderRadius: [{
                        type: i0.Input
                    }] } });

        var SkeletonElementsModule = /** @class */ (function () {
            function SkeletonElementsModule() {
            }
            return SkeletonElementsModule;
        }());
        SkeletonElementsModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.1", ngImport: i0__namespace, type: SkeletonElementsModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
        SkeletonElementsModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.1", ngImport: i0__namespace, type: SkeletonElementsModule, declarations: [SkeletonBlockComponent,
                SkeletonAvatarComponent,
                SkeletonTextDirective,
                SkeletonImageComponent], imports: [i1.CommonModule], exports: [SkeletonBlockComponent,
                SkeletonAvatarComponent,
                SkeletonTextDirective,
                SkeletonImageComponent] });
        SkeletonElementsModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.1", ngImport: i0__namespace, type: SkeletonElementsModule, imports: [[i1.CommonModule]] });
        i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.1", ngImport: i0__namespace, type: SkeletonElementsModule, decorators: [{
                    type: i0.NgModule,
                    args: [{
                            declarations: [
                                SkeletonBlockComponent,
                                SkeletonAvatarComponent,
                                SkeletonTextDirective,
                                SkeletonImageComponent,
                            ],
                            exports: [
                                SkeletonBlockComponent,
                                SkeletonAvatarComponent,
                                SkeletonTextDirective,
                                SkeletonImageComponent,
                            ],
                            imports: [i1.CommonModule],
                        }]
                }] });

        /*
         * Public API Surface of angular
         */

        /**
         * Generated bundle index. Do not edit.
         */

        exports.SkeletonAvatarComponent = SkeletonAvatarComponent;
        exports.SkeletonBlockComponent = SkeletonBlockComponent;
        exports.SkeletonElementsModule = SkeletonElementsModule;
        exports.SkeletonImageComponent = SkeletonImageComponent;
        exports.SkeletonTextDirective = SkeletonTextDirective;

        Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=skeleton-elements-angular.umd.js.map
