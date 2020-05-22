! function(e, t) {
	var n, i = {},
		r = function(e, t) {
			var n, i, r;
			if("string" == typeof e) return s(e);
			for(n = [], i = e.length, r = 0; r < i; r++) n.push(s(e[r]));
			return t.apply(null, n)
		},
		o = function(e, t, n) {
			2 === arguments.length && (n = t, t = null), r(t || [], function() {
				a(e, n, arguments)
			})
		},
		a = function(e, t, n) {
			var o, a = {
				exports: t
			};
			"function" == typeof t && (n.length || (n = [r, a.exports, a]), void 0 !== (o = t.apply(null, n)) && (a.exports = o)), i[e] = a.exports
		},
		s = function(t) {
			var n = i[t] || e[t];
			if(!n) throw new Error("`" + t + "` is undefined");
			return n
		},
		u = function(e) {
			var t, n, r, o, a, s;
			s = function(e) {
				return e && e.charAt(0).toUpperCase() + e.substr(1)
			};
			for(t in i)
				if(n = e, i.hasOwnProperty(t)) {
					for(a = s((r = t.split("/")).pop()); o = s(r.shift());) n[o] = n[o] || {}, n = n[o];
					n[a] = i[t]
				}
			return e
		},
		c = function(n) {
			return e.__dollar = n, u(t(e, o, r))
		};
	"object" == typeof module && "object" == typeof module.exports ? module.exports = c() : "function" == typeof define && define.amd ? define([], c) : (n = e.WebUploader, e.WebUploader = c(), e.WebUploader.noConflict = function() {
		e.WebUploader = n
	})
}(window, function(e, t, n) {
	return t("dollar-third", [], function() {
		var t = e.__dollar || e.jQuery || e.Zepto;
		if(!t) throw new Error("jQuery or Zepto not found!");
		return t
	}), t("dollar", ["dollar-third"], function(e) {
		return e
	}), t("promise-third", ["dollar"], function(e) {
		return {
			Deferred: e.Deferred,
			when: e.when,
			isPromise: function(e) {
				return e && "function" == typeof e.then
			}
		}
	}), t("promise", ["promise-third"], function(e) {
		return e
	}), t("base", ["dollar", "promise"], function(t, n) {
		function i(e, t) {
			return function() {
				return e.apply(t, arguments)
			}
		}

		function r(e) {
			var t;
			return Object.create ? Object.create(e) : (t = function() {}, t.prototype = e, new t)
		}
		var o = function() {},
			a = Function.call;
		return {
			version: "0.1.5",
			$: t,
			Deferred: n.Deferred,
			isPromise: n.isPromise,
			when: n.when,
			browser: function(e) {
				var t = {},
					n = e.match(/WebKit\/([\d.]+)/),
					i = e.match(/Chrome\/([\d.]+)/) || e.match(/CriOS\/([\d.]+)/),
					r = e.match(/MSIE\s([\d\.]+)/) || e.match(/(?:trident)(?:.*rv:([\w.]+))?/i),
					o = e.match(/Firefox\/([\d.]+)/),
					a = e.match(/Safari\/([\d.]+)/),
					s = e.match(/OPR\/([\d.]+)/);
				return n && (t.webkit = parseFloat(n[1])), i && (t.chrome = parseFloat(i[1])), r && (t.ie = parseFloat(r[1])), o && (t.firefox = parseFloat(o[1])), a && (t.safari = parseFloat(a[1])), s && (t.opera = parseFloat(s[1])), t
			}(navigator.userAgent),
			os: function(e) {
				var t = {},
					n = e.match(/(?:Android);?[\s\/]+([\d.]+)?/),
					i = e.match(/(?:iPad|iPod|iPhone).*OS\s([\d_]+)/);
				return n && (t.android = parseFloat(n[1])), i && (t.ios = parseFloat(i[1].replace(/_/g, "."))), t
			}(navigator.userAgent),
			inherits: function(e, n, i) {
				var o;
				return "function" == typeof n ? (o = n, n = null) : o = n && n.hasOwnProperty("constructor") ? n.constructor : function() {
					return e.apply(this, arguments)
				}, t.extend(!0, o, e, i || {}), o.__super__ = e.prototype, o.prototype = r(e.prototype), n && t.extend(!0, o.prototype, n), o
			},
			noop: o,
			bindFn: i,
			log: e.console ? i(console.log, console) : o,
			nextTick: function(e) {
				setTimeout(e, 1)
			},
			slice: function(e) {
				return function() {
					return a.apply(e, arguments)
				}
			}([].slice),
			guid: function() {
				var e = 0;
				return function(t) {
					for(var n = (+new Date).toString(32), i = 0; i < 5; i++) n += Math.floor(65535 * Math.random()).toString(32);
					return(t || "wu_") + n + (e++).toString(32)
				}
			}(),
			formatSize: function(e, t, n) {
				var i;
				for(n = n || ["B", "K", "M", "G", "TB"];
					(i = n.shift()) && e > 1024;) e /= 1024;
				return("B" === i ? e : e.toFixed(t || 2)) + i
			}
		}
	}), t("mediator", ["base"], function(e) {
		function t(e, t, n, i) {
			return o.grep(e, function(e) {
				return e && (!t || e.e === t) && (!n || e.cb === n || e.cb._cb === n) && (!i || e.ctx === i)
			})
		}

		function n(e, t, n) {
			o.each((e || "").split(s), function(e, i) {
				n(i, t)
			})
		}

		function i(e, t) {
			for(var n, i = !1, r = -1, o = e.length; ++r < o;)
				if(!1 === (n = e[r]).cb.apply(n.ctx2, t)) {
					i = !0;
					break
				}
			return !i
		}
		var r, o = e.$,
			a = [].slice,
			s = /\s+/;
		return r = {
			on: function(e, t, i) {
				var r, o = this;
				return t ? (r = this._events || (this._events = []), n(e, t, function(e, t) {
					var n = {
						e: e
					};
					n.cb = t, n.ctx = i, n.ctx2 = i || o, n.id = r.length, r.push(n)
				}), this) : this
			},
			once: function(e, t, i) {
				var r = this;
				return t ? (n(e, t, function(e, t) {
					var n = function() {
						return r.off(e, n), t.apply(i || r, arguments)
					};
					n._cb = t, r.on(e, n, i)
				}), r) : r
			},
			off: function(e, i, r) {
				var a = this._events;
				return a ? e || i || r ? (n(e, i, function(e, n) {
					o.each(t(a, e, n, r), function() {
						delete a[this.id]
					})
				}), this) : (this._events = [], this) : this
			},
			trigger: function(e) {
				var n, r, o;
				return this._events && e ? (n = a.call(arguments, 1), r = t(this._events, e), o = t(this._events, "all"), i(r, n) && i(o, arguments)) : this
			}
		}, o.extend({
			installTo: function(e) {
				return o.extend(e, r)
			}
		}, r)
	}), t("uploader", ["base", "mediator"], function(e, t) {
		function n(e) {
			this.options = i.extend(!0, {}, n.options, e), this._init(this.options)
		}
		var i = e.$;
		return n.options = {}, t.installTo(n.prototype), i.each({
			upload: "start-upload",
			stop: "stop-upload",
			getFile: "get-file",
			getFiles: "get-files",
			addFile: "add-file",
			addFiles: "add-file",
			sort: "sort-files",
			removeFile: "remove-file",
			cancelFile: "cancel-file",
			skipFile: "skip-file",
			retry: "retry",
			isInProgress: "is-in-progress",
			makeThumb: "make-thumb",
			md5File: "md5-file",
			getDimension: "get-dimension",
			addButton: "add-btn",
			predictRuntimeType: "predict-runtime-type",
			refresh: "refresh",
			disable: "disable",
			enable: "enable",
			reset: "reset"
		}, function(e, t) {
			n.prototype[e] = function() {
				return this.request(t, arguments)
			}
		}), i.extend(n.prototype, {
			state: "pending",
			_init: function(e) {
				var t = this;
				t.request("init", e, function() {
					t.state = "ready", t.trigger("ready")
				})
			},
			option: function(e, t) {
				var n = this.options;
				if(!(arguments.length > 1)) return e ? n[e] : n;
				i.isPlainObject(t) && i.isPlainObject(n[e]) ? i.extend(n[e], t) : n[e] = t
			},
			getStats: function() {
				var e = this.request("get-stats");
				return e ? {
					successNum: e.numOfSuccess,
					progressNum: e.numOfProgress,
					cancelNum: e.numOfCancel,
					invalidNum: e.numOfInvalid,
					uploadFailNum: e.numOfUploadFailed,
					queueNum: e.numOfQueue,
					interruptNum: e.numofInterrupt
				} : {}
			},
			trigger: function(e) {
				var n = [].slice.call(arguments, 1),
					r = this.options,
					o = "on" + e.substring(0, 1).toUpperCase() + e.substring(1);
				return !(!1 === t.trigger.apply(this, arguments) || i.isFunction(r[o]) && !1 === r[o].apply(this, n) || i.isFunction(this[o]) && !1 === this[o].apply(this, n) || !1 === t.trigger.apply(t, [this, e].concat(n)))
			},
			destroy: function() {
				this.request("destroy", arguments), this.off()
			},
			request: e.noop
		}), e.create = n.create = function(e) {
			return new n(e)
		}, e.Uploader = n, n
	}), t("runtime/runtime", ["base", "mediator"], function(e, t) {
		function n(t) {
			this.options = i.extend({
				container: document.body
			}, t), this.uid = e.guid("rt_")
		}
		var i = e.$,
			r = {},
			o = function(e) {
				for(var t in e)
					if(e.hasOwnProperty(t)) return t;
				return null
			};
		return i.extend(n.prototype, {
			getContainer: function() {
				var e, t, n = this.options;
				return this._container ? this._container : (e = i(n.container || document.body), (t = i(document.createElement("div"))).attr("id", "rt_" + this.uid), t.css({
					position: "absolute",
					top: "0px",
					left: "0px",
					width: "1px",
					height: "1px",
					overflow: "hidden"
				}), e.append(t), e.addClass("webuploader-container"), this._container = t, this._parent = e, t)
			},
			init: e.noop,
			exec: e.noop,
			destroy: function() {
				this._container && this._container.remove(), this._parent && this._parent.removeClass("webuploader-container"), this.off()
			}
		}), n.orders = "html5,flash", n.addRuntime = function(e, t) {
			r[e] = t
		}, n.hasRuntime = function(e) {
			return !!(e ? r[e] : o(r))
		}, n.create = function(e, t) {
			var a;
			if(t = t || n.orders, i.each(t.split(/\s*,\s*/g), function() {
					if(r[this]) return a = this, !1
				}), !(a = a || o(r))) throw new Error("Runtime Error");
			return new r[a](e)
		}, t.installTo(n.prototype), n
	}), t("runtime/client", ["base", "mediator", "runtime/runtime"], function(e, t, n) {
		function i(t, i) {
			var o, a = e.Deferred();
			this.uid = e.guid("client_"), this.runtimeReady = function(e) {
				return a.done(e)
			}, this.connectRuntime = function(t, s) {
				if(o) throw new Error("already connected!");
				return a.done(s), "string" == typeof t && r.get(t) && (o = r.get(t)), (o = o || r.get(null, i)) ? (e.$.extend(o.options, t), o.__promise.then(a.resolve), o.__client++) : ((o = n.create(t, t.runtimeOrder)).__promise = a.promise(), o.once("ready", a.resolve), o.init(), r.add(o), o.__client = 1), i && (o.__standalone = i), o
			}, this.getRuntime = function() {
				return o
			}, this.disconnectRuntime = function() {
				o && (o.__client--, o.__client <= 0 && (r.remove(o), delete o.__promise, o.destroy()), o = null)
			}, this.exec = function() {
				if(o) {
					var n = e.slice(arguments);
					return t && n.unshift(t), o.exec.apply(this, n)
				}
			}, this.getRuid = function() {
				return o && o.uid
			}, this.destroy = function(e) {
				return function() {
					e && e.apply(this, arguments), this.trigger("destroy"), this.off(), this.exec("destroy"), this.disconnectRuntime()
				}
			}(this.destroy)
		}
		var r;
		return r = function() {
			var e = {};
			return {
				add: function(t) {
					e[t.uid] = t
				},
				get: function(t, n) {
					var i;
					if(t) return e[t];
					for(i in e)
						if(!n || !e[i].__standalone) return e[i];
					return null
				},
				remove: function(t) {
					delete e[t.uid]
				}
			}
		}(), t.installTo(i.prototype), i
	}), t("lib/dnd", ["base", "mediator", "runtime/client"], function(e, t, n) {
		function i(e) {
			(e = this.options = r.extend({}, i.options, e)).container = r(e.container), e.container.length && n.call(this, "DragAndDrop")
		}
		var r = e.$;
		return i.options = {
			accept: null,
			disableGlobalDnd: !1
		}, e.inherits(n, {
			constructor: i,
			init: function() {
				var e = this;
				e.connectRuntime(e.options, function() {
					e.exec("init"), e.trigger("ready")
				})
			}
		}), t.installTo(i.prototype), i
	}), t("widgets/widget", ["base", "uploader"], function(e, t) {
		function n(e) {
			if(!e) return !1;
			var t = e.length,
				n = r.type(e);
			return !(1 !== e.nodeType || !t) || ("array" === n || "function" !== n && "string" !== n && (0 === t || "number" == typeof t && t > 0 && t - 1 in e))
		}

		function i(e) {
			this.owner = e, this.options = e.options
		}
		var r = e.$,
			o = t.prototype._init,
			a = t.prototype.destroy,
			s = {},
			u = [];
		return r.extend(i.prototype, {
			init: e.noop,
			invoke: function(e, t) {
				var n = this.responseMap;
				return n && e in n && n[e] in this && r.isFunction(this[n[e]]) ? this[n[e]].apply(this, t) : s
			},
			request: function() {
				return this.owner.request.apply(this.owner, arguments)
			}
		}), r.extend(t.prototype, {
			_init: function() {
				var e = this,
					t = e._widgets = [],
					n = e.options.disableWidgets || "";
				return r.each(u, function(i, r) {
					(!n || !~n.indexOf(r._name)) && t.push(new r(e))
				}), o.apply(e, arguments)
			},
			request: function(t, i, r) {
				var o, a, u, c = 0,
					l = this._widgets,
					f = l && l.length,
					h = [],
					d = [];
				for(i = n(i) ? i : [i]; c < f; c++)(o = l[c].invoke(t, i)) !== s && (e.isPromise(o) ? d.push(o) : h.push(o));
				return r || d.length ? (a = e.when.apply(e, d), u = a.pipe ? "pipe" : "then", a[u](function() {
					var t = e.Deferred(),
						n = arguments;
					return 1 === n.length && (n = n[0]), setTimeout(function() {
						t.resolve(n)
					}, 1), t.promise()
				})[r ? u : "done"](r || e.noop)) : h[0]
			},
			destroy: function() {
				a.apply(this, arguments), this._widgets = null
			}
		}), t.register = i.register = function(t, n) {
			var o, a = {
				init: "init",
				destroy: "destroy",
				name: "anonymous"
			};
			return 1 === arguments.length ? (n = t, r.each(n, function(e) {
				"_" !== e[0] && "name" !== e ? a[e.replace(/[A-Z]/g, "-$&").toLowerCase()] = e : "name" === e && (a.name = n.name)
			})) : a = r.extend(a, t), n.responseMap = a, o = e.inherits(i, n), o._name = a.name, u.push(o), o
		}, t.unRegister = i.unRegister = function(e) {
			if(e && "anonymous" !== e)
				for(var t = u.length; t--;) u[t]._name === e && u.splice(t, 1)
		}, i
	}), t("widgets/filednd", ["base", "uploader", "lib/dnd", "widgets/widget"], function(e, t, n) {
		var i = e.$;
		return t.options.dnd = "", t.register({
			name: "dnd",
			init: function(t) {
				if(t.dnd && "html5" === this.request("predict-runtime-type")) {
					var r, o = this,
						a = e.Deferred(),
						s = i.extend({}, {
							disableGlobalDnd: t.disableGlobalDnd,
							container: t.dnd,
							accept: t.accept
						});
					return this.dnd = r = new n(s), r.once("ready", a.resolve), r.on("drop", function(e) {
						o.request("add-file", [e])
					}), r.on("accept", function(e) {
						return o.owner.trigger("dndAccept", e)
					}), r.init(), a.promise()
				}
			},
			destroy: function() {
				this.dnd && this.dnd.destroy()
			}
		})
	}), t("lib/filepaste", ["base", "mediator", "runtime/client"], function(e, t, n) {
		function i(e) {
			(e = this.options = r.extend({}, e)).container = r(e.container || document.body), n.call(this, "FilePaste")
		}
		var r = e.$;
		return e.inherits(n, {
			constructor: i,
			init: function() {
				var e = this;
				e.connectRuntime(e.options, function() {
					e.exec("init"), e.trigger("ready")
				})
			}
		}), t.installTo(i.prototype), i
	}), t("widgets/filepaste", ["base", "uploader", "lib/filepaste", "widgets/widget"], function(e, t, n) {
		var i = e.$;
		return t.register({
			name: "paste",
			init: function(t) {
				if(t.paste && "html5" === this.request("predict-runtime-type")) {
					var r, o = this,
						a = e.Deferred(),
						s = i.extend({}, {
							container: t.paste,
							accept: t.accept
						});
					return this.paste = r = new n(s), r.once("ready", a.resolve), r.on("paste", function(e) {
						o.owner.request("add-file", [e])
					}), r.init(), a.promise()
				}
			},
			destroy: function() {
				this.paste && this.paste.destroy()
			}
		})
	}), t("lib/blob", ["base", "runtime/client"], function(e, t) {
		function n(e, n) {
			var i = this;
			i.source = n, i.ruid = e, this.size = n.size || 0, !n.type && this.ext && ~"jpg,jpeg,png,gif,bmp".indexOf(this.ext) ? this.type = "image/" + ("jpg" === this.ext ? "jpeg" : this.ext) : this.type = n.type || "application/octet-stream", t.call(i, "Blob"), this.uid = n.uid || this.uid, e && i.connectRuntime(e)
		}
		return e.inherits(t, {
			constructor: n,
			slice: function(e, t) {
				return this.exec("slice", e, t)
			},
			getSource: function() {
				return this.source
			}
		}), n
	}), t("lib/file", ["base", "lib/blob"], function(e, t) {
		var n = 1,
			i = /\.([^.]+)$/;
		return e.inherits(t, function(e, r) {
			var o;
			this.name = r.name || "untitled" + n++, !(o = i.exec(r.name) ? RegExp.$1.toLowerCase() : "") && r.type && (o = /\/(jpg|jpeg|png|gif|bmp)$/i.exec(r.type) ? RegExp.$1.toLowerCase() : "", this.name += "." + o), this.ext = o, this.lastModifiedDate = r.lastModifiedDate || (new Date).toLocaleString(), t.apply(this, arguments)
		})
	}), t("lib/filepicker", ["base", "runtime/client", "lib/file"], function(t, n, i) {
		function r(e) {
			if(e = this.options = o.extend({}, r.options, e), e.container = o(e.id), !e.container.length) throw new Error("æŒ‰é’®æŒ‡å®šé”™è¯¯");
			e.innerHTML = e.innerHTML || e.label || e.container.html() || "", e.button = o(e.button || document.createElement("div")), e.button.html(e.innerHTML), e.container.html(e.button), n.call(this, "FilePicker", !0)
		}
		var o = t.$;
		return r.options = {
			button: null,
			container: null,
			label: null,
			innerHTML: null,
			multiple: !0,
			accept: null,
			name: "file"
		}, t.inherits(n, {
			constructor: r,
			init: function() {
				var n = this,
					r = n.options,
					a = r.button;
				a.addClass("webuploader-pick"), n.on("all", function(e) {
					var t;
					switch(e) {
						case "mouseenter":
							a.addClass("webuploader-pick-hover");
							break;
						case "mouseleave":
							a.removeClass("webuploader-pick-hover");
							break;
						case "change":
							t = n.exec("getFiles"), n.trigger("select", o.map(t, function(e) {
								return e = new i(n.getRuid(), e), e._refer = r.container, e
							}), r.container)
					}
				}), n.connectRuntime(r, function() {
					n.refresh(), n.exec("init", r), n.trigger("ready")
				}), this._resizeHandler = t.bindFn(this.refresh, this), o(e).on("resize", this._resizeHandler)
			},
			refresh: function() {
				var e = this.getRuntime().getContainer(),
					t = this.options.button,
					n = t.outerWidth ? t.outerWidth() : t.width(),
					i = t.outerHeight ? t.outerHeight() : t.height(),
					r = t.offset();
				n && i && e.css({
					bottom: "auto",
					right: "auto",
					width: n + "px",
					height: i + "px"
				}).offset(r)
			},
			enable: function() {
				this.options.button.removeClass("webuploader-pick-disable"), this.refresh()
			},
			disable: function() {
				var e = this.options.button;
				this.getRuntime().getContainer().css({
					top: "-99999px"
				}), e.addClass("webuploader-pick-disable")
			},
			destroy: function() {
				var t = this.options.button;
				o(e).off("resize", this._resizeHandler), t.removeClass("webuploader-pick-disable webuploader-pick-hover webuploader-pick")
			}
		}), r
	}), t("widgets/filepicker", ["base", "uploader", "lib/filepicker", "widgets/widget"], function(e, t, n) {
		var i = e.$;
		return i.extend(t.options, {
			pick: null,
			accept: null
		}), t.register({
			name: "picker",
			init: function(e) {
				return this.pickers = [], e.pick && this.addBtn(e.pick)
			},
			refresh: function() {
				i.each(this.pickers, function() {
					this.refresh()
				})
			},
			addBtn: function(t) {
				var r = this,
					o = r.options,
					a = o.accept,
					s = [];
				if(t) return i.isPlainObject(t) || (t = {
					id: t
				}), i(t.id).each(function() {
					var u, c, l;
					l = e.Deferred(), u = i.extend({}, t, {
						accept: i.isPlainObject(a) ? [a] : a,
						swf: o.swf,
						runtimeOrder: o.runtimeOrder,
						id: this
					}), (c = new n(u)).once("ready", l.resolve), c.on("select", function(e) {
						r.owner.request("add-file", [e])
					}), c.init(), r.pickers.push(c), s.push(l.promise())
				}), e.when.apply(e, s)
			},
			disable: function() {
				i.each(this.pickers, function() {
					this.disable()
				})
			},
			enable: function() {
				i.each(this.pickers, function() {
					this.enable()
				})
			},
			destroy: function() {
				i.each(this.pickers, function() {
					this.destroy()
				}), this.pickers = null
			}
		})
	}), t("lib/image", ["base", "runtime/client", "lib/blob"], function(e, t, n) {
		function i(e) {
			this.options = r.extend({}, i.options, e), t.call(this, "Image"), this.on("load", function() {
				this._info = this.exec("info"), this._meta = this.exec("meta")
			})
		}
		var r = e.$;
		return i.options = {
			quality: 90,
			crop: !1,
			preserveHeaders: !1,
			allowMagnify: !1
		}, e.inherits(t, {
			constructor: i,
			info: function(e) {
				return e ? (this._info = e, this) : this._info
			},
			meta: function(e) {
				return e ? (this._meta = e, this) : this._meta
			},
			loadFromBlob: function(e) {
				var t = this,
					n = e.getRuid();
				this.connectRuntime(n, function() {
					t.exec("init", t.options), t.exec("loadFromBlob", e)
				})
			},
			resize: function() {
				var t = e.slice(arguments);
				return this.exec.apply(this, ["resize"].concat(t))
			},
			crop: function() {
				var t = e.slice(arguments);
				return this.exec.apply(this, ["crop"].concat(t))
			},
			getAsDataUrl: function(e) {
				return this.exec("getAsDataUrl", e)
			},
			getAsBlob: function(e) {
				var t = this.exec("getAsBlob", e);
				return new n(this.getRuid(), t)
			}
		}), i
	}), t("widgets/image", ["base", "uploader", "lib/image", "widgets/widget"], function(e, t, n) {
		var i, r = e.$;
		return i = function(e) {
			var t = 0,
				n = [],
				i = function() {
					for(var e; n.length && t < 5242880;) e = n.shift(), t += e[0], e[1]()
				};
			return function(e, r, o) {
				n.push([r, o]), e.once("destroy", function() {
					t -= r, setTimeout(i, 1)
				}), setTimeout(i, 1)
			}
		}(), r.extend(t.options, {
			thumb: {
				width: 110,
				height: 110,
				quality: 70,
				allowMagnify: !0,
				crop: !0,
				preserveHeaders: !1,
				type: "image/jpeg"
			},
			compress: {
				width: 1600,
				height: 1600,
				quality: 90,
				allowMagnify: !1,
				crop: !1,
				preserveHeaders: !0
			}
		}), t.register({
			name: "image",
			makeThumb: function(e, t, o, a) {
				var s, u;
				(e = this.request("get-file", e)).type.match(/^image/) ? (s = r.extend({}, this.options.thumb), r.isPlainObject(o) && (s = r.extend(s, o), o = null), o = o || s.width, a = a || s.height, (u = new n(s)).once("load", function() {
					e._info = e._info || u.info(), e._meta = e._meta || u.meta(), o <= 1 && o > 0 && (o = e._info.width * o), a <= 1 && a > 0 && (a = e._info.height * a), u.resize(o, a)
				}), u.once("complete", function() {
					t(!1, u.getAsDataUrl(s.type)), u.destroy()
				}), u.once("error", function(e) {
					t(e || !0), u.destroy()
				}), i(u, e.source.size, function() {
					e._info && u.info(e._info), e._meta && u.meta(e._meta), u.loadFromBlob(e.source)
				})) : t(!0)
			},
			beforeSendFile: function(t) {
				var i, o, a = this.options.compress || this.options.resize,
					s = a && a.compressSize || 0,
					u = a && a.noCompressIfLarger || !1;
				if(t = this.request("get-file", t), a && ~"image/jpeg,image/jpg".indexOf(t.type) && !(t.size < s) && !t._compressed) return a = r.extend({}, a), o = e.Deferred(), i = new n(a), o.always(function() {
					i.destroy(), i = null
				}), i.once("error", o.reject), i.once("load", function() {
					var e = a.width,
						n = a.height;
					t._info = t._info || i.info(), t._meta = t._meta || i.meta(), e <= 1 && e > 0 && (e = t._info.width * e), n <= 1 && n > 0 && (n = t._info.height * n), i.resize(e, n)
				}), i.once("complete", function() {
					var e, n;
					try {
						e = i.getAsBlob(a.type), n = t.size, (!u || e.size < n) && (t.source = e, t.size = e.size, t.trigger("resize", e.size, n)), t._compressed = !0, o.resolve()
					} catch(e) {
						o.resolve()
					}
				}), t._info && i.info(t._info), t._meta && i.meta(t._meta), i.loadFromBlob(t.source), o.promise()
			}
		})
	}), t("file", ["base", "mediator"], function(e, t) {
		function n() {
			return r + o++
		}

		function i(e) {
			this.name = e.name || "Untitled", this.size = e.size || 0, this.type = e.type || "application/octet-stream", this.lastModifiedDate = e.lastModifiedDate || 1 * new Date, this.id = n(), this.ext = a.exec(this.name) ? RegExp.$1 : "", this.statusText = "", s[this.id] = i.Status.INITED, this.source = e, this.loaded = 0, this.on("error", function(e) {
				this.setStatus(i.Status.ERROR, e)
			})
		}
		var r = "WU_FILE_",
			o = 0,
			a = /\.([^.]+)$/,
			s = {};
		return e.$.extend(i.prototype, {
			setStatus: function(e, t) {
				var n = s[this.id];
				void 0 !== t && (this.statusText = t), e !== n && (s[this.id] = e, this.trigger("statuschange", e, n))
			},
			getStatus: function() {
				return s[this.id]
			},
			getSource: function() {
				return this.source
			},
			destroy: function() {
				this.off(), delete s[this.id]
			}
		}), t.installTo(i.prototype), i.Status = {
			INITED: "inited",
			QUEUED: "queued",
			PROGRESS: "progress",
			ERROR: "error",
			COMPLETE: "complete",
			CANCELLED: "cancelled",
			INTERRUPT: "interrupt",
			INVALID: "invalid"
		}, i
	}), t("queue", ["base", "mediator", "file"], function(e, t, n) {
		function i() {
			this.stats = {
				numOfQueue: 0,
				numOfSuccess: 0,
				numOfCancel: 0,
				numOfProgress: 0,
				numOfUploadFailed: 0,
				numOfInvalid: 0,
				numofDeleted: 0,
				numofInterrupt: 0
			}, this._queue = [], this._map = {}
		}
		var r = e.$,
			o = n.Status;
		return r.extend(i.prototype, {
			append: function(e) {
				return this._queue.push(e), this._fileAdded(e), this
			},
			prepend: function(e) {
				return this._queue.unshift(e), this._fileAdded(e), this
			},
			getFile: function(e) {
				return "string" != typeof e ? e : this._map[e]
			},
			fetch: function(e) {
				var t, n, i = this._queue.length;
				for(e = e || o.QUEUED, t = 0; t < i; t++)
					if(n = this._queue[t], e === n.getStatus()) return n;
				return null
			},
			sort: function(e) {
				"function" == typeof e && this._queue.sort(e)
			},
			getFiles: function() {
				for(var e, t = [].slice.call(arguments, 0), n = [], i = 0, o = this._queue.length; i < o; i++) e = this._queue[i], t.length && !~r.inArray(e.getStatus(), t) || n.push(e);
				return n
			},
			removeFile: function(e) {
				this._map[e.id] && (delete this._map[e.id], e.destroy(), this.stats.numofDeleted++)
			},
			_fileAdded: function(e) {
				var t = this;
				this._map[e.id] || (this._map[e.id] = e, e.on("statuschange", function(e, n) {
					t._onFileStatusChange(e, n)
				}))
			},
			_onFileStatusChange: function(e, t) {
				var n = this.stats;
				switch(t) {
					case o.PROGRESS:
						n.numOfProgress--;
						break;
					case o.QUEUED:
						n.numOfQueue--;
						break;
					case o.ERROR:
						n.numOfUploadFailed--;
						break;
					case o.INVALID:
						n.numOfInvalid--;
						break;
					case o.INTERRUPT:
						n.numofInterrupt--
				}
				switch(e) {
					case o.QUEUED:
						n.numOfQueue++;
						break;
					case o.PROGRESS:
						n.numOfProgress++;
						break;
					case o.ERROR:
						n.numOfUploadFailed++;
						break;
					case o.COMPLETE:
						n.numOfSuccess++;
						break;
					case o.CANCELLED:
						n.numOfCancel++;
						break;
					case o.INVALID:
						n.numOfInvalid++;
						break;
					case o.INTERRUPT:
						n.numofInterrupt++
				}
			}
		}), t.installTo(i.prototype), i
	}), t("widgets/queue", ["base", "uploader", "queue", "file", "lib/file", "runtime/client", "widgets/widget"], function(e, t, n, i, r, o) {
		var a = e.$,
			s = /\.\w+$/,
			u = i.Status;
		return t.register({
			name: "queue",
			init: function(t) {
				var i, r, s, u, c, l, f, h = this;
				if(a.isPlainObject(t.accept) && (t.accept = [t.accept]), t.accept) {
					for(c = [], s = 0, r = t.accept.length; s < r; s++)(u = t.accept[s].extensions) && c.push(u);
					c.length && (l = "\\." + c.join(",").replace(/,/g, "$|\\.").replace(/\*/g, ".*") + "$"), h.accept = new RegExp(l, "i")
				}
				if(h.queue = new n, h.stats = h.queue.stats, "html5" === this.request("predict-runtime-type")) return i = e.Deferred(), this.placeholder = f = new o("Placeholder"), f.connectRuntime({
					runtimeOrder: "html5"
				}, function() {
					h._ruid = f.getRuid(), i.resolve()
				}), i.promise()
			},
			_wrapFile: function(e) {
				if(!(e instanceof i)) {
					if(!(e instanceof r)) {
						if(!this._ruid) throw new Error("Can't add external files.");
						e = new r(this._ruid, e)
					}
					e = new i(e)
				}
				return e
			},
			acceptFile: function(e) {
				return !(!e || !e.size || this.accept && s.exec(e.name) && !this.accept.test(e.name))
			},
			_addFile: function(e) {
				var t = this;
				if(e = t._wrapFile(e), t.owner.trigger("beforeFileQueued", e)) {
					if(t.acceptFile(e)) return t.queue.append(e), t.owner.trigger("fileQueued", e), e;
					t.owner.trigger("error", "Q_TYPE_DENIED", e)
				}
			},
			getFile: function(e) {
				return this.queue.getFile(e)
			},
			addFile: function(e) {
				var t = this;
				e.length || (e = [e]), e = a.map(e, function(e) {
					return t._addFile(e)
				}), t.owner.trigger("filesQueued", e), t.options.auto && setTimeout(function() {
					t.request("start-upload")
				}, 20)
			},
			getStats: function() {
				return this.stats
			},
			removeFile: function(e, t) {
				var n = this;
				e = e.id ? e : n.queue.getFile(e), this.request("cancel-file", e), t && this.queue.removeFile(e)
			},
			getFiles: function() {
				return this.queue.getFiles.apply(this.queue, arguments)
			},
			fetchFile: function() {
				return this.queue.fetch.apply(this.queue, arguments)
			},
			retry: function(e, t) {
				var n, i, r, o = this;
				if(e) return(e = e.id ? e : o.queue.getFile(e)).setStatus(u.QUEUED), void(t || o.request("start-upload"));
				for(i = 0, r = (n = o.queue.getFiles(u.ERROR)).length; i < r; i++)(e = n[i]).setStatus(u.QUEUED);
				o.request("start-upload")
			},
			sortFiles: function() {
				return this.queue.sort.apply(this.queue, arguments)
			},
			reset: function() {
				this.owner.trigger("reset"), this.queue = new n, this.stats = this.queue.stats
			},
			destroy: function() {
				this.reset(), this.placeholder && this.placeholder.destroy()
			}
		})
	}), t("widgets/runtime", ["uploader", "runtime/runtime", "widgets/widget"], function(e, t) {
		return e.support = function() {
			return t.hasRuntime.apply(t, arguments)
		}, e.register({
			name: "runtime",
			init: function() {
				if(!this.predictRuntimeType()) throw Error("Runtime Error")
			},
			predictRuntimeType: function() {
				var e, n, i = this.options.runtimeOrder || t.orders,
					r = this.type;
				if(!r)
					for(e = 0, n = (i = i.split(/\s*,\s*/g)).length; e < n; e++)
						if(t.hasRuntime(i[e])) {
							this.type = r = i[e];
							break
						}
				return r
			}
		})
	}), t("lib/transport", ["base", "runtime/client", "mediator"], function(e, t, n) {
		function i(e) {
			var n = this;
			e = n.options = r.extend(!0, {}, i.options, e || {}), t.call(this, "Transport"), this._blob = null, this._formData = e.formData || {}, this._headers = e.headers || {}, this.on("progress", this._timeout), this.on("load error", function() {
				n.trigger("progress", 1), clearTimeout(n._timer)
			})
		}
		var r = e.$;
		return i.options = {
			server: "",
			method: "POST",
			withCredentials: !1,
			fileVal: "file",
			timeout: 12e4,
			formData: {},
			headers: {},
			sendAsBinary: !1
		}, r.extend(i.prototype, {
			appendBlob: function(e, t, n) {
				var i = this,
					r = i.options;
				i.getRuid() && i.disconnectRuntime(), i.connectRuntime(t.ruid, function() {
					i.exec("init")
				}), i._blob = t, r.fileVal = e || r.fileVal, r.filename = n || r.filename
			},
			append: function(e, t) {
				"object" == typeof e ? r.extend(this._formData, e) : this._formData[e] = t
			},
			setRequestHeader: function(e, t) {
				"object" == typeof e ? r.extend(this._headers, e) : this._headers[e] = t
			},
			send: function(e) {
				this.exec("send", e), this._timeout()
			},
			abort: function() {
				return clearTimeout(this._timer), this.exec("abort")
			},
			destroy: function() {
				this.trigger("destroy"), this.off(), this.exec("destroy"), this.disconnectRuntime()
			},
			getResponse: function() {
				return this.exec("getResponse")
			},
			getResponseAsJson: function() {
				return this.exec("getResponseAsJson")
			},
			getStatus: function() {
				return this.exec("getStatus")
			},
			_timeout: function() {
				var e = this,
					t = e.options.timeout;
				t && (clearTimeout(e._timer), e._timer = setTimeout(function() {
					e.abort(), e.trigger("error", "timeout")
				}, t))
			}
		}), n.installTo(i.prototype), i
	}), t("widgets/upload", ["base", "uploader", "file", "lib/transport", "widgets/widget"], function(e, t, n, i) {
		function r(e, t) {
			var n, i, r = [],
				o = e.source.size,
				a = t ? Math.ceil(o / t) : 1,
				s = 0,
				u = 0;
			for(i = {
					file: e,
					has: function() {
						return !!r.length
					},
					shift: function() {
						return r.shift()
					},
					unshift: function(e) {
						r.unshift(e)
					}
				}; u < a;) n = Math.min(t, o - s), r.push({
				file: e,
				start: s,
				end: t ? s + n : o,
				total: o,
				chunks: a,
				chunk: u++,
				cuted: i
			}), s += n;
			return e.blocks = r.concat(), e.remaning = r.length, i
		}
		var o = e.$,
			a = e.isPromise,
			s = n.Status;
		o.extend(t.options, {
			prepareNextFile: !1,
			chunked: !1,
			chunkSize: 5242880,
			chunkRetry: 2,
			threads: 3,
			formData: {}
		}), t.register({
			name: "upload",
			init: function() {
				var t = this.owner,
					n = this;
				this.runing = !1, this.progress = !1, t.on("startUpload", function() {
					n.progress = !0
				}).on("uploadFinished", function() {
					n.progress = !1
				}), this.pool = [], this.stack = [], this.pending = [], this.remaning = 0, this.__tick = e.bindFn(this._tick, this), t.on("uploadComplete", function(e) {
					e.blocks && o.each(e.blocks, function(e, t) {
						t.transport && (t.transport.abort(), t.transport.destroy()), delete t.transport
					}), delete e.blocks, delete e.remaning
				})
			},
			reset: function() {
				this.request("stop-upload", !0), this.runing = !1, this.pool = [], this.stack = [], this.pending = [], this.remaning = 0, this._trigged = !1, this._promise = null
			},
			startUpload: function(t) {
				var n = this;
				if(o.each(n.request("get-files", s.INVALID), function() {
						n.request("remove-file", this)
					}), t)
					if((t = t.id ? t : n.request("get-file", t)).getStatus() === s.INTERRUPT) o.each(n.pool, function(e, n) {
						n.file === t && n.transport && n.transport.send()
					}), t.setStatus(s.QUEUED);
					else {
						if(t.getStatus() === s.PROGRESS) return;
						t.setStatus(s.QUEUED)
					}
				else o.each(n.request("get-files", [s.INITED]), function() {
					this.setStatus(s.QUEUED)
				});
				if(!n.runing) {
					n.runing = !0;
					var i = [];
					o.each(n.pool, function(e, t) {
						var r = t.file;
						r.getStatus() === s.INTERRUPT && (i.push(r), n._trigged = !1, t.transport && t.transport.send())
					});
					for(var t; t = i.shift();) t.setStatus(s.PROGRESS);
					t || o.each(n.request("get-files", s.INTERRUPT), function() {
						this.setStatus(s.PROGRESS)
					}), n._trigged = !1, e.nextTick(n.__tick), n.owner.trigger("startUpload")
				}
			},
			stopUpload: function(t, n) {
				var i = this;
				if(!0 === t && (n = t, t = null), !1 !== i.runing) {
					if(t) {
						if((t = t.id ? t : i.request("get-file", t)).getStatus() !== s.PROGRESS && t.getStatus() !== s.QUEUED) return;
						return t.setStatus(s.INTERRUPT), o.each(i.pool, function(e, n) {
							n.file === t && (n.transport && n.transport.abort(), i._putback(n), i._popBlock(n))
						}), e.nextTick(i.__tick)
					}
					i.runing = !1, this._promise && this._promise.file && this._promise.file.setStatus(s.INTERRUPT), n && o.each(i.pool, function(e, t) {
						t.transport && t.transport.abort(), t.file.setStatus(s.INTERRUPT)
					}), i.owner.trigger("stopUpload")
				}
			},
			cancelFile: function(e) {
				(e = e.id ? e : this.request("get-file", e)).blocks && o.each(e.blocks, function(e, t) {
					var n = t.transport;
					n && (n.abort(), n.destroy(), delete t.transport)
				}), e.setStatus(s.CANCELLED), this.owner.trigger("fileDequeued", e)
			},
			isInProgress: function() {
				return !!this.progress
			},
			_getStats: function() {
				return this.request("get-stats")
			},
			skipFile: function(e, t) {
				(e = e.id ? e : this.request("get-file", e)).setStatus(t || s.COMPLETE), e.skipped = !0, e.blocks && o.each(e.blocks, function(e, t) {
					var n = t.transport;
					n && (n.abort(), n.destroy(), delete t.transport)
				}), this.owner.trigger("uploadSkip", e)
			},
			_tick: function() {
				var t, n, i = this,
					r = i.options;
				if(i._promise) return i._promise.always(i.__tick);
				i.pool.length < r.threads && (n = i._nextBlock()) ? (i._trigged = !1, t = function(t) {
					i._promise = null, t && t.file && i._startSend(t), e.nextTick(i.__tick)
				}, i._promise = a(n) ? n.always(t) : t(n)) : i.remaning || i._getStats().numOfQueue || i._getStats().numofInterrupt || (i.runing = !1, i._trigged || e.nextTick(function() {
					i.owner.trigger("uploadFinished")
				}), i._trigged = !0)
			},
			_putback: function(e) {
				e.cuted.unshift(e), ~this.stack.indexOf(e.cuted) || this.stack.unshift(e.cuted)
			},
			_getStack: function() {
				for(var e, t = 0; e = this.stack[t++];) {
					if(e.has() && e.file.getStatus() === s.PROGRESS) return e;
					(!e.has() || e.file.getStatus() !== s.PROGRESS && e.file.getStatus() !== s.INTERRUPT) && this.stack.splice(--t, 1)
				}
				return null
			},
			_nextBlock: function() {
				var e, t, n, i, o = this,
					s = o.options;
				return(e = this._getStack()) ? (s.prepareNextFile && !o.pending.length && o._prepareNextFile(), e.shift()) : o.runing ? (!o.pending.length && o._getStats().numOfQueue && o._prepareNextFile(), t = o.pending.shift(), n = function(t) {
					return t ? (e = r(t, s.chunked ? s.chunkSize : 0), o.stack.push(e), e.shift()) : null
				}, a(t) ? (i = t.file, t = t[t.pipe ? "pipe" : "then"](n), t.file = i, t) : n(t)) : void 0
			},
			_prepareNextFile: function() {
				var e, t = this,
					n = t.request("fetch-file"),
					i = t.pending;
				n && (e = t.request("before-send-file", n, function() {
					return n.getStatus() === s.PROGRESS || n.getStatus() === s.INTERRUPT ? n : t._finishFile(n)
				}), t.owner.trigger("uploadStart", n), n.setStatus(s.PROGRESS), e.file = n, e.done(function() {
					var t = o.inArray(e, i);
					~t && i.splice(t, 1, n)
				}), e.fail(function(e) {
					n.setStatus(s.ERROR, e), t.owner.trigger("uploadError", n, e), t.owner.trigger("uploadComplete", n)
				}), i.push(e))
			},
			_popBlock: function(e) {
				var t = o.inArray(e, this.pool);
				this.pool.splice(t, 1), e.file.remaning--, this.remaning--
			},
			_startSend: function(t) {
				var n = this,
					i = t.file;
				i.getStatus() === s.PROGRESS ? (n.pool.push(t), n.remaning++, t.blob = 1 === t.chunks ? i.source : i.source.slice(t.start, t.end), n.request("before-send", t, function() {
					i.getStatus() === s.PROGRESS ? n._doSend(t) : (n._popBlock(t), e.nextTick(n.__tick))
				}).fail(function() {
					1 === i.remaning ? n._finishFile(i).always(function() {
						t.percentage = 1, n._popBlock(t), n.owner.trigger("uploadComplete", i), e.nextTick(n.__tick)
					}) : (t.percentage = 1, n.updateFileProgress(i), n._popBlock(t), e.nextTick(n.__tick))
				})) : i.getStatus() === s.INTERRUPT && n._putback(t)
			},
			_doSend: function(t) {
				var n, r, a = this,
					u = a.owner,
					c = a.options,
					l = t.file,
					f = new i(c),
					h = o.extend({}, c.formData),
					d = o.extend({}, c.headers);
				t.transport = f, f.on("destroy", function() {
					delete t.transport, a._popBlock(t), e.nextTick(a.__tick)
				}), f.on("progress", function(e) {
					t.percentage = e, a.updateFileProgress(l)
				}), n = function(e) {
					var n;
					return r = f.getResponseAsJson() || {}, r._raw = f.getResponse(), n = function(t) {
						e = t
					}, u.trigger("uploadAccept", t, r, n) || (e = e || "server"), e
				}, f.on("error", function(e, i) {
					t.retried = t.retried || 0, t.chunks > 1 && ~"http,abort".indexOf(e) && t.retried < c.chunkRetry ? (t.retried++, f.send()) : (i || "server" !== e || (e = n(e)), l.setStatus(s.ERROR, e), u.trigger("uploadError", l, e), u.trigger("uploadComplete", l))
				}), f.on("load", function() {
					var e;
					(e = n()) ? f.trigger("error", e, !0): 1 === l.remaning ? a._finishFile(l, r) : f.destroy()
				}), h = o.extend(h, {
					id: l.id,
					name: l.name,
					type: l.type,
					lastModifiedDate: l.lastModifiedDate,
					size: l.size
				}), t.chunks > 1 && o.extend(h, {
					chunks: t.chunks,
					chunk: t.chunk
				}), u.trigger("uploadBeforeSend", t, h, d), f.appendBlob(c.fileVal, t.blob, l.name), f.append(h), f.setRequestHeader(d), f.send()
			},
			_finishFile: function(e, t, n) {
				var i = this.owner;
				return i.request("after-send-file", arguments, function() {
					e.setStatus(s.COMPLETE), i.trigger("uploadSuccess", e, t, n)
				}).fail(function(t) {
					e.getStatus() === s.PROGRESS && e.setStatus(s.ERROR, t), i.trigger("uploadError", e, t)
				}).always(function() {
					i.trigger("uploadComplete", e)
				})
			},
			updateFileProgress: function(e) {
				var t = 0,
					n = 0;
				e.blocks && (o.each(e.blocks, function(e, t) {
					n += (t.percentage || 0) * (t.end - t.start)
				}), t = n / e.size, this.owner.trigger("uploadProgress", e, t || 0))
			}
		})
	}), t("widgets/validator", ["base", "uploader", "file", "widgets/widget"], function(e, t, n) {
		var i, r = e.$,
			o = {};
		return i = {
			addValidator: function(e, t) {
				o[e] = t
			},
			removeValidator: function(e) {
				delete o[e]
			}
		}, t.register({
			name: "validator",
			init: function() {
				var t = this;
				e.nextTick(function() {
					r.each(o, function() {
						this.call(t.owner)
					})
				})
			}
		}), i.addValidator("fileNumLimit", function() {
			var e = this,
				t = e.options,
				n = 0,
				i = parseInt(t.fileNumLimit, 10),
				r = !0;
			i && (e.on("beforeFileQueued", function(e) {
				return n >= i && r && (r = !1, this.trigger("error", "Q_EXCEED_NUM_LIMIT", i, e), setTimeout(function() {
					r = !0
				}, 1)), !(n >= i)
			}), e.on("fileQueued", function() {
				n++
			}), e.on("fileDequeued", function() {
				n--
			}), e.on("reset", function() {
				n = 0
			}))
		}), i.addValidator("fileSizeLimit", function() {
			var e = this,
				t = e.options,
				n = 0,
				i = parseInt(t.fileSizeLimit, 10),
				r = !0;
			i && (e.on("beforeFileQueued", function(e) {
				var t = n + e.size > i;
				return t && r && (r = !1, this.trigger("error", "Q_EXCEED_SIZE_LIMIT", i, e), setTimeout(function() {
					r = !0
				}, 1)), !t
			}), e.on("fileQueued", function(e) {
				n += e.size
			}), e.on("fileDequeued", function(e) {
				n -= e.size
			}), e.on("reset", function() {
				n = 0
			}))
		}), i.addValidator("fileSingleSizeLimit", function() {
			var e = this,
				t = e.options.fileSingleSizeLimit;
			t && e.on("beforeFileQueued", function(e) {
				if(e.size > t) return e.setStatus(n.Status.INVALID, "exceed_size"), this.trigger("error", "æ–‡ä»¶å¤§å°è¶…å‡ºé™åˆ¶ï¼Œæœ€å¤§ä¸ºï¼š" + t / 1048576 + "M", t, e), !1
			})
		}), i.addValidator("duplicate", function() {
			function e(e) {
				for(var t = 0, n = 0, i = e.length; n < i; n++) t = e.charCodeAt(n) + (t << 6) + (t << 16) - t;
				return t
			}
			var t = this,
				n = {};
			t.options.duplicate || (t.on("beforeFileQueued", function(t) {
				var i = t.__hash || (t.__hash = e(t.name + t.size + t.lastModifiedDate));
				if(n[i]) return this.trigger("error", "F_DUPLICATE", t), !1
			}), t.on("fileQueued", function(e) {
				var t = e.__hash;
				t && (n[t] = !0)
			}), t.on("fileDequeued", function(e) {
				var t = e.__hash;
				t && delete n[t]
			}), t.on("reset", function() {
				n = {}
			}))
		}), i
	}), t("lib/md5", ["runtime/client", "mediator"], function(e, t) {
		function n() {
			e.call(this, "Md5")
		}
		return t.installTo(n.prototype), n.prototype.loadFromBlob = function(e) {
			var t = this;
			t.getRuid() && t.disconnectRuntime(), t.connectRuntime(e.ruid, function() {
				t.exec("init"), t.exec("loadFromBlob", e)
			})
		}, n.prototype.getResult = function() {
			return this.exec("getResult")
		}, n
	}), t("widgets/md5", ["base", "uploader", "lib/md5", "lib/blob", "widgets/widget"], function(e, t, n, i) {
		return t.register({
			name: "md5",
			md5File: function(t, r, o) {
				var a = new n,
					s = e.Deferred(),
					u = t instanceof i ? t : this.request("get-file", t).source;
				return a.on("progress load", function(e) {
					e = e || {}, s.notify(e.total ? e.loaded / e.total : 1)
				}), a.on("complete", function() {
					s.resolve(a.getResult())
				}), a.on("error", function(e) {
					s.reject(e)
				}), arguments.length > 1 && (r = r || 0, o = o || 0, r < 0 && (r = u.size + r), o < 0 && (o = u.size + o), o = Math.min(o, u.size), u = u.slice(r, o)), a.loadFromBlob(u), s.promise()
			}
		})
	}), t("runtime/compbase", [], function() {
		return function(e, t) {
			this.owner = e, this.options = e.options, this.getRuntime = function() {
				return t
			}, this.getRuid = function() {
				return t.uid
			}, this.trigger = function() {
				return e.trigger.apply(e, arguments)
			}
		}
	}), t("runtime/html5/runtime", ["base", "runtime/runtime", "runtime/compbase"], function(t, n, i) {
		function r() {
			var e = {},
				i = this,
				r = this.destroy;
			n.apply(i, arguments), i.type = o, i.exec = function(n, r) {
				var o, s = this,
					u = s.uid,
					c = t.slice(arguments, 2);
				if(a[n] && (o = e[u] = e[u] || new a[n](s, i))[r]) return o[r].apply(o, c)
			}, i.destroy = function() {
				return r && r.apply(this, arguments)
			}
		}
		var o = "html5",
			a = {};
		return t.inherits(n, {
			constructor: r,
			init: function() {
				var e = this;
				setTimeout(function() {
					e.trigger("ready")
				}, 1)
			}
		}), r.register = function(e, n) {
			return a[e] = t.inherits(i, n)
		}, e.Blob && e.FileReader && e.DataView && n.addRuntime(o, r), r
	}), t("runtime/html5/blob", ["runtime/html5/runtime", "lib/blob"], function(e, t) {
		return e.register("Blob", {
			slice: function(e, n) {
				var i = this.owner.source;
				return i = (i.slice || i.webkitSlice || i.mozSlice).call(i, e, n), new t(this.getRuid(), i)
			}
		})
	}), t("runtime/html5/dnd", ["base", "runtime/html5/runtime", "lib/file"], function(e, t, n) {
		var i = e.$,
			r = "webuploader-dnd-";
		return t.register("DragAndDrop", {
			init: function() {
				var t = this.elem = this.options.container;
				this.dragEnterHandler = e.bindFn(this._dragEnterHandler, this), this.dragOverHandler = e.bindFn(this._dragOverHandler, this), this.dragLeaveHandler = e.bindFn(this._dragLeaveHandler, this), this.dropHandler = e.bindFn(this._dropHandler, this), this.dndOver = !1, t.on("dragenter", this.dragEnterHandler), t.on("dragover", this.dragOverHandler), t.on("dragleave", this.dragLeaveHandler), t.on("drop", this.dropHandler), this.options.disableGlobalDnd && (i(document).on("dragover", this.dragOverHandler), i(document).on("drop", this.dropHandler))
			},
			_dragEnterHandler: function(e) {
				var t, n = this,
					i = n._denied || !1;
				return e = e.originalEvent || e, n.dndOver || (n.dndOver = !0, (t = e.dataTransfer.items) && t.length && (n._denied = i = !n.trigger("accept", t)), n.elem.addClass(r + "over"), n.elem[i ? "addClass" : "removeClass"](r + "denied")), e.dataTransfer.dropEffect = i ? "none" : "copy", !1
			},
			_dragOverHandler: function(e) {
				var t = this.elem.parent().get(0);
				return !(t && !i.contains(t, e.currentTarget)) && (clearTimeout(this._leaveTimer), this._dragEnterHandler.call(this, e), !1)
			},
			_dragLeaveHandler: function() {
				var e, t = this;
				return e = function() {
					t.dndOver = !1, t.elem.removeClass(r + "over " + r + "denied")
				}, clearTimeout(t._leaveTimer), t._leaveTimer = setTimeout(e, 100), !1
			},
			_dropHandler: function(e) {
				var t, o, a = this,
					s = a.getRuid(),
					u = a.elem.parent().get(0);
				if(u && !i.contains(u, e.currentTarget)) return !1;
				t = (e = e.originalEvent || e).dataTransfer;
				try {
					o = t.getData("text/html")
				} catch(e) {}
				return o ? void 0 : (a._getTansferFiles(t, function(e) {
					a.trigger("drop", i.map(e, function(e) {
						return new n(s, e)
					}))
				}), a.dndOver = !1, a.elem.removeClass(r + "over"), !1)
			},
			_getTansferFiles: function(t, n) {
				var i, r, o, a, s, u, c, l = [],
					f = [];
				for(i = t.items, r = t.files, c = !(!i || !i[0].webkitGetAsEntry), s = 0, u = r.length; s < u; s++) o = r[s], a = i && i[s], c && a.webkitGetAsEntry().isDirectory ? f.push(this._traverseDirectoryTree(a.webkitGetAsEntry(), l)) : l.push(o);
				e.when.apply(e, f).done(function() {
					l.length && n(l)
				})
			},
			_traverseDirectoryTree: function(t, n) {
				var i = e.Deferred(),
					r = this;
				return t.isFile ? t.file(function(e) {
					n.push(e), i.resolve()
				}) : t.isDirectory && t.createReader().readEntries(function(t) {
					var o, a = t.length,
						s = [],
						u = [];
					for(o = 0; o < a; o++) s.push(r._traverseDirectoryTree(t[o], u));
					e.when.apply(e, s).then(function() {
						n.push.apply(n, u), i.resolve()
					}, i.reject)
				}), i.promise()
			},
			destroy: function() {
				var e = this.elem;
				e && (e.off("dragenter", this.dragEnterHandler), e.off("dragover", this.dragOverHandler), e.off("dragleave", this.dragLeaveHandler), e.off("drop", this.dropHandler), this.options.disableGlobalDnd && (i(document).off("dragover", this.dragOverHandler), i(document).off("drop", this.dropHandler)))
			}
		})
	}), t("runtime/html5/filepaste", ["base", "runtime/html5/runtime", "lib/file"], function(e, t, n) {
		return t.register("FilePaste", {
			init: function() {
				var t, n, i, r, o = this.options,
					a = this.elem = o.container,
					s = ".*";
				if(o.accept) {
					for(t = [], n = 0, i = o.accept.length; n < i; n++)(r = o.accept[n].mimeTypes) && t.push(r);
					t.length && (s = (s = t.join(",")).replace(/,/g, "|").replace(/\*/g, ".*"))
				}
				this.accept = s = new RegExp(s, "i"), this.hander = e.bindFn(this._pasteHander, this), a.on("paste", this.hander)
			},
			_pasteHander: function(e) {
				var t, i, r, o, a, s = [],
					u = this.getRuid();
				for(o = 0, a = (t = (e = e.originalEvent || e).clipboardData.items).length; o < a; o++) "file" === (i = t[o]).kind && (r = i.getAsFile()) && s.push(new n(u, r));
				s.length && (e.preventDefault(), e.stopPropagation(), this.trigger("paste", s))
			},
			destroy: function() {
				this.elem.off("paste", this.hander)
			}
		})
	}), t("runtime/html5/filepicker", ["base", "runtime/html5/runtime"], function(e, t) {
		var n = e.$;
		return t.register("FilePicker", {
			init: function() {
				var e, t, i, r, o = this.getRuntime().getContainer(),
					a = this,
					s = a.owner,
					u = a.options,
					c = this.label = n(document.createElement("label")),
					l = this.input = n(document.createElement("input"));
				if(l.attr("type", "file"), l.attr("name", u.name), l.addClass("webuploader-element-invisible"), c.on("click", function() {
						l.trigger("click")
					}), c.css({
						opacity: 0,
						width: "100%",
						height: "100%",
						display: "block",
						cursor: "pointer",
						background: "#ffffff"
					}), u.multiple && l.attr("multiple", "multiple"), u.accept && u.accept.length > 0) {
					for(e = [], t = 0, i = u.accept.length; t < i; t++) e.push(u.accept[t].mimeTypes);
					l.attr("accept", e.join(","))
				}
				o.append(l), o.append(c), r = function(e) {
					s.trigger(e.type)
				}, l.on("change", function(e) {
					var t, i = arguments.callee;
					a.files = e.target.files, (t = this.cloneNode(!0)).value = null, this.parentNode.replaceChild(t, this), l.off(), l = n(t).on("change", i).on("mouseenter mouseleave", r), s.trigger("change")
				}), c.on("mouseenter mouseleave", r)
			},
			getFiles: function() {
				return this.files
			},
			destroy: function() {
				this.input.off(), this.label.off()
			}
		})
	}), t("runtime/html5/util", ["base"], function(t) {
		var n = e.createObjectURL && e || e.URL && URL.revokeObjectURL && URL || e.webkitURL,
			i = t.noop,
			r = i;
		return n && (i = function() {
			return n.createObjectURL.apply(n, arguments)
		}, r = function() {
			return n.revokeObjectURL.apply(n, arguments)
		}), {
			createObjectURL: i,
			revokeObjectURL: r,
			dataURL2Blob: function(e) {
				var t, n, i, r, o, a;
				for(t = ~(a = e.split(","))[0].indexOf("base64") ? atob(a[1]) : decodeURIComponent(a[1]), i = new ArrayBuffer(t.length), n = new Uint8Array(i), r = 0; r < t.length; r++) n[r] = t.charCodeAt(r);
				return o = a[0].split(":")[1].split(";")[0], this.arrayBufferToBlob(i, o)
			},
			dataURL2ArrayBuffer: function(e) {
				var t, n, i, r;
				for(t = ~(r = e.split(","))[0].indexOf("base64") ? atob(r[1]) : decodeURIComponent(r[1]), n = new Uint8Array(t.length), i = 0; i < t.length; i++) n[i] = t.charCodeAt(i);
				return n.buffer
			},
			arrayBufferToBlob: function(t, n) {
				var i, r = e.BlobBuilder || e.WebKitBlobBuilder;
				return r ? ((i = new r).append(t), i.getBlob(n)) : new Blob([t], n ? {
					type: n
				} : {})
			},
			canvasToDataUrl: function(e, t, n) {
				return e.toDataURL(t, n / 100)
			},
			parseMeta: function(e, t) {
				t(!1, {})
			},
			updateImageHead: function(e) {
				return e
			}
		}
	}), t("runtime/html5/imagemeta", ["runtime/html5/util"], function(e) {
		var t;
		return t = {
			parsers: {
				65505: []
			},
			maxMetaDataSize: 262144,
			parse: function(e, t) {
				var n = this,
					i = new FileReader;
				i.onload = function() {
					t(!1, n._parse(this.result)), i = i.onload = i.onerror = null
				}, i.onerror = function(e) {
					t(e.message), i = i.onload = i.onerror = null
				}, e = e.slice(0, n.maxMetaDataSize), i.readAsArrayBuffer(e.getSource())
			},
			_parse: function(e, n) {
				if(!(e.byteLength < 6)) {
					var i, r, o, a, s = new DataView(e),
						u = 2,
						c = s.byteLength - 4,
						l = u,
						f = {};
					if(65496 === s.getUint16(0)) {
						for(; u < c && ((i = s.getUint16(u)) >= 65504 && i <= 65519 || 65534 === i) && (r = s.getUint16(u + 2) + 2, !(u + r > s.byteLength));) {
							if(o = t.parsers[i], !n && o)
								for(a = 0; a < o.length; a += 1) o[a].call(t, s, u, r, f);
							l = u += r
						}
						l > 6 && (e.slice ? f.imageHead = e.slice(2, l) : f.imageHead = new Uint8Array(e).subarray(2, l))
					}
					return f
				}
			},
			updateImageHead: function(e, t) {
				var n, i, r, o = this._parse(e, !0);
				return r = 2, o.imageHead && (r = 2 + o.imageHead.byteLength), i = e.slice ? e.slice(r) : new Uint8Array(e).subarray(r), n = new Uint8Array(t.byteLength + 2 + i.byteLength), n[0] = 255, n[1] = 216, n.set(new Uint8Array(t), 2), n.set(new Uint8Array(i), t.byteLength + 2), n.buffer
			}
		}, e.parseMeta = function() {
			return t.parse.apply(t, arguments)
		}, e.updateImageHead = function() {
			return t.updateImageHead.apply(t, arguments)
		}, t
	}), t("runtime/html5/imagemeta/exif", ["base", "runtime/html5/imagemeta"], function(e, t) {
		var n = {};
		return n.ExifMap = function() {
			return this
		}, n.ExifMap.prototype.map = {
			Orientation: 274
		}, n.ExifMap.prototype.get = function(e) {
			return this[e] || this[this.map[e]]
		}, n.exifTagTypes = {
			1: {
				getValue: function(e, t) {
					return e.getUint8(t)
				},
				size: 1
			},
			2: {
				getValue: function(e, t) {
					return String.fromCharCode(e.getUint8(t))
				},
				size: 1,
				ascii: !0
			},
			3: {
				getValue: function(e, t, n) {
					return e.getUint16(t, n)
				},
				size: 2
			},
			4: {
				getValue: function(e, t, n) {
					return e.getUint32(t, n)
				},
				size: 4
			},
			5: {
				getValue: function(e, t, n) {
					return e.getUint32(t, n) / e.getUint32(t + 4, n)
				},
				size: 8
			},
			9: {
				getValue: function(e, t, n) {
					return e.getInt32(t, n)
				},
				size: 4
			},
			10: {
				getValue: function(e, t, n) {
					return e.getInt32(t, n) / e.getInt32(t + 4, n)
				},
				size: 8
			}
		}, n.exifTagTypes[7] = n.exifTagTypes[1], n.getExifValue = function(t, i, r, o, a, s) {
			var u, c, l, f, h, d, p = n.exifTagTypes[o];
			if(p) {
				if(u = p.size * a, !((c = u > 4 ? i + t.getUint32(r + 8, s) : r + 8) + u > t.byteLength)) {
					if(1 === a) return p.getValue(t, c, s);
					for(l = [], f = 0; f < a; f += 1) l[f] = p.getValue(t, c + f * p.size, s);
					if(p.ascii) {
						for(h = "", f = 0; f < l.length && "\0" !== (d = l[f]); f += 1) h += d;
						return h
					}
					return l
				}
				e.log("Invalid Exif data: Invalid data offset.")
			} else e.log("Invalid Exif data: Invalid tag type.")
		}, n.parseExifTag = function(e, t, i, r, o) {
			var a = e.getUint16(i, r);
			o.exif[a] = n.getExifValue(e, t, i, e.getUint16(i + 2, r), e.getUint32(i + 4, r), r)
		}, n.parseExifTags = function(t, n, i, r, o) {
			var a, s, u;
			if(i + 6 > t.byteLength) e.log("Invalid Exif data: Invalid directory offset.");
			else {
				if(a = t.getUint16(i, r), !((s = i + 2 + 12 * a) + 4 > t.byteLength)) {
					for(u = 0; u < a; u += 1) this.parseExifTag(t, n, i + 2 + 12 * u, r, o);
					return t.getUint32(s, r)
				}
				e.log("Invalid Exif data: Invalid directory size.")
			}
		}, n.parseExifData = function(t, i, r, o) {
			var a, s, u = i + 10;
			if(1165519206 === t.getUint32(i + 4))
				if(u + 8 > t.byteLength) e.log("Invalid Exif data: Invalid segment size.");
				else if(0 === t.getUint16(i + 8)) {
				switch(t.getUint16(u)) {
					case 18761:
						a = !0;
						break;
					case 19789:
						a = !1;
						break;
					default:
						return void e.log("Invalid Exif data: Invalid byte alignment marker.")
				}
				42 === t.getUint16(u + 2, a) ? (s = t.getUint32(u + 4, a), o.exif = new n.ExifMap, s = n.parseExifTags(t, u, u + s, a, o)) : e.log("Invalid Exif data: Missing TIFF marker.")
			} else e.log("Invalid Exif data: Missing byte alignment offset.")
		}, t.parsers[65505].push(n.parseExifData), n
	}), t("runtime/html5/jpegencoder", [], function(e, t, n) {
		function i(e) {
			function t(e) {
				for(var t = [16, 11, 10, 16, 24, 40, 51, 61, 12, 12, 14, 19, 26, 58, 60, 55, 14, 13, 16, 24, 40, 57, 69, 56, 14, 17, 22, 29, 51, 87, 80, 62, 18, 22, 37, 56, 68, 109, 103, 77, 24, 35, 55, 64, 81, 104, 113, 92, 49, 64, 78, 87, 103, 121, 120, 101, 72, 92, 95, 98, 112, 100, 103, 99], n = 0; n < 64; n++) {
					var i = R((t[n] * e + 50) / 100);
					i < 1 ? i = 1 : i > 255 && (i = 255), E[H[n]] = i
				}
				for(var r = [17, 18, 24, 47, 99, 99, 99, 99, 18, 21, 26, 66, 99, 99, 99, 99, 24, 26, 56, 99, 99, 99, 99, 99, 47, 66, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99], o = 0; o < 64; o++) {
					var a = R((r[o] * e + 50) / 100);
					a < 1 ? a = 1 : a > 255 && (a = 255), k[H[o]] = a
				}
				for(var s = [1, 1.387039845, 1.306562965, 1.175875602, 1, .785694958, .5411961, .275899379], u = 0, c = 0; c < 8; c++)
					for(var l = 0; l < 8; l++) S[u] = 1 / (E[H[u]] * s[c] * s[l] * 8), T[u] = 1 / (k[H[u]] * s[c] * s[l] * 8), u++
			}

			function n(e, t) {
				for(var n = 0, i = 0, r = new Array, o = 1; o <= 16; o++) {
					for(var a = 1; a <= e[o]; a++) r[t[i]] = [], r[t[i]][0] = n, r[t[i]][1] = o, i++, n++;
					n *= 2
				}
				return r
			}

			function i() {
				b = n(z, j), _ = n(Q, V), y = n(N, $), w = n(G, W)
			}

			function r() {
				for(var e = 1, t = 2, n = 1; n <= 15; n++) {
					for(var i = e; i < t; i++) A[32767 + i] = n, F[32767 + i] = [], F[32767 + i][1] = n, F[32767 + i][0] = i;
					for(var r = -(t - 1); r <= -e; r++) A[32767 + r] = n, F[32767 + r] = [], F[32767 + r][1] = n, F[32767 + r][0] = t - 1 + r;
					e <<= 1, t <<= 1
				}
			}

			function o() {
				for(var e = 0; e < 256; e++) M[e] = 19595 * e, M[e + 256 >> 0] = 38470 * e, M[e + 512 >> 0] = 7471 * e + 32768, M[e + 768 >> 0] = -11059 * e, M[e + 1024 >> 0] = -21709 * e, M[e + 1280 >> 0] = 32768 * e + 8421375, M[e + 1536 >> 0] = -27439 * e, M[e + 1792 >> 0] = -5329 * e
			}

			function a(e) {
				for(var t = e[0], n = e[1] - 1; n >= 0;) t & 1 << n && (I |= 1 << C), n--, --C < 0 && (255 == I ? (s(255), s(0)) : s(I), C = 7, I = 0)
			}

			function s(e) {
				O.push(P[e])
			}

			function u(e) {
				s(e >> 8 & 255), s(255 & e)
			}

			function c(e, t) {
				var n, i, r, o, a, s, u, c, l, f = 0;
				for(l = 0; l < 8; ++l) {
					n = e[f], i = e[f + 1], r = e[f + 2], o = e[f + 3], a = e[f + 4], s = e[f + 5], u = e[f + 6];
					var h = n + (c = e[f + 7]),
						d = n - c,
						p = i + u,
						g = i - u,
						m = r + s,
						v = r - s,
						b = o + a,
						_ = o - a,
						y = h + b,
						w = h - b,
						x = p + m,
						R = p - m;
					e[f] = y + x, e[f + 4] = y - x;
					var E = .707106781 * (R + w);
					e[f + 2] = w + E, e[f + 6] = w - E;
					var k = .382683433 * ((y = _ + v) - (R = g + d)),
						S = .5411961 * y + k,
						T = 1.306562965 * R + k,
						F = .707106781 * (x = v + g),
						A = d + F,
						D = d - F;
					e[f + 5] = D + S, e[f + 3] = D - S, e[f + 1] = A + T, e[f + 7] = A - T, f += 8
				}
				for(f = 0, l = 0; l < 8; ++l) {
					n = e[f], i = e[f + 8], r = e[f + 16], o = e[f + 24], a = e[f + 32], s = e[f + 40], u = e[f + 48];
					var O = n + (c = e[f + 56]),
						I = n - c,
						C = i + u,
						q = i - u,
						B = r + s,
						L = r - s,
						P = o + a,
						M = o - a,
						H = O + P,
						z = O - P,
						j = C + B,
						N = C - B;
					e[f] = H + j, e[f + 32] = H - j;
					var $ = .707106781 * (N + z);
					e[f + 16] = z + $, e[f + 48] = z - $;
					var Q = .382683433 * ((H = M + L) - (N = q + I)),
						V = .5411961 * H + Q,
						G = 1.306562965 * N + Q,
						W = .707106781 * (j = L + q),
						J = I + W,
						X = I - W;
					e[f + 40] = X + V, e[f + 24] = X - V, e[f + 8] = J + G, e[f + 56] = J - G, f++
				}
				var Z;
				for(l = 0; l < 64; ++l) Z = e[l] * t[l], U[l] = Z > 0 ? Z + .5 | 0 : Z - .5 | 0;
				return U
			}

			function l() {
				u(65504), u(16), s(74), s(70), s(73), s(70), s(0), s(1), s(1), s(0), u(1), u(1), s(0), s(0)
			}

			function f(e, t) {
				u(65472), u(17), s(8), u(t), u(e), s(3), s(1), s(17), s(0), s(2), s(17), s(1), s(3), s(17), s(1)
			}

			function h() {
				u(65499), u(132), s(0);
				for(var e = 0; e < 64; e++) s(E[e]);
				s(1);
				for(var t = 0; t < 64; t++) s(k[t])
			}

			function d() {
				u(65476), u(418), s(0);
				for(var e = 0; e < 16; e++) s(z[e + 1]);
				for(var t = 0; t <= 11; t++) s(j[t]);
				s(16);
				for(var n = 0; n < 16; n++) s(N[n + 1]);
				for(var i = 0; i <= 161; i++) s($[i]);
				s(1);
				for(var r = 0; r < 16; r++) s(Q[r + 1]);
				for(var o = 0; o <= 11; o++) s(V[o]);
				s(17);
				for(var a = 0; a < 16; a++) s(G[a + 1]);
				for(var c = 0; c <= 161; c++) s(W[c])
			}

			function p() {
				u(65498), u(12), s(3), s(1), s(0), s(2), s(17), s(3), s(17), s(0), s(63), s(0)
			}

			function g(e, t, n, i, r) {
				for(var o, s = r[0], u = r[240], l = c(e, t), f = 0; f < 64; ++f) D[H[f]] = l[f];
				var h = D[0] - n;
				n = D[0], 0 == h ? a(i[0]) : (a(i[A[o = 32767 + h]]), a(F[o]));
				for(var d = 63; d > 0 && 0 == D[d]; d--);
				if(0 == d) return a(s), n;
				for(var p, g = 1; g <= d;) {
					for(var m = g; 0 == D[g] && g <= d; ++g);
					var v = g - m;
					if(v >= 16) {
						p = v >> 4;
						for(var b = 1; b <= p; ++b) a(u);
						v &= 15
					}
					o = 32767 + D[g], a(r[(v << 4) + A[o]]), a(F[o]), g++
				}
				return 63 != d && a(s), n
			}

			function m() {
				for(var e = String.fromCharCode, t = 0; t < 256; t++) P[t] = e(t)
			}

			function v(e) {
				if(e <= 0 && (e = 1), e > 100 && (e = 100), x != e) {
					t(e < 50 ? Math.floor(5e3 / e) : Math.floor(200 - 2 * e)), x = e
				}
			}
			Math.round;
			var b, _, y, w, x, R = Math.floor,
				E = new Array(64),
				k = new Array(64),
				S = new Array(64),
				T = new Array(64),
				F = new Array(65535),
				A = new Array(65535),
				U = new Array(64),
				D = new Array(64),
				O = [],
				I = 0,
				C = 7,
				q = new Array(64),
				B = new Array(64),
				L = new Array(64),
				P = new Array(256),
				M = new Array(2048),
				H = [0, 1, 5, 6, 14, 15, 27, 28, 2, 4, 7, 13, 16, 26, 29, 42, 3, 8, 12, 17, 25, 30, 41, 43, 9, 11, 18, 24, 31, 40, 44, 53, 10, 19, 23, 32, 39, 45, 52, 54, 20, 22, 33, 38, 46, 51, 55, 60, 21, 34, 37, 47, 50, 56, 59, 61, 35, 36, 48, 49, 57, 58, 62, 63],
				z = [0, 0, 1, 5, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0],
				j = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
				N = [0, 0, 2, 1, 3, 3, 2, 4, 3, 5, 5, 4, 4, 0, 0, 1, 125],
				$ = [1, 2, 3, 0, 4, 17, 5, 18, 33, 49, 65, 6, 19, 81, 97, 7, 34, 113, 20, 50, 129, 145, 161, 8, 35, 66, 177, 193, 21, 82, 209, 240, 36, 51, 98, 114, 130, 9, 10, 22, 23, 24, 25, 26, 37, 38, 39, 40, 41, 42, 52, 53, 54, 55, 56, 57, 58, 67, 68, 69, 70, 71, 72, 73, 74, 83, 84, 85, 86, 87, 88, 89, 90, 99, 100, 101, 102, 103, 104, 105, 106, 115, 116, 117, 118, 119, 120, 121, 122, 131, 132, 133, 134, 135, 136, 137, 138, 146, 147, 148, 149, 150, 151, 152, 153, 154, 162, 163, 164, 165, 166, 167, 168, 169, 170, 178, 179, 180, 181, 182, 183, 184, 185, 186, 194, 195, 196, 197, 198, 199, 200, 201, 202, 210, 211, 212, 213, 214, 215, 216, 217, 218, 225, 226, 227, 228, 229, 230, 231, 232, 233, 234, 241, 242, 243, 244, 245, 246, 247, 248, 249, 250],
				Q = [0, 0, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
				V = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
				G = [0, 0, 2, 1, 2, 4, 4, 3, 4, 7, 5, 4, 4, 0, 1, 2, 119],
				W = [0, 1, 2, 3, 17, 4, 5, 33, 49, 6, 18, 65, 81, 7, 97, 113, 19, 34, 50, 129, 8, 20, 66, 145, 161, 177, 193, 9, 35, 51, 82, 240, 21, 98, 114, 209, 10, 22, 36, 52, 225, 37, 241, 23, 24, 25, 26, 38, 39, 40, 41, 42, 53, 54, 55, 56, 57, 58, 67, 68, 69, 70, 71, 72, 73, 74, 83, 84, 85, 86, 87, 88, 89, 90, 99, 100, 101, 102, 103, 104, 105, 106, 115, 116, 117, 118, 119, 120, 121, 122, 130, 131, 132, 133, 134, 135, 136, 137, 138, 146, 147, 148, 149, 150, 151, 152, 153, 154, 162, 163, 164, 165, 166, 167, 168, 169, 170, 178, 179, 180, 181, 182, 183, 184, 185, 186, 194, 195, 196, 197, 198, 199, 200, 201, 202, 210, 211, 212, 213, 214, 215, 216, 217, 218, 226, 227, 228, 229, 230, 231, 232, 233, 234, 242, 243, 244, 245, 246, 247, 248, 249, 250];
			this.encode = function(e, t) {
				t && v(t), O = new Array, I = 0, C = 7, u(65496), l(), h(), f(e.width, e.height), d(), p();
				var n = 0,
					i = 0,
					r = 0;
				I = 0, C = 7, this.encode.displayName = "_encode_";
				for(var o, s, c, m, x, R, E, k, F, A = e.data, U = e.width, D = e.height, P = 4 * U, H = 0; H < D;) {
					for(o = 0; o < P;) {
						for(R = x = P * H + o, E = -1, k = 0, F = 0; F < 64; F++) R = x + (k = F >> 3) * P + (E = 4 * (7 & F)), H + k >= D && (R -= P * (H + 1 + k - D)), o + E >= P && (R -= o + E - P + 4), s = A[R++], c = A[R++], m = A[R++], q[F] = (M[s] + M[c + 256 >> 0] + M[m + 512 >> 0] >> 16) - 128, B[F] = (M[s + 768 >> 0] + M[c + 1024 >> 0] + M[m + 1280 >> 0] >> 16) - 128, L[F] = (M[s + 1280 >> 0] + M[c + 1536 >> 0] + M[m + 1792 >> 0] >> 16) - 128;
						n = g(q, S, n, b, y), i = g(B, T, i, _, w), r = g(L, T, r, _, w), o += 32
					}
					H += 8
				}
				if(C >= 0) {
					var z = [];
					z[1] = C + 1, z[0] = (1 << C + 1) - 1, a(z)
				}
				u(65497);
				var j = "data:image/jpeg;base64," + btoa(O.join(""));
				return O = [], j
			}, e || (e = 50), m(), i(), r(), o(), v(e)
		}
		return i.encode = function(e, t) {
			return new i(t).encode(e)
		}, i
	}), t("runtime/html5/androidpatch", ["runtime/html5/util", "runtime/html5/jpegencoder", "base"], function(e, t, n) {
		var i, r = e.canvasToDataUrl;
		e.canvasToDataUrl = function(e, o, a) {
			var s, u, c, l, f;
			return n.os.android ? ("image/jpeg" === o && void 0 === i && (l = (l = ~(f = (l = r.apply(null, arguments)).split(","))[0].indexOf("base64") ? atob(f[1]) : decodeURIComponent(f[1])).substring(0, 2), i = 255 === l.charCodeAt(0) && 216 === l.charCodeAt(1)), "image/jpeg" !== o || i ? r.apply(null, arguments) : (u = e.width, c = e.height, s = e.getContext("2d"), t.encode(s.getImageData(0, 0, u, c), a))) : r.apply(null, arguments)
		}
	}), t("runtime/html5/image", ["base", "runtime/html5/runtime", "runtime/html5/util"], function(e, t, n) {
		return t.register("Image", {
			modified: !1,
			init: function() {
				var e = this,
					t = new Image;
				t.onload = function() {
					e._info = {
						type: e.type,
						width: this.width,
						height: this.height
					}, e._metas || "image/jpeg" !== e.type ? e.owner.trigger("load") : n.parseMeta(e._blob, function(t, n) {
						e._metas = n, e.owner.trigger("load")
					})
				}, t.onerror = function() {
					e.owner.trigger("error")
				}, e._img = t
			},
			loadFromBlob: function(e) {
				var t = this,
					i = t._img;
				t._blob = e, t.type = e.type, i.src = n.createObjectURL(e.getSource()), t.owner.once("load", function() {
					n.revokeObjectURL(i.src)
				})
			},
			resize: function(e, t) {
				var n = this._canvas || (this._canvas = document.createElement("canvas"));
				this._resize(this._img, n, e, t), this._blob = null, this.modified = !0, this.owner.trigger("complete", "resize")
			},
			crop: function(e, t, n, i, r) {
				var o = this._canvas || (this._canvas = document.createElement("canvas")),
					a = this.options,
					s = this._img,
					u = s.naturalWidth,
					c = s.naturalHeight,
					l = this.getOrientation();
				r = r || 1, o.width = n, o.height = i, a.preserveHeaders || this._rotate2Orientaion(o, l), this._renderImageToCanvas(o, s, -e, -t, u * r, c * r), this._blob = null, this.modified = !0, this.owner.trigger("complete", "crop")
			},
			getAsBlob: function(e) {
				var t, i = this._blob,
					r = this.options;
				if(e = e || this.type, this.modified || this.type !== e) {
					if(t = this._canvas, "image/jpeg" === e) {
						if(i = n.canvasToDataUrl(t, e, r.quality), r.preserveHeaders && this._metas && this._metas.imageHead) return i = n.dataURL2ArrayBuffer(i), i = n.updateImageHead(i, this._metas.imageHead), i = n.arrayBufferToBlob(i, e)
					} else i = n.canvasToDataUrl(t, e);
					i = n.dataURL2Blob(i)
				}
				return i
			},
			getAsDataUrl: function(e) {
				var t = this.options;
				return "image/jpeg" === (e = e || this.type) ? n.canvasToDataUrl(this._canvas, e, t.quality) : this._canvas.toDataURL(e)
			},
			getOrientation: function() {
				return this._metas && this._metas.exif && this._metas.exif.get("Orientation") || 1
			},
			info: function(e) {
				return e ? (this._info = e, this) : this._info
			},
			meta: function(e) {
				return e ? (this._meta = e, this) : this._meta
			},
			destroy: function() {
				var e = this._canvas;
				this._img.onload = null, e && (e.getContext("2d").clearRect(0, 0, e.width, e.height), e.width = e.height = 0, this._canvas = null), this._img.src = "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs%3D", this._img = this._blob = null
			},
			_resize: function(e, t, n, i) {
				var r, o, a, s, u, c = this.options,
					l = e.width,
					f = e.height,
					h = this.getOrientation();
				~[5, 6, 7, 8].indexOf(h) && (n ^= i, n ^= i ^= n), r = Math[c.crop ? "max" : "min"](n / l, i / f), c.allowMagnify || (r = Math.min(1, r)), o = l * r, a = f * r, c.crop ? (t.width = n, t.height = i) : (t.width = o, t.height = a), s = (t.width - o) / 2, u = (t.height - a) / 2, c.preserveHeaders || this._rotate2Orientaion(t, h), this._renderImageToCanvas(t, e, s, u, o, a)
			},
			_rotate2Orientaion: function(e, t) {
				var n = e.width,
					i = e.height,
					r = e.getContext("2d");
				switch(t) {
					case 5:
					case 6:
					case 7:
					case 8:
						e.width = i, e.height = n
				}
				switch(t) {
					case 2:
						r.translate(n, 0), r.scale(-1, 1);
						break;
					case 3:
						r.translate(n, i), r.rotate(Math.PI);
						break;
					case 4:
						r.translate(0, i), r.scale(1, -1);
						break;
					case 5:
						r.rotate(.5 * Math.PI), r.scale(1, -1);
						break;
					case 6:
						r.rotate(.5 * Math.PI), r.translate(0, -i);
						break;
					case 7:
						r.rotate(.5 * Math.PI), r.translate(n, -i), r.scale(-1, 1);
						break;
					case 8:
						r.rotate(-.5 * Math.PI), r.translate(-n, 0)
				}
			},
			_renderImageToCanvas: function() {
				function t(e, t, n) {
					var i, r, o = document.createElement("canvas"),
						a = o.getContext("2d"),
						s = 0,
						u = n,
						c = n;
					for(o.width = 1, o.height = n, a.drawImage(e, 0, 0), i = a.getImageData(0, 0, 1, n).data; c > s;) 0 === i[4 * (c - 1) + 3] ? u = c : s = c, c = u + s >> 1;
					return 0 === (r = c / n) ? 1 : r
				}

				function n(e) {
					var t, n, i = e.naturalWidth;
					return i * e.naturalHeight > 1048576 && (t = document.createElement("canvas"), t.width = t.height = 1, (n = t.getContext("2d")).drawImage(e, 1 - i, 0), 0 === n.getImageData(0, 0, 1, 1).data[3])
				}
				return e.os.ios ? e.os.ios >= 7 ? function(e, n, i, r, o, a) {
					var s = n.naturalWidth,
						u = n.naturalHeight,
						c = t(n, 0, u);
					return e.getContext("2d").drawImage(n, 0, 0, s * c, u * c, i, r, o, a)
				} : function(e, i, r, o, a, s) {
					var u, c, l, f, h, d, p, g = i.naturalWidth,
						m = i.naturalHeight,
						v = e.getContext("2d"),
						b = n(i),
						_ = "image/jpeg" === this.type,
						y = 1024,
						w = 0,
						x = 0;
					for(b && (g /= 2, m /= 2), v.save(), (u = document.createElement("canvas")).width = u.height = y, c = u.getContext("2d"), l = _ ? t(i, 0, m) : 1, f = Math.ceil(y * a / g), h = Math.ceil(y * s / m / l); w < m;) {
						for(d = 0, p = 0; d < g;) c.clearRect(0, 0, y, y), c.drawImage(i, -d, -w), v.drawImage(u, 0, 0, y, y, r + p, o + x, f, h), d += y, p += f;
						w += y, x += h
					}
					v.restore(), u = c = null
				} : function(t) {
					var n = e.slice(arguments, 1),
						i = t.getContext("2d");
					i.drawImage.apply(i, n)
				}
			}()
		})
	}), t("runtime/html5/transport", ["base", "runtime/html5/runtime"], function(e, t) {
		var n = e.noop,
			i = e.$;
		return t.register("Transport", {
			init: function() {
				this._status = 0, this._response = null
			},
			send: function() {
				var t, n, r, o = this.owner,
					a = this.options,
					s = this._initAjax(),
					u = o._blob,
					c = a.server;
				a.sendAsBinary ? (c += (/\?/.test(c) ? "&" : "?") + i.param(o._formData), n = u.getSource()) : (t = new FormData, i.each(o._formData, function(e, n) {
					t.append(e, n)
				}), t.append(a.fileVal, u.getSource(), a.filename || o._formData.name || "")), a.withCredentials && "withCredentials" in s ? (s.open(a.method, c, !0), s.withCredentials = !0) : s.open(a.method, c), this._setRequestHeader(s, a.headers), n ? (s.overrideMimeType && s.overrideMimeType("application/octet-stream"), e.os.android ? ((r = new FileReader).onload = function() {
					s.send(this.result), r = r.onload = null
				}, r.readAsArrayBuffer(n)) : s.send(n)) : s.send(t)
			},
			getResponse: function() {
				return this._response
			},
			getResponseAsJson: function() {
				return this._parseJson(this._response)
			},
			getStatus: function() {
				return this._status
			},
			abort: function() {
				var e = this._xhr;
				e && (e.upload.onprogress = n, e.onreadystatechange = n, e.abort(), this._xhr = e = null)
			},
			destroy: function() {
				this.abort()
			},
			_initAjax: function() {
				var e = this,
					t = new XMLHttpRequest;
				return !this.options.withCredentials || "withCredentials" in t || "undefined" == typeof XDomainRequest || (t = new XDomainRequest), t.upload.onprogress = function(t) {
					var n = 0;
					return t.lengthComputable && (n = t.loaded / t.total), e.trigger("progress", n)
				}, t.onreadystatechange = function() {
					if(4 === t.readyState) return t.upload.onprogress = n, t.onreadystatechange = n, e._xhr = null, e._status = t.status, t.status >= 200 && t.status < 300 ? (e._response = t.responseText, e.trigger("load")) : t.status >= 500 && t.status < 600 ? (e._response = t.responseText, e.trigger("error", "server")) : e.trigger("error", e._status ? "http" : "abort")
				}, e._xhr = t, t
			},
			_setRequestHeader: function(e, t) {
				i.each(t, function(t, n) {
					e.setRequestHeader(t, n)
				})
			},
			_parseJson: function(e) {
				var t;
				try {
					t = JSON.parse(e)
				} catch(e) {
					t = {}
				}
				return t
			}
		})
	}), t("runtime/html5/md5", ["runtime/html5/runtime"], function(e) {
		var t = function(e, t) {
				return e + t & 4294967295
			},
			n = function(e, n, i, r, o, a) {
				return n = t(t(n, e), t(r, a)), t(n << o | n >>> 32 - o, i)
			},
			i = function(e, t, i, r, o, a, s) {
				return n(t & i | ~t & r, e, t, o, a, s)
			},
			r = function(e, t, i, r, o, a, s) {
				return n(t & r | i & ~r, e, t, o, a, s)
			},
			o = function(e, t, i, r, o, a, s) {
				return n(t ^ i ^ r, e, t, o, a, s)
			},
			a = function(e, t, i, r, o, a, s) {
				return n(i ^ (t | ~r), e, t, o, a, s)
			},
			s = function(e, n) {
				var s = e[0],
					u = e[1],
					c = e[2],
					l = e[3];
				s = i(s, u, c, l, n[0], 7, -680876936), l = i(l, s, u, c, n[1], 12, -389564586), c = i(c, l, s, u, n[2], 17, 606105819), u = i(u, c, l, s, n[3], 22, -1044525330), s = i(s, u, c, l, n[4], 7, -176418897), l = i(l, s, u, c, n[5], 12, 1200080426), c = i(c, l, s, u, n[6], 17, -1473231341), u = i(u, c, l, s, n[7], 22, -45705983), s = i(s, u, c, l, n[8], 7, 1770035416), l = i(l, s, u, c, n[9], 12, -1958414417), c = i(c, l, s, u, n[10], 17, -42063), u = i(u, c, l, s, n[11], 22, -1990404162), s = i(s, u, c, l, n[12], 7, 1804603682), l = i(l, s, u, c, n[13], 12, -40341101), c = i(c, l, s, u, n[14], 17, -1502002290), u = i(u, c, l, s, n[15], 22, 1236535329), s = r(s, u, c, l, n[1], 5, -165796510), l = r(l, s, u, c, n[6], 9, -1069501632), c = r(c, l, s, u, n[11], 14, 643717713), u = r(u, c, l, s, n[0], 20, -373897302), s = r(s, u, c, l, n[5], 5, -701558691), l = r(l, s, u, c, n[10], 9, 38016083), c = r(c, l, s, u, n[15], 14, -660478335), u = r(u, c, l, s, n[4], 20, -405537848), s = r(s, u, c, l, n[9], 5, 568446438), l = r(l, s, u, c, n[14], 9, -1019803690), c = r(c, l, s, u, n[3], 14, -187363961), u = r(u, c, l, s, n[8], 20, 1163531501), s = r(s, u, c, l, n[13], 5, -1444681467), l = r(l, s, u, c, n[2], 9, -51403784), c = r(c, l, s, u, n[7], 14, 1735328473), u = r(u, c, l, s, n[12], 20, -1926607734), s = o(s, u, c, l, n[5], 4, -378558), l = o(l, s, u, c, n[8], 11, -2022574463), c = o(c, l, s, u, n[11], 16, 1839030562), u = o(u, c, l, s, n[14], 23, -35309556), s = o(s, u, c, l, n[1], 4, -1530992060), l = o(l, s, u, c, n[4], 11, 1272893353), c = o(c, l, s, u, n[7], 16, -155497632), u = o(u, c, l, s, n[10], 23, -1094730640), s = o(s, u, c, l, n[13], 4, 681279174), l = o(l, s, u, c, n[0], 11, -358537222), c = o(c, l, s, u, n[3], 16, -722521979), u = o(u, c, l, s, n[6], 23, 76029189), s = o(s, u, c, l, n[9], 4, -640364487), l = o(l, s, u, c, n[12], 11, -421815835), c = o(c, l, s, u, n[15], 16, 530742520), u = o(u, c, l, s, n[2], 23, -995338651), s = a(s, u, c, l, n[0], 6, -198630844), l = a(l, s, u, c, n[7], 10, 1126891415), c = a(c, l, s, u, n[14], 15, -1416354905), u = a(u, c, l, s, n[5], 21, -57434055), s = a(s, u, c, l, n[12], 6, 1700485571), l = a(l, s, u, c, n[3], 10, -1894986606), c = a(c, l, s, u, n[10], 15, -1051523), u = a(u, c, l, s, n[1], 21, -2054922799), s = a(s, u, c, l, n[8], 6, 1873313359), l = a(l, s, u, c, n[15], 10, -30611744), c = a(c, l, s, u, n[6], 15, -1560198380), u = a(u, c, l, s, n[13], 21, 1309151649), s = a(s, u, c, l, n[4], 6, -145523070), l = a(l, s, u, c, n[11], 10, -1120210379), c = a(c, l, s, u, n[2], 15, 718787259), u = a(u, c, l, s, n[9], 21, -343485551), e[0] = t(s, e[0]), e[1] = t(u, e[1]), e[2] = t(c, e[2]), e[3] = t(l, e[3])
			},
			u = function(e) {
				var t, n = [];
				for(t = 0; t < 64; t += 4) n[t >> 2] = e.charCodeAt(t) + (e.charCodeAt(t + 1) << 8) + (e.charCodeAt(t + 2) << 16) + (e.charCodeAt(t + 3) << 24);
				return n
			},
			c = function(e) {
				var t, n = [];
				for(t = 0; t < 64; t += 4) n[t >> 2] = e[t] + (e[t + 1] << 8) + (e[t + 2] << 16) + (e[t + 3] << 24);
				return n
			},
			l = function(e) {
				var t, n, i, r, o, a, c = e.length,
					l = [1732584193, -271733879, -1732584194, 271733878];
				for(t = 64; t <= c; t += 64) s(l, u(e.substring(t - 64, t)));
				for(n = (e = e.substring(t - 64)).length, i = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], t = 0; t < n; t += 1) i[t >> 2] |= e.charCodeAt(t) << (t % 4 << 3);
				if(i[t >> 2] |= 128 << (t % 4 << 3), t > 55)
					for(s(l, i), t = 0; t < 16; t += 1) i[t] = 0;
				return r = 8 * c, r = r.toString(16).match(/(.*?)(.{0,8})$/), o = parseInt(r[2], 16), a = parseInt(r[1], 16) || 0, i[14] = o, i[15] = a, s(l, i), l
			},
			f = function(e) {
				var t, n, i, r, o, a, u = e.length,
					l = [1732584193, -271733879, -1732584194, 271733878];
				for(t = 64; t <= u; t += 64) s(l, c(e.subarray(t - 64, t)));
				for(n = (e = t - 64 < u ? e.subarray(t - 64) : new Uint8Array(0)).length, i = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], t = 0; t < n; t += 1) i[t >> 2] |= e[t] << (t % 4 << 3);
				if(i[t >> 2] |= 128 << (t % 4 << 3), t > 55)
					for(s(l, i), t = 0; t < 16; t += 1) i[t] = 0;
				return r = 8 * u, r = r.toString(16).match(/(.*?)(.{0,8})$/), o = parseInt(r[2], 16), a = parseInt(r[1], 16) || 0, i[14] = o, i[15] = a, s(l, i), l
			},
			h = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"],
			d = function(e) {
				var t, n = "";
				for(t = 0; t < 4; t += 1) n += h[e >> 8 * t + 4 & 15] + h[e >> 8 * t & 15];
				return n
			},
			p = function(e) {
				var t;
				for(t = 0; t < e.length; t += 1) e[t] = d(e[t]);
				return e.join("")
			},
			g = function() {
				this.reset()
			};
		return "5d41402abc4b2a76b9719d911017c592" !== function(e) {
			return p(l(e))
		}("hello") && (t = function(e, t) {
			var n = (65535 & e) + (65535 & t);
			return(e >> 16) + (t >> 16) + (n >> 16) << 16 | 65535 & n
		}), g.prototype.append = function(e) {
			return /[\u0080-\uFFFF]/.test(e) && (e = unescape(encodeURIComponent(e))), this.appendBinary(e), this
		}, g.prototype.appendBinary = function(e) {
			this._buff += e, this._length += e.length;
			var t, n = this._buff.length;
			for(t = 64; t <= n; t += 64) s(this._state, u(this._buff.substring(t - 64, t)));
			return this._buff = this._buff.substr(t - 64), this
		}, g.prototype.end = function(e) {
			var t, n, i = this._buff,
				r = i.length,
				o = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
			for(t = 0; t < r; t += 1) o[t >> 2] |= i.charCodeAt(t) << (t % 4 << 3);
			return this._finish(o, r), n = e ? this._state : p(this._state), this.reset(), n
		}, g.prototype._finish = function(e, t) {
			var n, i, r, o = t;
			if(e[o >> 2] |= 128 << (o % 4 << 3), o > 55)
				for(s(this._state, e), o = 0; o < 16; o += 1) e[o] = 0;
			n = (n = 8 * this._length).toString(16).match(/(.*?)(.{0,8})$/), i = parseInt(n[2], 16), r = parseInt(n[1], 16) || 0, e[14] = i, e[15] = r, s(this._state, e)
		}, g.prototype.reset = function() {
			return this._buff = "", this._length = 0, this._state = [1732584193, -271733879, -1732584194, 271733878], this
		}, g.prototype.destroy = function() {
			delete this._state, delete this._buff, delete this._length
		}, g.hash = function(e, t) {
			/[\u0080-\uFFFF]/.test(e) && (e = unescape(encodeURIComponent(e)));
			var n = l(e);
			return t ? n : p(n)
		}, g.hashBinary = function(e, t) {
			var n = l(e);
			return t ? n : p(n)
		}, g.ArrayBuffer = function() {
			this.reset()
		}, g.ArrayBuffer.prototype.append = function(e) {
			var t, n = this._concatArrayBuffer(this._buff, e),
				i = n.length;
			for(this._length += e.byteLength, t = 64; t <= i; t += 64) s(this._state, c(n.subarray(t - 64, t)));
			return this._buff = t - 64 < i ? n.subarray(t - 64) : new Uint8Array(0), this
		}, g.ArrayBuffer.prototype.end = function(e) {
			var t, n, i = this._buff,
				r = i.length,
				o = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
			for(t = 0; t < r; t += 1) o[t >> 2] |= i[t] << (t % 4 << 3);
			return this._finish(o, r), n = e ? this._state : p(this._state), this.reset(), n
		}, g.ArrayBuffer.prototype._finish = g.prototype._finish, g.ArrayBuffer.prototype.reset = function() {
			return this._buff = new Uint8Array(0), this._length = 0, this._state = [1732584193, -271733879, -1732584194, 271733878], this
		}, g.ArrayBuffer.prototype.destroy = g.prototype.destroy, g.ArrayBuffer.prototype._concatArrayBuffer = function(e, t) {
			var n = e.length,
				i = new Uint8Array(n + t.byteLength);
			return i.set(e), i.set(new Uint8Array(t), n), i
		}, g.ArrayBuffer.hash = function(e, t) {
			var n = f(new Uint8Array(e));
			return t ? n : p(n)
		}, e.register("Md5", {
			init: function() {},
			loadFromBlob: function(e) {
				var t, n, i = e.getSource(),
					r = Math.ceil(i.size / 2097152),
					o = 0,
					a = this.owner,
					s = new g.ArrayBuffer,
					u = this,
					c = i.mozSlice || i.webkitSlice || i.slice;
				n = new FileReader, (t = function() {
					var l, f;
					l = 2097152 * o, f = Math.min(l + 2097152, i.size), n.onload = function(t) {
						s.append(t.target.result), a.trigger("progress", {
							total: e.size,
							loaded: f
						})
					}, n.onloadend = function() {
						n.onloadend = n.onload = null, ++o < r ? setTimeout(t, 1) : setTimeout(function() {
							a.trigger("load"), u.result = s.end(), t = e = i = s = null, a.trigger("complete")
						}, 50)
					}, n.readAsArrayBuffer(c.call(i, l, f))
				})()
			},
			getResult: function() {
				return this.result
			}
		})
	}), t("runtime/flash/runtime", ["base", "runtime/runtime", "runtime/compbase"], function(t, n, i) {
		function r() {
			function i(e, t) {
				var n, i, r = e.type || e;
				i = (n = r.split("::"))[0], "Ready" === (r = n[1]) && i === c.uid ? c.trigger("ready") : o[i] && o[i].trigger(r.toLowerCase(), e, t)
			}
			var r = {},
				o = {},
				u = this.destroy,
				c = this,
				l = t.guid("webuploader_");
			n.apply(c, arguments), c.type = a, c.exec = function(e, n) {
				var i, a = this,
					u = a.uid,
					l = t.slice(arguments, 2);
				return o[u] = a, s[e] && (r[u] || (r[u] = new s[e](a, c)), (i = r[u])[n]) ? i[n].apply(i, l) : c.flashExec.apply(a, arguments)
			}, e[l] = function() {
				var e = arguments;
				setTimeout(function() {
					i.apply(null, e)
				}, 1)
			}, this.jsreciver = l, this.destroy = function() {
				return u && u.apply(this, arguments)
			}, this.flashExec = function(e, n) {
				var i = c.getFlash(),
					r = t.slice(arguments, 2);
				return i.exec(this.uid, e, n, r)
			}
		}
		var o = t.$,
			a = "flash",
			s = {};
		return t.inherits(n, {
				constructor: r,
				init: function() {
					var e, n = this.getContainer(),
						i = this.options;
					n.css({
						position: "absolute",
						top: "-8px",
						left: "-8px",
						width: "9px",
						height: "9px",
						overflow: "hidden"
					}), e = '<object id="' + this.uid + '" type="application/x-shockwave-flash" data="' + i.swf + '" ', t.browser.ie && (e += 'classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" '), e += 'width="100%" height="100%" style="outline:0"><param name="movie" value="' + i.swf + '" /><param name="flashvars" value="uid=' + this.uid + "&jsreciver=" + this.jsreciver + '" /><param name="wmode" value="transparent" /><param name="allowscriptaccess" value="always" /></object>', n.html(e)
				},
				getFlash: function() {
					return this._flash ? this._flash : (this._flash = o("#" + this.uid).get(0), this._flash)
				}
			}), r.register = function(e, n) {
				return n = s[e] = t.inherits(i, o.extend({
					flashExec: function() {
						var e = this.owner;
						return this.getRuntime().flashExec.apply(e, arguments)
					}
				}, n))
			},
			function() {
				var e;
				try {
					e = navigator.plugins["Shockwave Flash"], e = e.description
				} catch(t) {
					try {
						e = new ActiveXObject("ShockwaveFlash.ShockwaveFlash").GetVariable("$version")
					} catch(t) {
						e = "0.0"
					}
				}
				return e = e.match(/\d+/g), parseFloat(e[0] + "." + e[1], 10)
			}() >= 11.4 && n.addRuntime(a, r), r
	}), t("runtime/flash/filepicker", ["base", "runtime/flash/runtime"], function(e, t) {
		var n = e.$;
		return t.register("FilePicker", {
			init: function(e) {
				var t, i, r = n.extend({}, e);
				for(t = r.accept && r.accept.length, i = 0; i < t; i++) r.accept[i].title || (r.accept[i].title = "Files");
				delete r.button, delete r.id, delete r.container, this.flashExec("FilePicker", "init", r)
			},
			destroy: function() {
				this.flashExec("FilePicker", "destroy")
			}
		})
	}), t("runtime/flash/image", ["runtime/flash/runtime"], function(e) {
		return e.register("Image", {
			loadFromBlob: function(e) {
				var t = this.owner;
				t.info() && this.flashExec("Image", "info", t.info()), t.meta() && this.flashExec("Image", "meta", t.meta()), this.flashExec("Image", "loadFromBlob", e.uid)
			}
		})
	}), t("runtime/flash/transport", ["base", "runtime/flash/runtime", "runtime/client"], function(t, n, i) {
		var r = t.$;
		return n.register("Transport", {
			init: function() {
				this._status = 0, this._response = null, this._responseJson = null
			},
			send: function() {
				var e, t = this.owner,
					n = this.options,
					i = this._initAjax(),
					o = t._blob,
					a = n.server;
				i.connectRuntime(o.ruid), n.sendAsBinary ? (a += (/\?/.test(a) ? "&" : "?") + r.param(t._formData), e = o.uid) : (r.each(t._formData, function(e, t) {
					i.exec("append", e, t)
				}), i.exec("appendBlob", n.fileVal, o.uid, n.filename || t._formData.name || "")), this._setRequestHeader(i, n.headers), i.exec("send", {
					method: n.method,
					url: a,
					forceURLStream: n.forceURLStream,
					mimeType: "application/octet-stream"
				}, e)
			},
			getStatus: function() {
				return this._status
			},
			getResponse: function() {
				return this._response || ""
			},
			getResponseAsJson: function() {
				return this._responseJson
			},
			abort: function() {
				var e = this._xhr;
				e && (e.exec("abort"), e.destroy(), this._xhr = e = null)
			},
			destroy: function() {
				this.abort()
			},
			_initAjax: function() {
				var t = this,
					n = new i("XMLHttpRequest");
				return n.on("uploadprogress progress", function(e) {
					var n = e.loaded / e.total;
					return n = Math.min(1, Math.max(0, n)), t.trigger("progress", n)
				}), n.on("load", function() {
					var i, r = n.exec("getStatus"),
						o = !1,
						a = "";
					return n.off(), t._xhr = null, r >= 200 && r < 300 ? o = !0 : r >= 500 && r < 600 ? (o = !0, a = "server") : a = "http", o && (t._response = n.exec("getResponse"), t._response = decodeURIComponent(t._response), i = e.JSON && e.JSON.parse || function(e) {
						try {
							return new Function("return " + e).call()
						} catch(e) {
							return {}
						}
					}, t._responseJson = t._response ? i(t._response) : {}), n.destroy(), n = null, a ? t.trigger("error", a) : t.trigger("load")
				}), n.on("error", function() {
					n.off(), t._xhr = null, t.trigger("error", "http")
				}), t._xhr = n, n
			},
			_setRequestHeader: function(e, t) {
				r.each(t, function(t, n) {
					e.exec("setRequestHeader", t, n)
				})
			}
		})
	}), t("runtime/flash/blob", ["runtime/flash/runtime", "lib/blob"], function(e, t) {
		return e.register("Blob", {
			slice: function(e, n) {
				var i = this.flashExec("Blob", "slice", e, n);
				return new t(i.uid, i)
			}
		})
	}), t("runtime/flash/md5", ["runtime/flash/runtime"], function(e) {
		return e.register("Md5", {
			init: function() {},
			loadFromBlob: function(e) {
				return this.flashExec("Md5", "loadFromBlob", e.uid)
			}
		})
	}), t("preset/all", ["base", "widgets/filednd", "widgets/filepaste", "widgets/filepicker", "widgets/image", "widgets/queue", "widgets/runtime", "widgets/upload", "widgets/validator", "widgets/md5", "runtime/html5/blob", "runtime/html5/dnd", "runtime/html5/filepaste", "runtime/html5/filepicker", "runtime/html5/imagemeta/exif", "runtime/html5/androidpatch", "runtime/html5/image", "runtime/html5/transport", "runtime/html5/md5", "runtime/flash/filepicker", "runtime/flash/image", "runtime/flash/transport", "runtime/flash/blob", "runtime/flash/md5"], function(e) {
		return e
	}), t("webuploader", ["preset/all"], function(e) {
		return e
	}), n("webuploader")
});