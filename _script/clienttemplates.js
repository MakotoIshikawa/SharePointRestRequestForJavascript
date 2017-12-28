function $_global_clienttemplates() {
	if ("undefined" == typeof g_all_modules) g_all_modules = {};
	g_all_modules["clienttemplates.js"] = {
		version: {
			rmj: 16,
			rmm: 0,
			rup: 6712,
			rpr: 1210
		}
	};
	typeof spWriteProfilerMark == "function" && spWriteProfilerMark("perfMarkBegin_clienttemplates.js");
	ContextMenu.prototype.open = function () {};
	ContextMenu.prototype.root = function () {
		return null
	};
	ContextMenu.IsOpen = function () {
		var a = document.querySelector(".ms-js-contextmenu");
		return Boolean(a)
	};
	ContextMenu._idUniqueNum = 0;
	if (typeof window.SPListView == "undefined") window.SPListView = false;
	isSLV = typeof SingleListView != "undefined";
	InitListViewSettings();
	bListViewSettingsInitialized = false;
	bListViewStringsInitialized = false;
	InitListViewStrings();
	if (typeof window.ListView == "undefined") window.ListView = {};
	if (typeof window.ListView.ImageBasePath == "undefined") window.ListView.ImageBasePath = "";
	clientHierarchyManagers = [];
	ClientHierarchyManager = function (k, i) {
		clientHierarchyManagers.push(this);
		var j = k,
			b = {},
			d = {},
			e = {},
			a = {},
			c = {};
		this.Matches = function (a) {
			return a == j
		};
		this.RegisterHierarchyNode = function (f, g, i, h) {
			b[f] = true;
			d[f] = i;
			e[h] = f;
			c[f] = h;
			a[f] = [];
			g != null && a[g].push(f)
		};
		this.IsParent = function (b) {
			return b in a && a[b].length > 0
		};
		this.ToggleExpandByImg = function (a) {
			if (!(a.id in e)) return;
			var b = e[a.id];
			h(b, a)
		};
		this.ToggleExpandById = function (a) {
			if (a == null) return;
			if (!(a in c)) return;
			var d = c[a],
				b = $get(d);
			if (b == null) return;
			h(a, b)
		};
		this.GetToggleStateById = function (c) {
			return c == null ? 0 : !(c in b) ? 0 : a[c].length == 0 ? 0 : b[c] ? 1 : 2
		};

		function h(a, d) {
			var c = !b[a];
			if (c) {
				d.firstChild.className = "ms-commentcollapse" + (i ? "rtl" : "") + "-icon";
				g(a)
			} else {
				d.firstChild.className = "ms-commentexpand" + (i ? "rtl" : "") + "-icon";
				f(a)
			}
			b[a] = c
		}

		function g(e) {
			for (var c = 0; c < a[e].length; c++) {
				document.getElementById(d[a[e][c]]).style.display = "";
				b[a[e][c]] && g(a[e][c])
			}
		}

		function f(c) {
			for (var b = 0; b < a[c].length; b++) {
				document.getElementById(d[a[c][b]]).style.display = "none";
				f(a[c][b])
			}
		}
	};
	if (window.ClientPivotControl == null) {
		var a = function (b) {
			this.AllOptions = [];
			if (b != null) {
				this.PivotParentId = b.PivotParentId;
				this.PivotContainerId = b.PivotContainerId;
				if (typeof b.AllOptions != "undefined") this.AllOptions = b.AllOptions;
				if (typeof b.SurfacedPivotCount == "number") this.SurfacedPivotCount = Number(b.SurfacedPivotCount);
				if (typeof b.ShowMenuIcons != "undefined") this.ShowMenuIcons = Boolean(b.ShowMenuIcons);
				if (typeof b.ShowMenuClose != "undefined") this.ShowMenuClose = b.ShowMenuClose;
				if (typeof b.ShowMenuCheckboxes != "undefined") this.ShowMenuCheckboxes = b.ShowMenuCheckboxes;
				if (typeof b.Width != "undefined") this.Width = b.Width
			} else this.PivotContainerId = "clientPivotControl" + a.PivotControlCount.toString();
			this.OverflowDotId = this.PivotContainerId + "_overflow";
			this.OverflowMenuId = this.PivotContainerId + "_menu";
			a.PivotControlCount++;
			a.PivotControlDict[this.PivotContainerId] = this
		};
		a.PivotControlDict = [];
		a.PivotControlCount = 0;
		a.prototype = {
			PivotParentId: "",
			PivotContainerId: "",
			OverflowDotId: "",
			OverflowMenuId: "",
			AllOptions: [],
			SurfacedPivotCount: 3,
			ShowMenuIcons: false,
			ShowMenuClose: false,
			ShowMenuCheckboxes: false,
			OverflowMenuScript: "",
			Width: "",
			SurfacedOptions: [],
			OverflowOptions: [],
			SelectedOptionIdx: -1,
			AddMenuOption: function (b) {
				(a.IsMenuOption(b) || a.IsMenuCheckOption(b)) && this.AllOptions.push(b)
			},
			AddMenuSeparator: function () {
				if (this.AllOptions.length == 0) return;
				var b = this.AllOptions[this.AllOptions.length - 1];
				if (a.IsMenuSeparator(b)) return;
				this.AllOptions.push(new f)
			},
			Render: function () {
				if (this.PivotParentId == null || this.PivotParentId == "") return;
				var a = document.getElementById(this.PivotParentId);
				if (a == null) return;
				a.innerHTML = this.RenderAsString();
				if (this.Width != "") a.style.width = this.Width
			},
			RenderAsString: function () {
				this.ProcessAllMenuItems();
				this.EnsureSelectedOption();
				var c = this.SurfacedOptions.length;
				if (c == 0) return "";
				var a = [];
				a.push('<span class="ms-pivotControl-container" id="');
				a.push(Encoding.HtmlEncode(this.PivotContainerId));
				a.push('" role="view">');
				for (var b = 0; b < c; b++) a.push(this.RenderSurfacedOption(b));
				this.ShouldShowOverflowMenuLink() && a.push(this.RenderOverflowMenuLink());
				a.push("</span>");
				return a.join("")
			},
			ShouldShowOverflowMenuLink: function () {
				return ListModule.Settings.SupportsPopup ? this.OverflowOptions.length > 0 || this.OverflowMenuScript != null && this.OverflowMenuScript != "" : false
			},
			ShowOverflowMenu: function () {
				if (ListModule.Settings.SupportsPopup) {
					var g = this.OverflowOptions.length,
						h = document.getElementById(this.OverflowDotId);
					if (h == null || g == 0) return;
					MenuHtc_hide();
					for (var d = CMenu(this.OverflowMenuId), c = 0; c < g; c++) {
						var b = this.OverflowOptions[c],
							e = a.IsMenuCheckOption(b);
						if (a.IsMenuOption(b) || e) {
							var f = CAMOpt(d, b.DisplayText, b.OnClickAction, b.ImageUrl, b.ImageAltText, String(100 * c), b.Description);
							f.id = "ID_OverflowOption_" + String(c);
							e && f.setAttribute("checked", b.Checked)
						} else a.IsMenuSeparator(b) && CAMSep(d)
					}!this.ShowMenuIcons && d.setAttribute("hideicons", "true");
					var i = Boolean(document.body.WZ_ATTRIB_FLIPPED);
					document.body.WZ_ATTRIB_FLIPPED = false;
					OMenu(d, h, null, false, -2, this.ShowMenuClose, this.ShowMenuCheckboxes);
					document.body.WZ_ATTRIB_FLIPPED = i
				}
			},
			RenderSurfacedOption: function (c) {
				if (c < 0 || c >= this.SurfacedOptions.length) return "";
				var b = this.SurfacedOptions[c],
					d = "ms-pivotControl-surfacedOpt";
				if (b.SelectedOption) d += "-selected";
				var a = [];
				a.push('<a class="');
				a.push(d);
				a.push('" href="#" id="');
				a.push(Encoding.HtmlEncode(this.PivotContainerId + "_surfaceopt" + c.toString()));
				a.push('" onclick="');
				a.push(Encoding.HtmlEncode('SP.QoS.WriteUserEngagement("ClientPivot_ViewSelected");'));
				a.push(Encoding.HtmlEncode(b.OnClickAction));
				a.push(' return false;" aria-label="');
				if (c == 0) a.push(Encoding.HtmlEncode(window.ListView.Strings.L_ViewPivots_alt));
				else a.push(Encoding.HtmlEncode(b.DisplayText));
				a.push(", ");
				a.push(Encoding.HtmlEncode(window.ListView.Strings.L_ViewPivots_View_alt));
				if (b.SelectedOption) {
					a.push(", ");
					a.push(Encoding.HtmlEncode(window.ListView.Strings.L_ViewPivots_View_Selected_alt));
					a.push('" role="view" aria-selected="true">')
				} else a.push('" role="view">');
				a.push(Encoding.HtmlEncode(b.DisplayText));
				a.push("</a>");
				return a.join("")
			},
			RenderOverflowMenuLink: function () {
				var b = this.OverflowMenuScript;
				if (b == null || b == "") b = "ClientPivotControlExpandOverflowMenu(event);";
				var a = [];
				a.push('<span class="ms-pivotControl-overflowSpan" data-containerId="');
				a.push(Encoding.HtmlEncode(this.PivotContainerId));
				a.push('" id="');
				a.push(Encoding.HtmlEncode(this.OverflowDotId));
				a.push('" title="');
				a.push(Encoding.HtmlEncode(window.ListView.Strings.L_ClientPivotControlOverflowMenuAlt));
				a.push('" ><a class="ms-pivotControl-overflowDot" href="#" onclick="');
				a.push(Encoding.HtmlEncode('SP.QoS.WriteUserEngagement("ClientPivot_ViewSelected");'));
				a.push(Encoding.HtmlEncode(b));
				a.push('" role="button" aria-label="');
				a.push(Encoding.HtmlEncode(window.ListView.Strings.L_ClientPivotControlOverflowMenuAlt));
				a.push('" >');
				a.push('<img class="ms-ellipsis-icon" src="');
				a.push(GetThemedImageUrl("spcommon.png"));
				a.push('" alt="');
				a.push(Encoding.HtmlEncode(window.ListView.Strings.L_OpenMenu));
				a.push('" /></a></span>');
				return a.join("")
			},
			ProcessAllMenuItems: function () {
				if (this.SurfacedPivotCount < 0) this.SurfacedPivotCount = 1;
				this.SurfacedOptions = [];
				this.OverflowOptions = [];
				var c = this.AllOptions.length;
				if (c == 0) return;
				for (var b = 0, d = []; b < c; b++) {
					var e = this.AllOptions[b];
					if (a.IsMenuSeparator(e)) continue;
					if (d.length == this.SurfacedPivotCount) break;
					d.push(e)
				}
				this.SurfacedOptions = this.SurfacedOptions.concat(d);
				if (b != c) {
					for (; b < c; b++) this.OverflowOptions.push(this.AllOptions[b]);
					var f = this.OverflowOptions[this.OverflowOptions.length - 1];
					a.IsMenuSeparator(f) && this.OverflowOptions.pop()
				}
			},
			EnsureSelectedOption: function () {
				this.SelectedOptionIdx = -1;
				var j = this.SurfacedOptions.length,
					i = this.OverflowOptions.length;
				if (j == 0 && i == 0) return;
				for (var b = 0; b < this.SurfacedOptions.length; b++) {
					var h = this.SurfacedOptions[b];
					if (Boolean(h.SelectedOption) && this.SelectedOptionIdx == -1) this.SelectedOptionIdx = b;
					else h.SelectedOption = false
				}
				for (var e = 0; e < this.OverflowOptions.length; e++) {
					var c = this.OverflowOptions[e];
					if (Boolean(c.SelectedOption) && this.SelectedOptionIdx == -1) this.SelectedOptionIdx = this.SurfacedOptions.length;
					else if (a.IsMenuOption(c)) c.SelectedOption = false
				}
				if (this.SelectedOptionIdx == -1) {
					this.SelectedOptionIdx = 0;
					this.SurfacedOptions[0].SelectedOption = true
				} else if (this.SelectedOptionIdx == this.SurfacedOptions.length) {
					var k = this.SurfacedOptions.pop(),
						g = this.OverflowOptions;
					this.OverflowOptions = [];
					this.OverflowOptions.push(k);
					for (var f = 0; f < g.length; f++) {
						var d = g[f];
						if (Boolean(d.SelectedOption)) this.SurfacedOptions.push(d);
						else this.OverflowOptions.push(d)
					}
					this.SelectedOptionIdx = this.SurfacedOptions.length - 1
				}
			}
		};
		var h = function (c) {
				if (ListModule.Settings.SupportsPopup) {
					if (c == null) c = window.event;
					var b = DOM.GetEventSrcElement(c);
					while (b != null && b.getAttribute("data-containerId") == null) b = b.parentNode;
					if (b == null) return;
					var d;
					try {
						d = typeof CMenu
					} catch (e) {
						d = "undefined"
					}
					EnsureScript("core.js", d, function () {
						var c = a.PivotControlDict[b.getAttribute("data-containerId")];
						c != null && c.ShowOverflowMenu()
					});
					c != null && CancelEvent(c)
				}
			},
			g = function (b) {
				if (b == null) return;
				var c = new a(b);
				c.Render()
			};
		a.MenuOptionType = {
			MenuOption: 1,
			MenuSeparator: 2,
			MenuCheckOption: 3
		};
		a.IsMenuOption = function (b) {
			return b != null && b.MenuOptionType == a.MenuOptionType.MenuOption
		};
		a.IsMenuCheckOption = function (b) {
			return b != null && b.MenuOptionType == a.MenuOptionType.MenuCheckOption
		};
		a.IsMenuSeparator = function (b) {
			return b != null && b.MenuOptionType == a.MenuOptionType.MenuSeparator
		};
		var d = function () {};
		d.prototype = {
			MenuOptionType: 0
		};
		var b = function () {
			this.MenuOptionType = a.MenuOptionType.MenuOption
		};
		b.prototype = new d;
		b.prototype.DisplayText = "";
		b.prototype.Description = "";
		b.prototype.OnClickAction = "";
		b.prototype.ImageUrl = "";
		b.prototype.ImageAltText = "";
		b.prototype.SelectedOption = false;
		var f = function () {
			this.MenuOptionType = a.MenuOptionType.MenuSeparator
		};
		f.prototype = new d;
		var e = function () {
			this.MenuOptionType = a.MenuOptionType.MenuCheckOption
		};
		e.prototype = new d;
		e.prototype.Checked = false;
		window.ClientPivotControl = a;
		window.ClientPivotControlExpandOverflowMenu = h;
		window.ClientPivotControl_InitStandaloneControlWrapper = g;
		window.ClientPivotControlMenuCheckOption = e;
		window.ClientPivotControlMenuItem = d;
		window.ClientPivotControlMenuOption = b;
		window.ClientPivotControlMenuSeparator = f
	} else {
		a = window.ClientPivotControl;
		h = window.ClientPivotControlExpandOverflowMenu;
		g = window.ClientPivotControl_InitStandaloneControlWrapper;
		e = window.ClientPivotControlMenuCheckOption;
		d = window.ClientPivotControlMenuItem;
		b = window.ClientPivotControlMenuOption;
		f = window.ClientPivotControlMenuSeparator
	}
	SPClientRenderer = {
		GlobalDebugMode: false,
		AddCallStackInfoToErrors: false,
		RenderErrors: true
	};
	SPClientRenderer.IsDebugMode = function (a) {
		return typeof a != "undefined" && null != a && typeof a.DebugMode != "undefined" ? Boolean(a.DebugMode) : Boolean(SPClientRenderer.GlobalDebugMode)
	};
	SPClientRenderer.Render = function (d, a) {
		if (d == null || a == null) return;
		var h = true,
			m = a.Templates != null && a.Templates.Body != "" && a.Templates.Header != "",
			b = null;
		if (a.ListTemplateType == 550 && a.BaseViewID == 3) b = new q;
		else if (a.ListTemplateType == 700 && a.BaseViewID == 51) b = new s;
		else if (a.ListTemplateType == 700 && a.BaseViewID == 55) b = new r;
		else if (a.ListTemplateType == 100 && a.SiteTemplateId == 64) b = new t;
		m && b != null && b.TagStart();
		SPClientRenderer._ExecuteRenderCallbacks(a, "OnPreRender");
		var c = SPClientRenderer.RenderCore(a);
		if (a.Errors != null && a.Errors.length > 0) {
			var n = [];
			if (Boolean(SPClientRenderer.RenderErrors))
				for (var l = 0; l < a.Errors.length; l++) n.push(a.Errors[l]);
			c = n.join("") + " ";
			if (b != null) {
				h = false;
				b.LogFailure(c)
			}
		} else if (typeof a.ErrorMsgDelayed != "undefined" && a.ErrorMsgDelayed != "")
			if (b != null) {
				h = false;
				b.LogFailure(a.ErrorMsgDelayed)
			}
		if (c != null && c != "")
			if (d.tagName == "DIV" || d.tagName == "TD") {
				if (a.fHidden) d.style.display = "none";
				d.innerHTML = c
			} else {
				var i = document.createElement("div");
				i.innerHTML = c;
				var k = i.firstChild;
				if (i.childNodes.length == 1 && k != null && k.nodeType == 3) {
					var u = document.createTextNode(c);
					InsertNodeAfter(d, u)
				} else {
					var j = k.childNodes,
						g;
					g = d.parentNode;
					for (var e = 0; e < j.length; e++) {
						var f = j[e];
						if (f.nodeType == 1)
							if (g.nodeName == f.nodeName)
								for (var o = f.childNodes, v = o.length, p = 0; p < v; p++) g.appendChild(o[0]);
							else {
								if (a.fHidden) f.style.display = "none";
								g.appendChild(j[e]);
								e--
							}
					}
				}
			}
		m == true && h == true && b != null && b.TagSuccess();
		SPClientRenderer._ExecuteRenderCallbacks(a, "OnPostRender");

		function q() {
			this.TagStart = function () {
				WriteStart("StartSitesDocumentsRender")
			};
			this.LogFailure = function (a) {
				WriteFailure("FailureSitesDocumentRender_RenderErrors");
				WriteDebugLog("FailureSitesDocumentsRender", true, a)
			};
			this.TagSuccess = function () {
				WriteSuccess("SuccessSitesDocumentsRender")
			}
		}

		function s() {
			this.TagStart = function () {
				WriteStart("StartMyDocumentsRender", {
					AppCacheStatus: Boolean(window.applicationCache) && Boolean(window.applicationCache.status)
				})
			};
			this.LogFailure = function (a) {
				WriteFailure("FailureMyDocumentsRender_RenderErrors", {
					AppCacheStatus: Boolean(window.applicationCache) && Boolean(window.applicationCache.status)
				});
				WriteDebugLog("FailureMyDocumentsRender", true, a)
			};
			this.TagSuccess = function () {
				WriteSuccess("SuccessMyDocumentsRender", {
					AppCacheStatus: Boolean(window.applicationCache) && Boolean(window.applicationCache.status)
				});
				if (Flighting.VariantConfiguration.IsExpFeatureClientEnabled(256)) WriteEngagementLog("ODInPlaceSearchOn");
				else WriteEngagementLog("ODInPlaceSearchOff");
				var b = "SharingHintOff";
				if (Flighting.VariantConfiguration.IsExpFeatureClientEnabled(144)) {
					var a = document.querySelectorAll(".js-sharingHintString");
					if (Boolean(a) && a.length > 0) b = "SharingHintOn"
				}
				WriteEngagementLog(b)
			}
		}

		function r() {
			this.TagStart = function () {
				WriteStart("StartSharedFoldersRender")
			};
			this.LogFailure = function (a) {
				WriteFailure("FailureSharedFoldersRender_RenderErrors");
				WriteDebugLog("FailureSharedFoldersRender", true, a)
			};
			this.TagSuccess = function () {
				WriteSuccess("SuccessSharedFoldersRender")
			}
		}

		function t() {
			this.TagStart = function () {
				WriteStart("StartGroupListsRender")
			};
			this.LogFailure = function (a) {
				WriteFailure("FailureGroupListsRender_RenderErrors");
				WriteDebugLog("FailureGroupListsRender", true, a)
			};
			this.TagSuccess = function () {
				WriteSuccess("SuccessGroupListsRender")
			}
		}
	};
	SPClientRenderer.RenderReplace = function (b, a) {
		if (b == null || a == null) return;
		SPClientRenderer._ExecuteRenderCallbacks(a, "OnPreRender");
		var c = SPClientRenderer.RenderCore(a),
			d = b.parentNode;
		if (d != null) {
			if (c != null && c != "") {
				var e = document.createElement("div");
				e.innerHTML = c;
				var f = e.childNodes;
				while (f.length > 0) d.insertBefore(f[0], b)
			}
			d.removeChild(b)
		}
		SPClientRenderer._ExecuteRenderCallbacks(a, "OnPostRender")
	};
	SPClientRenderer._ExecuteRenderCallbacks = function (c, b) {
		var a = {
				Operation: b
			},
			d = function () {
				return SPClientRenderer._ExecuteRenderCallbacksWorker(c, b, a)
			};
		return CallFunctionWithErrorHandling(d, c, null, a)
	};
	SPClientRenderer._ExecuteRenderCallbacksWorker = function (c, d, f) {
		if (!c || d == null || d == "") return;
		var a = c[d];
		if (a == null) return;
		if (typeof a == "function") {
			f.TemplateFunction = a;
			a(c)
		} else if (typeof a == "object") {
			var e = a.length;
			if (e && typeof e == "number")
				for (var b = 0; b < Number(e); b++)
					if (typeof a[b] == "function") {
						f.TemplateFunction = a[b];
						a[b](c)
					}
		}
	};
	SPClientRenderer.RenderCore = function (a) {
		if (a == null) return "";
		a.RenderView = g;
		a.RenderHeader = l;
		a.RenderBody = n;
		a.RenderFooter = j;
		a.RenderGroups = k;
		a.RenderItems = m;
		a.RenderFields = i;
		a.RenderFieldByName = h;
		return g(a);

		function g(a) {
			return b(a, "View")
		}

		function l(a) {
			return b(a, "Header")
		}

		function n(a) {
			return b(a, "Body")
		}

		function j(a) {
			return b(a, "Footer")
		}

		function d(a, b, c) {
			return a == null ? "" : a.ResolveTemplate != null && typeof a.ResolveTemplate == "function" ? a.ResolveTemplate(a, b, c) : ""
		}

		function b(b, e) {
			if (b == null) return "";
			var a = d(b, b.ListData, e);
			if (a == null || a == "") {
				var c = b.Templates;
				if (c == null) return "";
				a = c[e]
			}
			return a == null || a == "" ? "" : CoreRender(a, b)
		}

		function k(a) {
			if (a == null || a.ListData == null) return "";
			var b = null;
			if (a.Templates != null) b = a.Templates.Group;
			var k = a.ListData,
				j = k[f(a)],
				h = "";
			if (j == null) {
				if (typeof b == "string" || typeof b == "function") {
					a.CurrentGroupIdx = 0;
					a.CurrentGroup = k;
					a.CurrentItems = k[c(a)];
					h += CoreRender(b, a);
					a.CurrentItems = null;
					a.CurrentGroup = null
				}
				return h
			}
			for (var i = 0; i < j.length; i++) {
				var g = j[i],
					e = d(a, g, "Group");
				if (e == null || e == "") {
					if (b == null || b == {}) return "";
					if (typeof b == "string" || typeof b == "function") e = b;
					if (e == null || e == "") {
						var l = g.GroupType;
						e = b[l]
					}
				}
				if (e == null || e == "") continue;
				a.CurrentGroupIdx = i;
				a.CurrentGroup = g;
				a.CurrentItems = g[c(a)];
				h += CoreRender(e, a);
				a.CurrentGroup = null;
				a.CurrentItems = null
			}
			return h
		}

		function m(a) {
			if (a == null || a.ListData == null) return "";
			var g = null;
			if (a.Templates != null) g = a.Templates.Item;
			var p = a.ListData,
				e = a.CurrentItems;
			if (e == null) e = typeof a.CurrentGroup != "undefined" ? a.CurrentGroup[c(a)] : null;
			if (e == null) {
				var l = p[f(a)];
				e = typeof l != "undefined" ? l[c(a)] : null
			}
			if (e == null) return "";
			for (var j = "", h = 0; h < e.length; h++) {
				var i = e[h],
					b = d(a, i, "Item");
				if (b == null || b == "") {
					if (g == null || g == {}) return "";
					if (typeof g == "string" || typeof g == "function") b = g;
					if (b == null || b == "") {
						var o = i.ContentType;
						b = g[o]
					}
				}
				if (b == null || b == "") continue;
				a.CurrentItemIdx = h;
				a.CurrentItem = i;
				if (typeof a.ItemRenderWrapper == "string") a.ItemRenderWrapper == SPClientRenderer.ParseTemplateString(a.ItemRenderWrapper, a);
				if (typeof a.ItemRenderWrapper == "function") {
					var k = a.ItemRenderWrapper,
						m = {
							TemplateFunction: k,
							Operation: "ItemRenderWrapper"
						},
						n = function () {
							return k(CoreRender(b, a), a, b)
						};
					j += CallFunctionWithErrorHandling(n, a, "", m)
				} else j += CoreRender(b, a);
				a.CurrentItem = null
			}
			return j
		}

		function i(a) {
			if (a == null || a.Templates == null || a.ListSchema == null || a.ListData == null) return "";
			var f = a.CurrentItem,
				b = a.ListSchema.Field,
				d = a.Templates.Fields;
			if (f == null || b == null || d == null) return "";
			var c = "";
			for (var g in b) c += e(a, b[g]);
			return c
		}

		function h(a, c) {
			if (a == null || a.Templates == null || a.ListSchema == null || a.ListData == null || c == null || c == "") return "";
			var d = a.CurrentItem,
				b = a.ListSchema.Field,
				g = a.Templates.Fields;
			if (d == null || b == null || g == null) return "";
			if (typeof SPClientTemplates != "undefined" && spMgr != null && a.ControlMode == SPClientTemplates.ClientControlMode.View) return spMgr.RenderFieldByName(a, c, d, a.ListSchema);
			for (var f in b)
				if (b[f].Name == c) return e(a, b[f]);
			return ""
		}

		function e(a, f) {
			var e = a.CurrentItem,
				d = a.Templates.Fields,
				b = f.Name;
			if (typeof e[b] == "undefined") return "";
			var c = "";
			if (d[b] != null) c = d[b];
			if (c == null || c == "") return "";
			a.CurrentFieldValue = e[b];
			a.CurrentFieldSchema = f;
			var g = CoreRender(c, a);
			a.CurrentFieldValue = null;
			a.CurrentFieldSchema = null;
			return g
		}

		function f(b) {
			var a = b.ListDataJSONGroupsKey;
			return typeof a != "string" || a == "" ? "Groups" : a
		}

		function c(b) {
			var a = b.ListDataJSONItemsKey;
			return typeof a != "string" || a == "" ? "Items" : a
		}
	};
	SPClientRenderer.CoreRender = CoreRender;
	SPClientRenderer.ParseTemplateString = function (a, b) {
		var c = {
				TemplateFunction: a,
				Operation: "ParseTemplateString"
			},
			d = function () {
				return SPClientRenderer.ParseTemplateStringWorker(a, b)
			};
		return CallFunctionWithErrorHandling(d, b, null, c)
	};
	SPClientRenderer.ParseTemplateStringWorker = function (a) {
		if (a == null || a.length == 0) return null;
		var c = "var p=[]; p.push('" + a.replace(/[\r\t\n]/g, " ").replace(/'(?=[^#]*#>)/g, "\t").split("'").join("\\'").split("\t").join("'").replace(/<#=(.+?)#>/g, "',$1,'").split("<#").join("');").split("#>").join("p.push('") + "'); return p.join('');",
			b;
		b = new Function("ctx", c);
		return b
	};
	SPClientRenderer.ReplaceUrlTokens = function (a) {
		if (ListModule.Settings.SupportsUrlTokenReplacement) {
			var c = window._spPageContextInfo;
			if (a == null || a == "" || c == null) return "";
			var k = "~site/",
				f = "~sitecollection/",
				e = "~sitecollectionmasterpagegallery/",
				b = a.toLowerCase();
			if (b.indexOf(k) == 0) {
				var n = h(c.webServerRelativeUrl);
				a = n + a.substr(k.length);
				b = n + b.substr(k.length)
			} else if (b.indexOf(f) == 0) {
				var m = h(c.siteServerRelativeUrl);
				a = m + a.substr(f.length);
				b = m + b.substr(f.length)
			} else if (b.indexOf(e) == 0) {
				var l = h(c.siteServerRelativeUrl);
				a = l + "_catalogs/masterpage/" + a.substr(e.length);
				b = l + "_catalogs/masterpage/" + b.substr(e.length)
			}
			var j = "{lcid}",
				i = "{locale}",
				g = "{siteclienttag}",
				d = -1;
			while ((d = b.indexOf(j)) != -1) {
				a = a.substring(0, d) + String(c.currentLanguage) + a.substr(d + j.length);
				b = b.replace(j, String(c.currentLanguage))
			}
			while ((d = b.indexOf(i)) != -1) {
				a = a.substring(0, d) + c.currentUICultureName + a.substr(d + i.length);
				b = b.replace(i, c.currentUICultureName)
			}
			while ((d = b.indexOf(g)) != -1) {
				a = a.substring(0, d) + c.siteClientTag + a.substr(d + g.length);
				b = b.replace(g, c.siteClientTag)
			}
			return a
		}
		return "";

		function h(a) {
			if (a == null || a == "") return "";
			var b = a.length;
			return a[b - 1] == "/" ? a : a + "/"
		}
	};
	SPClientRenderer.AddPostRenderCallback = AddPostRenderCallback;
	if (typeof window.Renderer == "undefined") {
		var c = function () {
			var d = this,
				b = c.FunctionDispatcher.GetNextId(),
				a = {};
			this._GetId = function () {
				return b
			};
			this._GetTemplate = function (b) {
				return a[b]
			};
			this.SetTemplate = function (c, b) {
				if (typeof b == "undefined" || b == null) delete a[c];
				else a[c] = b
			};
			this.RegisterHandler = function (a, d) {
				c.FunctionDispatcher.RegisterFunction(b, a, d)
			};
			this.UnregisterHandler = function (a, d) {
				return c.FunctionDispatcher.UnregisterFunction(b, a, d)
			};
			this.Render = function (b, e) {
				if (b in a) return c.Engine.Render(b, e, d);
				else throw new Error("No template with name " + b);
			}
		};
		c.Engine = new function () {
			var d = new e,
				f = new g;
			this.Render = function (a, d, c) {
				return b(a, d, c)
			};

			function b(d, g, e) {
				var b, c = e._GetTemplate(d);
				if (typeof c === "function") b = c;
				else if (typeof c === "string") {
					b = a(c);
					e.SetTemplate(d, b)
				} else throw new Error("Template with name " + d + " invalid");
				var f = b(g, e);
				return f
			}

			function a(a) {
				if (!Boolean(a)) return function () {
					return ""
				};
				var e = a.search(/^\s*\{%version/i);
				if (e != 0) return d.Compile(a);
				else {
					var c = a.indexOf("{"),
						b = a.indexOf("}", c);
					if (b < 0) throw new Error("Template Syntax Error! {%version} ending brace expected, but none found");
					var h = a.slice(c + "{%version".length, b).trim(),
						g = a.slice(b + 1);
					if (h == "2.0") return f.Compile(g);
					else throw new Error("Template Syntax Error! Invalid Version number");
				}
			}

			function e() {
				this.Compile = function (b) {
					var c = "var p=[]; p.push('" + b.replace(/[\r\t\n]/g, " ").replace(/'(?=[^#]*#>)/g, "\t").split("'").join("\\'").split("\t").join("'").replace(/<#=(.+?)#>/g, "',$1,'").split("<#").join("');").split("#>").join("p.push('") + "'); return p.join('');",
						a;
					a = new Function("ctx", "renderer", c);
					return a
				}
			}

			function g() {
				var d = {
					comment: i,
					value: m,
					template: h,
					foreach: j,
					templateselect: b,
					handler: k,
					templatechoice: b
				};
				this.Compile = function (a) {
					var c = [];
					a = f(a);
					var h, b = 0;
					while ((h = g(a, b)) >= 0) {
						h > b && c.push(e(a.slice(b, h)));
						var j = a.indexOf("}", h);
						if (j < 0) throw new Error("Template Syntax Error! Ending brace expected, but none found.");
						b = j + 1;
						var m = a.slice(h, j),
							i = l(m),
							k = i[0].toLowerCase();
						i.shift();
						if (k in d) {
							var n = d[k].apply(this, i);
							c.push(n)
						} else throw new Error("Template Syntax Error! Invalid construct: " + m);
					}
					b < a.length && c.push(e(a.slice(b)));
					return function (f, d) {
						for (var b = [], a = 0, e = c.length; a < e; a++) c[a](f, d, b);
						return b.join("")
					}
				};

				function l(a) {
					if (a.charAt(a.length - 1) == "}") a = a.slice(0, -1);
					a = a.slice("{%".length);
					a = a.trim();
					var b = a.split(/\s+/);
					if (b[0] == "") throw new Error("Template Syntax Error! Empty construct");
					return b
				}

				function f(b) {
					var a = b;
					a = a.replace(/{\/\//g, "{%comment ");
					a = a.replace(/{=/g, "{%value ");
					a = a.replace(/{\+/g, "{%handler ");
					return a
				}

				function g(a, b) {
					return a.indexOf("{%", b)
				}

				function a(a, d) {
					if (!Boolean(d) || d == ".") return a;
					if (d.charAt(0) == "/") a = window;
					for (var c = d.split("/"), b = 0, e = c.length; b < e; b++) {
						if (c[b] == "" || c[b] == ".") continue;
						if (a != null && typeof a[c[b]] != "undefined") a = a[c[b]];
						else return null
					}
					return a
				}

				function e(a) {
					return function (d, c, b) {
						b.push(a)
					}
				}

				function i() {
					return function () {}
				}

				function m(b) {
					if (arguments.length > 1) throw new Error("Template Syntax Error! Value construct expected 0-1 parameters, but " + String(arguments.length) + " given");
					if (!Boolean(b)) b = ".";
					return function (e, f, c) {
						var d = a(e, b);
						c.push(d)
					}
				}

				function h(c, b) {
					if (arguments.length == 0 || arguments.length > 2) throw new Error("Template Syntax Error! Template construct expected 1-2 parameters, but " + String(arguments.length) + " given");
					if (!Boolean(b)) b = ".";
					return function (g, d, e) {
						var f = a(g, b);
						e.push(d.Render(c, f))
					}
				}

				function j(c, b) {
					if (arguments.length == 0 || arguments.length > 2) throw new Error("Template Syntax Error! Foreach construct expected 1-2 parameters, but " + String(arguments.length) + " given");
					if (!Boolean(b)) b = ".";
					return function (j, g, h) {
						var f = a(j, b);
						if (Array.isArray(f))
							for (var e = f, d = 0, i = e.length; d < i; d++) h.push(g.Render(c, e[d]));
						else throw new Error("Foreach Operation expected an array, but no array given");
					}
				}

				function b(c, b) {
					if (arguments.length == 0 || arguments.length > 2) throw new Error("Template Syntax Error! TemplateSelect construct expected 1-2 parameters, but " + String(arguments.length) + " given");
					if (!Boolean(b)) b = ".";
					return function (e, f, g) {
						var d = a(e, c);
						if (typeof d == "string") {
							var h = a(e, b);
							g.push(f.Render(d, h))
						} else throw new Error("TemplateSelect Operation expected a string for template name, but no string given");
					}
				}

				function k(d) {
					if (!Boolean(d)) throw new Error("Template Syntax Error! Handler construct needs a function name");
					var b = [].slice.call(arguments, 1);
					return function (l, g, h) {
						var e = [];
						e.push("this");
						e.push(g._GetId());
						e.push("&quot;" + d + "&quot;");
						e.push("event");
						for (var f = 0; f < b.length; f++) {
							var k = a(l, b[f]),
								j = c.FunctionDispatcher.RegisterObject(k);
							e.push("Renderer.FunctionDispatcher.GetObject(" + String(j) + ")")
						}
						var i = "Renderer.FunctionDispatcher.Execute(" + e.join(",") + ")";
						h.push(i)
					}
				}
			}
		};
		c.FunctionDispatcher = new function () {
			var a = [],
				b = [];
			this.GetNextId = function () {
				var b = a.length;
				a.push({});
				return b
			};
			this.RegisterObject = function (c) {
				var a = b.length;
				b.push(c);
				return a
			};
			this.GetObject = function (a) {
				if (a < 0 || a >= b.length) throw new Error("No object registered with id " + String(a));
				return b[a]
			};
			this.RegisterFunction = function (b, c, d) {
				if (b < 0 || b >= a.length) throw new Error("No Renderer registered with id " + String(b));
				if (typeof d != "function") throw new Error("RegisterFunction expected a function, but none given");
				if (!Boolean(a[b][c])) a[b][c] = [];
				a[b][c].push(d)
			};
			this.UnregisterFunction = function (b, c, f) {
				if (b < 0 || b >= a.length) throw new Error("No Renderer registered with id " + String(b));
				if (!Boolean(a[b][c])) return false;
				var e = false,
					d = a[b][c].indexOf(f);
				if (d != -1) {
					a[b][c].splice(d, 1);
					e = true
				}
				if (a[b][c].length == 0) delete a[b][c];
				return e
			};
			this.Execute = function (f, b, d) {
				if (b < 0 || b >= a.length) throw new Error("No Renderer registered with id " + String(b));
				if (!Boolean(a[b][d])) throw new Error("No function registered with name " + d + " for Renderer ID " + String(b));
				for (var g = [].slice.call(arguments, 3), e = a[b][d], c = 0; c < e.length; c++) {
					var h = e[c];
					if (c == 0 && e.length == 1) return h.apply(f, g);
					else h.apply(f, g)
				}
			}
		};
		window.Renderer = c
	} else c = window.Renderer;
	g_QCB_nextId = 1;
	SPClientTemplates = {};
	SPClientTemplates.FileSystemObjectType = {
		Invalid: -1,
		File: 0,
		Folder: 1,
		Web: 2
	};
	SPClientTemplates.ChoiceFormatType = {
		Dropdown: 0,
		Radio: 1
	};
	SPClientTemplates.ClientControlMode = {
		Invalid: 0,
		DisplayForm: 1,
		EditForm: 2,
		NewForm: 3,
		View: 4
	};
	SPClientTemplates.RichTextMode = {
		Compatible: 0,
		FullHtml: 1,
		HtmlAsXml: 2,
		ThemeHtml: 3
	};
	SPClientTemplates.UrlFormatType = {
		Hyperlink: 0,
		Image: 1
	};
	SPClientTemplates.DateTimeDisplayFormat = {
		DateOnly: 0,
		DateTime: 1,
		TimeOnly: 2
	};
	SPClientTemplates.DateTimeCalendarType = {
		None: 0,
		Gregorian: 1,
		Japan: 3,
		Taiwan: 4,
		Korea: 5,
		Hijri: 6,
		Thai: 7,
		Hebrew: 8,
		GregorianMEFrench: 9,
		GregorianArabic: 10,
		GregorianXLITEnglish: 11,
		GregorianXLITFrench: 12,
		KoreaJapanLunar: 14,
		ChineseLunar: 15,
		SakaEra: 16,
		UmAlQura: 23
	};
	SPClientTemplates.UserSelectionMode = {
		PeopleOnly: 0,
		PeopleAndGroups: 1
	};
	SPClientTemplates.PresenceIndicatorSize = {
		Bar_5px: "5",
		Bar_8px: "8",
		Square_10px: "10",
		Square_12px: "12"
	};
	SPClientTemplates.TemplateManager = {};
	SPClientTemplates.TemplateManager._TemplateOverrides = {};
	SPClientTemplates.TemplateManager._TemplateOverrides.View = {};
	SPClientTemplates.TemplateManager._TemplateOverrides.Header = {};
	SPClientTemplates.TemplateManager._TemplateOverrides.Body = {};
	SPClientTemplates.TemplateManager._TemplateOverrides.Footer = {};
	SPClientTemplates.TemplateManager._TemplateOverrides.Group = {};
	SPClientTemplates.TemplateManager._TemplateOverrides.Item = {};
	SPClientTemplates.TemplateManager._TemplateOverrides.Fields = {};
	SPClientTemplates.TemplateManager._TemplateOverrides.OnPreRender = {};
	SPClientTemplates.TemplateManager._TemplateOverrides.OnPostRender = {};
	SPClientTemplates.TemplateManager._RegisterDefaultTemplates = function (a) {
		if (!a || !a.Templates && !a.OnPreRender && !a.OnPostRender) return;
		var b = SPClientTemplates._defaultTemplates;
		SPClientTemplates.TemplateManager._RegisterTemplatesInternal(a, b)
	};
	SPClientTemplates.TemplateManager.RegisterTemplateOverrides = function (a) {
		if (!a || !a.Templates && !a.OnPreRender && !a.OnPostRender) return;
		var b = SPClientTemplates.TemplateManager._TemplateOverrides;
		SPClientTemplates.TemplateManager._RegisterTemplatesInternal(a, b)
	};
	SPClientTemplates.TemplateManager._RegisterTemplatesInternal = function (c, n) {
		if (!c || !n || !c.Templates && !c.OnPreRender && !c.OnPostRender) return;
		var e = c.Templates != null ? c.Templates : {},
			b = SPClientTemplates.Utility.ComputeRegisterTypeInfo(c);
		if (typeof c.OnPreRender != "undefined") e.OnPreRender = c.OnPreRender;
		if (typeof c.OnPostRender != "undefined") e.OnPostRender = c.OnPostRender;
		for (var a in e)
			switch (a) {
				case "Group":
				case "Item":
					if (typeof e[a] == "function" || typeof e[a] == "string") e[a] = {
						__DefaultTemplate__: e[a]
					};
				case "View":
				case "Header":
				case "Body":
				case "Footer":
				case "Fields":
				case "OnPreRender":
				case "OnPostRender":
					var p = a == "OnPreRender" || a == "OnPostRender",
						i = a == "View" || a == "Header" || a == "Body" || a == "Footer",
						o = a == "Item" || a == "Group" || a == "Fields",
						f, d, g = n[a];
					if (b.defaultViewStyle) {
						if (!g["default"]) g["default"] = {};
						f = g["default"];
						m()
					} else
						for (var j = 0; j < b.viewStyle.length; j++) {
							var h = b.viewStyle[j];
							if (!g[h]) g[h] = {};
							f = g[h];
							m()
						}
			}

		function m() {
			if (b.allLists) {
				if (!f.all) f.all = {};
				d = f.all;
				if (i || o) l();
				else k()
			} else {
				for (var c = 0; c < b.ltype.length; c++) {
					var a = b.ltype[c];
					if (!f[a]) f[a] = {};
					d = f[a]
				}
				if (i || o) l();
				else k()
			}
		}

		function l() {
			var c = b.allViews ? d.all : d[b.viewId],
				f = e[a];
			if (i) {
				if (typeof f == "function" || typeof f == "string") c = f
			} else {
				if (!c) c = {};
				for (var g in f) c[g] = f[g]
			}
			if (b.allViews) d.all = c;
			else d[b.viewId] = c
		}

		function k() {
			var f = e[a];
			if (!f) return;
			var c = b.allViews ? d.all : d[b.viewId];
			if (!c) c = [];
			if (typeof f == "function") c.push(f);
			else {
				var h = f.length;
				if (typeof h == "number")
					for (var g = 0; g < Number(h); g++) typeof f[g] == "function" && c.push(f[g])
			}
			if (b.allViews) d.all = c;
			else d[b.viewId] = c
		}
	};
	SPClientTemplates.TemplateManager.GetTemplates = function (b) {
		if (!b) b = {};
		if (!b.Templates) b.Templates = {};
		var f = SPClientTemplates.TemplateManager._TemplateOverrides,
			a = SPClientTemplates.Utility.ComputeResolveTypeInfo(b);
		p();
		var c = {};
		c.View = i("View");
		c.Header = i("Header");
		c.Body = i("Body");
		c.Footer = i("Footer");
		c.Group = s();
		c.Item = t();
		c.Fields = r();
		return c;

		function i(c) {
			var d = f[c],
				e = SPClientTemplates._defaultTemplates[c],
				b = null;
			if (!a.defaultViewStyle) {
				b = g(d[a.viewStyle], c);
				if (b == null) b = g(e[a.viewStyle], c)
			}
			if (b == null) b = g(d["default"], c);
			if (b == null) b = g(e["default"], c);
			if (b == null) b = l(c);
			return b
		}

		function g(b) {
			if (typeof b == "undefined") return null;
			var c = j(b[a.ltype], a.viewId);
			if (c == null) c = j(b.all, a.viewId);
			return c
		}

		function s() {
			var d = {},
				g = "Group",
				h = g + "Keys",
				a = b[h];
			if (a == null || a.length == 0) a = ["__DefaultTemplate__"];
			for (var i in a) {
				var c = a[i];
				if (!d[c]) {
					var f = e(g, c);
					if (c == "__DefaultTemplate__") return f;
					d[c] = f
				}
			}
			return d
		}

		function t() {
			var j = {},
				l = u(b);
			if (b.ListData == null || b.ListData[l] == null) return e("Item", "__DefaultTemplate__");
			for (var d = {}, i = 0, k = b.ListData[l], o = k.length, g = 0; g < o; g++) {
				var n = k[g];
				if (n != null) {
					var f = n.ContentType;
					if (f != null && typeof d[f] == "undefined") {
						i++;
						d[f] = true
					}
				}
			}
			if (i == 0) return e("Item", "__DefaultTemplate__");
			var h = {},
				c = [];
			for (var m in d) {
				var a = e("Item", m);
				j[m] = a;
				if (typeof h[a] == "undefined") {
					c.push(a);
					h[a] = true
				}
			}
			return c.length == 1 ? c[0] : j
		}

		function r() {
			var g = {},
				c = {},
				l = b.FieldControlModes != null ? b.FieldControlModes : {},
				p = typeof b.ControlMode != "undefined" ? b.ControlMode : SPClientTemplates.ClientControlMode.View;
			if (b.ListSchema == null || b.ListSchema.Field == null) return g;
			for (var n = b.ListSchema.Field, r = n.length, j = 0; j < r; j++) {
				var i = n[j];
				if (i != null) {
					var f = i.Name,
						a = i.FieldType,
						o = i.Type,
						s = l[f] != null ? l[f] : p,
						d = SPClientTemplates.Utility.ControlModeToString(s),
						m = q("Fields", f, d);
					if (m != null) g[f] = m;
					else if (typeof c[a] != "undefined" && typeof c[a][d] != "undefined") g[f] = c[a][d];
					else {
						var h = k("Fields", a, d);
						if (h == null) h = e("Fields", o, d);
						g[f] = h;
						if (!c[a]) c[a] = {};
						c[a][d] = h
					}
				}
			}
			return g
		}

		function e(c, d, b) {
			var a = k(c, d, b);
			if (a == null) a = l(c, b);
			return a
		}

		function d(b, e, d) {
			if (typeof b == "undefined") return null;
			var c = o(b[a.ltype], a.viewId, e, d);
			if (c == null) c = o(b.all, a.viewId, e, d);
			return c
		}

		function q(h, g, e) {
			var c = f[h],
				b = null;
			if (!a.defaultViewStyle) b = d(c[a.viewStyle], g, e);
			if (b == null) b = d(c["default"], g, e);
			return b
		}

		function k(i, e, c) {
			var g = f[i],
				h = SPClientTemplates._defaultTemplates[i],
				b = null;
			if (!a.defaultViewStyle) {
				b = d(g[a.viewStyle], e, c);
				if (b == null) b = d(h[a.viewStyle], e, c)
			}
			if (b == null) b = d(g["default"], e, c);
			if (b == null) b = d(h["default"], e, c);
			return b
		}

		function o(e, f, d, c) {
			var a = null,
				b = j(e, f);
			if (b != null) {
				if (typeof b[d] != "undefined") a = b[d];
				if (a == null && typeof b.__DefaultTemplate__ != "undefined") a = b.__DefaultTemplate__
			}
			if (a != null && typeof c != "undefined") a = a[c];
			return a
		}

		function j(a, b) {
			if (typeof a != "undefined") {
				if (typeof a[b] != "undefined") return a[b];
				if (typeof a.all != "undefined" && b != "Callout") return a.all
			}
			return null
		}

		function l(c, b) {
			var a = null;
			switch (c) {
				case "View":
					a = RenderViewTemplate;
					break;
				case "Header":
					a = "";
					break;
				case "Body":
					a = RenderGroupTemplateDefault;
					break;
				case "Footer":
					a = "";
					break;
				case "Group":
					a = RenderItemTemplateDefault;
					break;
				case "Item":
					a = RenderFieldTemplateDefault;
					break;
				case "Fields":
					a = typeof SPFieldText_Edit == "function" && (b == "NewForm" || b == "EditForm") ? SPFieldText_Edit : RenderFieldValueDefault
			}
			return a
		}

		function p() {
			var d = [],
				c = [],
				g = f.OnPreRender,
				e = f.OnPostRender;
			if (!a.defaultViewStyle) {
				h(d, g[a.viewStyle]);
				h(c, e[a.viewStyle])
			}
			h(d, g["default"]);
			h(c, e["default"]);
			b.OnPreRender = d;
			b.OnPostRender = c
		}

		function h(c, b) {
			if (typeof b != "undefined") {
				m(c, b.all, a.viewId);
				m(c, b[a.ltype], a.viewId)
			}
		}

		function m(b, a, c) {
			if (typeof a != "undefined") {
				typeof a.all != "undefined" && n(b, a.all);
				typeof a[c] != "undefined" && n(b, a[c])
			}
		}

		function n(d, a) {
			if (typeof a != "undefined")
				if (typeof a == "function") d.push(a);
				else {
					var c = a.length;
					if (typeof c == "number")
						for (var b = 0; b < Number(c); b++) typeof a[b] == "function" && d.push(a[b])
				}
		}

		function u(b) {
			var a = b.ListDataJSONItemsKey;
			return typeof a != "string" || a == "" ? "Items" : a
		}
	};
	SPClientTemplates.Utility = {};
	SPClientTemplates.Utility.ComputeResolveTypeInfo = function (a) {
		return new SPTemplateManagerResolveTypeInfo(a)
	};
	SPTemplateManagerResolveTypeInfo_InitializePrototype();
	SPClientTemplates.Utility.ComputeRegisterTypeInfo = function (a) {
		return new SPTemplateManagerRegisterTypeInfo(a)
	};
	SPTemplateManagerRegisterTypeInfo_InitializePrototype();
	SPClientTemplates.Utility.ControlModeToString = function (b) {
		var a = SPClientTemplates.ClientControlMode;
		return b == a.DisplayForm ? "DisplayForm" : b == a.EditForm ? "EditForm" : b == a.NewForm ? "NewForm" : b == a.View ? "View" : "Invalid"
	};
	SPClientTemplates.Utility.FileSystemObjectTypeToString = function (b) {
		var a = SPClientTemplates.FileSystemObjectType;
		return b == a.File ? "File" : b == a.Folder ? "Folder" : b == a.Web ? "Web" : "Invalid"
	};
	SPClientTemplates.Utility.ChoiceFormatTypeToString = function (a) {
		var b = SPClientTemplates.ChoiceFormatType;
		return a == b.Radio ? "Radio" : a == b.Dropdown ? "DropDown" : "Invalid"
	};
	SPClientTemplates.Utility.RichTextModeToString = function (b) {
		var a = SPClientTemplates.RichTextMode;
		return b == a.Compatible ? "Compatible" : b == a.FullHtml ? "FullHtml" : b == a.HtmlAsXml ? "HtmlAsXml" : b == a.ThemeHtml ? "ThemeHtml" : "Invalid"
	};
	SPClientTemplates.Utility.IsValidControlMode = function (b) {
		var a = SPClientTemplates.ClientControlMode;
		return b == a.NewForm || b == a.EditForm || b == a.DisplayForm || b == a.View
	};
	SPClientTemplates.Utility.Trim = function (a) {
		return a == null || typeof a != "string" || a.length == 0 ? "" : a.length == 1 && a.charCodeAt(0) == 160 ? "" : a.replace(/^\s\s*/, "").replace(/\s\s*$/, "")
	};
	SPClientTemplates.Utility.InitContext = function (a) {
		return typeof SP != "undefined" && typeof SP.ClientContext != "undefined" ? new SP.ClientContext(a) : null
	};
	SPClientTemplates.Utility.GetControlOptions = function (ctrlNode) {
		if (ctrlNode == null) return null;
		var result, options = ctrlNode.getAttribute("data-sp-options");
		try {
			var script = "(function () { return " + options + "; })();";
			result = eval(script)
		} catch (e) {
			result = null
		}
		return result
	};
	SPClientTemplates.Utility.UserLookupDelimitString = ";#";
	SPClientTemplates.Utility.UserMultiValueDelimitString = ",#";
	SPClientTemplates.Utility.TryParseInitialUserValue = function (b) {
		var a;
		if (b == null || b == "") {
			a = "";
			return a
		}
		var g = b.indexOf(SPClientTemplates.Utility.UserLookupDelimitString);
		if (g == -1) {
			a = b;
			return a
		}
		var c = b.split(SPClientTemplates.Utility.UserLookupDelimitString);
		if (c.length % 2 != 0) {
			a = "";
			return a
		}
		a = [];
		var e = 0;
		while (e < c.length) {
			var f = new SPClientFormUserValue,
				d = c[e++];
			d += SPClientTemplates.Utility.UserLookupDelimitString;
			d += c[e++];
			f.initFromUserString(d);
			a.push(f)
		}
		return a
	};
	SPClientTemplates.Utility.TryParseUserControlValue = function (d, g) {
		var a = [];
		if (d == null || d == "") return a;
		var h = g + " ",
			c = d.split(h);
		if (c.length == 0) return a;
		for (var e = 0; e < c.length; e++) {
			var b = SPClientTemplates.Utility.Trim(c[e]);
			if (b == "") continue;
			if (b.indexOf(SPClientTemplates.Utility.UserLookupDelimitString) != -1) {
				var f = new SPClientFormUserValue;
				f.initFromUserString(b);
				a.push(f)
			} else a.push(b)
		}
		return a
	};
	SPClientTemplates.Utility.GetPropertiesFromPageContextInfo = function (b) {
		if (b == null) return;
		var a = window._spPageContextInfo;
		if (typeof a != "undefined") {
			b.SiteClientTag = a.siteClientTag;
			b.CurrentLanguage = a.currentLanguage;
			b.CurrentCultureName = a.currentCultureName;
			b.CurrentUICultureName = a.currentUICultureName
		}
	};
	SPClientTemplates.Utility.ReplaceUrlTokens = function (a) {
		return SPClientRenderer.ReplaceUrlTokens(a)
	};
	SPClientFormUserValue_InitializePrototype();
	SPClientTemplates.Utility.ParseLookupValue = function (a) {
		var b = {
			LookupId: "0",
			LookupValue: ""
		};
		if (a == null || a == "") return b;
		var c = a.indexOf(";#");
		if (c == -1) {
			b.LookupId = a;
			return b
		}
		b.LookupId = a.substr(0, c);
		b.LookupValue = a.substr(c + 2).replace(/;;/g, ";");
		return b
	};
	SPClientTemplates.Utility.ParseMultiLookupValues = function (b) {
		if (b == null || b == "") return [];
		var d = [],
			j = b.length,
			c = 0,
			a = 0,
			e = false;
		while (a < j) {
			if (b[a] == ";") {
				if (++a >= j) break;
				if (b[a] == "#") {
					if (a - 1 > c) {
						var g = b.substr(c, a - c - 1);
						if (e) g = g.replace(/;;/g, ";");
						d.push(g);
						e = false
					}
					c = ++a;
					continue
				} else if (b[a] == ";") {
					a++;
					e = true;
					continue
				} else return []
			}
			a++
		}
		if (a > c) {
			var h = b.substr(c, a - c);
			if (e) h = h.replace(/;;/g, ";");
			d.push(h)
		}
		for (var i = [], k = d.length, f = 0; f < k; f++) i.push({
			LookupId: d[f++],
			LookupValue: d[f]
		});
		return i
	};
	SPClientTemplates.Utility.BuildLookupValuesAsString = function (b, f, g) {
		if (b == null || b.length == 0) return "";
		for (var a = "", c = true, e = 0; e < b.length; e++) {
			var d = b[e];
			if (!f) {
				if (!c) a += "|";
				c = false;
				a += d.LookupValue.replace(/\x7C/g, "||");
				a += "|";
				a += d.LookupId
			} else {
				if (!c) a += "|t";
				c = false;
				a += d.LookupId;
				a += "|t";
				a += d.LookupValue.replace(/\x7C/g, "||");
				if (g) a += "|t |t "
			}
		}
		return a
	};
	SPClientTemplates.Utility.ParseURLValue = function (a) {
		var c = {
			URL: "http://",
			Description: ""
		};
		if (a == null || a == "") return c;
		var b = 0;
		while (b < a.length) {
			if (a[b] == ",")
				if (b == a.length - 1) {
					a = a.substr(0, a.length - 1);
					break
				} else if (b + 1 < a.length && a[b + 1] == " ") break;
			else b++;
			b++
		}
		if (b < a.length) {
			c.URL = a.substr(0, b).replace(/\,\,/g, ",");
			var d = a.length - (b + 2);
			if (d > 0) c.Description = a.substr(b + 2, d)
		} else {
			c.URL = a.replace(/\,\,/g, ",");
			c.Description = a.replace(/\,\,/g, ",")
		}
		return c
	};
	SPClientTemplates.Utility.GetFormContextForCurrentField = function (b) {
		if (ListModule.Settings.SupportsForms) {
			if (b == null || b.FormContext == null) return null;
			var a = new ClientFormContext(b.FormContext);
			a.fieldValue = b.CurrentFieldValue;
			a.fieldSchema = b.CurrentFieldSchema;
			a.fieldName = a.fieldSchema != null ? a.fieldSchema.Name : "";
			a.controlMode = b.ControlMode == null ? SPClientTemplates.ClientControlMode.Invalid : b.ControlMode;
			a.fieldTitle = a.fieldSchema != null ? a.fieldSchema.Title : "";
			return a
		}
		return null
	};
	SPClientTemplates._defaultTemplates = {};
	SPClientTemplates._defaultTemplates.View = {
		"default": {
			all: {}
		}
	};
	SPClientTemplates._defaultTemplates.Header = {
		"default": {
			all: {}
		}
	};
	SPClientTemplates._defaultTemplates.Body = {
		"default": {
			all: {}
		}
	};
	SPClientTemplates._defaultTemplates.Footer = {
		"default": {
			all: {}
		}
	};
	SPClientTemplates._defaultTemplates.Group = {};
	SPClientTemplates._defaultTemplates.Item = {
		"default": {
			all: {
				Callout: {}
			}
		}
	};
	if (ListModule.Settings.SupportsCallouts) {
		SPClientTemplates._defaultTemplates.View["default"].all.Callout = CalloutRenderViewTemplate;
		SPClientTemplates._defaultTemplates.Header["default"].all.Callout = CalloutRenderHeaderTemplate;
		SPClientTemplates._defaultTemplates.Body["default"].all.Callout = CalloutRenderBodyTemplate;
		SPClientTemplates._defaultTemplates.Footer["default"].all.Callout = CalloutRenderFooterTemplate;
		SPClientTemplates._defaultTemplates.Item["default"].all.Callout.__DefaultTemplate__ = CalloutRenderItemTemplate
	}
	SPClientTemplates._defaultTemplates.Fields = {};
	RenderBodyTemplate = function (a) {
		var h = a.Templates.Item;
		if (h == null || h == {}) return "";
		var f = a.ListData,
			c = a.ListSchema,
			j = a.Templates.Header != "",
			b = "";
		if (j) {
			if (a.Templates.Header == null) b += RenderTableHeader(a);
			var k = c.Aggregate;
			if (k != null && f.Row.length > 0 && !c.groupRender && !a.inGridMode) b += RenderAggregate(a, null, f.Row[0], c, null, true, k);
			b += '<script id="scriptBody';
			b += a.wpq;
			b += '"><\/script>'
		} else b = '<table onmousedown="return OnTableMouseDown(event);">';
		if (a.inGridMode) {
			if (ListModule.Settings.SupportsInPlaceEdit)
				if (!a.bInitialRender) b += RenderSPGridBody(a);
			return b
		}
		var p = c.group1,
			q = c.group2,
			o = c.Collapse == null || c.Collapse != "TRUE",
			n = typeof ctx != "undefined" ? ctx : a,
			m = Boolean(n.ExternalDataList),
			d = a.Templates.Item;
		if (d == null || d == RenderFieldTemplateDefault || typeof d != "function" && typeof d != "string") d = RenderItemTemplate;
		else if (typeof d == "string") d = SPClientRenderer.ParseTemplateString(d, a);
		for (var g = 0; g < f.Row.length; g++) {
			var i = f.Row[g];
			if (g == 0) {
				i.firstRow = true;
				if (p != null) {
					b += '<input type="hidden" id="GroupByColFlag"/><input type="hidden" id="GroupByWebPartID';
					b += a.ctxId;
					b += '" webPartID="';
					b += c.View;
					b += '"/><tbody id="GroupByCol';
					b += c.View;
					b += '"><tr id="GroupByCol';
					b += a.ctxId;
					b += '" queryString ="';
					b += f.FilterLink;
					b += '"/></tbody >'
				}
			}
			var l = i.ContentType,
				e = h[l];
			if (e == null || e == "") e = d;
			else if (typeof e == "string") {
				e = SPClientRenderer.ParseTemplateString(e, a);
				h[l] = e
			}
			if (c.group1 != null) b += RenderGroup(a, i);
			if (o || m) {
				a.CurrentItem = i;
				a.CurrentItemIdx = g;
				b += CoreRender(e, a);
				a.CurrentItem = null;
				a.CurrentItemIdx = -1
			}
		}
		if (!j) b += "</table>";
		ListModule.Settings.SupportsDelayLoading && SPClientRenderer.AddPostRenderCallback(a, OnPostRenderTabularListView);
		IsFileExtensionControlsSupported() && AddPostRenderCallback(a, InitializeSuiteExtensions);
		return b
	};
	RenderItemTemplate = function (c) {
		var k = c.CurrentItem,
			d = c.ListSchema,
			i = c.CurrentItemIdx,
			h = i % 2 == 1 ? "ms-alternating " : "";
		if (FHasRowHoverBehavior(c)) h += " ms-itmHoverEnabled ";
		var a = [];
		a.push('<tr class="');
		a.push(h);
		if (d.TabularView != undefined && d.TabularView == "1") {
			a.push("ms-itmhover");
			a.push('" oncontextmenu="');
			if (Flighting.VariantConfiguration.IsExpFeatureClientEnabled(249) || !DoesListUseCallout(c)) a.push("return ShowCallOutOrECBWrapper(this, event, false)");
			else a.push("return ShowCallOutOrECBWrapper(this, event, true)")
		}
		a.push('" iid="');
		var j = GenerateIID(c);
		a.push(j);
		a.push('" id="');
		a.push(j);
		a.push('" role="row">');

		function g(a) {
			IsInfiniteScrollSupported(c) && c.ListData != null && i == c.ListData.Row.length - 1 && a.push('" onfocus="scrollManager.ScrollHandler(this)')
		}
		if (d.TabularView != undefined && d.TabularView == "1") {
			a.push('<td class="ms-cellStyleNonEditable ms-vb-itmcbx ms-vb-imgFirstCell');
			g(a);
			if (ListModule.Settings.SupportsDoclibAccessibility) a.push('" tabindex="0" role="rowheader" aria-label="' + Encoding.HtmlEncode(window.ListView.Strings.L_select_deselect_item_alt) + '"><div role="checkbox" class="s4-itm-cbx s4-itm-imgCbx" tabindex="-1');
			else a.push('" tabindex="0"><div role="checkbox" class="s4-itm-cbx s4-itm-imgCbx" tabindex="-1');
			BrowserDetection.userAgent.firefox && g(a);
			ListModule.Settings.SupportsDoclibAccessibility && a.push('" aria-checked="false');
			a.push('"><span class="s4-itm-imgCbx-inner"><span class="ms-selectitem-span"><img class="ms-selectitem-icon" alt="" src="');
			a.push(GetThemedImageUrl("spcommon.png"));
			a.push('"/></span></span></div></td>')
		}
		for (var f = d ? d.Field : null, e = 0; e < f.length; e++) {
			var b = f[e];
			if (b.GroupField != null) break;
			a.push('<td role="gridcell" class="');
			e == f.length - 1 && b.CalloutMenu != "TRUE" && b.listItemMenu != "TRUE" && a.push("ms-vb-lastCell ");
			if (b.css == null) {
				b.css = GetCSSClassForFieldTd(c, b);
				if (b.CalloutMenu == "TRUE" || b.ClassInfo == "Menu" || b.listItemMenu == "TRUE") {
					b.css += '" IsECB="TRUE';
					if (b.CalloutMenu == "TRUE") b.css += '" IsCallOut="TRUE';
					if (b.ClassInfo == "Menu" || b.listItemMenu == "TRUE") b.css += '" height="100%'
				}
			}
			c.CurrentFieldSchema = b;
			a.push(b.css);
			a.push('">');
			a.push(spMgr.RenderField(c, b, k, d));
			a.push("</td>");
			c.CurrentFieldSchema = null
		}
		a.push("</tr>");
		return a.join("")
	};
	RenderHeaderTemplate = function (b, e) {
		var d = b.ListSchema,
			i = b.ListData,
			a = [];
		if (e == null) e = true;
		a.push(RenderTableHeader(b));
		if (ListModule.Settings.SupportsDoclibAccessibility) {
			a.push('<thead role="presentation" id="');
			a.push("js-listviewthead-" + b.wpq);
			a.push('"><tr valign="top" role="row" class="ms-viewheadertr')
		} else {
			a.push('<thead id="');
			a.push("js-listviewthead-" + b.wpq);
			a.push('"><tr valign="top" class="ms-viewheadertr')
		}
		if (DOM.rightToLeft) a.push(" ms-vhrtl");
		else a.push(" ms-vhltr");
		a.push('">');
		if (d.TabularView != undefined && d.TabularView == "1") {
			a.push('<th class="ms-headerCellStyleIcon ms-vh-icon ms-vh-selectAllIcon" scope="col" role="columnheader">');
			RenderSelectAllCbx(b, a);
			a.push("</th>")
		}
		if (e) {
			var f = d ? d.Field : null,
				g = 1;
			for (var h in f) {
				var c = f[h];
				if (c.DisplayName == null) continue;
				if (c.GroupField != null) break;
				c.counter = g++;
				a.push(spMgr.RenderHeader(b, c));
				IsCSRReadOnlyTabularView(b) && (c.CalloutMenu == "TRUE" || c.listItemMenu == "TRUE") && a.push('<th aria-label="' + Encoding.HtmlEncode(window.ListView.Strings.L_OpenMenu_Text) + '" role="columnheader"></></th>')
			}
		}
		d.TabularView == "1" && b.BasePermissions.ManageLists && b.ListTemplateType != 160 && a.push('<th class="ms-vh-icon" scope="col" title="" role="presentation"><span class="ms-addcolumn-span"> </span></th>');
		a.push("</tr>");
		a.push("</thead>");
		if (Flighting.VariantConfiguration.IsExpFeatureClientEnabled(146)) {
			WriteEngagementLog("SPPOP_DragAndDropAttract");
			WriteStart("SPPOP_DragAndDropAttractStart");
			if (ShouldShowDragDropAttractBox(b)) {
				a.push('<caption class="ms-dragDropAttract"><div class="ms-attractMode ms-dragDropAttract ms-hideWhenFileDrag">' + window.ListView.Strings.L_SPDragAndDropAttract + "</div></caption>");
				WriteSuccess("SPPOP_DragAndDropAttractSuccess")
			} else WriteFailure("SPPOP_DragAndDropAttractFail")
		} else if (Flighting.VariantConfiguration.IsExpFeatureClientEnabled(178)) {
			WriteEngagementLog("SPPOP_DragAndDropAttractB");
			WriteStart("SPPOP_DragAndDropAttractBStart");
			if (ShouldShowDragDropAttractBox(b)) {
				a.push('<caption class="ms-dragDropAttract"><div class="ms-metadata ms-dragDropAttract-subtle ms-hideWhenFileDrag">' + window.ListView.Strings.L_SPDragAndDropAttract + "</div></caption>");
				WriteSuccess("SPPOP_DragAndDropAttractBSuccess")
			} else WriteFailure("SPPOP_DragAndDropAttractBFail")
		} else if (Flighting.VariantConfiguration.IsExpFeatureClientEnabled(311)) WriteEngagementLog("SPPOP_NoDragAndDropAttract");
		else WriteEngagementLog("SPPOP_DragAndDropAttractUserFlightError");
		return a.join("")
	};
	RenderFooterTemplate = function (a) {
		var b = [];
		(!(Flighting.VariantConfiguration.IsExpFeatureClientEnabled(146) || Flighting.VariantConfiguration.IsExpFeatureClientEnabled(178)) || !ShouldShowDragDropAttractBox(a)) && RenderEmptyText(b, a);
		RenderPaging(b, a);
		return b.join("")
	};
	RenderHeroParameters_InitializePrototype();
	if (typeof window.ComputedFieldWorker != "function") window.ComputedFieldWorker = function () {
		function h(c, d, a) {
			if (c["Created_x0020_Date.ifnew"] == "1") {
				var b = GetThemedImageUrl("spcommon.png");
				a.push('<span class="ms-newdocument-iconouter"><img class="ms-newdocument-icon" src="');
				a.push(b);
				a.push('" alt="');
				a.push(window.ListView.Strings.L_SPClientNew);
				a.push('" title="');
				a.push(window.ListView.Strings.L_SPClientNew);
				a.push('" /></span>')
			}
		}

		function b(i, h, g, c, d, b, e) {
			var a = [];
			a.push('<span style="vertical-align:middle">');
			a.push('<span style="height:16px;width:16px;position:relative;display:inline-block;overflow:hidden;" class="s4-clust"><a href="');
			a.push(i);
			f(a, b, e);
			a.push('" style="height:16px;width:16px;display:inline-block;" ><img src="' + ListView.ImageBasePath + '/_layouts/15/images/fgimg.png?rev=44" alt="');
			a.push(h);
			a.push('" style="left:-0px !important;top:');
			a.push(g);
			a.push('px !important;position:absolute;" title="');
			a.push(c);
			a.push('" class="imglink" longDesc="');
			a.push(d);
			a.push('"></a>');
			a.push("</span>");
			a.push("</span>");
			return a.join("")
		}

		function f(a, b, c) {
			a.push(b.HttpVDir);
			a.push("/Lists/Posts/Post.aspx?ID=");
			a.push(c.ID)
		}

		function i(a) {
			return a["HTML_x0020_File_x0020_Type.File_x0020_Type.mapico"] == "" ? ListView.ImageBasePath + "/_layouts/15/images/folder.gif?rev=44" : ListView.ImageBasePath + "/_layouts/15/images/" + a["HTML_x0020_File_x0020_Type.File_x0020_Type.mapico"]
		}

		function c(d, b, c) {
			var a = [],
				i = b.FileRef;
			if (i != null && typeof i != "undefined" && TrimSpaces(i) != "")
				if (b.FSObjType == "1")
					if (c.IsDocLib == "1") RenderDocFolderLink(d, a, b.FileLeafRef, b, c);
					else RenderListFolderLink(a, b.FileLeafRef, b, c);
			else if (ListModule.Settings.SupportsAddToOneDrive && Boolean(IsMountPoint(b))) {
				EnsureFileLeafRefName(b);
				a.push(RenderMountPointLink(d, a, b["FileLeafRef.Name"], b, c))
			} else if (ListModule.Settings.SupportsShortcutLink && Boolean(IsShortcutLink(b))) {
				EnsureFileLeafRefName(b);
				RenderShortcutLink(d, a, b["FileLeafRef.Name"], b, c)
			} else {
				var g = (Boolean(d.RealHttpRoot) ? ListModule.Util.getHostUrl(d.HttpRoot) : "") + b.FileRef;
				g = Flighting.VariantConfiguration.IsExpFeatureClientEnabled(54) ? Encoding.HtmlEncodeEx(g) : Encoding.HtmlEncode(g);
				var f;
				a.push("<a class='ms-listlink' href=\"");
				a.push(g);
				a.push('" onmousedown="return VerifyHref(this,event,\'');
				a.push(c.DefaultItemOpen);
				a.push("','");
				a.push(b["HTML_x0020_File_x0020_Type.File_x0020_Type.mapcon"]);
				a.push("','");
				if (!(window.OffSwitch == null || OffSwitch.IsActive("69053542-B803-4A16-A80B-D23AC98F06A4"))) {
					if (Flighting.VariantConfiguration.IsExpFeatureClientEnabled(90)) f = Encoding.ScriptEncode(b["serverurl.progid"]);
					else f = b["serverurl.progid"];
					if ((b.PermMask & 0, 4) && (Flighting.VariantConfiguration.IsExpFeatureClientEnabled(165) && g.toLowerCase().endsWith(".docx") || Flighting.VariantConfiguration.IsExpFeatureClientEnabled(194) && g.toLowerCase().endsWith(".pptx"))) f = f.replace("WopiFrame.aspx", "doc.aspx");
					a.push(f)
				} else if (Flighting.VariantConfiguration.IsExpFeatureClientEnabled(90)) a.push(Encoding.ScriptEncode(b["serverurl.progid"]));
				else a.push(b["serverurl.progid"]);
				a.push('\')" onclick="');
				AddUIInstrumentationClickEvent(a, b, "Navigation");
				if (IsFileHandlerForAllNonOfficeFilesSupported()) {
					if (IsFileExtensionControlsSupported() && ShouldCallSuiteExtensionControlFactory(d)) {
						a.push("CoreInvoke('CallSuiteExtensionControlFactory', this, event, '");
						a.push(b.File_x0020_Type);
						a.push("','");
						a.push(d.HttpRoot);
						a.push("','");
						a.push(Encoding.ScriptEncode(b.FileRef));
						a.push("');")
					}
				} else {
					a.push("CoreInvoke('CallSuiteExtensionControlFactory', this, event, '");
					a.push(b.File_x0020_Type);
					a.push("','");
					a.push(d.HttpRoot);
					a.push("','");
					a.push(Encoding.ScriptEncode(b.FileRef));
					a.push("');")
				}
				a.push("return DispEx(this,event,'TRUE','FALSE','");
				a.push(b["File_x0020_Type.url"]);
				a.push("','");
				a.push(b["File_x0020_Type.progid"]);
				a.push("','");
				a.push(c.DefaultItemOpen);
				a.push("','");
				a.push(b["HTML_x0020_File_x0020_Type.File_x0020_Type.mapcon"]);
				a.push("','");
				a.push(b.HTML_x0020_File_x0020_Type);
				a.push("','");
				if (!(window.OffSwitch == null || OffSwitch.IsActive("69053542-B803-4A16-A80B-D23AC98F06A4"))) a.push(f);
				else if (Flighting.VariantConfiguration.IsExpFeatureClientEnabled(90)) a.push(Encoding.ScriptEncode(b["serverurl.progid"]));
				else a.push(b["serverurl.progid"]);
				a.push("','");
				a.push(Boolean(b.CheckoutUser) ? b.CheckoutUser[0].id : "");
				a.push("','");
				a.push(c.Userid);
				a.push("','");
				a.push(c.ForceCheckout);
				a.push("','");
				a.push(b.IsCheckedoutToLocal);
				a.push("','");
				a.push(b.PermMask);
				var e = b.FileLeafRef;
				if (e != null) {
					var j = e.lastIndexOf(".");
					e = j >= 0 ? e.substring(0, j) : e
				}
				if (ListModule.Settings.SupportsDoclibAccessibility) {
					a.push("')\"");
					var k = e + ", " + ariaLabelForFile(b["File_x0020_Type.mapapp"], b.File_x0020_Type);
					a.push(" aria-label='");
					a.push(Encoding.HtmlEncode(k));
					a.push("'>")
				} else a.push("')\">");
				a.push(Encoding.HtmlEncode(e));
				a.push("</a>");
				h(b, c, a)
			} else {
				a.push("<nobr>");
				a.push(Encoding.HtmlEncode(b.FileLeafRef));
				a.push("</nobr>")
			}
			return a.join("")
		}

		function g(c, x, b, d) {
			var a = [],
				j = Encoding.HtmlEncode(b.FileLeafRef),
				f = "imgIcon" + b.ID + c.wpq,
				m = b["DocIcon.groupHeader"] === undefined ? false : true;
			if (m) {
				f = "imgIcon" + c.ctxId + "-";
				if (b["DocIcon.groupindex"]) f += b["DocIcon.groupindex"];
				else if (b["DocIcon.groupindex2"]) {
					var v = d.group1;
					f += b[v + ".groupindex"] + b["DocIcon.groupindex2"]
				}
			}
			if (ListModule.Settings.SupportsAddToOneDrive && Boolean(IsMountPoint(b))) {
				var t = MountPointInfo.createByListItem(b, c);
				if (SupportAjaxFolderNav(c)) {
					var w = c.clvp != null ? c.clvp.WebPartId() : "";
					a.push('<a href="#" onclick="');
					a.push("EnterFolderAjax(event, '");
					a.push(URI_Encoding.encodeURIComponent(b.FileRef));
					a.push("', '");
					a.push(t.getMountPointUrl());
					a.push("', true);return false;\"");
					if (ListModule.Settings.SupportsDoclibAccessibility) a.push(' aria-label="' + Encoding.HtmlEncode(window.ListView.Strings.L_FieldType_SharedFolder) + '">');
					else a.push(">")
				} else {
					a.push('<a href="');
					a.push(t.getMountPointUrl());
					if (ListModule.Settings.SupportsDoclibAccessibility) a.push(' aria-label="' + Encoding.HtmlEncode(window.ListView.Strings.L_FieldType_SharedFolder) + '">');
					else a.push('">')
				}
				a.push('<img border="0" alt="');
				a.push(j);
				a.push('" title="');
				a.push(j);
				a.push('" src="');
				a.push(ListView.ImageBasePath + "/_layouts/15/images/SharedFolder16.png?rev=44");
				a.push('" />');
				a.push("</a>")
			} else if (ListModule.Settings.SupportsShortcutLink && Boolean(IsShortcutLink(b))) {
				EnsureFileLeafRefName(b);
				RenderShortcutLinkIcon(c, a, b["FileLeafRef.Name"], b, d)
			} else if (b.FSObjType == "1") {
				var o = fMaintainUserChrome() ? "&MaintainUserChrome=true" : "";
				if (r()) q();
				else {
					a.push('<a href="');
					a.push(d.PagePath);
					a.push("?RootFolder=");
					a.push(URI_Encoding.encodeURIComponent(b.FileRef));
					a.push(d.ShowWebPart);
					a.push("&FolderCTID=");
					a.push(b.ContentTypeId);
					a.push("&View=");
					a.push(URI_Encoding.encodeURIComponent(d.View));
					a.push(o);
					a.push('" onmousedown="VerifyFolderHref(this, event, \'');
					a.push(b["File_x0020_Type.url"]);
					a.push("','");
					a.push(b["File_x0020_Type.progid"]);
					a.push("','");
					a.push(d.DefaultItemOpen);
					a.push("', '");
					a.push(b["HTML_x0020_File_x0020_Type.File_x0020_Type.mapcon"]);
					a.push("', '");
					a.push(b.HTML_x0020_File_x0020_Type);
					a.push("', '");
					if (Flighting.VariantConfiguration.IsExpFeatureClientEnabled(90)) a.push(Encoding.ScriptEncode(b["serverurl.progid"]));
					else a.push(b["serverurl.progid"]);
					a.push('\')" onclick="');
					AddUIInstrumentationClickEvent(a, b, "Navigation");
					a.push("return HandleFolder(this,event,'");
					a.push(d.PagePath);
					a.push("?RootFolder=");
					a.push(URI_Encoding.encodeURIComponent(b.FileRef));
					a.push(d.ShowWebPart);
					a.push("&FolderCTID=");
					a.push(b.ContentTypeId);
					a.push("&View=");
					a.push(URI_Encoding.encodeURIComponent(d.View));
					a.push(o);
					a.push("','TRUE','FALSE','");
					a.push(b["File_x0020_Type.url"]);
					a.push("','");
					a.push(b["File_x0020_Type.progid"]);
					a.push("','");
					a.push(d.DefaultItemOpen);
					a.push("','");
					a.push(b["HTML_x0020_File_x0020_Type.File_x0020_Type.mapcon"]);
					a.push("','");
					a.push(b.HTML_x0020_File_x0020_Type);
					a.push("','");
					if (Flighting.VariantConfiguration.IsExpFeatureClientEnabled(90)) a.push(Encoding.ScriptEncode(b["serverurl.progid"]));
					else a.push(b["serverurl.progid"]);
					a.push("','");
					a.push(Boolean(b.CheckoutUser) ? b.CheckoutUser[0].id : "");
					a.push("','");
					a.push(d.Userid);
					a.push("','");
					a.push(d.ForceCheckout);
					a.push("','");
					a.push(b.IsCheckedoutToLocal);
					a.push("','");
					a.push(b.PermMask);
					if (ListModule.Settings.SupportsDoclibAccessibility) a.push('\');" tabIndex="-1" IsFolder="TRUE" aria-label="' + Encoding.HtmlEncode(ariaLabelForFolder(b["File_x0020_Type.mapapp"], false)) + '"><img border="0" alt="');
					else a.push('\');"><img border="0" alt="');
					a.push(j);
					a.push('" title="');
					a.push(j);
					a.push('" src="');
					a.push(i(b));
					a.push('" />');
					if (typeof b.IconOverlay != "undefined" && b.IconOverlay != "") {
						a.push('<img width="16" height="16" src="' + ListView.ImageBasePath + "/_layouts/15/images/");
						if (!(window.OffSwitch == null || OffSwitch.IsActive("B35674E3-5E63-4A44-AF45-127010C82E7D"))) a.push(Encoding.HtmlEncode(b["IconOverlay.mapoly"]));
						else a.push(b["IconOverlay.mapoly"]);
						a.push('" class="ms-vb-icon-overlay" alt="" title="" />')
					}
					a.push("</a>")
				}
			} else if (d.IsDocLib == "1")
				if (typeof b.IconOverlay == "undefined" || b.IconOverlay == "") {
					var g = false,
						e = null,
						l = typeof b.CheckoutUser == "undefined" || b.CheckoutUser == "",
						k = typeof b._ComplianceFlags !== "undefined" && b._ComplianceFlags != null && (b._ComplianceFlags & 4) == 4;
					if (IsFileHandlerForAllNonOfficeFilesSupported()) {
						c.allowedSuiteExtensionFileTypes = ["pdf"];
						if (IsFileExtensionControlsSupported() && ShouldCallSuiteExtensionControlFactory(c)) g = true
					} else {
						c.allowedSuiteExtensionFileTypes = ["bmp", "chm", "gif", "htm", "html", "jpeg", "jpg", "pdf", "png", "psd", "tif", "txt", "wma", "wmv", "xml", "zip"];
						if (IsFileExtensionControlsSupported() && typeof b["HTML_x0020_File_x0020_Type.File_x0020_Type.mapico"] != "undefined" && (b["HTML_x0020_File_x0020_Type.File_x0020_Type.mapico"] == "" || IE8Support.arrayIndexOf(c.allowedSuiteExtensionFileTypes, b.File_x0020_Type, 0) > -1)) g = true
					}
					if (r()) q();
					else if (l) {
						e = ListModule.Settings.SupportsDoclibAccessibility ? ariaLabelForFile(b["File_x0020_Type.mapapp"], b.File_x0020_Type) : b.FileLeafRef;
						var u = Boolean(b["HTML_x0020_File_x0020_Type.File_x0020_Type.isIconDynamic"]) ? " onclick=\"this.style.display='none';\"" : "";
						if (k) e = n();
						h(e, b.FileLeafRef, true, b["HTML_x0020_File_x0020_Type.File_x0020_Type.mapico"], u)
					} else {
						e = p();
						h(e, e, true, b["HTML_x0020_File_x0020_Type.File_x0020_Type.mapico"])
					}
					if (!m)
						if (!l || k) {
							var s = ListView.ImageBasePath + "/_layouts/15/images/checkoutoverlay.gif";
							e = p();
							if (l && k) {
								e = n();
								s = ListView.ImageBasePath + "/_layouts/15/images/lockoverlay.png"
							}
							a.push('<img src="' + s + '" class="ms-vb-icon-overlay" alt="');
							a.push(e);
							a.push('" title="');
							a.push(e);
							a.push('" />')
						}
				} else {
					h(b.FileLeafRef, b.FileLeafRef, false, b["IconOverlay.mapico"]);
					a.push('<img width="16" height="16" src="' + ListView.ImageBasePath + "/_layouts/15/images/");
					if (!(window.OffSwitch == null || OffSwitch.IsActive("B35674E3-5E63-4A44-AF45-127010C82E7D"))) a.push(Encoding.HtmlEncode(b["IconOverlay.mapoly"]));
					else a.push(b["IconOverlay.mapoly"]);
					a.push('" class="ms-vb-icon-overlay" alt="" title="" />')
				}
			else h(b.FileLeafRef, b.FileLeafRef, false, b["HTML_x0020_File_x0020_Type.File_x0020_Type.mapico"]);

			function p() {
				return b.FileLeafRef + "&#10;" + window.ListView.Strings.L_SPCheckedoutto + ": " + (Boolean(b.CheckoutUser) ? Encoding.HtmlEncode(b.CheckoutUser[0].title) : "")
			}

			function n() {
				return b.FileLeafRef + "&#10;" + window.ListView.Strings.L_Tag_Callout_BlockDeleteItem
			}

			function r() {
				return ListModule.Settings.SupportsPolicyTips && b._ip_UnifiedCompliancePolicyUIAction !== undefined && Number(b._ip_UnifiedCompliancePolicyUIAction) > 0 && !m
			}

			function h(i, j, h, d, e) {
				a.push('<img width="16" height="16" border="0" alt="');
				a.push(i);
				if (IsFileHandlerForAllNonOfficeFilesSupported()) g && a.push('" class="registerFileIcon');
				else g && (b["HTML_x0020_File_x0020_Type.File_x0020_Type.mapico"] == "" || IE8Support.arrayIndexOf(c.allowedSuiteExtensionFileTypes, b.File_x0020_Type, 0) > -1) && a.push('" class="registerFileIcon');
				a.push('" title="');
				a.push(j);
				if (f !== undefined) {
					a.push('" id="');
					a.push(f)
				}
				if (h && g)
					if (d == "") d = "icgen.gif";
				a.push('" src="' + ListView.ImageBasePath + "/_layouts/15/images/" + d);
				a.push('"');
				e !== undefined && a.push(e);
				a.push("/>")
			}

			function q() {
				var d, a;
				if (Number(b._ip_UnifiedCompliancePolicyUIAction) == 1) {
					d = "dlpalert.png";
					a = window.ListView.Strings.L_DLP_Callout_PolicyTip
				} else {
					d = "dlpblock.png";
					a = window.ListView.Strings.L_DLP_Callout_BlockedItem
				}
				h(a, a, true, d, ' class="ms-listview-policyTipIcon"');
				var e = false;
				SPClientRenderer.AddPostRenderCallback(c, g);

				function g() {
					if (!e) {
						e = true;
						var a = document.getElementById(f);
						Boolean(a) && DOM.AddEventHandler(a, "onclick", function () {
							if (Number(b._ip_UnifiedCompliancePolicyUIAction) == 1 || Number(b._ip_UnifiedCompliancePolicyUIAction) == 1 + 2) EnsureScriptFunc("core.js", "LaunchDlpDialog", function () {
								LaunchDlpDialog(b, c, "DocIcon")
							});
							else WriteDocEngagementLog("Documents_PolicyTipIconClickNoNotify", "OneDrive_PolicyTipIconClickNoNotify")
						}, false)
					}
				}
			}
			return a.join("")
		}

		function e(c, e, a, b) {
			return d(c, a, b, a.Title)
		}

		function d(e, b, a, d) {
			var c = [];
			if (b.FSObjType == "1")
				if (a.IsDocLib == "1") RenderDocFolderLink(e, c, LinkTitleValue(d), b, a);
				else RenderListFolderLink(c, LinkTitleValue(d), b, a);
			else RenderTitle(c, e, b, a, LinkTitleValue(d));
			h(b, a, c);
			return c.join("")
		}

		function a(f, e, b) {
			var a = [];
			a.push('<a href="' + EncodeUrl(b.FileRef) + '">');
			a.push('<img galleryimg="false" border="0"');
			a.push(' id="' + b.ID + 'webImgShrinked"');
			e.Name != "PreviewOnForm" && a.push(' class="ms-displayBlock"');
			var d = (e.Name == "PreviewOnForm" ? "256" : "128") + "px";
			a.push(' style="max-width: ' + d + "; max-height: " + d + '; margin:auto; visibility: hidden;"');
			a.push(' onerror="displayGenericDocumentIcon(event.srcElement ? event.srcElement : event.target, ' + b.FSObjType + '); return false;"');
			a.push(" onload=\"(event.srcElement ? event.srcElement : event.target).style.visibility = 'visible';\"");
			a.push(' alt="');
			var c = b._Comments;
			if (c != null && c != "") a.push(Encoding.HtmlEncode(c));
			else a.push(window.ListView.Strings.L_ImgAlt_Text);
			a.push('" src="' + EncodeUrl(getDocumentIconAbsoluteUrl(b, 256, f)) + '"/>');
			a.push("</a>");
			return a.join("")
		}
		return {
			URLwMenu: function (f, e, b, c) {
				var d;
				if (b.FSObjType == "1") {
					var a = [];
					a.push('<a onfocus="OnLink(this)" href="SubmitFormPost()" onclick="ClearSearchTerm(\'');
					a.push(c.View);
					a.push("');ClearSearchTerm('');SubmitFormPost('");
					a.push(c.PagePath);
					a.push("?RootFolder=");
					a.push(URI_Encoding.encodeURIComponent(b.FileRef));
					a.push(c.ShowWebPart);
					a.push("&FolderCTID=");
					a.push(b.ContentTypeId);
					a.push("');return false;\">");
					a.push(b.FileLeafRef);
					a.push("</a>");
					d = a.join("")
				} else d = RenderUrl(b, "URL", c, e, true);
				return d
			},
			URLNoMenu: function (d, c, b, a) {
				return RenderUrl(b, "URL", a, c, true)
			},
			mswh_Title: function (d, e, b) {
				var a = [];
				a.push('<a onfocus="OnLink(this)" href="');
				a.push(b.FileRef);
				a.push('" onclick="LaunchWebDesigner(');
				a.push("'");
				a.push(b.FileRef);
				a.push("','design'); return false;");
				a.push('">');
				a.push(LinkTitleValue(b.Title));
				a.push("</a>");
				return a.join("")
			},
			LinkTitle: e,
			LinkTitleNoMenu: e,
			Edit: function (d, f, b, c) {
				if (ListModule.Util.hasEditPermission(b)) {
					var e = ResolveId(b, c),
						a = [];
					a.push('<a href="');
					a.push(d.editFormUrl);
					a.push("&ID=");
					a.push(e);
					a.push('" onclick="EditItemWithCheckoutAlert(event, \'');
					a.push(d.editFormUrl);
					a.push("&ID=");
					a.push(e);
					a.push("', '");
					a.push(EditRequiresCheckout(b, c));
					a.push("', '");
					a.push(b.IsCheckedoutToLocal);
					a.push("', '");
					a.push(escape(b.FileRef));
					a.push("', '");
					a.push(c.HttpVDir);
					a.push("', '");
					a.push(b.CheckedOutUserId);
					a.push("', '");
					a.push(c.Userid);
					a.push('\');return false;" target="_self">');
					a.push('<img border="0" alt="');
					a.push(window.ListView.Strings.L_SPClientEdit);
					a.push('" src="' + ListView.ImageBasePath + '/_layouts/15/images/edititem.gif?rev=44"/></a>');
					return a.join("")
				} else return "&nbsp;"
			},
			DocIcon: g,
			MasterPageIcon: g,
			LinkFilename: function (b, e, d, a) {
				return c(b, d, a)
			},
			LinkFilenameNoMenu: function (b, e, d, a) {
				return c(b, d, a)
			},
			NumCommentsWithLink: function (e, g, c, d) {
				var a = [];
				a.push(b("", window.ListView.Strings.L_SPClientNumComments, "-396", window.ListView.Strings.L_SPClientNumComments, window.ListView.Strings.L_SPClientNumComments, d, c));
				a.push('<span><a href="');
				f(a, d, c);
				a.push('">&nbsp;');
				a.push(c.NumComments);
				a.push("&nbsp;");
				a.push("Comment(s)");
				a.push("</a></span>");
				return a.join("")
			},
			EmailPostLink: function (d, e, c, a) {
				return b("javascript:navigateMailToLink('", window.ListView.Strings.L_SPEmailPostLink, "-267", window.ListView.Strings.L_SPEmailPostLink, window.ListView.Strings.L_SPEmailPostLink, a, c)
			},
			Permalink: function (d, e, c, a) {
				return b("", "Permanent Link to Post", "-412", "Permanent Link to Post", "Permanent Link to Post", a, c)
			},
			CategoryWithLink: function (d, e, b, c) {
				var a = [];
				a.push('<a class="static menu-item" href="');
				a.push(c.HttpVDir);
				a.push("/");
				a.push("lists/Categories/Category.aspx?CategoryId=");
				a.push(b.ID);
				a.push('" id="blgcat');
				a.push(b.ID);
				a.push('"><span class="additional-backgroud"><span class="menu-item-text">');
				a.push(b.Title);
				a.push("</span></span></a>");
				return a.join("")
			},
			LinkIssueIDNoMenu: function (c, e, b) {
				var a = [];
				a.push('<a href="');
				a.push(c.displayFormUrl);
				a.push("&ID=");
				a.push(b.ID);
				a.push('" onclick="');
				AddUIInstrumentationClickEvent(a, b, "Navigation");
				a.push("EditLink2(this,");
				a.push(c.ctxId);
				a.push(');return false;" target="_self">');
				a.push(b.ID);
				a.push("</a>");
				return a.join("")
			},
			SelectTitle: function (d, e, c, b) {
				if (b.SelectedID == c.ID || b.SelectedID == "-1" && c.firstRow == true) return '<img border="0" align="absmiddle" style="cursor: hand" src="' + ListView.ImageBasePath + '/_layouts/15/images/rbsel.gif" alt="' + window.ListView.Strings.L_SPSelected + '" />';
				else {
					var a = [];
					a.push("<a href=\"javascript:SelectField('");
					a.push(b.View);
					a.push("','");
					a.push(c.ID);
					a.push("');return false;\" onclick=\"SelectField('");
					a.push(b.View);
					a.push("','");
					a.push(c.ID);
					a.push('\');return false;" target="_self">');
					a.push('<img border="0" align="absmiddle" style="cursor: hand" src="' + ListView.ImageBasePath + '/_layouts/15/images/rbunsel.gif"  alt="');
					a.push(window.ListView.Strings.L_SPGroupBoardTimeCardSettingsNotFlex);
					a.push('" /></a>');
					return a.join("")
				}
			},
			DisplayResponse: function (c, e, b) {
				var a = [];
				a.push('<a onfocus="OnLink(this)" href="');
				a.push(c.displayFormUrl);
				a.push("&ID=");
				a.push(b.ID);
				a.push('" onclick="GoToLinkOrDialogNewWindow(this);return false;" target="_self" id="onetidViewResponse">');
				a.push(window.ListView.Strings.L_SPView_Response);
				a.push(" #");
				a.push(b.ID);
				a.push("</a>");
				return a.join("")
			},
			Completed: function (c, d, a) {
				return a._Level == "1" ? window.ListView.Strings.L_SPYes : window.ListView.Strings.L_SPNo
			},
			RepairDocument: function (c, d, a) {
				return '<input id="chkRepair" type="checkbox" title="' + window.ListView.Strings.L_SPRelink + '" docID="' + a.ID + '" />'
			},
			Combine: function (e, f, b, d) {
				if (b.FSObjType == "0") {
					var a = '<input id="chkCombine" type="checkbox" title="';
					a += window.ListView.Strings.L_SPMerge;
					a += '" href="';
					var c;
					if (b.FSObjType == "0") c = String(d.HttpVDir) + String(b.FileRef);
					else c = b.FileRef;
					a += c + '" />';
					a += '<input id="chkUrl" type="hidden" href="';
					a += b.TemplateUrl;
					a += '" />';
					a += '<input id="chkProgID" type="hidden" href="';
					a += b["HTML_x0020_File_x0020_Type.File_x0020_Type.mapcon"];
					a += '" />';
					return a
				}
				return ""
			},
			HealthReportSeverityIcon: function (f, g, c) {
				var a = new String(c.HealthReportSeverity),
					d = a.indexOf(" - ");
				a = a.substring(0, d);
				var b;
				if (a == "1") b = "hltherr";
				else if (a == "2") b = "hlthwrn";
				else if (a == "3") b = "hlthinfo";
				else if (a == "4") b = "hlthsucc";
				else b = "hlthfail";
				return '<img src="' + ListView.ImageBasePath + "/_layouts/15/images/" + b + '.png" alt="' + a + '" />'
			},
			FileSizeDisplay: function (c, d, a) {
				var e = [];
				return a.FSObjType == "0" ? String(Math.ceil(a.File_x0020_Size / 1024)) + " KB" : ""
			},
			NameOrTitle: function (c, e, a, b) {
				return d(c, a, b, a.FileLeafRef)
			},
			ImageSize: function (d, e, a) {
				var b = [];
				if (a.FSObjType == "0")
					if (a.ImageWidth != "" && a.ImageWidth != "0") {
						b.push('<span dir="ltr">');
						b.push(a.ImageWidth + " x " + a.ImageHeight);
						b.push("</span>")
					}
				return b.join("")
			},
			ThumbnailOnForm: a,
			PreviewOnForm: a,
			Thumbnail: a,
			FileType: function (c, d, a) {
				return a.File_x0020_Type
			},
			_IsRecord: function (d, e, a) {
				var b = typeof a._ComplianceFlags !== "undefined" && a._ComplianceFlags != null && (a._ComplianceFlags & 4) == 4;
				return b ? window.ListView.Strings.L_SPYes : window.ListView.Strings.L_SPNo
			}
		}
	}();
	ComputedFieldRenderer_InitializePrototype();
	RenderCalloutAffordance = function (h, b, c, d) {
		var a = [],
			e = Boolean(d),
			f = "ms-lstItmLinkAnchor " + (e ? "ms-ellipsis-a-tile" : "ms-ellipsis-a");
		a.push('<a ms-jsgrid-click-passthrough="true" class="' + f + '" title="');
		a.push(Encoding.HtmlEncode(window.ListView.Strings.L_OpenMenuAriaLabel));
		a.push('" aria-haspopup="true" aria-expanded="false"');
		a.push('onclick="');
		!d && AddUIInstrumentationClickEvent(a, b, "Hover");
		if (h) a.push("OpenCalloutAndSelectItem(this, event, this, '" + b.ID + '\'); return false;" href="#" id="' + c + '" >');
		else a.push("OpenCallout(this, event, this, '" + b.ID + '\'); return false;" href="#" id="' + c + '" >');
		var g = e ? "ms-ellipsis-icon-tile" : "ms-ellipsis-icon";
		a.push('<img class="' + g + '" src="' + GetThemedImageUrl("spcommon.png") + '" alt="' + Encoding.HtmlEncode(window.ListView.Strings.L_OpenMenu) + '" /></a>');
		return a.join("")
	};
	RenderECB = function (e, c, f, g, b) {
		var a = [],
			d = e.ListSchema;
		a.push('<div class="ms-vb ' + (b == true ? "" : "ms-tableCell ms-list-TitleLink") + ' ms-vb-menuPadding itx" CTXName="ctx');
		a.push(e.ctxId);
		a.push('" id="');
		a.push(c.ID);
		a.push('" Field="');
		a.push(f.Name);
		a.push('" Perm="');
		a.push(c.PermMask);
		a.push('" EventType="');
		a.push(c.EventType);
		a.push('">');
		a.push(g);
		a.push("</div>");
		if (b == true) {
			a.push('</td><td class="ms-list-itemLink-td ms-cellstyle');
			d.Field[d.Field.length - 1] == f && a.push(" ms-vb-lastCell");
			a.push('">')
		}
		if (!PageMinimized()) {
			a.push('<div class="ms-list-itemLink ' + (b == true ? "" : "ms-tableCell ms-alignRight") + '" ');
			a.push("onclick=\"CoreInvoke('ShowECBMenuForTr', this, event");
			a.push(", ListView.Strings");
			a.push('); return false;">');
			a.push('<a ms-jsgrid-click-passthrough="true" class="ms-lstItmLinkAnchor ms-ellipsis-a" title="');
			a.push(Encoding.HtmlEncode(window.ListView.Strings.L_OpenMenuECB));
			a.push('" aria-haspopup="true" ');
			a.push("onclick=\"CoreInvoke('ShowECBMenuForTr', this.parentNode, event");
			a.push(", ListView.Strings");
			a.push('); return false; " href="#" >');
			a.push('<img class="ms-ellipsis-icon" src="' + GetThemedImageUrl("spcommon.png") + '" alt="' + Encoding.HtmlEncode(window.ListView.Strings.L_OpenMenu) + '" /></a>');
			a.push("</div>")
		}
		return a.join("")
	};
	RenderCalloutMenu = function (d, b, h, g, c) {
		var a = [],
			e = "ctx" + d.ctxId + "_" + b.ID + "_calloutLaunchPoint",
			f = d.ListSchema;
		a.push('<div class="ms-vb ' + (c == true ? "" : "ms-tableCell ms-list-TitleLink") + ' itx" CTXName="ctx');
		a.push(d.ctxId);
		a.push('" id="');
		a.push(b.ID);
		a.push('" App="');
		a.push(b["File_x0020_Type.mapapp"]);
		a.push('">');
		a.push(g);
		a.push("</div>");
		if (c == true) {
			a.push('</td><td class="ms-list-itemLink-td ms-cellstyle');
			f.Field[f.Field.length - 1] == h && a.push(" ms-vb-lastCell");
			a.push('" role="gridcell">')
		}
		if (!PageMinimized())
			if (typeof b.RenderCalloutWithoutHover != "undefined" && b.RenderCalloutWithoutHover) a.push(RenderCalloutAffordance(false, b, e, true));
			else {
				a.push('<div class="ms-list-itemLink ' + (c == true ? "" : "ms-tableCell ms-alignRight") + ' " ');
				a.push(' onclick="ShowMenuForTrOuter(this,event, true); return false;" >');
				a.push(RenderCalloutAffordance(true, b, e, false));
				a.push("</div>")
			}
		return a.join("")
	};
	getDocumentIconAbsoluteUrl = function (a, d, e) {
		var g = function (b) {
				return a[b + ".value"] == "1" && ListModule.Util.isDefinedAndNotNullOrEmpty(a["FileLeafRef.Name"]) && ListModule.Util.isDefinedAndNotNullOrEmpty(c) || a[b + ".value"] == "" && e != null && e.ListTemplateType == 109
			},
			j = a["HTML_x0020_File_x0020_Type.File_x0020_Type.mapico"] == "",
			b;
		if (typeof d === "undefined" || d === 16) b = "";
		else if (j) b = String(d);
		else if (d === 32) b = "lg_";
		else b = String(d) + "_";
		EnsureFileLeafRefName(a);
		EnsureFileLeafRefSuffix(a);
		EnsureFileDirRef(a);
		var i = a.AlternateThumbnailUrl,
			h = ListModule.Util.isDefinedAndNotNullOrEmpty(i),
			c = a["FileLeafRef.Suffix"],
			l = g("PreviewExists"),
			k = g("ThumbnailExists"),
			m = ListModule.Util.isDefinedAndNotNullOrEmpty(c) && (c == "mp3" || c == "wma" || c == "wav" || c == "oga"),
			f = typeof ctx != "undefined" ? ctx : e;
		return b != "" && (h || l || k) ? h ? String(i) : a.FileDirRef + "/_w/" + a["FileLeafRef.Name"] + "_" + a["FileLeafRef.Suffix"] + ".jpg" : m ? f.imagesPath + "audiopreview.png" : j ? f.imagesPath + "folder" + b + ".gif" : f.imagesPath + b + a["HTML_x0020_File_x0020_Type.File_x0020_Type.mapico"]
	};
	displayGenericDocumentIcon = function (a, d, e) {
		var c = d === 1 ? "256_folder.png" : "256_icgen.png",
			f = typeof ctx != "undefined" ? ctx : e,
			b = f.imagesPath + c;
		if (a.src !== b) a.src = b
	};
	FieldRenderer_InitializePrototype();
	RawFieldRenderer_InitializePrototype();
	AttachmentFieldRenderer_InitializePrototype();
	RecurrenceFieldRenderer_InitializePrototype();
	ProjectLinkFieldRenderer_InitializePrototype();
	AllDayEventFieldRenderer_InitializePrototype();
	NumberFieldRenderer_InitializePrototype();
	BusinessDataFieldRenderer_InitializePrototype();
	DateTimeFieldRenderer_InitializePrototype();
	TextFieldRenderer_InitializePrototype();
	LookupFieldRenderer_InitializePrototype();
	NoteFieldRenderer_InitializePrototype();
	UrlFieldRenderer_InitializePrototype();
	UserFieldRenderer_InitializePrototype();
	s_ImnId = 1;
	SPMgr.prototype = {
		NewGroup: undefined,
		RenderField: undefined,
		RenderFieldByName: undefined
	};
	spMgr = new SPMgr;
	typeof RegisterSharedWithFieldRenderer == "function" && RegisterSharedWithFieldRenderer();
	InitializeSingleItemPictureView();
	typeof Sys != "undefined" && Sys != null && Sys.Application != null && Sys.Application.notifyScriptLoaded();
	typeof NotifyScriptLoadedAndExecuteWaitingJobs == "function" && NotifyScriptLoadedAndExecuteWaitingJobs("clienttemplates.js");
	typeof spWriteProfilerMark == "function" && spWriteProfilerMark("perfMarkEnd_clienttemplates.js")
}

function ContextMenu(a, C, D, o) {
	var e = null,
		f = null,
		d = -1,
		s = DOM.rightToLeft,
		B = 0,
		m = !Boolean(C),
		b = new Renderer;
	if (typeof a.useSmartPositioning == "undefined") a.useSmartPositioning = true;
	b.SetTemplate("overlay", '{%version 2.0}<div class="ms-contextmenu-overlay ms-js-overlay-contextmenu" onmousedown="{+overlayClick}"></div>');
	b.SetTemplate("root", '{%version 2.0}<div class="ms-contextmenu-box ms-js-contextmenu" style="position:fixed; left: {=left}px; top: {=top}px;" onclick="{+stopPropagation}" role="menu"><ul class="ms-contextmenu-list" id="{=id}">\n                {%foreach item items}\n            </ul></div>');
	b.SetTemplate("item", "{%version 2.0}{%templateSelect itemTemplate}");
	b.SetTemplate("separatorItem", '{%version 2.0}<li class="ms-contextmenu-separator"><hr class="ms-contextmenu-separatorHr" /></li>');
	b.SetTemplate("linkItem", '{%version 2.0}<li class="ms-contextmenu-item" id="{=liId}" onkeydown="{+keypress .}" oncontextmenu="{+rightClickHandler .}" role="menu-item" aria-label="{=tooltip}" tabIndex="-1"><a class="ms-contextmenu-link" id="{=id}" href="{=href}" title="{=text}" onclick="{+itemClick .}" target="{=target}" style="{=mstyle}">\n                {=text}<span class="ms-contextmenu-right-glyph glyph-class">{=glyph}</span></a></li>');
	b.SetTemplate("selectItem", '{%version 2.0}<li class="ms-contextmenu-item" id="{=liId}" onkeydown="{+keypress .}" oncontextmenu="{+rightClickHandler .}" role="menu-item" aria-label="{=tooltip}" tabIndex="-1"><form class="ms-contextmenu-link ms-contextmenu-selectable" onclick="{+itemSelect .}"><input type="checkbox" id="{=id}" class="ms-contextmenu-select" title="{=text}">{=text}</input></form></li>');
	b.SetTemplate("glyphItem", '{%version 2.0}<li class="ms-contextmenu-item" id="{=liId}" onkeydown="{+keypress .}" oncontextmenu="{+rightClickHandler .}" role="menu-item" aria-label="{=tooltip}" tabIndex="-1"><a class="ms-contextmenu-link" id="{=id}" onclick="{+itemClick .}"><span class="ms-contextmenu-select ms-contextmenu-glyph">{=glyph}</span>{=text}\n            </a></li>');
	b.SetTemplate("imgItem", '{%version 2.0}<li class="ms-contextmenu-item" id="{=liId}" onkeydown="{+keypress .}" oncontextmenu="{+rightClickHandler .}" role="menu-item" aria-label="{=tooltip}" tabIndex="-1"><a class="ms-contextmenu-link" id="{=id}" href="{=href}" title="{=text}" onclick="{+itemClick .}" target="{=target}"><img class="ms-contextmenu-select" src="{=imgsrc}" role="presentation" alt="" width="16" height="16" />{=text}\n            </a></li>');
	b.SetTemplate("subMenu", '{%version 2.0}<li class="ms-contextmenu-item" role="menu-item" id="{=liId}" onkeydown="{+keypress .}" oncontextmenu="{+rightClickHandler .}" aria-label="{=tooltip}" tabIndex="-1"><a class="ms-contextmenu-link" id="{=id}" href="#" title="{=text}" onclick="{+createSubMenu .}" onmouseenter="{+createSubMenu .}" onmouseleave="{+menuMouseLeave .}">\n        {=text}<span class="ms-contextmenu-right-glyph">{=glyph}</span></a></li>');
	var q = "menuItemId_";
	if (typeof ContextMenu._idUniqueNum == "undefined") ContextMenu._idUniqueNum = 0;
	this.open = function (a) {
		!Boolean(a) && h();
		z();
		A()
	};
	this.close = function () {
		h()
	};
	this.update = function () {
		k()
	};
	this.root = function () {
		return e
	};
	b.RegisterHandler("overlayClick", function (a) {
		DOM.cancelDefault(a);
		h(true);
		return false
	});
	b.RegisterHandler("stopPropagation", IE8Support.stopPropagation);
	b.RegisterHandler("itemClick", function (c, a) {
		var b = j.call(this, a.onclick);
		return b.call(this, c, m, a)
	});
	b.RegisterHandler("itemSelect", function (c, a) {
		var b = j.call(this, a.onclick);
		return b.call(this, c, m, a)
	});
	b.RegisterHandler("keypress", function (a) {
		return x(a)
	});
	b.RegisterHandler("rightClickHandler", function (a) {
		if (Boolean(a.stopPropagation)) a.stopPropagation();
		else a.cancelBubble = true;
		Boolean(a.preventDefault) && a.preventDefault()
	});
	b.RegisterHandler("createSubMenu", function (b, a) {
		return l(a)
	});
	b.RegisterHandler("menuMouseLeave", function (b) {
		var a = j.call(this, t);
		return a.call(this, b)
	});
	for (var g = 0; g < a.items.length; g++) {
		var c = a.items[g];
		c.itemTemplate = c.separator === true ? "separatorItem" : c.submenu === true ? "subMenu" : c.selectable === true ? "selectItem" : c.imgsrc != null ? "imgItem" : c.glyph != null ? "glyphItem" : "linkItem";
		if (c.href == null) c.href = "javascript:";
		if (!c.separator && !Boolean(c.id)) c.id = q + ContextMenu._idUniqueNum.toString();
		c.liId = q + "_li_" + ContextMenu._idUniqueNum.toString();
		ContextMenu._idUniqueNum++;
		if (c.parentId == null && Boolean(o)) c.parentId = o
	}

	function h(m) {
		var b = null;
		if (Boolean(f)) {
			document.body.removeChild(f);
			f = null
		}
		if (Boolean(e)) {
			b = e.parentNode;
			if (Boolean(b)) {
				b.removeChild(e);
				e = null
			}
			if (b != null) {
				var n = d < 0 ? 0 : d,
					i = a.items[n],
					h = null;
				if (Boolean(i)) {
					if (Boolean(i.parentId)) h = document.getElementById(i.parentId);
					else h = document.getElementById(i.liId);
					Boolean(h) && h.focus()
				}
			}
		}
		if (m) {
			var k = document.querySelectorAll(".ms-js-contextmenu"),
				l = document.querySelectorAll(".ms-contextmenu-overlay");
			for (g = Number(k.length) - 1; g >= 0; g--) {
				var c = k[g],
					j = l[g];
				if (c != null) {
					b = c.parentNode;
					b != null && b.removeChild(c);
					c = null;
					if (j != null) {
						document.body.removeChild(j);
						j = null
					}
				}
			}
		}
	}

	function r(c, d) {
		var a = document.createElement("div");
		a.innerHTML = b.Render(c, d);
		return a.removeChild(a.firstChild)
	}

	function z() {
		if (Boolean(f)) return;
		f = r("overlay");
		Boolean(f) && f.setAttribute("id", "cm_overlay" + String(B++));
		document.body.appendChild(f)
	}

	function A() {
		if (!Boolean(a.evt)) return;
		var c = a.evt,
			b = Boolean(c.target) ? c.target : c.srcElement,
			g = c.clientX,
			h = c.clientY;
		if (g === 0 && h === 0 && Boolean(b)) {
			g = DOM.AbsLeft(b) + b.clientWidth / 2;
			h = DOM.AbsTop(b) + b.clientHeight / 2
		}
		var l = {
			top: h,
			left: g,
			items: a.items
		};
		e = r(Boolean(a.rootId) ? a.rootId : "root", l);
		document.body.appendChild(e);
		for (var j = document.querySelectorAll("div.ms-contextmenu-box"), f = [], i = 0; i < j.length; i++) f.push(j[i].clientWidth);
		DOM.EnsureElementIsInViewPort(e, 5, f);
		s && u(e, 5, f);
		k();
		var d = e.querySelector("li.ms-contextmenu-item");
		if (d != null)
			if (typeof d.active == "function") d.active();
			else d.focus()
	}

	function y(d, e, a) {
		var b = DOM.AbsLeft(a),
			c = DOM.AbsTop(a);
		return d >= b && d <= b + a.clientWidth && e >= c && e <= c + a.clientHeight
	}

	function t(f) {
		for (var d = false, b = [], c = document.querySelectorAll("div.ms-contextmenu-box"), e = DOM.GetEventCoords(f), a = c.length - 1; a >= 0; a--)
			if (y(e.x, e.y, c[a])) {
				d = true;
				break
			} else b.push(c[a]);
		if (d)
			for (a = 0; a < b.length; a++) document.body.removeChild(b[a])
	}

	function u(c, e, b) {
		var d = Number(DOM.AbsLeft(c)),
			g = Number(c.clientWidth),
			f = Number(document.documentElement.clientWidth),
			a = d;
		if (Boolean(b) && b.length > 1) a -= b[b.length - 1] + b[b.length - 2];
		if (a !== d) {
			a += e;
			a = Math.max(a, 0);
			c.style.position = "absolute";
			c.style.top = c.style.top;
			c.style.left = String(a) + "px"
		}
	}

	function x(e) {
		var c = e.keyCode,
			f = e.shiftKey;
		if (s)
			if (c == 37) c = 39;
			else if (c == 39) c = 37;
		var b = null;
		switch (c) {
			case 38:
				i(-1);
				break;
			case 40:
				i(1);
				break;
			case 9:
				if (Boolean(f)) i(-1);
				else i(1);
				break;
			case 37:
			case 27:
				h();
				break;
			case 39:
				b = a.items[d];
				Boolean(b) && Boolean(b.items) && l(b);
				break;
			case 13:
				b = a.items[d];
				if (b != null && b.selectable) {
					b.selected = !b.selected;
					k()
				} else if (Boolean(b.items)) l(b);
				else {
					m && h(true);
					b.onclick(this, e, b.id)
				}
		}
		return false
	}

	function n(e, d) {
		var c = a.items[e];
		if (!Boolean(c)) return;
		var b = document.getElementById(c.liId);
		if (b != null && b.tagName.toLowerCase() == "li")
			if (d) CSSUtil.RemoveClass(b, "ms-contextmenu-itemSelected");
			else {
				CSSUtil.AddClass(b, "ms-contextmenu-itemSelected");
				if (typeof b.setActive != "undefined") b.setActive();
				else b.focus()
			}
		return
	}

	function p(d, e) {
		var c = a.items.length,
			b = (e + d) % c;
		if (b < 0) b = c - 1;
		return b
	}

	function i(e) {
		var f = a.items.length,
			b = -1,
			c = null;
		if (d < 0) b = e > 0 ? 0 : f - 1;
		else {
			n(d, true);
			b = p(e, d)
		}
		c = a.items[b];
		while (c != null && c.separator) {
			b = p(e, b);
			c = a.items[b]
		}
		d = b;
		n(b, false)
	}

	function w(a) {
		if (a.items.length > 0 && Boolean(a.items[0])) {
			var b = document.getElementById(String(a.items[0].liId));
			return Boolean(b)
		}
		return false
	}

	function l(b) {
		if (w(b)) return;
		var c = document.getElementById(b.liId),
			f = DOM.AbsLeft(c) + c.clientWidth + 2,
			e = {
				evt: {
					clientX: f,
					clientY: DOM.AbsTop(c)
				},
				items: b.items,
				useSmartPositioning: a.useSmartPositioning !== false
			},
			d = new ContextMenu(e, false, true, b.liId);
		d.open(true)
	}

	function v(c) {
		if (!Boolean(c))
			if (d >= 0) c = a.items[d];
		for (var e = true, b = 0; b < a.items.length; b++)
			if (a.items[b].id === c.id) {
				e = !Boolean(a.items[b].submenu);
				break
			}
		return e
	}

	function j(a) {
		return function (d, c, b) {
			c && v(b) && h(true);
			return a == null ? void 0 : a.call(this, d, Boolean(b) ? b.id : null)
		}
	}

	function k() {
		for (var b = 0; b < a.items.length; b++)
			if (Boolean(a.items[b].selectable)) {
				var d = a.items[b],
					c = document.getElementById(d.id);
				if (typeof c != "undefined" && c.title == d.text) c.checked = Boolean(a.items[b].selected)
			}
	}
}
var isSLV;

function InitListViewSettings() {
	ListModule.Settings.SupportsCallouts = SPListView;
	ListModule.Settings.SupportsDragDrop = SPListView;
	ListModule.Settings.SupportsRibbon = SPListView;
	ListModule.Settings.SupportsQCB = SPListView;
	ListModule.Settings.SupportsUpload = SPListView;
	ListModule.Settings.SupportsInplHash = SPListView;
	ListModule.Settings.SupportsAnimation = SPListView;
	ListModule.Settings.SupportsGrouping = SPListView;
	ListModule.Settings.SupportsNonCSR = SPListView;
	ListModule.Settings.SupportsInPlaceEdit = SPListView;
	ListModule.Settings.SupportsItemDelete = SPListView;
	ListModule.Settings.SupportsCheckout = SPListView;
	ListModule.Settings.SupportsPopup = SPListView;
	ListModule.Settings.SupportsErrorDlg = SPListView;
	ListModule.Settings.SupportsFileAttach = SPListView;
	ListModule.Settings.SupportsCopies = SPListView;
	ListModule.Settings.SupportsModeration = SPListView;
	ListModule.Settings.SupportsMQuery = SPListView;
	ListModule.Settings.SupportsForms = SPListView;
	ListModule.Settings.SupportsViewSelectorPivot = SPListView;
	ListModule.Settings.SupportsWebPageLibraryTemplate = SPListView;
	ListModule.Settings.SupportsDeveloperAppTemplate = SPListView;
	ListModule.Settings.SupportsDelayLoading = SPListView;
	ListModule.Settings.SupportsItemSelection = SPListView;
	ListModule.Settings.SupportsSharingDialog = SPListView;
	ListModule.Settings.UseAbsoluteUserDispUrl = !SPListView;
	ListModule.Settings.SupportsCrossDomainPhotos = SPListView;
	ListModule.Settings.SupportsTouch = SPListView;
	ListModule.Settings.SupportsBusinessDataField = SPListView;
	ListModule.Settings.SupportsUrlTokenReplacement = SPListView;
	ListModule.Settings.SupportsAsyncDataLoad = SPListView;
	ListModule.Settings.SupportsBreadCrumb = SPListView;
	ListModule.Settings.SupportsSubmitFormPost = SPListView;
	ListModule.Settings.SupportsFacePile = SPListView;
	ListModule.Settings.SupportsRest = isSLV;
	ListModule.Settings.SupportsDatapipes = isSLV;
	ListModule.Settings.SupportsOldDesktopMenus = SPListView;
	ListModule.Settings.SupportsTaskListEditMode = SPListView
}
var bListViewSettingsInitialized;

function InitListViewFlightSettings() {
	if (Boolean(bListViewSettingsInitialized)) return;
	ListModule.Settings.SupportsFileExtensionControls = Flighting.VariantConfiguration.IsExpFeatureClientEnabled(439);
	ListModule.Settings.SupportsFileHandlerForAllNonOfficeFiles = Flighting.VariantConfiguration.IsExpFeatureClientEnabled(754);
	ListModule.Settings.SupportsFileExtensionDataPipe = Flighting.VariantConfiguration.IsExpFeatureClientEnabled(461);
	ListModule.Settings.SupportsFileHandlerAddInPicker = Flighting.VariantConfiguration.IsExpFeatureClientEnabled(512);
	ListModule.Settings.SupportsFileHandlerFileCreation = Flighting.VariantConfiguration.IsExpFeatureClientEnabled(540);
	ListModule.Settings.SupportsAddToOneDrive = Flighting.VariantConfiguration.IsExpFeatureClientEnabled(134);
	ListModule.Settings.SupportsAddToOneDriveQCB = Flighting.VariantConfiguration.IsExpFeatureClientEnabled(161);
	ListModule.Settings.SupportsPeopleHoverCard = Flighting.VariantConfiguration.IsExpFeatureClientEnabled(0);
	ListModule.Settings.SupportsMaintainUserChrome = Flighting.VariantConfiguration.IsExpFeatureClientEnabled(63);
	ListModule.Settings.SupportsInfiniteScroll = Flighting.VariantConfiguration.IsExpFeatureClientEnabled(149);
	ListModule.Settings.SupportsAddToOneDriveInSync = Flighting.VariantConfiguration.IsExpFeatureClientEnabled(259);
	ListModule.Settings.SupportsPolicyTips = Flighting.VariantConfiguration.IsExpFeatureClientEnabled(340);
	ListModule.Settings.SupportsRightClickECB = Flighting.VariantConfiguration.IsExpFeatureClientEnabled(249) || Flighting.VariantConfiguration.IsExpFeatureClientEnabled(383) && Flighting.VariantConfiguration.IsExpFeatureClientEnabled(104);
	ListModule.Settings.SupportsShortcutLink = Flighting.VariantConfiguration.IsExpFeatureClientEnabled(563);
	ListModule.Settings.SupportsDoclibAccessibility = SPListView ? Flighting.VariantConfiguration.IsExpFeatureClientEnabled(169) : true;
	ListModule.Settings.SupportsDoclibQCB = SPListView ? Flighting.VariantConfiguration.IsExpFeatureClientEnabled(60) : true;
	bListViewSettingsInitialized = true
}
var bListViewStringsInitialized;

function InitListViewStrings() {
	if (Boolean(bListViewStringsInitialized)) return;
	if (typeof window.ListView == "undefined") window.ListView = {};
	if (typeof window.ListView.Strings == "undefined")
		if (SPListView && typeof Strings.STS != "undefined") window.ListView.Strings = Strings.STS;
		else if (typeof ListViewDefaults.Strings != "undefined") window.ListView.Strings = ListViewDefaults.Strings;
	bListViewStringsInitialized = true
}
var clientHierarchyManagers;

function OnExpandCollapseButtonClick(b) {
	for (var a = 0; a < clientHierarchyManagers.length; a++) clientHierarchyManagers[a].ToggleExpandByImg(b.target.parentNode);
	b.stopPropagation()
}

function GetClientHierarchyManagerForWebpart(b, c) {
	for (var a = 0; a < clientHierarchyManagers.length; a++)
		if (clientHierarchyManagers[a].Matches(b)) return clientHierarchyManagers[a];
	return new ClientHierarchyManager(b, c)
}
var ClientHierarchyManager;

function EnterIPEAndDoAction(a, d) {
	if (ListModule.Settings.SupportsInPlaceEdit)
		if (a.AllowGridMode) {
			var c = GetSPGanttFromCtx(a);
			if (c != null) d(c);
			else {
				var b = g_SPGridInitInfo[a.view];
				b.fnCallback = function (a) {
					d(a);
					b.fnCallback = null
				};
				EnsureScriptParams("inplview", "InitGridFromView", a.view, false)
			}
		}
}

function IndentItems(a) {
	EnterIPEAndDoAction(a, function (a) {
		a.IndentItems(a.get_SelectedItems())
	})
}

function OutdentItems(a) {
	EnterIPEAndDoAction(a, function (a) {
		a.OutdentItems(a.get_SelectedItems())
	})
}

function InsertProvisionalItem(a) {
	EnterIPEAndDoAction(a, function (a) {
		a.InsertProvisionalItemBeforeFocusedItem()
	})
}

function MoveItemsUp(a) {
	EnterIPEAndDoAction(a, function (a) {
		a.MoveItemsUp(a.get_ContiguousSelectedItemsWithoutEntryItems())
	})
}

function MoveItemsDown(a) {
	EnterIPEAndDoAction(a, function (a) {
		a.MoveItemsDown(a.get_ContiguousSelectedItemsWithoutEntryItems())
	})
}

function CreateSubItem(b, a) {
	EnterIPEAndDoAction(b, function (b) {
		b.CreateSubItem(a)
	})
}
var SPClientRenderer;

function CallFunctionWithErrorHandling(c, b, d, a) {
	if (SPClientRenderer.IsDebugMode(b)) return c();
	try {
		return c()
	} catch (f) {
		if (b.Errors == null) b.Errors = [];
		try {
			f.ExecutionContext = a;
			if (Boolean(SPClientRenderer.AddCallStackInfoToErrors) && typeof a == "object" && null != a)
				if (typeof ULSGetCallstack == "function") a.CallStack = ULSGetCallstack(CallFunctionWithErrorHandling.caller)
		} catch (e) {}
		b.Errors.push(f);
		return d
	}
}

function CoreRender(b, a) {
	var c = {
			TemplateFunction: b,
			Operation: "CoreRender"
		},
		d = function () {
			return CoreRenderWorker(b, a)
		};
	return CallFunctionWithErrorHandling(d, a, "", c)
}

function CoreRenderWorker(b, c) {
	var a;
	if (typeof b == "string") a = SPClientRenderer.ParseTemplateString(b, c);
	else if (typeof b == "function") a = b;
	return a == null ? "" : a(c)
}

function GetViewHash(a) {
	return Nav.ajaxNavigate.getParam("InplviewHash" + a.view.toLowerCase().substring(1, a.view.length - 1))
}

function RenderAsyncDataLoad() {
	return '<div style="padding-top:5px;"><center><img src="' + ListView.ImageBasePath + '/_layouts/15/images/gears_an.gif" style="border-width:0px;" /></center></div>'
}

function RenderCallbackFailures(a, b, c) {
	if (!Boolean(a)) return;
	if (c != 601) return;
	if (a.Errors == null) a.Errors = [];
	a.Errors.push(b);
	SPClientRenderer.Render(document.getElementById("script" + a.wpq), a)
}

function AsyncDataLoadPostRender(a) {
	if (ListModule.Settings.SupportsAsyncDataLoad) {
		window.asyncCallback = function () {
			ExecuteOrDelayUntilScriptLoaded(function () {
				typeof EnsureCLVP == "function" && Boolean(a.view) && EnsureCLVP(a);
				var b = a.clvp.PagingString(a.hasRootFolder ? "RootFolder" : null);
				a.queryString = "?" + (b != null ? b : "");
				a.onRefreshFailed = RenderCallbackFailures;
				a.loadingAsyncData = true;
				var c = {
					currentCtx: a,
					csrAjaxRefresh: true
				};
				typeof inplview != "undefined" && typeof inplview.HandleRefreshView == "function" && inplview.HandleRefreshView(c)
			}, "inplview.js")
		};
		if (typeof g_mdsReady != "undefined" && Boolean(g_mdsReady) && typeof g_MDSPageLoaded != "undefined" && !Boolean(g_MDSPageLoaded)) _spBodyOnLoadFunctionNames.push("asyncCallback");
		else asyncCallback()
	}
}

function AddPostRenderCallback(b, a) {
	AddRenderCallback(b, "OnPostRender", a, false)
}

function AddPostRenderCallbackUnique(b, a) {
	AddRenderCallback(b, "OnPostRender", a, true)
}

function AddRenderCallback(d, c, b, g) {
	if (Boolean(d) && typeof b == "function" && c != "") {
		var a = d[c];
		if (a == null) d[c] = b;
		else if (typeof a == "function") {
			if (!Boolean(g) || String(a) != String(b)) {
				var e = [];
				e.push(a);
				e.push(b);
				d[c] = e
			}
		} else if (typeof a == "object") {
			var h = false;
			if (Boolean(g))
				for (var f = 0; f < a.length; f++)
					if (a[f] == b) {
						h = true;
						break
					}!h && d[c].push(b)
		}
	}
}

function InsertNodeAfter(a, b) {
	if (a == null || a.parentNode == null || b == null) return;
	var d = a.parentNode,
		c = a.nextSibling;
	if (c == null) d.appendChild(b);
	else d.insertBefore(b, c)
}

function GetRelativeDateTimeString(h) {
	var c = null,
		d = null,
		e = h.split("|"),
		a = Boolean(window.ListView) && Boolean(window.ListView.Strings) ? window.ListView.Strings : Strings.STS;
	if (e[0] == "0") return h.substring(2);
	var b = e[1] == "1",
		i = e[2],
		f = e.length >= 4 ? e[3] : null,
		g = e.length >= 5 ? e[4] : null;
	switch (i) {
		case "1":
			c = b ? a.L_RelativeDateTime_AFewSecondsFuture : a.L_RelativeDateTime_AFewSeconds;
			break;
		case "2":
			c = b ? a.L_RelativeDateTime_AboutAMinuteFuture : a.L_RelativeDateTime_AboutAMinute;
			break;
		case "3":
			d = GetLocalizedCountValue(b ? a.L_RelativeDateTime_XMinutesFuture : a.L_RelativeDateTime_XMinutes, b ? a.L_RelativeDateTime_XMinutesFutureIntervals : a.L_RelativeDateTime_XMinutesIntervals, Number(f));
			break;
		case "4":
			c = b ? a.L_RelativeDateTime_AboutAnHourFuture : a.L_RelativeDateTime_AboutAnHour;
			break;
		case "5":
			if (f == null) c = b ? a.L_RelativeDateTime_Tomorrow : a.L_RelativeDateTime_Yesterday;
			else d = b ? a.L_RelativeDateTime_TomorrowAndTime : a.L_RelativeDateTime_YesterdayAndTime;
			break;
		case "6":
			d = GetLocalizedCountValue(b ? a.L_RelativeDateTime_XHoursFuture : a.L_RelativeDateTime_XHours, b ? a.L_RelativeDateTime_XHoursFutureIntervals : a.L_RelativeDateTime_XHoursIntervals, Number(f));
			break;
		case "7":
			if (g == null) c = f;
			else d = a.L_RelativeDateTime_DayAndTime;
			break;
		case "8":
			d = GetLocalizedCountValue(b ? a.L_RelativeDateTime_XDaysFuture : a.L_RelativeDateTime_XDays, b ? a.L_RelativeDateTime_XDaysFutureIntervals : a.L_RelativeDateTime_XDaysIntervals, Number(f));
			break;
		case "9":
			c = a.L_RelativeDateTime_Today
	}
	if (d != null) {
		c = d.replace("{0}", f);
		if (g != null) c = c.replace("{1}", g)
	}
	return c
}

function GetLocalizedCountValue(m, l, e) {
	if (m == undefined || l == undefined || e == undefined) return null;
	var o = "",
		a = -1,
		h = [];
	Array.addRange(h, l.split("||"));
	for (var d = 0, s = h.length; d < s; d++) {
		var i = h[d];
		if (i == null || i == "") continue;
		var g = [];
		Array.addRange(g, i.split(","));
		for (var k = 0, r = g.length; k < r; k++) {
			var b = g[k];
			if (b == null || b == "") continue;
			if (isNaN(Number(b))) {
				if (b.indexOf("-") != -1) {
					var c = b.split("-");
					if (c == null || c.length !== 2) continue;
					var j, n;
					if (c[0] === "") j = 0;
					else if (isNaN(Number(c[0]))) continue;
					else j = parseInt(c[0]);
					if (e >= j) {
						if (c[1] === "") {
							a = d;
							break
						} else if (isNaN(Number(c[1]))) continue;
						else n = parseInt(c[1]);
						if (e <= n) {
							a = d;
							break
						}
					}
				} else if (b.indexOf("*") != -1) {
					var q = b.trim().replace(/\*/g, "[0-9]*"),
						t = new RegExp("^" + q + "$");
					if (t.test(e.toString())) {
						a = d;
						break
					}
				}
			} else {
				var p = parseInt(b);
				if (e === p) {
					a = d;
					break
				}
			}
		}
		if (a !== -1) break
	}
	if (a !== -1) {
		var f = m.split("||");
		if (f != null && f[a] != null && f[a] != "") o = f[a]
	}
	return o
}

function GetDaysAfterToday(d) {
	if (Boolean(window._spRegionalSettings)) {
		if (!("currentDateInLocalCalendar" in window._spRegionalSettings)) return 0;
		var a = window._spRegionalSettings.currentDateInLocalCalendar;
		if (a == null) return 0;
		var b = new Date(a.getFullYear(), a.getMonth(), a.getDate()),
			e = d.getTime(),
			f = b.getTime(),
			c = e - f;
		return Math.floor(c / 864e5)
	}
	return 0
}

function ShouldCallSuiteExtensionControlFactory(a) {
	return typeof a.allowedSuiteExtensionFileTypes != "undefined" && IE8Support.arrayIndexOf(a.allowedSuiteExtensionFileTypes, a.CurrentItem.File_x0020_Type, 0) > -1 || !Boolean(a.CurrentItem["File_x0020_Type.mapapp"]) && !Boolean(a.CurrentItem["serverurl.progid"]) ? true : false
}
var g_QCB_nextId;

function QCB(a) {
	var b = null,
		f = "QCB" + String(g_QCB_nextId++),
		e = false,
		c = new Renderer;
	c.SetTemplate("root", '{%version 2.0}<div class="ms-qcb-root" id="{=id}"><ul class="ms-qcb-zone ms-qcb-leftzone">\n                {%foreach item left}\n            </ul><ul class="ms-qcb-zone ms-qcb-rightzone">\n                {%foreach item right}\n            </ul><hr class="ms-qcb-clearSeparator" /></div>');
	c.SetTemplate("item", '{%version 2.0}<li class="ms-qcb-item"><button class="ms-qcb-button {=buttonClass}" onclick="{+itemClick .}" disabled="disabled" type="button" title="{=disabledTooltip}" id="{=id}" role="button" aira-expanded="false"><span class="ms-qcb-glyph {=glyphClass}">{=glyph}</span>{=title}<span class="ms-qcb-glyph {=rightGlyphClass}">{=rightGlyph}</span></button></li>');
	this.Poll = function () {
		if (e) return;
		e = true;
		b = document.getElementById(f);
		if (!Boolean(b)) {
			typeof a.onDestroyed == "function" && a.onDestroyed();
			return
		}
		var c = this;
		d(a, function (a) {
			var d = !a.shouldEnable({
				id: a.id
			});
			if (a.disabled !== d) {
				a.disabled = !a.disabled;
				var b = document.getElementById(a.id);
				if (!Boolean(b)) {
					c._logError("QCB_ButtonElementNotFoundDuringPolling", "Could not find button with ID: '" + a.id + "' to set disabled state on. Button title: '" + a.title);
					return
				}
				g(b, a)
			}
		});
		e = false
	};
	this.Render = function (e) {
		if (b !== null) {
			b.parentNode.removeChild(b);
			b = null
		}
		e.innerHTML = c.Render("root", a);
		b = e.firstChild;
		var f = this;
		d(a, function (a) {
			if (Boolean(a.accessKey)) {
				var b = document.getElementById(a.id);
				if (!Boolean(b)) {
					f._logError("QCB_ButtonNotFoundDuringRender", "Could not find button with ID: '" + a.id + "' to apply an access key to. Button title: '" + a.title);
					return
				}
				b.setAttribute("accesskey", a.accessKey);
				g(b, a)
			}
		});
		this.Poll()
	};
	this._logError = function (c, b) {
		if (Boolean(a.onError)) a.onError(c, b)
	};

	function d(d, f) {
		var a = d.left,
			c = false;
		while (true) {
			for (var b = 0; b < a.length; b++) {
				var e = a[b];
				f(e)
			}
			if (c) break;
			a = d.right;
			c = true
		}
	}
	c.RegisterHandler("itemClick", function (b, a) {
		a.onClick.call(this, b)
	});
	h(a);

	function h(a) {
		a.id = f;
		if (!Boolean(a.left)) a.left = [];
		if (!Boolean(a.right)) a.right = [];
		var b = 1;
		d(a, function (c) {
			c.disabled = true;
			c.id = f + "_Button" + String(b++);
			if (!Boolean(c.buttonClass)) c.buttonClass = "";
			if (Boolean(a.buttonClass)) {
				if (c.buttonClass != "") c.buttonClass += " ";
				c.buttonClass += a.buttonClass
			}
			if (!Boolean(c.disabledTooltip)) c.disabledTooltip = c.tooltip
		})
	}

	function g(c, f) {
		var e = c.getElementsByTagName("span"),
			d, b;
		if (f.disabled) {
			c.setAttribute("disabled", "disabled");
			c.setAttribute("title", f.disabledTooltip);
			if (Boolean(a.disabledClass)) {
				CSSUtil.AddClass(c, a.disabledClass);
				for (b = 0, d = e.length; b < d; b++) CSSUtil.AddClass(e[b], a.disabledClass)
			}
		} else {
			c.removeAttribute("disabled");
			c.setAttribute("title", f.tooltip);
			if (Boolean(a.disabledClass)) {
				CSSUtil.RemoveClass(c, a.disabledClass);
				for (b = 0, d = e.length; b < d; b++) CSSUtil.RemoveClass(e[b], a.disabledClass)
			}
		}
	}
}

function IsFileExtensionControlsSupported() {
	return !BrowserDetection.userAgent.ie8down && ListModule.Settings.SupportsFileExtensionControls ? true : false
}

function IsFileHandlerForAllNonOfficeFilesSupported() {
	return !BrowserDetection.userAgent.ie8down && ListModule.Settings.SupportsFileHandlerForAllNonOfficeFiles ? true : false
}

function IsFileExtensionDataPipeSupported() {
	return ListModule.Settings.SupportsFileExtensionDataPipe ? true : false
}

function IsFileHandlerAddInPickerSupported() {
	return ListModule.Settings.SupportsFileHandlerAddInPicker ? true : false
}

function IsFileHandlerFileCreationSupported() {
	return ListModule.Settings.SupportsFileHandlerFileCreation ? true : false
}

function IsTouchSupported() {
	return window.navigator.msMaxTouchPoints != null && window.navigator.msMaxTouchPoints > 0 || document.documentElement != null && "ontouchstart" in document.documentElement
}

function IsInfiniteScrollSupported(a) {
	return Boolean(a) && a.BaseViewID == 51 && !a.inGridMode && ListModule.Settings.SupportsInfiniteScroll && (a.ListTemplateType == 700 || Boolean(a.RealSiteTemplateId) && a.RealSiteTemplateId == 21) && !BrowserDetection.userAgent.ie8down && !(Boolean(a.ListSchema) && ListModule.Util.isDefinedAndNotNullOrEmpty(a.ListSchema.group1))
}

function SupportAjaxFolderNav(a) {
	return Boolean(a) && !a.inGridMode && (Flighting.VariantConfiguration.IsExpFeatureClientEnabled(168) && a.ListTemplateType == 700 && a.BaseViewID == 51 || Flighting.VariantConfiguration.IsExpFeatureClientEnabled(424) && window.groupContextData != null && a.ListTemplateType == 101 && a.BaseViewID == 1)
}

function RenderListView(a, i, b, p, j) {
	InitListViewFlightSettings();
	if (Boolean(a)) {
		if (Flighting.VariantConfiguration.IsExpFeatureClientEnabled(192) && a.bInitialRender) {
			var g = window.applicationCache;
			Boolean(g) && g.UNCACHED != g.status && WriteStartDiagnostic("ListRendered_FromAppCacheStart")
		}
		if (typeof standaloneCtx != "undefined") standaloneCtx = a;
		typeof SaveCurrentContextInfo == "function" && Boolean(a.SiteTemplateId) && SaveCurrentContextInfo(a);
		a.ListDataJSONItemsKey = "Row";
		a.ControlMode = SPClientTemplates.ClientControlMode.View;
		SPClientTemplates.Utility.GetPropertiesFromPageContextInfo(a);
		if (!Boolean(a.bIncremental)) a.Templates = SPClientTemplates.TemplateManager.GetTemplates(a);
		a.canDragUpload = CanDragUploadFile(a);
		LoadListContextData(a);
		if (a.Templates.Body == RenderGroupTemplateDefault) a.Templates.Body = RenderBodyTemplate;
		if (a.Templates.Header == "") a.Templates.Header = RenderHeaderTemplate;
		var c = a.Templates.Footer,
			l = a.Templates.Body,
			k = a.Templates.Header,
			m = a.Templates.View,
			d = function () {
				ListModule.Settings.SupportsDragDrop && SetupDragDrop(a)
			};
		AddPostRenderCallbackUnique(a, d);
		var h = a.OnPostRender,
			q = a.OnPreRender;
		a.OnPostRender = null;
		if (Boolean(a.ListSchema) && a.ListSchema.IsDocLib) {
			EnableSharingDialogIfNeeded(a);
			DisplayExplorerWindowIfNeeded(a)
		}
		Boolean(a.ListSchema) && a.ListSchema.IsDocLib && EnablePolicyTipDialogIfNeeded(a);
		typeof EnableHeroButton == "function" && EnableHeroButton(a);
		ListModule.Settings.SupportsAddToOneDrive && Number(a.ListTemplateType) == 700 && Number(a.BaseViewID) == 51 && EnableCreateMountPointIfNeeded(a);
		a.Templates.Footer = "";
		if (Boolean(a.bInitialRender) && Boolean(a.AsyncDataLoad)) {
			a.OnPreRender = null;
			a.Templates.View = RenderAsyncDataLoad;
			a.Templates.Header = "";
			a.Templates.Body = "";
			a.Templates.Footer = "";
			a.OnPostRender = null;
			if (!Boolean(GetViewHash(a))) a.OnPostRender = AsyncDataLoadPostRender
		} else if (Boolean(a.bInitialRender) && Boolean(GetViewHash(a))) a.Templates.Body = "";
		if (b != null) {
			a.Templates.Header = "";
			if (p) {
				if (!Boolean(a.bNoDelete)) {
					var e = b.nextSibling;
					while (e != null && e.nextSibling != null) b.parentNode.removeChild(e.nextSibling)
				}
				var n = a.fHidden;
				a.fHidden = true;
				SPClientRenderer.Render(b, a);
				a.fHidden = n
			} else {
				if (!Boolean(a.bNoDelete)) {
					while (b.nextSibling != null) b.parentNode.removeChild(b.nextSibling);
					var f = b.lastChild;
					while (f != null) {
						b.removeChild(f);
						f = b.lastChild
					}
				}
				SPClientRenderer.Render(b, a)
			}
		} else {
			if (ListModule.Settings.SupportsTaskListEditMode) {
				RenderProjectTaskListEditMode(a, d);
				RenderGroupListEditMode(a, d)
			}
			SPClientRenderer.Render(document.getElementById("script" + i), a)
		}
		if (!Boolean(a.bInitialRender) || !Boolean(a.AsyncDataLoad)) {
			a.Templates.Body = "";
			a.Templates.Header = "";
			if (c == "") a.Templates.Footer = RenderFooterTemplate;
			else a.Templates.Footer = c;
			a.OnPreRender = null;
			a.OnPostRender = h;
			var o = a.fHidden;
			a.fHidden = Boolean(j);
			SPClientRenderer.Render(document.getElementById("scriptPaging" + i), a);
			a.fHidden = o
		}
		a.Templates.View = m;
		a.Templates.Body = l;
		a.Templates.Header = k;
		a.Templates.Footer = c;
		a.OnPreRender = q;
		a.OnPostRender = h;
		(a.bInitialRender || Boolean(a.startTime)) && WriteListViewSuccessLog(a);
		typeof EnsureCLVP == "function" && Boolean(a.view) && EnsureCLVP(a)
	}
}
var SPClientTemplates;

function SPTemplateManagerResolveTypeInfo(a) {
	if (a != null) {
		this.defaultViewStyle = typeof a.ViewStyle == "undefined";
		this.viewStyle = this.defaultViewStyle ? "null" : a.ViewStyle.toString();
		this.allLists = typeof a.ListTemplateType == "undefined";
		this.ltype = this.allLists ? "null" : a.ListTemplateType.toString();
		this.allViews = typeof a.BaseViewID == "undefined";
		this.viewId = this.allViews ? "null" : a.BaseViewID.toString()
	}
}

function SPTemplateManagerResolveTypeInfo_InitializePrototype() {
	SPTemplateManagerResolveTypeInfo.prototype = {
		defaultViewStyle: true,
		viewStyle: "",
		allLists: true,
		ltype: "",
		allViews: true,
		viewId: ""
	}
}

function SPTemplateManagerRegisterTypeInfo(a) {
	if (a != null) {
		this.defaultViewStyle = typeof a.ViewStyle == "undefined";
		this.allLists = typeof a.ListTemplateType == "undefined";
		this.allViews = typeof a.BaseViewID == "undefined";
		if (!this.allLists)
			if (typeof a.ListTemplateType == "string" || typeof a.ListTemplateType == "number") this.ltype = [a.ListTemplateType.toString()];
			else this.ltype = a.ListTemplateType;
		if (!this.allViews)
			if (typeof a.BaseViewID == "string" || typeof a.BaseViewID == "number") this.viewId = [a.BaseViewID.toString()];
			else this.viewId = a.BaseViewID;
		if (!this.defaultViewStyle)
			if (typeof a.ViewStyle == "string" || typeof a.ViewStyle == "number") this.viewStyle = [a.ViewStyle.toString()];
			else this.viewStyle = a.ViewStyle
	}
}

function SPTemplateManagerRegisterTypeInfo_InitializePrototype() {
	SPTemplateManagerRegisterTypeInfo.prototype = {
		defaultViewStyle: true,
		viewStyle: [],
		allLists: true,
		ltype: [],
		allViews: true,
		viewId: []
	}
}

function IsCSRReadOnlyTabularView(a) {
	return a != null && a.ListSchema != null && a.ListSchema.TabularView == "1" && a.inGridMode != true
}

function SPClientFormUserValue() {}

function SPClientFormUserValue_InitializePrototype() {
	SPClientFormUserValue.prototype.lookupId = "-1";
	SPClientFormUserValue.prototype.lookupValue = "";
	SPClientFormUserValue.prototype.displayStr = "";
	SPClientFormUserValue.prototype.email = "";
	SPClientFormUserValue.prototype.sip = "";
	SPClientFormUserValue.prototype.title = "";
	SPClientFormUserValue.prototype.picture = "";
	SPClientFormUserValue.prototype.department = "";
	SPClientFormUserValue.prototype.jobTitle = "";
	SPClientFormUserValue.prototype.initFromUserString = function (d) {
		if (d != null && d != "") {
			var c = d.split(SPClientTemplates.Utility.UserLookupDelimitString);
			if (c.length != 2) return;
			this.lookupId = c[0];
			var e = c[1],
				a = e.split(SPClientTemplates.Utility.UserMultiValueDelimitString),
				b = a.length;
			if (b == 1) this.title = this.displayStr = this.lookupValue = a[0];
			else if (b >= 5) {
				this.lookupValue = a[0] == null ? "" : a[0];
				this.displayStr = a[1] == null ? "" : a[1];
				this.email = a[2] == null ? "" : a[2];
				this.sip = a[3] == null ? "" : a[3];
				this.title = a[4] == null ? "" : a[4];
				if (b >= 6) {
					this.picture = a[5] == null ? "" : a[5];
					if (b >= 7) {
						this.department = a[6] == null ? "" : a[6];
						if (b >= 8) this.jobTitle = a[7] == null ? "" : a[7]
					}
				}
			}
		}
	};
	SPClientFormUserValue.prototype.toString = function () {
		var c = SPClientTemplates.Utility.UserLookupDelimitString,
			b = SPClientTemplates.Utility.UserMultiValueDelimitString,
			a = this.lookupId;
		a += c;
		a += this.lookupValue;
		a += b;
		a += this.displayStr;
		a += b;
		a += this.email;
		a += b;
		a += this.sip;
		a += b;
		a += this.title;
		a += b;
		a += this.picture;
		a += b;
		a += this.department;
		a += b;
		a += this.jobTitle;
		return a
	}
}

function RenderViewTemplate(a) {
	var b = a.RenderHeader(a);
	b += a.RenderBody(a);
	b += a.RenderFooter(a);
	return b
}

function RenderFieldValueDefault(a) {
	return a != null && a.CurrentFieldValue != null ? a.CurrentFieldValue.toString() : ""
}
var RenderBodyTemplate;

function SuiteExtensionsDataRetrieval(f, g, c) {
	var a = new XMLHttpRequest,
		b = new Error;
	if (a == null) {
		WriteDebugLog("FileHandler_XmlHttpRequestObjectNull", true, "XmlHttpRequest object is null");
		return
	}
	a.onreadystatechange = function () {
		if (a.readyState == 4)
			if (a.status == 200) {
				var d = JSON.parse(a.responseText);
				WriteDebugLog("FileHandler_SuccessAzureDataPipe", false, "Successfully fetched add-in data from Azure, will try to set local storage now");
				WriteSuccess("FileHandler_SuccessAzureDataPipe");
				g(f, d.value)
			} else {
				WriteDebugLog("FileHandler_AzureDataPipe", true, "Correlation id is " + a.getResponseHeader("SPRequestGuid"));
				if (a.status == 503 || a.status == 500) {
					WriteDebugLog("FileHandler_AzureDataPipeStatus" + a.status.toString(), true, "Failed to fetch add-in data, xmlhttp status is " + a.status.toString());
					WriteFailure("FileHandler_AzureDataPipeStatus" + a.status.toString());
					b.message = "Failed to fetch add-in data, xmlhttp status is " + a.status.toString() + ", xmlhttp responsetext is " + a.responseText;
					c(b)
				} else {
					WriteFailure("FileHandler_FailedAzureDataPipe");
					b.message = "Failed to fetch add-in data, looks like an unknown failure, xmlhttp status is " + a.status.toString() + ", xmlhttp responsetext is " + a.responseText;
					c(b)
				}
			}
	};
	var e = _spPageContextInfo.webAbsoluteUrl != null || _spPageContextInfo.webAbsoluteUrl != "undefined" ? _spPageContextInfo.webAbsoluteUrl : ListModule.Util.getHostUrl(window.location.href),
		d = e + "/_api/apps/GetByType('" + f + "')";
	a.open("GET", d, true);
	a.setRequestHeader("Accept", "application/json;odata=nometadata");
	WriteDebugLog("FileHandler_StartAzureDataPipe", false, "Trying to fetch add-in data from Azure, webAbsoluteUrl is - " + e + ", fileHandlerEndPoint is - " + d);
	WriteStart("FileHandler_StartAzureDataPipe");
	try {
		a.send("")
	} catch (h) {
		WriteDebugLog("FileHandler_AzureDataPipe", true, "Correlation id is " + a.getResponseHeader("SPRequestGuid"));
		WriteFailure("FileHandler_FailedAzureDataPipe");
		c(h)
	}
}

function InitializeSuiteExtensions(a) {
	if (typeof SuiteExtensions == "object" && typeof SuiteExtensions.HostConfig == "function" && typeof SuiteExtensions.SuiteExtensionsDataStore == "function" && typeof SuiteExtensions.SuiteExtensionsDataStore.Initialize == "function") InitializingSuiteExtensions(a);
	else EnsureScriptFunc("online/scripts/SuiteExtensions.js", "InitializeSuiteExtensionsJsFile", function () {
		InitializingSuiteExtensions(a)
	})
}

function InitializingSuiteExtensions(b) {
	var c = "";
	if (typeof _spPageContextInfo !== "undefined") c = _spPageContextInfo.userId;
	var a = new SuiteExtensions.HostConfig(c, SuiteExtensionsDataRetrieval);
	a.host = "SharePoint";
	a.set_logging(null);
	a.cultureName = b.CurrentCultureName;
	a.resourceId = b.HttpRoot;
	a.localizedStringsPath = "/_layouts/15/" + b.ListSchema.LCID + "/CloudApps/cloudapps_strings.js";
	IsFileExtensionDataPipeSupported() && a.addFlight(SuiteExtensions.AddInsFlights.AzureDataPipe);
	IsFileHandlerAddInPickerSupported() && a.addFlight(SuiteExtensions.AddInsFlights.FileHandlerAddInPicker);
	IsFileHandlerFileCreationSupported() && a.addFlight(SuiteExtensions.AddInsFlights.FileHandlerFileCreation);
	SuiteExtensions.SuiteExtensionsDataStore.Initialize(a)
}

function RenderGroupTemplateDefault(a) {
	return a != null && typeof a.RenderGroups == "function" ? a.RenderGroups(a) : ""
}

function RenderItemTemplateDefault(a) {
	return a != null && typeof a.RenderItems == "function" ? a.RenderItems(a) : ""
}

function RenderFieldTemplateDefault(a) {
	return a != null && typeof a.RenderFields == "function" ? a.RenderFields(a) : ""
}

function RenderAggregate(g, i, h, l, k, n, m) {
	var a = "";
	if (i == null) {
		a += '<tbody id="aggr';
		a += g.wpq;
		a += '">'
	} else {
		a = '<tbody id="aggr';
		a += i;
		a += '_"';
		if (!n) a += ' style="display:none"';
		a += ">"
	}
	a += '<tr id="agg';
	a += g.wpq;
	a += '"><td/>';
	var c = "";
	if (k == 1) c = ".agg";
	else if (k == 2) c = ".agg2";
	var j = l.Field;
	for (var o in j) {
		var b = j[o];
		if (b.GroupField != null) break;
		a += '<td class="ms-vb2">';
		var f = m[b.Name];
		if (f != null && f != "") {
			a += "<nobr><b>";
			var e, d;
			if (f == "COUNT") {
				e = window.ListView.Strings.L_SPCount;
				d = b.Name + ".COUNT" + c
			}
			if (f == "SUM") {
				e = window.ListView.Strings.L_SPSum;
				d = b.Name + ".SUM" + c
			} else if (f == "AVG") {
				e = window.ListView.Strings.L_SPAvg;
				d = b.Name + ".AVG" + c
			} else if (f == "MAX") {
				e = window.ListView.Strings.L_SPMax;
				d = b.Name + ".MAX" + c
			} else if (f == "MIN") {
				e = window.ListView.Strings.L_SPMin;
				d = b.Name + ".MIN" + c
			} else if (f == "STDEV") {
				e = window.ListView.Strings.L_SPStdev;
				d = b.Name + ".STDEV" + c
			} else if (f == "VAR") {
				e = window.ListView.Strings.L_SPVar;
				d = b.Name + ".VAR" + c
			} else {
				e = window.ListView.Strings.L_SPCount;
				d = b.Name + ".COUNT" + c
			}
			a += e;
			a += "=&nbsp;";
			a += Boolean(h) ? h[d] : "0";
			a += "</b></nobr>"
		}
		a += "</td>";
		if (IsCSRReadOnlyTabularView(g) && (b.CalloutMenu == "TRUE" || b.listItemMenu == "TRUE")) a += "<td></td>"
	}
	a += "</tr></tbody>";
	return a
}

function RenderGroupTemplate(c, d, i, b, h, j, f) {
	c.CurrentItem = b;
	var q = c.ctxId,
		a = '<tbody id="titl';
	a += i;
	a += '" groupString="';
	a += b[d + ".urlencoded"];
	a += '"';
	if (j == 2 && !f) a += ' style="display:none"';
	a += '><tr><td colspan="100" nowrap="nowrap" class="ms-gb';
	if (j == 2) a += "2";
	a += '">';
	if (j == 2) a += "<img src=" + ListView.ImageBasePath + '"/_layouts/15/images/blank.gif?rev=44" alt="" height="1" width="10">';
	a += '<a href="javascript:" onclick="javascript:ExpCollGroup(';
	a += "'";
	a += i;
	a += "', 'img_";
	a += i;
	a += "',event, false);return false;";
	a += '">';
	var l = null,
		m = null;
	if (DOM.rightToLeft) {
		l = f ? "ms-commentcollapsertl-iconouter" : "ms-commentexpandrtl-iconouter";
		m = f ? "ms-commentcollapsertl-icon" : "ms-commentexpandrtl-icon"
	} else {
		l = f ? "ms-commentcollapse-iconouter" : "ms-commentexpand-iconouter";
		m = f ? "ms-commentcollapse-icon" : "ms-commentexpand-icon"
	}
	var p = f ? window.ListView.Strings.L_SPCollapse : window.ListView.Strings.L_SPExpand;
	a += '<span class="';
	a += l;
	a += '"><img class="';
	a += m;
	a += '" src="';
	a += GetThemedImageUrl("spcommon.png");
	a += '" alt="';
	a += p;
	a += '" id="img_';
	a += i;
	a += '" /></span>';
	for (var n = d, e, k = 0; k < h.Field.length; k++) {
		var g = h.Field[k];
		if (g.Name == d) {
			n = g.DisplayName;
			e = g;
			break
		}
	}
	a += Encoding.HtmlEncode(n);
	a += "</a> : ";
	if (e != null)
		if (e.Type == "Number" || e.Type == "Currency") a += b[g.Name];
		else if (e.Type == "DateTime" && Boolean(b[g.Name + ".groupdisp"])) a += b[g.Name + ".groupdisp"];
	else if (e.Type == "User" || e.Type == "UserMulti") a += b[g.Name + ".span"];
	else {
		c.CurrentItemIdx = k;
		b[d + ".groupHeader"] = true;
		a += spMgr.RenderFieldByName(c, d, b, h);
		delete b[d + ".groupHeader"];
		c.CurrentItemIdx = -1
	}
	a += ' <span style="font-weight: lighter; display: inline-block;">(';
	a += j == 2 ? b[d + ".COUNT.group2"] : b[d + ".COUNT.group"];
	a += ")</span></td></tr></tbody>";
	var o = h.Aggregate;
	if (o != null && !c.inGridMode) a += RenderAggregate(c, i, b, h, j, f, o);
	c.CurrentItem = null;
	return a
}

function RenderGroup(a, b) {
	return RenderGroupEx(a, b, false)
}

function RenderGroupEx(b, c, k) {
	var d = b.ListSchema,
		g = d.group1,
		f = d.group2,
		i = d.Collapse == null || d.Collapse != "TRUE",
		e = b.ctxId,
		l = typeof ctx != "undefined" ? ctx : b,
		j = Boolean(l.ExternalDataList),
		h = "",
		a = b.Templates.Group;
	if (a == null || a == RenderItemTemplateDefault || typeof a != "function" && typeof a != "string") a = RenderGroupTemplate;
	else if (typeof a == "string") a = SPClientRenderer.ParseTemplateString(a, b);
	e += "-";
	e += c[g + ".groupindex"];
	if (c[g + ".newgroup"] == "1") h += a(b, g, e, c, d, 1, i);
	if (c[g + ".newgroup"] == "1" || f != null && c[f + ".newgroup"] == "1") {
		if (f != null && !k) {
			e += c[f + ".groupindex2"];
			h += a(b, f, e, c, d, 2, i)
		}
		h += AddGroupBody(e, i, j)
	}
	return h
}

function AddGroupBody(d, c, b) {
	var a = '<tbody id="tbod';
	a += d;
	a += '_"';
	if (!c && b) a += ' style="display: none;"';
	a += ' isLoaded="';
	if (c || b) a += "true";
	else a += "false";
	a += '"/>';
	return a
}

function GenerateIID(a) {
	return GenerateIIDForListItem(a, a.CurrentItem)
}

function GenerateIIDForListItem(b, a) {
	return b.ctxId + "," + a.ID + "," + a.FSObjType
}

function GetCSSClassForFieldTd(b, a) {
	var c = b.ListSchema;
	return a.CalloutMenu == "TRUE" || b.inGridMode && (a.ClassInfo == "Menu" || a.listItemMenu == "TRUE") ? "ms-cellstyle ms-vb-title" : a.ClassInfo == "Menu" || a.listItemMenu == "TRUE" ? "ms-cellstyle ms-vb-title ms-positionRelative" : a.ClassInfo == "Icon" ? "ms-cellstyle ms-vb-icon" : (a.Type == "User" || a.Type == "UserMulti") && c.EffectivePresenceEnabled ? "ms-cellstyle ms-vb-user" : "ms-cellstyle ms-vb2"
}

function DoesListUseCallout(b) {
	for (var a = 0; a < b.ListSchema.Field.length; a++) {
		var c = b.ListSchema.Field[a];
		if (c.CalloutMenu != null && c.CalloutMenu.toLowerCase() == "true") return true
	}
	return false
}

function ShowCallOutOrECBWrapper(d, c, e) {
	if (!ListModule.Settings.SupportsCallouts) return false;
	var a = true;
	if (e) {
		WriteEngagementLog("DocLib_RightClick");
		var b = DOM_afterglass.GetParentLinkFromEvent(c);
		b != null && (b.tagName == "A" || b.parentNode.tagName == "A") && WriteEngagementLog("DocLib_RightClickOnAnchor");
		if (ShowCalloutMenuForTr != null) a = ShowCalloutMenuForTr(d, c, true)
	} else {
		WriteEngagementLog("List_RightClick");
		if (ShowECBMenuForTr != null) a = ShowECBMenuForTr(d, c)
	}
	return a
}
var RenderItemTemplate;

function RenderTableHeader(b) {
	var c = b.ListSchema,
		e = b.ListData,
		a = [];
	RenderHeroButton(a, b);
	if (Boolean(c.InplaceSearchEnabled) && !PageMinimized()) {
		var g = "CSRListViewControlDiv" + b.wpq;
		a.push('<div class="ms-csrlistview-controldiv" id="');
		a.push(Encoding.HtmlEncode(g));
		a.push('">')
	} else a.push("<div>");
	if (!PageMinimized()) {
		if (c.RenderViewSelectorPivotMenu == "True") a.push(RenderViewSelectorPivotMenu(b));
		else c.RenderViewSelectorPivotMenuAsync == "True" && a.push(RenderViewSelectorPivotMenuAsync(b));
		var f = b.BasePermissions.ManageLists,
			d = b.BasePermissions.ManagePersonalViews;
		if (c.RenderSaveAsNewViewButton == "True" && (f || d != null && d)) {
			a.push('<div id="CSRSaveAsNewViewDiv');
			a.push(b.wpq);
			a.push('" class="ms-InlineSearch-DivBaseline" style="visibility:hidden;padding-bottom:3px;"');
			a.push('><a class="ms-commandLink" href="#" role="alert" id="CSRSaveAsNewViewAnchor');
			a.push(b.wpq);
			a.push("\" saveViewButtonDisabled=\"false\" onclick=\"EnsureScriptParams('inplview', 'ShowSaveAsNewViewDialog', '");
			a.push(b.listName + "', '");
			a.push(b.view + "', '");
			a.push(b.wpq + "', '");
			a.push(f + "', '");
			a.push(d);
			a.push("'); return false;\" >");
			var i = window.ListView.Strings.L_SaveThisViewButton;
			a.push(i.toUpperCase());
			a.push("</a></div>")
		}
	}
	a.push("</div>");
	a.push('<iframe src="javascript:false;" id="FilterIframe');
	a.push(b.ctxId);
	a.push('" name="FilterIframe');
	a.push(b.ctxId);
	a.push('" style="display:none" height="0" width="0" FilterLink="');
	a.push(e.FilterLink);
	a.push('"></iframe>');
	a.push("<table onmousedown='return OnTableMouseDown(event);' summary=\"");
	a.push(Encoding.HtmlEncode(b.ListTitle));
	a.push('" xmlns:o="urn:schemas-microsoft-com:office:office" o:WebQuerySourceHref="');
	a.push(b.HttPath);
	a.push("&XMLDATA=1&RowLimit=0&View=");
	a.push(URI_Encoding.encodeURIComponent(c.View));
	a.push('" border="0" cellspacing="0" dir="');
	a.push(c.Direction);
	a.push('" onmouseover="EnsureSelectionHandler(event,this,');
	a.push(b.ctxId);
	a.push(')" cellpadding="1" id="');
	if (c.IsDocLib || typeof e.Row == "undefined") a.push("onetidDoclibViewTbl0");
	else {
		a.push(b.listName);
		a.push("-");
		a.push(c.View)
	}
	ListModule.Settings.SupportsDoclibAccessibility && c.IsDocLib && a.push('" aria-label="' + Encoding.HtmlEncode(window.ListView.Strings.L_DocLibTable_Alt) + '" multi-selectable="true"');
	a.push('" class="');
	if (typeof e.Row == "undefined") a.push("ms-emptyView");
	else a.push("ms-listviewtable");
	Flighting.VariantConfiguration.IsExpFeatureClientEnabled(494) && a.push(" ms-odn-defaultFont");
	var h = c.View.replace("{", "").replace("}", "");
	a.push('" view="');
	a.push(h);
	a.push('">');
	return a.join("")
}

function RenderSelectAllCbx(b, a) {
	if (a == null) a = [];
	a.push('<span class="ms-selectall-span" tabindex="0" onfocus="EnsureSelectionHandlerOnFocus(event,this,');
	a.push(b.ctxId);
	a.push(');" id="cbxSelectAllItems');
	a.push(b.ctxId);
	a.push('" title="');
	a.push(window.ListView.Strings.L_select_deselect_all);
	ListModule.Settings.SupportsDoclibAccessibility && a.push('" role="checkbox" aria-checked="false" aria-label="' + Encoding.HtmlEncode(window.ListView.Strings.L_select_deselect_all_alt));
	a.push('"><span tabindex="-1" class="ms-selectall-iconouter"><img class="ms-selectall-icon" alt="" src="');
	a.push(GetThemedImageUrl("spcommon.png"));
	a.push('"></img></span></span></span>');
	!IsInfiniteScrollSupported(b) && SPClientRenderer.AddPostRenderCallback(b, function () {
		var a = document.getElementById("cbxSelectAllItems" + b.ctxId),
			c = "ontouchstart" in document.documentElement && !IsSupportedChromeOnWin() ? "touchstart" : "click";
		$addHandler(a, c, function () {
			a.checked = !a.checked;
			if (ListModule.Settings.SupportsItemSelection) {
				WriteDocEngagementLog("Documents_SelectAllClick", "OneDrive_SelectAllClick");
				ToggleAllItems(c, a, b.ctxId)
			}
		})
	});
	return a
}
var RenderHeaderTemplate, RenderFooterTemplate;

function RenderViewSelectorMenu(c) {
	var j = Encoding.HtmlEncode(window.ListView.Strings.L_OpenMenu_Text),
		f = Encoding.HtmlEncode(c.wpq + "_LTViewSelectorMenu"),
		d = Encoding.HtmlEncode(c.wpq + "_ListTitleViewSelectorMenu"),
		k = Encoding.HtmlEncode(c.wpq + "_ListTitleViewSelectorMenu_t"),
		h = Encoding.HtmlEncode(c.wpq + "_ListTitleViewSelectorMenu_Container"),
		e = c.viewTitle;
	if (e == null || e == "") e = window.ListView.Strings.L_ViewSelectorCurrentView;
	var o = c.ListSchema.ViewSelector_ShowMergeView ? "true" : "false",
		n = c.ListSchema.ViewSelector_ShowRepairView ? "true" : "false",
		m = c.ListSchema.ViewSelector_ShowCreateView ? "true" : "false",
		p = c.ListSchema.ViewSelector_ShowEditView ? "true" : "false",
		l = c.ListSchema.ViewSelector_ShowApproveView ? "true" : "false",
		g = c.ListSchema.ViewSelector_ViewParameters;
	if (g == null) g = "";
	var b = [];
	b.push("onclick=\"try { CoreInvoke('showViewSelector', event, document.getElementById('");
	b.push(h);
	b.push("'), { showRepairView : ");
	b.push(n);
	b.push(", showMergeView : ");
	b.push(o);
	b.push(", showEditView : ");
	b.push(p);
	b.push(", showCreateView : ");
	b.push(m);
	b.push(", showApproverView : ");
	b.push(l);
	b.push(", listId: '");
	b.push(c.listName);
	b.push("', viewId: '");
	b.push(c.view);
	b.push("', viewParameters: '");
	b.push(g);
	b.push("' }); } catch (ex) { }; return false;\" ");
	var i = b.join(""),
		a = [];
	a.push('<span data-sp-cancelWPSelect="true" id="');
	a.push(h);
	a.push('" class="ms-csrlistview-viewselectormenu"><span id="');
	a.push(k);
	a.push('" class="ms-menu-althov ms-viewselector" title="');
	a.push(Encoding.HtmlEncode(window.ListView.Strings.L_ViewSelectorTitle));
	a.push('" hoveractive="ms-menu-althov-active ms-viewselectorhover" hoverinactive="ms-menu-althov ms-viewselector" ');
	a.push("foa=\"MMU_GetMenuFromClientId('");
	a.push(d);
	a.push('\')" onmouseover="MMU_PopMenuIfShowing(this); MMU_EcbTableMouseOverOut(this, true)" ');
	a.push('oncontextmenu="ClkElmt(this); return false;" ');
	a.push(i);
	a.push(">");
	a.push('<a class="ms-menu-a" id="');
	a.push(d);
	a.push('" accesskey="');
	a.push(Encoding.HtmlEncode(window.ListView.Strings.L_SelectBackColorKey_TEXT));
	a.push('" href="#" ');
	a.push(i);
	a.push('oncontextmenu="ClkElmt(this); return false;" onfocus="MMU_EcbLinkOnFocusBlur(byid(\'');
	a.push(f);
	a.push('\'), this, true);" oncontextmenu="ClkElmt(this); return false;" ');
	a.push("onkeydown=\"MMU_EcbLinkOnKeyDown(byid('");
	a.push(f);
	a.push("'), MMU_GetMenuFromClientId('");
	a.push(d);
	a.push('\'), event);" menutokenvalues="MENUCLIENTID=');
	a.push(d);
	a.push(",TEMPLATECLIENTID=");
	a.push(f);
	a.push('" serverclientid="');
	a.push(d);
	a.push('"><span class="ms-viewselector-currentView">');
	a.push(Encoding.HtmlEncode(e));
	a.push("</span></a>");
	a.push('<span style="height:');
	a.push(4);
	a.push("px;width:");
	a.push(7);
	a.push('px;position:relative;display:inline-block;overflow:hidden;" class="s4-clust ms-viewselector-arrow ms-menu-stdarw">');
	a.push('<img src="');
	a.push(ListView.ImageBasePath + "/_layouts/15/images/fgimg.png?rev=44");
	a.push('" alt="');
	a.push(j);
	a.push('" style="border-width:0px;position:absolute;left:-');
	a.push(0);
	a.push("px !important;top:-");
	a.push(262);
	a.push('px !important;" /></span>');
	a.push('<span style="height:');
	a.push(4);
	a.push("px;width:");
	a.push(7);
	a.push('px;position:relative;display:inline-block;overflow:hidden;" class="s4-clust ms-viewselector-arrow ms-menu-hovarw">');
	a.push('<img src="');
	a.push(ListView.ImageBasePath + "/_layouts/15/images/fgimg.png?rev=44");
	a.push('" alt="');
	a.push(j);
	a.push('" style="border-width:0px;position:absolute;left:-');
	a.push(0);
	a.push("px !important;top:-");
	a.push(266);
	a.push('px !important;" /></span>');
	a.push("</span></span>");
	return a.join("")
}

function RenderViewSelectorPivotMenu(renderCtx) {
	var pivotOpts = {
			PivotContainerId: renderCtx.wpq + "_ListTitleViewSelectorMenu_Container"
		},
		viewMenu = new ClientPivotControl(pivotOpts),
		allOpts = renderCtx.ListSchema.ViewSelectorPivotMenuOptions;
	if (allOpts == null || allOpts == "") return "";
	for (var viewData = eval(renderCtx.ListSchema.ViewSelectorPivotMenuOptions), idx = 0; idx < viewData.length; idx++) {
		var viewOpt = viewData[idx];
		if (viewOpt.GroupId >= 500 || viewOpt.MenuOptionType != ClientPivotControl.MenuOptionType.MenuOption) break;
		viewOpt.SelectedOption = renderCtx.viewTitle == viewOpt.DisplayText;
		viewMenu.AddMenuOption(viewOpt)
	}
	if (idx > 0) {
		if (idx < 3) viewMenu.SurfacedPivotCount = idx;
		for (; idx < viewData.length; idx++) {
			var overflowItem = viewData[idx];
			if (overflowItem.MenuOptionType == ClientPivotControl.MenuOptionType.MenuOption) {
				overflowItem.SelectedOption = renderCtx.viewTitle == overflowItem.DisplayText;
				viewMenu.AddMenuOption(overflowItem)
			} else overflowItem.MenuOptionType == ClientPivotControl.MenuOptionType.MenuSeparator && viewMenu.AddMenuSeparator()
		}
	}
	return viewMenu.RenderAsString()
}

function RenderViewSelectorPivotMenuAsync(d) {
	var e = {
			PivotContainerId: d.wpq + "_ListTitleViewSelectorMenu_Container"
		},
		b = new ClientPivotControl(e);
	b.SurfacedPivotCount = 1;
	var a = d.viewTitle;
	if (a == null || a == "") a = window.ListView.Strings.L_ViewSelectorCurrentView;
	var c = new ClientPivotControlMenuOption;
	c.DisplayText = a;
	c.OnClickAction = "return false;";
	c.SelectedOption = true;
	b.AddMenuOption(c);
	b.OverflowMenuScript = "OpenViewSelectorPivotOptions(event, '" + d.ctxId + "'); return false;";
	return b.RenderAsString()
}

function OpenViewSelectorPivotOptions(b, a) {
	ListModule.Settings.SupportsViewSelectorPivot && _OpenViewSelectorPivotOptions(b, a)
}

function RenderEmptyText(h, b) {
	if (b.inGridMode) return;
	var g = b.ListData;
	if (g.Row.length == 0) {
		var c = b.ListSchema,
			a = '<table class="',
			e = typeof b.completedSearchTerm != "undefined" && b.completedSearchTerm != null;
		a += "ms-list-emptyText-compact ms-textLarge";
		a += '" dir="';
		a += c.Direction;
		a += '" border="0">';
		a += '<tr id="empty-';
		a += b.wpq;
		a += '"><td colspan="99">';
		var f = b.ListTemplateType;
		if (e) a += window.ListView.Strings.L_NODOCSEARCH;
		else if (c.IsDocLib) {
			var d = b.viewTitle;
			if (Boolean(d)) {
				var i = window.ListView.Strings.L_NODOC;
				a += i.replace("%0", Encoding.HtmlEncode(d))
			} else a += window.ListView.Strings.L_NODOCView
		} else if (f == 160) a += window.ListView.Strings.L_AccRqEmptyView;
		else a += Encoding.HtmlEncode(c.NoListItem);
		a += "</td></tr></table>";
		h.push(a)
	}
}

function RenderSearchStatus(a, b) {
	a.push("<tr><td>" + RenderSearchStatusInner(a, b) + "</td></tr>")
}

function RenderSearchStatusInner(b, a) {
	return '<div id="inplaceSearchDiv_' + a.wpq + '_lsstatus"></div>'
}

function RenderPaging(b, d) {
	var c = d.ListData;
	if (c != null && (c.PrevHref != null || c.NextHref != null)) {
		var e = d.wpq,
			i = d.ListSchema;
		b.push('<table border="0" cellpadding="0" cellspacing="0" class="ms-bottompaging" id="bottomPaging');
		b.push(e);
		b.push('"><tr><td class="ms-vb ms-bottompagingline" id="bottomPagingCell');
		if (!i.groupRender) {
			b.push(e);
			b.push('" align="center">')
		} else b.push('">');
		var a = [],
			h = window.document.documentElement.getAttribute("dir") == "rtl";
		a.push("<table><tr>");
		if (c.PrevHref != null && !IsInfiniteScrollSupported(d)) {
			a.push('<td id="paging');
			a.push(e + "prev");
			a.push('"><a title="');
			a.push(window.ListView.Strings.L_SPClientPrevious);
			a.push('" onclick=\'RefreshPageTo(event, "');
			a.push(c.PrevHref);
			a.push("\");return false;'");
			a.push(' href="javascript:" class="ms-commandLink ms-promlink-button ms-promlink-button-enabled"><span class="ms-promlink-button-image"><img src="');
			a.push(GetThemedImageUrl("spcommon.png"));
			a.push('" border="0" class="');
			if (h) a.push("ms-promlink-button-right");
			else a.push("ms-promlink-button-left");
			a.push('" alt="');
			a.push(window.ListView.Strings.L_SPClientPrevious);
			a.push('"></a></td>')
		}
		a.push('<td class="ms-paging">');
		if (!IsInfiniteScrollSupported(d)) {
			a.push(c.FirstRow);
			a.push(" - ");
			a.push(c.LastRow)
		}
		a.push("</td>");
		if (c.NextHref != null) {
			a.push("<td ");
			IsInfiniteScrollSupported(d) && a.push("style='display: none;' ");
			a.push('id="paging');
			a.push(e + "next");
			a.push('"><a title="');
			a.push(window.ListView.Strings.L_SPClientNext);
			a.push('" onclick=\'RefreshPageTo(event, "');
			a.push(c.NextHref);
			a.push("\");return false;'");
			a.push(' href="javascript:" class="ms-commandLink ms-promlink-button ms-promlink-button-enabled"><span class="ms-promlink-button-image"><img src="');
			a.push(GetThemedImageUrl("spcommon.png"));
			a.push('" border="0" class="');
			if (h) a.push("ms-promlink-button-left");
			else a.push("ms-promlink-button-right");
			a.push('" alt="');
			a.push(window.ListView.Strings.L_SPClientNext);
			a.push('"></a></td>')
		}
		a.push("</tr></table>");
		var g = a.join(""),
			f = document.getElementById("topPagingCell" + e);
		if (f != null) f.innerHTML = g;
		b.push(g);
		b.push("</td></tr>");
		RenderSearchStatus(b, d);
		b.push("</table>")
	} else {
		b.push('<table border="0" cellpadding="0" cellspacing="0" class="ms-bottompaging" id="bottomPaging">');
		RenderSearchStatus(b, d);
		b.push("</table>")
	}
}

function RenderPagingControlNew(b, e, h, i, m) {
	var a = e.ListData,
		l = '<div class="%CLASS_NAME%" id="%ID_NAME%" style="padding:2px;" >',
		g = '<a onclick=\'RefreshPageTo(event, "%PREV_OR_NEXT_PAGE%");return false;\' href="javascript:" ><img alt="%PREV_OR_NEXT_ALT%" src="%PREV_OR_NEXT_IMG%" alt="" /></a>',
		j = '<span class="ms-paging">%FIRST_ROW% - %LAST_ROW% </span>';
	b.push(l.replace(/%CLASS_NAME%/, i).replace(/%ID_NAME%/, m));
	if (a != null && (a.PrevHref != null || a.NextHref != null)) {
		var n = e.wpq,
			k = e.ListSchema,
			f = ListView.ImageBasePath + "/_layouts/15/" + k.LCID + "/images/";
		if (a.PrevHref != null) {
			var d = g.replace(/%PREV_OR_NEXT_PAGE%/, a.PrevHref);
			d = d.replace(/%PREV_OR_NEXT_IMG%/, f + "prev.gif");
			d = d.replace(/%PREV_OR_NEXT_ALT%/, window.ListView.Strings.L_SlideShowPrevButton_Text);
			b.push(d)
		}
		h && b.push(j.replace(/%FIRST_ROW%/, a.FirstRow).replace(/%LAST_ROW%/, a.FirstRow));
		if (a.NextHref != null) {
			var c = g.replace(/%PREV_OR_NEXT_PAGE%/, a.NextHref);
			c = c.replace(/%PREV_OR_NEXT_IMG%/, f + "next.gif");
			c = c.replace(/%PREV_OR_NEXT_ALT%/, window.ListView.Strings.L_SlideShowNextButton_Text);
			b.push(c)
		}
	}
	b.push(RenderSearchStatusInner(b, e));
	b.push("</div>")
}

function RenderHeroParameters(a) {
	if (a == null) throw "Error: Ctx can not be null in RenderHeroParameters";
	var g = a.ListSchema,
		f = a.wpq;
	this.isDocLib = g.IsDocLib;
	this.listTemplate = a.ListTemplateType;
	this.WOPIEnabled = Boolean(a.NewWOPIDocumentEnabled);
	this.canUpload = ListModule.Util.canUploadFile(a);
	this.hasInlineEdit = a.AllowGridMode && !g.IsDocLib && this.listTemplate != 123;
	this.canDragUpload = CanDragUploadFile(a);
	this.canEasyUpload = CanEasyUploadFile(a);
	this.wpq = f;
	var d = "idHomePageNewItem",
		c = window.ListView.Strings.L_SPAddNewItem,
		b = this.listTemplate;
	if (b == 104) {
		d = "idHomePageNewAnnouncement";
		c = window.ListView.Strings.L_SPAddNewAnnouncement
	} else if (b == 101 || b == 700 || b == 702 || a.listBaseType == 1 && b >= 1e4) {
		if (this.WOPIEnabled) d = ListModule.Util.addWPQtoId("js-newdocWOPI-Hero", f);
		else d = "idHomePageNewDocument-" + f;
		c = window.ListView.Strings.L_SPAddNewDocument
	} else if (b == 115) {
		d = "idHomePageNewItem-" + f;
		c = window.ListView.Strings.L_SPAddNewDocument
	} else if (b == 123) c = window.ListView.Strings.L_SPAddNewDocument;
	else if (b == 103) {
		d = "idHomePageNewLink";
		c = window.ListView.Strings.L_SPAddNewLink
	} else if (b == 106) {
		d = "idHomePageNewEvent";
		c = window.ListView.Strings.L_SPAddNewEvent
	} else if (b == 107 || b == 150 || b == 171) c = window.ListView.Strings.L_SPAddNewTask;
	else if (b == 109) {
		d = "idHomePageNewPicture";
		c = window.ListView.Strings.L_SPAddNewPicture
	} else if (b == 119) {
		d = "idHomePageNewWikiPage";
		c = window.ListView.Strings.L_SPAddNewWiki
	} else if (b == 1230) c = window.ListView.Strings.L_SPAddNewDevApp;
	else if (b == 330 || b == 332) c = window.ListView.Strings.L_SPAddNewApp;
	this.heroId = d;
	this.addNewText = c;
	var e;
	if (ListModule.Settings.SupportsWebPageLibraryTemplate && b == 119) e = a.HttpRoot + "/_layouts/15/CreateWebPage.aspx?List=" + a.listName + "&RootFolder=" + a.rootFolder;
	else if (a.ListSchema.IsDocLib) {
		if (ListModule.Settings.SupportsUpload)
			if (this.WOPIEnabled) e = "#";
			else {
				var h = null;
				if (Boolean(a.RealHttpRoot) && (h = ListModule.Util.makeMountedFolderQueryStrParams(true, false)) != null) e = a.RealHttpRoot + "/_layouts/15/Upload.aspx?List=" + a.listName + "&RootFolder=" + a.rootFolder + h;
				else e = a.HttpRoot + "/_layouts/15/Upload.aspx?List=" + a.listName + "&RootFolder=" + a.rootFolder
			}
	} else if (ListModule.Settings.SupportsDeveloperAppTemplate && b == 1230) e = a.HttpRoot + "/_layouts/15/DeployDeveloperApp.aspx";
	else e = a.newFormUrl;
	this.addNewUrl = e;
	if (!(window.OffSwitch == null || OffSwitch.IsActive("ADD1696D-37A8-41CF-AFB8-BCDB4D70B4FE"))) this.largeSize = true;
	else this.largeSize = Boolean(g.InplaceSearchEnabled) || b == 700 || Boolean(window.groupContextData) && b == 101
}

function RenderHeroParameters_InitializePrototype() {
	RenderHeroParameters.prototype = {
		isDocLib: false,
		listTemplate: -1,
		canDragUpload: true,
		WOPIEnabled: false,
		hasInlineEdit: false,
		heroId: "",
		addNewText: "",
		addNewUrl: "",
		largeSize: false
	}
}

function IsInFilePickerMode(a) {
	return Flighting.VariantConfiguration.IsExpFeatureClientEnabled(513) && Boolean(a.QCBDisabled)
}

function RenderHeroLink(a, l) {
	var i = Flighting.VariantConfiguration.IsExpFeatureClientEnabled(437) && a.SiteTemplateId == 64 && a.listTemplate == "100";
	if (!i && a.inGridMode) {
		var f = '<a class="ms-heroCommandLink" href="javascript:;" onclick="ExitGrid(\'';
		f += a.view;
		f += "'); return false;\"";
		f += " title=";
		f += Encoding.AttrQuote(window.ListView.Strings.L_SPStopEditingTitle);
		f += ">";
		var m = window.ListView.Strings.L_SPStopEditingList;
		return m.replace(/{(1)}/, "</a>").replace(/{(0)}/, f)
	}
	var b = new RenderHeroParameters(a, l);
	if (!Boolean(b) || IsInFilePickerMode(a)) return "";
	a.heroId = b.heroId;
	var c;
	if (i && ListModule.Settings.SupportsDoclibQCB) {
		WriteEngagementLog("GroupCustomListQCB_StartCreate");
		WriteDebugLog("GroupCustomListQCB_StartCreate", false, "Starting construction of group's custom list QCB for " + a.wpq);
		a.qcbNewButtonConfigured = false;
		var d;
		if (!Flighting.VariantConfiguration.IsExpFeatureClientEnabled(249)) d = {
			buttonClass: (b.largeSize ? "ms-textXLarge" : "ms-textLarge") + " ms-heroCommandLink js-qcb-button",
			disabledClass: "ms-disabled",
			onDestroyed: function () {
				OnQCBDestroyed(a)
			},
			onError: function (c, b) {
				WriteDebugLog(c, true, b + " - GroupCustomListQCB for " + a.wpq)
			},
			left: [{
				title: window.ListView.Strings.L_SPClientNew,
				glyphClass: (b.largeSize ? "ms-listview-old-new-glyph-large " : "") + "ms-listview-glyph ms-listview-old-new-glyph ms-listview-old-new-glyph-circle",
				glyph: "&#xE004;",
				buttonClass: "js-listview-qcbNewButton",
				tooltip: window.ListView.Strings.L_SPClientNewTooltip,
				accessKey: window.ListView.Strings.L_SPClientNewAK,
				onClick: function (a) {
					HandleQCBNewButtonPress(a, b)
				},
				shouldEnable: function (c) {
					return ShouldEnableQCBNewButton(c, a, b)
				}
			}, a.inGridMode ? {
				title: window.ListView.Strings.L_SPQCB_StopEditList_Text,
				glyphClass: "ms-listview-glyph",
				glyph: "&#xE027;",
				buttonClass: "js-listview-qcbEditListButton",
				tooltip: window.ListView.Strings.L_SPQCB_StopEditList_Tooltip,
				accessKey: window.ListView.Strings.L_SPQCB_StopEditListAK,
				onClick: function (b) {
					HandleQCBStopEditListButtonPress(b, a)
				},
				shouldEnable: function (b) {
					return ShouldEnableQCBStopEditListButton(b, a)
				}
			} : {
				title: window.ListView.Strings.L_SPQCB_EditList_Text,
				glyphClass: "ms-listview-glyph",
				glyph: "&#xE027;",
				buttonClass: "js-listview-qcbEditListButton",
				tooltip: window.ListView.Strings.L_SPEditListTitle,
				accessKey: window.ListView.Strings.L_SPQCB_EditListAK,
				onClick: function (b) {
					HandleQCBEditListButtonPress(b, a)
				},
				shouldEnable: function (b) {
					return ShouldEnableQCBEditListButton(b, a)
				}
			}, {
				title: window.ListView.Strings.L_SPQCB_ListSettings_Text,
				glyphClass: "ms-listview-glyph",
				glyph: "&#xE035;",
				buttonClass: "ms-qcb-buttons-alignmentfix js-listview-qcbListSettingsButton",
				tooltip: window.ListView.Strings.L_SPQCB_ListSettings_Tooltip,
				accessKey: window.ListView.Strings.L_SPQCB_ListSettings_AK,
				onClick: function (b) {
					HandleQCBListSettingsButtonPress(b, a)
				},
				shouldEnable: function (b) {
					return ShouldEnableQCBListSettingsButton(b, a)
				}
			}, {
				title: window.ListView.Strings.L_SPClientManage,
				glyphClass: "ms-listview-glyph",
				glyph: "&#xE077;",
				buttonClass: "js-listview-qcbManageButton",
				tooltip: window.ListView.Strings.L_SPClientManageTooltip,
				accessKey: window.ListView.Strings.L_SPClientManageAK,
				onClick: function (b) {
					HandleQCBManageButtonPress(b, a)
				},
				shouldEnable: function (b) {
					return ShouldEnableQCBManageButton(b, a)
				}
			}]
		};
		else d = {
			buttonClass: "js-callout-body js-qcb-button",
			disabledClass: "ms-disabled",
			onDestroyed: function () {
				OnQCBDestroyed(a)
			},
			onError: function (c, b) {
				WriteDebugLog(c, true, b + " - GroupCustomListQCB for " + a.wpq)
			},
			left: [{
				title: window.ListView.Strings.L_SPQCB_New_Text,
				glyphClass: "ms-listview-glyph-withmargin ms-core-form-heading ms-listview-new-glyph ms-listview-new-glyph-circle",
				glyph: "&#xE004;",
				buttonClass: "js-listview-qcbNewButton",
				tooltip: window.ListView.Strings.L_SPClientNewTooltip,
				accessKey: window.ListView.Strings.L_SPClientNewAK,
				onClick: function (a) {
					HandleQCBNewButtonPress(a, b)
				},
				shouldEnable: function (c) {
					return ShouldEnableQCBNewButton(c, a, b)
				}
			}, a.inGridMode ? {
				title: window.ListView.Strings.L_SPQCB_StopEditList_Text,
				glyphClass: "ms-listview-glyph",
				glyph: "&#xE027;",
				buttonClass: "js-listview-qcbStopEditListButton",
				tooltip: window.ListView.Strings.L_SPQCB_StopEditList_Tooltip,
				accessKey: window.ListView.Strings.L_SPQCB_StopEditListAK,
				onClick: function (b) {
					HandleQCBStopEditListButtonPress(b, a)
				},
				shouldEnable: function (b) {
					return ShouldEnableQCBStopEditListButton(b, a)
				}
			} : {
				title: window.ListView.Strings.L_SPQCB_EditList_Text,
				glyphClass: "ms-listview-glyph",
				glyph: "&#xE027;",
				buttonClass: "js-listview-qcbEditListButton",
				tooltip: window.ListView.Strings.L_SPEditListTitle,
				accessKey: window.ListView.Strings.L_SPQCB_EditListAK,
				onClick: function (b) {
					HandleQCBEditListButtonPress(b, a)
				},
				shouldEnable: function (b) {
					return ShouldEnableQCBEditListButton(b, a)
				}
			}, {
				title: window.ListView.Strings.L_SPQCB_ListSettings_Text,
				glyphClass: "ms-listview-glyph",
				glyph: "&#xE035;",
				buttonClass: "ms-qcb-buttons-alignmentfix js-listview-qcbListSettingsButton",
				tooltip: window.ListView.Strings.L_SPQCB_ListSettings_Tooltip,
				accessKey: window.ListView.Strings.L_SPQCB_ListSettings_AK,
				onClick: function (b) {
					HandleQCBListSettingsButtonPress(b, a)
				},
				shouldEnable: function (b) {
					return ShouldEnableQCBListSettingsButton(b, a)
				}
			}, {
				title: window.ListView.Strings.L_SPQCB_More_Text,
				rightGlyphClass: "ms-listview-manage-glyph ms-toolbar",
				rightGlyph: "&#xE088;",
				buttonClass: "ms-qcb-buttons-alignmentfix js-listview-qcbManageButton",
				tooltip: window.ListView.Strings.L_SPClientManageTooltip,
				accessKey: window.ListView.Strings.L_SPClientManageAK,
				onClick: function (b) {
					HandleQCBManageButtonPress(b, a)
				},
				shouldEnable: function (b) {
					return ShouldEnableQCBManageButton(b, a)
				}
			}]
		};
		a.qcb = new QCB(d);
		c = '<div class="ms-listview-qcbContainer"></div>';
		AddPostRenderCallback(a, RenderDocumentLibraryQCB);
		WriteEngagementLog("GroupCustomListQCB_SuccessCreate");
		WriteDebugLog("GroupCustomListQCB_SuccessCreate", false, "Succeeded constructing custom list QCB for " + a.wpq)
	} else if (b.isDocLib && !a.inGridMode && ListModule.Settings.SupportsDoclibQCB) {
		WriteEngagementLog("DocLibQCB_StartCreate");
		WriteDebugLog("DocLibQCB_StartCreate", false, "Starting construction of a QCB for " + a.wpq);
		a.qcbNewButtonConfigured = false;
		var h = null,
			k = null;
		if (Boolean(a.RealHttpRoot) && (k = ListModule.Util.makeMountedFolderQueryStrParams(true, false)) != null) h = a.RealHttpRoot + "/_layouts/15/Upload.aspx?List=" + a.listName + "&RootFolder=" + a.rootFolder + k;
		else h = a.HttpRoot + "/_layouts/15/Upload.aspx?List=" + a.listName + "&RootFolder=" + a.rootFolder;
		if (!Flighting.VariantConfiguration.IsExpFeatureClientEnabled(249)) d = {
			buttonClass: (b.largeSize ? "ms-textXLarge" : "ms-textLarge") + " ms-heroCommandLink js-qcb-button",
			disabledClass: "ms-disabled",
			onDestroyed: function () {
				OnQCBDestroyed(a)
			},
			onError: function (c, b) {
				WriteDebugLog(c, true, b + " - DocumentLibraryQCB for " + a.wpq)
			},
			left: [{
				title: window.ListView.Strings.L_SPClientNew,
				glyphClass: (b.largeSize ? "ms-listview-old-new-glyph-large " : "") + "ms-listview-glyph ms-listview-old-new-glyph ms-listview-old-new-glyph-circle",
				glyph: "&#xE004;",
				buttonClass: "js-listview-qcbNewButton",
				tooltip: window.ListView.Strings.L_SPClientNewTooltip,
				accessKey: window.ListView.Strings.L_SPClientNewAK,
				onClick: function (a) {
					HandleQCBNewButtonPress(a, b)
				},
				shouldEnable: function (c) {
					return ShouldEnableQCBNewButton(c, a, b)
				}
			}, {
				title: window.ListView.Strings.L_SPClientUpload,
				glyphClass: "ms-listview-glyph ms-listview-old-upload-glyph",
				glyph: "&#xE076;",
				buttonClass: "js-listview-qcbUploadButton",
				tooltip: window.ListView.Strings.L_SPClientUploadTooltip,
				accessKey: window.ListView.Strings.L_SPClientUploadAK,
				onClick: function (a) {
					HandleQCBUploadButtonPress(a, h, b)
				},
				shouldEnable: function (b) {
					return ShouldEnableQCBUploadButton(b, a)
				}
			}, {
				title: window.ListView.Strings.L_SPClientSync,
				glyphClass: "ms-listview-glyph",
				glyph: "&#xE034;",
				buttonClass: "js-listview-qcbSyncButton",
				tooltip: window.ListView.Strings.L_SPClientSyncTooltip,
				accessKey: window.ListView.Strings.L_SPClientSyncAK,
				onClick: function (b) {
					HandleQCBSyncButtonPress(b, a)
				},
				shouldEnable: function (c) {
					return ShouldEnableQCBSyncButton(c, b, a)
				}
			}, {
				title: window.ListView.Strings.L_SPClientEdit,
				glyphClass: "ms-listview-glyph",
				glyph: "&#xE027;",
				buttonClass: "js-listview-qcbEditButton",
				tooltip: window.ListView.Strings.L_SPClientEditTooltip,
				accessKey: window.ListView.Strings.L_SPClientEditAK,
				onClick: function (b) {
					HandleQCBEditButtonPress(b, a)
				},
				shouldEnable: function (b) {
					return ShouldEnableQCBEditButton(b, a)
				}
			}, {
				title: window.ListView.Strings.L_SPClientManage,
				glyphClass: "ms-listview-glyph",
				glyph: "&#xE077;",
				buttonClass: "js-listview-qcbManageButton",
				tooltip: window.ListView.Strings.L_SPClientManageTooltip,
				accessKey: window.ListView.Strings.L_SPClientManageAK,
				onClick: function (b) {
					HandleQCBManageButtonPress(b, a)
				},
				shouldEnable: function (b) {
					return ShouldEnableQCBManageButton(b, a)
				}
			}, {
				title: window.ListView.Strings.L_SPClientShare,
				glyphClass: "ms-listview-glyph",
				glyph: "&#xE078;",
				buttonClass: "js-listview-qcbShareButton",
				tooltip: window.ListView.Strings.L_SPClientShareTooltip,
				accessKey: window.ListView.Strings.L_SPClientShareAK,
				onClick: function (b) {
					HandleQCBShareButtonPress(b, a)
				},
				shouldEnable: function (b) {
					return ShouldEnableQCBShareButton(b, a)
				}
			}]
		};
		else d = {
			buttonClass: "js-callout-body js-qcb-button",
			disabledClass: "ms-disabled",
			onDestroyed: function () {
				OnQCBDestroyed(a)
			},
			onError: function (c, b) {
				WriteDebugLog(c, true, b + " - DocumentLibraryQCB for " + a.wpq)
			},
			left: [{
				title: window.ListView.Strings.L_SPQCB_New_Text,
				glyphClass: "ms-listview-glyph-withmargin ms-core-form-heading ms-listview-new-glyph ms-listview-new-glyph-circle",
				glyph: "&#xE004;",
				buttonClass: "js-listview-qcbNewButton",
				tooltip: window.ListView.Strings.L_SPClientNewTooltip,
				accessKey: window.ListView.Strings.L_SPClientNewAK,
				onClick: function (a) {
					HandleQCBNewButtonPress(a, b)
				},
				shouldEnable: function (c) {
					return ShouldEnableQCBNewButton(c, a, b)
				}
			}, {
				title: window.ListView.Strings.L_SPQCB_Upload_Text,
				glyphClass: "ms-listview-glyph-withmargin ms-core-form-heading",
				glyph: "&#xE076;",
				buttonClass: "ms-qcb-buttons-alignmentfix js-listview-qcbUploadButton",
				tooltip: window.ListView.Strings.L_SPClientUploadTooltip,
				accessKey: window.ListView.Strings.L_SPClientUploadAK,
				onClick: function (a) {
					HandleQCBUploadButtonPress(a, h, b)
				},
				shouldEnable: function (b) {
					return ShouldEnableQCBUploadButton(b, a)
				}
			}, {
				title: window.ListView.Strings.L_SPQCB_Sync_Text,
				glyphClass: "ms-listview-glyph-withmargin ms-listview-sync-glyph ms-core-form-heading",
				glyph: "&#xE034;",
				buttonClass: "ms-qcb-buttons-alignmentfix js-listview-qcbSyncButton",
				tooltip: window.ListView.Strings.L_SPClientSyncTooltip,
				accessKey: window.ListView.Strings.L_SPClientSyncAK,
				onClick: function (b) {
					HandleQCBSyncButtonPress(b, a)
				},
				shouldEnable: function (c) {
					return ShouldEnableQCBSyncButton(c, b, a)
				}
			}, {
				title: window.ListView.Strings.L_SPQCB_Share_Text,
				glyphClass: "ms-listview-glyph-withmargin ms-core-form-heading",
				glyph: "&#xE078;",
				buttonClass: "ms-qcb-buttons-alignmentfix js-listview-qcbShareButton",
				tooltip: window.ListView.Strings.L_SPClientShareTooltip,
				accessKey: window.ListView.Strings.L_SPClientShareAK,
				onClick: function (b) {
					HandleQCBShareButtonPress(b, a)
				},
				shouldEnable: function (b) {
					return ShouldEnableQCBShareButton(b, a)
				}
			}, {
				title: window.ListView.Strings.L_SPQCB_More_Text,
				rightGlyphClass: "ms-listview-manage-glyph ms-toolbar",
				rightGlyph: "&#xE088;",
				buttonClass: "ms-qcb-buttons-alignmentfix js-listview-qcbManageButton",
				tooltip: window.ListView.Strings.L_SPClientManageTooltip,
				accessKey: window.ListView.Strings.L_SPClientManageAK,
				onClick: function (b) {
					HandleQCBManageButtonPress(b, a)
				},
				shouldEnable: function (b) {
					return ShouldEnableQCBManageButton(b, a)
				}
			}]
		};
		if (!b.largeSize) {
			d.left.splice(2, 1);
			d.left.splice(3, 1)
		} else if (Flighting.VariantConfiguration.IsExpFeatureClientEnabled(478) && window.groupContextData != null) d.left.splice(2, 1);
		else if (ListModule.Settings.SupportsAddToOneDrive && ListModule.Settings.SupportsAddToOneDriveQCB && !Boolean(a.RealHttpRoot) && b.listTemplate == 101) {
			var j;
			if (!Flighting.VariantConfiguration.IsExpFeatureClientEnabled(249)) j = {
				title: window.ListView.Strings.L_SPClientAddToOneDrive,
				glyphClass: "ms-listview-glyph",
				glyph: "&#xE168;",
				buttonClass: "js-listview-qcbAddToOneDriveButton",
				tooltip: window.ListView.Strings.L_SPClientAddToOneDriveTooltip,
				accessKey: window.ListView.Strings.L_SPClientAddToOneDriveAK,
				onClick: function (b) {
					HandleQCBAddToOneDriveButtonPress(b, a)
				},
				shouldEnable: function (c) {
					return ShouldEnableQCBAddToOneDriveButton(c, b, a)
				}
			};
			else j = {
				title: window.ListView.Strings.L_SPQCB_SPClientAddToOneDrive,
				glyphClass: "ms-listview-glyph-withmargin ms-core-form-heading",
				glyph: "&#xE168;",
				buttonClass: "ms-qcb-buttons-alignmentfix js-listview-qcbAddToOneDriveButton",
				tooltip: window.ListView.Strings.L_SPClientAddToOneDriveTooltip,
				accessKey: window.ListView.Strings.L_SPClientAddToOneDriveAK,
				onClick: function (b) {
					HandleQCBAddToOneDriveButtonPress(b, a)
				},
				shouldEnable: function (c) {
					return ShouldEnableQCBAddToOneDriveButton(c, b, a)
				}
			};
			d.left.splice(2, 1, j)
		}
		a.qcb = new QCB(d);
		c = '<div class="ms-listview-qcbContainer"></div>';
		AddPostRenderCallback(a, RenderDocumentLibraryQCB);
		WriteDebugLog("DocLibQCB_SuccessCreate", false, "Succeeded constructing a QCB for " + a.wpq)
	} else {
		b.isDocLib && !a.inGridMode && WriteEngagementLog("DocLibQCB_NotShownExpected");
		var g = i ? null : RenderHeroAddNewLink(b, a);
		if (b.isDocLib && b.listTemplate != 119 && b.canDragUpload && Boolean(g)) {
			c = window.ListView.Strings.L_SPAddNewAndDrag;
			c = c.replace(/{(0)}/, g)
		} else if (!b.isDocLib && b.hasInlineEdit) {
			var e = "<a class=\"ms-heroCommandLink\" href=\"javascript:;\" onclick=\"EnsureScriptParams('inplview', 'InitGridFromView', '";
			e += a.view;
			e += "'); return false;\"";
			e += ' title="';
			e += window.ListView.Strings.L_SPEditListTitle;
			e += '">';
			if (Boolean(g)) {
				c = window.ListView.Strings.L_SPAddNewAndEdit;
				c = c.replace(/{(0)}/, g).replace(/{(1)}/, e).replace(/{(2)}/, "</a>")
			} else {
				c = window.ListView.Strings.L_SPEditList;
				c = c.replace(/{(0)}/, e).replace(/{(1)}/, "</a>")
			}
		} else c = g
	}
	if (b.canEasyUpload) c += RenderEasyUploadInputFileElement(a);
	return c
}

function RenderDocumentLibraryQCB(a) {
	WriteStart("DocLibQCB_StartRender");
	WriteDebugLog("DocLibQCB_StartRender", false, "Starting rendering of a QCB for " + a.wpq);
	var b = document.querySelector("#Hero-" + a.wpq + " .ms-listview-qcbContainer");
	if (!Boolean(b)) {
		WriteFailure("DocLibQCB_ContainerNotFound");
		WriteDebugLog("DocLibQCB_ContainerNotFound", true, "Expected selector: '#Hero-" + a.wpq + " .ms-listview-qcbContainer");
		return
	}
	if (!Boolean(a.qcb)) {
		WriteFailure("DocLibQCB_QCBObjectUndefined");
		WriteDebugLog("DocLibQCB_QCBObjectUndefined", true, "The QCB object on the renderCtx for " + a.wpq + " is null or undefined");
		return
	}
	a.qcb.Render(b);
	if (ListModule.Settings.SupportsQCB) typeof _registerOnItemSelectionChangedHandlerForQCB == "function" && _registerOnItemSelectionChangedHandlerForQCB(a);
	WriteSuccess("DocLibQCB_SuccessRender");
	WriteDebugLog("DocLibQCB_SuccessRender", false, "Succeeded rendering a QCB for " + a.wpq)
}

function OnQCBDestroyed(a) {
	WriteDebugLog("DocLibQCB_OnDestroyed", false, "QCB for " + a.wpq + " has been destroyed. Cleaning up.");
	if (ListModule.Settings.SupportsQCB) typeof _unregisterOnItemSelectionChangedHandlerForQCB == "function" && _unregisterOnItemSelectionChangedHandlerForQCB(a);
	WriteDebugLog("DocLibQCB_OnDestroyedSucceeded", false, "Successfully cleaned up QCB for " + a.wpq + " that had been destroyed.")
}

function CloseAllMenusAndCallouts() {
	typeof MenuHtc_hide != "undefined" && MenuHtc_hide();
	if (ListModule.Settings.SupportsCallouts) typeof CalloutManager != "undefined" && CalloutManager.closeAll();
	WriteDebugLog("DocLibQCB_CloseAllMenusAndCallouts", false, "Successfully closed all Menus and Callouts.")
}

function ShouldEnableQCBNewButton(buttonInfo, renderCtx, heroParam) {
	WriteDebugLog("DocLibQCB_PollQCBNewBtn", false, "ShouldEnableQCBNewButton on QCB for " + renderCtx.wpq + ". button ID: " + buttonInfo.id + ", WOPIEnabled: " + (heroParam.WOPIEnabled ? "true" : "false"));
	if (ListModule.Settings.SupportsQCB) {
		if (!renderCtx.qcbNewButtonConfigured) {
			WriteDebugLog("DocLibQCB_StartNewBtnConfig", false, "New button on QCB for " + renderCtx.wpq + " is not yet configured. Starting configuration");
			var newButtonElm = document.getElementById(buttonInfo.id);
			if (!Boolean(newButtonElm)) {
				WriteDebugLog("DocLibQCB_NewBtnElemNotFound", true, "Could not find the New button element in QCB for " + renderCtx.wpq + ". Expected ID: '" + buttonInfo.id + "'");
				return false
			}
			if (eval("typeof DefaultNewButtonWebPart" + renderCtx.wpq + " != 'undefined'")) eval("DefaultNewButtonWebPart" + renderCtx.wpq + "(newButtonElm);");
			if (!heroParam.WOPIEnabled) {
				newButtonElm.setAttribute("data-viewCtr", renderCtx.ctxId);
				renderCtx.qcbNewButtonConfigured = true
			} else CreateNewDocumentCallout(renderCtx, newButtonElm, function () {
				renderCtx.qcb.Poll()
			});
			WriteDebugLog("DocLibQCB_NewBtnConfigSuccess", false, "Successfully configured QCB new button for " + renderCtx.wpq)
		}
		return renderCtx.qcbNewButtonConfigured
	}
	return false
}

function HandleQCBNewButtonPress(b, a) {
	WriteDocEngagementLog("TeamSite_DocLibQCB_HandleQCBNewBtn", "OneDrive_DocLibQCB_HandleQCBNewBtn");
	CloseAllMenusAndCallouts();
	if (ListModule.Settings.SupportsQCB) !a.WOPIEnabled && _EasyUploadOrNewItem2(b, a.canEasyUpload, a.addNewUrl, a.wpq)
}

function ShouldEnableQCBUploadButton(b, a) {
	WriteDebugLog("DocLibQCB_PollQCBUploadBtn", false, "ShouldEnableQCBUploadButton on QCB for " + a.wpq + ", button ID: " + b.id);
	return ListModule.Settings.SupportsQCB ? ListModule.Util.canUploadFile(a) : false
}

function HandleQCBUploadButtonPress(c, b, a) {
	WriteDocEngagementLog("TeamSite_DocLibQCB_HandleQCBUploadBtn", "OneDrive_DocLibQCB_HandleQCBUploadBtn");
	CloseAllMenusAndCallouts();
	ListModule.Settings.SupportsQCB && _EasyUploadOrNewItem2(c, a.canEasyUpload, b, a.wpq)
}

function ShouldEnableQCBEditButton(b, a) {
	WriteDebugLog("DocLibQCB_PollQCBEditBtn", false, "ShouldEnableQCBEditButton on QCB for " + a.wpq + ", button ID: " + b.id);
	if (ListModule.Settings.SupportsQCB)
		if (typeof IsECBCommandEnabled == "function") return IsECBCommandEnabled("EditDocument", a);
	return false
}

function HandleQCBEditButtonPress(b, a) {
	WriteDocEngagementLog("TeamSite_DocLibQCB_HandleQCBEditBtn", "OneDrive_DocLibQCB_HandleQCBEditBtn");
	CloseAllMenusAndCallouts();
	if (ListModule.Settings.SupportsQCB) typeof ExecuteECBCommand == "function" && ExecuteECBCommand("EditDocument", a)
}

function ShouldEnableQCBEditListButton(b, a) {
	WriteDebugLog("DocLibQCB_PollQCBEditListBtn", false, "ShouldEnableQCBEditListButton on QCB for " + a.wpq + ", button ID: " + b.id);
	return ListModule.Settings.SupportsQCB ? a.AllowGridMode && a.listTemplate == 100 && !a.inGridMode : false
}

function HandleQCBEditListButtonPress(b, a) {
	WriteEngagementLog("CustomListQCB_HandleQCBEditListBtn");
	CloseAllMenusAndCallouts();
	ListModule.Settings.SupportsQCB && EnsureScriptParams("inplview", "InitGridFromView", a.view, false)
}

function ShouldEnableQCBStopEditListButton(b, a) {
	WriteDebugLog("DocLibQCB_PollQCBStopEditListBtn", false, "ShouldEnableQCBStopEditListButton on QCB for " + a.wpq + ", button ID: " + b.id);
	return ListModule.Settings.SupportsQCB ? a.AllowGridMode && a.listTemplate == 100 && a.inGridMode : false
}

function HandleQCBStopEditListButtonPress(c, a) {
	WriteEngagementLog("CustomListQCB_HandleQCBStopEditListBtn");
	CloseAllMenusAndCallouts();
	if (ListModule.Settings.SupportsQCB) {
		var b = function () {
			var a = new URI(Nav.ajaxNavigate.get_href());
			a.removeQueryParameter("ShowInGrid");
			window.location.replace(a.getString())
		};
		ExitGrid(a.view, true, b)
	}
}

function ShouldEnableQCBListSettingsButton(b, a) {
	WriteDebugLog("CustomListQCB_PollQCBListSettingsBtn", false, "ShouldEnableQCBListSettingsButton on QCB for " + a.wpq + ", button ID: " + b.id);
	return ListModule.Settings.SupportsQCB ? a.SiteTemplateId == 64 && a.listTemplate == "100" : false
}

function HandleQCBListSettingsButtonPress(b, a) {
	WriteEngagementLog("CustomListQCB_HandleQCBListSettingsBtn");
	ListModule.Settings.SupportsQCB && Nav.navigate(_spPageContextInfo.webAbsoluteUrl + "/_layouts/15/SimpleListSettings.aspx?List=" + a.listName + "&Source=" + URI_Encoding.encodeURIComponent(Nav.ajaxNavigate.get_href()))
}

function ShouldEnableQCBManageButton(e, a) {
	WriteDebugLog("DocLibQCB_PollQCBManageBtn", false, "ShouldEnableQCBManageButton on QCB for " + a.wpq + ", button ID: " + e.id);
	if (ListModule.Settings.SupportsQCB) {
		if (typeof GetListContextFromContextNumber == "undefined") {
			WriteDebugLog("DocLibQCB_PollMngBtnNoCoreJs", false, "Could not find list context since Core.js is not loaded yet");
			return false
		}
		var c = GetListContextFromContextNumber(a.ctxId);
		if (Boolean(c)) {
			var d = "",
				b = false;
			if (c.CurrentSelectedItems == 1) {
				d = "One item selected, so we should enable the QCB manage button.";
				b = true;
				typeof EnsureEcbAdapterCommandsStateInitialized == "function" && EnsureEcbAdapterCommandsStateInitialized(a)
			} else if (c.CurrentSelectedItems > 1)
				if (typeof IsECBCommandEnabled == "function") {
					b = IsECBCommandEnabled("CheckOut", a) || IsECBCommandEnabled("Delete", a) || IsECBCommandEnabled("CheckIn", a) || IsECBCommandEnabled("DiscardCheckOut", a);
					d = "Multiple items selected. Based on ECB polling, we " + (b ? "do" : "do not") + " have commands to show in the manage menu, so the button should be " + (b ? "enabled." : "disabled.")
				} else b = false;
			WriteDebugLog("DocLibQCB_PollQCBMngBtnSuccess", false, d);
			return b
		} else WriteDebugLog("DocLibQCB_PollMngBtnNoListCtx", true, "Could not find list context for " + a.wpq + ". Expected with ctxId " + a.ctxId)
	}
	return false
}

function HandleQCBManageButtonPress(b, a) {
	WriteDocEngagementLog("TeamSite_DocLibQCB_HandleQCBManageBtn", "OneDrive_DocLibQCB_HandleQCBManageBtn");
	if (ListModule.Settings.SupportsQCB) typeof _handleQCBManageButtonPress == "function" && _handleQCBManageButtonPress(b, a)
}

function ShouldEnableQCBShareButton(b, a) {
	WriteDebugLog("DocLibQCB_PollQCBShareBtn", false, "ShouldEnableQCBShareButton on QCB for " + a.wpq + ", button ID: " + b.id);
	if (ListModule.Settings.SupportsQCB)
		if (typeof ShouldEnableShareButtons == "function") return ShouldEnableShareButtons(a) || Boolean(a.ListData.FolderId) && !Boolean(a.CurrentSelectedItems);
	return false
}

function HandleQCBShareButtonPress(b, a) {
	WriteDocEngagementLog("TeamSite_DocLibQCB_HandleQCBShareBtn", "OneDrive_DocLibQCB_HandleQCBShareBtn");
	CloseAllMenusAndCallouts();
	if (ListModule.Settings.SupportsCallouts) typeof DisplaySharingDialogForListItem == "function" && DisplaySharingDialogForListItem(a)
}

function ShouldEnableQCBSyncButton(c, a, b) {
	WriteDebugLog("DocLibQCB_PollQCBSyncBtn", false, "ShouldEnableQCBSyncButton on QCB for " + b.wpq + ", button ID: " + c.id);
	return ListModule.Settings.SupportsQCB ? a.isDocLib && (a.listTemplate == 101 || a.listTemplate == 700) && !b.ExcludeFromOfflineClient && (typeof navigator.msProtocols != "object" || Boolean(navigator.msProtocols.grvopen)) && !(Flighting.VariantConfiguration.IsExpFeatureClientEnabled(478) && window.groupContextData != null) : false
}
var g_syncButtonUsePopup;

function HandleQCBSyncButtonPress(c, b, a) {
	WriteDocEngagementLog("TeamSite_DocLibQCB_HandleQCBSyncBtn", "OneDrive_DocLibQCB_HandleQCBSyncBtn");
	CloseAllMenusAndCallouts();
	if (ListModule.Settings.SupportsQCB) typeof _handleQCBSyncButtonPress == "function" && _handleQCBSyncButtonPress(c, b, a)
}

function ShouldEnableQCBAddToOneDriveButton(c, a, b) {
	WriteDebugLog("DocLibQCB_PollQCBAddToOneDriveBtn", false, "ShouldEnableQCBAddToOneDriveButton on QCB for " + b.wpq + ", button ID: " + c.id);
	return ListModule.Settings.SupportsAddToOneDrive && ListModule.Settings.SupportsAddToOneDriveQCB && a.isDocLib && (a.listTemplate == 101 || a.listTemplate == 700) && !b.ExcludeFromOfflineClient && (typeof navigator.msProtocols != "object" || Boolean(navigator.msProtocols.grvopen))
}

function HandleQCBAddToOneDriveButtonPress(c, b, a) {
	WriteEngagementLog("DocLibQCB_HandleQCBAddToOneDriveBtn");
	CloseAllMenusAndCallouts();
	if (ListModule.Settings.SupportsAddToOneDrive && ListModule.Settings.SupportsAddToOneDriveQCB) typeof _handleQCBAddToOneDriveButtonPress == "function" && _handleQCBAddToOneDriveButtonPress(c, b, a)
}

function RenderHeroAddNewLink(b, c) {
	var a = [];
	a.push('<a id="');
	a.push(b.heroId);
	if (ListModule.Settings.SupportsDoclibAccessibility) a.push('" class="ms-heroCommandLink ms-hero-command-enabled-alt"');
	else a.push('" class="ms-heroCommandLink"');
	a.push(' href="');
	a.push(b.addNewUrl);
	a.push('"');
	if (!b.WOPIEnabled) {
		a.push(' data-viewCtr="');
		a.push(c.ctxId);
		a.push('" onclick="_EasyUploadOrNewItem2(event, ');
		a.push(b.canEasyUpload);
		a.push(", &quot;");
		a.push(b.addNewUrl);
		a.push("&quot;, &quot;");
		a.push(c.wpq);
		a.push('&quot;); return false;" target="_self"')
	}
	a.push(' title="');
	a.push(window.ListView.Strings.L_SPAddNewItemTitle);
	a.push('">');
	if (b.largeSize) a.push('<span class="ms-list-addnew-imgSpan20">');
	else a.push('<span class="ms-list-addnew-imgSpan16">');
	a.push('<img id="');
	a.push(b.heroId + "-img");
	a.push('" src="');
	a.push(GetThemedImageUrl("spcommon.png"));
	if (b.largeSize) a.push('" class="ms-list-addnew-img20"/>');
	else a.push('" class="ms-list-addnew-img16"/>');
	a.push("</span><span>");
	a.push(b.addNewText);
	a.push("</span></a>");
	b.WOPIEnabled && AddPostRenderCallback(c, CreateNewDocumentCallout);
	return a.join("")
}

function ShouldRenderHeroButton(a) {
	var b = a.ListSchema;
	return !Boolean(a.DisableHeroButton) && (!b.IsDocLib || ListModule.Util.canUploadFile(a) || a.ListTemplateType == 119 || Boolean(a.NewWOPIDocumentEnabled)) && b.FolderRight_AddListItems != null && (b.Toolbar == "Freeform" || typeof window["heroButtonWebPart" + a.wpq] != "undefined" && b.Toolbar == "Standard") && !PageMinimized()
}

function CanEasyUploadFile(a) {
	return ListModule.Settings.SupportsDragDrop ? IsEasyUploadEnabled(a) : false
}

function _EasyUploadOrNewItem2(b, a, c, d) {
	CoreInvoke("EasyUploadOrNewItem2", b, a, c, d)
}

function CanDragUploadFile(a) {
	return ListModule.Settings.SupportsDragDrop ? _canDragUploadFile(a) && !IsInFilePickerMode(a) : false
}

function ShouldShowDragDropAttractBox(a) {
	if (ListModule.Settings.SupportsDragDrop) {
		var b = typeof FormData != "undefined" && !(BrowserDetection.userAgent.ipad || BrowserDetection.userAgent.windowsphone) && a.canDragUpload,
			e = Boolean(a.ListSchema) && a.ListSchema.IsDocLib,
			c = (!Boolean(a.ListData.LastRow) || a.ListData.LastRow < 5) && !ListModule.Util.isDefinedAndNotNullOrEmpty(a.rootFolder) || Flighting.VariantConfiguration.IsExpFeatureClientEnabled(178),
			d = ShouldRenderHeroButton(a);
		return b && e && c && d
	} else return false
}

function ReRenderHeroButton(a) {
	var c = document.getElementById("script" + a.wpq);
	if (c == null) return;
	var d = a.ListData.FolderPermissions;
	if (d === undefined) return;
	a.ListSchema.FolderRight_AddListItems = (Number("0x" + d.substring(d.length - 1)) & 2) == 2 ? true : null;
	var b = document.getElementById("Hero-" + a.wpq),
		f = ShouldRenderHeroButton(a);
	if (f && b == null) {
		var g = [];
		RenderHeroButton(g, a);
		var e = document.createElement("div");
		e = c.insertBefore(e, c.firstChild);
		e.innerHTML = g.join("");
		RenderDocumentLibraryQCB(a)
	} else !f && b != null && b.parentNode.removeChild(b)
}

function RenderHeroButton(a, b) {
	function d() {
		var WPQ = b.wpq;
		if (eval("typeof DefaultNewButtonWebPart" + WPQ + " != 'undefined'"))
			if (Boolean(b.heroId)) {
				var eleLink = document.getElementById(b.heroId);
				if (eleLink != null) eval("DefaultNewButtonWebPart" + WPQ + "(eleLink);")
			}
	}
	var c = b.ListSchema,
		e = b.wpq;
	if (!ShouldRenderHeroButton(b)) return;
	a.push('<table id="Hero-');
	a.push(e);
	a.push('" dir="');
	a.push(c.Direction);
	a.push('" cellpadding="0" cellspacing="0" border="0"');
	c.IsDocLib && !b.inGridMode && ListModule.Settings.SupportsDoclibQCB && a.push(' class="ms-fullWidth"');
	a.push(">");
	a.push('<tr><td class="ms-list-addnew ');
	if (c.InplaceSearchEnabled) {
		!(c.IsDocLib && !b.inGridMode && ListModule.Settings.SupportsDoclibQCB) && a.push("ms-textXLarge ");
		a.push("ms-list-addnew-aligntop")
	} else a.push("ms-textLarge");
	a.push(' ms-soften">');
	a.push(RenderHeroLink(b, false));
	a.push("</td></tr>");
	a.push("</table>");
	b.ListTemplateType == 115 && AddPostRenderCallback(b, function () {
		setTimeout(d, 0)
	})
}

function CreateNewDocumentCallout(c, a, b) {
	ListModule.Settings.SupportsCallouts && _createNewDocumentCallout(c, ListModule.Settings.SupportsDoclibQCB, a, b)
}

function RenderTitle(a, b, c, f, d, e) {
	a.push('<a class="ms-listlink" onfocus="OnLink(this)" href="');
	a.push(ListModule.Util.createItemPropertiesTitleUrl(b, c));
	a.push('" onclick="');
	AddUIInstrumentationClickEvent(a, c, "Navigation");
	a.push("EditLink2(this,");
	a.push(b.ctxId);
	a.push(');return false;" target="_self">');
	a.push(Boolean(f.HasTitle) || Boolean(e) ? d : Encoding.HtmlEncode(d));
	a.push("</a>")
}

function ariaLabelForFolder(a, b) {
	return a != null && a.toLowerCase().indexOf("onenote") != -1 ? b ? window.ListView.Strings.L_FieldType_File_OneNote : window.ListView.Strings.L_FieldType_Folder_OneNote : window.ListView.Strings.L_FieldType_Folder
}

function ariaLabelForFile(b, c) {
	var a = window.ListView.Strings.L_FieldType_File;
	if (b != null && b != "") {
		if (b.toLowerCase().indexOf("ms-word") != -1) a = window.ListView.Strings.L_FieldType_File_Document;
		else if (b.toLowerCase().indexOf("ms-excel") != -1) a = window.ListView.Strings.L_FieldType_File_workbook;
		else if (b.toLowerCase().indexOf("ms-powerpoint") != -1) a = window.ListView.Strings.L_FieldType_File_PPT;
		else if (b.toLowerCase().indexOf("onenote") != -1) a = window.ListView.Strings.L_FieldType_File_OneNote
	} else if (c != null && c != "") a = c + " " + window.ListView.Strings.L_FieldType_File;
	return a
}

function LinkTitleValue(a) {
	return a == "" ? window.ListView.Strings.L_SPClientNoTitle : a
}

function ComputedFieldRenderer_InitializePrototype() {
	ComputedFieldRenderer.prototype = {
		fieldRenderer: null,
		fldName: null,
		RenderField: ComputedFieldRenderField
	}
}

function ComputedFieldRenderer(a) {
	this.fldName = a;
	this.fieldRenderer = null
}

function ComputedFieldRenderField(c, d, a, b) {
	if (this.fieldRenderer == null) this.fieldRenderer = ComputedFieldWorker[this.fldName];
	return this.fieldRenderer != null ? this.fieldRenderer(c, d, a, b) : Encoding.HtmlEncode(a[this.fldName])
}
var RenderCalloutAffordance, RenderECB, RenderCalloutMenu;

function isPositiveInteger(b) {
	var a = /^[1-9][0-9]*$/;
	return a.test(b)
}

function createOneTimeCallback(a) {
	return function () {
		var b = false;
		return function () {
			if (b) return;
			b = true;
			return a.apply(this, arguments)
		}
	}()
}

function EnableSharingDialogIfNeeded(b) {
	if (ListModule.Settings.SupportsSharingDialog) {
		var a = createOneTimeCallback(function (b) {
			var d = new URI(Nav.ajaxNavigate.get_href()),
				a = d.getQueryParameter("sharingDialogForListItemId");
			if (Boolean(a))
				if (isPositiveInteger(a)) {
					var c = d.getQueryParameter("tts");
					if (Boolean(c)) DisplaySharingDialogForListItem(b, a, Number(c));
					else DisplaySharingDialogForListItem(b, a)
				}
		});
		AddPostRenderCallback(b, a)
	}
}

function DisplayExplorerWindowIfNeeded(b) {
	var a = createOneTimeCallback(function () {
		var b = new URI(Nav.ajaxNavigate.get_href()),
			a = b.getQueryParameter("ExplorerWindowUrl");
		Boolean(a) && CoreInvoke("NavigateHttpFolder", a, "_blank")
	});
	AddPostRenderCallback(b, a)
}

function EnablePolicyTipDialogIfNeeded(a) {
	if (ListModule.Settings.SupportsPolicyTips && a.bInitialRender) {
		var b = createOneTimeCallback(function (b) {
			var c = new URI(Nav.ajaxNavigate.get_href()),
				a = c.getQueryParameter("policyTipForListItemId");
			if (Boolean(a)) isPositiveInteger(a) && EnsureScriptFunc("core.js", "CalloutPostRenderPolicyTip", function () {
				CalloutPostRenderPolicyTip(b, a)
			})
		});
		AddPostRenderCallback(a, b)
	}
}

function EnsureFileLeafRefName(a) {
	if (typeof a["FileLeafRef.Name"] == "undefined") {
		var b = a.FileLeafRef,
			c = b.lastIndexOf(".");
		if (c >= 0) a["FileLeafRef.Name"] = b.substring(0, c);
		else a["FileLeafRef.Name"] = b
	}
}

function EnsureFileLeafRefSuffix(a) {
	if (typeof a["FileLeafRef.Suffix"] == "undefined") {
		var b = a.FileLeafRef,
			c = b.lastIndexOf(".");
		if (c >= 0) a["FileLeafRef.Suffix"] = b.substring(c + 1);
		else a["FileLeafRef.Suffix"] = ""
	}
}

function EnsureFileDirRef(a) {
	if (typeof a.FileDirRef == "undefined") {
		var b = a.FileRef;
		if (Boolean(b)) {
			var c = b.indexOf("/"),
				d = b.lastIndexOf("/");
			if (d >= 0) a.FileDirRef = b.substring(c, d - c);
			else a.FileDirRef = ""
		}
	}
}
var getDocumentIconAbsoluteUrl, displayGenericDocumentIcon;

function EncodeUrl(a) {
	return typeof a != "undefined" && a != null ? a.replace(/"/g, "%22") : ""
}

function RenderUrl(e, f, i, g, d) {
	var a = [],
		b = e[f],
		c = e[f + ".desc"];
	if (g.Format == "Image") {
		if (ListModule.Util.isDefinedAndNotNullOrEmpty(b)) {
			a.push("<img ");
			if (Flighting.VariantConfiguration.IsExpFeatureClientEnabled(494)) {
				a.push(" class='ms-listview-image' ");
				a.push(" onclick='javascript:var imgUrl=\"");
				a.push(EncodeUrl(b));
				a.push("\"; if (_shouldOpenInLightbox(imgUrl)){_openInLightbox(imgUrl);} else{STSNavigate(imgUrl);}'")
			}
			d && a.push('onfocus="OnLink(this)" ');
			a.push('src="');
			a.push(EncodeUrl(b));
			a.push('" alt="');
			a.push(c);
			a.push('"/>')
		}
	} else if (g.Format == "Hyperlink")
		if (!ListModule.Util.isDefinedAndNotNullOrEmpty(b)) c != null && a.push(c);
		else {
			a.push("<a ");
			d && a.push('onfocus="OnLink(this)" ');
			a.push('href="');
			a.push(EncodeUrl(b));
			var h = typeof Nav.ajaxNavigate == "undefined" ? window.location.search.match(RegExp("[?&]IsDlg=1")) : Nav.ajaxNavigate.get_search().match(RegExp("[?&]IsDlg=1"));
			Boolean(h) && a.push('" target="_blank');
			a.push('">');
			if (c == "") a.push(Encoding.HtmlEncode(b));
			else a.push(Encoding.HtmlEncode(c));
			a.push("</a>")
		}
	return a.join("")
}

function ResolveId(a) {
	return a.EventType == "4" ? a.ID + ".1." + a.MasterSeriesItemID : a.ID
}

function EditRequiresCheckout(a, c) {
	var b = typeof a.CheckoutUser == "undefined" || a.CheckoutUser == "";
	return c.ForceCheckout == "1" && a.FSObjType != "1" && b ? "1" : ""
}

function fMaintainUserChrome() {
	var b = false,
		c = new URI(Nav.ajaxNavigate.get_href()),
		a = c.getQueryParameter("MaintainUserChrome");
	b = ListModule.Settings.SupportsMaintainUserChrome && Boolean(a) && a.toLowerCase() == "true";
	return b
}

function UpdateAdditionalQueryString(a, c, d) {
	var b = a.AdditionalQueryString;
	if (typeof b == "undefined" || b == "") {
		a.AdditionalQueryString = "&" + c + "=" + d;
		return
	} else {
		var e = new URI(a.FileRef + "?" + b);
		e.setQueryParameter(c, d);
		a.AdditionalQueryString = "&" + e.getQuery()
	}
}

function AppendAdditionalQueryStringToFolderUrl(b, c) {
	var a = b.AdditionalQueryString;
	if (typeof a == "undefined" || a == "") return;
	c.push(a)
}

function FolderUrl(c, b, a) {
	a.push(b.PagePath);
	a.push("?RootFolder=");
	a.push(URI_Encoding.encodeURIComponent(c.FileRef));
	a.push(b.ShowWebPart);
	a.push("&FolderCTID=");
	a.push(c.ContentTypeId);
	a.push("&View=");
	a.push(URI_Encoding.encodeURIComponent(b.View));
	AppendAdditionalQueryStringToFolderUrl(c, a)
}

function RenderListFolderLink(a, d, b, c) {
	a.push('<a onfocus="OnLink(this)" href="');
	FolderUrl(b, c, a);
	a.push('" onclick="');
	AddUIInstrumentationClickEvent(a, b, "Navigation");
	a.push("javascript:EnterFolder('");
	a.push(c.PagePath);
	a.push("?RootFolder=");
	a.push(URI_Encoding.encodeURIComponent(b.FileRef));
	a.push(c.ShowWebPart);
	a.push("&FolderCTID=");
	a.push(b.ContentTypeId);
	a.push("&View=");
	a.push(URI_Encoding.encodeURIComponent(c.View));
	AppendAdditionalQueryStringToFolderUrl(b, a);
	if (ListModule.Settings.SupportsDoclibAccessibility) {
		a.push('\');return false;" aria-label="');
		a.push(Encoding.HtmlEncode(d));
		a.push(", " + Encoding.HtmlEncode(ariaLabelForFolder(b["File_x0020_Type.mapapp"], true)) + '">')
	} else a.push("');return false;\">");
	a.push(Encoding.HtmlEncode(d));
	a.push("</a>")
}

function RenderDocFolderLink(f, a, e, b, c) {
	fMaintainUserChrome() && UpdateAdditionalQueryString(b, "MaintainUserChrome", "true");
	a.push('<a onfocus="OnLink(this)" class="ms-listlink" href="');
	FolderUrl(b, c, a);
	a.push('" onmousedown="');
	a.push("javascript:VerifyFolderHref(this,event,'");
	a.push(b["File_x0020_Type.url"]);
	a.push("','");
	a.push(b["File_x0020_Type.progid"]);
	a.push("','");
	a.push(c.DefaultItemOpen);
	a.push("','");
	a.push(b["HTML_x0020_File_x0020_Type.File_x0020_Type.mapcon"]);
	a.push("','");
	a.push(b.HTML_x0020_File_x0020_Type);
	a.push("','");
	if (Flighting.VariantConfiguration.IsExpFeatureClientEnabled(90)) a.push(Encoding.ScriptEncode(b["serverurl.progid"]));
	else a.push(b["serverurl.progid"]);
	a.push("');");
	!Flighting.VariantConfiguration.IsExpFeatureClientEnabled(226) && a.push("return false;");
	a.push('" onclick="');
	AddUIInstrumentationClickEvent(a, b, "Navigation");
	a.push("return HandleFolder(this,event,'");
	a.push(c.PagePath);
	a.push("?RootFolder=");
	a.push(URI_Encoding.encodeURIComponent(b.FileRef));
	a.push(c.ShowWebPart);
	a.push("&FolderCTID=");
	a.push(b.ContentTypeId);
	a.push("&View=");
	a.push(URI_Encoding.encodeURIComponent(c.View));
	AppendAdditionalQueryStringToFolderUrl(b, a);
	var d = ListModule.Util.makeMountedFolderQueryStrParams(true, true);
	Boolean(d) && a.push(d);
	a.push("','TRUE','FALSE','");
	a.push(b["File_x0020_Type.url"]);
	a.push("','");
	a.push(b["File_x0020_Type.progid"]);
	a.push("','");
	a.push(c.DefaultItemOpen);
	a.push("','");
	a.push(b["HTML_x0020_File_x0020_Type.File_x0020_Type.mapcon"]);
	a.push("','");
	a.push(b.HTML_x0020_File_x0020_Type);
	a.push("','");
	if (Flighting.VariantConfiguration.IsExpFeatureClientEnabled(90)) a.push(Encoding.ScriptEncode(b["serverurl.progid"]));
	else a.push(b["serverurl.progid"]);
	a.push("','");
	a.push(Boolean(b.CheckoutUser) ? b.CheckoutUser[0].id : "");
	a.push("','");
	a.push(c.Userid);
	a.push("','");
	a.push(c.ForceCheckout);
	a.push("','");
	a.push(b.IsCheckedoutToLocal);
	a.push("','");
	a.push(b.PermMask);
	if (ListModule.Settings.SupportsDoclibAccessibility) {
		a.push('\');" aria-label="');
		a.push(Encoding.HtmlEncode(e));
		a.push(", " + Encoding.HtmlEncode(ariaLabelForFolder(b["File_x0020_Type.mapapp"], true)) + '">')
	} else a.push("');\">");
	a.push(Encoding.HtmlEncode(e));
	a.push("</a>")
}

function FieldRenderer_InitializePrototype() {
	FieldRenderer.prototype = {
		fldName: null,
		RenderField: FieldRendererRenderField
	}
}

function FieldRenderer(a) {
	this.fldName = a
}

function FieldRendererRenderField(c, d, a) {
	return Encoding.HtmlEncode(a[this.fldName])
}

function RawFieldRenderer_InitializePrototype() {
	RawFieldRenderer.prototype = {
		fldName: null,
		RenderField: RawFieldRendererRenderField
	}
}

function RawFieldRenderer(a) {
	this.fldName = a
}

function RawFieldRendererRenderField(c, d, a) {
	return a[this.fldName]
}

function AttachmentFieldRenderer_InitializePrototype() {
	AttachmentFieldRenderer.prototype = {
		fldName: null,
		RenderField: AttachmentFieldRendererRenderField
	}
}

function AttachmentFieldRenderer(a) {
	this.fldName = a
}

function AttachmentFieldRendererRenderField(d, e, a) {
	var b = a[this.fldName];
	return b != "0" ? '<img border="0" width="16" height="16" src="' + GetThemedImageUrl("attach16.png") + '"/>' : ""
}

function RecurrenceFieldRenderer_InitializePrototype() {
	RecurrenceFieldRenderer.prototype = {
		fldName: null,
		RenderField: RecurrenceFieldRendererRenderField
	}
}

function RecurrenceFieldRenderer(a) {
	this.fldName = a
}

function RecurrenceFieldRendererRenderField(f, g, c) {
	var d = c[this.fldName],
		a = '<img border="0" width="16" height="16" src="';
	a += ListView.ImageBasePath;
	a += "/_layouts/15/images/";
	if (d == "1") {
		var b = c.EventType;
		if (b == "3" || b == "4") a += "recurEx.gif";
		else a += "recur.gif"
	} else a += "blank.gif";
	a += '" alt="';
	a += window.ListView.Strings.L_SPMeetingWorkSpace;
	a += '" title="';
	a += window.ListView.Strings.L_SPMeetingWorkSpace;
	a += '"/>';
	return a
}

function ProjectLinkFieldRenderer_InitializePrototype() {
	ProjectLinkFieldRenderer.prototype = {
		fldName: null,
		RenderField: ProjectLinkFieldRendererRenderField
	}
}

function ProjectLinkFieldRenderer(a) {
	this.fldName = a
}

function ProjectLinkFieldRendererRenderField(d, e, b) {
	if (!(b.WorkspaceLink == "1" || b.WorkspaceLink == "-1")) return '<img border="0" width="16" height="16" src="' + ListView.ImageBasePath + '/_layouts/15/images/blank.gif" />';
	else {
		var a = '<a href="';
		a += b.Workspace;
		a += '" target="_self" title="';
		a += window.ListView.Strings.L_SPMeetingWorkSpace;
		a += '"><img border="" src="' + GetThemedImageUrl("mtgicon.gif") + '" alt="';
		a += window.ListView.Strings.L_SPMeetingWorkSpace;
		a += '"/></a>';
		return a
	}
}

function AllDayEventFieldRenderer_InitializePrototype() {
	AllDayEventFieldRenderer.prototype = {
		fldName: null,
		RenderField: AllDayEventFieldRendererRenderField
	}
}

function AllDayEventFieldRenderer(a) {
	this.fldName = a
}

function AllDayEventFieldRendererRenderField(c, d, a) {
	return a[this.fldName] == window.ListView.Strings.L_SPYes ? window.ListView.Strings.L_SPYes : ""
}

function NumberFieldRenderer_InitializePrototype() {
	NumberFieldRenderer.prototype = {
		fldName: null,
		RenderField: NumberFieldRendererRenderField
	}
}

function NumberFieldRenderer(a) {
	this.fldName = a
}

function LogCalculatedScript(a) {
	ListModule.Util.isDefinedAndNotNullOrEmpty(a) && (a.indexOf("<") != -1 || a.indexOf(">") != -1) && WriteEngagementLog("CalculatedFieldHasScript", {
		script: a
	})
}

function NumberFieldRendererRenderField(e, b, c) {
	var a = c[this.fldName];
	if (!(window.OffSwitch == null || OffSwitch.IsActive("856528C6-8452-44E4-A756-32C6E13004E3")) && b.FieldType == "Calculated")
		if (Flighting.VariantConfiguration.IsExpFeatureClientEnabled(68)) a = Encoding.HtmlEncode(a);
		else if (!b.scriptLogged) {
		b.scriptLogged = true;
		LogCalculatedScript(a)
	}
	return '<div align="right" class="ms-number">' + a + "</div>"
}

function BusinessDataFieldRenderer_InitializePrototype() {
	BusinessDataFieldRenderer.prototype = {
		fldName: null,
		RenderField: BusinessDataFieldRendererRenderField
	}
}

function BusinessDataFieldRenderer(a) {
	this.fldName = a
}

function BusinessDataFieldRendererRenderField(c, f, e) {
	var b = c.CurrentFieldSchema,
		i = e[this.fldName];
	if (i == "") i = window.ListView.Strings.L_BusinessDataField_Blank;
	var a = '<table cellpadding="0" cellspacing="0" style="display=inline">';
	a += "<tr>";
	if (Boolean(b.HasActions)) {
		a += '<td><input type="hidden" name="BusinessDataField_ActionsMenuProxyPageWebUrl" id="BusinessDataField_ActionsMenuProxyPageWebUrl" value="' + c.HttpRoot + '" />';
		a += '<div style="display=inline">';
		a += '<table cellspacing="0">';
		a += "<tr>";
		a += '<td class="ms-vb" valign="top" nowrap="nowrap">';
		a += '<span class="ms-SPLink ms-hovercellinactive" onmouseover="this.className=\'ms-SPLink ms-HoverCellActive\';" onmouseout="this.className=\'ms-SPLink ms-HoverCellInactive\';">';
		var h = "",
			g = "",
			d = "";
		if (Boolean(c.ExternalDataList)) {
			d = "'" + window.ListView.Strings.L_BusinessDataField_ActionMenuLoadingMessage + "',null,true,'" + c.LobSystemInstanceName + "','" + c.EntityNamespace + "','" + c.EntityName + "','" + c.SpecificFinderName + "','" + b.AssociationName + "','" + b.SystemInstanceName + "','" + b.EntityNamespace + "','" + b.EntityName + "','" + e.ID + "', event";
			h = "showActionMenuInExternalList(" + d + ")";
			g = "actionMenuOnKeyDownInExternalList(" + d + ")"
		} else if (typeof f.RelatedField != "undefined" && f.RelatedField != "" && typeof e[f.RelatedField] != "undefined" && e[f.RelatedField] != "") {
			d = "'" + window.ListView.Strings.L_BusinessDataField_ActionMenuLoadingMessage + "',null,true,'" + b.SystemInstanceName + "','" + b.EntityNamespace + "','" + b.EntityName + "','" + e[f.RelatedField] + "', event";
			h = "showActionMenu(" + d + ")";
			g = "actionMenuOnKeyDown(" + d + ")"
		}
		a += '<a style="cursor:hand;white-space:nowrap;">';
		a += '<img border="0" align="absmiddle" src=' + ListView.ImageBasePath + '/_layouts/15/images/bizdataactionicon.gif?rev=44 tabindex="0" alt="' + window.ListView.Strings.L_BusinessDataField_ActionMenuAltText + '" title="' + window.ListView.Strings.L_BusinessDataField_ActionMenuAltText + '"';
		a += ' onclick="' + h + '"';
		a += ' onkeydown="' + g + '" />';
		a += "</a>";
		a += "<a>";
		a += '<img align="absmiddle" src=' + ListView.ImageBasePath + '/_layouts/15/images/menudark.gif?rev=44 tabindex="0" alt="' + window.ListView.Strings.L_BusinessDataField_ActionMenuAltText + '"';
		a += ' onclick="' + h + '"';
		a += ' onkeydown="' + g + '" />';
		a += "</a>";
		a += "</span>";
		a += "</td>";
		a += "</tr>";
		a += "</table>";
		a += "</div>";
		a += '<div STYLE="display=inline" />';
		a += "</td>"
	}
	a += '<td class="ms-vb">';
	if (b.Profile != "" && b.ContainsDefaultAction == "True") a += '<a href="' + c.HttpRoot + b.Profile + e[f.RelatedField] + '" >' + i + "</a>";
	else a += i;
	a += "</td>";
	a += "</tr>";
	a += "</table>";
	return a
}

function DateTimeFieldRenderer_InitializePrototype() {
	DateTimeFieldRenderer.prototype = {
		fldName: null,
		RenderField: DateTimeFieldRendererRenderField
	}
}

function DateTimeFieldRenderer(a) {
	this.fldName = a
}

function DateTimeFieldRendererRenderField(h, d, f) {
	var a = f[this.fldName];
	if (!(window.OffSwitch == null || OffSwitch.IsActive("856528C6-8452-44E4-A756-32C6E13004E3")) && d.FieldType == "Calculated")
		if (Flighting.VariantConfiguration.IsExpFeatureClientEnabled(68)) a = Encoding.HtmlEncode(a);
		else if (!d.scriptLogged) {
		d.scriptLogged = true;
		LogCalculatedScript(a)
	}
	if (a == null) return "";
	var c = f[this.fldName + ".FriendlyDisplay"],
		b = null;
	if (c != null && c != "") b = GetRelativeDateTimeString(c);
	var e = '<span class="ms-noWrap" title="' + a + '">';
	e += b != null && b != "" ? b : a;
	e += "</span>";
	return e
}

function TextFieldRenderer_InitializePrototype() {
	TextFieldRenderer.prototype = {
		fldName: null,
		RenderField: TextFieldRendererRenderField
	}
}

function TextFieldRenderer(a) {
	this.fldName = a
}

function TextFieldRendererRenderField(d, b, a) {
	return b.AutoHyperLink != null ? a[this.fldName] : Encoding.HtmlEncode(a[this.fldName])
}

function LookupFieldRenderer_InitializePrototype() {
	LookupFieldRenderer.prototype = {
		fldName: null,
		RenderField: LookupFieldRendererRenderField
	}
}

function LookupFieldRenderer(a) {
	this.fldName = a
}

function LookupFieldRendererRenderField(j, e, h) {
	function g(c) {
		if (!Boolean(c)) return "";
		a = [];
		for (b = 0; b < c.length; b++) {
			b > 0 && a.push("; ");
			a.push(Encoding.HtmlEncode(c[b].lookupValue))
		}
		return a.join("")
	}
	var c = h[this.fldName];
	if (!Boolean(c)) return "";
	if (typeof c == "string") return Encoding.HtmlEncode(c);
	if (e.RenderAsText != null) return g(c);
	if (!Boolean(e.DispFormUrl)) return "";
	for (var a = [], b = 0; b < c.length; b++) {
		b > 0 && a.push("; ");
		var d = [];
		d.push(e.DispFormUrl);
		d.push("&ID=");
		d.push(c[b].lookupId.toString());
		d.push("&RootFolder=*");
		var f = d.join("");
		a.push("<a ");
		a.push("onclick=\"OpenPopUpPage('");
		a.push(f);
		a.push("', RefreshPage); return false;\" ");
		a.push('href="');
		a.push(f);
		a.push('">');
		a.push(Encoding.HtmlEncode(c[b].lookupValue));
		a.push("</a>")
	}
	return a.join("")
}

function NoteFieldRenderer_InitializePrototype() {
	NoteFieldRenderer.prototype = {
		fldName: null,
		RenderField: NoteFieldRendererRenderField
	}
}

function NoteFieldRenderer(a) {
	this.fldName = a
}

function NoteFieldRendererRenderField(e, c, b) {
	var a = [];
	a.push('<div dir="');
	a.push(c.Direction);
	a.push('" class="ms-rtestate-field">');
	a.push(b[this.fldName]);
	a.push("</div>");
	return a.join("")
}

function UrlFieldRenderer_InitializePrototype() {
	UrlFieldRenderer.prototype = {
		fldName: null,
		RenderField: UrlFieldRendererRenderField
	}
}

function UrlFieldRenderer(a) {
	this.fldName = a
}

function UrlFieldRendererRenderField(d, c, b, a) {
	return RenderUrl(b, this.fldName, a, c, false)
}

function UserFieldRenderer_InitializePrototype() {
	UserFieldRenderer.prototype = {
		fldName: null,
		RenderField: UserFieldRendererRenderField
	}
}

function UserFieldRenderer(a) {
	this.fldName = a
}

function SetFieldClickInstrumentationData(b, a) {
	if (typeof a.piCD != "undefined" && a.piCD != "")
		if (typeof b.piCD == "undefined") b.piCD = a.piCD;
	if (typeof a.piPC != "undefined" && a.piPC != "")
		if (typeof b.piPC == "undefined") b.piPC = a.piPC
}
var s_ImnId;

function UserFieldRendererRenderField(l, b, g, k) {
	var d = g[this.fldName];
	if (typeof d == "string" && (d == "" || d == "***")) return d;
	var c = [],
		e = b.DefaultRender && b.AllowMultipleValues,
		o = e && b.InlineRender;
	if (o) {
		for (var a = [], f = 0; f < d.length; f++) {
			var j = d[f];
			SetFieldClickInstrumentationData(j, g);
			a.push(RenderUserFieldWorker(l, b, j, k))
		}
		if (a.length === 1) c.push(a[0]);
		else if (a.length === 2) c.push(StringUtil.BuildParam(Encoding.HtmlEncode(window.ListView.Strings.L_UserFieldInlineTwo), a[0], a[1]));
		else if (a.length === 3) c.push(StringUtil.BuildParam(Encoding.HtmlEncode(window.ListView.Strings.L_UserFieldInlineThree), a[0], a[1], a[2]));
		else {
			var i = "",
				h = "";
			if (Boolean(b.InlineRenderMoreAsLink)) {
				i = '<a href="#" onclick="return false;" class="ms-imnMoreLink ms-link">';
				h = "</a>"
			}
			var p = a.length - 3;
			c.push(StringUtil.BuildParam(Encoding.HtmlEncode(window.ListView.Strings.L_UserFieldInlineMore), a[0], a[1], a[2], i, String(p), h))
		}
	} else {
		e && c.push("<table style='padding:0px; border-spacing:0px; border:none'><tr><td class='ms-vb'>");
		var n = true;
		for (var q in d) {
			if (n) n = false;
			else if (b.AllowMultipleValues)
				if (e) c.push("</td></tr><tr><td class='ms-vb'>");
				else !b.WithPicture && !b.WithPictureDetail && !b.PictureOnly && c.push("; ");
			var m = d[q];
			SetFieldClickInstrumentationData(m, g);
			c.push(RenderUserFieldWorker(l, b, m, k))
		}
		e && c.push("</td></tr></table>")
	}
	return c.join("")
}

function RenderUserFieldWorker(renderCtx, field, listItem, listSchema) {
	var g_EmptyImnPawnHtml = "<span class='ms-spimn-presenceLink'><span class='{0}'><img class='{1}' name='imnempty' src='" + ListView.ImageBasePath + "/_layouts/15/images/spimn.png?rev=44' alt='' /></span></span>",
		g_ImnPawnHtml = "{0}<a href='#' onclick='WriteDocEngagementLog(\"DocModifiedByPresenceClick\", \"ODModifiedByPresenceClick\"); IMNImageOnClick(event);return false;' class='{1}' {2}>{3}<img name='imnmark' title='' ShowOfflinePawn='1' class='{4}' src='" + ListView.ImageBasePath + "/_layouts/15/images/spimn.png?rev=44' alt='",
		ret = [];

	function GetImnPawnHtml(j, i, l, e, n) {
		var d = "ms-spimn-img",
			a = "ms-spimn-presenceWrapper",
			h = "ms-imnlink",
			g = "",
			b = "",
			c = "";
		if (n) {
			a = d = " ms-hide";
			g = "tabIndex='-1'"
		} else {
			var k = SPClientTemplates.PresenceIndicatorSize.Square_10px,
				f = SPClientTemplates.PresenceIndicatorSize.Square_10px;
			if (e != null && typeof e != "undefined" && e != "None") {
				k = String(parseInt(e.substring(5)));
				if (e == "Size_72px") f = SPClientTemplates.PresenceIndicatorSize.Bar_8px;
				else f = SPClientTemplates.PresenceIndicatorSize.Bar_5px
			} else a += " ms-imnImg";
			if (field.InlineRender) a += " ms-imnImgInline";
			var m = String.format(" ms-spimn-imgSize-{0}x{1}", f, k);
			d += String.format(" ms-spimn-presence-disconnected-{0}x{1}x32", f, k);
			a += m;
			h += " ms-spimn-presenceLink";
			b = String.format("<span class='{0}'>", a);
			c = "<span class='ms-imnSpan'>"
		}
		if (j == null || j == "")
			if (i == null || i == "") ret.push(String.format(g_EmptyImnPawnHtml, a, d));
			else {
				ret.push(String.format(g_ImnPawnHtml, c, h, g, b, d));
				ret.push(Encoding.HtmlEncode(l));
				ret.push("' sip='");
				ret.push(Encoding.HtmlEncode(i));
				ret.push("' id='imn_");
				ret.push(s_ImnId);
				ret.push(",type=smtp' />" + (b.length > 0 ? "</span>" : "") + "</a>" + (c.length > 0 ? "</span>" : ""))
			}
		else {
			ret.push(String.format(g_ImnPawnHtml, c, h, g, b, d));
			ret.push(Encoding.HtmlEncode(l));
			ret.push("' sip='");
			ret.push(Encoding.HtmlEncode(j));
			ret.push("' id='imn_");
			ret.push(s_ImnId);
			ret.push(",type=sip' />" + (b.length > 0 ? "</span>" : "") + "</a>" + (c.length > 0 ? "</span>" : ""))
		}
		s_ImnId++
	}

	function GetPresence(b, a) {
		listSchema.EffectivePresenceEnabled && (field.DefaultRender || field.WithPicture || field.WithPictureDetail || field.PictureOnly || field.PresenceOnly) && GetImnPawnHtml(b, a, listSchema.PresenceAlt, field.PictureSize, false)
	}

	function GetPresenceNoImg(b, a) {
		listSchema.EffectivePresenceEnabled && GetImnPawnHtml(b, a, listSchema.PresenceAlt, null, true)
	}

	function UserLinkWithSize(e) {
		var c = listSchema.UserDispParam;
		if (field.HasUserLink && (Boolean(c) || lookupId != null && lookupId != "" && parseInt(lookupId) > -1)) {
			var d = "";
			if (!Boolean(listSchema.UserDispUrl) && Boolean(_spPageContextInfo) && Boolean(_spPageContextInfo.webServerRelativeUrl)) listSchema.UserDispUrl = Nav.combineUrl(_spPageContextInfo.webServerRelativeUrl, "_layouts/15/userdisp.aspx");
			if (Boolean(listSchema.UserDispUrl)) {
				var a;
				if (ListModule.Settings.UseAbsoluteUserDispUrl) {
					var g = renderCtx.HttpRoot,
						f = listSchema.UserDispUrl;
					a = new URI(g + f)
				} else a = new URI(listSchema.UserDispUrl);
				if (Boolean(c)) a.setQueryParameter(c, listItem[c]);
				else a.setQueryParameter("ID", String(lookupId));
				d = a.getString()
			}
			var b = field.InlineRender ? "ms-link" : "ms-subtleLink";
			b += e != null && e.length > 0 ? " ms-peopleux-imgUserLink" : "";
			if (typeof listItem.piCD != "undefined" && listItem.piCD != "")
				if (typeof listItem.piPC != "undefined" && listItem.piPC != "") ret.push('<a class="' + b + "\" onclick=\"RecordClickForPaging('Author', '" + listItem.piCD + "','" + listItem.piPC + "'); GoToLinkOrDialogNewWindow(this);return false;\" href=");
				else ret.push('<a class="' + b + "\" onclick=\"RecordClick('Author', '" + listItem.piCD + "'); GoToLinkOrDialogNewWindow(this);return false;\" href=");
			else if (typeof listItem.piClickClientData != "undefined" && listItem.piClickClientData != "") ret.push('<a class="' + b + "\" onclick=\"RecordClickClientId('Author', '" + listItem.piClickClientData + "'); GoToLinkOrDialogNewWindow(this);return false;\" href=");
			else ret.push('<a class="' + b + "\" onclick=\"WriteDocEngagementLog('DocModifiedByNameClick', 'ODModifiedByNameClick'); if(typeof(WriteSearchClickLog) != 'undefined'){ WriteSearchClickLog(event); }; GoToLinkOrDialogNewWindow(this);return false;\" href=");
			ret.push(Encoding.AttrQuote(d));
			ret.push(">")
		}
	}

	function UserLink() {
		UserLinkWithSize(null)
	}

	function RenderUserTitle(a) {
		ret.push('<span class="ms-noWrap ms-imnSpan">');
		GetPresenceNoImg(sip, email);
		UserLink();
		ret.push(Encoding.HtmlEncode(a));
		field.HasUserLink && ret.push("</a>");
		ret.push("</span>")
	}
	var lookupId = listItem.id,
		lookupValue;
	if (Boolean(field.AllowMultipleValues) && Boolean(listItem.value)) lookupValue = listItem.value;
	else lookupValue = listItem.title;
	if (lookupValue == null || lookupValue == "") {
		ret.push('<span class="ms-floatLeft ms-peopleux-vanillaUser" />');
		return ret.join("")
	}
	var sip = listItem.sip,
		email = listItem.email;

	function RenderVanillaUser() {
		if (!listSchema.UserVanilla) {
			if (ListModule.Settings.SupportsPeopleHoverCard) ret.push('<span class="ms-verticalAlignTop ms-noWrap ms-displayInlineBlock" ' + GetSharedHoverCardFieldsMarkup() + ">");
			else ret.push('<span class="ms-verticalAlignTop ms-noWrap ms-displayInlineBlock">');
			GetPresence(sip, email);
			RenderUserTitle(lookupValue);
			ret.push("</span>")
		} else {
			ListModule.Settings.SupportsPeopleHoverCard && ret.push("<span " + GetSharedHoverCardFieldsMarkup() + ">");
			RenderUserTitle(lookupValue);
			ListModule.Settings.SupportsPeopleHoverCard && ret.push("</span>")
		}
	}

	function GetSharedHoverCardFieldsMarkup() {
		return " name='SharedHoverCardMarker'sip='" + Encoding.HtmlEncode(GetUserEmail()) + "' userTitle='" + Encoding.HtmlEncode(GetUserTitle()) + "' "
	}

	function GetUserTitle() {
		var a = lookupValue;
		if (a == null) a = "";
		return a
	}

	function GetUserEmail() {
		var a = sip;
		if (a == null || a == "") a = email;
		return a == null ? "" : a
	}
	var ProfilePicture_Suffix_Small = "_SThumb",
		ProfilePicture_Suffix_Medium = "_MThumb",
		ProfilePicture_Suffix_Large = "_LThumb",
		SmallThumbnailThreshold = 48;

	function GetPictureThumbnailUrl(a, b) {
		var c = a.substr(0, a.lastIndexOf("."));
		return c.endsWith(ProfilePicture_Suffix_Medium) ? b == ProfilePicture_Suffix_Medium ? a : a.replace(ProfilePicture_Suffix_Medium, b) : a
	}

	function AppendUserPhotoUrl(a, f, b) {
		_spPageContextInfo.webServerRelativeUrl !== null && _spPageContextInfo.webServerRelativeUrl !== undefined && _spPageContextInfo.webServerRelativeUrl.length > 0 && _spPageContextInfo.webServerRelativeUrl !== "/" && a.push(_spPageContextInfo.webServerRelativeUrl);
		a.push("/_layouts/15/userphoto.aspx");
		a.push("?size=");
		a.push(encodeURIComponent(f));
		var c = Boolean(listItem.accountname) ? listItem.accountname : listItem.email;
		if (Boolean(c)) {
			a.push("&accountname=");
			a.push(encodeURIComponent(c))
		}
		if (Boolean(b)) {
			a.push("&url=");
			a.push(encodeURIComponent(b));
			try {
				var e = new URI(b),
					d = e.getQueryParameter("t");
				if (Boolean(d)) {
					a.push("&t=");
					a.push(encodeURIComponent(d))
				}
			} catch (g) {}
		}
	}

	function RenderPicture(c) {
		var b = listItem.picture,
			a = c.PictureSize != null ? Encoding.HtmlEncode(c.PictureSize.substring(5)) : null;
		ret.push('<span class="ms-imnSpan">');
		GetPresenceNoImg(sip, email);
		if (field.HasUserLink) UserLinkWithSize(a);
		else ret.push('<span class="ms-peopleux-imgUserLink">');
		if (a != null) {
			ret.push('<span class="ms-peopleux-userImgWrapper" style="width:' + a + "; height:" + a + '">');
			ret.push('<img class="ms-peopleux-userImg" style="min-width:' + a + "; min-height:" + a + "; ");
			ret.push("clip:rect(0px, " + a + ", " + a + ", 0px); max-width:" + a + '" src="')
		} else {
			a = "62px";
			ret.push('<img style="width:62px; height:62px; border:none" src="')
		}
		var d = CSSUtil.pxToNum(a) <= SmallThumbnailThreshold ? "S" : "M";
		if (b == null || b == "") {
			if (ListModule.Settings.SupportsCrossDomainPhotos && _spPageContextInfo.crossDomainPhotosEnabled) AppendUserPhotoUrl(ret, d, "");
			else ret.push(ListView.ImageBasePath + "/_layouts/15/images/person.gif?rev=44");
			ret.push('" alt="');
			ret.push(Encoding.HtmlEncode(listSchema.picturealt1));
			ret.push(" ");
			ret.push(Encoding.HtmlEncode(lookupValue));
			ret.push('" />')
		} else {
			if (parseInt(a) <= SmallThumbnailThreshold) b = GetPictureThumbnailUrl(b, ProfilePicture_Suffix_Small);
			if (!ListModule.Settings.SupportsCrossDomainPhotos || !_spPageContextInfo.crossDomainPhotosEnabled || b.startsWith("/") || b.toLowerCase().startsWith(ListModule.Util.getHostUrl(window.location.href).toLowerCase())) ret.push(Encoding.HtmlEncode(b));
			else AppendUserPhotoUrl(ret, d, b);
			ret.push('" alt="');
			ret.push(Encoding.HtmlEncode(listSchema.picturealt2));
			ret.push(" ");
			ret.push(Encoding.HtmlEncode(lookupValue));
			ret.push('" />')
		}
		a != null && ret.push("</span>");
		if (field.HasUserLink) ret.push("</a>");
		else ret.push("</span>");
		ret.push("</span>")
	}
	var picSize = "0px";
	if (field.PictureSize != null && typeof field.PictureSize != "undefined") picSize = Encoding.HtmlEncode(field.PictureSize.substring(5));
	if (field.WithPictureDetail) {
		var jobTitle = listItem.jobTitle,
			department = listItem.department;
		if (picSize == null || typeof picSize == "undefined") picSize = "36px";
		var detailsMaxWidth = 150;
		if (field.MaxWidth != null && typeof field.MaxWidth != "undefined") {
			detailsMaxWidth = field.MaxWidth - 10 - parseInt(picSize) - 11;
			if (detailsMaxWidth < 0) detailsMaxWidth = 0
		}
		if (ListModule.Settings.SupportsPeopleHoverCard) ret.push('<div class="ms-table ms-core-tableNoSpace" ' + GetSharedHoverCardFieldsMarkup() + ">");
		else ret.push('<div class="ms-table ms-core-tableNoSpace">');
		ret.push('<div class="ms-tableRow">');
		ret.push('<div class="ms-tableCell">');
		GetPresence(sip, email);
		ret.push('</span></div><div class="ms-tableCell ms-verticalAlignTop"><div class="ms-peopleux-userImgDiv">');
		RenderPicture(field);
		ret.push('</div></div><div class="ms-tableCell ms-peopleux-userdetails ms-noList"><ul style="max-width:' + String(detailsMaxWidth) + 'px"><li>');
		ret.push('<div class="ms-noWrap' + (parseInt(picSize) >= 48 ? " ms-textLarge" : "") + '">');
		RenderUserTitle(lookupValue);
		ret.push("</div>");
		ret.push("</li>");
		var customDetail = listItem.CustomDetail,
			renderCallback = field.RenderCallback;
		if (renderCallback != null || typeof renderCallback != "undefined") {
			renderCtx.sip = sip;
			var result = eval(renderCallback + "(renderCtx);");
			ret.push("<li>");
			ret.push(result);
			ret.push("</li>")
		} else if (customDetail != null || typeof customDetail != "undefined") {
			ret.push('<li><div class="ms-metadata ms-textSmall ms-peopleux-detailuserline ms-noWrap" title="' + Encoding.HtmlEncode(customDetail) + '">');
			ret.push(Encoding.HtmlEncode(customDetail));
			ret.push("</div></li>")
		} else if (jobTitle != null && jobTitle != "") {
			var detailLine = jobTitle;
			if (department != null && department != "") detailLine += ", " + department;
			ret.push('<li><div class="ms-metadata ms-textSmall ms-peopleux-detailuserline" title="' + Encoding.HtmlEncode(detailLine) + '">');
			ret.push(Encoding.HtmlEncode(detailLine));
			ret.push("</div></li>")
		}
		ret.push("</ul></div></div></div>")
	} else if (field.PictureOnly) {
		if (ListModule.Settings.SupportsPeopleHoverCard) {
			ret.push('<div class="ms-table ms-core-tableNoSpace" ' + GetSharedHoverCardFieldsMarkup() + ">");
			ret.push('<div class="ms-tableRow"><div class="ms-tableCell">')
		} else ret.push('<div class="ms-table ms-core-tableNoSpace"><div class="ms-tableRow"><div class="ms-tableCell">');
		GetPresence(sip, email);
		ret.push('</span></div><div class="ms-tableCell ms-verticalAlignTop"><div class="ms-peopleux-userImgDiv">');
		RenderPicture(field);
		ret.push("</div></div></div></div>")
	} else if (field.WithPicture) {
		ret.push("<div><div>");
		RenderPicture(field);
		ret.push('</div><div class="ms-floatLeft ms-descriptiontext">');
		RenderVanillaUser();
		ret.push("</div></div>")
	} else if (field.NameWithContactCard) {
		ListModule.Settings.SupportsPeopleHoverCard && ret.push("<span " + GetSharedHoverCardFieldsMarkup() + ">");
		RenderUserTitle(lookupValue);
		ListModule.Settings.SupportsPeopleHoverCard && ret.push("</span>")
	} else if (field.PresenceOnly) GetPresence(sip, email);
	else RenderVanillaUser();
	return ret.join("")
}

function RenderAndRegisterHierarchyItem(c, m, b, l, h) {
	if (c.inGridMode) return h;
	var k = c.ListData.HierarchyHasIndention ? 22 : 0,
		f = c.ListData.HierarchyHasIndention ? 13 : 0,
		a = [],
		i = c.ctxId + "," + b.ID + "," + b.FSObjType,
		e = "idExpandCollapse" + i;
	a.push('<span style="');
	b.isParent && a.push("font-weight: bold;");
	a.push("float: ");
	a.push(DOM.rightToLeft ? "right" : "left");
	a.push("; margin-");
	a.push(DOM.rightToLeft ? "right" : "left");
	a.push(":");
	var g = parseInt(b.outlineLevel);
	if (g <= 1) d = b.isParent ? 0 : f;
	else {
		var d = (g - 1) * k;
		if (!b.isParent) d += f
	}
	a.push(d);
	a.push('px">');
	a.push("<table><tr>");
	if (b.isParent) {
		a.push('<td style="vertical-align: top;"><span id="');
		a.push(e);
		a.push('" class="ms-commentcollapse' + (DOM.rightToLeft ? "rtl" : "") + '-iconouter"><img src="');
		a.push(GetThemedImageUrl("spcommon.png"));
		a.push('" class="ms-commentcollapse' + (DOM.rightToLeft ? "rtl" : "") + '-icon"/></span></td>')
	}
	a.push("<td>");
	a.push(h);
	a.push("</td></tr></table></span>");

	function j() {
		var a = c.hierarchyMgr;
		if (a == null) a = c.hierarchyMgr = GetClientHierarchyManagerForWebpart(c.wpq, DOM.rightToLeft);
		if (b.isParent) {
			var d = document.getElementById(e);
			d != null && $addHandler(d, "click", OnExpandCollapseButtonClick);
			EnsureScriptFunc("core.js", "GetAncestorByTagNames", function () {
				var a = DOM_afterglass.GetAncestorByTagNames(d, ["TR"]);
				if (a != null) a.style.fontWeight = "bold"
			})
		}
		a.RegisterHierarchyNode(parseInt(b.ID), b.parentID == null ? null : parseInt(b.parentID), i, e)
	}
	AddPostRenderCallback(c, function () {
		setTimeout(j, 0)
	});
	return a.join("")
}

function OnPostRenderTabularListView(a) {
	setTimeout(function () {
		OnPostRenderTabularListViewDelayed(a)
	}, 100)
}

function OnPostRenderTabularListViewDelayed(a) {
	if (ListModule.Settings.SupportsDelayLoading) {
		if (a != null && a.clvp != null) var e = a.clvp.tab;
		if (e != null) {
			if (IsTouchSupported()) {
				var b = e.rows;
				if (b != null && b.length > 0)
					for (var i = b[0], d = i.cells, c = 0; c < d.length; c++) {
						var h = d[c];
						CoreInvoke("RegisterTouchOverride", h, ListHeaderTouchHandler);
						var g = h.getElementsByClassName("ms-vh-div")[0];
						if (g != null) {
							var f = g.getElementsByClassName("ms-headerSortTitleLink")[0];
							f != null && CoreInvoke("RegisterTouchOverride", f, ListHeaderTouchHandler)
						}
					}
			}
		} else setTimeout(function () {
			OnPostRenderTabularListViewDelayed(a)
		}, 100)
	}
}

function ListHeaderTouchHandler(a) {
	return ListModule.Settings.SupportsTouch ? _ListHeaderTouchHandler(a) : false
}

function SPMgr() {
	this.NewGroup = function (b, a) {
		return b[a] == "1" ? true : false
	};

	function p(d, a, e, c) {
		if (typeof a.FieldRenderer == "undefined") {
			var b = {
				Computed: new ComputedFieldRenderer(a.Name),
				Attachments: new AttachmentFieldRenderer(a.Name),
				User: new UserFieldRenderer(a.Name),
				UserMulti: new UserFieldRenderer(a.Name),
				URL: new UrlFieldRenderer(a.Name),
				Note: new NoteFieldRenderer(a.Name),
				Recurrence: new RecurrenceFieldRenderer(a.Name),
				CrossProjectLink: new ProjectLinkFieldRenderer(a.Name),
				AllDayEvent: new AllDayEventFieldRenderer(a.Name),
				Number: new NumberFieldRenderer(a.Name),
				BusinessData: new BusinessDataFieldRenderer(a.Name),
				Currency: new NumberFieldRenderer(a.Name),
				DateTime: new DateTimeFieldRenderer(a.Name),
				Text: new TextFieldRenderer(a.Name),
				Lookup: new LookupFieldRenderer(a.Name),
				LookupMulti: new LookupFieldRenderer(a.Name),
				WorkflowStatus: new RawFieldRenderer(a.Name)
			};
			if (a.XSLRender == "1") a.FieldRenderer = new RawFieldRenderer(a.Name);
			else {
				a.FieldRenderer = b[a.FieldType];
				if (a.FieldRenderer == null) a.FieldRenderer = b[a.Type]
			}
			if (a.FieldRenderer == null) a.FieldRenderer = new FieldRenderer(a.Name)
		}
		return a.FieldRenderer.RenderField(d, a, e, c)
	}

	function i(a, b) {
		return a == "Calculated" || a == "Recurrence" || a == "CrossProjectLink" ? true : b.indexOf("<") != -1 && b.indexOf(">") != -1 ? true : false
	}

	function c(d, j, a) {
		var c;
		if (a.Sortable != "FALSE") {
			var k = d.ListData;
			c = '<a class="ms-headerSortTitleLink" id="diidSort';
			c += d.ctxId;
			c += a.Name;
			c += '" onfocus="OnFocusFilter(this)"';
			if (!a.IconOnlyHeader) c += " onclick=\"javascript: WriteDocEngagementLog('Documents_SortColumnClick', 'OneDrive_SortColumnClick'); var pointerType = this.getAttribute('pointerType'); if (pointerType != null && typeof MSPointerEvent != 'undefined' && Number(pointerType) != MSPointerEvent.MSPOINTER_TYPE_MOUSE) { ListHeaderTouchHandler(event); return false; } return OnClickFilter(this, event);\"";
			c += 'href="javascript: " SortingFields="';
			c += f(a, k, j);
			c += '" Title="';
			if (ListModule.Settings.SupportsDoclibAccessibility) {
				var e;
				if (a.IconOnlyHeader) {
					a.role = "image";
					var h = Boolean(a.Name == "DocIcon") ? window.ListView.Strings.L_Fldheader_Type : a.Name;
					e = String.format("{0}, {1} {2}", h, window.ListView.Strings.L_ColumnHeadClickSortByAriaLabel, h)
				} else if (!i(a.FieldType, a.FieldTitle)) e = String.format("{0}, {1} {2}", a.FieldTitle, window.ListView.Strings.L_ColumnHeadClickSortByAriaLabel, a.FieldTitle);
				else e = a.Name;
				c += Encoding.HtmlEncode(e)
			} else c += window.ListView.Strings.L_OpenMenuKeyAccessible;
			c += '">';
			c += a.FieldTitle;
			c += "</a>";
			c += g(d, a);
			c += b(d, a)
		} else if (a.Filterable != "FALSE") {
			c = '<span id="diidSort';
			c += d.ctxId;
			c += a.Name;
			if (ListModule.Settings.SupportsDoclibAccessibility) {
				a.role = "button";
				a.ariaLabel = Encoding.HtmlEncode(String.format("{0}, {1}", a.FieldTitle, window.ListView.Strings.L_Fld_SortFilterOpt_Alt));
				c += '" role="button" aria-haspopup="true" aria-label="' + a.ariaLabel
			}
			c += '">';
			c += a.FieldTitle;
			c += "</span>";
			c += b(d, a)
		} else c = '<span title="' + window.ListView.Strings.L_CSR_NoSortFilter + '">' + a.FieldTitle + "</span>";
		return c
	}

	function g(c, e) {
		var a, d = c.ListData,
			f = e.Name == d.Sortfield,
			b = d.SortDir == "ascending",
			g = b ? "ms-sortarrowup-iconouter" : "ms-sortarrowdown-iconouter",
			h = b ? "ms-sortarrowup-icon" : "ms-sortarrowdown-icon";
		a = '<span class="' + g + '"';
		a += ' id="diidSortArrowSpan';
		a += c.ctxId;
		a += e.Name;
		a += '"';
		if (!f) a += ' style="display: none;"';
		a += '><img class="' + h + '" src="' + GetThemedImageUrl("spcommon.png") + '" alt="" /></span>';
		return a
	}

	function b(b, d) {
		var a, c = b.ListData,
			e = c.FilterFields != null && c.FilterFields.indexOf(";" + d.Name + ";") >= 0;
		a = '<span class="ms-filter-iconouter"';
		a += ' id="diidFilterSpan';
		a += b.ctxId;
		a += d.Name;
		a += '"';
		if (!e) a += ' style="display: none;"';
		a += '><img class="ms-filter-icon" src="' + GetThemedImageUrl("spcommon.png") + '" alt="" /></span>';
		return a
	}

	function q(d, b) {
		var e = d.ListSchema,
			f = d.ListData;
		if (e.Filter == "1") return b.Filter;
		var a;
		if (b.Type == "Number" || b.Type == "Currency") {
			a = '<div align="right" class="ms-numHeader">';
			a += c(d, e, b);
			a += "</div>"
		} else a = c(d, e, b);
		if (b.FieldType == "BusinessData" && ListModule.Settings.SupportsBusinessDataField) {
			a += '<a style="padding-left:2px;padding-right:12px" onmouseover="" onclick="GoToLinkOrDialogNewWindow(this);return false;" href="';
			a += e.HttpVDir;
			a += "/_layouts/15/BusinessDataSynchronizer.aspx?ListId=";
			a += d.listName;
			a += "&ColumnName=";
			a += b.Name;
			a += '"><img border="0" src="' + ListView.ImageBasePath + '/_layouts/15/images/bdupdate.gif" alt="';
			a += window.ListView.Strings.L_BusinessDataField_UpdateImageAlt;
			a += '" title="';
			a += window.ListView.Strings.L_BusinessDataField_UpdateImageAlt;
			a += '"/></a>'
		}
		return a
	}

	function f(d, b, c) {
		var a = c.RootFolderParam;
		a += c.FieldSortParam;
		a += "SortField=";
		a += d.Name;
		a += "&SortDir=";
		if (b.SortField == d.Name && (b.SortDir == "ascending" || b.SortDir == "ASC")) a += "Desc";
		else a += "Asc";
		return a
	}

	function a(c, b) {
		var e = c.ListSchema,
			g = c.ListData,
			a = "";
		a += '<div Sortable="';
		a += b.Sortable == null ? "" : b.Sortable;
		a += '" SortDisable="" FilterDisable="" Filterable="';
		a += b.Filterable == null ? "" : b.Filterable;
		a += '" FilterDisableMessage="';
		a += b.FilterDisableMessage == null ? "" : b.FilterDisableMessage;
		a += '" name="';
		a += b.Name;
		a += '" CTXNum="';
		a += c.ctxId;
		a += '" DisplayName="';
		a += Encoding.HtmlEncode(b.DisplayName);
		a += '" FieldType="';
		a += b.FieldType;
		a += '" ResultType="';
		a += b.ResultType == null ? "" : b.ResultType;
		a += '" SortFields="';
		a += f(b, g, e);
		a += '" class="ms-vh-div">';
		a += q(c, b);
		a += "</div>";
		if (b.Sortable != "FALSE" && b.Type != "MultiChoice" || b.Filterable != "FALSE" && b.Type != "Note" && b.Type != "URL") {
			var d = Encoding.HtmlEncode(String.format(window.ListView.Strings.L_OpenFilterMenu, b.DisplayName));
			a += '<div class="ms-positionRelative">';
			a += '<div class="s4-ctx"><span> </span><a onfocus="OnChildColumn(this.parentNode.parentNode.parentNode); return false;" ';
			a += 'class="ms-headerSortArrowLink" onclick="WriteDocEngagementLog(\'Documents_SortArrowClick\', \'OneDrive_SortArrowClick\'); PopMenuFromChevron(event); return false;" href="javascript:;" title="';
			a += d;
			a += '" aria-expended="false"><img style="visibility: hidden;" src="' + GetThemedImageUrl("ecbarw.png") + '" alt="';
			a += d;
			a += '" ms-jsgrid-click-passthrough="true"></a><span> </span></div>';
			a += "</div>"
		}
		return a
	}

	function e(e, b, f, d) {
		var c = '<th class="ms-vh-icon ms-minWidthHeader" role="columnheader" scope="col" onmouseover="OnChildColumn(this)">';
		b.FieldTitle = '<img border="0" width="16" height="16" ';
		if (d) b.FieldTitle += "alt=" + Encoding.AttrQuote(window.ListView.Strings.L_ListFieldAttachments) + " ";
		else b.FieldTitle += "alt=" + Encoding.AttrQuote(Boolean(b.Name == "DocIcon") ? window.ListView.Strings.L_Fldheader_Type : b.Name) + " ";
		b.FieldTitle += 'src="' + f + '"/>';
		b.IconOnlyHeader = true;
		c += a(e, b);
		c += "</th>";
		return c
	}

	function k(a, b) {
		return e(a, b, GetThemedImageUrl("attach16.png"), true)
	}

	function n(b, a) {
		return a.Name == "DocIcon" && a.RealFieldName == "DocIcon" ? e(b, a, ListView.ImageBasePath + "/_layouts/15/images/icgen.gif") : d(b, a)
	}

	function j() {
		var a = '<th scope="col" class="ms-vh3-nograd" role="columnheader">';
		a += '<img id="diidHeaderImageSelectedFlag" alt="';
		a += window.ListView.Strings.L_SPSelection_Checkbox;
		a += '" src="' + ListView.ImageBasePath + '/_layouts/15/images/blank.gif" width="16" height="16" border="0"/>';
		a += "</th>";
		return a
	}

	function m(e, d) {
		var c = [],
			b = [];
		b.push('<div class="ms-chkmark-container" style="cursor: default;">');
		b.push('<div class="ms-chkmark-container-centerer">');
		b.push('<span class="ms-cui-img-16by16 ms-cui-img-cont-float" unselectable="on">');
		b.push('<img class="ms-chkmark-marktaskcomplete" src="');
		b.push(GetThemedImageUrl("spcommon.png"));
		b.push('"/></span></div></div>');
		d.FieldTitle = b.join("");
		c.push('<th scope="col" class="ms-vh2" role="columnheader" style="padding-left: 5px;width: 50px;" onmouseover="OnChildColumn(this)" onmousedown="ListModule.Util.headerMenuMouseDown(this);" scope="col">');
		c.push(a(e, d));
		c.push("</th>");
		return c.join("")
	}

	function o(d, b) {
		var c = '<th class="ms-vh2" role="columnheader" scope="col" onmouseover="OnChildColumn(this)" onmousedown="ListModule.Util.headerMenuMouseDown(this);">';
		b.FieldTitle = Encoding.HtmlEncode(b.DisplayName);
		c += a(d, b);
		c += "</th>";
		return c
	}

	function l(d, c) {
		var b = '<th class="ms-vh-icon" role="columnheader" scope="col" onmouseover="OnChildColumn(this)" onmousedown="ListModule.Util.headerMenuMouseDown(this);">';
		c.FieldTitle = '<IMG id="diidHeaderImagefRecurrence" src="' + ListView.ImageBasePath + '/_layouts/15/images/recurrence.gif" width="16" height="16" border="0" >';
		b += a(d, c);
		b += "</th>";
		return b
	}

	function d(d, b) {
		var c = '<th scope="col" role="columnheader" onmouseover="OnChildColumn(this)" style="max-width: 500px;" class="';
		if ((b.Type == "User" || b.Type == "UserMulti") && d.ListSchema.EffectivePresenceEnabled) c += "ms-vh";
		else c += b.Filterable != "FALSE" || b.Sortable != "FALSE" ? "ms-vh2" : "ms-vh2-nofilter";
		if (b.Name == "DocIcon") c += " ms-minWidthHeader";
		c += '" onmousedown="ListModule.Util.headerMenuMouseDown(this);">';
		b.FieldTitle = Encoding.HtmlEncode(b.DisplayName);
		c += a(d, b);
		c += "</th>";
		return c
	}

	function h(e, c) {
		var b = '<th class="ms-vh-icon" role="columnheader" scope="col" onmouseover="OnChildColumn(this)">',
			d = GetThemedImageUrl("mtgicnhd.gif");
		c.FieldTitle = '<IMG id="diidHeaderImageWorkspaceLink" src="' + d + '" width="16" height="16" border="0" >';
		b += a(e, c);
		b += "</th>";
		return b
	}
	this.RenderHeader = function (b, a) {
		if (a.Name == "SelectedFlag") return j(b, a);
		else if (a.Name == "Checkmark") return m(b, a);
		var e = {
				Attachments: k,
				Computed: n,
				CrossProjectLink: h,
				Recurrence: l,
				DateTime: o
			},
			c = e[a.Type];
		return c != null ? c(b, a) : d(b, a)
	};
	this.RenderField = function (b, a, e, f) {
		if (typeof a.fieldRenderer == "undefined") {
			var j = b.Templates.Fields,
				g, k = a.Name;
			if (j[k] != null) g = j[k];
			var h;
			if (g != null && g != "" && g != RenderFieldValueDefault) {
				if (typeof g == "string") h = SPClientRenderer.ParseTemplateString(g, b);
				else if (typeof g == "function") h = g
			} else h = p;
			a.fieldRenderer = h
		}
		b.CurrentFieldSchema = a;
		var c = a.fieldRenderer(b, a, e, f);
		b.CurrentFieldSchema = null;
		if (a.Direction != null) {
			var d = [];
			d.push('<span dir="');
			d.push(a.Direction);
			d.push('">');
			d.push(c);
			d.push("</span>");
			c = d.join("")
		}
		if (a.linkToItem != null) {
			d = [];
			if (e.FSObjType == "1")
				if (f.IsDocLib == "1") RenderDocFolderLink(b, d, c, e, f);
				else RenderListFolderLink(d, c, e, f);
			else RenderTitle(d, b, e, f, LinkTitleValue(e[a.Name]), true);
			c = d.join("")
		}
		if (f.UseParentHierarchy && f.ParentHierarchyDisplayField == a.Name) c = RenderAndRegisterHierarchyItem(b, a, e, f, c);
		var i = e["CustomData."];
		if (i == null || typeof i == "undefined" || Boolean(i) == false)
			if (a.CalloutMenu != null) c = RenderCalloutMenu(b, e, a, c, IsCSRReadOnlyTabularView(b));
			else if (a.listItemMenu != null) c = RenderECB(b, e, a, c, IsCSRReadOnlyTabularView(b));
		return c
	};
	this.RenderFieldByName = function (a, e, f, b) {
		var d = "",
			g = false;
		for (var i in b.Field) {
			var c = b.Field[i];
			if (c.Name == e) {
				var h = a.CurrentFieldSchema;
				a.CurrentFieldSchema = c;
				d = this.RenderField(a, c, f, b);
				a.CurrentFieldSchema = h;
				g = true;
				break
			}
		}
		if (!g) d = Encoding.HtmlEncode(f[e]);
		return d
	}
}
var spMgr;

function OnTableMouseDown(a) {
	if (a == null) a = window.event;
	if (a.ctrlKey || a.shiftKey) {
		if (BrowserDetection.userAgent.ie8standard) {
			document.onselectstart = function () {
				return false
			};
			window.setTimeout(function () {
				document.onselectstart = null
			}, 0)
		}
		return DOM.CancelEvent(a)
	}
	return true
}

function FHasRowHoverBehavior(a) {
	return !BrowserDetection.userAgent.ie8down && !BrowserDetection.userAgent.ipad && a != null && a.ListData != null && a.ListData.Row != null && a.ListData.Row.length < 50
}

function AddUIInstrumentationClickEvent(b, a, c) {
	if (typeof a.piCD != "undefined" && a.piCD != "") {
		if (typeof a.piPC != "undefined" && a.piPC != "") {
			b.push("RecordClickForPaging('" + Encoding.HtmlEncode(c) + "','");
			b.push(Encoding.HtmlEncode(a.piCD));
			b.push("','");
			b.push(Encoding.HtmlEncode(a.piPC))
		} else {
			b.push("RecordClick('Navigation','");
			b.push(Encoding.HtmlEncode(a.piCD))
		}
		b.push("');")
	}
}

function InitializeSingleItemPictureView() {
	var a = {};
	a.Templates = {};
	a.BaseViewID = 2;
	a.ListTemplateType = 109;
	a.Templates.Item = SingleItem_RenderItemTemplate;
	a.Templates.Footer = SingleItem_RenderFooterTemplate;
	a.Templates.Header = SingleItem_RenderHeaderTemplate;
	SPClientTemplates.TemplateManager.RegisterTemplateOverrides(a)
}

function SingleItem_RenderHeaderTemplate(b) {
	var c = b.ListSchema,
		a = [];
	a.push("<div>");
	if (c.RenderViewSelectorPivotMenu == "True") a.push(RenderViewSelectorPivotMenu(b));
	else c.RenderViewSelectorPivotMenuAsync == "True" && a.push(RenderViewSelectorPivotMenuAsync(b));
	a.push("</div>");
	return a.join("")
}

function SingleItem_RenderFooterTemplate() {
	return ""
}

function RenderSingleItemTopPagingControl(c) {
	var b = [],
		a = "<div>";
	RenderPagingControlNew(b, c, false, "", "topPaging");
	a += b.join("");
	a += "</div>";
	return a
}

function SingleItem_RenderItemTemplate(d) {
	var b = "<tr><td colspan='100'>",
		c = "</td></tr>",
		a = b;
	a += RenderSingleItemTopPagingControl(d);
	a += c;
	a += b;
	a += SingleItem_RenderItem(d.CurrentItem);
	a += c;
	return a
}

function SingleItem_RenderItem(a) {
	var c = GetPictureUrl(a);
	if (a == null) return null;
	var d = a.ContentType,
		b = null;
	if (a.FSObjType == "1") {
		b = '<div class="ms-attractMode"><a href="javascript:" onclick=ajaxNavigate.update("';
		b += GetRelativeUrlToSlideShowView(a);
		b += '") >';
		b += '<img src="/_layouts/15/images/256_folder.png" />';
		b += "<div>" + a.FileLeafRef + "</div>";
		b += "</a></div>"
	} else {
		EnsureFileLeafRefSuffix(a);
		if (!IsPictureFile(a["FileLeafRef.Suffix"])) b = '<div class="ms-attractMode">' + String.format(window.ListView.Strings.L_NotAnImageFile, a.FileLeafRef) + "</div>";
		else {
			b = "<a href=\"javascript:\" onclick='ToggleMaxWidth(this.childNodes[0])' ><img style='max-width:800px' title=\"" + window.ListView.Strings.L_ClickToZoom + '" src="' + c + '" /></a>';
			b += '<div class="ms-attractMode">' + a.FileLeafRef + "</div>"
		}
	}
	return b
}

function GetRelativeUrlToSlideShowView(c) {
	if (c == null) return null;
	var b = window._spPageContextInfo;
	if (Boolean(b) && Boolean(b.serverRequestPath)) {
		var a = escape(b.serverRequestPath);
		a += "?RootFolder=";
		a += URI_Encoding.encodeURIComponent(c.FileRef);
		return a
	}
	return null
}

function IsPictureFile(c) {
	if (c == null) return false;
	for (var b = ["jpg", "jpeg", "bmp", "png", "gif"], a = 0; a < b.length; a++)
		if (c.toLowerCase() == b[a]) return true;
	return false
}

function GetPictureUrl(a) {
	var b = a.FileDirRef + "/" + a.FileLeafRef;
	return EncodeUrl(b)
}

function ToggleMaxWidth(a) {
	var b = a.style.maxWidth;
	if (b == null || b == "") a.style.maxWidth = "800px";
	else a.style.maxWidth = ""
}

function LoadListContextData(a) {
	var d = window.applicationCache,
		b = BrowserStorage.local;
	if (Flighting.VariantConfiguration.IsExpFeatureClientEnabled(192) && Boolean(d) && Boolean(d.status) && Boolean(b) && Boolean(a) && a.ListTemplateType == 700 && a.BaseViewID == 51 && !Boolean(GetViewHash(a))) {
		var c = a.listName + "-" + a.view;
		if (Boolean(a.loadingAsyncData) && Boolean(a.bAppCacheRefresh)) {
			b.setItem(c, JSON.stringify(a.ListData));
			a.bAppCacheRefresh = false
		} else if (Boolean(a.bInitialRender)) {
			var e = b.getItem(c);
			if (Boolean(e)) try {
				a.ListData = JSON.parse(e)
			} catch (f) {
				b.setItem(c, null)
			}
			a.bAppCacheRefresh = true;
			a.skipNextAnimation = true;
			a.onAccessDenied = function (b) {
				if (ListModule.Util.isDefinedAndNotNullOrEmpty(b)) {
					var a = new URI(b),
						d = a.getQueryAsObject(),
						c = "ReturnUrl";
					a.setQueryParameter(c, Nav.ajaxNavigate.get_href());
					window.location.href = a.getString()
				}
			};
			AddPostRenderCallback(a, AsyncDataLoadPostRender)
		}
	}
}
$_global_clienttemplates();
