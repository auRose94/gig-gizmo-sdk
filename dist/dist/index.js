"use strict";
!function (e, t) { for (var r in t)
    e[r] = t[r]; }(this, function (e) { var t = {}; function r(n) { if (t[n])
    return t[n].exports; var i = t[n] = { i: n, l: !1, exports: {} }; return e[n].call(i.exports, i, i.exports, r), i.l = !0, i.exports; } return r.m = e, r.c = t, r.d = function (e, t, n) { r.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: n }); }, r.r = function (e) { "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(e, "__esModule", { value: !0 }); }, r.t = function (e, t) { if (1 & t && (e = r(e)), 8 & t)
    return e; if (4 & t && "object" == typeof e && e && e.__esModule)
    return e; var n = Object.create(null); if (r.r(n), Object.defineProperty(n, "default", { enumerable: !0, value: e }), 2 & t && "string" != typeof e)
    for (var i in e)
        r.d(n, i, function (t) { return e[t]; }.bind(null, i)); return n; }, r.n = function (e) { var t = e && e.__esModule ? function () { return e.default; } : function () { return e; }; return r.d(t, "a", t), t; }, r.o = function (e, t) { return Object.prototype.hasOwnProperty.call(e, t); }, r.p = "", r(r.s = 38); }([function (e, t, r) { e.exports = r(39)(); }, function (e, t, r) {
        "use strict";
        r.d(t, "a", function () { return s; });
        var n = r(2), i = r(12);
        class s {
            constructor(e, t) { this.expiration = (new Date).getTime() + 36e5; const r = this; this.changes = new Object, this.document = t || new Object, e.forEach(e => { Object.defineProperty(r, e, { get: () => { const t = r.changes[e]; return void 0 !== t ? t : r.document[e]; }, set: t => { r.document[e] !== t && (r.changes[e] = t, r.changes.dateModified = (new Date).toISOString()); }, enumerable: !0, configurable: !0 }); }); }
            get id() { return this.changes._id || this._id; }
            set id(e) { this._id !== e && e && (this.changes._id = e, this.changes.dateModified = (new Date).toISOString()); }
            static CacheGet(e) { if ("string" == typeof e && s.Cache.has(e)) {
                const t = s.Cache.get(e);
                if (t && new Date(t.expiration) < new Date)
                    return t;
            } return null; }
            static CacheSet(e) { return e._id && s.isValidId(e._id) ? (s.Cache.set(e._id, e), e) : e; }
            static CacheRemove(e) { s.Cache.delete(e); }
            static async deduceModelAndName(e) { if (null === e)
                throw new Error("Model Name or Model Missing"); let t = null, r = null; if ("string" == typeof e)
                t = await Object(i.a)(e), r = e;
            else {
                if ("function" != typeof e)
                    throw new Error(`Invalid first agument, expected string or function, got ${e}`);
                t = e, r = s.getModelName(e);
            } if ("string" != typeof r)
                throw new Error(`Missing model name from ${t}`); if ("function" != typeof t)
                throw new Error(`Model name (${r}) did not map to constructor`); return { Model: t, modelName: r }; }
            static getModelName(e) { return e && e.ModelName ? e.ModelName : e && e.constructor && e.constructor.ModelName ? e.constructor.ModelName : ""; }
            static isValidId(e) { const t = RegExp("^([0-9a-fA-F]{24}|[0-9a-fA-F]{12})$", "g"); return "string" == typeof e && t.test(e); }
            static async findByIdBase(e, t) { if (s.isValidId(t)) {
                const r = s.CacheGet(t);
                if (r)
                    return r;
                {
                    let r = null;
                    const { Model: i, modelName: a } = await s.deduceModelAndName(e);
                    if (n.a.useSocketIO && n.a.ShouldUseSocketIO && (r = await new Promise((e, r) => n.a.getSocket().then(r => { r && r.emit(`/API/${a}/Retreive`, t, e); }, r))), r || (r = await n.a.call("GET", `/API/${a}/${t}`, null)), r && s.isValidId(r._id))
                        return r = new i(r), s.Cache.set(r._id, r), r;
                }
            } return null; }
            static async findOneBase(e, t = {}) { if (null === t && (t = {}), 1 === Array.from(Object.keys(t)).length && "string" == typeof t._id) {
                const e = t._id, r = s.CacheGet(e);
                if (r)
                    return r;
            } let r = null; const { Model: i, modelName: a } = await s.deduceModelAndName(e), o = `/API/${a}/FindOne`; if (n.a.useSocketIO && n.a.ShouldUseSocketIO) {
                const e = await n.a.getSocket();
                e && (r = await new Promise((r, n) => { try {
                    e.emit(o, t, r);
                }
                catch (e) {
                    n(e);
                } }));
            } return r || (r = await n.a.call("GET", o, t)), r && s.isValidId(r._id) ? (r = new i(r), s.CacheSet(r), r) : null; }
            static async findManyBase(e, t = {}) { if (null === t && (t = {}), 1 === Array.from(Object.keys(t)).length && Array.isArray(t._id || t.id)) {
                const e = [];
                if ((t._id || t.id).forEach(t => { const r = s.CacheGet(t); r && e.push(r); }), e.length === (t._id || t.id))
                    return e;
            } let r = null; const { Model: i, modelName: a } = await s.deduceModelAndName(e), o = `/API/${a}/FindMany`; return n.a.useSocketIO && n.a.ShouldUseSocketIO && (r = await new Promise((e, r) => n.a.getSocket().then(r => { r && r.emit(o, t, e); }, r))), t = t || {}, r || (r = await n.a.call("GET", o, t)), Array.isArray(r) ? r.map(e => { const t = new i(e); return s.CacheSet(t), t; }) : []; }
            clearChanges() { this.changes = new Object; }
            toObject() { const e = this.isValid() ? { ...this.document, ...this.changes } : null; return "object" == typeof e && e && void 0 !== e._id && (e._id = `${e._id}`), e; }
            toString() { const e = this.toObject(); return JSON.stringify(e); }
            anyErrors() { return void 0 === this.document._id ? new Error("_id is undefined") : this.document._id && !s.isValidId(this.document._id) ? new Error(`Invalid id: ${this.document._id}`) : void 0 === this.document.dateModified ? new Error("dateModified is undefined") : this.document.dateModified && isNaN(Date.parse(this.document.dateModified)) ? new Error(`Invalid dateModified: ${this.document.dateModified}`) : void 0 === this.document.dateCreated ? new Error("dateCreated is undefined") : this.document.dateCreated && isNaN(Date.parse(this.document.dateCreated)) ? new Error(`Invalid dateCreated: ${this.document.dateCreated}`) : this.changes._id && !s.isValidId(this.changes._id) ? new Error(`Invalid id: ${this.changes._id}`) : this.changes.dateModified && isNaN(Date.parse(this.changes.dateModified)) ? new Error(`Invalid dateModified: ${this.changes.dateModified}`) : this.changes.dateCreated && isNaN(Date.parse(this.changes.dateCreated)) ? new Error(`Invalid dateCreated: ${this.changes.dateCreated}`) : null; }
            isValid() { try {
                const e = this.anyErrors();
                if (e)
                    throw e;
            }
            catch (e) {
                return !1;
            } return !0; }
            assign(e = {}) { return Object.assign(this.changes, e), this; }
            async save() { const e = this.constructor.ModelName; let t = null; const r = this._id || null, i = this.changes; if (Object.keys(this.changes).forEach(e => { i[e] === this.document[e] && delete i[e]; }), i._id = this.changes._id || this._id || void 0, (t = n.a.useSocketIO && n.a.ShouldUseSocketIO ? s.isValidId(r) ? await new Promise((t, r) => n.a.getSocket().then(r => { r && r.emit(`/API/${e}/Update`, i, t); }, r)) : await new Promise((t, r) => n.a.getSocket().then(r => { r && r.emit(`/API/${e}/Create`, i, t); }, r)) : s.isValidId(r) ? await n.a.call("PUT", `/API/${e}/${r}`, i) : await n.a.call("POST", `/API/${e}/`, i)) && t._id)
                return Object.assign(this, t), this.clearChanges(), s.CacheSet(this), this; throw new Error(`returned ${t}`); }
            async remove() { const e = this._id || ""; if (s.isValidId(e)) {
                const t = this.constructor.ModelName;
                return n.a.useSocketIO && n.a.ShouldUseSocketIO ? await new Promise((r, i) => n.a.getSocket().then(n => { n && n.emit(`/API/${t}/Delete`, e, e => r(e)); }, i)) : await n.a.call("DELETE", `/API/${t}/${e}`, null), s.CacheRemove(e), this;
            } throw new Error(`Invalid id: ${e}`); }
        }
        s.ModelName = "RESTModel", s.Cache = new Map;
    }, function (e, t, r) {
        "use strict";
        r.d(t, "a", function () { return c; });
        var n = r(36), i = r.n(n), s = r(20), a = r(37), o = r.n(a), d = r(12);
        class c {
            constructor() { throw new Error("Cannot instantiate."); }
            static get expires() { if (!c._expires && c._token) {
                let e = null;
                c.LocalStorageSupported && (e = localStorage.getItem("expires")), c._expires = e ? new Date(e) : new Date;
            } return c._expires; }
            static set expires(e) { c._expires = e, null === e && c.LocalStorageSupported ? localStorage.removeItem("expires") : c.LocalStorageSupported && c._expires && localStorage.setItem("expires", c._expires.toISOString()); }
            static get token() { const e = new Date; if (c.expires && e > c.expires)
                return c._token = null, c.LocalStorageSupported && localStorage.removeItem("token"), null; if (!c._token && c.LocalStorageSupported) {
                const e = localStorage.getItem("token");
                e && "" !== e && (c._token = JSON.parse(e));
            } return !c._token && "undefined" != typeof document && document.cookie && (c._token = Object(s.parse)(document.cookie)["gig-gizmo-token"]), c._token && c.LocalStorageSupported && localStorage.setItem("token", JSON.stringify(c._token)), c._token; }
            static set token(e) { if ("string" == typeof e && 124 !== e.length && null !== e)
                throw new Error(`Token is not valid: ${e}`); "string" == typeof e && 0 !== e.length ? (c.LocalStorageSupported && localStorage.setItem("token", JSON.stringify(e)), c._token = e) : (c.LocalStorageSupported && localStorage.removeItem("token"), c._token = null), "undefined" != typeof document && (document.cookie = Object(s.serialize)("gig-gizmo-token", c._token || "", { path: "/", sameSite: "strict" })); }
            static get rootURL() { let e = ""; return c.secure ? e += "https://" : e += "http://", e += `${c.hostname}`, 80 === c.port || c.secure ? 443 !== c.securePort && c.secure && (e += `:${c.securePort}`) : e += `:${c.port}`, e; }
            static get webSocketRootURL() { let e = ""; return c.secure ? e += "wss://" : e += "ws://", e += `${c.hostname}`, 80 === c.port || c.secure ? 443 !== c.securePort && c.secure && (e += `:${c.securePort}`) : e += `:${c.port}`, e; }
            static async deserializeData(e) { try {
                if ("object" == typeof e && e && "string" == typeof e._id && "string" == typeof e.ModelName)
                    return new (await Object(d.a)(e.ModelName))(e);
            }
            catch (e) {
                console.error(e);
            } try {
                if (Array.isArray(e) && e.length > 0 && e.every(e => Array.isArray(e) && 2 === e.length && "string" == typeof e[0] && "object" == typeof e[1] && e[1] && "string" == typeof e[1]._id && "string" == typeof e[1].ModelName)) {
                    const t = new Map, r = e.map(async (e) => { const [r, n] = e; let i = null; "object" == typeof n && n && (i = await c.deserializeData(n)), t.set(r, i); });
                    return await Promise.all(r), t;
                }
            }
            catch (e) {
                console.error(e);
            } try {
                if (Array.isArray(e) && e.length > 0 && e.every(e => "object" == typeof e && e && "string" == typeof e._id && "string" == typeof e.ModelName))
                    return Promise.all(e.map(e => c.deserializeData(e)));
            }
            catch (e) {
                console.error(e);
            } try {
                if ("object" == typeof e && e && !Array.isArray(e)) {
                    const t = {}, r = [];
                    return Object.entries(e).forEach(([e, r]) => { "object" == typeof r && r ? c.deserializeData(r).then(r => { t[e] = r; }) : t[e] = r; }), await Promise.all(r), t;
                }
            }
            catch (e) {
                console.error(e);
            } return e; }
            static async call(e, t, r) { const n = { data: null, headers: { "x-gig-gizmo-token": c.token ? c._token : null }, method: e.toLowerCase(), params: null, responseType: "json", url: `${c.rootURL}${t}`, xsrfCookieName: "gig-gizmo-token", xsrfHeaderName: "x-gig-gizmo-token" }; if (r && ("HEAD" === e || "GET" === e ? n.params = r : n.data = r), !c.Axios)
                throw new Error("Set Axios in GigGizmo API."); try {
                const e = await c.Axios(n);
                if (e.data)
                    return e.data;
                if (e.statusText)
                    return e.statusText;
                if (e.status)
                    return null;
            }
            catch (e) {
                return console.error(e), null;
            } }
            static async getSocket() { const e = e => { e && console.error(e), c.webSocket && c.webSocket.open(); }, t = () => (!c.webSocket && c.SocketIO && (c.webSocket = c.SocketIO(), c.webSocket.on("connect_timeout", e), c.webSocket.on("connect_error", e), c.webSocket.on("disconnect", e), c.webSocket.on("error", e), c.webSocket.open()), c.webSocket); if (c.SocketIO) {
                if ("undefined" == typeof document)
                    return t();
                switch (document.readyState) {
                    case "loading": return await new Promise(e => { document.addEventListener("DOMContentLoaded", e); }), t();
                    case "interactive":
                    case "complete": return t();
                    default: throw new Error(`Unexpected readyState: ${document.readyState}`);
                }
            } return null; }
        }
        c.SocketIO = o.a, c.Axios = i.a, c.SessionStorageSupported = "undefined" != typeof Storage, c.LocalStorageSupported = "undefined" != typeof window && void 0 !== window.localStorage, c.ShouldUseSocketIO = !0, c.dev = !1, c.secure = !c.dev, c.port = 80, c.securePort = 443, c.hostname = "giggizmo.com", c._token = null, c._expires = null, c.useSocketIO = !1, c.webSocket = null, void 0 !== c.Axios && c.Axios && (c.Axios.defaults.withCredentials = !0);
    }, function (e, t, r) {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 });
    }, function (e, t, r) {
        "use strict";
        r.r(t), r.d(t, "User", function () { return h; });
        r(3);
        var n = r(2), i = r(9), s = r(13), a = r(6), o = r(7), d = r(1), c = r(15), u = r(16), l = r(8), f = r(5), g = r(11);
        class h extends d.a {
            constructor(e) { super(["icon", "firstName", "middleName", "lastName", "birthday", "country", "bandManager", "venueManager", "password", "confirmPassword", "betaFeatureUser", "sendAnonymousReports", "sendErrorReports", "sendEmails", "sendPromotions", "useCookies", "description", "active", "paypal", "facebook", "twitter", "emailVerified", "canFind", "payment", "verificationSecret", "admin", "attempts", "lastLogin", "lastLoginIP", "options", "connections", "blocked", "email", "hash", "salt", "onlineStatus", "ModelName", "_id", "dateCreated", "dateModified"], e); }
            get fullName() { return `${this.firstName || ""} ${this.middleName || ""} ${this.lastName || ""}`; }
            static verifyEmail(e, t) { return n.a.call("GET", "/API/User/Verify", { id: e, secret: t }); }
            static sendEmailVerification() { return n.a.call("POST", "/API/User/Verify", null); }
            static getAllConversations() { return d.a.findManyBase(s.Conversation, null); }
            static getAllNotifications() { return d.a.findManyBase(c.Notification, null); }
            static getAllPosts() { return d.a.findManyBase(u.Post, null); }
            static getAllBands() { return d.a.findManyBase(i.Band, null); }
            static getAllVenues() { return d.a.findManyBase(g.Venue, null); }
            static getAllGigs() { return d.a.findManyBase(o.Gig, null); }
            static getAllUploads() { return d.a.findManyBase(f.Upload, null); }
            static findFacebookPages(e) { return new Promise((t, r) => { "" === e ? t() : n.a.call("GET", "/API/FacebookAccount/FindPages", { term: e }).then(t, r); }); }
            static search(e, t = null, r = 0, i = Number.POSITIVE_INFINITY) { return new Promise((s, a) => { if ("" === e || void 0 === e)
                s([]);
            else {
                const o = { limit: void 0, model: void 0, q: void 0, skip: void 0 };
                o.q = e, null !== t && "null" !== t && (o.model = t), 0 !== r && Number.isFinite(Number(r)) && (o.skip = Number(r)), Number.isFinite(Number(i)) && (o.limit = Number(i));
                const d = e => { const t = e.query; t || a(t), n.a.deserializeData(t).then(s, a); };
                n.a.useSocketIO && n.a.ShouldUseSocketIO ? n.a.getSocket().then(e => { e && e.emit("/API/TextSearch", o, d); }, a) : n.a.call("GET", "/API/TextSearch", o).then(d, a);
            } }); }
            static findMany(e) { return d.a.findManyBase(h, e); }
            static findOne(e) { return d.a.findOneBase(h, e); }
            static onChange(e) { const t = Date.now(); return h.Callbacks.set(t, e), () => { h.Callbacks.delete(t); }; }
            static async setUser(e) { try {
                "object" == typeof e && e ? (h.Current = new h(e), n.a.SessionStorageSupported && sessionStorage.setItem("user", JSON.stringify(e)), h.Callbacks.forEach(e => e(h.Current))) : (h.Current = null, n.a.token = null, n.a.expires = null, n.a.SessionStorageSupported && sessionStorage.removeItem("user"), h.Callbacks.forEach(e => e(null)));
            }
            catch (e) {
                console.error(e);
            } return h.Current; }
            static async getUser(e) { let t = null; const r = new Date; if (!e && n.a.expires && r < n.a.expires) {
                if (null !== h.Current)
                    return h.Current;
                if (n.a.SessionStorageSupported) {
                    try {
                        const e = sessionStorage.getItem("user") || "";
                        t = JSON.parse(e);
                    }
                    catch (e) {
                        t = "";
                    }
                    if (t)
                        return h.setUser(t);
                }
            } return (t = n.a.useSocketIO && n.a.ShouldUseSocketIO ? await new Promise((e, t) => { n.a.getSocket().then(t => { t && t.emit("/API/User/Retreive", e); }, t); }) : await n.a.call("GET", "/API/User", null)) ? h.setUser(t) : h.setUser(null); }
            static findById(e) { return d.a.findByIdBase(h, e); }
            static connectFacebook() { window.location.href = `${n.a.rootURL}/API/Auth/Facebook`; }
            static facebookLogIn() { window.location.href = `${n.a.rootURL}/API/Login/Facebook`; }
            static payPalLogIn() { window.location.href = `${n.a.rootURL}/API/Auth/PayPal`; }
            static async userLogIn(e, t) { if (e && "" !== e) {
                if (t && "" !== t) {
                    let r = null;
                    if ((r = n.a.useSocketIO && n.a.ShouldUseSocketIO ? await new Promise((r, i) => { n.a.getSocket().then(n => { n && n.emit("/API/User/SignIn", { email: e, password: t }, r); }, i); }) : await n.a.call("POST", "/API/User/SignIn", { email: e, password: t })) && r.user && r.token && r.expires)
                        return n.a.expires = new Date(r.expires), n.a.token = r.token, h.setUser(r.user);
                    throw new Error("Unauthorized");
                }
                throw new Error("No password");
            } throw new Error("No email"); }
            static async userLogOut() { n.a.useSocketIO && n.a.ShouldUseSocketIO ? await new Promise((e, t) => { n.a.getSocket().then(t => { t && t.emit("/API/User/SignOut", null, e); }, t); }) : await n.a.call("POST", "/API/User/SignOut", null); const e = await h.setUser(null); if (e && e.isValid())
                throw new Error(`${JSON.stringify(e)} returned, failed to log out?`); return e; }
            static sendPasswordResetEmail(e) { return n.a.call("POST", "/User/Reset", { email: e }); }
            static registerUser(e) { return new Promise((t, r) => { if (!e || "object" != typeof e)
                return r(new Error("User data is not an object")); if (null === e.email && "" === e.email)
                return r(new Error("Email is required")); if (0 !== h.EmailRegex[Symbol.search](e.email))
                return r(new Error("Invalid email address")); if (!e.password)
                return r(new Error("Password is required")); {
                const t = /[^a-zA-Z0-9]/gu, n = /[0-9]/g, i = e.password.toLowerCase();
                if ("" === e.password)
                    return r(new Error("Password is required"));
                if (e.password.length < 8)
                    return r(new Error("Password is too short"));
                if (e.password.length > 256)
                    return r(new Error("Password is too long"));
                if (!t.test(e.password))
                    return r(new Error("Password does not contain at least one symbol"));
                if (!n.test(e.password))
                    return r(new Error("Password does not contain at least one number"));
                if (e.firstName && 0 !== e.firstName.length && -1 !== i.indexOf(e.firstName.toLowerCase()))
                    return r(new Error("Password can not contain your first name"));
                if (e.lastName && 0 !== e.lastName.length && -1 !== i.indexOf(e.lastName.toLowerCase()))
                    return r(new Error("Password can not contain your last name"));
            } return e.firstName ? 0 === e.firstName.length ? r(new Error("First name is required")) : e.firstName[0] === e.firstName[0].toLowerCase() ? r(new Error("First name is not title case")) : e.lastName ? 0 === e.lastName.length ? r(new Error("Last name is required")) : e.lastName[0] === e.lastName[0].toLowerCase() ? r(new Error("Last name is not title case")) : n.a.useSocketIO && n.a.ShouldUseSocketIO ? new Promise((t, r) => { n.a.getSocket().then(r => { r && r.emit("/API/User/Create", e, t); }, r); }) : n.a.call("POST", "/API/User", e).then(e => { e ? h.setUser(e).then(e => { t(e); }, r) : r(new Error(`${JSON.stringify(e)} returned`)); }, r) : r(new Error("Last name is required")) : r(new Error("First name is required")); }); }
            static NotifyAdminsOfError() { console.error("Not implemented yet."); }
            getIcon() { return d.a.findByIdBase(f.Upload, this.icon || ""); }
            getTwitterAccount() { return d.a.findByIdBase(l.TwitterAccount, this.twitter || ""); }
            getFacebookAccount() { return d.a.findByIdBase(a.FacebookAccount, this.facebook || ""); }
            getConnections() { return Promise.all(this.connections.map(e => h.findById(e))); }
            getBlocked() { return Promise.all(this.blocked.map(e => h.findById(e))); }
            validatePassword(e) { const t = e || "", r = t.toLowerCase(), n = this.firstName ? this.firstName.toLowerCase() : "", i = this.lastName ? this.lastName.toLowerCase() : ""; return "" === t ? new Error("Password missing") : t.length < 8 ? new Error("Password is too short") : t.length > 256 ? new Error("Password is too long") : /\d/.test(t) ? /\W/.test(t) ? -1 !== r.indexOf(n) ? new Error("Password cannot contain your first name") : -1 !== r.indexOf(i) ? new Error("Password cannot contain your last name") : null : new Error("Password does not have atleast one symbol") : new Error("Password does not have atleast one number"); }
            isValid() { return !!super.isValid() && ("string" == typeof this.firstName && ("string" == typeof this.lastName && ("string" == typeof this.email && ("" !== this.firstName && ("" !== this.lastName && "" !== this.email))))); }
            anyErrors() { const e = super.anyErrors(); if (e)
                return e; if (this.id) {
                if (!["string", "undefined"].includes(typeof this.changes.firstName))
                    return new Error(`Invalid firstName: ${this.changes.firstName}`);
                if (!["string", "undefined"].includes(typeof this.changes.lastName))
                    return new Error(`Invalid lastName: ${this.changes.lastName}`);
                if (!["string", "undefined"].includes(typeof this.changes.password))
                    return new Error(`Invalid password: ${this.changes.password}`);
                if (!["string", "undefined"].includes(typeof this.changes.confirmPassword))
                    return new Error(`Invalid confirmPassword: ${this.changes.confirmPassword}`);
                if (!["string", "undefined"].includes(typeof this.changes.email))
                    return new Error(`Invalid email: ${this.changes.email}`);
                if ("" === this.changes.firstName)
                    return new Error("Blank firstName");
                if ("" === this.changes.lastName)
                    return new Error("Blank lastName");
                if (this.changes.password) {
                    const e = this.validatePassword(this.changes.password);
                    if (e)
                        return e;
                }
                if (this.changes.password !== this.changes.confirmPassword)
                    return new Error("Passwords do not match");
            }
            else {
                if ("string" != typeof this.changes.firstName)
                    return new Error(`Invalid firstName: ${this.changes.firstName}`);
                if ("string" != typeof this.changes.lastName)
                    return new Error(`Invalid lastName: ${this.changes.lastName}`);
                if ("string" != typeof this.changes.password)
                    return new Error(`Invalid password: ${this.changes.password}`);
                if ("string" != typeof this.changes.confirmPassword)
                    return new Error(`Invalid confirmPassword: ${this.changes.confirmPassword}`);
                if ("" === this.changes.firstName)
                    return new Error("Blank firstName");
                if ("" === this.changes.lastName)
                    return new Error("Blank lastName");
                if (this.changes.password) {
                    const e = this.validatePassword(this.changes.password);
                    if (e)
                        return e;
                }
                if (this.changes.password !== this.changes.confirmPassword)
                    return new Error("Passwords do not match");
            } return null; }
        }
        h.ModelName = "User", h.Current = null, h.Callbacks = new Map, h.agreement = null, h.EmailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    }, function (e, t, r) {
        "use strict";
        r.r(t), r.d(t, "Upload", function () { return s; });
        r(3);
        var n = r(1), i = r(4);
        class s extends n.a {
            constructor(e) { super(["fileData", "srcMIMEType", "croppedFileData", "owners", "description", "hash", "bytes", "width", "height", "offsetWidth", "offsetHeight", "offsetLeft", "offsetTop", "ModelName", "_id", "dateCreated", "dateModified"], e); }
            static findById(e) { return n.a.findByIdBase(s, e); }
            static findMany(e) { return n.a.findManyBase(s, e); }
            static findOne(e) { return n.a.findOneBase(s, e); }
            static getAllOwned() { return n.a.findManyBase(s, null); }
            getOwners() { const e = Array.from(this.owners); return 0 !== e.length ? n.a.findManyBase(i.User, { _id: e }) : Promise.resolve([]); }
            userIsOwner(e) { if (Array.isArray(this.owners)) {
                let t;
                return "string" == typeof e ? t = e : "object" == typeof e && e && (t = e._id), void 0 !== this.owners.find(e => e === t);
            } return !1; }
            anyErrors() { const e = super.anyErrors(); return e || (this.description ? this.fileData ? this.width ? this.height ? this.offsetWidth ? this.offsetHeight ? "number" != typeof this.offsetLeft || this.offsetLeft < 0 ? new Error(`Invalid offsetLeft: ${this.offsetLeft}`) : "number" != typeof this.offsetTop || this.offsetTop < 0 ? new Error(`Invalid offsetTop: ${this.offsetTop}`) : this.document.hash ? this.document.bytes ? Array.isArray(this.document.owners) && 0 !== this.document.owners.length ? null : new Error(`Invalid owners: ${this.document.owners}`) : new Error(`Invalid bytes: ${this.document.bytes}`) : new Error(`Invalid hash: ${this.document.hash}`) : new Error(`Invalid offsetHeight: ${this.offsetHeight}`) : new Error(`Invalid offsetWidth: ${this.offsetWidth}`) : new Error(`Invalid height: ${this.height}`) : new Error(`Invalid width: ${this.width}`) : new Error(`Invalid fileData: ${this.fileData}`) : new Error(`Invalid description: ${this.description}`)); }
        }
        s.ModelName = "Upload";
    }, function (e, t, r) {
        "use strict";
        r.r(t), r.d(t, "FacebookAccount", function () { return a; });
        r(3);
        var n = r(2), i = r(1), s = r(4);
        class a extends i.a {
            constructor(e) { super(["accountId", "pageToken", "profile", "userAccessToken", "userRefreshToken", "userId", "ModelName", "_id", "dateCreated", "dateModified"], e); }
            static findOne(e) { return i.a.findOneBase(a, e); }
            static findMany(e) { return i.a.findManyBase(a, e); }
            static findById(e) { return new Promise((t, r) => { "string" == typeof e && "" !== e ? n.a.call("GET", `/API/FacebookAccount/${e}`, null).then(e => { const n = e || null; n ? t(new a(n)) : r(new Error(`${n} returned`)); }, r) : t(); }); }
            static findPage(e) { return new Promise((t, r) => { "string" != typeof e ? r(new Error("pageName is not a string!")) : n.a.call("GET", "/API/Facebook/Page/Find", { name: e }).then(t, r); }); }
            static PostToPage(e, t, r, i) { return new Promise((s, a) => { n.a.call("POST", "/API/Facebook/Page/Post", { fb_page_id: r, post_format: e, post_text: t, publish_time: i }).then(s, a); }); }
            getUser() { return i.a.findByIdBase(s.User, this.userId); }
            userIsOwner(e) { return "string" == typeof e ? e === this.userId : !("object" != typeof e || !e) && e._id === this.userId; }
            isValid() { return !!super.isValid() && (!(!this.userId || "string" != typeof this.userId) && (!(!this.profile || "object" != typeof this.profile) && !(!this.accountId || "string" != typeof this.accountId))); }
        }
        a.ModelName = "FacebookAccount";
    }, function (e, t, r) {
        "use strict";
        r.r(t), r.d(t, "Gig", function () { return d; });
        r(3);
        var n = r(2), i = r(9), s = r(10), a = r(1), o = r(11);
        class d extends a.a {
            constructor(e) { super(["startTime", "stopTime", "location", "venue", "bands", "toBeAnnounced", "bandOwnersAccepted", "venueOwnerAccepted", "owners", "ModelName", "_id", "dateCreated", "dateModified"], e); }
            static findById(e) { return a.a.findByIdBase(d, e); }
            static async findByBand(e) { const t = await n.a.call("GET", `/API/Band/${e}/Gigs`, null); if (t && Array.isArray(t))
                return t.map(e => { const t = new d(e); return a.a.CacheSet(t), t; }); throw new Error(`Expected Array, got ${t}`); }
            static async findByVenue(e) { const t = await n.a.call("GET", `/API/Venue/${e}/Gigs`, null); if (t && Array.isArray(t))
                return t.map(e => { const t = new d(e); return a.a.CacheSet(t), t; }); throw new Error(`Expected Array, got ${t}`); }
            static getAllOwned() { return a.a.findManyBase(d, null); }
            static findMany(e) { return a.a.findManyBase(d, e); }
            static createGigs(e) { return new Promise((t, r) => { const i = e || {}; if (i && "object" == typeof i) {
                if (!i.band || "" === i.band)
                    return r(new Error("Band is required"));
                if (!i.venue || "" === i.venue)
                    return r(new Error("Venue is required"));
                if (!i.times || 0 === i.times.length)
                    return r(new Error("Times is required"));
                const e = i.times.filter((e, t) => { if (e.dayDate && e.startTime && e.stopTime) {
                    const r = new Date(e.dayDate), n = new Date(e.startTime);
                    n.setFullYear(r.getFullYear()), n.setMonth(r.getMonth()), n.setDate(r.getDay());
                    const s = new Date(e.stopTime);
                    return s.setFullYear(r.getFullYear()), s.setMonth(r.getMonth()), s.setDate(r.getDay()), i.times[t] = { startTime: e.startTime, stopTime: e.stopTime }, !0;
                } return !(!e.startTime || !e.stopTime) && (i.times[t] = { startTime: e.startTime, stopTime: e.stopTime }, !0); });
                return e.length !== i.times.length ? r(new Error("Not all times were valid")) : (i.times = e, n.a.call("POST", "/API/Gig", i).then(e => { let r = []; r = Array.from(e || []).map(e => { return new d(e); }), t(r); }, r));
            } return null; }); }
            static getAllInDistance(e, t) { return new Promise((r, i) => "object" != typeof e ? i(new Error("location is not a object!")) : "number" != typeof e.lat || "number" != typeof e.lng ? i(new Error("location does not contain lat or lng!")) : "number" != typeof t ? i(new Error("radius is not a number!")) : n.a.call("GET", "/API/Gig/InDistance", { dis: t, lat: e.lat, lng: e.lng }).then(e => { r(Array.from(e).map(e => { return new d(e); })); }, i)); }
            getBands() { return a.a.findManyBase(i.Band, { _id: this.bands }); }
            getVenue() { return a.a.findByIdBase(o.Venue, this.venue); }
            getLocation() { return a.a.findByIdBase(s.Location, this.location); }
            isValid() { return !!super.isValid() && (!!Array.isArray(this.owners) && 0 !== this.owners.length); }
            userIsOwner(e) { if (Array.isArray(this.owners)) {
                let t;
                return "string" == typeof e ? t = e : "object" == typeof e && e && (t = e._id), void 0 !== this.owners.find(e => e === t);
            } return !1; }
        }
        d.ModelName = "Gig";
    }, function (e, t, r) {
        "use strict";
        r.r(t), r.d(t, "TwitterAccount", function () { return a; });
        r(3);
        var n = r(2), i = r(1), s = r(4);
        class a extends i.a {
            constructor(e) { super(["userId", "accountId", "accessToken", "tokenSecret", "profile", "ModelName", "_id", "dateCreated", "dateModified"], e); }
            static findOne(e) { return i.a.findOneBase(a, e); }
            static findMany(e) { return i.a.findManyBase(a, e); }
            static findById(e) { return new Promise((t, r) => { "string" == typeof e && "" !== e ? n.a.call("GET", `/API/TwitterAccount/${e}`, null).then(e => { const n = e || null; n ? t(new a(n)) : r(new Error(`${n} returned`)); }, r) : t(); }); }
            getUser() { return i.a.findByIdBase(s.User, this.userId); }
            userIsOwner(e) { return "string" == typeof e ? e === this.userId : "function" == typeof e && e._id === this.userId; }
            goToTwitterAccount() { "undefined" != typeof window && (window.location.href = `https://twitter.com?profile_id=${this.accountId}`); }
            isValid() { return !!super.isValid() && (!(!this.userId || "string" != typeof this.userId) && !(!this.profile || "object" != typeof this.profile)); }
        }
        a.ModelName = "TwitterAccount";
    }, function (e, t, r) {
        "use strict";
        r.r(t), r.d(t, "Band", function () { return c; });
        r(3);
        var n = r(6), i = r(7), s = r(1), a = r(8), o = r(5), d = r(4);
        class c extends s.a {
            constructor(e) { super(["name", "website", "email", "cityName", "cityPlaceID", "description", "metadata", "icon", "photos", "owners", "facebook", "facebookPageId", "facebookPageName", "facebookPageToken", "twitter", "google", "ModelName", "_id", "dateCreated", "dateModified"], e); }
            static findOne(e) { return s.a.findOneBase(c, e); }
            static findMany(e) { return s.a.findManyBase(c, e); }
            static findById(e) { return s.a.findByIdBase(c, e); }
            static getAllOwned() { return s.a.findManyBase(c, null); }
            getIcon() { return this.icon ? s.a.findByIdBase(o.Upload, this.icon) : Promise.resolve(null); }
            getPhotos() { const e = Array.from(this.photos); return 0 !== e.length ? s.a.findManyBase(o.Upload, { _id: e }) : Promise.resolve([]); }
            getOwners() { const e = Array.from(this.owners); return 0 !== e.length ? s.a.findManyBase(d.User, { _id: e }) : Promise.resolve([]); }
            getGigs() { return i.Gig.findByBand(this._id || ""); }
            getTwitterAccount() { return this.twitter ? s.a.findByIdBase(a.TwitterAccount, this.twitter) : Promise.resolve(null); }
            getFacebookAccount() { return this.facebook ? s.a.findByIdBase(n.FacebookAccount, this.facebook) : Promise.resolve(null); }
            anyErrors() { const e = super.anyErrors(); return e || ("string" != typeof this.cityPlaceID ? new Error(`cityPlaceID is not a string, it's ${typeof this.cityPlaceID} instead`) : "" === this.cityPlaceID ? new Error("cityPlaceID is empty") : "string" != typeof this.name ? new Error("name is not a string") : "" === this.name ? new Error("name is empty") : "string" != typeof this.description ? new Error("description is not a string") : "" === this.description ? new Error("description is empty") : "<p><br></p>" === this.description ? new Error("description is practically empty") : Array.isArray(this.owners) ? 0 === this.owners.length ? new Error("owners does not contain a single id") : null : new Error("owners is not an array")); }
            userIsOwner(e) { if (Array.isArray(this.owners)) {
                let t;
                return "string" == typeof e ? t = e : "object" == typeof e && e && (t = e._id), void 0 !== this.owners.find(e => e === t);
            } return !1; }
        }
        c.ModelName = "Band";
    }, function (e, t, r) {
        "use strict";
        r.r(t), r.d(t, "Location", function () { return a; });
        r(3);
        var n = r(2), i = r(14), s = r(1);
        class a extends s.a {
            constructor(e) { super(["type", "placeId", "address", "point", "utcOffset", "ModelName", "_id", "dateCreated", "dateModified"], e); }
            static getLocationByPlaceId(e) { return new Promise((t, r) => { e ? n.a.call("GET", `/API/Place/${e}`, null).then(e => { e ? t(new a(e)) : r(new Error(`${e} returned`)); }, r) : r(new Error(`Invaild placeId: ${e}`)); }); }
            static findById(e) { return s.a.findByIdBase(a, e); }
            static findOne(e) { return s.a.findOneBase(a, e); }
            static findMany(e) { return s.a.findManyBase(a, e); }
            isValid() { return !!super.isValid() && (!!this.placeId && (!!this.address && (!!this.utcOffset && !!Array.isArray(this.point)))); }
            getPlaceDetails() { return i.GooglePlace.getPlaceDetails(this.placeId); }
        }
        a.ModelName = "Location";
    }, function (e, t, r) {
        "use strict";
        r.r(t), r.d(t, "Venue", function () { return u; });
        r(3);
        var n = r(6), i = r(7), s = r(10), a = r(1), o = r(8), d = r(5), c = r(4);
        class u extends a.a {
            constructor(e) { super(["owners", "name", "description", "website", "phone", "email", "location", "openCloseTimes", "icon", "photos", "facebook", "twitter", "google", "metadata", "facebookPageId", "facebookPageName", "facebookPageToken", "ModelName", "_id", "dateCreated", "dateModified"], e); }
            static findOne(e) { return a.a.findOneBase(u, e); }
            static findMany(e) { return a.a.findManyBase(u, e); }
            static findById(e) { return a.a.findByIdBase(u, e); }
            static getAllOwned() { return a.a.findManyBase(u, null); }
            getIcon() { return a.a.findByIdBase(d.Upload, this.icon || ""); }
            getPhotos() { const e = Array.from(this.photos); return 0 !== e.length ? a.a.findManyBase(d.Upload, { _id: e }) : Promise.resolve([]); }
            getOwners() { const e = Array.from(this.owners); return 0 !== e.length ? a.a.findManyBase(c.User, { _id: e }) : Promise.resolve([]); }
            getGigs() { return i.Gig.findByVenue(this._id || ""); }
            getTwitterAccount() { return a.a.findByIdBase(o.TwitterAccount, this.twitter || ""); }
            getFacebookAccount() { return a.a.findByIdBase(n.FacebookAccount, this.facebook || ""); }
            getLocation() { return a.a.findByIdBase(s.Location, this.location || ""); }
            isValid() { const e = this; return !!super.isValid() && (!!a.a.isValidId(this.location) && ("" !== this.location && ("string" == typeof this.name && ("" !== this.name && ("string" == typeof this.description && ("" !== this.description && ("<p><br></p>" !== this.description && (!!Array.isArray(this.owners) && (0 !== this.owners.length && !!this.owners.every(t => e.userIsOwner(t))))))))))); }
            userIsOwner(e) { if (Array.isArray(this.owners)) {
                let t;
                return "string" == typeof e ? t = e : "object" == typeof e && e && (t = e._id), void 0 !== this.owners.find(e => e === t);
            } return !1; }
        }
        u.ModelName = "Venue";
    }, function (e, t, r) {
        "use strict";
        async function n(e) { switch (e) {
            case "Band": return (await Promise.resolve().then(r.bind(null, 9))).Band;
            case "Conversation": return (await Promise.resolve().then(r.bind(null, 13))).Conversation;
            case "ErrorReport": return (await Promise.resolve().then(r.bind(null, 17))).ErrorReport;
            case "FacebookAccount": return (await Promise.resolve().then(r.bind(null, 6))).FacebookAccount;
            case "Gig": return (await Promise.resolve().then(r.bind(null, 7))).Gig;
            case "GooglePlace": return (await Promise.resolve().then(r.bind(null, 14))).GooglePlace;
            case "Location": return (await Promise.resolve().then(r.bind(null, 10))).Location;
            case "Notification": return (await Promise.resolve().then(r.bind(null, 15))).Notification;
            case "Page": return (await Promise.resolve().then(r.bind(null, 18))).Page;
            case "Post": return (await Promise.resolve().then(r.bind(null, 16))).Post;
            case "Request": return (await Promise.resolve().then(r.bind(null, 19))).Request;
            case "TwitterAccount": return (await Promise.resolve().then(r.bind(null, 8))).TwitterAccount;
            case "Upload": return (await Promise.resolve().then(r.bind(null, 5))).Upload;
            case "User": return (await Promise.resolve().then(r.bind(null, 4))).User;
            case "Venue": return (await Promise.resolve().then(r.bind(null, 11))).Venue;
            default: return Promise.resolve(null);
        } }
        r.d(t, "a", function () { return n; });
    }, function (e, t, r) {
        "use strict";
        r.r(t), r.d(t, "Conversation", function () { return s; });
        r(3);
        var n = r(2), i = r(1);
        class s extends i.a {
            constructor(e) { super(["events", "users", "ModelName", "_id", "dateCreated", "dateModified"], e); }
            static newCallback(e) { const t = Date.now(); return s.Callbacks.set(t, e), () => s.Callbacks.delete(t); }
            static connectSocket() { n.a.getSocket().then(e => { e && e.on("/API/Conversation/Update", e => { if (e) {
                let t = i.a.CacheGet(e._id);
                t ? Object.assign(t, e) : t = new s(e), i.a.CacheSet(t), s.Callbacks.forEach(e => e(t));
            } }); }, console.error); }
            static findById(e) { return i.a.findByIdBase(s, e); }
            static findOne(e) { return i.a.findOneBase(s, e); }
            static findMany(e) { return i.a.findManyBase(s, e); }
            static getAllOwned() { return i.a.findManyBase(s, null); }
            isValid() { return !!super.isValid(); }
            pushMessage(e, t) { return this.events.push({ dateTimePosted: new Date, message: t, user: e }), this.save(); }
        }
        s.ModelName = "Conversation", s.Callbacks = new Map;
    }, function (e, t, r) {
        "use strict";
        r.r(t), r.d(t, "GooglePlace", function () { return s; });
        r(3);
        var n = r(2), i = r(1);
        class s extends i.a {
            constructor(e) { super(["placeId", "details", "ModelName", "_id", "dateCreated", "dateModified"], e); }
            static findById(e) { return i.a.findByIdBase(s, e); }
            static findOne(e) { return i.a.findOneBase(s, e); }
            static findMany(e) { return i.a.findManyBase(s, e); }
            static getPlaceDetails(e) { return new Promise((t, r) => "string" != typeof e ? r(new Error("placeId is not a string!")) : n.a.call("GET", "/API/GooglePlace", { placeId: e }).then(t, r)); }
            static queryPlace(e, t) { return new Promise((r, i) => { const s = t || "locality"; return "string" != typeof e ? i(new Error("text is not a string!")) : 0 === e.length ? i(new Error("text is blank")) : n.a.call("GET", "/API/GooglePlace/Query", { term: e, type: s }).then(r, i); }); }
        }
        s.ModelName = "GooglePlace";
    }, function (e, t, r) {
        "use strict";
        r.r(t), r.d(t, "Notification", function () { return s; });
        r(3);
        var n = r(2), i = r(1);
        class s extends i.a {
            constructor(e) { super(["actions", "label", "message", "seenByUser", "userId", "ModelName", "_id", "dateCreated", "dateModified"], e), this.changeCallbacks = new Map; }
            static onNewNotification(e) { s.Callbacks.forEach(t => t(e)); }
            static newCallback(e) { const t = Date.now(); return s.Callbacks.set(t, e), () => s.Callbacks.delete(t); }
            static async getNewNotifications() { if (null !== n.a.token) {
                const e = await n.a.call("GET", "/API/Notification", { returnNew: !0 });
                if (Array.isArray(e))
                    return e.map(e => new s(e));
            } return []; }
            static getAllOwned() { return i.a.findManyBase("Notification", null); }
            static findById(e) { return i.a.findByIdBase("Notification", e); }
            static connectSocket() { n.a.getSocket().then(e => { e && e.on("notification", e => s.onNewNotification(new s(e))); }, console.error); }
            static setUpPushNotifications() { const e = "undefined" != typeof window && void 0 !== window.Notification, t = e ? window.Notification : null; if (e) {
                const e = e => { "granted" === e && s.onNewNotification(e => new t(e.label, { body: e.message, data: e, icon: "/LogoSmall.png", timestamp: e.dateCreated })); };
                "granted" === t.permission ? e(t.permission) : t.requestPermission(e);
            } }
            newChangeCallback(e) { const t = Date.now(); return this.changeCallbacks.set(t, e), () => { this.changeCallbacks.delete(t); }; }
        }
        s.ModelName = "Notification", s.Callbacks = new Map;
    }, function (e, t, r) {
        "use strict";
        r.r(t), r.d(t, "Post", function () { return i; });
        r(3);
        var n = r(1);
        class i extends n.a {
            constructor(e) { super(["accountId", "coordinates", "done", "error", "network", "pageId", "postDate", "postText", "userId", "ModelName", "_id", "dateCreated", "dateModified"], e); }
            static findById(e) { return n.a.findByIdBase(i, e); }
            static findOne(e) { return n.a.findOneBase(i, e); }
            static getAllOwned() { return n.a.findManyBase(i, null); }
            static findMany(e) { return n.a.findManyBase(i, e); }
            isValid() { return !!super.isValid(); }
            canSave() { return !!this.postDate && (!(!this.postText || "" === this.postText) && !!this.network); }
            userIsOwner(e) { return "string" == typeof e ? e === this.userId : !("function" != typeof e || !e || !e.isValid()) && e._id === this.userId; }
        }
        i.ModelName = "Post";
    }, function (e, t, r) {
        "use strict";
        r.r(t), r.d(t, "ErrorReport", function () { return i; });
        r(3);
        var n = r(1);
        class i extends n.a {
            constructor(e) { super(["worthReporting", "userId", "version", "stack", "message", "name", "fileName", "lineNumber", "columnNumber", "ModelName", "_id", "dateCreated", "dateModified"], e); }
            static findById(e) { return n.a.findByIdBase(i, e); }
            static findOne(e) { return n.a.findOneBase(i, e); }
            static findMany(e) { return n.a.findManyBase(i, e); }
            isValid() { return !!super.isValid(); }
        }
        i.ModelName = "ErrorReport";
    }, function (e, t, r) {
        "use strict";
        r.r(t), r.d(t, "Page", function () { return s; });
        r(3);
        var n = r(2), i = r(1);
        class s extends i.a {
            constructor(e) { super(["admin", "metadata", "data", "title", "link", "visits", "revisions", "hide", "blog", "doc", "ModelName", "_id", "dateCreated", "dateModified"], e); }
            static findMany(e, t, r) { return e && (e.skip = e.skip || t, e.limit = e.limit || r), i.a.findManyBase(s, e); }
            static findOne(e) { return i.a.findOneBase(s, e); }
            static findById(e) { return i.a.findByIdBase(s, e); }
            static findByLink(e) { return new Promise((t, r) => { n.a.call("GET", `/API/Link/${e}`, null).then(e => { t(new s(e)); }, r); }); }
            isValid() { return !!super.isValid() && (!!this.title && "" !== this.title); }
            userIsOwner(e) { return "string" == typeof e ? e === this.admin : !("function" != typeof e || !e || !e.isValid()) && (e._id === this.admin || e.admin); }
        }
        s.ModelName = "Page";
    }, function (e, t, r) {
        "use strict";
        r.r(t), r.d(t, "Request", function () { return s; });
        r(3);
        var n = r(2), i = r(1);
        class s extends i.a {
            constructor(e) { super(["to", "from", "emailSent", "status", "options", "type", "userData", "ModelName", "_id", "dateCreated", "dateModified"], e); }
            static createBandOwnershipRequest(e, t, r) { return new Promise((i, a) => { n.a.call("POST", "/API/Request", { from: t, to: r, type: "BandOwnership", userData: { bandId: e } }).then(e => { i(new s(e)); }, a); }); }
            static createVenueOwnershipRequest(e, t, r) { return new Promise((i, a) => { n.a.call("POST", "/API/Request", { from: t, to: r, type: "VenueOwnership", userData: { venueId: e } }).then(e => { i(new s(e)); }, a); }); }
            static createGigNegotiation(e, t, r) { return new Promise((i, a) => { n.a.call("POST", "/API/Request", { from: t, to: r, type: "GigNegotiation", userData: { gigId: e } }).then(e => { i(new s(e)); }, a); }); }
            static getAllOwned() { return i.a.findManyBase(s, null); }
            static findById(e) { return i.a.findByIdBase(s, e); }
            async execute(e) { const t = await n.a.call("POST", `/API/Request/${this._id}/${e}`, null); return this.assign(t), this; }
        }
        s.ModelName = "Request";
    }, function (e, t, r) {
        "use strict";
        /*!
         * cookie
         * Copyright(c) 2012-2014 Roman Shtylman
         * Copyright(c) 2015 Douglas Christopher Wilson
         * MIT Licensed
         */ t.parse = function (e, t) { if ("string" != typeof e)
            throw new TypeError("argument str must be a string"); for (var r = {}, i = t || {}, a = e.split(s), d = i.decode || n, c = 0; c < a.length; c++) {
            var u = a[c], l = u.indexOf("=");
            if (!(l < 0)) {
                var f = u.substr(0, l).trim(), g = u.substr(++l, u.length).trim();
                '"' == g[0] && (g = g.slice(1, -1)), null == r[f] && (r[f] = o(g, d));
            }
        } return r; }, t.serialize = function (e, t, r) { var n = r || {}, s = n.encode || i; if ("function" != typeof s)
            throw new TypeError("option encode is invalid"); if (!a.test(e))
            throw new TypeError("argument name is invalid"); var o = s(t); if (o && !a.test(o))
            throw new TypeError("argument val is invalid"); var d = e + "=" + o; if (null != n.maxAge) {
            var c = n.maxAge - 0;
            if (isNaN(c))
                throw new Error("maxAge should be a Number");
            d += "; Max-Age=" + Math.floor(c);
        } if (n.domain) {
            if (!a.test(n.domain))
                throw new TypeError("option domain is invalid");
            d += "; Domain=" + n.domain;
        } if (n.path) {
            if (!a.test(n.path))
                throw new TypeError("option path is invalid");
            d += "; Path=" + n.path;
        } if (n.expires) {
            if ("function" != typeof n.expires.toUTCString)
                throw new TypeError("option expires is invalid");
            d += "; Expires=" + n.expires.toUTCString();
        } n.httpOnly && (d += "; HttpOnly"); n.secure && (d += "; Secure"); if (n.sameSite) {
            var u = "string" == typeof n.sameSite ? n.sameSite.toLowerCase() : n.sameSite;
            switch (u) {
                case !0:
                    d += "; SameSite=Strict";
                    break;
                case "lax":
                    d += "; SameSite=Lax";
                    break;
                case "strict":
                    d += "; SameSite=Strict";
                    break;
                default: throw new TypeError("option sameSite is invalid");
            }
        } return d; };
        var n = decodeURIComponent, i = encodeURIComponent, s = /; */, a = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;
        function o(e, t) { try {
            return t(e);
        }
        catch (t) {
            return e;
        } }
    }, function (e, t) { e.exports = function (e) { if (!e.webpackPolyfill) {
        var t = Object.create(e);
        t.children || (t.children = []), Object.defineProperty(t, "loaded", { enumerable: !0, get: function () { return t.l; } }), Object.defineProperty(t, "id", { enumerable: !0, get: function () { return t.i; } }), Object.defineProperty(t, "exports", { enumerable: !0 }), t.webpackPolyfill = 1;
    } return t; }; }, function (e, t, r) {
        "use strict";
        (function (e) { r.d(t, "a", function () { return n; }); r(23), r(24), r(25), r(26), r(27), r(28), r(29), r(30), r(31), r(32), r(33), r(34), r(35); const n = e.exports; }).call(this, r(21)(e));
    }, function (e, t, r) {
        "use strict";
        var n = r(0);
        n.shape({ _id: n.string.isRequired, cityName: n.string, cityPlaceID: n.string, dateCreated: n.oneOfType([n.string, n.instanceOf(Date)]).isRequired, dateModified: n.oneOfType([n.string, n.instanceOf(Date)]).isRequired, description: n.string, email: n.string, facebook: n.string, facebookPageId: n.string, facebookPageName: n.string, facebookPageToken: n.string, google: n.string, icon: n.string, metadata: n.string, name: n.string.isRequired, owners: n.arrayOf(n.string), photos: n.arrayOf(n.string), twitter: n.string, website: n.string });
    }, function (e, t, r) {
        "use strict";
        var n = r(0);
        n.shape({ _id: n.string.isRequired, dateCreated: n.oneOfType([n.string, n.instanceOf(Date)]).isRequired, dateModified: n.oneOfType([n.string, n.instanceOf(Date)]).isRequired, events: n.arrayOf(n.shape({ dateTimePosted: n.string.isRequired, message: n.string.isRequired, user: n.string.isRequired })), users: n.arrayOf(n.string.isRequired) });
    }, function (e, t, r) {
        "use strict";
        var n = r(0);
        n.shape({ _id: n.string.isRequired, columnNumber: n.number, dateCreated: n.oneOfType([n.string, n.instanceOf(Date)]).isRequired, dateModified: n.oneOfType([n.string, n.instanceOf(Date)]).isRequired, fileName: n.string, lineNumber: n.number, message: n.string.isRequired, name: n.string.isRequired, stack: n.string.isRequired, userId: n.string.isRequired, version: n.string.isRequired });
    }, function (e, t, r) {
        "use strict";
        var n = r(0);
        n.shape({ _id: n.string.isRequired, accountId: n.string.isRequired, dateCreated: n.oneOfType([n.string, n.instanceOf(Date)]).isRequired, dateModified: n.oneOfType([n.string, n.instanceOf(Date)]).isRequired, profile: n.any, userAccessToken: n.string, userId: n.string.isRequired, userRefreshToken: n.string });
    }, function (e, t, r) {
        "use strict";
        var n = r(0);
        n.shape({ _id: n.string.isRequired, bandOwnerAccepted: n.string, bands: n.arrayOf(n.string).isRequired, dateCreated: n.oneOfType([n.string, n.instanceOf(Date)]).isRequired, dateModified: n.oneOfType([n.string, n.instanceOf(Date)]).isRequired, location: n.string.isRequired, owners: n.arrayOf(n.string), startTime: n.oneOfType([n.string, n.instanceOf(Date)]).isRequired, stopTime: n.oneOfType([n.string, n.instanceOf(Date)]).isRequired, toBeAnnounced: n.bool, venue: n.string.isRequired, venueOwnerAccepted: n.string });
    }, function (e, t, r) {
        "use strict";
        var n = r(0);
        n.shape({ _id: n.string.isRequired, address: n.string.isRequired, dateCreated: n.oneOfType([n.string, n.instanceOf(Date)]).isRequired, dateModified: n.oneOfType([n.string, n.instanceOf(Date)]).isRequired, placeId: n.string.isRequired, point: n.arrayOf(n.number).isRequired, type: n.string.isRequired, utcOffset: n.number.isRequired });
    }, function (e, t, r) {
        "use strict";
        var n = r(0);
        n.shape({ _id: n.string.isRequired, actions: n.arrayOf(n.shape({ label: n.string.isRequired, link: n.string, request: n.string })), dateCreated: n.oneOfType([n.string, n.instanceOf(Date)]).isRequired, dateModified: n.oneOfType([n.string, n.instanceOf(Date)]).isRequired, label: n.string.isRequired, message: n.string.isRequired, seenByUser: n.bool, userId: n.string.isRequired });
    }, function (e, t, r) {
        "use strict";
        var n = r(0);
        n.shape({ _id: n.string.isRequired, blog: n.bool, data: n.string, dateCreated: n.oneOfType([n.string, n.instanceOf(Date)]).isRequired, dateModified: n.oneOfType([n.string, n.instanceOf(Date)]).isRequired, doc: n.bool, hide: n.bool, link: n.string, metadata: n.string, revisions: n.number, title: n.string, visits: n.number });
    }, function (e, t, r) {
        "use strict";
        var n = r(0);
        n.shape({ _id: n.string.isRequired, accountId: n.string.isRequired, coordinates: n.arrayOf(n.number), dateCreated: n.oneOfType([n.string, n.instanceOf(Date)]).isRequired, dateModified: n.oneOfType([n.string, n.instanceOf(Date)]).isRequired, done: n.bool.isRequired, error: n.any, network: n.string.isRequired, pageId: n.string.isRequired, postDate: n.oneOfType([n.string, n.instanceOf(Date)]).isRequired, postText: n.string.isRequired, userId: n.string.isRequired });
    }, function (e, t, r) {
        "use strict";
        var n = r(0);
        n.shape({ _id: n.string.isRequired, accessToken: n.string, accountId: n.string.isRequired, dateCreated: n.oneOfType([n.string, n.instanceOf(Date)]).isRequired, dateModified: n.oneOfType([n.string, n.instanceOf(Date)]).isRequired, profile: n.any, tokenSecret: n.string, userId: n.string.isRequired });
    }, function (e, t, r) {
        "use strict";
        var n = r(0);
        n.shape({ _id: n.string.isRequired, dateCreated: n.oneOfType([n.string, n.instanceOf(Date)]).isRequired, dateModified: n.oneOfType([n.string, n.instanceOf(Date)]).isRequired, description: n.string, fileData: n.string.isRequired, fileName: n.string.isRequired, owners: n.arrayOf(n.string).isRequired, title: n.string.isRequired });
    }, function (e, t, r) {
        "use strict";
        var n = r(0);
        n.shape({ _id: n.string.isRequired, active: n.bool, admin: n.bool, attempts: n.number, bandManager: n.bool, betaFeatureUser: n.bool, birthday: n.oneOfType([n.string, n.instanceOf(Date)]).isRequired, country: n.string.isRequired, dateCreated: n.oneOfType([n.string, n.instanceOf(Date)]).isRequired, dateModified: n.oneOfType([n.string, n.instanceOf(Date)]).isRequired, description: n.string, email: n.string, emailVerified: n.bool, facebook: n.string, firstName: n.string.isRequired, icon: n.string, lastLogin: n.oneOfType([n.string, n.instanceOf(Date)]).isRequired, lastLoginIP: n.string.isRequired, lastName: n.string.isRequired, middleName: n.string, payment: n.string, paypal: n.string, sendAnonymousReports: n.bool, sendEmails: n.bool, sendErrorReports: n.bool, sendPromotions: n.bool, twitter: n.string, useCookies: n.bool, venueManager: n.bool });
    }, function (e, t, r) {
        "use strict";
        var n = r(0);
        n.shape({ _id: n.string.isRequired, dateCreated: n.oneOfType([n.string, n.instanceOf(Date)]).isRequired, dateModified: n.oneOfType([n.string, n.instanceOf(Date)]).isRequired, description: n.string.isRequired, email: n.string, facebook: n.string, facebookPageId: n.string, facebookPageName: n.string, facebookPageToken: n.string, google: n.string, icon: n.string, location: n.string.isRequired, metaData: n.string, name: n.string.isRequired, openCloseTimes: n.arrayOf(n.shape({ closingTime: n.string, open: n.bool, openingTime: n.string })), owners: n.arrayOf(n.string), phone: n.string, photos: n.arrayOf(n.string), twitter: n.string, website: n.string });
    }, function (e, t) { !function () { e.exports = this.axios; }(); }, function (e, t) { !function () { e.exports = this["socket.io-client"]; }(); }, function (e, t, r) {
        "use strict";
        r.r(t), function (e) { var n = r(22); r.d(t, "GigGizmoPropTypes", function () { return n.a; }); var i = r(2); r.d(t, "API", function () { return i.a; }); var s = r(9); r.d(t, "Band", function () { return s.Band; }); var a = r(13); r.d(t, "Conversation", function () { return a.Conversation; }); var o = r(17); r.d(t, "ErrorReport", function () { return o.ErrorReport; }); var d = r(6); r.d(t, "FacebookAccount", function () { return d.FacebookAccount; }); var c = r(7); r.d(t, "Gig", function () { return c.Gig; }); var u = r(14); r.d(t, "GooglePlace", function () { return u.GooglePlace; }); var l = r(10); r.d(t, "Location", function () { return l.Location; }); var f = r(15); r.d(t, "Notification", function () { return f.Notification; }); var g = r(18); r.d(t, "Page", function () { return g.Page; }); var h = r(16); r.d(t, "Post", function () { return h.Post; }); var p = r(19); r.d(t, "Request", function () { return p.Request; }); var m = r(1); r.d(t, "ModelClass", function () { return m.a; }); var w = r(8); r.d(t, "TwitterAccount", function () { return w.TwitterAccount; }); var y = r(5); r.d(t, "Upload", function () { return y.Upload; }); var I = r(4); r.d(t, "User", function () { return I.User; }); var b = r(11); r.d(t, "Venue", function () { return b.Venue; }); var P = r(12); r.d(t, "ModelNameToModel", function () { return P.a; }), "undefined" != typeof window && (window.GigGizmoAPI = e.exports); }.call(this, r(21)(e));
    }, function (e, t, r) {
        "use strict";
        var n = r(40);
        function i() { }
        function s() { }
        s.resetWarningCache = i, e.exports = function () { function e(e, t, r, i, s, a) { if (a !== n) {
            var o = new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");
            throw o.name = "Invariant Violation", o;
        } } function t() { return e; } e.isRequired = e; var r = { array: e, bool: e, func: e, number: e, object: e, string: e, symbol: e, any: e, arrayOf: t, element: e, elementType: e, instanceOf: t, node: e, objectOf: t, oneOf: t, oneOfType: t, shape: t, exact: t, checkPropTypes: s, resetWarningCache: i }; return r.PropTypes = r, r; };
    }, function (e, t, r) {
        "use strict";
        e.exports = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
    }]));
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map