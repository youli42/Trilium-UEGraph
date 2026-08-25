;
(function() {
	"use strict";
	void 0 === window.blueprintUE && (window.blueprintUE = {}), void 0 === window.blueprintUE.render && (window.blueprintUE.render = {});

	function bE(e, f, g, i) {
		function j(a) {
			a = parseInt(a, 10);
			return isNaN(a) ? 255 : Math.min(Math.max(a, 0), 255)
		}
		return {
			red: j(e),
			green: j(f),
			blue: j(g),
			alpha: (e = i, e = parseFloat(e), isNaN(e) ? 1 : Math.min(Math.max(e, 0), 1)),
			log: function() {},
			generateBlueprintText: function() {
				return "(R=" + this.decimalToFloat(this.red) + ",G=" + this.decimalToFloat(this.green) + ",B=" + this.decimalToFloat(this.blue) + ",A=" + this.fixAlphaForBlueprintText(this.alpha) + ")"
			},
			decodeBlueprintText: function(a) {
				a = String(a).split(",");
				return bE(this.floatToDecimal(a[0].substr(3)), this.floatToDecimal(a[1].substr(2)), this.floatToDecimal(a[2].substr(2)), parseFloat(a[3].substr(2, a[3].length - 3)))
			},
			setValuesFromBlueprintText: function(a) {
				a = this.decodeBlueprintText(a);
				this.red = a.red, this.green = a.green, this.blue = a.blue, this.alpha = a.alpha
			},
			setValuesFromProps: function(a) {
				for (var b, c = 0, d = a.length; c < d; ++c) b = this.floatToDecimal(a[c].value), "R" === a[c].name && (this.red = b), "G" === a[c].name && (this.green = b), "B" === a[c].name && (this.blue = b), "A" === a[c].name && (this.alpha = b)
			},
			generateCss: function() {
				return "rgba(" + this.red + ", " + this.green + ", " + this.blue + ", " + this.alpha + ")"
			},
			floatToDecimal: function(a) {
				a = Math.round(255 * a);
				return isNaN(a) ? 255 : Math.min(Math.max(a, 0), 255)
			},
			decimalToFloat: function(a) {
				var b = 0;
				return 255 <= a ? "1.000000" : a <= 0 ? "0.000000" : (b = a / 255, isNaN(b) ? "1.000000" : (b.toFixed(6) + "000000").substr(0, 8))
			},
			fixAlphaForBlueprintText: function(a) {
				return (parseFloat(a).toFixed(6) + "000000").substr(0, 8)
			}
		}
	}

	function bF(a, b) {
		return Math.floor(Math.random() * (b - a + 1)) + a
	}

	function cR() {
		for (var a = "", b = 0; b < 32; ++b) 1 === bF(0, 1) ? a += String.fromCharCode(bF(65, 90)) : a += String.fromCharCode(bF(48, 57));
		return a
	}

	function bV(a, b, c) {
		return c < b ? new Error("Argument min is superior to max") : Math.min(Math.max(a, b), c)
	}

	function bu(a) {
		var b = "";
		return null == a ? a : '"' === (b = '"' === (b = String(a)).charAt(0) ? b.substring(1) : b).charAt(b.length - 1) ? b.substring(0, b.length - 1) : b
	}

	function bv(a) {
		var b = "",
			c = "";
		return null == a ? a : ("\\r\\n" === (c = String(a)).substring(c.length - 4) && (b = "<br>"), c.replace(/\\r\\n/g, "<br>") + b)
	}

	function co(a) {
		var b = "",
			c = "";
		return null == a ? a : ("\\n" === (c = String(a)).substring(c.length - 2) && (b = "<br>"), c.replace(/\\n/g, "<br>") + b)
	}

	function D(a) {
		var b = "";
		return null == a ? a : (b = 0 === (b = (b = (b = String(a)).replace(/_/g, " ")).replace(/([A-Z])([A-Z])([a-z])|([a-z])([A-Z])/g, "$1$4 $2$3$5")).indexOf("K2") ? b.replace(/ /g, "").substring(2) : b).trim()
	}

	function bG(a, b, c, d) {
		return a.left <= b.left ? a.top <= b.top ? "M 0 0 C" + (c / 2 >> 0) + ",0 " + (c / 2 >> 0) + "," + d + " " + c + "," + d : "M 0 " + d + " C" + (c / 2 >> 0) + "," + d + " " + (c / 2 >> 0) + ",0 " + c + ",0" : a.top <= b.top ? "M " + c + " 0 C" + (c + c) + ",0 " + -c + "," + d + " 0," + d : "M " + c + " " + d + " C" + (c + c) + "," + d + " " + -c + ",0 0,0"
	}

	function bW(a, b, c, d, e, f, g) {
		var i = b.parentElement.parentElement.parentElement.parentElement.parentElement.classList.contains("knot"),
			j = c.parentElement.parentElement.parentElement.parentElement.parentElement.classList.contains("knot");
		if (!i && j) {
			if (!b.parentElement.parentElement.parentElement.classList.contains("left-col") && d.left > e.left) return d.top > e.top ? "M " + f + " " + g + " C" + (f + 150) + "," + g + " " + f + ",0 0,0" : "M " + f + " 0 C" + (f + 150) + ",0 " + f + "," + g + " 0," + g
		} else if (i && !j && c.parentElement.parentElement.parentElement.classList.contains("left-col") && d.left > e.left) return e.top > d.top ? "M 0 " + g + " C-75," + g + " -75,0 " + f + ",0" : "M 0 0 C-75,0 -75," + g + " " + f + "," + g;
		return a
	}

	function cp(a) {
		a = a.trim();
		return a.charAt(0).toUpperCase() + a.substring(1)
	}

	function bH(a, b) {
		a = a.toFixed(b);
		return parseFloat(a)
	}

	function bX(a, b) {
		return {
			1.56: {
				in: .6756661991584852,
				out: 0
			},
			1.48: {
				in: .7142327650111193,
				out: .6410658307210031
			},
			1.4: {
				in: .7574685534591195,
				out: .6754098360655738
			},
			1.32: {
				in: .806276150627615,
				out: .7144970414201184
			},
			1.24: {
				in: .8622540250447227,
				out: .7571157495256167
			},
			1.16: {
				in: .9260326609029779,
				out: .8064024390243902
			},
			1.08: {
				in: 1,
				out: .8620689655172413
			},
			1: {
				in: 1.086873508353222,
				out: .92616226071103
			},
			.92: {
				in: 1.1905717151454362,
				out: 1
			},
			.84: {
				in: 1.3155934007450771,
				out: 1.0877659574468086
			},
			.76: {
				in: 1.4703557312252964,
				out: 1.191860465116279
			},
			.68: {
				in: 1.666871921182266,
				out: 1.3173076923076923
			},
			.6: {
				in: 1.9227967953386744,
				out: 1.4714285714285715
			},
			.52: {
				in: 2.272340425531915,
				out: 1.6653225806451613
			},
			.44: {
				in: 2.7781954887218046,
				out: 1.9209302325581394
			},
			.36: {
				in: 3.5708661417322833,
				out: 2.273224043715847
			},
			.28: {
				in: 5,
				out: 2.78
			},
			.2: {
				in: 8.33266129032258,
				out: 3.572649572649573
			},
			.12: {
				in: 25,
				out: 5
			},
			.04: {
				in: 0,
				out: 8.333333333333334
			}
		} [a][b]
	}

	function cq(a) {
		return bX(a, "in")
	}

	function cr(a) {
		return bX(a, "out")
	}

	function bY(a) {
		var b = a.indexOf("_");
		return -1 !== b ? "GreaterEqual" === (b = a.substring(0, b)) ? ">=" : "Greater" === b ? ">" : "Subtract" === b ? "-" : "LessEqual" === b ? "<=" : "Less" === b ? "<" : "EqualEqual" === b ? "==" : "NotEqual" === b ? "!=" : "Not" === b ? "NOT" : "Percent" === b ? "%" : "Multiply" === b ? "×" : "Divide" === b ? "÷" : "Add" === b && "+" : -1 !== a.indexOf("NAND") ? "NAND" : -1 !== a.indexOf("AND") ? "AND" : -1 !== a.indexOf("XOR") ? "XOR" : -1 !== a.indexOf("NOR") ? "NOR" : -1 !== a.indexOf("OR") ? "OR" : -1 !== a.indexOf("Max") ? "MAX" : -1 !== a.indexOf("Min") ? "MIN" : -1 !== a.indexOf("Abs") ? "ABS" : -1 !== a.indexOf("DegSin") ? "SINd" : -1 !== a.indexOf("DegAcos") ? "ACOSd" : -1 !== a.indexOf("Sqrt") && "SQRT"
	}

	function cs(a) {
		return a.replace("Array_", "")
	}

	function t(a) {
		var b = "";
		return void 0 === a || "0" === (b = a.trim()) || "0.000000" === b ? "0.0" : ("." === (b = b.replace(/0+$/, "")).charAt(b.length - 1) && (b += "0"), b)
	}

	function ct(a) {
		var b = "";
		return null == a ? a : "'" === (b = (a = (a = a.split("/"))[a.length - 1].split("."))[a.length - 1]).charAt(b.length - 1) ? b.substring(0, b.length - 1) : b
	}

	function cS(a) {
		return ("0" + (255 * bV(a, 0, 1) >> 0).toString(16)).slice(-2)
	}

	function bI(a) {
		return 255 * bV(a, 0, 1) >> 0
	}

	function bZ(a, b, c) {
		for (var d = document.createElement(a), e = 0, f = b.length; e < f; ++e) "" !== b[e] && d.classList.add(b[e]);
		for (e = 0, f = c.length; e < f; ++e) d.setAttribute(c[e].name, c[e].value);
		return d
	}

	function bq(a) {
		for (var b, c, d = [], e = 0, f = a.length, g = 0, i = null; e < f; ++e)
			if ((i = null) !== a[e]) {
				if (void 0 !== a[e].tag && (i = bZ(a[e].tag, a[e].classes || [], a[e].attrs || []), void 0 !== a[e].childs))
					for (g = 0, c = (b = bq(a[e].childs)).length; g < c; ++g) i.appendChild(b[g]);
				void 0 !== a[e].text && "" !== a[e].text && (null === i ? i = document.createTextNode(a[e].text) : i.textContent = a[e].text), null !== i && d.push(i)
			} return d
	}

	function J(a) {
		return Array(3 * (a || 1) + 1).join(" ")
	}

	function R(i) {
		var j, l, k = 0,
			n = "",
			m = {},
			p = "";

		function q() {
			var a, b = [],
				c = [],
				d = 0,
				e = "",
				f = !1,
				g = 1;
			for (k += 1; k < j && ((f = '"' === n[k] && "\\" !== n[k - 1] ? !f : f) || "(" !== n[k] || (g += 1), f || ")" !== n[k] || 0 != --g);) !f && "," === n[k] && g <= 1 ? (c.push(e), e = "") : e += n[k], k += 1;
			for (k += 1, "" !== e && c.push(e), a = c.length; d < a; ++d) b.push(R(c[d]));
			return b
		}
		if (n = i.trim(), j = n.length, "(" === n.charAt(0) && ")" === n.charAt(j - 1)) return q();
		for (; k < j;)
			if ('"' === n[k] && 0 === p.length) m.value = function() {
				var i = "";
				for (k += 1; k < j && ('"' !== n[k] || "\\" === n[k - 1]);) i += n[k], k += 1;
				return k += 1, i
			}(), m.useDelimiter = !0;
			else if ("=" === n[k]) {
			if (m.name && "" !== m.name) return m.value = n.substring(m.name.length + 1), m.isDirty = !0, m;
			m.name = p, p = "", k += 1
		} else if ("(" === n[k])
			if (null !== (l = function() {
					var i = k,
						l = "";
					for (k += 1; k < j && ")" !== n[k];) l += n[k], k += 1;
					return "=" === n[k += 1] ? (k += 1, "(" + l + ")") : (k = i, null)
				}())) m.name = p + l, p = "";
			else {
				if (void 0 !== m.value) return m.name ? m.value = n.substring(m.name.length + 1) : m.value = n, m.isDirty = !0, m;
				m.value = q(), k += 1
			}
		else p += n[k], k += 1;
		return "" !== p && (-1 === ["NSLOCTEXT", "LOCGEN_FORMAT_NAMED", "INVTEXT"].indexOf(p) ? m.value = p : m.prefix = p), m
	}

	function U(a) {
		var b = "",
			c = 0,
			d = [],
			e = null,
			f = "",
			g = "";
		if (Array.isArray(a)) {
			for (; c < a.length; ++c) d.push(U(a[c]));
			b += "(" + d.join(",") + ")"
		} else if ("object" == typeof a) return e = a.value, f = "", a.useDelimiter && (f = '"'), "object" == typeof e && (e = U(a.value)), g = "", void 0 !== a.name && (g = a.name + "="), void 0 !== a.prefix && (g += a.prefix), g + f + e + f;
		return b
	}

	function bJ(b) {
		var c, d = 6,
			e = "",
			f = [],
			g = "",
			i = "";
		if (e = b.trim(), c = e.length, "Begin " !== e.substring(0, 6)) return null;
		for (; d < c;) '"' === e[d] && 0 === g.length ? (f.push({
			name: i,
			value: function() {
				var a = "";
				for (d += 1; d < c && ('"' !== e[d] || "\\" === e[d - 1]);) a += e[d], d += 1;
				return d += 1, a
			}(),
			useDelimiter: !0
		}), i = "") : ("=" === e[d] ? (i = g, g = "") : " " === e[d] ? ("" !== g && ("" === i ? f.push({
			value: g
		}) : f.push({
			name: i,
			value: g
		})), i = g = "") : g += e[d], d += 1);
		return "" !== g && ("" === i ? f.push({
			value: g
		}) : f.push({
			name: i,
			value: g
		})), f
	}

	function h(a, b) {
		for (var c = 0, d = a.length; c < d; ++c)
			if (a[c].name === b) return a[c];
		return null
	}

	function bf(a) {
		var b, c = 1,
			d = "";
		if ("string" == typeof a.value) return a.value;
		if (void 0 === a.prefix) return String(a.value);
		if ("NSLOCTEXT" === a.prefix) return void 0 !== a.value[2] && "string" == typeof a.value[2].value ? a.value[2].value : "";
		if ("LOCGEN_FORMAT_NAMED" !== a.prefix) return "INVTEXT" === a.prefix && 0 < a.value.length && void 0 !== a.value[0] && "string" == typeof a.value[0].value ? a.value[0].value : "";
		for (b = a.value.length, d = bf(a.value[0]); c < b; c += 2) d = d.replace("{" + a.value[c].value + "}", bf(a.value[c + 1]));
		return d
	}

	function bw(a, b, c) {
		null === c ? this[b] = parseInt(a, 10) : this[b][c] = parseInt(a, 10)
	}

	function ca(a, b) {
		this[b] = a
	}

	function br() {
		this.data = {}
	}
	br.prototype.listen = function(a, b) {
		return "string" != typeof a ? new TypeError("Argument 'eventName' is incorrect, expect string, get " + typeof a) : "function" != typeof b ? new TypeError("Argument 'callback' is incorrect, expect function, get " + typeof b) : (void 0 === this.data[a] && (this.data[a] = []), void this.data[a].push(b))
	}, br.prototype.emit = function(a, b) {
		var c, d = 0;
		if ("string" != typeof a) return new TypeError("Argument 'eventName' is incorrect, expect string, get " + typeof a);
		if (void 0 === this.data[a]) return !1;
		if (void 0 !== b && !Array.isArray(b)) return new TypeError("Argument 'args' is incorrect, expect array or undefined, get " + typeof b);
		for (c = this.data[a].length, d = 0; d < c; ++d)
			if (!1 === this.data[a][d].apply(null, b)) return !1;
		return !0
	};

	function bx(a, b) {
		for (var c, d = [], e = 0, f = a.length, g = [], i = 0; e < f; ++e) {
			if (!0 === a[e].containsVisualNodes && void 0 !== a[e].nodes)
				for (g = [], i = 0, c = (g = null !== h(a[e].nodes[0].props, "GraphGuid") && 0 < a[e].nodes[0].nodes.length ? bx(a[e].nodes[0].nodes, a[e].guid) : bx(a[e].nodes, a[e].guid)).length; i < c; ++i) d.push(g[i]);
			d.push({
				node: a[e],
				parentGUID: b
			})
		}
		return d
	}

	function cu(a) {
		this.bus.emit("interactor__expand_node", [a])
	}

	function cv() {
		this.initBusEnvironment(), this.initEnvironment()
	}

	function cw() {
		this.initBusInteractor(), this.initInteractor()
	}

	function cx() {
		this.initBusUpdater(), this.initUpdater()
	}

	function cy(a) {
		var b, c, d, e = new x,
			a = e.parseText(a),
			f = 0,
			g = [],
			i = 0,
			j = [],
			l = 0;
		if (0 === a.length) this.bus.emit("end_paste");
		else if (e.isBelow413Version !== this.blueprint.isBelow413Version) this.bus.emit("end_paste");
		else {
			for (c = bx(a, null), i = this.blueprint.nodesParsed.length, f = 0, b = c.length; f < b; ++f) g.push(c[f].node.guid), this.blueprint.nodesParsed.push(c[f]), this.blueprint.nodesDisplayed.nodes.push({
				idx: i,
				guid: c[f].node.guid
			}), i += 1;
			this.listIDs(), setTimeout(function() {
				for (this.instances.environment.updateLoading("DISPLAY NODES..."), this.instances.environment.showLoading(), j = [], d = this.blueprint.nodesDisplayed.nodes.length; l < d; ++l) - 1 !== g.indexOf(this.blueprint.nodesParsed[this.blueprint.nodesDisplayed.nodes[l].idx].node.guid) && j.push(this.blueprint.nodesParsed[this.blueprint.nodesDisplayed.nodes[l].idx].node);
				this.instances.environment.displayNodesInViewport(j), setTimeout(function() {
					this.instances.environment.updateLoading("DRAW LINKS..."), this.instances.environment.drawLinks(this.blueprint.nodesDisplayed.links), setTimeout(function() {
						this.instances.environment.removeLoading(), this.bus.emit("end_paste")
					}.bind(this), 0)
				}.bind(this), 0)
			}.bind(this), 0)
		}
	}

	function cz(a, b) {
		for (var c = this.findNodeIdxWithId(a), d = [], e = 0, f = this.blueprint.nodesParsed[c].node.pins.length, g = 0, i = this.blueprint.nodesDisplayed.links.length; e < f; ++e)
			if (this.blueprint.nodesParsed[c].node.pins[e].isLinkedTo())
				for (g = 0; g < i; ++g) - 1 !== this.blueprint.nodesDisplayed.links[g].indexOf(this.blueprint.nodesParsed[c].node.pins[e].id) && d.push(this.blueprint.nodesDisplayed.links[g]);
		this.instances.environment.reDrawLinks(d, b)
	}

	function cA(a) {
		for (var b = [], c = 0, d = this.findNodeIdxWithId(a), e = h(this.blueprint.nodesParsed[d].node.objectDefinition, "Name"), f = this.blueprint.nodesParsed[d].node.pins.length; c < f; ++c) !1 === this.blueprint.nodesParsed[d].node.pins[c].hasToHidePin(!1) && b.push(e.value + " " + this.blueprint.nodesParsed[d].node.pins[c].id);
		this.bus.emit("interactor__reduce_node", [a, b])
	}

	function cB(a, b, c) {
		for (var d, e = [], f = [
				[b[0], b[0] + c[0]],
				[b[1], b[1] + c[1]]
			], g = 0, i = a.length, j = [], l = 0; g < i; ++g) a[g][0] >= f[0][0] && a[g][0] <= f[0][1] && a[g][1] >= f[1][0] && a[g][1] <= f[1][1] && e.push(a[g]);
		if (0 === e.length) return null;
		if (1 === e.length) return e[0];
		for (j = e[0], l = 1, d = e.length; l < d; ++l) j[0] = Math.min(j[0], e[l][0]), j[1] = Math.min(j[1], e[l][1]);
		return j
	}

	function by() {
		var a, b, c, d, e = -20,
			f = -60,
			g = 0,
			i = 0,
			j = [],
			l = [],
			k = 1,
			n = [];
		if (0 === this.blueprint.nodesDisplayed.nodes.length) return {
			x: 0,
			y: 0
		};
		for (j = [
				[g = this.blueprint.nodesParsed[this.blueprint.nodesDisplayed.nodes[0].idx].node.position[0], i = this.blueprint.nodesParsed[this.blueprint.nodesDisplayed.nodes[0].idx].node.position[1]]
			], l = [g, i], a = this.blueprint.nodesDisplayed.nodes.length; k < a; ++k) b = this.blueprint.nodesParsed[this.blueprint.nodesDisplayed.nodes[k].idx].node.position[0], c = this.blueprint.nodesParsed[this.blueprint.nodesDisplayed.nodes[k].idx].node.position[1], j.push([b, c]), (l[0] > b || l[0] === b && l[1] > c) && (l = [b, c]), g = Math.min(b, g), i = Math.min(c, i);
		return g === l[0] && i === l[1] ? {
			x: -(g + e),
			y: -(i + f)
		} : (null === (n = cB(j, [g, i], [(d = this.data.htmlElement.querySelector(".frame").getBoundingClientRect()).width, d.height])) ? n = [-(l[0] + e), -(l[1] + f)] : (n[0] = -(n[0] + e), n[1] = -(n[1] + f)), {
			x: n[0],
			y: n[1]
		})
	}

	function cb(a, b) {
		for (var c = 0, d = this.blueprint.nodesParsed.length; c < d; ++c)
			if (a === this.blueprint.nodesParsed[c].node.guid) {
				if (b.push({
						id: a,
						text: this.blueprint.nodesParsed[c].node.findHeaderName()
					}), this.blueprint.nodesParsed[c].parentGUID) return cb.call(this, this.blueprint.nodesParsed[c].parentGUID, b);
				break
			} return b
	}

	function cC(a, b) {
		for (var c = [], d = 0, e = this.blueprint.nodesDisplayed.nodes.length; d < e; ++d) - 1 !== b.indexOf(this.blueprint.nodesDisplayed.nodes[d].guid) && c.push(this.blueprint.nodesParsed[this.blueprint.nodesDisplayed.nodes[d].idx].node.generateTextForUnreal(1));
		a.clipboardData.setData("text/plain", c.join("\n"))
	}

	function cD(a) {
		var b, c, d, e, f = [],
			g = !1,
			i = 0,
			j = this.blueprint.nodesParsed.length,
			l = 0,
			k = null,
			n = 0,
			m = null,
			p = 0;
		if ("string" == typeof a) {
			for (; i < j; ++i)
				if (this.blueprint.nodesParsed[i].parentGUID === a) {
					g = !0;
					break
				} if (!g) return;
			this.setDisplayedNodes(this.blueprint.nodesParsed, a)
		} else this.setDisplayedNodes(this.blueprint.nodesParsed, null);
		for (b = this.blueprint.nodesDisplayed.nodes.length; l < b; ++l) f.push(this.blueprint.nodesParsed[this.blueprint.nodesDisplayed.nodes[l].idx].node);
		this.listIDs(), this.instances.environment.cleanViewport(), setTimeout(function() {
			this.instances.environment.displayNodesInViewport(f), this.instances.interactor.resetCanvas(), this.instances.interactor.moveCanvasTo({
				x: 0,
				y: 0
			}), this.instances.environment.drawLinks(this.blueprint.nodesDisplayed.links), setTimeout(function() {
				for (this.instances.interactor.moveCanvasTo(by.call(this)), k = this.data.htmlElement.querySelector(".frame-header__breadcrumb").children, n = k.length - 1; 0 < n; --n) k[n].remove();
				if (null !== a) {
					for (c = cb.call(this, a, []), m = document.createDocumentFragment(), p = c.length - 1; 0 <= p; --p) d = bq([{
						tag: "span",
						classes: ["frame-header__breadcrumb-separator"]
					}]), e = bq([{
						tag: "span",
						classes: ["frame-header__breadcrumb-item"],
						attrs: [{
							name: "data-node-id",
							value: c[p].id
						}],
						text: c[p].text
					}]), m.appendChild(d[0]), m.appendChild(e[0]);
					this.data.htmlElement.querySelector(".frame-header__breadcrumb").appendChild(m)
				}
			}.bind(this), 0)
		}.bind(this), 0)
	}

	function cE() {
		for (var a = document.styleSheets, b = document.createElement("style"), c = "", d = 0, e = 0; d < a.length; ++d) {
			try {
				if (0 === a[d].cssRules.length || ".bue-render" !== a[d].cssRules[0].selectorText) continue
			} catch (a) {
				continue
			}
			for (e = 0; e < a[d].cssRules.length; ++e) c += a[d].cssRules[e].cssText
		}
		return b.innerText = c, (new XMLSerializer).serializeToString(b)
	}

	function cF(a) {
		for (var b, c, d, e = a.childNodes, f = e.length, g = 0, i = null, j = "", l = null, k = [], n = document.createDocumentFragment(), m = [], p = 0, q = 0, u = 0, r = 0, y = 0, A = 0, H = ""; g < f; ++g) i = {
			width: (b = e[g].getBoundingClientRect()).width >> 0,
			height: b.height >> 0
		}, "svg" === e[g].tagName && (i = {
			width: (b = e[g].childNodes[0].getBoundingClientRect()).width >> 0,
			height: b.height >> 0
		}), l = {
			x: 0,
			y: 0
		}, -1 !== (b = (j = e[g].style.transform).indexOf("translate(")) && -1 !== (c = j.indexOf(")", b + 10)) && (k = j.substring(b + 10, c).split(","), l.x = k[0].replace("px", "") >> 0, 1 < k.length && (l.y = k[1].replace("px", "") >> 0)), m.push(l), n.append(e[g].cloneNode(!0)), r = 0 === g ? (p = l.x, q = l.y, u = l.x + i.width, l.y + i.height) : (p = Math.min(p, l.x), q = Math.min(q, l.y), u = Math.max(u, l.x + i.width), Math.max(r, l.y + i.height));
		for (0 < p ? y = -p : p < 0 && (y = Math.abs(p)), 0 < q ? A = -q : q < 0 && (A = Math.abs(q)), a = u + y + 20, d = r + A + 20, f = (e = n.childNodes).length, g = 0; g < f; ++g) e[g].style.transform = "translate(" + (m[g].x + y + 10) + "px, " + (m[g].y + A + 10) + "px)", H += e[g].outerHTML;
		return {
			html: "<div class='bue-render'><div class='reference'></div>" + H + "</div>",
			width: a,
			height: d
		}
	}

	function cG(a, b, c, d) {
		var a = "data:image/svg+xml;utf8," + window.encodeURIComponent("<svg xmlns='http://www.w3.org/2000/svg' width='" + b + "' height='" + c + "'><foreignObject x='0' y='0' width='" + b + "' height='" + c + "'>" + a + "</foreignObject></svg>"),
			e = new Image,
			f = document.createElement("canvas"),
			g = document.createElement("a");
		f.setAttribute("width", b.toString()), f.setAttribute("height", c.toString()), e.onload = function() {
			f.getContext("2d").drawImage(e, 0, 0, b, c), g.href = f.toDataURL("image/png"), g.download = "blueprint.png", g.click(), "function" == typeof d && d()
		}, e.src = a
	}

	function cH(a) {
		var b = cE(),
			c = cF(this.data.htmlElement.querySelector(".canvas")),
			d = document.createElement("div");
		d.innerHTML = b + c.html, d.setAttribute("xmlns", "http://www.w3.org/1999/xhtml"), cG((new XMLSerializer).serializeToString(d), c.width, c.height, a)
	}

	function B(a, b, c, d) {
		return "string" != typeof a ? new TypeError("Argument 'text' is incorrect, expect string, get " + typeof a) : b instanceof HTMLElement ? "object" != typeof c ? new TypeError("Argument 'options' is incorrect, expect object, get " + typeof c) : d instanceof br ? (this.data = {
			htmlElement: b,
			options: c,
			text: a
		}, this.bus = d, this.elapsedTime = {
			parseBlueprint: 0,
			createPlayground: 0,
			displayNodesInViewport: 0,
			drawLinks: 0,
			startAllBinding: 0
		}, this.blueprint = {
			nodesParsed: [],
			nodesDisplayed: {
				nodes: [],
				ids: {
					nodes: [],
					pins: []
				},
				links: []
			},
			history: [],
			isBelow413Version: !1
		}, this.eventsBinding = {
			copyNodesToClipboard: cC.bind(this),
			dblclick: cD.bind(this),
			expandNode: cu.bind(this),
			initEnvironment: cv.bind(this),
			initInteractor: cw.bind(this),
			initUpdater: cx.bind(this),
			pasteTextFromClipboard: cy.bind(this),
			reDrawLinks: cz.bind(this),
			reduceNode: cA.bind(this),
			generateImage: cH.bind(this)
		}, this.instances = {
			environment: new C(this.data.htmlElement, this.data.options, this.bus),
			interactor: new s(this.data.htmlElement, this.data.options, this.bus),
			updater: new bz(this.data.options, this.bus)
		}, this.bus.listen("init_environment", this.eventsBinding.initEnvironment), this.bus.listen("init_interactor", this.eventsBinding.initInteractor), this.bus.listen("init_updater", this.eventsBinding.initUpdater), this.bus.listen("copy_nodes_to_clipboard", this.eventsBinding.copyNodesToClipboard), this.bus.listen("paste_text_from_clipboard", this.eventsBinding.pasteTextFromClipboard), this.bus.listen("dblclick", this.eventsBinding.dblclick), this.callbackInitialization = null, void(this.error = null)) : new TypeError("Argument 'bus' is incorrect, expect Bus, get " + typeof d) : new TypeError("Argument 'htmlElement' is incorrect, expect HTMLElement, get " + typeof b)
	}
	B.prototype.start = function(a) {
		var b = performance.now();
		"function" == typeof a && (this.callbackInitialization = a);
		try {
			this.parseBlueprint()
		} catch (a) {
			this.error = {
				type: "PARSE_BLUEPRINT",
				message: a.message,
				displayedMessage: "FAILED DISPLAY BLUEPRINT: Parsing Error"
			}, this.blueprint.nodesParsed = []
		}
		this.setDisplayedNodes(this.blueprint.nodesParsed, null), this.listIDs(), this.elapsedTime.parseBlueprint = performance.now() - b, this.bus.emit("init_environment")
	}, B.prototype.parseBlueprint = function() {
		var a = new x,
			b = a.parseText(this.data.text);
		this.blueprint.isBelow413Version = a.isBelow413Version, void 0 === this.data.options.type && (this.data.options.type = a.type), this.blueprint.nodesParsed = bx(b, null)
	}, B.prototype.setDisplayedNodes = function(a, b) {
		var c = 0,
			d = a.length;
		for (this.blueprint.nodesDisplayed.nodes = []; c < d; ++c) a[c].parentGUID === b && this.blueprint.nodesDisplayed.nodes.push({
			idx: c,
			guid: a[c].node.guid
		})
	}, B.prototype.listIDs = function() {
		this.addNodesID(), this.addPinsID(), this.blueprint.isBelow413Version ? this.addLinksForBelow413() : this.addLinks()
	}, B.prototype.addNodesID = function() {
		for (var a = 0, b = this.blueprint.nodesDisplayed.nodes.length; a < b; ++a) void 0 !== this.blueprint.nodesDisplayed.nodes[a].guid && -1 === this.blueprint.nodesDisplayed.ids.nodes.indexOf(this.blueprint.nodesDisplayed.nodes[a].guid) && this.blueprint.nodesDisplayed.ids.nodes.push(this.blueprint.nodesDisplayed.nodes[a].guid)
	}, B.prototype.addPinsID = function() {
		for (var a, b, c = 0, d = this.blueprint.nodesDisplayed.nodes.length, e = 0; c < d; ++c)
			for (e = 0, a = this.blueprint.nodesParsed[this.blueprint.nodesDisplayed.nodes[c].idx].node.pins.length; e < a; ++e) void 0 !== this.blueprint.nodesParsed[this.blueprint.nodesDisplayed.nodes[c].idx].node.pins[e].id && null !== (b = h(this.blueprint.nodesParsed[this.blueprint.nodesDisplayed.nodes[c].idx].node.objectDefinition, "Name")) && (b = b.value + " " + this.blueprint.nodesParsed[this.blueprint.nodesDisplayed.nodes[c].idx].node.pins[e].id, -1 === this.blueprint.nodesDisplayed.ids.pins.indexOf(b) && this.blueprint.nodesDisplayed.ids.pins.push(b))
	}, B.prototype.addLinksForBelow413 = function() {
		for (var a, b, c, d = 0, e = this.blueprint.nodesDisplayed.nodes.length, f = 0, g = [], i = "", j = [], l = [], k = 0, n = 0, m = "", p = "", q = [], u = null, r = [], y = null; d < e; ++d)
			for (f = 0, a = this.blueprint.nodesParsed[this.blueprint.nodesDisplayed.nodes[d].idx].node.pins.length; f < a; ++f)
				if (!1 !== this.blueprint.nodesParsed[this.blueprint.nodesDisplayed.nodes[d].idx].node.pins[f].isLinkedTo() && !this.blueprint.nodesParsed[this.blueprint.nodesDisplayed.nodes[d].idx].node.pins[f].isInput() && null !== (b = h(this.blueprint.nodesParsed[this.blueprint.nodesDisplayed.nodes[d].idx].node.objectDefinition, "Name"))) {
					for (u = b.value + " " + this.blueprint.nodesParsed[this.blueprint.nodesDisplayed.nodes[d].idx].node.pins[f].id, g = [], i = "", k = 0, n = (l = this.blueprint.nodesParsed[this.blueprint.nodesDisplayed.nodes[d].idx].node.pins[f].getLinks()).length; k < n; ++k) i = 2 === (j = (i = (i = l[k].substring(11)).substring(0, i.length - 1)).split(".")).length ? j.join(" ") : j[j.length - 2] + " " + j[j.length - 1], g.push(bu(i));
					for (k = 0, n = g.length; k < n; ++k) m = u + "," + g[k], p = g[k] + "," + u, -1 === q.indexOf(m) && -1 === q.indexOf(p) && (q.push(u + "," + g[k]), 0 === m.indexOf("AnimStateTransitionNode") ? (r[c = u.split(" ")[0]] || (r[c] = []), r[c].push(g[k])) : 0 === p.indexOf("AnimStateTransitionNode") && (r[c = g[k].split(" ")[0]] || (r[c] = []), r[c].push(u)))
				} for (y in r) 2 === r[y].length && q.push(r[y][0] + "," + r[y][1]);
		this.blueprint.nodesDisplayed.links = q
	}, B.prototype.addLinks = function() {
		for (var a, b, c, d, e = 0, f = this.blueprint.nodesDisplayed.nodes.length, g = 0, i = [], j = 0, l = "", k = "", n = [], m = null, p = [], q = null; e < f; ++e)
			for (g = 0, a = this.blueprint.nodesParsed[this.blueprint.nodesDisplayed.nodes[e].idx].node.pins.length; g < a; ++g)
				if (!1 !== this.blueprint.nodesParsed[this.blueprint.nodesDisplayed.nodes[e].idx].node.pins[g].isLinkedTo() && !this.blueprint.nodesParsed[this.blueprint.nodesDisplayed.nodes[e].idx].node.pins[g].isInput() && null !== (b = h(this.blueprint.nodesParsed[this.blueprint.nodesDisplayed.nodes[e].idx].node.objectDefinition, "Name")))
					for (m = b.value + " " + this.blueprint.nodesParsed[this.blueprint.nodesDisplayed.nodes[e].idx].node.pins[g].id, j = 0, c = (i = this.blueprint.nodesParsed[this.blueprint.nodesDisplayed.nodes[e].idx].node.pins[g].getLinks()).length; j < c; ++j) l = m + "," + i[j], k = i[j] + "," + m, -1 === n.indexOf(l) && -1 === n.indexOf(k) && (n.push(m + "," + i[j]), 0 === l.indexOf("AnimStateTransitionNode") ? (p[d = m.split(" ")[0]] || (p[d] = []), p[d].push(i[j])) : 0 === k.indexOf("AnimStateTransitionNode") && (p[d = i[j].split(" ")[0]] || (p[d] = []), p[d].push(m)));
		for (q in p) 2 === p[q].length && n.push(p[q][0] + "," + p[q][1]);
		this.blueprint.nodesDisplayed.links = n
	}, B.prototype.initBusEnvironment = function() {}, B.prototype.initEnvironment = function() {
		var a, b, c = performance.now(),
			d = [],
			e = 0;
		this.instances.environment.createPlayground(this.data.options.type) && (this.elapsedTime.createPlayground = performance.now() - c, b = by.call(this), this.data.htmlElement.querySelector(".canvas").style.transform = z(b.x, b.y, 1), this.data.htmlElement.querySelector(".reference").style.transform = z(b.x, b.y, 1), setTimeout(function() {
			for (c = performance.now(), this.instances.environment.updateLoading("DISPLAY NODES..."), d = [], a = this.blueprint.nodesDisplayed.nodes.length; e < a; ++e) d.push(this.blueprint.nodesParsed[this.blueprint.nodesDisplayed.nodes[e].idx].node);
			try {
				this.instances.environment.displayNodesInViewport(d)
			} catch (a) {
				this.error = {
					type: "DISPLAY_NODES",
					message: a.message,
					displayedMessage: ""
				}, a.NodeGUID ? this.error.displayedMessage = "FAILED DISPLAY BLUEPRINT: Error on NodeGUID " + a.NodeGUID : this.error.displayedMessage = "FAILED DISPLAY BLUEPRINT: Error on Node #" + a.NodeIdx, this.blueprint.nodesParsed = [], this.blueprint.nodesDisplayed.nodes = [], this.blueprint.nodesDisplayed.links = [], this.blueprint.nodesDisplayed.ids.nodes = [], this.blueprint.nodesDisplayed.ids.pins = []
			}
			this.elapsedTime.displayNodesInViewport = performance.now() - c, setTimeout(function() {
				c = performance.now(), this.instances.environment.updateLoading("DRAW LINKS..."), this.instances.environment.drawLinks(this.blueprint.nodesDisplayed.links), this.elapsedTime.drawLinks = performance.now() - c, setTimeout(function() {
					this.bus.emit("init_interactor")
				}.bind(this), 0)
			}.bind(this), 0)
		}.bind(this), 0))
	}, B.prototype.initBusInteractor = function() {
		this.bus.listen("editor__expand_node", this.eventsBinding.expandNode), this.bus.listen("editor__reduce_node", this.eventsBinding.reduceNode), this.bus.listen("editor__generate_image", this.eventsBinding.generateImage), this.bus.listen("re_draw_links", this.eventsBinding.reDrawLinks)
	}, B.prototype.initInteractor = function() {
		var a = performance.now();
		this.instances.environment.updateLoading("INIT INTERACTIONS..."), this.instances.interactor.startAllBinding(), this.elapsedTime.startAllBinding = performance.now() - a, this.instances.environment.addDataTimerInPlayground(this.elapsedTime), this.instances.environment.removeLoading(), a = by.call(this), this.instances.interactor.moveCanvasTo(a), this.bus.emit("init_updater")
	}, B.prototype.findNodeIdxWithId = function(a) {
		for (var b = 0, c = this.blueprint.nodesDisplayed.nodes.length; b < c; ++b)
			if (this.blueprint.nodesDisplayed.nodes[b].guid === a) return this.blueprint.nodesDisplayed.nodes[b].idx;
		return null
	}, B.prototype.initBusUpdater = function() {}, B.prototype.initUpdater = function() {
		var a = !0;
		null !== this.error && (a = !1, this.instances.environment.updateLoading(this.error.displayedMessage), this.instances.environment.showLoading()), null !== this.callbackInitialization && (this.callbackInitialization(a, this.error), this.callbackInitialization = null)
	}, B.prototype.updateBlueprintText = function(c, d) {
		var e, f = performance.now(),
			g = [],
			i = 0;
		if ("string" != typeof c) return new TypeError("Argument 'newBlueprintText' is incorrect, expect string, get " + typeof c);
		"function" == typeof d && (this.callbackInitialization = d), this.error = null, this.instances.environment.cleanViewport(), this.data.text = c, this.elapsedTime.startAllBinding = 0, this.elapsedTime.createPlayground = 0;
		try {
			this.parseBlueprint()
		} catch (c) {
			this.error = {
				type: "PARSE_BLUEPRINT",
				message: c.message,
				displayedMessage: "FAILED DISPLAY BLUEPRINT: Parsing Error"
			}, this.blueprint.nodesParsed = []
		}
		this.setDisplayedNodes(this.blueprint.nodesParsed, null), this.listIDs(), this.elapsedTime.parseBlueprint = performance.now() - f, setTimeout(function() {
			for (f = performance.now(), this.instances.environment.updateLoading("DISPLAY NODES..."), this.instances.environment.showLoading(), g = [], e = this.blueprint.nodesDisplayed.nodes.length; i < e; ++i) g.push(this.blueprint.nodesParsed[this.blueprint.nodesDisplayed.nodes[i].idx].node);
			try {
				this.instances.environment.displayNodesInViewport(g)
			} catch (c) {
				this.error = {
					type: "DISPLAY_NODES",
					message: c.message,
					displayedMessage: ""
				}, c.NodeGUID ? this.error.displayedMessage = "FAILED DISPLAY BLUEPRINT: Error on NodeGUID " + c.NodeGUID : this.error.displayedMessage = "FAILED DISPLAY BLUEPRINT: Error on Node #" + c.NodeIdx, this.blueprint.nodesParsed = [], this.blueprint.nodesDisplayed.nodes = [], this.blueprint.nodesDisplayed.links = [], this.blueprint.nodesDisplayed.ids.nodes = [], this.blueprint.nodesDisplayed.ids.pins = []
			}
			this.elapsedTime.displayNodesInViewport = performance.now() - f, setTimeout(function() {
				f = performance.now(), this.instances.environment.updateLoading("DRAW LINKS..."), this.instances.environment.drawLinks(this.blueprint.nodesDisplayed.links), this.elapsedTime.drawLinks = performance.now() - f, setTimeout(function() {
					var b;
					this.instances.environment.addDataTimerInPlayground(this.elapsedTime), this.instances.environment.removeLoading(), b = by.call(this), this.instances.interactor.moveCanvasTo(b), setTimeout(function() {
						var a = !0;
						null !== this.error && (a = !1, this.instances.environment.updateLoading(this.error.displayedMessage), this.instances.environment.showLoading()), null !== this.callbackInitialization && (this.callbackInitialization(a, this.error), this.callbackInitialization = null)
					}.bind(this), 0)
				}.bind(this), 0)
			}.bind(this), 0)
		}.bind(this), 0)
	}, B.prototype.stop = function() {
		this.instances.interactor.stop(), this.instances.interactor = null, this.instances.environment.stop(), this.instances.environment = null, this.instances.updater = null, this.bus = null
	}, B.prototype.getBlueprintData = function() {
		return this.blueprint
	}, B.prototype.moveTo = function(a, b, c) {
		this.instances.interactor.setScale(c), this.instances.interactor.moveCanvasTo({
			x: a,
			y: b
		})
	};
	var cI = 0,
		cJ = 2,
		bK = 16,
		bA = .08,
		cc = 7,
		cd = -12,
		ce = "READ",
		cK = "WRITE",
		cL = "WIN",
		cf = "MAC",
		cM = "250px",
		bs = "DOWN",
		bL = "MOVE",
		bM = "UP";

	function cN() {
		return 0 === window.navigator.platform.toUpperCase().indexOf("MAC") ? cf : cL
	}

	function cg(a) {
		return (a = a / bK) - (a = a >> 0) <= .5 ? a * bK : (1 + a) * bK
	}

	function ch(a) {
		var a = a.getBoundingClientRect(),
			b = a.top,
			c = a.left;
		return [
			[c, c + a.width],
			[b, b + a.height]
		]
	}

	function ci(a, b) {
		var c = 0,
			d = 0,
			c = a[0] < b[0] ? a : b,
			d = a[0] < b[0] ? b : a;
		return c[1] > d[0] || c[0] === d[0]
	}

	function cO(a, b) {
		a = ch(a), b = ch(b);
		return ci(a[0], b[0]) && ci(a[1], b[1])
	}

	function E(a, b, c) {
		var d, e = a.parentNode,
			f = 0,
			g = 0;
		if (null === e || void 0 === e.classList) return null;
		for (d = b.length; g < d; ++g) e.classList.contains(b[g]) && (f += 1);
		return f === d ? e : 0 < c ? E(e, b, c - 1) : null
	}

	function z(a, b, c) {
		return "translate(" + a + "px," + b + "px) scale(" + c + ")"
	}

	function bN(a) {
		var b = {
				x: 0,
				y: 0,
				scale: 1
			},
			c = -1,
			d = [],
			e = a.indexOf("translate("),
			f = a.indexOf("scale(");
		return -1 !== e && -1 !== (c = a.indexOf(")", e + 10)) && (d = a.substring(e + 10, c).split(","), b.x = d[0].replace("px", "") >> 0, 1 < d.length && (b.y = d[1].replace("px", "") >> 0)), -1 !== f && -1 !== (c = a.indexOf(")", f + 6)) && (b.scale = parseFloat(a.substring(f + 6, c)), isNaN(b.scale) && (b.scale = 1)), b
	}

	function s(a, b, c) {
		this.dom = {
			breadcrumb: null,
			btns: null,
			canvas: null,
			frame: null,
			layer: null,
			multiSelect: null,
			nodeMoving: null,
			nodesMoving: [],
			overlay: null,
			panel: null,
			panelBtns: [],
			reference: null,
			root: a,
			zoom: null
		}, this.bus = c, this.events = {
			pointerDown: null,
			pointerMove: null,
			pointerUp: null
		}, this.states = {
			current: null,
			previous: null,
			mode: ce,
			platform: cN(),
			isTouch: !1,
			isLongpress: !1,
			isLeftClick: !1,
			isRightClick: !1,
			isPanelOpen: !1,
			inPlayground: !1,
			isMovingNode: !1,
			inFullscreen: !1,
			isTreatingPaste: !1,
			isGeneratingImage: !1,
			timeoutLongpress: null,
			timeoutOverlay: null,
			nodeIDsAlreadySelected: [],
			multiSelectHasCtrlKey: !1,
			multiSelectHasShiftKey: !1,
			wheelAccumulator: 0
		}, this.eventsBinding = {
			breadcrumb: this.eventBreadcrumb.bind(this),
			contextMenu: this.eventContextMenu.bind(this),
			copyNodes: this.eventCopyNodes.bind(this),
			exitFullscreenHandlerForResizing: this.eventExitFullscreenHandlerForResizing.bind(this),
			focusPlayground: this.eventFocusPlayground.bind(this),
			headerButtons: this.eventHeaderButtons.bind(this),
			hideOverlayForZoom: this.eventHideOverlayForZoom.bind(this),
			panelButtons: this.eventPanelButtons.bind(this),
			pasteNodes: this.eventPasteNodes.bind(this),
			pointerDoubleClick: this.eventPointerDoubleClick.bind(this),
			pointerDown: this.eventPointerDown.bind(this),
			pointerLongpress: this.eventPointerLongpress.bind(this),
			pointerMove: this.eventPointerMove.bind(this),
			pointerPinch: this.eventPointerPinch.bind(this),
			pointerUp: this.eventPointerUp.bind(this),
			pointerWheel: this.eventPointerWheel.bind(this),
			doMoveCanvas: this.eventDoMoveCanvas.bind(this)
		}, this.pinchDistance = null, this.canvas = {
			x: 0,
			y: 0
		}, this.resetPosition = {
			x: 0,
			y: 0
		}, this.scale = 1, this.startPinLink = null, this.currentZoom = 0, this.lastUpdateCalled = null, this.frameSize = b.height || cM
	}
	s.prototype.startAllBinding = function() {
		var a, b = 0;
		for (this.dom.frame = this.dom.root.querySelector(".frame"), this.dom.layer = this.dom.root.querySelector(".layer"), this.dom.reference = this.dom.root.querySelector(".reference"), this.dom.canvas = this.dom.root.querySelector(".canvas"), this.dom.btns = this.dom.root.querySelector(".frame-header__buttons"), this.dom.panel = this.dom.root.querySelector(".panel"), this.dom.panelBtns = this.dom.root.querySelectorAll(".panel .panel__button"), this.dom.zoom = this.dom.root.querySelector(".frame-header__current-zoom"), this.dom.overlay = this.dom.root.querySelector(".overlay"), this.dom.breadcrumb = this.dom.root.querySelector(".frame-header__breadcrumb"), window.addEventListener("mousedown", this.eventsBinding.focusPlayground), window.addEventListener("touchstart", this.eventsBinding.focusPlayground), this.dom.layer.addEventListener("mousedown", this.eventsBinding.pointerDown), this.dom.layer.addEventListener("touchstart", this.eventsBinding.pointerDown, {
				passive: !1
			}), window.addEventListener("mousemove", this.eventsBinding.pointerMove), window.addEventListener("touchmove", this.eventsBinding.pointerMove, {
				passive: !1
			}), window.addEventListener("mouseup", this.eventsBinding.pointerUp), window.addEventListener("touchend", this.eventsBinding.pointerUp, {
				passive: !1
			}), this.dom.layer.addEventListener("wheel", this.eventsBinding.pointerWheel), this.dom.layer.addEventListener("dblclick", this.eventsBinding.pointerDoubleClick), document.addEventListener("copy", this.eventsBinding.copyNodes), document.addEventListener("paste", this.eventsBinding.pasteNodes), this.dom.btns.addEventListener("click", this.eventsBinding.headerButtons), document.addEventListener("webkitfullscreenchange", this.eventsBinding.exitFullscreenHandlerForResizing), document.addEventListener("fullscreenchange", this.eventsBinding.exitFullscreenHandlerForResizing), this.dom.breadcrumb.addEventListener("click", this.eventsBinding.breadcrumb), a = this.dom.panelBtns.length; b < a; ++b) this.dom.panelBtns[b].addEventListener("click", this.eventsBinding.panelButtons);
		this.dom.layer.addEventListener("contextmenu", this.eventsBinding.contextMenu), this.bus.listen("interactor__expand_node", this.expandNode.bind(this)), this.bus.listen("interactor__reduce_node", this.reduceNode.bind(this))
	}, s.prototype.eventDoMoveCanvas = function() {
		this.moveCanvas(this.events.pointerMove), this.lastUpdateCalled = null
	}, s.prototype.eventFocusPlayground = function(a) {
		for (var b = 0, c = a.composedPath(), d = c.length; b < d; ++b)
			if (c[b] === this.dom.root) return void(this.states.inPlayground = !0);
		this.states.inPlayground = !1
	}, s.prototype.eventPointerDown = function(a) {
		var b;
		return null === this.states.current && (this.states.current = bs, window.TouchEvent && a instanceof TouchEvent ? (this.states.inFullscreen ? (this.states.isTouch = !0, this.events.pointerDown = a.touches[0], this.startMovingCanvas(this.events.pointerDown)) : 1 === a.touches.length && (this.states.isTouch = !0, this.events.pointerDown = a.touches[0], this.states.timeoutLongpress = window.setTimeout(this.eventsBinding.pointerLongpress, 150), this.startMovingCanvas(this.events.pointerDown)), !0) : ((this.events.pointerDown = a).button === cI ? this.states.isLeftClick = !0 : a.button === cJ && (this.states.isRightClick = !0), this.states.platform === cf && !0 === a.ctrlKey && (this.states.isRightClick = !0), this.states.isRightClick || this.states.isTouch ? void this.startMovingCanvas(this.events.pointerDown) : this.states.mode === cK && null !== (b = E(a.target, ["pin"], 5)) ? !0 === a.ctrlKey || !0 === a.altKey ? void 0 : void this.drawNewLink(b, this.events.pointerDown) : null !== (b = E(a.target, ["node"], 5)) ? !1 === this.events.pointerDown.target.classList.contains("less") && !1 === this.events.pointerDown.target.classList.contains("more") && null === E(this.events.pointerDown.target, ["less"], 0) && null === E(this.events.pointerDown.target, ["more"], 0) && !1 === a.target.classList.contains("fake-input") && !1 === a.target.classList.contains("checkbox") && "SELECT" !== a.target.tagName ? (this.states.isMovingNode = !0, void this.startMovingNode(this.events.pointerDown, b)) : void 0 : void this.beginDrawMultiSelect(a)))
	}, s.prototype.eventPointerMove = function(a) {
		if (this.states.current !== bL && this.states.current !== bs) return !1;
		if (this.states.previous = this.states.current, this.states.current = bL, window.TouchEvent && a instanceof TouchEvent) {
			if (this.events.pointerMove = a.touches[0], !this.states.inFullscreen) {
				if (!this.states.isRightClick) return;
				if (!a.cancelable) return;
				a.preventDefault(), a.stopImmediatePropagation()
			}
			if (2 === a.touches.length) return void this.eventPointerPinch(a)
		} else this.events.pointerMove = a;
		if (this.states.isRightClick || this.states.isTouch) return this.lastUpdateCalled && cancelAnimationFrame(this.lastUpdateCalled), void(this.lastUpdateCalled = requestAnimationFrame(this.eventsBinding.doMoveCanvas));
		null !== this.startPinLink ? this.moveLink(this.events.pointerMove) : !0 === this.states.isMovingNode ? this.moveNode(this.events.pointerMove) : !1 === this.events.pointerDown.target.classList.contains("fake-input") && !1 === this.events.pointerDown.target.classList.contains("checkbox") && !1 === this.events.pointerDown.target.classList.contains("less") && !1 === this.events.pointerDown.target.classList.contains("more") && null === E(this.events.pointerDown.target, ["less"], 0) && null === E(this.events.pointerDown.target, ["more"], 0) && this.drawMultiSelect(this.events.pointerMove)
	}, s.prototype.eventPointerUp = function(a) {
		var b, c, d, e = [],
			f = 0;
		if (this.states.current !== bL && this.states.current !== bs) return !1;
		if (b = this.states.previous, c = this.states.current, this.states.previous = this.states.current, this.states.current = bM, window.TouchEvent && a instanceof TouchEvent) return 0 < a.touches.length ? (this.states.previous = b, void(this.states.current = c)) : (this.events.pointerUp = a.touches[0], this.states.isTouch = !1, this.states.isLongpress = !1, this.states.timeoutLongpress && clearTimeout(this.states.timeoutLongpress), this.states.previous = bM, this.states.current = null, void(this.states.isRightClick = !1));
		if (this.events.pointerUp = a, this.events.pointerDown.target === this.dom.canvas && this.states.previous === bs && this.unselectAllNodes(), null !== this.dom.nodeMoving && this.states.previous === bs)
			if (this.events.pointerDown.shiftKey) this.dom.nodeMoving.classList.add("selected");
			else if (this.events.pointerDown.ctrlKey) this.dom.nodeMoving.classList.contains("selected") ? this.dom.nodeMoving.classList.remove("selected") : this.dom.nodeMoving.classList.add("selected");
		else {
			for (d = (e = this.dom.canvas.querySelectorAll(".node.selected")).length; f < d; ++f) e[f].classList.remove("selected");
			this.dom.nodeMoving.classList.add("selected")
		}!0 === this.events.pointerDown.target.classList.contains("less") || null !== E(this.events.pointerDown.target, ["less"], 0) ? this.sendReduceNode(E(this.events.pointerDown.target, ["node"], 5)) : !0 !== this.events.pointerDown.target.classList.contains("more") && null === E(this.events.pointerDown.target, ["more"], 0) || this.sendExpandNode(E(this.events.pointerDown.target, ["node"], 5)), null !== this.startPinLink && this.endLink(this.events.pointerUp), this.removeMultiSelect(), this.states.isLeftClick = !1, this.states.isRightClick = !1, this.states.isTouch = !1, this.states.isLongpress = !1, this.states.timeoutLongpress && clearTimeout(this.states.timeoutLongpress), this.states.previous = bM, this.states.current = null, this.startPinLink = null, this.states.isMovingNode = !1, this.dom.nodeMoving = null, this.dom.nodesMoving = [], this.dom.canvas.style.cursor = "default"
	}, s.prototype.eventPointerLongpress = function(a) {
		this.states.isLongpress = !0, this.states.isRightClick = !0
	}, s.prototype.eventPointerWheel = function(a) {
		if (!0 === a.ctrlKey || !0 === a.metaKey) return !0;
		else {
			if (this.eventsBinding.hideOverlayForZoom(), a.preventDefault(), this.states.isRightClick || this.states.isLeftClick) return !1;
			if (a.deltaY < 100) {
				if (this.states.wheelAccumulator += a.deltaY, Math.abs(this.states.wheelAccumulator) < 25) return !1;
				this.states.wheelAccumulator = 0
			}
			a.deltaY < 0 ? this.zoomIn(a, !1) : this.zoomOut(a)
		}
	}, s.prototype.eventPointerPinch = function(a) {
		var b = (a.touches[0].pageX - a.touches[1].pageX) * (a.touches[0].pageX - a.touches[1].pageX),
			c = (a.touches[0].pageY - a.touches[1].pageY) * (a.touches[0].pageY - a.touches[1].pageY),
			b = Math.sqrt(b + c);
		null === this.pinchDistance ? this.pinchDistance = b : (a.pageX = a.touches[0].pageX, a.pageY = a.touches[0].pageY, 50 < (c = this.pinchDistance - b) ? (this.zoomOut(a), this.pinchDistance = b, this.diffX = a.touches[0].clientX - this.canvas.x, this.diffY = a.touches[0].clientY - this.canvas.y) : c < -50 && (this.zoomIn(a, !0), this.pinchDistance = b, this.diffX = a.touches[0].clientX - this.canvas.x, this.diffY = a.touches[0].clientY - this.canvas.y))
	}, s.prototype.eventPointerDoubleClick = function(a) {
		a = E(a.target, ["node"], 5);
		null !== a && this.bus.emit("dblclick", [a.getAttribute("data-id")])
	}, s.prototype.eventExitFullscreenHandlerForResizing = function() {
		null !== document.fullscreenElement && null !== document.webkitFullscreenElement || (this.dom.frame.style.height = this.frameSize, this.dom.btns.querySelector(".frame-header__buttons-fullscreen").classList.remove("frame-header__buttons-fullscreen--exit"), this.states.inFullscreen = !1)
	}, s.prototype.eventContextMenu = function(a) {
		window.TouchEvent && this.events.pointerDown instanceof Touch || a.preventDefault()
	}, s.prototype.eventCopyNodes = function(a) {
		var b;
		!1 === this.states.inPlayground || a.target.classList.contains("fake-input") || 0 < (b = this.dom.root.querySelectorAll(".selected")).length && (this.copyNodesSelectedInClipboard(a, b), a.preventDefault())
	}, s.prototype.eventPasteNodes = function(a) {
		var b, c = null,
			d = null;
		if (!1 !== this.states.inPlayground) {
			if (a.target.classList.contains("fake-input")) return a.preventDefault(), void((c = window.getSelection()).getRangeAt && c.rangeCount && ((d = c.getRangeAt(0)).deleteContents(), b = document.createTextNode(a.clipboardData.getData("text/plain")), d.insertNode(b), d.setStartAfter(b), d.setEndAfter(b), c.removeAllRanges(), c.addRange(d)));
			if (this.states.mode !== ce) {
				if (this.states.isTreatingPaste = !0, "" === (b = a.clipboardData.getData("text/plain"))) return this.states.isTreatingPaste = !1;
				setTimeout(function() {
					this.states.isTreatingPaste = !1
				}.bind(this), 1e3), this.bus.emit("paste_text_from_clipboard", [b])
			}
		}
	}, s.prototype.eventHeaderButtons = function(a) {
		a.target.classList.contains("frame-header__buttons-fullscreen") ? this.fullscreenToggle() : a.target.classList.contains("frame-header__buttons-reset") ? (this.resetCanvas(), this.resetScale(), this.moveCanvasTo(this.resetPosition)) : a.target.classList.contains("frame-header__buttons-panel") && this.panelToggle()
	}, s.prototype.eventPanelButtons = function(a) {
		if ("generate-image" === a.target.getAttribute("data-feature-panel-name")) !0 !== this.states.isGeneratingImage && (this.states.isGeneratingImage = !0, this.dom.overlay.style.pointerEvents = "all", this.dom.overlay.style.display = "flex", this.dom.overlay.textContent = "Generating Image", this.bus.emit("editor__generate_image", [function() {
			this.dom.overlay.textContent = "", this.dom.overlay.style.display = "none", this.dom.overlay.style.pointerEvents = "none", this.states.isGeneratingImage = !1
		}.bind(this)]))
	}, s.prototype.eventBreadcrumb = function(a) {
		a.target.classList.contains("frame-header__breadcrumb-item") && (null !== (a = a.target.getAttribute("data-node-id")) && "" !== a ? this.bus.emit("dblclick", [a]) : this.bus.emit("dblclick", [null]))
	}, s.prototype.sendReduceNode = function(a) {
		a = a.getAttribute("data-id");
		this.bus.emit("editor__reduce_node", [a])
	}, s.prototype.sendExpandNode = function(a) {
		a = a.getAttribute("data-id");
		this.bus.emit("editor__expand_node", [a])
	}, s.prototype.expandNode = function(a) {
		for (var b = this.dom.root.querySelector('.node[data-id="' + a + '"]'), c = b.querySelectorAll(".body .pin"), d = 0, e = c.length, f = null; d < e; ++d) c[d].classList.remove("hidden");
		(f = b.querySelector(".more")).classList.remove("more"), f.classList.add("less"), this.dom.canvas.style.transform = z(0, 0, 1), this.bus.emit("re_draw_links", [a, function() {
			this.dom.canvas.style.transform = z(this.canvas.x, this.canvas.y, this.scale)
		}.bind(this)])
	}, s.prototype.reduceNode = function(a, b) {
		for (var c = this.dom.root.querySelector('.node[data-id="' + a + '"]'), d = c.querySelectorAll(".body .pin"), e = 0, f = d.length, g = null; e < f; ++e) - 1 === b.indexOf(d[e].getAttribute("data-id")) && d[e].classList.add("hidden");
		(g = c.querySelector(".less")).classList.remove("less"), g.classList.add("more"), this.dom.canvas.style.transform = z(0, 0, 1), this.bus.emit("re_draw_links", [a, function() {
			this.dom.canvas.style.transform = z(this.canvas.x, this.canvas.y, this.scale)
		}.bind(this)])
	}, s.prototype.startMovingCanvas = function(a) {
		this.eWi = parseInt(this.dom.canvas.style.width, 10), this.eHe = parseInt(this.dom.canvas.style.height, 10), this.diffX = a.clientX - this.canvas.x, this.diffY = a.clientY - this.canvas.y, this.dom.canvas.style.cursor = "grabbing"
	}, s.prototype.moveCanvas = function(a) {
		var b = a.clientX - this.diffX >> 0,
			a = a.clientY - this.diffY >> 0;
		this.canvas.x === b && this.canvas.y === a || (this.dom.canvas.style.transform = z(b, a, this.scale), this.dom.reference.style.transform = z(b, a, this.scale), this.canvas.x = b, this.canvas.y = a)
	}, s.prototype.startMovingNode = function(a, b) {
		var c = a.clientX / this.scale,
			a = a.clientY / this.scale,
			d = b.getBoundingClientRect().width / this.scale >> 0,
			e = b.getBoundingClientRect().height / this.scale >> 0,
			f = bN(b.style.transform);
		this.eWi = d, this.eHe = e, this.diffX = f.x + d - c, this.diffY = f.y + e - a, this.dom.nodeMoving = b, window.getSelection().removeAllRanges()
	}, s.prototype.moveNode = function(a) {
		var b, c, d, e, f = 0,
			g = 0,
			i = a.clientX / this.scale,
			a = a.clientY / this.scale,
			i = i + this.diffX - this.eWi + 2 * this.scale,
			a = a + this.diffY - this.eHe + 2 * this.scale,
			j = [],
			l = null,
			i = cg(i),
			a = cg(a);
		if (this.dom.nodeMoving.classList.contains("selected")) 0 === this.dom.nodesMoving.length && (this.dom.nodesMoving = this.dom.canvas.querySelectorAll(".node.selected"));
		else {
			for (f = 0, g = (j = this.dom.canvas.querySelectorAll(".node.selected")).length; f < g; ++f) j[f].classList.remove("selected");
			this.dom.nodeMoving.classList.add("selected"), this.dom.nodesMoving = []
		}
		if ((l = bN(this.dom.nodeMoving.style.transform)).x !== i || l.y !== a)
			if (this.dom.nodeMoving.style.transform = "translate(" + i + "px," + a + "px)", 1 < this.dom.nodesMoving.length) {
				for (b = i - l.x, c = a - l.y, f = 0, g = this.dom.nodesMoving.length; f < g; ++f) this.dom.nodesMoving[f] !== this.dom.nodeMoving && (d = (l = bN(this.dom.nodesMoving[f].style.transform)).x + b, e = l.y + c, this.dom.nodesMoving[f].style.transform = "translate(" + d + "px," + e + "px)");
				for (this.dom.canvas.style.transform = z(f = 0, 0, 1); f < g; ++f) this.drawLinks(this.dom.nodesMoving[f]);
				this.dom.canvas.style.transform = z(this.canvas.x, this.canvas.y, this.scale)
			} else this.dom.canvas.style.transform = z(0, 0, 1), this.drawLinks(this.dom.nodeMoving), this.dom.canvas.style.transform = z(this.canvas.x, this.canvas.y, this.scale)
	}, s.prototype.drawLinks = function(a) {
		a = a.getAttribute("data-id");
		this.bus.emit("re_draw_links", [a])
	}, s.prototype.moveLink = function(a) {
		this.bus.emit("move_link", [this.startPinLink, a, this.scale])
	}, s.prototype.drawNewLink = function(a, b) {
		this.startPinLink = a, this.bus.emit("draw_new_link", [a, b, this.scale])
	}, s.prototype.zoomIn = function(a, b) {
		var c, d, e = this.scale;
		this.currentZoom >= cc || 0 === this.currentZoom && !1 === a.ctrlKey && !1 === b || (this.currentZoom += 1, this.scale = bH(this.scale + bA, 2), b = cq(this.scale), d = this.dom.frame.getBoundingClientRect(), c = (a.pageX - (d.left + window.scrollX) - this.canvas.x) * b >> 0, a = (a.pageY - (d.top + window.scrollY) - this.canvas.y) * b >> 0, d = this.scale - e, this.canvas.x = this.canvas.x - c * d >> 0, this.canvas.y = this.canvas.y - a * d >> 0, this.dom.canvas.style.transform = z(this.canvas.x, this.canvas.y, this.scale), this.dom.reference.style.transform = z(this.canvas.x, this.canvas.y, this.scale), this.updateZoomText())
	}, s.prototype.zoomOut = function(a) {
		var b, c, d, e = this.scale;
		this.currentZoom <= cd || (0 < this.scale - bA && (this.scale = bH(this.scale - bA, 2), --this.currentZoom), b = cr(this.scale), d = this.dom.frame.getBoundingClientRect(), c = (a.pageX - (d.left + window.scrollX) - this.canvas.x) * b >> 0, a = (a.pageY - (d.top + window.scrollY) - this.canvas.y) * b >> 0, d = this.scale - e, this.canvas.x = this.canvas.x - c * d >> 0, this.canvas.y = this.canvas.y - a * d >> 0, this.dom.canvas.style.transform = z(this.canvas.x, this.canvas.y, this.scale), this.dom.reference.style.transform = z(this.canvas.x, this.canvas.y, this.scale), this.updateZoomText())
	}, s.prototype.updateZoomText = function() {
		var a = this.currentZoom;
		0 === this.currentZoom ? a = "1:1" : 0 < this.currentZoom && (a = "+" + this.currentZoom), this.dom.zoom.classList.add("update"), this.dom.zoom.textContent = "Zoom " + a, setTimeout(function() {
			this.dom.zoom.classList.remove("update")
		}.bind(this), 40)
	}, s.prototype.endLink = function(a) {
		a.target.classList.contains("clink") ? this.bus.emit("new_link", [this.startPinLink, a.target, this.scale]) : this.dom.root.querySelector("svg.moving").remove()
	}, s.prototype.unselectAllNodes = function() {
		for (var a = this.dom.canvas.querySelectorAll(".node.selected"), b = 0, c = a.length; b < c; ++b) a[b].classList.remove("selected");
		window.getSelection().removeAllRanges()
	}, s.prototype.beginDrawMultiSelect = function(a) {
		for (var b = this.dom.canvas.querySelectorAll(".node.selected"), c = 0, d = b.length; c < d; ++c) this.states.nodeIDsAlreadySelected.push(b[c].getAttribute("data-id"));
		this.states.multiSelectHasCtrlKey = a.ctrlKey || a.metaKey, this.states.multiSelectHasShiftKey = a.shiftKey
	}, s.prototype.drawMultiSelect = function(a) {
		var b, c, d = {},
			e = {},
			f = 0,
			g = 0,
			i = [],
			j = 0,
			l = !1;
		for (this.dom.canvas.style.transform = z(this.canvas.x, this.canvas.y, 1), b = {
				top: (b = this.dom.canvas.getBoundingClientRect()).top + window.scrollY,
				left: b.left + window.scrollX
			}, d = {
				left: this.events.pointerDown.pageX / this.scale,
				top: this.events.pointerDown.pageY / this.scale
			}, e = {
				left: a.pageX / this.scale,
				top: a.pageY / this.scale
			}, d.top -= b.top / this.scale, d.left -= b.left / this.scale, e.top -= b.top / this.scale, e.left -= b.left / this.scale, a = Math.min(d.left, e.left), b = Math.min(d.top, e.top), 0 === (f = Math.max(d.left, e.left) - Math.min(d.left, e.left)) && (f = 2), 0 === (g = Math.max(d.top, e.top) - Math.min(d.top, e.top)) && (g = 2), null === this.dom.multiSelect && (this.dom.canvas.appendChild(bZ("div", ["multi-select"], [])), this.dom.multiSelect = this.dom.canvas.querySelector(".multi-select")), this.dom.multiSelect.style.left = a + "px", this.dom.multiSelect.style.top = b + "px", this.dom.multiSelect.style.width = f + "px", this.dom.multiSelect.style.height = g + "px", this.dom.multiSelect.style.borderImageWidth = (6 / this.scale >> 0) + "px", c = (i = this.dom.canvas.querySelectorAll(".node")).length; j < c; ++j) this.states.multiSelectHasShiftKey && -1 !== this.states.nodeIDsAlreadySelected.indexOf(i[j].getAttribute("data-id")) || (l = cO(this.dom.multiSelect, i[j]), (l = this.states.multiSelectHasCtrlKey && -1 !== this.states.nodeIDsAlreadySelected.indexOf(i[j].getAttribute("data-id")) ? !l : l) ? i[j].classList.add("selected") : i[j].classList.remove("selected"));
		this.dom.canvas.style.transform = z(this.canvas.x, this.canvas.y, this.scale)
	}, s.prototype.removeMultiSelect = function() {
		null !== this.dom.multiSelect && this.dom.multiSelect.remove(), this.dom.multiSelect = null, this.states.nodeIDsAlreadySelected = [], this.states.multiSelectHasCtrlKey = !1, this.states.multiSelectHasShiftKey = !1
	}, s.prototype.copyNodesSelectedInClipboard = function(a, b) {
		for (var c = [], d = 0, e = b.length; d < e; ++d) c.push(b[d].getAttribute("data-id"));
		this.bus.emit("copy_nodes_to_clipboard", [a, c])
	}, s.prototype.moveCanvasTo = function(a) {
		this.canvas.x = a.x, this.canvas.y = a.y, this.resetPosition.x = this.canvas.x, this.resetPosition.y = this.canvas.y, this.dom.canvas.style.transform = z(a.x, a.y, this.scale), this.dom.reference.style.transform = z(a.x, a.y, this.scale)
	}, s.prototype.setScale = function(a) {
		var b = 0,
			c = .04;
		for (this.scale = a, this.currentZoom = 0, b = cd; b <= cc; ++b) {
			if (c === a) {
				this.currentZoom = b;
				break
			}
			c = bH(c + bA, 2)
		}
		this.updateZoomText()
	}, s.prototype.panelToggle = function() {
		this.states.isPanelOpen ? this.dom.root.querySelector(".panel").style.display = "none" : this.dom.root.querySelector(".panel").style.display = "block", this.states.isPanelOpen = !this.states.isPanelOpen
	}, s.prototype.fullscreenToggle = function() {
		var a = this.dom.root.querySelector(".bue-render");
		document.fullscreenElement || document.webkitFullscreenElement ? (this.dom.frame.style.height = this.frameSize, this.dom.btns.querySelector(".frame-header__buttons-fullscreen").classList.remove("frame-header__buttons-fullscreen--exit"), this.states.inFullscreen = !1, document.exitFullscreen ? document.exitFullscreen() : document.webkitCancelFullScreen && document.webkitCancelFullScreen()) : a.requestFullscreen ? (a.requestFullscreen(), this.dom.frame.style.height = window.screen.height + "px", this.dom.btns.querySelector(".frame-header__buttons-fullscreen").classList.add("frame-header__buttons-fullscreen--exit"), this.states.inFullscreen = !0) : a.webkitRequestFullscreen && (a.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT), this.dom.frame.style.height = window.screen.height + "px", this.dom.btns.querySelector(".frame-header__buttons-fullscreen").classList.add("iframe-header__buttons-fullscreen--exit"), this.states.inFullscreen = !0)
	}, s.prototype.resetCanvas = function() {
		this.scale = 1, this.dom.canvas.style.transform = z(this.resetPosition.x, this.resetPosition.y, 1), this.dom.reference.style.transform = z(this.resetPosition.x, this.resetPosition.y, 1), this.currentZoom = 0, this.updateZoomText()
	}, s.prototype.resetScale = function() {
		this.scale = 1, this.dom.canvas.style.transform = z(this.canvas.x, this.canvas.y, this.scale), this.dom.reference.style.transform = z(this.canvas.x, this.canvas.y, this.scale), this.currentZoom = 0, this.updateZoomText()
	}, s.prototype.showOverlayForZoom = function(a) {
		this.dom.overlay.style.display = "flex", this.dom.overlay.textContent = a, null !== this.states.timeoutOverlay && clearTimeout(this.states.timeoutOverlay), this.states.timeoutOverlay = window.setTimeout(this.eventsBinding.hideOverlayForZoom, 1500)
	}, s.prototype.eventHideOverlayForZoom = function() {
		this.dom.overlay.style.display = "none"
	}, s.prototype.stop = function() {
		var a, b = 0;
		if (window.removeEventListener("mousedown", this.eventsBinding.focusPlayground), window.removeEventListener("touchstart", this.eventsBinding.focusPlayground), this.dom.canvas && (this.dom.canvas.removeEventListener("mousedown", this.eventsBinding.pointerDown), this.dom.canvas.removeEventListener("touchstart", this.eventsBinding.pointerDown, {
				passive: !1
			})), window.removeEventListener("mousemove", this.eventsBinding.pointerMove), window.removeEventListener("touchmove", this.eventsBinding.pointerMove, {
				passive: !1
			}), window.removeEventListener("mouseup", this.eventsBinding.pointerUp), window.removeEventListener("touchend", this.eventsBinding.pointerUp, {
				passive: !1
			}), this.dom.canvas && (this.dom.canvas.removeEventListener("wheel", this.eventsBinding.pointerWheel), this.dom.canvas.removeEventListener("dblclick", this.eventsBinding.pointerDoubleClick)), document.removeEventListener("copy", this.eventsBinding.copyNodes), document.removeEventListener("paste", this.eventsBinding.pasteNodes), this.dom.btns && this.dom.btns.removeEventListener("click", this.eventsBinding.headerButtons), document.removeEventListener("webkitfullscreenchange", this.eventsBinding.exitFullscreenHandlerForResizing), document.removeEventListener("fullscreenchange", this.eventsBinding.exitFullscreenHandlerForResizing), this.dom.breadcrumb && this.dom.breadcrumb.removeEventListener("click", this.eventsBinding.breadcrumb), this.dom.panelBtns)
			for (a = this.dom.panelBtns.length; b < a; ++b) this.dom.panelBtns[b].removeEventListener("click", this.eventsBinding.panelButtons);
		this.dom.canvas && this.dom.canvas.removeEventListener("contextmenu", this.eventsBinding.contextMenu), this.dom.breadcrumb = null, this.dom.btns = null, this.dom.canvas = null, this.dom.frame = null, this.dom.multiSelect = null, this.dom.nodeMoving = null, this.dom.nodesMoving = [], this.dom.overlay = null, this.dom.panel = null, this.dom.panelBtns = [], this.dom.root = null, this.dom.zoom = null
	};
	var bg = [{
		blueprintClass: "EdGraphNode_Comment",
		NodeConstructor: K
	}, {
		blueprintClass: "K2Node_VariableGet",
		NodeConstructor: V
	}, {
		blueprintClass: "K2Node_Literal",
		NodeConstructor: V
	}, {
		blueprintClass: "K2Node_VariableSet",
		NodeConstructor: W
	}, {
		blueprintClass: "K2Node_CreateDelegate",
		NodeConstructor: L
	}, {
		blueprintClass: "K2Node_Event",
		NodeConstructor: M
	}, {
		blueprintClass: "K2Node_ComponentBoundEvent",
		NodeConstructor: M
	}, {
		blueprintClass: "K2Node_InputAxisEvent",
		NodeConstructor: M
	}, {
		blueprintClass: "K2Node_ActorBoundEvent",
		NodeConstructor: M
	}, {
		blueprintClass: "K2Node_CustomEvent",
		NodeConstructor: X
	}, {
		blueprintClass: "K2Node_IfThenElse",
		NodeConstructor: bh
	}, {
		blueprintClass: "K2Node_InputAction",
		NodeConstructor: bi
	}, {
		blueprintClass: "K2Node_Self",
		NodeConstructor: bj
	}, {
		blueprintClass: "K2Node_Knot",
		NodeConstructor: Y
	}, {
		blueprintClass: "K2Node_InputKey",
		NodeConstructor: I
	}, {
		blueprintClass: "K2Node_InputTouch",
		NodeConstructor: I
	}, {
		blueprintClass: "K2Node_InputAxisKeyEvent",
		NodeConstructor: I
	}, {
		blueprintClass: "MaterialGraphNode_Root",
		NodeConstructor: bt
	}, {
		blueprintClass: "MaterialGraphNode_Comment",
		NodeConstructor: N
	}, {
		blueprintClass: "MaterialGraphNode",
		NodeConstructor: Z
	}, {
		blueprintClass: "K2Node_EnumEquality",
		NodeConstructor: S
	}, {
		blueprintClass: "K2Node_EnumInequality",
		NodeConstructor: S
	}, {
		blueprintClass: "K2Node_GetEnumeratorNameAsString",
		NodeConstructor: O
	}, {
		blueprintClass: "K2Node_CastByteToEnum",
		NodeConstructor: O
	}, {
		blueprintClass: "K2Node_ConvertAsset",
		NodeConstructor: O
	}, {
		blueprintClass: "K2Node_Composite",
		NodeConstructor: ba
	}, {
		blueprintClass: "AnimStateNode",
		NodeConstructor: bk
	}, {
		blueprintClass: "AnimStateEntryNode",
		NodeConstructor: bB
	}, {
		blueprintClass: "AnimStateTransitionNode",
		NodeConstructor: bl
	}, {
		blueprintClass: "MetasoundEditor",
		NodeConstructor: F
	}, {
		blueprintClass: "K2Node_EnhancedInputAction",
		NodeConstructor: bm
	}, {
		blueprintClass: "K2Node_InputDebugKey",
		NodeConstructor: I
	}, {
		blueprintClass: "NiagaraClipboardContent",
		NodeConstructor: bC
	}, {
		blueprintClass: "NiagaraNodeReroute",
		NodeConstructor: Y
	}, {
		blueprintClass: "NiagaraEditor",
		NodeConstructor: P
	}, {
		blueprintClass: "PCGEditorGraphNode",
		NodeConstructor: G
	}, {
		blueprintClass: "K2Node_GetEngineSubsystem",
		NodeConstructor: bb
	}, {
		blueprintClass: "K2Node_GetSubsystem",
		NodeConstructor: bb
	}];

	function x() {
		this.text = "", this.lines = [], this.countLines = 0, this.nodes = [], this.currentNode = null, this.previousNodes = [], this.type = "blueprint", this.isBelow413Version = !1, this.isBelow52Version = !1, this.graphPins = {}, this.inGraphPinDeclaration = !1, this.inGraphPinDefinition = !1, this.currentGraphPinName = null
	}
	x.prototype.parseText = function(a) {
		return this.text = a, this.detectUnrealVersion(), this.cleanText(), this.detectType(), this.splitTextInCleanLines(), this.parseLines(), this.inspectNodes(), this.nodes
	}, x.prototype.detectUnrealVersion = function() {
		-1 === this.text.indexOf("CustomProperties Pin") && -1 === this.text.indexOf("ExportedNodes") && (this.isBelow413Version = !0), -1 === this.text.indexOf('"NodeGuid"') && (this.isBelow52Version = !0)
	}, x.prototype.cleanText = function() {
		this.text = this.text.trim()
	}, x.prototype.detectType = function() {
		-1 !== this.text.indexOf("BehaviorTreeGraphNode_") || -1 !== this.text.indexOf("BehaviorTreeDecoratorGraphNode_") ? this.type = "Behavior Tree" : -1 !== this.text.indexOf("MaterialGraphNode") ? this.type = "Material" : -1 !== this.text.indexOf("AnimGraphNode_") ? this.type = "Animation" : -1 !== this.text.indexOf("/Script/MetasoundEditor") ? this.type = "Metasound" : -1 !== this.text.indexOf("/Script/NiagaraEditor") ? this.type = "Niagara" : -1 !== this.text.indexOf("PCGEditorGraphNode") && (this.type = "PCG")
	}, x.prototype.splitTextInCleanLines = function() {
		var a = 0;
		for (this.lines = this.text.split(/\n/g), this.countLines = this.lines.length; a < this.countLines; ++a) this.lines[a] = this.lines[a].trim()
	}, x.prototype.parseLines = function() {
		for (var a, b = 0; b < this.countLines; ++b) {
			if (this.isBelow413Version) {
				if (this.isNewGraphPinDeclaration(this.lines[b])) {
					this.addGraphPinDeclaration(this.lines[b]), this.inGraphPinDeclaration = !0, this.inGraphPinDefinition = !1;
					continue
				}
				if (this.isEndGraphPinDeclaration(this.lines[b])) {
					this.inGraphPinDeclaration = !1, this.inGraphPinDefinition = !1;
					continue
				}
				if (this.isGraphPinDefinition(this.lines[b])) {
					this.inGraphPinDeclaration = !1, this.inGraphPinDefinition = !0;
					continue
				}
				if (this.isEndGraphPinDefinition(this.lines[b])) {
					this.inGraphPinDeclaration = !1, this.inGraphPinDefinition = !1;
					continue
				}
				if (!0 === this.inGraphPinDefinition) {
					a = R(this.lines[b]), this.graphPins[this.currentGraphPinName].addProp(a);
					continue
				}
			}
			this.isNewNode(this.lines[b]) ? this.createNode(this.lines[b]) : this.isEndNode(this.lines[b]) ? (this.isBelow413Version && (this.currentNode.pins = this.reorderGraphPins()), this.changeNodeIfNecessary(), this.closeNode()) : this.treatLine(this.lines[b])
		}
	}, x.prototype.isNewGraphPinDeclaration = function(a) {
		return !0 === /^Begin Object Class=EdGraphPin/i.test(a)
	}, x.prototype.addGraphPinDeclaration = function(a) {
		var a = bJ(a),
			a = h(a, "Name"),
			b = new v;
		b.isBelow413Version = !0, b.id = a.value, this.graphPins[b.id] = b
	}, x.prototype.extractGraphPinName = function(a) {
		var b = a.indexOf('Name="');
		return a.substring(b + 6).replace('"', "")
	}, x.prototype.isEndGraphPinDeclaration = function(a) {
		return !0 === /^End Object/i.test(a) && !0 === this.inGraphPinDeclaration
	}, x.prototype.isGraphPinDefinition = function(a) {
		if (!0 === /^Begin Object/i.test(a)) {
			if (-1 === a.indexOf("EdGraphPin")) return !1;
			if (a = this.extractGraphPinName(a), void 0 !== this.graphPins[a]) return this.currentGraphPinName = a, !0
		}
		return !1
	}, x.prototype.isEndGraphPinDefinition = function(a) {
		return !0 === /^End Object/i.test(a) && !0 === this.inGraphPinDefinition
	}, x.prototype.isNewNode = function(a) {
		return !0 === /^Begin Object/i.test(a)
	}, x.prototype.createNode = function(a) {
		null !== this.currentNode && this.previousNodes.push(this.currentNode), this.currentNode = this.nodeFactory(a), this.currentNode.treat(a), this.currentNode.isBelow413Version = this.isBelow413Version, this.currentNode.isBelow52Version = this.isBelow52Version
	}, x.prototype.reorderGraphPins = function() {
		for (var a = 0, b = this.currentNode.props.length, c = [], d = 0, e = []; a < b; ++a) "Pins(" === this.currentNode.props[a].name.substring(0, 5) && (e[d = parseInt(this.currentNode.props[a].name.substring(5, this.currentNode.props[a].name.length - 1), 10)] = this.currentNode.props[a].value.substring(11, this.currentNode.props[a].value.length - 1));
		for (d = 0; d < e.length; ++d) void 0 !== e[d] && void 0 !== this.graphPins[e[d]] && c.push(this.graphPins[e[d]]);
		return c
	}, x.prototype.isEndNode = function(a) {
		return !0 === /^End Object/i.test(a)
	}, x.prototype.changeNodeIfNecessary = function() {
		var a = null;
		if (this.isCustomNode()) return !1;
		this.isConvNode() ? (a = new O, this.replaceNode(a)) : this.isKismetMathNode() ? (a = new S, this.replaceNode(a)) : this.isDotNode() ? (a = new bn, this.replaceNode(a)) : this.isArrayNode() && (a = new bc, this.replaceNode(a))
	}, x.prototype.closeNode = function() {
		var a, b, c = null,
			d = 0;
		if (0 < this.previousNodes.length)(c = this.previousNodes.pop()).nodes.push(this.currentNode), this.currentNode = c;
		else {
			if ("NNiagaraClipboardContent" === this.currentNode.constructor.name)
				for (b = (a = (new x).parseText(this.currentNode.getExportedNodes())).length; d < b; ++d) this.nodes.push(a[d]);
			else this.nodes.push(this.currentNode);
			this.currentNode = null
		}
	}, x.prototype.treatLine = function(a) {
		null !== this.currentNode && this.currentNode.treat(a)
	}, x.prototype.nodeFactory = function(a) {
		for (var b = 0, c = bg.length, d = null; b < c; ++b)
			if (-1 !== a.indexOf(bg[b].blueprintClass)) {
				if (!this.isBelow52Version && "MaterialGraphNode" === bg[b].blueprintClass && null !== this.currentNode && -1 !== ["NMaterialGraphNode"].indexOf(this.currentNode.constructor.name)) return new bd;
				if ("K2Node_Composite" !== bg[b].blueprintClass || ((d = new bg[b].NodeConstructor).treat(a), d.isRealCompositeNode())) return new bg[b].NodeConstructor
			} return new(null !== this.currentNode && -1 !== ["NMaterialGraphNode"].indexOf(this.currentNode.constructor.name) ? bd : o)
	}, x.prototype.isCustomNode = function() {
		return !(this.currentNode instanceof o)
	}, x.prototype.isConvNode = function() {
		var a = null,
			b = h(this.currentNode.props, "FunctionReference");
		return null !== b && ((null !== (a = h(b.value, "MemberParent")) || null !== (a = h(b.value, "MemberParentClass"))) && (-1 !== h(b.value, "MemberName").value.indexOf("Conv_") && (-1 !== a.value.indexOf("KismetMathLibrary") || -1 !== a.value.indexOf("KismetStringLibrary") || -1 !== a.value.indexOf("KismetTextLibrary") || -1 !== a.value.indexOf("KismetSystemLibrary"))))
	}, x.prototype.isKismetMathNode = function() {
		var a = null,
			b = null,
			c = h(this.currentNode.props, "MacroGraphReference");
		return null !== c && (-1 !== (b = h(c.value, "MacroGraph")).value.indexOf("StandardMacros:Increment") || -1 !== b.value.indexOf("StandardMacros:Decrement")) || null !== (c = h(this.currentNode.props, "FunctionReference")) && (null === (a = h(c.value, "MemberParent")) && (a = h(c.value, "MemberParentClass")), b = h(c.value, "MemberName"), null !== a && null !== b && (-1 !== a.value.indexOf("KismetMathLibrary") && !1 !== bY(b.value)))
	}, x.prototype.isDotNode = function() {
		var a = null,
			b = null,
			c = h(this.currentNode.props, "FunctionReference");
		return null !== c && (a = h(c.value, "MemberParent"), b = h(c.value, "MemberName"), null !== a && null !== b && !(-1 === b.value.indexOf("Dot_VectorVector") && -1 === b.value.indexOf("DotProduct2D") || -1 === a.value.indexOf("KismetMathLibrary") && -1 === a.value.indexOf("KismetStringLibrary")))
	}, x.prototype.isArrayNode = function() {
		var a = h(this.currentNode.objectDefinition, "Class");
		if (null !== a) {
			if (-1 !== a.value.indexOf("K2Node_GetArrayItem")) return !0;
			if (-1 !== a.value.indexOf("K2Node_CallArrayFunction")) return null !== (a = h(this.currentNode.props, "FunctionReference")) && !(-1 !== h(a.value, "MemberName").value.indexOf("Array_Set"))
		}
		return !1
	}, x.prototype.replaceNode = function(a) {
		var b = null;
		for (b in this.currentNode) Object.prototype.hasOwnProperty.call(this.currentNode, b) && (a[b] = this.currentNode[b]);
		this.currentNode = a
	}, x.prototype.inspectNodes = function() {
		for (var a = 0, b = this.nodes.length; a < b; ++a) this.nodes[a].callbackInspectNode(null, null)
	};

	function cj() {
		return this.title = {
			"Class'/Script/HiveMPSDK.admin_session_AdministrationSession_sessionDELETE'": "Explicitly delete an administrative session",
			"Class'/Script/HiveMPSDK.admin_session_AdministrationSession_sessionGET'": "Retrieves details about an existing administrative session",
			"Class'/Script/HiveMPSDK.admin_session_AdministrationSession_sessionPOST'": "Extend the expiry of your current administrative session",
			"Class'/Script/HiveMPSDK.admin_session_AdministrationSession_sessionPUT'": "Creates a new administrative session",
			"Class'/Script/HiveMPSDK.admin_session_AdministrationSession_switchPUT'": "Creates a new administrative session that targets the specified project",
			"Class'/Script/HiveMPSDK.admin_session_AdministrationUser_userGET'": "Retrieves details about an administration user account",
			"Class'/Script/HiveMPSDK.admin_session_AdministrationUser_userPUT'": "Requests the creation of a new administration user account",
			"Class'/Script/HiveMPSDK.admin_session_AdministrationUser_verifyPOST'": "Verifies an account using a code that the system provided in the email",
			"Class'/Script/HiveMPSDK.admin_session_News_newsRecentGET'": "Retrieve recent news articles about HiveMP",
			"Class'/Script/HiveMPSDK.admin_session_ProjectInfo_accessGET'": "Retrieves a list of users that have access to the project",
			"Class'/Script/HiveMPSDK.admin_session_ProjectInfo_accessProjectDELETE'": "Revokes project access from a specific project",
			"Class'/Script/HiveMPSDK.admin_session_ProjectInfo_accessProjectPUT'": "Grant all users of another project access to a specific project",
			"Class'/Script/HiveMPSDK.admin_session_ProjectInfo_accessUserDELETE'": "Revokes user access from a specific project",
			"Class'/Script/HiveMPSDK.admin_session_ProjectInfo_accessUserPUT'": "Grant a user access to a specific project",
			"Class'/Script/HiveMPSDK.admin_session_ProjectInfo_projectBillingAccountPUT'": "Set the billing account for a project",
			"Class'/Script/HiveMPSDK.admin_session_ProjectInfo_projectGET'": "Retrieves information about a specific project",
			"Class'/Script/HiveMPSDK.admin_session_ProjectInfo_projectPOST'": "Renames a project, or toggles whether it is active or not",
			"Class'/Script/HiveMPSDK.admin_session_ProjectInfo_projectPUT'": "Creates a new project",
			"Class'/Script/HiveMPSDK.admin_session_ProjectInfo_projectsGET'": "Retrieves a list of projects that the user has access to",
			"Class'/Script/HiveMPSDK.api_key_Key_keyDELETE'": "Deletes the API key immediately, preventing it from being used by future incoming requests.\r\nThis DOES NOT delete the associated session, which you will still be charged for. Therefore where\r\nappropriate you should use the relevant APIs to delete the session instead (which will cause the\r\nAPI key to be deleted)",
			"Class'/Script/HiveMPSDK.api_key_Key_keyGET'": "Retrieves public information about a public API key. This does not reveal the key itself",
			"Class'/Script/HiveMPSDK.api_key_Key_keyPOST'": "Updates the comment on an API key, if permitted for this API key type. The only API key\r\ntypes you can set a comment on are: 'public'",
			"Class'/Script/HiveMPSDK.api_key_Key_keyPublicPUT'": "Creates a new public API key with the specified comment",
			"Class'/Script/HiveMPSDK.api_key_Key_keysAccountGET'": "Retrieves a list of current API keys owned by a given user account",
			"Class'/Script/HiveMPSDK.api_key_Key_keysAdminUserGET'": "Retrieves a list of current API keys owned by a given administration user",
			"Class'/Script/HiveMPSDK.api_key_Key_keysGET'": "Retrieves a list of public API keys",
			"Class'/Script/HiveMPSDK.api_key_Key_revealPUT'": "Reveals the actual API key based on the hash, if permitted for this API key type. The only API key\r\ntypes you can reveal the API key for are: 'public'",
			"Class'/Script/HiveMPSDK.attribute_Attribute_attributeDELETE'": "Deletes an attribute from an object",
			"Class'/Script/HiveMPSDK.attribute_Attribute_attributeGET'": "Retrieves an attribute and it's value from an object",
			"Class'/Script/HiveMPSDK.attribute_Attribute_attributePUT'": "Sets or updates an attribute on an object",
			"Class'/Script/HiveMPSDK.attribute_Attribute_attributesGET'": "Retrieves a list of attribute keys on an object",
			"Class'/Script/HiveMPSDK.event_EventTypes_typeDELETE'": "Schedules deletion of an event type version",
			"Class'/Script/HiveMPSDK.event_EventTypes_typeGET'": "Gets the status of all of the versions of a specific event type",
			"Class'/Script/HiveMPSDK.event_EventTypes_typePOST'": "Creates a new version of an event type, with a new schema",
			"Class'/Script/HiveMPSDK.event_EventTypes_typePUT'": "Creates a new event type with the specified schema",
			"Class'/Script/HiveMPSDK.event_EventTypes_typesGET'": "Gets a list of defined event types and their current status",
			"Class'/Script/HiveMPSDK.event_Event_eventBatchInsertPUT'": "Batch inserts multiple events with the same event type and version",
			"Class'/Script/HiveMPSDK.event_Event_eventInsertPUT'": "Inserts a single event with the specified event type and version",
			"Class'/Script/HiveMPSDK.game_server_GameServerTemplate_templateDELETE'": "Deletes a game server template",
			"Class'/Script/HiveMPSDK.game_server_GameServerTemplate_templateGET'": "Gets information about an existing game server template",
			"Class'/Script/HiveMPSDK.game_server_GameServerTemplate_templatePOST'": "Updates an existing game server template",
			"Class'/Script/HiveMPSDK.game_server_GameServerTemplate_templatePUT'": "Creates a new game server template",
			"Class'/Script/HiveMPSDK.game_server_GameServerTemplate_templatesGET'": "Retrieve a list of game server templates in the system",
			"Class'/Script/HiveMPSDK.game_server_GameServer_provisionPUT'": "Requests the provisioning of a game server",
			"Class'/Script/HiveMPSDK.game_server_GameServer_serverCleanupPOST'": "Delete and bill an expired game server instance in HiveMP",
			"Class'/Script/HiveMPSDK.game_server_GameServer_serverGET'": "Retrieve details about an existing game server",
			"Class'/Script/HiveMPSDK.game_server_GameServer_serverStatusPOST'": "Updates the internal status of a game server instance",
			"Class'/Script/HiveMPSDK.game_server_GameServer_serversGET'": "Retrieve details about game servers",
			"Class'/Script/HiveMPSDK.game_server_GameServer_terminateDELETE'": "Request termination of an existing game server",
			"Class'/Script/HiveMPSDK.integration_SteamState_steamStateCuratorGET'": "Gets the hash of the last recorded Curator Connect data",
			"Class'/Script/HiveMPSDK.integration_SteamState_steamStateCuratorPOST'": "Sets the hash of the last recorded Curator Connect data",
			"Class'/Script/HiveMPSDK.integration_SteamState_steamStatePackageGET'": "Gets the package information for the last recorded package data",
			"Class'/Script/HiveMPSDK.integration_SteamState_steamStatePackagePOST'": "Sets the hash of the last recorded package data",
			"Class'/Script/HiveMPSDK.integration_SteamState_steamStateSalesGET'": "Gets the UNIX timestamp and index of the last recorded sales data",
			"Class'/Script/HiveMPSDK.integration_SteamState_steamStateSalesPOST'": "Sets the UNIX timestamp and index of the last recorded sales data",
			"Class'/Script/HiveMPSDK.integration_SteamState_steamStateTrafficGET'": "Gets the UNIX timestamp of the last recorded traffic data",
			"Class'/Script/HiveMPSDK.integration_SteamState_steamStateTrafficPOST'": "Sets the UNIX timestamp of the last recorded traffic data",
			"Class'/Script/HiveMPSDK.integration_SteamState_steamStateWishlistGET'": "Gets the UNIX timestamp of the last recorded wishlist data",
			"Class'/Script/HiveMPSDK.integration_SteamState_steamStateWishlistPOST'": "Sets the UNIX timestamp of the last recorded wishlist data",
			"Class'/Script/HiveMPSDK.integration_Steam_steamConfiguredGET'": "Returns if the project is configured for Steam integration.  If this is true, processing will occur\r\nevery hour to perform data capture.  This API is only accessible from within the cluster",
			"Class'/Script/HiveMPSDK.integration_Steam_steamCredentialsGET'": "Returns the credentials required to authenticate with Steam.  This API is accessible\r\nonly by Hive's internal infrastructure",
			"Class'/Script/HiveMPSDK.integration_Steam_steamCredentialsGamesPUT'": "Sets the cookies used to connect to partner.steamgames.com.  This API is only\r\naccessible from within the cluster",
			"Class'/Script/HiveMPSDK.integration_Steam_steamCredentialsGuardPUT'": "Sets the Steam Guard cookie.  This API is only accessible from within the cluster",
			"Class'/Script/HiveMPSDK.integration_Steam_steamCredentialsPoweredPUT'": "Sets the cookie used to connect to partner.steampowered.com.  This API is only\r\naccessible from within the cluster",
			"Class'/Script/HiveMPSDK.integration_Steam_steamEmailidGET'": "Gets the Steam account ID associated with the last Steam Guard request",
			"Class'/Script/HiveMPSDK.integration_Steam_steamEmailidPUT'": "Sets the Steam account ID associated with the last Steam Guard request",
			"Class'/Script/HiveMPSDK.integration_Steam_steamErrormsgGET'": "Gets the last Steam authentication error or message",
			"Class'/Script/HiveMPSDK.integration_Steam_steamErrormsgPUT'": "Sets the last Steam authentication error or message.  Only accessible inside the Hive cluster",
			"Class'/Script/HiveMPSDK.integration_Steam_steamGuardGET'": "Returns the status of Steam Guard for the project",
			"Class'/Script/HiveMPSDK.integration_Steam_steamGuardPUT'": "Allows you to provide a Steam Guard code if one is necessary",
			"Class'/Script/HiveMPSDK.integration_Steam_steamGuardStatusPUT'": "Sets the Steam Guard status.  This API is only accessible from within the cluster",
			"Class'/Script/HiveMPSDK.integration_Steam_steamPUT'": "Configures Steam integration for this project",
			"Class'/Script/HiveMPSDK.integration_Steam_steamReimportPUT'": "Scheduled a full reimport of all captured Steam data.  This will delete all Steam related \r\ndata from Hive before the import begins, so reports will be unavailable during the reimport",
			"Class'/Script/HiveMPSDK.integration_Steam_steamStatusGET'": "Get a summary of the Steam integration configuration in the project",
			"Class'/Script/HiveMPSDK.integration_Stripe_stripeDELETE'": "Removes Stripe integration from this project",
			"Class'/Script/HiveMPSDK.integration_Stripe_stripeGET'": "Returns the Stripe public and secret keys that were configured for integration.  This method\r\nis only accessible within the Hive cluster",
			"Class'/Script/HiveMPSDK.integration_Stripe_stripePUT'": "Configures Stripe integration for this project",
			"Class'/Script/HiveMPSDK.integration_Stripe_stripeStatusGET'": "Returns the status of Stripe integration for administration viewing",
			"Class'/Script/HiveMPSDK.integration_Stripe_stripeTogglePUT'": "Enables or disables Stripe integration",
			"Class'/Script/HiveMPSDK.lobby_Lobby_lobbiesGET'": "Retrieve a list of the first 50 game lobbies.  This method is deprecated, use /lobbies/paginated instead",
			"Class'/Script/HiveMPSDK.lobby_Lobby_lobbiesPaginatedGET'": "Retrieve a list of game lobbies",
			"Class'/Script/HiveMPSDK.lobby_Lobby_lobbyDELETE'": "Deletes a game lobby, if you are the owner of it",
			"Class'/Script/HiveMPSDK.lobby_Lobby_lobbyGET'": "Retrieves information about a game lobby",
			"Class'/Script/HiveMPSDK.lobby_Lobby_lobbyPOST'": "Updates an existing game lobby, if you are the owner of it",
			"Class'/Script/HiveMPSDK.lobby_Lobby_lobbyPUT'": "Creates a new game lobby",
			"Class'/Script/HiveMPSDK.lobby_Lobby_sessionDELETE'": "Leaves or kicks a session from a game lobby",
			"Class'/Script/HiveMPSDK.lobby_Lobby_sessionGET'": "Gets information about the state of a session connected to a game lobby",
			"Class'/Script/HiveMPSDK.lobby_Lobby_sessionPUT'": "Joins the specified session to a game lobby",
			"Class'/Script/HiveMPSDK.lobby_Lobby_sessionsGET'": "Get a list of sessions that are in a game lobby",
			"Class'/Script/HiveMPSDK.nat_punchthrough_Punchthrough_endpointsGET'": "Returns a list of known endpoints for a session",
			"Class'/Script/HiveMPSDK.nat_punchthrough_Punchthrough_pingPUT'": "Accepts information about a NAT punchthrough UDP request from a listener",
			"Class'/Script/HiveMPSDK.nat_punchthrough_Punchthrough_punchthroughGET'": "Returns information about an established NAT negotation, if it exists",
			"Class'/Script/HiveMPSDK.nat_punchthrough_Punchthrough_punchthroughPUT'": "Creates a NAT negotation, which you can use to send a message over UDP to punchthrough NAT",
			"Class'/Script/HiveMPSDK.pos_Event_eventGET'": "Returns information about an event",
			"Class'/Script/HiveMPSDK.pos_Event_eventPOST'": "Updates an existing event",
			"Class'/Script/HiveMPSDK.pos_Event_eventPUT'": "Creates a new event",
			"Class'/Script/HiveMPSDK.pos_Event_eventsGET'": "Retrieves a list of events",
			"Class'/Script/HiveMPSDK.pos_Event_eventsSearchGET'": "Searches for events based on text entry",
			"Class'/Script/HiveMPSDK.pos_LicenseKey_keysByIssuedEmailGET'": "Gets a list of keys that have been issued for a user email",
			"Class'/Script/HiveMPSDK.pos_LicenseKey_keysByReservedEmailGET'": "Gets a list of keys that have been reserved for a user email",
			"Class'/Script/HiveMPSDK.pos_LicenseKey_keysIssuePUT'": "keysIssuePUT (missing description)",
			"Class'/Script/HiveMPSDK.pos_LicenseKey_keysPUT'": "Adds a set of license keys to a pool",
			"Class'/Script/HiveMPSDK.pos_LicenseKey_keysReservePUT'": "Reserves a randomly selected, available license key from a license key pool to a specific user",
			"Class'/Script/HiveMPSDK.pos_LicenseKey_poolGET'": "Gets an existing license key pool",
			"Class'/Script/HiveMPSDK.pos_LicenseKey_poolPOST'": "Updates an existing license key pool",
			"Class'/Script/HiveMPSDK.pos_LicenseKey_poolPUT'": "Creates a new license key pool",
			"Class'/Script/HiveMPSDK.pos_LicenseKey_poolsGET'": "Retrieves a list of license key pools",
			"Class'/Script/HiveMPSDK.pos_LicenseKey_poolsSearchGET'": "Searches for license key pools based on text entry",
			"Class'/Script/HiveMPSDK.pos_Product_productGET'": "Returns point of sale information about a product, if that product exists",
			"Class'/Script/HiveMPSDK.pos_Product_productPOST'": "Updates the point of sale information associated with a product.  There is no create or\r\ndelete methods with the Point of Sale API; use the Revenue Share API to create products",
			"Class'/Script/HiveMPSDK.reporting_BigQueryAccess_bigqueryAccessDELETE'": "Revokes access to the private and public BigQuery datasets for this project",
			"Class'/Script/HiveMPSDK.reporting_BigQueryAccess_bigqueryAccessPUT'": "Grants access to the private and public BigQuery datasets for this project",
			"Class'/Script/HiveMPSDK.reporting_BigQueryAccess_bigqueryProjectAccessGET'": "View a list of Google accounts with access to BigQuery for this project",
			"Class'/Script/HiveMPSDK.reporting_BuiltinReports_builtinSalesUnitBreakdownRetailGET'": "Returns a report which provides a unit sales breakdown for retail (non-Steam) only",
			"Class'/Script/HiveMPSDK.reporting_BuiltinReports_builtinSalesUnitBreakdownSourceGET'": "Returns a report which provides a unit sales breakdown by activation source",
			"Class'/Script/HiveMPSDK.reporting_BuiltinReports_builtinSalesUnitBreakdownSteamGET'": "Returns a report which provides a unit sales breakdown for Steam Store only",
			"Class'/Script/HiveMPSDK.reporting_BuiltinReports_builtinSalesUsdBreakdownSourceGET'": "Returns a report which provides a USD sales breakdown by activation source",
			"Class'/Script/HiveMPSDK.reporting_BuiltinReports_builtinSalesUsdBreakdownSteamGET'": "Returns a report which provides a USD sales breakdown for Steam Store only",
			"Class'/Script/HiveMPSDK.reporting_BuiltinReports_builtinVisitsActionsConversionGET'": "Returns a report which shows the conversion rate between page visits and wishlists / sales in Steam",
			"Class'/Script/HiveMPSDK.reporting_BuiltinReports_builtinVisitsActionsGET'": "Returns a report which shows the number of page visits against wishlist add actions and sales in Steam",
			"Class'/Script/HiveMPSDK.reporting_BuiltinReports_builtinVisitsBreakdownDetailedGET'": "Returns a report which provides a detailed breakdown of visit sources to the store page in Steam",
			"Class'/Script/HiveMPSDK.reporting_BuiltinReports_builtinVisitsBreakdownPageGET'": "Returns a report which provides a page-grouped breakdown of visit sources to the store page in Steam",
			"Class'/Script/HiveMPSDK.reporting_BuiltinReports_builtinVisitsWishlistsGET'": "Returns a report which shows the number of page visits against wishlist add actions in Steam",
			"Class'/Script/HiveMPSDK.reporting_BuiltinReports_builtinWishlistActionsGET'": "Returns a report which breaks down wishlist actions (add, delete, purchases/activations, gifts) in Steam",
			"Class'/Script/HiveMPSDK.reporting_Report_reportGET'": "Return a paginated list of reports",
			"Class'/Script/HiveMPSDK.reporting_Report_reportsGET'": "Return a paginated list of reports",
			"Class'/Script/HiveMPSDK.revenue_share_Invoice_invoiceGET'": "Gets an existing invoice in the system",
			"Class'/Script/HiveMPSDK.revenue_share_Invoice_invoiceItemDELETE'": "Deletes a line item from an invoice",
			"Class'/Script/HiveMPSDK.revenue_share_Invoice_invoiceItemPOST'": "Updates an existing line item on an invoice",
			"Class'/Script/HiveMPSDK.revenue_share_Invoice_invoiceItemPUT'": "Creates a line item on an invoice",
			"Class'/Script/HiveMPSDK.revenue_share_Invoice_invoicePOST'": "Updates an invoice",
			"Class'/Script/HiveMPSDK.revenue_share_Invoice_invoicePUT'": "Creates a new invoice",
			"Class'/Script/HiveMPSDK.revenue_share_Invoice_invoicePaymentGET'": "Gets an existing payment",
			"Class'/Script/HiveMPSDK.revenue_share_Invoice_invoicePaymentPOST'": "Updates an existing draft payment for the invoice",
			"Class'/Script/HiveMPSDK.revenue_share_Invoice_invoicePaymentPUT'": "Creates a new draft payment for the invoice",
			"Class'/Script/HiveMPSDK.revenue_share_Invoice_invoicePaymentPostPUT'": "Posts a payment to the system, calculating the appropriate revenue share amounts",
			"Class'/Script/HiveMPSDK.revenue_share_Invoice_invoicePaymentProcessPUT'": "Incrementally processes a payment, creating or archiving recipient transactions as needed",
			"Class'/Script/HiveMPSDK.revenue_share_Invoice_invoicePaymentProgressGET'": "Gets the current operation on the payment",
			"Class'/Script/HiveMPSDK.revenue_share_Invoice_invoicePaymentRequeuePUT'": "Requeues the payment for processing",
			"Class'/Script/HiveMPSDK.revenue_share_Invoice_invoicePaymentTransactionsGET'": "Returns a list of transactions associated with a posted payment. If the payment is not posted, this API returns\r\nan empty array",
			"Class'/Script/HiveMPSDK.revenue_share_Invoice_invoicePaymentUnpostPUT'": "Unposts a payment from the system, rolling back any recipient transactions",
			"Class'/Script/HiveMPSDK.revenue_share_Invoice_invoicePaymentsGET'": "Retrieves a list of payments against a specified revenue share invoice",
			"Class'/Script/HiveMPSDK.revenue_share_Invoice_invoicePostPUT'": "Posts an invoice to the permanent record.  Once an invoice is posted, it can't be edited until it is unposted",
			"Class'/Script/HiveMPSDK.revenue_share_Invoice_invoiceUnpostPUT'": "Unposts an invoice from the permanent record.  You can only unpost invoices that have no posted payments against them",
			"Class'/Script/HiveMPSDK.revenue_share_Invoice_invoicesGET'": "Retrieves a list of revenue share invoices in the system",
			"Class'/Script/HiveMPSDK.revenue_share_Product_productGET'": "Gets an existing product in the system",
			"Class'/Script/HiveMPSDK.revenue_share_Product_productPOST'": "Updates an existing product",
			"Class'/Script/HiveMPSDK.revenue_share_Product_productPUT'": "Creates a new product",
			"Class'/Script/HiveMPSDK.revenue_share_Product_productsGET'": "Retrieves a list of products in the system",
			"Class'/Script/HiveMPSDK.revenue_share_Product_productsSearchGET'": "Searches for products based on text entry",
			"Class'/Script/HiveMPSDK.revenue_share_Recipient_recipientGET'": "Gets an existing recipient in the system",
			"Class'/Script/HiveMPSDK.revenue_share_Recipient_recipientPOST'": "Updates an existing recipient",
			"Class'/Script/HiveMPSDK.revenue_share_Recipient_recipientPUT'": "Creates a new recipient",
			"Class'/Script/HiveMPSDK.revenue_share_Recipient_recipientTransactionDELETE'": "Archives a custom transaction on a recipient",
			"Class'/Script/HiveMPSDK.revenue_share_Recipient_recipientTransactionGET'": "Returns information about the specified transaction",
			"Class'/Script/HiveMPSDK.revenue_share_Recipient_recipientTransactionPUT'": "Creates a new custom transaction against a recipient",
			"Class'/Script/HiveMPSDK.revenue_share_Recipient_recipientTransactionsGET'": "Retrieves a list of transactions against a recipient",
			"Class'/Script/HiveMPSDK.revenue_share_Recipient_recipientsGET'": "Retrieves a list of recipients in the system",
			"Class'/Script/HiveMPSDK.revenue_share_Recipient_recipientsSearchGET'": "Searches for recipients based on text entry",
			"Class'/Script/HiveMPSDK.revenue_share_RevenueShareRuleset_rulesetGET'": "Gets an existing revenue share ruleset in the system",
			"Class'/Script/HiveMPSDK.revenue_share_RevenueShareRuleset_rulesetPOST'": "Updates an existing revenue share ruleset",
			"Class'/Script/HiveMPSDK.revenue_share_RevenueShareRuleset_rulesetPUT'": "Creates a new revenue share ruleset",
			"Class'/Script/HiveMPSDK.revenue_share_RevenueShareRuleset_rulesetSimulatePUT'": "Simulate a revenue share ruleset against a given product and an amount",
			"Class'/Script/HiveMPSDK.revenue_share_RevenueShareRuleset_rulesetsGET'": "Retrieves a list of revenue share rulesets in the system",
			"Class'/Script/HiveMPSDK.revenue_share_RevenueShareRuleset_rulesetsSearchGET'": "Searches for rulesets based on text entry",
			"Class'/Script/HiveMPSDK.revenue_share_Stripe_stripePaymentEnabledPOST'": "Enables or disables whether this payment can be posted by someone paying\r\nit via Stripe",
			"Class'/Script/HiveMPSDK.revenue_share_Stripe_stripePaymentGET'": "stripePaymentGET (missing description)",
			"Class'/Script/HiveMPSDK.revenue_share_Stripe_stripePaymentPUT'": "stripePaymentPUT (missing description)",
			"Class'/Script/HiveMPSDK.revenue_share_Stripe_stripePaymentStatusGET'": "Gets the Stripe information about a given payment",
			"Class'/Script/HiveMPSDK.search_Cluster_internalIndexDELETE'": "Deletes an object from the internal index. This is usually used when \r\nan object visibility is toggled off. This can only be called\r\nfrom within the Hive cluster",
			"Class'/Script/HiveMPSDK.search_Cluster_internalIndexPUT'": "Updates an object in the internal index. This can only be called\r\nfrom within the Hive cluster",
			"Class'/Script/HiveMPSDK.search_Cluster_internalSearchGET'": "Searches for internally indexed objects based on the input text. This can only be called\r\nfrom within the Hive cluster",
			"Class'/Script/HiveMPSDK.search_Search_indexDELETE'": "Deletes an object from the search index. This is usually used when \r\nan object visibility is toggled off or the object is deleted",
			"Class'/Script/HiveMPSDK.search_Search_indexPUT'": "Updates or adds an object to the search index",
			"Class'/Script/HiveMPSDK.search_Search_searchGET'": "Searches for indexed objects based on the input text",
			"Class'/Script/HiveMPSDK.temp_session_TemporarySessionAdmin_sessionsGET'": "Retrieves a list of temporary sessions in the system",
			"Class'/Script/HiveMPSDK.temp_session_TemporarySession_sessionDELETE'": "Explicitly delete a temporary session",
			"Class'/Script/HiveMPSDK.temp_session_TemporarySession_sessionGET'": "Retrieves details about an existing session",
			"Class'/Script/HiveMPSDK.temp_session_TemporarySession_sessionPOST'": "Reset the expiry of the temporary session",
			"Class'/Script/HiveMPSDK.temp_session_TemporarySession_sessionPUT'": "Creates a new temporary session",
			"Class'/Script/HiveMPSDK.ugc_cache_UGCCache_contentGET'": "Redirects to a public URL containing the file content",
			"Class'/Script/HiveMPSDK.ugc_cache_UGCCache_itemPUT'": "Stores a UGC cache item in Hive.  Only non-temporary session can use this API (i.e. your session must have persistent owner information attached)",
			"Class'/Script/HiveMPSDK.user_session_UserSession_sessionDELETE'": "Explicitly delete a user session",
			"Class'/Script/HiveMPSDK.user_session_UserSession_sessionGET'": "Retrieves details about an existing session",
			"Class'/Script/HiveMPSDK.user_session_UserSession_sessionPOST'": "Reset the expiry of the user session",
			"Class'/Script/HiveMPSDK.user_session_UserSession_sessionPUT'": "Creates a new user session, by authenticating against the specified account"
		}, this
	}
	cj.prototype.findHeaderNameForHiveMPSDK = function(a) {
		a = a.replace(/"/g, "");
		return void 0 !== this.title[a] ? this.title[a] : "Async Task: " + D(a.replace("Class'/Script/HiveMPSDK.", "").replace("'", ""))
	};
	var be = [{
			name: "NodePosX=",
			len: 9,
			fn: bw,
			arg0: "position",
			arg1: 0
		}, {
			name: "NodePosY=",
			len: 9,
			fn: bw,
			arg0: "position",
			arg1: 1
		}, {
			name: "NodeWidth=",
			len: 10,
			fn: bw,
			arg0: "size",
			arg1: 0
		}, {
			name: "NodeHeight=",
			len: 11,
			fn: bw,
			arg0: "size",
			arg1: 1
		}, {
			name: "NodeGuid=",
			len: 9,
			fn: ca,
			arg0: "guid",
			arg1: null
		}, {
			name: "NodeComment=",
			len: 12,
			fn: ca,
			arg0: "comment",
			arg1: null
		}],
		bO = [{
			blueprintClass: "K2Node_SetFieldsInStruct",
			cssColor: "break-struct"
		}, {
			blueprintClass: "K2Node_DynamicCast",
			cssColor: "cast"
		}, {
			blueprintClass: "K2Node_SwitchEnum",
			cssColor: "switch"
		}, {
			blueprintClass: "K2Node_SwitchName",
			cssColor: "switch"
		}, {
			blueprintClass: "K2Node_SwitchInteger",
			cssColor: "switch"
		}, {
			blueprintClass: "K2Node_SwitchString",
			cssColor: "switch"
		}, {
			blueprintClass: "K2Node_Timeline",
			cssColor: "timeline"
		}, {
			blueprintClass: "K2Node_Select",
			cssColor: "pure-function-call"
		}, {
			blueprintClass: "K2Node_Tunnel",
			cssColor: "function-call"
		}, {
			blueprintClass: "K2Node_FunctionEntry",
			cssColor: "function-terminator"
		}, {
			blueprintClass: "K2Node_FunctionResult",
			cssColor: "function-terminator"
		}, {
			blueprintClass: "K2Node_ExecutionSequence",
			cssColor: "macro"
		}, {
			blueprintClass: "K2Node_MakeArray",
			cssColor: "pure-function-call"
		}, {
			blueprintClass: "K2Node_GetClassDefaults",
			cssColor: "pure-function-call"
		}, {
			blueprintClass: "K2Node_BreakStruct",
			cssColor: "break-struct"
		}, {
			blueprintClass: "K2Node_FormatText",
			cssColor: "pure-function-call"
		}, {
			blueprintClass: "K2Node_MakeMap",
			cssColor: "pure-function-call"
		}, {
			blueprintClass: "K2Node_CallParentFunction",
			cssColor: "parent-function-call"
		}],
		bP = [{
			macro: "StandardMacros:FlipFlop",
			cssIcon: "flipflop"
		}, {
			macro: "StandardMacros:Gate",
			cssIcon: "gate"
		}, {
			macro: "StandardMacros:IsValid",
			cssIcon: "isvalid"
		}, {
			macro: "StandardMacros:ForEachLoop",
			cssIcon: "foreach"
		}, {
			macro: "StandardMacros:ForEachLoopWithBreak",
			cssIcon: "foreach"
		}, {
			macro: "StandardMacros:ForLoopWithBreak",
			cssIcon: "loop"
		}, {
			macro: "StandardMacros:ForLoop",
			cssIcon: "loop"
		}, {
			macro: "StandardMacros:WhileLoop",
			cssIcon: "loop"
		}, {
			macro: "StandardMacros:Do N",
			cssIcon: "do_n"
		}, {
			macro: "StandardMacros:DoOnce",
			cssIcon: "do_once"
		}],
		bQ = [{
			blueprintClass: "K2Node_Tunnel",
			cssIcon: "blueprint-node"
		}, {
			blueprintClass: "K2Node_AddDelegate",
			cssIcon: "blueprint-node"
		}, {
			blueprintClass: "K2Node_GenericCreateObject",
			cssIcon: "blueprint-node"
		}, {
			blueprintClass: "K2Node_GetClassDefaults",
			cssIcon: "blueprint-node"
		}, {
			blueprintClass: "K2Node_LatentOnlineCall",
			cssIcon: "blueprint-node"
		}, {
			blueprintClass: "K2Node_SwitchEnum",
			cssIcon: "switch"
		}, {
			blueprintClass: "K2Node_SwitchName",
			cssIcon: "switch"
		}, {
			blueprintClass: "K2Node_SwitchInteger",
			cssIcon: "switch"
		}, {
			blueprintClass: "K2Node_SwitchString",
			cssIcon: "switch"
		}, {
			blueprintClass: "K2Node_Select",
			cssIcon: "select"
		}, {
			blueprintClass: "K2Node_MakeStruct",
			cssIcon: "make-struct"
		}, {
			blueprintClass: "K2Node_MakeArray",
			cssIcon: "make-array"
		}, {
			blueprintClass: "K2Node_BreakStruct",
			cssIcon: "break-struct"
		}, {
			blueprintClass: "K2Node_FunctionEntry",
			cssIcon: "blueprint-node"
		}, {
			blueprintClass: "K2Node_FunctionResult",
			cssIcon: "blueprint-node"
		}, {
			blueprintClass: "K2Node_SpawnActorFromClass",
			cssIcon: "spawn-actor"
		}, {
			blueprintClass: "K2Node_DynamicCast",
			cssIcon: "cast"
		}, {
			blueprintClass: "K2Node_ExecutionSequence",
			cssIcon: "sequence"
		}, {
			blueprintClass: "K2Node_Select",
			cssIcon: "pure-function-call"
		}, {
			blueprintClass: "K2Node_Timeline",
			cssIcon: "timeline"
		}, {
			blueprintClass: "K2Node_CreateWidget",
			cssIcon: "blueprint-node"
		}, {
			blueprintClass: "K2Node_SetFieldsInStruct",
			cssIcon: "pill"
		}, {
			blueprintClass: "K2Node_MakeMap",
			cssIcon: "make-map"
		}];

	function o() {
		this.objectDefinition = [], this.position = [0, 0], this.size = [0, 0], this.guid = "", this.comment = "", this.pins = [], this.props = [], this.userDefinedPins = [], this.nodes = [], this.isBelow413Version = !1, this.isBelow52Version = !1, this.containsVisualNodes = !1
	}
	o.prototype.treat = function(a) {
		var b, c, d = 0,
			e = be.length,
			f = 0;
		for (this.isBelow52Version || '"' !== a.substring(0, 1) || (a = a.replace('"', "").replace('"', "")); d < e; ++d)
			if (be[d].name === a.substring(0, be[d].len)) return void be[d].fn.call(this, a.substring(be[d].len), be[d].arg0, be[d].arg1);
		if ("CustomProperties Pin" === a.substring(0, 20)) this.treatCustomProperties(a.substring(20));
		else if ("Begin Object" === a.substring(0, 12)) this.objectDefinition = bJ(a);
		else if ("CustomProperties UserDefinedPin" === a.substring(0, 31)) this.userDefinedPins.push(a.substring(31));
		else if (b = R(a), Array.isArray(b))
			for (c = b.length; f < c; ++f) this.props.push(b[f]);
		else this.props.push(b)
	}, o.prototype.treatCustomProperties = function(a) {
		var b = new v,
			c = R(a),
			d = 0,
			e = c.length;
		if (Array.isArray(c))
			for (; d < e; ++d) b.addProp(c[d]);
		else b.addProp(c);
		this.pins.push(b)
	}, o.prototype.generateTextForUnreal = function(a) {
		var b = "";
		return (b += "Begin " + this.generateTextObjectDefinition()) + this.generateTextProps(a) + ("End " + this.objectDefinition[0].value)
	}, o.prototype.generateTextObjectDefinition = function() {
		for (var a, b = [], c = 0, d = this.objectDefinition.length, e = "", f = ""; c < d; ++c) a = this.objectDefinition[c].value, e = "", this.objectDefinition[c].useDelimiter && (e = '"'), f = "", this.objectDefinition[c].name && (f = this.objectDefinition[c].name + "="), b.push(f + e + a + e);
		return b.join(" ") + "\n"
	}, o.prototype.generateTextObjectDefinitionNameOnly = function() {
		var a = [],
			b = "",
			c = h(this.objectDefinition, "Name");
		return null !== c && (b = "", c.useDelimiter && (b = '"'), a.push("Name=" + b + c.value + b)), a.join(" ") + "\n"
	}, o.prototype.generateTextProps = function(a) {
		var b, c, d = [],
			e = 0,
			f = this.props.length,
			g = 0,
			i = this.pins.length,
			j = 0,
			l = this.userDefinedPins.length,
			k = J(a),
			n = "",
			m = "",
			p = "",
			q = -1;
		if (0 !== this.position[0] && (m = '"NodePosX"=', this.isBelow52Version && (m = "NodePosX="), d.push(k + m + this.position[0])), 0 !== this.position[1] && (m = '"NodePosY"=', this.isBelow52Version && (m = "NodePosY="), d.push(k + m + this.position[1])), 0 === this.size[0] && 0 === this.size[1] || (m = '"NodeWidth"=', this.isBelow52Version && (m = "NodeWidth="), d.push(k + m + this.size[0]), m = '"NodeHeight"=', this.isBelow52Version && (m = "NodeHeight="), d.push(k + m + this.size[1])), 0 < this.guid.length && (m = '"NodeGuid"=', this.isBelow52Version && (m = "NodeGuid="), d.push(k + m + this.guid)), 0 < this.comment.length && (m = '"NodeComment"=', this.isBelow52Version && (m = "NodeComment="), d.push(k + m + this.comment)), this.isBelow413Version) {
			for (; g < i; ++g) d.push(k + 'Begin Object Class=EdGraphPin Name="' + this.pins[g].id + '"'), d.push(k + "End Object");
			for (; e < f; ++e) d.push(k + U(this.props[e]));
			for (; j < l; ++j) d.push(k + "CustomProperties UserDefinedPin" + this.userDefinedPins[j])
		} else {
			for (; e < f; ++e) p = U(this.props[e]), this.isBelow52Version || (b = p.indexOf("="), -1 !== (c = p.indexOf("(")) && c < b ? q = c : -1 !== b && (q = b), p = '"' + p.substring(0, q) + '"' + p.substring(q)), d.push(k + p);
			for (; j < l; ++j) d.push(k + "CustomProperties UserDefinedPin" + this.userDefinedPins[j])
		}
		for (g = 0; g < i; ++g) d.push(this.pins[g].generateTextForUnreal(a));
		return 0 < (n = d.join("\n")).length && (n += "\n"), n
	}, o.prototype.generateHTML = function() {
		var a, b = {
				tag: "div",
				classes: ["node"],
				attrs: [{
					name: "style",
					value: this.generateCssNodeStyle().join(";")
				}, {
					name: "data-id",
					value: this.guid
				}],
				childs: [this.generateHTMLToolTip(), this.generateHTMLHeader()]
			},
			c = this.generateHTMLBody(),
			d = 0;
		if (Array.isArray(c))
			for (a = c.length; d < a; ++d) b.childs.push(c[d]);
		else b.childs.push(c);
		return b
	}, o.prototype.generateCssNodeStyle = function() {
		var a = [];
		return a.push("position:absolute"), a.push("transform: translate(" + this.position[0] + "px, " + this.position[1] + "px)"), 0 !== this.size[0] && a.push("width:" + this.size[0] + "px"), 0 !== this.size[1] && a.push("height:" + this.size[1] + "px"), a
	}, o.prototype.generateHTMLHeader = function() {
		for (var a = this.generateHTMLPinDelegate(), b = 0, c = a.length, d = {
				tag: "div",
				classes: ["header", "node-color", this.findCssClassNodeColor(), "gradient", this.findIconAfterNode()],
				childs: [{
					tag: "div",
					classes: ["icon", this.findCssClassNodeIcon()]
				}, {
					tag: "span",
					classes: ["has-icon", "name"],
					text: this.findHeaderName(),
					childs: [{
						tag: "br"
					}, {
						tag: "span",
						classes: ["subname"],
						text: this.findHeaderSubname()
					}]
				}]
			}; b < c; ++b) d.childs.push(a[b]);
		return d
	}, o.prototype.findCssClassNodeColor = function() {
		var a, b = 0,
			c = bO.length,
			d = h(this.objectDefinition, "Class");
		if (null !== d) {
			for (; b < c; ++b)
				if (-1 !== d.value.indexOf(bO[b].blueprintClass)) return bO[b].cssColor;
			if (-1 !== d.value.indexOf("K2Node_CallFunction")) return null !== (a = h(this.props, "bIsPureFunc")) && "True" === a.value ? "pure-function-call" : "function-call"
		}
		return null !== h(this.props, "DelegateReference") ? "function-call" : null !== h(this.props, "MacroGraphReference") ? "macro" : null !== (a = h(this.props, "FunctionReference")) && "Concat_StrStr" === h(a.value, "MemberName").value ? "pure-function-call" : "function-call"
	}, o.prototype.generateHTMLToolTip = function() {
		var a, b, c = "",
			d = {
				tag: "div",
				classes: ["tooltip"]
			},
			e = [],
			f = 0;
		if (0 === this.comment.length) return null;
		if (((c = co(bv(bu(this.comment).replaceAll("\\'", "'").replace(/\\"/g, '"')))).match(/<br>/g) || []).length < 1) d.text = c, d.attrs = [{
			name: "style",
			value: "top:-33px"
		}];
		else {
			for (b = (a = c.split(/<br>/g)).length; f < b; ++f) e.push({
				text: a[f]
			}), f + 1 < b && e.push({
				tag: "br"
			});
			d.childs = e, d.attrs = [{
				name: "style",
				value: "top:-" + (e.length / 2 * 15 + 28) + "px"
			}]
		}
		return d
	}, o.prototype.findCssClassNodeIcon = function() {
		var a = h(this.props, "MacroGraphReference"),
			b = null,
			c = null,
			d = null,
			e = null,
			f = 0,
			g = bP.length;
		if (null !== a) {
			if (null === (b = h(a.value, "MacroGraph"))) return "macro";
			for (; f < g; ++f)
				if (-1 !== b.value.indexOf(bP[f].macro)) return bP[f].cssIcon;
			return "macro"
		}
		if (null !== (c = h(this.objectDefinition, "Class")))
			for (f = 0, g = bQ.length; f < g; ++f)
				if (-1 !== c.value.indexOf(bQ[f].blueprintClass)) return bQ[f].cssIcon;
		if (null !== (a = h(this.props, "FunctionReference"))) {
			if (d = null !== (d = h(a.value, "MemberParent")) && -1 !== d.value.indexOf("KismetMathLibrary"), e = h(a.value, "MemberName"), d && -1 !== e.value.indexOf("Make")) return "make-struct";
			if (d && -1 !== e.value.indexOf("Break")) return "break-struct"
		}
		return null !== (a = h(this.props, "bIsPureFunc")) && "True" === a.value ? (d = this.findHeaderName(), -1 !== ["Break Hit Result"].indexOf(d) ? "break-struct" : "pure-function-call") : "function-call"
	}, o.prototype.findIconAfterNode = function() {
		for (var a, b = h(this.objectDefinition, "Class"), c = ["K2Node_LatentOnlineCall", "K2Node_LatentGameplayTaskCall", "K2Node_AsyncAction", "K2Node_AIMoveTo", "K2Node_LatentOnlineCall", "K2Node_PlayMontage"], d = 0, e = c.length; d < e; ++d)
			if (null !== b && -1 !== b.value.indexOf(c[d])) return "icon-async";
		return null !== b && -1 !== b.value.indexOf("K2Node_CallDelegate") ? "icon-message" : "Set Focus To Game Viewport" === (a = this.findHeaderName()) ? "icon-client-event" : "Event AnyDamage" === a ? "icon-server-event" : "Create Sound2D" === a || "Play Sound2D" === a ? "icon-client-event" : "Delay" === a ? "icon-async" : ""
	}, o.prototype.findHeaderName = function() {
		var a, b = -1,
			c = "",
			d = null,
			e = null,
			f = null,
			g = null,
			i = null,
			j = !1,
			l = !1,
			k = !1,
			n = !1,
			m = null,
			p = null,
			q = null,
			u = null,
			r = 0,
			y = this.pins.length,
			A = null,
			H = null,
			T = null,
			bo = null,
			bp = "",
			Q = "",
			w = h(this.objectDefinition, "Class");
		if (-1 !== w.value.indexOf("K2Node_ExecutionSequence")) return "Sequence";
		if (-1 !== w.value.indexOf("K2Node_Timeline")) return h(this.props, "TimelineName").value;
		if (-1 !== w.value.indexOf("/Script/AIGraph.K2Node_AIMoveTo")) return "AI MoveTo";
		if (-1 !== w.value.indexOf("/Script/AnimGraph.K2Node_PlayMontage")) return "Play Montage";
		if (-1 !== w.value.indexOf("/Script/BlueprintGraph.K2Node_FormatText")) return "Format Text";
		if (-1 !== w.value.indexOf("/Script/BlueprintGraph.K2Node_MakeMap")) return "Make Map";
		if (-1 !== w.value.indexOf("K2Node_FunctionResult")) return "Return Node";
		if (null !== (a = h(this.props, "DelegateReference")) && null !== (a = h(a.value, "MemberName"))) return -1 !== w.value.indexOf("K2Node_CallDelegate") ? Q = "Call " : -1 !== w.value.indexOf("K2Node_AddDelegate") ? Q = "Bind Event to " : -1 !== w.value.indexOf("K2Node_RemoveDelegate") ? Q = "Unbind Event from " : -1 !== w.value.indexOf("K2Node_ClearDelegate") && (Q = "Unbind all Events from "), Q + a.value;
		if (null !== (Q = h(this.props, "MacroGraphReference"))) return -1 !== (d = h(Q.value, "MacroGraph")).value.indexOf("StandardMacros:FlipFlop") ? "FlipFlop" : -1 !== d.value.indexOf("StandardMacros:ReverseForEachLoop") ? "ReverseForEachLoop" : -1 !== d.value.indexOf("StandardMacros:Gate") ? "Gate" : -1 !== d.value.indexOf("StandardMacros:IsValid") ? "IsValid" : -1 !== d.value.indexOf("StandardMacros:ForEachLoopWithBreak") ? "ForEachLoopWithBreak" : -1 !== d.value.indexOf("StandardMacros:ForEachLoop") ? "ForEachLoop" : -1 !== d.value.indexOf("StandardMacros:ForLoopWithBreak") ? "ForLoopWithBreak" : -1 !== d.value.indexOf("StandardMacros:WhileLoop") ? "WhileLoop" : -1 !== d.value.indexOf("StandardMacros:ForLoopWithBreak") ? "ForLoopWithBreak" : -1 !== d.value.indexOf("StandardMacros:ForLoop") ? "ForLoop" : -1 !== d.value.indexOf("StandardMacros:WhileLoop") ? "WhileLoop" : -1 !== d.value.indexOf("StandardMacros:Do N") ? "Do N" : -1 !== d.value.indexOf("StandardMacros:DoOnce") ? "Do Once" : -1 !== d.value.indexOf("Switch Has Authority") ? "Switch Has Authority" : -1 !== d.value.indexOf("StandardMacros:") ? (b = d.value.indexOf("StandardMacros:"), -1 !== (b = (c = d.value.substring(b + 15)).indexOf("'")) ? c.substring(0, b) : c) : 0 === d.value.indexOf("EdGraph'") ? '"' === (c = d.value.substring(8)).substring(0, 1) ? c.substring(1, c.length - 2) : c.substring(0, c.length - 1) : d.value;
		if (-1 !== w.value.indexOf("K2Node_Select")) return "Select";
		if (-1 !== w.value.indexOf("K2Node_GetClassDefaults")) return "Get Class Defaults";
		if (-1 !== w.value.indexOf("K2Node_LatentOnlineCall")) return null === (e = h(this.props, "ProxyFactoryFunctionName")) ? "Async Task: Missing Function" : null !== (f = h(this.props, "ProxyFactoryClass")) && -1 !== f.value.indexOf("/Script/HiveMPSDK.") ? (new cj).findHeaderNameForHiveMPSDK(f.value) : "Async Task: " + D(e.value);
		if (-1 !== w.value.indexOf("K2Node_AddComponent")) return c = "", g = h(this.props, "TemplateType"), i = h(this.props, "TemplateBlueprint"), null !== g ? (c = g.value, -1 !== (b = g.value.lastIndexOf(".")) && (c = c.substr(b + 1).replace("'", ""))) : null !== i && (c = i.value, -1 !== (b = i.value.lastIndexOf(".")) && (c = c.substr(b + 1).replace('"', ""))), "Add Component " + D(c.replace("Component", "").replace('"', ""));
		if (null !== (a = h(this.props, "FunctionReference")) && null !== (Q = h(a.value, "MemberName"))) return "Nearly Equal Transform Transform" === (c = D(Q.value)) ? c = "Nearly Equal (transform)" : "Nearly Equal Float Float" === c && (c = "Nearly Equal (float)"), -1 !== w.value.indexOf("K2Node_CallParentFunction") ? "Parent:" + c : (null !== (m = null === (m = h(a.value, "MemberParent")) ? h(a.value, "MemberParentClass") : m) && (j = -1 !== m.value.indexOf("KismetMathLibrary"), l = -1 !== m.value.indexOf("KismetStringLibrary"), k = -1 !== m.value.indexOf("KismetSystemLibrary"), n = -1 !== m.value.indexOf("SceneComponent")), -1 !== (c = -1 !== (c = -1 !== (c = -1 !== (c = -1 !== (c = "In Range Float Float" === (c = "F Clamp" === (c = "Line Trace Multi" === (c = "Line Trace Single For Objects" === (c = "Line Trace Single" === (c = "Line Trace Single NEW" === (c = "Normalized Delta Rotator" === (c = "Greater Greater Vector Rotator" === (c = "Less Less Vector Rotator" === (c = "V Lerp" === (c = "T Lerp" === (c = "R Lerp" === (c = "F Trunc" === (c = "Multiply Multiply Float Float" === (c = "Concat Str Str" === (c = "V Size" === (c = "Normal" === c && j ? "Normalize" : c) && j ? "VectorLength" : c) && l ? "Append" : c) && j ? "Power" : c) && j ? "Truncate" : c) && j ? "Lerp (Rotator)" : c) && j ? "Lerp (Transform)" : c) && j ? "Lerp (Vector)" : c) && j ? "UnrotateVector" : c) && j ? "RotateVector" : c) && j ? "Delta (Rotator)" : c) && k ? "LineTraceByChannel" : c) && k ? "LineTraceByChannel" : c) && k ? "LineTraceForObjects" : c) && k ? "MultiLineTraceByChannel" : c) && j ? "Clamp (float)" : c) && j ? "InRange (float)" : c).indexOf("GetComponentLocation") && n ? "GetWorldLocation" : c).indexOf("GetComponentRotation") && n ? "GetWorldRotation" : c).indexOf("GetComponentToWorld") && n ? "GetWorldTransform" : c).indexOf("GetComponentScale") && n ? "GetWorldScale" : c).indexOf("SetTimerDelegate") && k ? "Set Timer by Event" : c);
		if (-1 !== w.value.indexOf("K2Node_Tunnel")) return null !== h(this.props, "bCanHaveOutputs") ? "Inputs" : "Outputs";
		if (-1 !== w.value.indexOf("K2Node_FunctionEntry") && null !== (d = h(this.props, "SignatureName"))) return D(d.value);
		if (-1 !== w.value.indexOf("K2Node_FunctionResult")) return "Return Node";
		if (-1 !== w.value.indexOf("K2Node_DynamicCast")) return null !== (p = h(this.props, "TargetType")) ? (c = p.value, "Cast To " + (c = -1 !== (b = p.value.lastIndexOf(".")) ? c.substr(b + 1).replace("'", "") : c).replace('"', "")) : "Bad cast node";
		if (-1 !== w.value.indexOf("K2Node_SpawnActorFromClass")) {
			for (c = "NONE"; r < y; ++r)
				if (q = h(this.pins[r].props, "PinName"), u = h(this.pins[r].props, "DefaultObject"), "Class" === q.value && null !== u) return "SpawnActor " + (c = -1 !== (b = (c = u.value).lastIndexOf(".")) ? c.substring(b + 1).replace('"', "") : c);
			return "SpawnActor " + c
		}
		if (-1 !== w.value.indexOf("K2Node_SwitchEnum") && -1 !== (b = (A = h(this.props, "Enum")).value.lastIndexOf("."))) return "Switch on " + (bp = '"' === (bp = A.value.substr(b + 1).replace("'", "")).charAt(bp.length - 1) ? bp.substr(0, bp.length - 1) : bp);
		if (-1 !== w.value.indexOf("K2Node_SwitchName")) return "Switch on Name";
		if (-1 !== w.value.indexOf("K2Node_SwitchInteger")) return "Switch on Int";
		if (-1 !== w.value.indexOf("K2Node_SwitchString")) return "Switch on String";
		if (-1 !== w.value.indexOf("K2Node_CreateWidget")) {
			for (r = 0; r < y; ++r)
				if (q = h(this.pins[r].props, "PinName"), u = h(this.pins[r].props, "DefaultObject"), "Class" === q.value) {
					if (null === u) return "Construct NONE";
					if (-1 !== (b = u.value.lastIndexOf("."))) return c = u.value.substring(b + 1).replace('"', ""), "Create " + D(c) + " Widget"
				} return "Create Widget"
		}
		if (-1 !== w.value.indexOf("K2Node_GenericCreateObject")) {
			for (r = 0; r < y; ++r)
				if (q = h(this.pins[r].props, "PinName"), H = this.pins[r].getPropFromPinType("PinSubCategoryObject"), "ReturnValue" === q.value) {
					if (null === H) return "Construct NONE";
					if (-1 !== (b = H.value.lastIndexOf("."))) return '"' === (c = H.value.substring(b + 1).replace("'", "")).charAt(c.length - 1) && (c = c.substr(0, c.length - 1)), "Create " + D(c)
				} return "Create Widget"
		}
		if (-1 === w.value.indexOf("K2Node_BreakStruct")) return -1 !== w.value.indexOf("K2Node_SetFieldsInStruct") ? (c = "NONE", "Set members in " + (c = null !== (T = h(this.props, "StructType")) && -1 !== (b = (c = T.value).lastIndexOf(".")) ? c.substr(b += 1).replace("'", "") : c)) : -1 !== w.value.indexOf("K2Node_AsyncAction") && null !== (e = h(this.props, "ProxyFactoryFunctionName")) ? "Async Task: " + e.value : -1 !== (bo = "K2Node_" === (bo = w.value).substr(0, 7) ? bo.substr(7) : bo).indexOf("K2Node_MakeArray") ? "Make Array" : -1 !== bo.indexOf("K2Node_MakeStruct") ? (c = "NONE", "Make Struct " + (c = null !== (T = h(this.props, "StructType")) && -1 !== (b = (c = T.value).lastIndexOf(".")) ? (c = c.substring(b + 1)).lastIndexOf("\"'") + 2 === c.length ? c.substring(0, c.length - 2) : c.substring(0, c.length - 1) : c)) : D(bo);
		for (r = 0; r < y; ++r)
			if (this.pins[r].isInput()) {
				if (void 0 === this.pins[r].getPropFromPinType("PinSubCategoryObject")) return "Break <unknown struct>";
				if (-1 !== (b = this.pins[r].getPropFromPinType("PinSubCategoryObject").value.lastIndexOf("."))) return "Break " + (c = this.pins[r].getPropFromPinType("PinSubCategoryObject").value.substring(b + 1).replace("'", ""))
			} return "Create Widget"
	}, o.prototype.findHeaderSubname = function() {
		return ""
	}, o.prototype.generateHTMLBody = function() {
		var a = [{
			tag: "div",
			classes: ["body"],
			childs: [{
				tag: "div",
				classes: ["left-col"],
				childs: this.generateHTMLPinsInput()
			}, {
				tag: "div",
				classes: ["right-col"],
				childs: this.generateHTMLPinsOutput()
			}]
		}];
		return this.hasAdvancedPinDisplay() && (this.isAdvancedPinDisplayExpanded() ? a.push({
			tag: "div",
			classes: ["less"],
			childs: [{
				tag: "span"
			}]
		}) : a.push({
			tag: "div",
			classes: ["more"],
			childs: [{
				tag: "span"
			}]
		})), a
	}, o.prototype.generateHTMLPinDelegate = function() {
		for (var a = [], b = 0, c = this.pins.length; b < c; ++b) this.pins[b].isDelegateOutput() && a.push(this.pins[b].generateHTML(!0, this));
		return a
	}, o.prototype.generateHTMLPinsInput = function() {
		for (var a = [], b = this.isAdvancedPinDisplayExpanded(), c = 0, d = this.pins.length; c < d; ++c) this.pins[c].isInput() && a.push(this.pins[c].generateHTML(b, this));
		return a
	}, o.prototype.generateHTMLPinsOutput = function() {
		for (var a = [], b = this.isAdvancedPinDisplayExpanded(), c = 0, d = this.pins.length; c < d; ++c) this.pins[c].isOutput() && !1 === this.pins[c].isDelegateOutput() && a.push(this.pins[c].generateHTML(b, this));
		return a
	}, o.prototype.hasAdvancedPinDisplay = function() {
		return null !== h(this.props, "AdvancedPinDisplay")
	}, o.prototype.isAdvancedPinDisplayExpanded = function() {
		var a = h(this.props, "AdvancedPinDisplay");
		return a && "Shown" === a.value
	}, o.prototype.callbackInspectNode = function(a, b) {
		var c = 0,
			d = 0;
		if (!1 !== this.containsVisualNodes && 0 !== this.nodes.length)
			if (1 === this.nodes.length)
				for (this.nodes[0].containsVisualNodes = !0, this.nodes[0].objectDefinition = b, d = this.nodes[0].nodes.length; c < d; ++c) this.nodes[0].nodes[c].objectDefinition = a.nodes[0].nodes[c].objectDefinition, this.nodes[0].nodes[c].containsVisualNodes && this.nodes[0].nodes[c].callbackInspectNode(a.nodes[0].nodes[c], a.nodes[0].nodes[c].nodes[0].objectDefinition);
			else if (2 === this.nodes.length) {
			for (0 < (d = this.nodes[1].nodes.length) && !1 === this.nodes[1].containsVisualNodes && (this.nodes[1].containsVisualNodes = !0, this.nodes[1].objectDefinition = this.nodes[0].objectDefinition); c < d; ++c) this.nodes[1].nodes[c].objectDefinition = this.nodes[0].nodes[c].objectDefinition, this.nodes[1].nodes[c].containsVisualNodes && this.nodes[1].nodes[c].callbackInspectNode(this.nodes[0].nodes[c], this.nodes[0].nodes[c].nodes[0].objectDefinition);
			this.nodes = [this.nodes[1]]
		}
	};

	function bd() {
		this.objectDefinition = [], this.props = [], this.pins = [], this.containsVisualNodes = !1, this.isBelow52Version = !1
	}
	bd.prototype.treat = function(a) {
		var b, c = 0;
		if ("Begin Object" === a.substring(0, 12)) this.objectDefinition = bJ(a);
		else if (this.isBelow52Version || '"' !== a.substring(0, 1) || (a = a.replace('"', "").replace('"', "")), b = R(a), Array.isArray(b))
			for (c = 0; c < b.length; ++c) this.props.push(b[c]);
		else this.props.push(b)
	}, bd.prototype.generateText = function() {
		var a = "";
		return (a += "Begin " + this.generateTextObjectDefinition()) + this.generateTextProps() + ("End " + this.objectDefinition[0].value)
	}, bd.prototype.generateTextObjectDefinition = function() {
		for (var a, b = [], c = 0, d = this.objectDefinition.length, e = "", f = ""; c < d; ++c) a = this.objectDefinition[c].value, e = "", this.objectDefinition[c].useDelimiter && (e = '"'), f = "", this.objectDefinition[c].name && (f = this.objectDefinition[c].name + "="), b.push(f + e + a + e);
		return b.join(" ") + "\n"
	}, bd.prototype.generateTextProps = function() {
		for (var a, b, c = [], d = 0, e = this.props.length, f = "", g = "", i = -1; d < e; ++d) g = U(this.props[d]), this.isBelow52Version || (a = g.indexOf("="), -1 !== (b = g.indexOf("(")) && b < a ? i = b : -1 !== a && (i = a), g = '"' + g.substring(0, i) + '"' + g.substring(i)), c.push(g);
		return 0 < (f = c.join("\n")).length && (f += "\n"), f
	}, bd.prototype.callbackInspectNode = function() {};

	function bk() {
		o.call(this), this.containsVisualNodes = !0
	}
	bk.prototype = new o, (bk.prototype.constructor = bk).prototype.generateHTML = function() {
		return {
			tag: "div",
			classes: ["node", "n_anim_state", "n_anim_state_reset_body", "pad10"],
			attrs: [{
				name: "style",
				value: this.generateCssNodeStyle().join(";")
			}, {
				name: "data-id",
				value: this.guid
			}],
			childs: [{
				tag: "div",
				classes: ["body"],
				childs: [],
				text: this.findHeaderName()
			}, {
				tag: "div",
				classes: ["left-col"],
				childs: this.generateHTMLPinsInput()
			}, {
				tag: "div",
				classes: ["right-col"],
				childs: this.generateHTMLPinsOutput()
			}]
		}
	}, bk.prototype.findHeaderName = function() {
		var a = "",
			b = h(this.props, "BoundGraph");
		return null === b ? "undefined" : '"' === (a = b.value.substring(20)).substring(0, 1) ? a.substring(1, a.length - 2) : a.substring(0, a.length - 1)
	}, bk.prototype.generateTextForUnreal = function(a) {
		return ""
	};

	function bB() {
		o.call(this)
	}
	bB.prototype = new o, (bB.prototype.constructor = bB).prototype.generateHTML = function() {
		return {
			tag: "div",
			classes: ["node", "n_anim_state"],
			attrs: [{
				name: "style",
				value: this.generateCssNodeStyle().join(";")
			}, {
				name: "data-id",
				value: this.guid
			}],
			childs: [{
				tag: "div",
				classes: ["body"],
				childs: [{
					tag: "div",
					classes: ["right-col"],
					childs: this.generateHTMLPinsOutput()
				}]
			}]
		}
	};

	function bl() {
		o.call(this), this.containsVisualNodes = !0
	}
	bl.prototype = new o, (bl.prototype.constructor = bl).prototype.generateHTML = function() {
		return this.pins[0].props.bHidden = !1, this.pins[1].props.bHidden = !1, {
			tag: "div",
			classes: ["node", "n_anim_state", "n_anim_state_reset_body", "white_body", "round"],
			attrs: [{
				name: "style",
				value: this.generateCssNodeStyle().join(";")
			}, {
				name: "data-id",
				value: this.guid
			}],
			childs: [{
				tag: "div",
				classes: ["body"],
				childs: [{
					tag: "div",
					classes: ["n_anim_transition"]
				}]
			}]
		}
	}, bl.prototype.findHeaderName = function() {
		var a = "",
			b = h(this.props, "BoundGraph");
		return null === b ? "undefined" : '"' === (a = b.value.substring(25)).substring(0, 1) ? a.substring(1, a.length - 2) : a.substring(0, a.length - 1)
	}, bl.prototype.generateTextForUnreal = function(a) {
		return ""
	};

	function bc() {
		o.call(this)
	}
	bc.prototype = new o, (bc.prototype.constructor = bc).prototype.generateHTML = function() {
		return this.disableTextOnPins(), {
			tag: "div",
			classes: ["node", "narray"],
			attrs: [{
				name: "style",
				value: this.generateCssNodeStyle().join(";")
			}, {
				name: "data-id",
				value: this.guid
			}],
			childs: [this.generateHTMLToolTip(), this.generateHTMLBody()]
		}
	}, bc.prototype.generateHTMLBody = function() {
		var a = [],
			b = h(this.objectDefinition, "Class"),
			c = h(this.props, "FunctionReference"),
			d = "",
			e = 130;
		return null === c ? null !== b && -1 !== b.value.indexOf("K2Node_GetArrayItem") && (d = "GET") : null !== (b = h(c.value, "MemberName")) && (d = cs(b.value)), "LastIndex" === d && (d = "", a = [{
			text: "Last"
		}, {
			tag: "br"
		}, {
			text: "Index"
		}], e = 150), "IsValidIndex" === d && (d = "", a = [{
			text: "Is Valid"
		}, {
			tag: "br"
		}, {
			text: "Index"
		}], e = 185), "Remove" === d && (d = "", a = [{
			text: "Remove"
		}, {
			tag: "br"
		}, {
			text: "Index"
		}], e = 185), "IsNotEmpty" === d && (d = "", a = [{
			text: "Is Not"
		}, {
			tag: "br"
		}, {
			text: "Empty"
		}], e = 185), "RemoveItem" === d && (d = "Remove", e = 185), "Length" === d ? e = 180 : "AddUnique" === d ? e = 225 : "Append" === d ? e = 180 : "Clear" === d ? e = 150 : "Contains" === d ? e = 200 : "Shuffle" === d ? e = 180 : "Resize" === d && (e = 150), {
			tag: "div",
			classes: ["body"],
			attrs: [{
				name: "style",
				value: "min-width:" + e + "px"
			}],
			childs: [{
				tag: "div",
				classes: ["center-text"],
				childs: [{
					tag: "span",
					text: d,
					childs: a
				}]
			}, {
				tag: "div",
				classes: ["center-text"],
				childs: [{
					tag: "div",
					classes: ["img-array", this.findCssClassArray()]
				}]
			}, {
				tag: "div",
				classes: ["round-bg"]
			}, {
				tag: "div",
				classes: ["left-col"],
				childs: this.generateHTMLPinsInput()
			}, {
				tag: "div",
				classes: ["right-col"],
				childs: this.generateHTMLPinsOutput()
			}]
		}
	}, bc.prototype.disableTextOnPins = function() {
		for (var a, b = 0, c = this.pins.length; b < c; ++b) this.pins[b].disableText(), null !== (a = this.pins[b].getPropFromPinType("PinCategory")) && '"int"' !== a.value && this.pins[b].disableInput()
	}, bc.prototype.findCssClassArray = function() {
		for (var a, b = null, c = null, d = null, e = "", f = 0, g = this.pins.length; f < g; ++f) this.pins[f].isInput() && null !== (a = h(this.pins[f].props, "PinName")) && ("TargetArray" === a.value && "struct" === (b = this.pins[f].getPropFromPinType("PinCategory").value) && (d = this.pins[f].getPropFromPinType("PinSubCategoryObject")), "Array" === a.value && "struct" === (c = this.pins[f].getPropFromPinType("PinCategory").value) && (d = this.pins[f].getPropFromPinType("PinSubCategoryObject")));
		return null !== b ? e = b : null !== c && (e = c), "struct" === e && null !== d && ("/Script/CoreUObject.ScriptStruct'" === d.value.substring(0, 33) && (d.value = d.value.substring(20)), "ScriptStruct'/Script/CoreUObject.Vector'" === d.value || "ScriptStruct'\"/Script/CoreUObject.Vector\"'" === d.value || "ScriptStruct'/Script/CoreUObject.Vector3f'" === d.value || "ScriptStruct'\"/Script/CoreUObject.Vector3f\"'" === d.value ? e = "vector" : "ScriptStruct'/Script/CoreUObject.Rotator'" === d.value || "ScriptStruct'\"/Script/CoreUObject.Rotator\"'" === d.value ? e = "rotator" : "ScriptStruct'/Script/CoreUObject.Transform'" !== d.value && "ScriptStruct'\"/Script/CoreUObject.Transform\"'" !== d.value || (e = "transform")), e
	};

	function K() {
		o.call(this), this.size = [400, 96]
	}
	K.prototype = new o, (K.prototype.constructor = K).prototype.generateHTML = function() {
		return {
			tag: "div",
			classes: ["node", "ncomment"],
			attrs: [{
				name: "style",
				value: this.generateCssNodeStyle().join(";")
			}, {
				name: "data-id",
				value: this.guid
			}],
			childs: [null, this.generateHTMLHeader()]
		}
	}, K.prototype.generateCssNodeStyle = function() {
		var a = o.prototype.generateCssNodeStyle.call(this);
		return a.push(this.addBodyStyleColor()), a
	}, K.prototype.generateHTMLHeader = function() {
		var a, b = [],
			c = 0,
			d = {
				tag: "div",
				classes: ["header"],
				attrs: [{
					name: "style",
					value: this.addHeaderStyleColor()
				}]
			},
			e = bu(this.comment).replace(/\\"/g, '"').replace(/\\'/g, "'").replace(/\\r/g, "").replace(/\\n/g, "\n"),
			f = e.split(/\n/g);
		if (1 === f.length) d.text = e;
		else {
			for (a = f.length; c < a; ++c) b.push({
				text: f[c]
			}), c + 1 < f.length && b.push({
				tag: "br"
			});
			d.childs = b
		}
		return d
	}, K.prototype.getColorComment = function() {
		var a = bE(255, 255, 255, 1),
			b = h(this.props, "CommentColor");
		return null !== b && a.setValuesFromProps(b.value), a
	}, K.prototype.addBodyStyleColor = function() {
		var a = this.getColorComment();
		return a.alpha = .1, "background-color:" + a.generateCss()
	}, K.prototype.addHeaderStyleColor = function() {
		var a = this.getColorComment();
		return a.alpha = .5, "background-color:" + a.generateCss()
	};

	function bR(a, b) {
		for (var c, d, e = "", f = J(b), g = 0, i = a.length, j = 0; g < i; ++g) {
			if (e += f + "Begin " + a[g].generateTextObjectDefinition(), 0 < a[g].nodes.length && (e += bR(a[g].nodes, b + 1)), a[g].isBelow413Version)
				for (c = J(b + 1), j = 0, d = a[g].pins.length; j < d; ++j) e = e + (c + 'Begin Object Class=EdGraphPin Name="' + a[g].pins[j].id) + '"\n' + c + "End Object\n";
			e += f + "End " + a[g].objectDefinition[0].value + "\n"
		}
		return e
	}

	function bD(a, b) {
		for (var c = "", d = J(b), e = 0, f = a.length; e < f; ++e) c += d + "Begin Object" + a[e].generateTextObjectDefinitionNameOnly(), 0 < a[e].nodes.length && (c += bD(a[e].nodes, b + 1)), c = c + a[e].generateTextProps(b + 1) + (d + "End Object\n");
		return c
	}

	function ba() {
		o.call(this), this.containsVisualNodes = !0
	}
	ba.prototype = new o, (ba.prototype.constructor = ba).prototype.generateHTMLHeader = function() {
		return {
			tag: "div",
			classes: ["header"],
			childs: [{
				tag: "span",
				classes: ["name"],
				childs: [{
					text: this.findHeaderName()
				}, {
					tag: "br"
				}, {
					tag: "span",
					classes: ["subname"],
					text: "Collapsed Graph"
				}]
			}]
		}
	}, ba.prototype.findHeaderName = function() {
		var a = "",
			b = h(this.props, "BoundGraph");
		return null === b ? "undefined" : '"' === (a = b.value.substring(8)).substring(0, 1) ? a.substring(1, a.length - 2) : a.substring(0, a.length - 1)
	}, ba.prototype.generateTextForUnreal = function(a) {
		var b = this.nodes.length,
			c = 0,
			d = "",
			e = J(a);
		for (d += "Begin " + this.generateTextObjectDefinition(); c < b; ++c) d = (d = (d = (d = (d = (d += e + "Begin " + this.nodes[c].generateTextObjectDefinition()) + bR(this.nodes[c].nodes, a + 1)) + e + "End " + this.nodes[c].objectDefinition[0].value + "\n") + e + "Begin Object " + this.nodes[c].generateTextObjectDefinitionNameOnly()) + bD(this.nodes[c].nodes, a + 1)) + this.nodes[c].generateTextProps(a + 1) + e + "End Object\n";
		return d = (d += this.generateTextProps(a)) + ("End " + this.objectDefinition[0].value)
	}, ba.prototype.isRealCompositeNode = function() {
		var a = h(this.objectDefinition, "Class"),
			b = h(this.objectDefinition, "Name");
		return null !== a ? -1 !== a.value.indexOf("K2Node_Composite") : null === b || -1 !== b.value.indexOf("K2Node_Composite")
	};

	function O() {
		o.call(this)
	}
	O.prototype = new o, (O.prototype.constructor = O).prototype.generateHTML = function() {
		return this.disableTextOnPins(), {
			tag: "div",
			classes: ["node", "nconv"],
			attrs: [{
				name: "style",
				value: this.generateCssNodeStyle().join(";")
			}, {
				name: "data-id",
				value: this.guid
			}],
			childs: [this.generateHTMLToolTip(), this.generateHTMLBody()]
		}
	}, O.prototype.generateHTMLBody = function() {
		return {
			tag: "div",
			classes: ["body"],
			childs: [{
				tag: "div",
				classes: ["round-bg"]
			}, {
				tag: "div",
				classes: ["left-col"],
				childs: this.generateHTMLPinsInput()
			}, {
				tag: "div",
				classes: ["right-col"],
				childs: this.generateHTMLPinsOutput()
			}]
		}
	}, O.prototype.disableTextOnPins = function() {
		for (var a = 0, b = this.pins.length; a < b; ++a) this.pins[a].disableText()
	};

	function L() {
		o.call(this)
	}
	L.prototype = new o, (L.prototype.constructor = L).prototype.findCssClassNodeColor = function() {
		return "pure-function-call"
	}, L.prototype.findCssClassNodeIcon = function() {
		return "blueprint-node"
	}, L.prototype.findHeaderName = function() {
		return "Create Event"
	}, L.prototype.generateHTMLPinDelegate = function() {
		return []
	}, L.prototype.generateHTMLPinsOutput = function() {
		for (var a = [], b = 0, c = this.isAdvancedPinDisplayExpanded(), d = this.pins.length; b < d; ++b) this.pins[b].isOutput() && a.push(this.pins[b].generateHTML(c, this));
		return a
	}, L.prototype.generateHTMLBody = function() {
		var a = [{
				tag: "div",
				classes: ["body"],
				childs: [{
					tag: "div",
					classes: ["left-col"],
					childs: this.generateHTMLPinsInput()
				}, {
					tag: "div",
					classes: ["right-col"],
					childs: this.generateHTMLPinsOutput()
				}]
			}],
			b = h(this.props, "SelectedFunctionName");
		return null !== b && a.push({
			tag: "div",
			childs: [{
				tag: "div",
				attrs: [{
					name: "style",
					value: "padding:5px"
				}],
				text: "Signature: ()"
			}, {
				tag: "div",
				attrs: [{
					name: "style",
					value: "padding:5px"
				}],
				childs: [{
					tag: "select",
					attrs: [{
						name: "disabled",
						value: "disabled"
					}],
					childs: [{
						tag: "option",
						text: b.value + "()"
					}]
				}]
			}]
		}), a
	};

	function bn() {
		o.call(this)
	}
	bn.prototype = new o, (bn.prototype.constructor = bn).prototype.generateHTML = function() {
		return this.disableTextOnPins(), {
			tag: "div",
			classes: ["node", "ndot"],
			attrs: [{
				name: "style",
				value: this.generateCssNodeStyle().join(";")
			}, {
				name: "data-id",
				value: this.guid
			}],
			childs: [this.generateHTMLToolTip(), this.generateHTMLBody()]
		}
	}, bn.prototype.generateHTMLBody = function() {
		return {
			tag: "div",
			classes: ["body"],
			childs: [{
				tag: "div",
				classes: ["round-bg"]
			}, {
				tag: "div",
				classes: ["left-col"],
				childs: this.generateHTMLPinsInput()
			}, {
				tag: "div",
				classes: ["right-col"],
				childs: this.generateHTMLPinsOutput()
			}]
		}
	}, bn.prototype.disableTextOnPins = function() {
		for (var a = 0, b = this.pins.length; a < b; ++a) this.pins[a].disableText()
	};

	function bm() {
		o.call(this)
	}
	bm.prototype = new o, (bm.prototype.constructor = bm).prototype.findCssClassNodeColor = function() {
		return "event"
	}, bm.prototype.findCssClassNodeIcon = function() {
		return "event"
	}, bm.prototype.findHeaderName = function() {
		var a, b = h(this.props, "InputAction"),
			c = "None";
		return "EnhancedInputAction " + (c = null !== b && -1 !== (a = b.value.lastIndexOf(".")) ? b.value.substring(a += 1).replace("'", "").replace('"', "") : c)
	};

	function M() {
		o.call(this)
	}
	M.prototype = new o, (M.prototype.constructor = M).prototype.findCssClassNodeColor = function() {
		return "event"
	}, M.prototype.findCssClassNodeIcon = function() {
		return "event"
	}, M.prototype.findHeaderName = function() {
		var a, b, c, d = "Event",
			e = ["FunctionReference", "EventReference", "EventSignatureName"],
			f = 0,
			g = e.length,
			i = "",
			j = h(this.objectDefinition, "Class"),
			l = null;
		if (null !== j && (-1 !== j.value.indexOf("K2Node_ComponentBoundEvent") || -1 !== j.value.indexOf("K2Node_ActorBoundEvent"))) {
			if (i = null === (a = h(this.props, "ComponentPropertyName")) ? "None" : a.value, a = h(this.props, "DelegatePropertyName"), null !== (b = h(this.props, "DelegatePropertyDisplayName"))) return bf(b) + " (" + i + ")";
			if (null !== a) return a.value + " (" + i + ")"
		}
		if (null !== j && -1 !== j.value.indexOf("K2Node_InputAxisEvent")) return "InputAxis " + h(this.props, "InputAxisName").value;
		for (; f < g; ++f)
			if (null !== (c = h(this.props, e[f]))) return null === (l = h(c.value, "MemberName")) ? c.value : -1 !== l.value.indexOf("Receive") ? d + " " + l.value.substring(7) : d + " " + l.value;
		return d
	};

	function X() {
		o.call(this)
	}
	X.prototype = new o, (X.prototype.constructor = X).prototype.findCssClassNodeColor = function() {
		return "event"
	}, X.prototype.findCssClassNodeIcon = function() {
		return "event-custom"
	}, X.prototype.findHeaderName = function() {
		var a = h(this.props, "CustomFunctionName");
		return null === a ? "" : a.value
	}, X.prototype.findHeaderSubname = function() {
		return "CustomEvent"
	};

	function bh() {
		o.call(this)
	}
	bh.prototype = new o, (bh.prototype.constructor = bh).prototype.findCssClassNodeColor = function() {
		return "exec-branch"
	}, bh.prototype.findCssClassNodeIcon = function() {
		return "exec-branch"
	}, bh.prototype.findHeaderName = function() {
		return "Branch"
	};

	function bi() {
		o.call(this)
	}
	bi.prototype = new o, (bi.prototype.constructor = bi).prototype.findCssClassNodeColor = function() {
		return "event"
	}, bi.prototype.findCssClassNodeIcon = function() {
		return "event"
	}, bi.prototype.findHeaderName = function() {
		return "InputAction " + h(this.props, "InputActionName").value
	};
	var ck = {
		Exclamation: "!",
		Quote: '"',
		LeftParantheses: "(",
		RightParantheses: ")",
		LeftBracket: "[",
		RightBracket: "]",
		Section: "§",
		Slash: "/",
		Backslash: "\\",
		Ampersand: "&",
		Tilde: "`",
		Caret: "^",
		Equals: "=",
		Dollar: "$",
		Zero: "0",
		One: "1",
		Two: "2",
		Three: "3",
		Four: "4",
		Five: "5",
		Six: "6",
		Seven: "7",
		Eight: "8",
		Nine: "9",
		A_AccentGrave: "à",
		AnyKey: "Any Key",
		C_Cedille: "ç",
		CapsLock: "Caps Lock",
		E_AccentAigu: "é",
		E_AccentGrave: "è",
		LeftAlt: "Left Alt",
		LeftCommand: "Left Cmd",
		LeftControl: "Left Ctrl",
		LeftShift: "Left Shift",
		Subtract: "Num -",
		Decimal: "Num .",
		Multiply: "Num *",
		Divide: "Num /",
		Add: "Num +",
		NumPadZero: "Num 0",
		NumPadOne: "Num 1",
		NumPadTwo: "Num 2",
		NumPadThree: "Num 3",
		NumPadFour: "Num 4",
		NumPadFive: "Num 5",
		NumPadSix: "Num 6",
		NumPadSeven: "Num 7",
		NumPadEight: "Num 8",
		NumPadNine: "Num 9",
		NumLock: "Num Lock",
		PageDown: "Page Down",
		PageUp: "Page Up",
		RightAlt: "Right Alt",
		RightCommand: "Right Cmd",
		RightControl: "Right Ctrl",
		RightShift: "Right Shift",
		ScrollLock: "Scroll Lock",
		SpaceBar: "Space Bar"
	};

	function I() {
		o.call(this)
	}
	I.prototype = new o, (I.prototype.constructor = I).prototype.findCssClassNodeColor = function() {
		return "event"
	}, I.prototype.findCssClassNodeIcon = function() {
		var a = h(this.props, "InputKey"),
			b = h(this.props, "AxisKey"),
			c = h(this.objectDefinition, "Class");
		if (null !== a) {
			if (0 === a.value.indexOf("Gamepad_")) return "input-gamepad";
			if (0 === a.value.indexOf("MotionController_")) return "input-gamepad";
			if (0 === a.value.indexOf("Oculus")) return "input-gamepad";
			if (0 === a.value.indexOf("Steam")) return "input-gamepad";
			if (-1 !== a.value.indexOf("Mouse")) return "input-mouse";
			if (0 === a.value.indexOf("Touch")) return "input-touch"
		} else {
			if (null !== c && -1 !== c.value.indexOf("K2Node_InputTouch")) return "input-touch";
			if (null !== c && -1 !== c.value.indexOf("K2Node_InputAxisKeyEvent") && null !== b.value) {
				if (-1 !== b.value.indexOf("Mouse")) return "input-mouse";
				if (0 === b.value.indexOf("Gamepad_")) return "input-gamepad"
			}
		}
		return "input-key"
	}, I.prototype.findHeaderName = function() {
		var a = "",
			b = h(this.props, "InputKey"),
			c = h(this.props, "AxisKey"),
			d = h(this.objectDefinition, "Class");
		if (null !== b) a = b.value;
		else {
			if (null !== d && -1 !== d.value.indexOf("K2Node_InputTouch")) return "InputTouch";
			null !== d && -1 !== d.value.indexOf("K2Node_InputAxisKeyEvent") && null !== c && (a = c.value)
		}
		return a = void 0 === ck[a] ? D(a) : ck[a], a = null !== d && -1 !== d.value.indexOf("K2Node_InputDebugKey") ? "Debug Key " + a : a
	}, I.prototype.generateHTMLBody = function() {
		return [{
			tag: "div",
			classes: ["body"],
			childs: [{
				tag: "div",
				classes: ["right-col"],
				childs: this.generateHTMLPinsOutput()
			}]
		}]
	};

	function S() {
		o.call(this)
	}
	S.prototype = new o, (S.prototype.constructor = S).prototype.generateHTML = function() {
		return this.disableTextOnPins(), {
			tag: "div",
			classes: ["node", "nkismetmath"],
			attrs: [{
				name: "style",
				value: this.generateCssNodeStyle().join(";")
			}, {
				name: "data-id",
				value: this.guid
			}],
			childs: [this.generateHTMLToolTip(), this.generateHTMLBody()]
		}
	}, S.prototype.generateHTMLBody = function() {
		var a = "",
			b = h(this.props, "MacroGraphReference"),
			c = h(this.objectDefinition, "Class"),
			d = null;
		return null !== c && -1 !== c.value.indexOf("K2Node_EnumEquality") ? a = "==" : null !== c && -1 !== c.value.indexOf("K2Node_EnumInequality") ? a = "!=" : null === b ? (c = h(this.props, "FunctionReference"), c = h(c.value, "MemberName"), a = bY(c.value)) : -1 !== (d = h(b.value, "MacroGraph")).value.indexOf("StandardMacros:Increment") ? a = "++" : -1 !== d.value.indexOf("StandardMacros:Decrement") && (a = "--"), {
			tag: "div",
			classes: ["body"],
			childs: [{
				tag: "div",
				classes: ["center-text"],
				childs: [{
					tag: "span",
					text: a,
					childs: a
				}]
			}, {
				tag: "div",
				classes: ["round-bg"]
			}, {
				tag: "div",
				classes: ["left-col"],
				childs: this.generateHTMLPinsInput()
			}, {
				tag: "div",
				classes: ["right-col"],
				childs: this.generateHTMLPinsOutput()
			}]
		}
	}, S.prototype.disableTextOnPins = function() {
		for (var a = 0, b = this.pins.length; a < b; ++a) null === h(this.pins[a].props, "PinFriendlyName") && this.pins[a].disableText()
	};

	function Y() {
		o.call(this)
	}
	Y.prototype = new o, (Y.prototype.constructor = Y).prototype.generateHTML = function() {
		var a, b = {
				tag: "div",
				classes: ["node", "knot"],
				attrs: [{
					name: "style",
					value: this.generateCssNodeStyle().join(";")
				}, {
					name: "data-id",
					value: this.guid
				}],
				childs: [this.generateHTMLToolTip()]
			},
			c = 0,
			d = this.generateHTMLBody();
		if (Array.isArray(d))
			for (a = d.length; c < a; ++c) b.childs.push(d[c]);
		else b.childs.push(d);
		return b
	}, Y.prototype.generateHTMLPinsInput = function() {
		for (var a = [], b = this.isAdvancedPinDisplayExpanded(), c = 0, d = this.pins.length; c < d; ++c) this.pins[c].isInput() && (this.pins[c].disableTextAndInput(), a.push(this.pins[c].generateHTML(b, this)));
		return a
	}, Y.prototype.generateHTMLPinsOutput = function() {
		for (var a = [], b = this.isAdvancedPinDisplayExpanded(), c = 0, d = this.pins.length; c < d; ++c) this.pins[c].isOutput() && (this.pins[c].disableTextAndInput(), a.push(this.pins[c].generateHTML(b, this)));
		return a
	};

	function Z() {
		o.call(this)
	}
	Z.prototype = new o, (Z.prototype.constructor = Z).prototype.generateHTMLHeader = function() {
		for (var a = 0, b = this.pins.length; a < b; ++a) this.pins[a].disableInput(), this.pins[a].override.connectorType = {
			connector: "connector",
			type: "materialinput"
		};
		return {
			tag: "div",
			classes: ["header", "node-color", this.findCssClassNodeColor(), "gradient"],
			childs: [{
				tag: "span",
				classes: ["name"],
				text: this.getMaterialName()
			}]
		}
	}, Z.prototype.findCssClassNodeColor = function() {
		var a = h(this.nodes[0].objectDefinition, "Class");
		return null !== a && -1 !== a.value.indexOf("MaterialExpressionMaterialFunctionCall") ? "function-call" : null !== a && -1 !== a.value.indexOf("MaterialExpressionConstantVector") ? "material-constant" : null !== a && -1 !== a.value.indexOf("MaterialExpressionConstant") || null !== a && -1 !== a.value.indexOf("MaterialExpression") ? "pure-function-call" : ""
	}, Z.prototype.getMaterialName = function() {
		var a, b, c = "",
			d = -1,
			e = "Lerp",
			f = ["0", "1", "0.5"],
			g = null,
			i = 0,
			j = null,
			l = null,
			k = null,
			n = null,
			m = h(this.nodes[0].objectDefinition, "Class"),
			p = null,
			q = null,
			u = null;
		if (null === m) return "";
		if (-1 !== m.value.indexOf("MaterialExpressionMaterialFunctionCall")) {
			if (null === (p = h(this.nodes[1].props, "MaterialFunction"))) return "Unspecified Function";
			if (-1 !== (d = p.value.indexOf(".")) && -1 !== (p = (c = p.value.substring(d += 1)).indexOf("'"))) return c.substr(0, p).replace('"', "")
		} else {
			if (-1 !== m.value.indexOf("MaterialExpressionLinearInterpolate")) return this.pins[0].isLinkedTo() && (f[0] = ""), this.pins[1].isLinkedTo() && (f[1] = ""), this.pins[2].isLinkedTo() && (f[2] = ""), ",," !== (c = f.join(",")) && (e += "(" + c + ")"), e;
			if (-1 !== m.value.indexOf("MaterialExpressionConstant")) {
				if (null === (g = h(this.nodes[1].props, "Constant"))) return q = h(this.nodes[1].props, "R"), u = h(this.nodes[1].props, "G"), null !== q && null !== u ? q.value.replace(/(\.\d+?)0+\b/, "$1") + "," + u.value.replace(/(\.\d+?)0+\b/, "$1") : null !== q ? q.value.replace(/(\.\d+?)0+\b/, "$1") : "0";
				for (a = g.value.length; i < a; ++i) b = g.value[i].value.replace(/(\.\d+?)0+\b/, "$1"), "R" === g.value[i].name && (j = b), "G" === g.value[i].name && (l = b), "B" === g.value[i].name && (k = b), "A" === g.value[i].name && (n = b);
				return -1 !== m.value.indexOf("Constant4Vector") ? j + "," + l + "," + k + "," + n : j + "," + l + "," + k
			}
			if (-1 !== m.value.indexOf("MaterialExpression") && -1 !== (d = m.value.indexOf("MaterialExpression"))) return m.value.substr(d += 18)
		}
		return ""
	}, Z.prototype.generateTextForUnreal = function(a) {
		var b = "",
			c = 0,
			d = this.nodes.length;
		for (b += "Begin " + this.generateTextObjectDefinition(); c < d; ++c) void 0 !== this.nodes[c].generateText ? b += this.nodes[c].generateText() + "\n" : void 0 !== this.nodes[c].generateTextForUnreal && (b += this.nodes[c].generateTextForUnreal(a + 1) + "\n");
		return b = (b += this.generateTextProps(a)) + ("End " + this.objectDefinition[0].value)
	};

	function N() {
		o.call(this), this.size = [400, 96]
	}
	N.prototype = new o, (N.prototype.constructor = N).prototype.generateHTML = function() {
		return {
			tag: "div",
			classes: ["node", "ncomment"],
			attrs: [{
				name: "style",
				value: this.generateCssNodeStyle().join(";")
			}, {
				name: "data-id",
				value: this.guid
			}],
			childs: [this.generateHTMLHeader()]
		}
	}, N.prototype.generateCssNodeStyle = function() {
		var a = o.prototype.generateCssNodeStyle.call(this);
		return a.push(this.addBodyStyleColor()), a
	}, N.prototype.generateHTMLHeader = function() {
		var a, b = [],
			c = 0,
			d = {
				tag: "div",
				classes: ["header"],
				attrs: [{
					name: "style",
					value: this.addHeaderStyleColor()
				}]
			},
			e = bu(this.comment).replace(/\\"/g, '"').replace(/\\'/g, "'").replace(/\\r/g, "").replace(/\\n/g, "\n"),
			f = e.split(/\n/g);
		if (1 === f.length) d.text = e;
		else {
			for (a = f.length; c < a; ++c) b.push({
				text: f[c]
			}), c + 1 < f.length && b.push({
				tag: "br"
			});
			d.childs = b
		}
		return d
	}, N.prototype.getColorComment = function() {
		var a = bE(255, 255, 255, 1),
			b = h(this.props, "CommentColor");
		return null !== b && a.setValuesFromProps(b.value), a
	}, N.prototype.addBodyStyleColor = function() {
		var a = this.getColorComment();
		return a.alpha = .1, "background-color:" + a.generateCss()
	}, N.prototype.addHeaderStyleColor = function() {
		var a = this.getColorComment();
		return a.alpha = .5, "background-color:" + a.generateCss()
	};

	function bt() {
		o.call(this)
	}
	bt.prototype = new o, (bt.prototype.constructor = bt).prototype.generateHTMLHeader = function() {
		for (var a = 0, b = this.pins.length; a < b; ++a) this.pins[a].disableInput();
		return {
			tag: "div",
			classes: ["header", "node-color", "material-graph-root", "gradient"],
			childs: [{
				tag: "span",
				classes: ["name"],
				text: this.getMaterialName()
			}]
		}
	}, bt.prototype.getMaterialName = function() {
		var a, b = h(this.props, "Material"),
			c = b.value.indexOf(".");
		if (-1 !== c) return a = b.value.indexOf("'", c += 1), b.value.substr(c, a - c).replace('"', "")
	};
	var cP = {
		BIQUAD_FILTER_TYPE: [{
			name: "Low Pass",
			value: "0"
		}, {
			name: "High Pass",
			value: "1"
		}, {
			name: "Band Pass",
			value: "2"
		}, {
			name: "Notch",
			value: "3"
		}, {
			name: "Parametric EQ",
			value: "4"
		}, {
			name: "Low Shelf",
			value: "5"
		}, {
			name: "High Shelf",
			value: "6"
		}, {
			name: "All Pass",
			value: "7"
		}, {
			name: "Butterworth Low Pass",
			value: "8"
		}, {
			name: "Butterworth High Pass",
			value: "9"
		}],
		BUFFER_TRIGGER_TYPE: [{
			name: "Rising Edge",
			value: "0"
		}, {
			name: "Falling Edge",
			value: "1"
		}, {
			name: "Abs Threshold",
			value: "2"
		}],
		DYNAMIC_FILTER_TYPE: [{
			name: "Bell",
			value: "0"
		}, {
			name: "Low Shelf",
			value: "1"
		}, {
			name: "High Shelf",
			value: "2"
		}],
		ENVELOPE_PEAK_MODE: [{
			name: "MS",
			value: "1"
		}, {
			name: "RMS",
			value: "2"
		}, {
			name: "Peak",
			value: "0"
		}],
		FILTER_ORDER: [{
			name: "Two Pole",
			value: "0"
		}, {
			name: "Four Pole",
			value: "1"
		}, {
			name: "Six Pole",
			value: "2"
		}, {
			name: "Eight Pole",
			value: "3"
		}],
		GRAIN_DELAY_ENVELOPE: [{
			name: "Gaussian",
			value: "0"
		}, {
			name: "Triangle",
			value: "1"
		}, {
			name: "Downward Triangle",
			value: "2"
		}, {
			name: "Upward Triangle",
			value: "3"
		}, {
			name: "Exponential Decay",
			value: "4"
		}, {
			name: "Exponential Attack",
			value: "5"
		}],
		KNEE_MODE: [{
			name: "Hard",
			value: "0"
		}, {
			name: "Soft",
			value: "1"
		}],
		LFO_WAVESHAPE_TYPE: [{
			name: "Sine",
			value: "0"
		}, {
			name: "Saw",
			value: "1"
		}, {
			name: "Triangle",
			value: "2"
		}, {
			name: "Square",
			value: "3"
		}],
		MUSICAL_SCALE: [{
			name: "Major Scale",
			value: "0"
		}, {
			name: "Minor (Dorian)",
			value: "2"
		}, {
			name: "Phrygian",
			value: "27"
		}, {
			name: "Lydian",
			value: "6"
		}, {
			name: "Dominant 7th (Mixolydian)",
			value: "1"
		}, {
			name: "Natural Minor (Aeolian)",
			value: "28"
		}, {
			name: "Half Diminished (Locrian)",
			value: "3"
		}, {
			name: "Diminished",
			value: "4"
		}, {
			name: "Chromatic",
			value: "19"
		}, {
			name: "Whole-Tone",
			value: "18"
		}, {
			name: "Diminished Whole-Tone",
			value: "20"
		}, {
			name: "Major Pentatonic",
			value: "5"
		}, {
			name: "Minor Pentatonic",
			value: "21"
		}, {
			name: "Blues",
			value: "13"
		}, {
			name: "Bebop (Major)",
			value: "7"
		}, {
			name: "Bebop (Minor)",
			value: "22"
		}, {
			name: "Bebop (Minor) #2",
			value: "24"
		}, {
			name: "Bebop (Dominant)",
			value: "14"
		}, {
			name: "Harmonic Major",
			value: "8"
		}, {
			name: "Harmonic Minor",
			value: "25"
		}, {
			name: "Melodic Minor",
			value: "23"
		}, {
			name: "Sixth Mode of Harmonic Minor",
			value: "11"
		}, {
			name: "Lydian Augmented",
			value: "9"
		}, {
			name: "Lydian Dominant",
			value: "16"
		}, {
			name: "Augmented",
			value: "10"
		}, {
			name: "Diminished (Begin With Half-Step)",
			value: "12"
		}, {
			name: "Diminished (Begin With Whole-Step)",
			value: "26"
		}, {
			name: "Half-Diminished (Locrian #2)",
			value: "29"
		}, {
			name: "Spanish or Jewish Scale",
			value: "15"
		}, {
			name: "Hindu",
			value: "17"
		}],
		NOISE_TYPE: [{
			name: "Pink Noise",
			value: "0"
		}, {
			name: "White Noise",
			value: "1"
		}],
		PANNING_LAW: [{
			name: "Equal Power",
			value: "0"
		}, {
			name: "Linear",
			value: "1"
		}],
		SAW_GENERATION_TYPE: [{
			name: "Poly Smooth",
			value: "0"
		}, {
			name: "Trivial",
			value: "1"
		}],
		SINE_GENERATION_TYPE: [{
			name: "2D Rotation",
			value: "0"
		}, {
			name: "Pure Math",
			value: "1"
		}, {
			name: "Bhaskara",
			value: "2"
		}, {
			name: "Wavetable",
			value: "3"
		}],
		SQUARE_GENERATION_TYPE: [{
			name: "Poly Smooth",
			value: "0"
		}, {
			name: "Trivial",
			value: "1"
		}],
		STEREO_DELAY_MODE: [{
			name: "Normal",
			value: "0"
		}, {
			name: "Cross",
			value: "1"
		}, {
			name: "Ping Pong",
			value: "2"
		}],
		TRIANGLE_GENERATION_TYPE: [{
			name: "Poly Smooth",
			value: "0"
		}, {
			name: "Trivial",
			value: "1"
		}],
		TRIGGER_COMPARISON_TYPE: [{
			name: "Equals",
			value: "0"
		}, {
			name: "Not Equals",
			value: "1"
		}, {
			name: "Less Than",
			value: "2"
		}, {
			name: "Greater Than",
			value: "3"
		}, {
			name: "Less Than Or Equals",
			value: "4"
		}, {
			name: "Greater Than Or Equals",
			value: "5"
		}],
		WAVE_SHAPER_TYPE: [{
			name: "Sine",
			value: "0"
		}, {
			name: "Inverse Tangent",
			value: "1"
		}, {
			name: "Hyperbolic Tangent",
			value: "2"
		}, {
			name: "Cubic Polynomial",
			value: "3"
		}, {
			name: "Hard Clip",
			value: "4"
		}],
		WAVE_TABLE_ENVELOPE_MODE: [{
			name: "Loop",
			value: "3"
		}, {
			name: "Hold",
			value: "2"
		}, {
			name: "Unit",
			value: "1"
		}, {
			name: "Zero",
			value: "0"
		}],
		WAVE_TABLE_INTERPOLATION: [{
			name: "None (Step)",
			value: "0"
		}, {
			name: "Linear",
			value: "1"
		}, {
			name: "Cubic",
			value: "2"
		}]
	};

	function F() {
		o.call(this)
	}
	F.prototype = new o, (F.prototype.constructor = F).prototype.findHeaderName = function() {
		var a = null,
			b = "",
			c = null,
			d = h(this.props, "ClassName"),
			e = h(this.props, "bIsClassNative"),
			f = {
				DynamicFilter: "Dynamic Filter",
				"Musical Scale To Note Array": "Scale To Note Array",
				TriggerOnThreshold: "Trigger On Threshold",
				"Wave BPMToSeconds": "BPM To Seconds",
				GrainDelayNode: "Grain Delay",
				WaveTableEnvelope: "WaveTable Envelope",
				WaveTableOscillator: "WaveTable Oscillator",
				"Convert Filter Q To Bandwidth": "Filter Q To Bandwidth",
				MetasoundWaveTableGet: "Get WaveTable From Bank"
			};
		if (null !== d) return null !== e && "False" === e.value ? "MetaSoundSource" : (e = h(d.value, "Namespace"), a = h(d.value, "Name"), d = h(d.value, "Variant"), null !== e && -1 !== ["Array", "Print Log", "AD Envelope", "ADSR Envelope", "Crossfade", "MapRange", "Clamp", "Max", "Min", "TriggerCompare", "TriggerRoute"].indexOf(e.value) ? "Crossfade" === e.value ? "Crossfade " + a.value.substring(13) : "TriggerRoute" === e.value ? a.value : (b = a.value, "Concat" === a.value && (b = "Concatenate"), "MapRange" === e.value && (b = "Map Range"), (b = "TriggerCompare" === e.value ? "Trigger Compare" : b) + " (" + d.value + ")") : "Wave Player" === a.value ? "5dot1" === d.value ? "Wave Player (5.1)" : "7dot1" === d.value ? "Wave Player (7.1)" : "Wave Player (" + d.value + ")" : "WaveWriter" === (e = a.value.substring(0, 10)) ? "Wave Writer (Mono)" : "Band Split" === e ? a.value.substring(a.value.indexOf("(") + 1, a.value.indexOf(",")) + " Band Splitter (" + a.value.substring(a.value.length - 2, a.value.length - 1) + ")" : "Audio Mixe" === e ? a.value.substring(a.value.indexOf("(") + 1, a.value.indexOf(",")) + " Mixer (" + a.value.substring(a.value.length - 2, a.value.length - 1) + ")" : void 0 !== f[a.value] ? f[a.value] : -1 !== ["MIDI To Frequency", "Trigger On Value Change", "Value"].indexOf(a.value) ? a.value + " (" + d.value + ")" : a.value);
		if (null !== (c = h(this.objectDefinition, "Class"))) {
			if (-1 !== c.value.indexOf("/Script/MetasoundEditor.MetasoundEditorGraphInputNode")) return "Input";
			if (-1 !== c.value.indexOf("/Script/MetasoundEditor.MetasoundEditorGraphOutputNode")) return "Output"
		}
		return o.prototype.findHeaderName.call(this)
	}, F.prototype.generateHTML = function() {
		var a, b = {
				tag: "div",
				classes: ["node", "nmetasound", this.findCssClassNodeIcon()],
				attrs: [{
					name: "style",
					value: this.generateCssNodeStyle().join(";")
				}, {
					name: "data-id",
					value: this.guid
				}],
				childs: [this.generateHTMLToolTip(), this.generateHTMLHeader()]
			},
			c = null,
			d = 0,
			e = h(this.props, "ClassName"),
			f = !1;
		if (null === e || null === (e = h(e.value, "Namespace")) || "VariableMutator" !== e.value && "VariableAccessor" !== e.value && "VariableDeferredAccessor" !== e.value || (f = !0, b.classes.push("variable")), this.detectInputSelectToCreate(), c = this.generateHTMLBody(), Array.isArray(c))
			for (f && c[0].childs.unshift({
					tag: "div",
					attrs: [{
						name: "class",
						value: "round-bg"
					}]
				}), a = c.length; d < a; ++d) b.childs.push(c[d]);
		else c.childs.unshift({
			tag: "div",
			attrs: [{
				name: "class",
				value: "round-bg"
			}]
		}), b.childs.push(c);
		return "" !== (e = this.getIconCenterClass()) && (b.classes.push("icon-center"), b.classes.push(e)), b
	}, F.prototype.getIconCenterClass = function() {
		var a = h(this.props, "ClassName"),
			b = "",
			c = "";
		if (null !== a) {
			if (null !== (b = h(a.value, "Namespace")) && "convert" === b.value.toLowerCase()) return "conv";
			if (null !== (c = h(a.value, "Name"))) {
				if ("conversion" === c.value.toLowerCase().substring(0, 10)) return "conv";
				if (-1 !== ["add", "divide", "logarithm", "modulo", "multiply", "power", "subtract"].indexOf(c.value.toLowerCase())) return "math-" + c.value.toLowerCase()
			}
		}
		return ""
	}, F.prototype.generateHTMLHeader = function() {
		var a, b = h(this.props, "ClassName"),
			c = "",
			d = null,
			e = this.generateHTMLPinDelegate(),
			f = 0,
			g = e.length;
		if (null !== b) {
			if (null !== (a = h(b.value, "Namespace"))) {
				if ("Convert" === a.value) return this.disableTextOnPins(), d;
				if ("VariableMutator" === a.value || "VariableAccessor" === a.value) return d;
				if ("VariableDeferredAccessor" === a.value) return {
					tag: "div",
					classes: ["header", "icon-async"]
				}
			}
			if (null !== (c = h(b.value, "Name"))) {
				if ("Conversion" === c.value.substring(0, 10)) return this.disableTextOnPins(), d;
				if (-1 !== ["add", "divide", "logarithm", "modulo", "multiply", "power", "subtract"].indexOf(c.value.toLowerCase())) return this.disableTextOnPins(), d
			}
		}
		for (d = {
				tag: "div",
				classes: ["header", "node-color", this.findCssClassNodeColor(), "gradient"],
				childs: [{
					tag: "span",
					classes: ["has-icon", "name"],
					childs: [{
						tag: "div",
						classes: ["icon", this.findCssClassNodeIcon()],
						text: this.findHeaderName()
					}]
				}]
			}; f < g; ++f) d.childs.push(e[f]);
		return d
	}, F.prototype.generateHTMLBody = function() {
		var a = this.findCssClassNodeIcon(),
			b = [{
				tag: "div",
				classes: ["body"],
				childs: [{
					tag: "div",
					classes: ["left-col"],
					childs: this.generateHTMLPinsInput()
				}, {
					tag: "div",
					classes: ["right-col"],
					childs: this.generateHTMLPinsOutput()
				}]
			}];
		return "input" === a && (b[0].childs = [b[0].childs[1]]), "output" === a && (b[0].childs = [b[0].childs[0]]), this.hasAdvancedPinDisplay() && (this.isAdvancedPinDisplayExpanded() ? b.push({
			tag: "div",
			classes: ["less"],
			childs: [{
				tag: "span"
			}]
		}) : b.push({
			tag: "div",
			classes: ["more"],
			childs: [{
				tag: "span"
			}]
		})), b
	}, F.prototype.findCssClassNodeIcon = function() {
		var a = h(this.objectDefinition, "Class"),
			b = h(this.props, "bIsClassNative");
		if (null !== b && "False" === b.value) return "graph";
		if (null !== a) {
			if (-1 !== a.value.indexOf("/Script/MetasoundEditor.MetasoundEditorGraphInputNode")) return "input";
			if (-1 !== a.value.indexOf("/Script/MetasoundEditor.MetasoundEditorGraphOutputNode")) return "output"
		}
		return "native"
	}, F.prototype.disableTextOnPins = function() {
		for (var a = 0, b = this.pins.length; a < b; ++a) this.pins[a].disableText()
	}, F.prototype.detectInputSelectToCreate = function() {
		var a = {
				"Stereo Delay": ["STEREO_DELAY_MODE", "Delay Mode"],
				Compressor: ["ENVELOPE_PEAK_MODE", "Envelope Mode"],
				Limiter: ["KNEE_MODE", "Knee"],
				"Biquad Filter": ["BIQUAD_FILTER_TYPE", "Type"],
				LFO: ["LFO_WAVESHAPE_TYPE", "Shape"],
				Square: ["SQUARE_GENERATION_TYPE", "Type"],
				Noise: ["NOISE_TYPE", "Type"],
				Sine: ["SINE_GENERATION_TYPE", "Type"],
				Saw: ["SAW_GENERATION_TYPE", "Type"],
				Triangle: ["TRIANGLE_GENERATION_TYPE", "Type"],
				"Musical Scale To Note Array": ["MUSICAL_SCALE", "Scale Degrees"],
				"Stereo Panner": ["PANNING_LAW", "Panning Law"],
				TriggerOnThreshold: ["BUFFER_TRIGGER_TYPE", "Type"],
				"Envelope Follower": ["ENVELOPE_PEAK_MODE", "Peak Mode"],
				WaveShaper: ["WAVE_SHAPER_TYPE", "Type"],
				GrainDelayNode: ["GRAIN_DELAY_ENVELOPE", "Grain Envelope"]
			},
			b = "",
			c = "",
			d = "",
			e = h(this.props, "ClassName"),
			f = h(this.props, "bIsClassNative");
		if (null !== e) {
			if (null !== f && "False" === f.value) return "MetaSoundSource";
			if (f = h(e.value, "Namespace"), b = h(e.value, "Name"), c = h(e.value, "Variant"), void 0 !== a[b.value]) this.setInputSelectValuesToPin(a[b.value][0], a[b.value][1]);
			else {
				if ("Convert" === f.value && null !== c && "Enum:" === c.value.substring(0, 5)) return d = c.value.substring(5).replace(" ", "").split(/(?=[A-Z])/).join("_").toUpperCase(), void this.setInputSelectValuesToPin(d, c.value);
				if ("VariableMutator" === f.value && "Enum:" === b.value.substring(0, 5)) return d = b.value.substring(5).replace(" ", "").split(/(?=[A-Z])/).join("_").toUpperCase(), void this.setInputSelectValuesToPin(d, "Value");
				if ("TriggerCompare" === f.value) this.setInputSelectValuesToPin("TRIGGER_COMPARISON_TYPE", "Type");
				else {
					if ("Band Splitter" !== b.value.substring(0, 13)) return "DynamicFilter" === b.value ? (this.setInputSelectValuesToPin("DYNAMIC_FILTER_TYPE", "FilterType"), void this.setInputSelectValuesToPin("ENVELOPE_PEAK_MODE", "EnvelopeMode")) : void("WaveTableEnvelope" === b.value && (this.setInputSelectValuesToPin("WAVE_TABLE_ENVELOPE_MODE", "Mode"), this.setInputSelectValuesToPin("WAVE_TABLE_INTERPOLATION", "Interpolation")));
					this.setInputSelectValuesToPin("FILTER_ORDER", "Filter Order")
				}
			}
		}
	}, F.prototype.setInputSelectValuesToPin = function(a, b, c) {
		for (var d, e = 0, f = this.pins.length, g = c || 0; e < f; ++e)
			if (this.pins[e].isInput() && null !== (d = h(this.pins[e].props, "PinName")) && d.value === b) return void this.pins[e].setInputSelectValues(cP[a], g)
	};
	var cl = {
		ECollisionChannel: [{
			name: "World Static",
			value: "ECC_WorldStatic"
		}, {
			name: "World Dynamic",
			value: "ECC_WorldDynamic"
		}, {
			name: "Pawn",
			value: "ECC_Pawn"
		}, {
			name: "Visibility",
			value: "ECC_Visibility"
		}, {
			name: "Camera",
			value: "ECC_Camera"
		}, {
			name: "PhysicsBody",
			value: "ECC_PhysicsBody"
		}, {
			name: "Vehicule",
			value: "ECC_Vehicle"
		}, {
			name: "Destructible",
			value: "ECC_Destructible"
		}],
		EFieldIntegerType: [{
			name: "Dynamic State",
			value: "Integer_DynamicState"
		}, {
			name: "Activate Disabled",
			value: "Integer_ActivateDisabled"
		}, {
			name: "Collision Group",
			value: "Integer_CollisionGroup"
		}],
		EFieldScalarType: [{
			name: "External Strain",
			value: "Scalar_ExternalClusterStrain"
		}, {
			name: "Kill Particle",
			value: "Scalar_Kill"
		}, {
			name: "Disable Threshold",
			value: "Scalar_DisableThreshold"
		}, {
			name: "Sleeping Threshold",
			value: "Scalar_SleepingThreshold"
		}, {
			name: "Internal Strain",
			value: "Scalar_InternalClusterStrain"
		}],
		EFieldVectorType: [{
			name: "Linear Force",
			value: "Vector_LinearForce"
		}, {
			name: "Linear Velocity",
			value: "Vector_LinearVelocity"
		}, {
			name: "Angular Velocity",
			value: "Vector_AngularVelocity"
		}, {
			name: "Angular Torque",
			value: "Vector_AngularTorque"
		}],
		ENiagara_AngleInput: [{
			name: "Degrees",
			value: "NewEnumerator0"
		}, {
			name: "Normalized Angle (0-1)",
			value: "NewEnumerator1"
		}, {
			name: "Radians",
			value: "NewEnumerator2"
		}],
		ENiagara_CPUCollisionType: [{
			name: "Ray Traced",
			value: "NewEnumerator1"
		}, {
			name: "Analytical Planes",
			value: "NewEnumerator3"
		}],
		ENiagara_Float4Channel: [{
			name: "R",
			value: "NewEnumerator0"
		}, {
			name: "G",
			value: "NewEnumerator1"
		}, {
			name: "B",
			value: "NewEnumerator2"
		}, {
			name: "A",
			value: "NewEnumerator3"
		}],
		ENiagara_GPUCollisionType: [{
			name: "GPU Depth Buffer",
			value: "NewEnumerator1"
		}, {
			name: "GPU Distance Fields",
			value: "NewEnumerator2"
		}, {
			name: "GPU Ray Traces (Experimental)",
			value: "NewEnumerator4"
		}, {
			name: "Analytics Planes",
			value: "NewEnumerator3"
		}],
		ENiagara_Waveforms: [{
			name: "Sine",
			value: "NewEnumerator0"
		}, {
			name: "Cosine",
			value: "NewEnumerator1"
		}, {
			name: "Compound Sin/Cos",
			value: "NewEnumerator2"
		}, {
			name: "Pendulum",
			value: "NewEnumerator3"
		}, {
			name: "Square",
			value: "NewEnumerator4"
		}, {
			name: "Pulse",
			value: "NewEnumerator5"
		}, {
			name: "Triangle",
			value: "NewEnumerator6"
		}, {
			name: "Sawtooth",
			value: "NewEnumerator7"
		}, {
			name: "Random",
			value: "NewEnumerator8"
		}, {
			name: "Random Blend",
			value: "NewEnumerator9"
		}, {
			name: "Random Spline",
			value: "NewEnumerator10"
		}, {
			name: "Random Spline Smooth",
			value: "NewEnumerator12"
		}, {
			name: "Random Spline Segmented",
			value: "NewEnumerator13"
		}],
		ENiagaraCalculateRadiusOptions: [{
			name: "Bounds",
			value: "NewEnumerator0"
		}, {
			name: "Minimum Axis",
			value: "NewEnumerator1"
		}, {
			name: "Maximum Axis",
			value: "NewEnumerator2"
		}],
		ENiagaraCompileUsageStaticSwitch: [{
			name: "Spawn",
			value: "Spawn"
		}, {
			name: "Update",
			value: "Update"
		}, {
			name: "Event",
			value: "Event"
		}, {
			name: "Simulation Stage",
			value: "SimulationStage"
		}, {
			name: "Default",
			value: "Default"
		}],
		ENiagaraCoordinateSpace: [{
			name: "Simulation",
			value: "Simulation"
		}, {
			name: "World",
			value: "World"
		}, {
			name: "Local",
			value: "Local"
		}],
		ENiagaraExecutionState: [{
			name: "Active",
			value: "Active"
		}, {
			name: "Inactive",
			value: "Inactive"
		}, {
			name: "Inactive Clear",
			value: "InactiveClear"
		}, {
			name: "Complete",
			value: "Complete"
		}],
		ENiagaraExecutionStateSource: [{
			name: "Scalability",
			value: "Scalability"
		}, {
			name: "Internal",
			value: "Internal"
		}, {
			name: "Owner",
			value: "Owner"
		}, {
			name: "Internal Completion",
			value: "InternalCompletion"
		}],
		ENiagaraFrictionMergeType: [{
			name: "Ignore",
			value: "NewEnumerator0"
		}, {
			name: "Average",
			value: "NewEnumerator1"
		}, {
			name: "Min",
			value: "NewEnumerator2"
		}, {
			name: "Max",
			value: "NewEnumerator3"
		}],
		ENiagaraFunctionDebugState: [{
			name: "No Debug",
			value: "NoDebug"
		}, {
			name: "Basic",
			value: "Basic"
		}],
		ENiagaraLegacyTrailWidthMode: [{
			name: "From Centre",
			value: "FromCentre"
		}, {
			name: "From First",
			value: "FromFirst"
		}, {
			name: "From Second",
			value: "FromSecond"
		}],
		ENiagaraOrientationAxis: [{
			name: "X Axis",
			value: "XAxis"
		}, {
			name: "Y Axis",
			value: "YAxis"
		}, {
			name: "Z Axis",
			value: "ZAxis"
		}],
		ENiagaraRandomnessEvaluation: [{
			name: "Spawn Only",
			value: "NewEnumerator0"
		}, {
			name: "Every Frame",
			value: "NewEnumerator1"
		}],
		ENiagaraRandomnessMode: [{
			name: "Simulation Defaults",
			value: "NewEnumerator0"
		}, {
			name: "Deterministic",
			value: "NewEnumerator1"
		}, {
			name: "Non-Deterministic",
			value: "NewEnumerator2"
		}],
		ENiagaraScriptContextStaticSwitch: [{
			name: "System",
			value: "System"
		}, {
			name: "Emitter",
			value: "Emitter"
		}, {
			name: "Particle",
			value: "Particle"
		}],
		ENiagaraSimTarget: [{
			name: "CPUSim",
			value: "CPUSim"
		}, {
			name: "GPUComputeSim",
			value: "GPUComputeSim"
		}],
		ENiagaraRestitutionMergeType: [{
			name: "Ignore",
			value: "NewEnumerator3"
		}, {
			name: "Min",
			value: "NewEnumerator0"
		}, {
			name: "Max",
			value: "NewEnumerator1"
		}, {
			name: "Average",
			value: "NewEnumerator2"
		}],
		ENiagaraVector2_Channels: [{
			name: "X",
			value: "NewEnumerator0"
		}, {
			name: "Y",
			value: "NewEnumerator1"
		}],
		ENiagaraVector3_Channels: [{
			name: "X",
			value: "NewEnumerator0"
		}, {
			name: "Y",
			value: "NewEnumerator1"
		}, {
			name: "Z",
			value: "NewEnumerator2"
		}],
		ENiagaraVector4_Channels: [{
			name: "X",
			value: "NewEnumerator0"
		}, {
			name: "Y",
			value: "NewEnumerator1"
		}, {
			name: "Z",
			value: "NewEnumerator2"
		}, {
			name: "W",
			value: "NewEnumerator3"
		}]
	};

	function cQ(a) {
		for (var b, c = [], d = 0, e = (b = a.replaceAll("\\t", "    ").replaceAll('\\"', '"').split("\\r\\n")).length; d < e; ++d) c.push({
			text: b[d]
		}), d + 1 < b.length && c.push({
			tag: "br"
		});
		return c
	}

	function P() {
		o.call(this), this.inputObject = "", this.datasetObject = ""
	}
	P.prototype = new o, (P.prototype.constructor = P).prototype.generateHTML = function() {
		var a, b = null;
		return this.detectInputSelectToCreate(), b = o.prototype.generateHTML.call(this), null !== (a = h(this.props, "CustomHlsl")) && b.childs.push({
			tag: "div",
			classes: ["bottom"],
			childs: [{
				tag: "div",
				classes: ["fake-input", "hlsl"],
				attrs: [{
					name: "contenteditable",
					value: "true"
				}],
				childs: cQ(a.value)
			}]
		}), b
	}, P.prototype.findHeaderName = function() {
		var a = "/Script/NiagaraEditor.",
			b = null,
			c = h(this.props, "FunctionDisplayName");
		if (null !== c) return D(c.value);
		if (null !== (c = h(this.props, "OpName"))) return "Mul" === (c = D(c.value).split("::"))[1] ? "Multiply" : "Cmp LT" === c[1] ? "Less Than" : "Cmp LE" === c[1] ? "Less Than Or Equal" : c[1];
		if (null !== (b = h(this.objectDefinition, "Class"))) {
			if (-1 !== b.value.indexOf(a + "NiagaraNodeParameterMapSet")) return "Map Set";
			if (-1 !== b.value.indexOf(a + "NiagaraNodeParameterMapGet")) return "Map Get";
			if (-1 !== b.value.indexOf(a + "NiagaraNodeParameterMapFor")) return "Map For";
			if (-1 !== b.value.indexOf(a + "NiagaraNodeCustomHlsl")) return "CustomHlsl";
			if (-1 !== b.value.indexOf(a + "NiagaraNodeStaticSwitch")) return null === (c = h(this.props, "InputParameterName")) ? "Static Switch (Undefined parameter name)" : "Static Switch (" + c.value + ")";
			if (-1 !== b.value.indexOf(a + "NiagaraNodeIf")) return "If";
			if (-1 !== b.value.indexOf(a + "NiagaraNodeInput")) return this.inputObject.replaceAll('\\"', '"').replaceAll("\\'", "'");
			if (-1 !== b.value.indexOf(a + "NiagaraNodeConvert")) return "Convert";
			if (-1 !== b.value.indexOf(a + "NiagaraNodeReadDataSet")) return this.datasetObject + " Read";
			if (-1 !== b.value.indexOf(a + "NiagaraNodeWriteDataSet")) return this.datasetObject + " Read"
		}
		return o.prototype.findHeaderName.call(this)
	}, P.prototype.generateHTMLHeader = function() {
		for (var a = this.generateHTMLPinDelegate(), b = 0, c = a.length, d = {
				tag: "div",
				classes: ["header", "node-color", this.findCssClassNodeColor(), "gradient", this.findIconAfterNode()],
				childs: [{
					tag: "span",
					classes: ["name"],
					text: this.findHeaderName(),
					childs: [{
						tag: "br"
					}, {
						tag: "span",
						classes: ["subname"],
						text: this.findHeaderSubname()
					}]
				}]
			}; b < c; ++b) d.childs.push(a[b]);
		return d
	}, P.prototype.findCssClassNodeColor = function() {
		var a = h(this.objectDefinition, "Class");
		if (null !== a) {
			if (-1 !== a.value.indexOf("NiagaraNodeCustomHlsl")) return "switch";
			if (-1 !== a.value.indexOf("NiagaraNodeStaticSwitch")) return "event";
			if (-1 !== a.value.indexOf("NiagaraNodeFunctionCall")) return "break-struct";
			if (-1 !== a.value.indexOf("NiagaraNodeInput")) return h(this.props, "Usage"), "event";
			if (-1 !== a.value.indexOf("NiagaraNodeReadDataSet")) return "event";
			if (-1 !== a.value.indexOf("NiagaraNodeWriteDataSet")) return "event"
		}
		return "function-call"
	}, P.prototype.callbackInspectNode = function(a, b) {
		var c;
		null !== (c = h(this.props, "Input")) && (this.inputObject = h(c.value, "Name").value), null !== (c = h(this.props, "DataSet")) && (this.datasetObject = h(c.value, "Name").value)
	}, P.prototype.detectInputSelectToCreate = function() {
		for (var a, b, c = 0, d = this.pins.length, e = null, f = ""; c < d; ++c) null === (b = this.pins[c].getPropFromPinType("PinCategory")) || "Enum" !== b.value && "StaticEnum" !== b.value || null !== (e = this.pins[c].getPropFromPinType("PinSubCategoryObject")) && (b = e.value.substr(e.value.lastIndexOf(".") + 1).replace('"', "").replace("'", ""), void 0 !== cl[b] && (f = "", null !== (a = h(this.pins[c].props, "DefaultValue")) && (f = a.value), this.pins[c].setInputSelectValues(cl[b], f)))
	};

	function bC() {
		o.call(this)
	}
	bC.prototype = new o, (bC.prototype.constructor = bC).prototype.getExportedNodes = function() {
		var a = h(this.props, "ExportedNodes");
		return null === a ? "" : atob(a.value)
	};

	function G() {
		this.headerName = "", this.isKnot = !1, o.call(this)
	}
	G.prototype = new o, (G.prototype.constructor = G).prototype.generateHTML = function() {
		var a, b, c = 0,
			d = this.pins.length,
			e = null,
			f = 0,
			g = h(this.objectDefinition, "Class"),
			i = ["node", "npcg"];
		for (null !== g && -1 !== g.value.indexOf("PCGEditorGraphNodeReroute") && (this.isKnot = !0, i.push("knot")); c < d; ++c) this.pins[c].disableInput();
		if (e = {
				tag: "div",
				classes: i,
				attrs: [{
					name: "style",
					value: this.generateCssNodeStyle().join(";")
				}, {
					name: "data-id",
					value: this.guid
				}],
				childs: [this.generateHTMLToolTip(), this.generateHTMLHeader()]
			}, this.overrideConnectorTypeForPins(), a = this.generateHTMLBody(), Array.isArray(a))
			for (b = a.length; f < b; ++f) e.childs.push(a[f]);
		else e.childs.push(a);
		return e
	}, G.prototype.generateCssNodeHeader = function() {
		var a, b = null,
			c = this.nodes[0].objectDefinition[2].value,
			d = ["Modifier", "CreateSpline", "Difference", "Distance", "Data", "Gather", "Projection", "NormalToDensity", "TransformPoints", "Bounds", "Union", "Merge", "Intersection", "Debug", "ToPoint", "Query"],
			e = 0,
			f = d.length;
		if ("ExecuteBlueprint_" === c.substring(0, 17)) {
			if (this.nodes[0] && this.nodes[0].nodes[1] && this.nodes[0].nodes[1].nodes[0] && this.nodes[0].nodes[1].nodes[0].objectDefinition[1]) {
				if (-1 !== this.nodes[0].nodes[1].nodes[0].objectDefinition[2].value.indexOf("Debug")) return "pcg-default";
				if (-1 !== this.nodes[0].nodes[1].nodes[0].objectDefinition[2].value.indexOf("AppendAttributeSet")) return "pcg-params"
			}
			return "pcg-execute-bp"
		}
		if (-1 !== c.indexOf("Attribute")) return "pcg-attribute";
		if (-1 !== c.indexOf("Spawn")) return "pcg-spawn";
		if ("Subgraph" === (c = -1 !== (a = c.indexOf("_")) ? c.substring(0, a) : c)) return "pcg-input";
		if (null !== (b = h(this.objectDefinition, "Class")) && (-1 !== b.value.indexOf("PCGEditorGraphNodeOutput") || -1 !== b.value.indexOf("PCGEditorGraphNodeInput"))) return "pcg-input";
		for (; e < f; ++e)
			if (-1 !== c.indexOf(d[e])) return "pcg-spatial";
		return "DensityNoise" === c || "DensityRemap" === c ? "pcg-density" : "GetActorProperty" === c ? "pcg-params" : -1 !== c.indexOf("Filter") || -1 !== c.indexOf("SelfPruning") ? "pcg-filter" : -1 !== c.indexOf("PointMatchAndSet") ? "pcg-attribute" : "pcg-default"
	}, G.prototype.findHeaderName = function() {
		var a, b, c = null,
			d = null,
			e = -1,
			f = this.nodes[0].objectDefinition[2].value,
			g = 0;
		if (this.nodes.length < 2) return "";
		if (null !== (a = h(this.nodes[1].props, "NodeTitle"))) return a.value;
		if ("ExecuteBlueprint_" === f.substring(0, 17)) {
			if (f = "Execute Blueprint", this.nodes[0] && this.nodes[0].nodes[1] && this.nodes[0].nodes[1].nodes[0] && this.nodes[0].nodes[1].nodes[0].objectDefinition[1]) {
				if ("BP_Element_MeshToPointsWithColors" === (f = this.nodes[0].nodes[1].nodes[0].objectDefinition[2].value).substring(0, 33)) return "BP_Element_MeshToPointsWithColors";
				f = f.substring(0, f.indexOf("_"))
			}
			return "IntersectWithTaggedActorGeo" === f ? "IntersectWithTaggedActorGeometry" : f
		}
		if ("DefaultInputNode" === f) return "Input";
		if ("DefaultOutputNode" === f) return "Output";
		if ("Subgraph" !== (f = -1 !== (a = f.indexOf("_")) ? f.substring(0, a) : f)) return "FilterByTag" === f && (null !== (d = h(this.nodes[1].nodes[1].props, "Operation")) && "RemoveTagged" === d.value ? f += "(Remove)" : f += "(Keep)", null !== (d = h(this.nodes[1].nodes[1].props, "SelectedTags")) && (f += ": " + d.value)), "AddAttribute" === f || "CreateAttribute" === f ? (f = "None: 0.00", null !== (d = h(this.nodes[1].nodes[1].props, "OutputAttributeName")) && (f = d.value), null !== (d = h(this.nodes[1].nodes[1].props, "AttributeTypes")) ? f + ": " + this.getAttributeValue(d) : f + ": 0.00") : ("FilterAttribute" === f && (null !== (d = h(this.nodes[1].nodes[1].props, "Operation")) && "DeleteSelectedAttributes" === d.value ? f += "(Delete)" : f += "(Keep)", null !== (d = h(this.nodes[1].nodes[1].props, "SelectedAttributes")) && (f += ": " + d.value)), "AttributeBitwiseOp" === f ? this.getOperationName("Bitwise", "And") : "AttributeBooleanOp" === f ? this.getOperationName("Boolean", "And") : "AttributeCompareOp" === f ? this.getOperationName("Compare", "Equal") : "AttributeMathsOp" === f ? this.getOperationName("Maths", "Add") : "AttributeRotatorOp" === f ? this.getOperationName("Rotator", "Combine") : "AttributeTransformOp" === f ? this.getOperationName("Transform", "Compose") : "AttributeTrigOp" === f ? this.getOperationName("Trig", "Acos") : "AttributeVectorOp" === f ? this.getOperationName("Vector", "Cross") : "AttributeReduce" === f ? (f = "Reduce LastAttribute", null !== (d = h(this.nodes[1].nodes[1].props, "OutputAttributeName")) && (f += " to " + d.value), this.getOperationName(f, "Average")) : "AttributeSelect" === f ? (f = this.getOperationName("Select LastAttribute", "Min"), null !== (d = h(this.nodes[1].nodes[1].props, "Axis")) ? "CustomAxis" === d.value ? null !== (d = h(this.nodes[1].nodes[1].props, "CustomAxis")) ? f + " on (" + t(d.value[0].value) + ", " + t(d.value[1].value) + ", " + t(d.value[2].value) + ", " + t(d.value[3].value) + ")" : f + " on (0.00, 0.00, 0.00, 0.00)" : f + " on " + d.value : f + " on X") : ("TransferAttribute" === f && (f += null === (d = h(this.nodes[1].nodes[1].props, "SourceAttributeName")) ? " None" : " " + d.value, null !== (d = h(this.nodes[1].nodes[1].props, "TargetAttributeName")) && (f += " to " + d.value)), "DataTableRowToAttributeSet" === f && (f = null === (d = h(this.nodes[1].nodes[1].props, "DataTable")) ? " None" : -1 === (e = d.value.lastIndexOf(".")) ? " " + d.value : " " + d.value.substring(e + 1), f += null === (d = h(this.nodes[1].nodes[1].props, "RowName")) ? "[ None ]" : "[ " + d.value + " ]"), f));
		for (g = 0, b = this.nodes[1].nodes.length; g < b; ++g) 0 < this.nodes[1].nodes[g].nodes.length && (c = h(this.nodes[1].nodes[g].nodes[0].props, "Graph"));
		return null !== c && -1 !== (e = c.value.lastIndexOf(".")) ? c.value.substring(e += 1).replace("'", "").replace('"', "") : "invalid subgraph"
	}, G.prototype.getAttributeValue = function(a) {
		var b = [{
				name: "Float",
				value: "FloatValue",
				defaultValue: "0.00"
			}, {
				name: "Integer32",
				value: "Int32Value",
				defaultValue: "0"
			}, {
				name: "Integer64",
				value: "IntValue",
				defaultValue: "0"
			}, {
				name: "Vector2",
				value: "Vector2Value",
				defaultValue: "V(0.00, 0.00)"
			}, {
				name: "Vector",
				value: "VectorValue",
				defaultValue: "V(0.00, 0.00, 0.00)"
			}, {
				name: "Vector4",
				value: "Vector4Value",
				defaultValue: "V(0.00, 0.00, 0.00, 0.00)"
			}, {
				name: "Quaternion",
				value: "QuatValue",
				defaultValue: "Q(0.00, 0.00, 0.00, 1.00)"
			}, {
				name: "Transform",
				value: "-",
				defaultValue: "Transform"
			}, {
				name: "String",
				value: "StringValue",
				defaultValue: '""'
			}, {
				name: "Boolean",
				value: "BoolValue",
				defaultValue: "False"
			}, {
				name: "Rotator",
				value: "RotatorValue",
				defaultValue: "R(0.00, 0.00, 0.00)"
			}, {
				name: "Name",
				value: "NameValue",
				defaultValue: 'N("None")'
			}],
			c = 0,
			d = b.length,
			e = null,
			f = "",
			g = [];
		if (null === h(a.value, "Type")) return null === (e = h(a.value, "DoubleValue")) ? "0.00" : t(e.value);
		for (; c < d; ++c)
			if (a.value[0].value === b[c].name) {
				if (null === (e = h(a.value, b[c].value))) return b[c].defaultValue;
				if ("Vect" !== (f = b[c].name.substring(0, 4)) && "Quat" !== f && "Rota" !== f) return "Name" === f ? "N(" + e.value + ")" : "Floa" === f ? t(e.value) : e.value;
				for (c = 0, d = e.value.length; c < d; ++c) g.push(t(e.value[c].value));
				return f.substring(0, 1) + "(" + g.join(",") + ")"
			} return ""
	}, G.prototype.getOperationName = function(a, b) {
		var c = h(this.nodes[1].nodes[1].props, "Operation");
		return null !== c ? a + ": " + c.value : a + ": " + b
	}, G.prototype.generateTextForUnreal = function(a) {
		var b = "",
			c = J(a);
		return (b += "Begin " + this.generateTextObjectDefinition()) + (c + "Begin " + this.nodes[0].generateTextObjectDefinition()) + bR(this.nodes[0].nodes, a + 1) + (c + "End " + this.nodes[0].objectDefinition[0].value + "\n") + (c + "Begin " + this.nodes[1].generateTextObjectDefinition()) + this.getTextDescriptionForUnreal(this.nodes[1].nodes, a + 1) + this.nodes[1].generateTextProps(a + 1) + (c + "End Object\n") + this.generateTextProps(a) + ("End " + this.objectDefinition[0].value)
	}, G.prototype.getTextDescriptionForUnreal = function bD(a, b) {
		for (var c = "", d = J(b), e = 0, f = a.length; e < f; ++e) c += d + "Begin " + a[e].generateTextObjectDefinition(), 0 < a[e].nodes.length && (c += bD(a[e].nodes, b + 1)), c = c + a[e].generateTextProps(b + 1) + (d + "End Object\n");
		return c
	}, G.prototype.generateHTMLHeader = function() {
		return this.isKnot ? {} : (this.headerName = this.findHeaderName(), {
			tag: "div",
			classes: ["header", "node-color", "gradient", "pcg", this.generateCssNodeHeader()],
			childs: [{
				tag: "span",
				classes: ["name"],
				text: this.headerName
			}]
		})
	}, G.prototype.overrideConnectorTypeForPins = function() {
		for (var a, b, c, d, e = 0, f = this.pins.length, g = null, i = null, j = 0, l = !1, k = -1, n = "connector", m = "exec", p = 0, q = 0, u = "", r = !0, y = !0, A = []; e < f; ++e)
			if (a = this.pins[e].getPropFromPinType("PinCategory"), g = this.pins[e].getPropFromPinType("PinSubCategory"), i = h(this.pins[e].props, "PinName"), this.isKnot) this.pins[e].override.connectorType = {
				connector: "connector",
				type: "pcg-any-data"
			}, g && "" !== g.value && (this.pins[e].override.connectorType.type = "pcg-" + g.value.toLowerCase().replaceAll(" ", "-"));
			else if (null !== a && "Attribute Set" === a.value) this.pins[e].override.connectorType = {
			connector: "connector-pcg-attribute-set",
			type: "pcg-attribute-set"
		};
		else if (null !== a && "Spatial Data" === a.value) this.pins[e].override.connectorType = {
			connector: "connector-pcg-spatial-data",
			type: "pcg-spatial-data"
		};
		else if (null === (i = h(this.pins[e].props, "PinName"))) this.pins[e].override.connectorType = {
			connector: "connector",
			type: "exec"
		};
		else if (2 !== this.nodes.length) this.pins[e].override.connectorType = {
			connector: "connector",
			type: "exec"
		};
		else {
			for (l = !1, j = 0, b = this.nodes[1].nodes.length; j < b; ++j)
				if (0 !== this.nodes[1].nodes[j].props.length) {
					for (k = -1, p = 0, c = this.nodes[1].nodes[j].props.length; p < c; ++p)
						if ("Properties" === this.nodes[1].nodes[j].props[p].name) {
							k = p;
							break
						} if (-1 !== k) {
						for (y = r = !(u = ""), q = 0, d = (A = this.nodes[1].nodes[j].props[k].value).length; q < d; ++q) "Label" === A[q].name && (u = A[q].value.toLowerCase()), "bAllowMultipleData" === A[q].name && "False" === A[q].value && (r = !1), "bAllowMultipleConnections" === A[q].name && "False" === A[q].value && (y = !1);
						if (u === i.value.toLowerCase()) {
							n = "connector", r && y ? n = "connector-pcg-multiple-data-multiple-connection" : r && !y && (n = "connector-pcg-multiple-data-single-connection"), (m = "exec") === (m = "" !== g.value ? "pcg-" + g.value.toLowerCase().replaceAll(" ", "-") : m) && (m = "pcg-any-data", null !== a && "Concrete Data" === a.value && "" === g.value && (m = "pcg-concrete-data")), this.pins[e].override.connectorType = {
								connector: n,
								type: m
							}, l = !0;
							break
						}
					}
				} l || (this.pins[e].override.connectorType = {
				connector: "connector",
				type: "exec"
			})
		}
	};

	function bj() {
		o.call(this)
	}
	bj.prototype = new o, (bj.prototype.constructor = bj).prototype.generateHTML = function() {
		var a = this.getVariableType();
		return {
			tag: "div",
			classes: ["node", "nvariableget", a.connector, a.type],
			attrs: [{
				name: "style",
				value: this.generateCssNodeStyle().join(";")
			}, {
				name: "data-id",
				value: this.guid
			}],
			childs: [this.generateHTMLToolTip(), this.generateHTMLBody()]
		}
	}, bj.prototype.generateHTMLBody = function() {
		return {
			tag: "div",
			classes: ["body"],
			childs: [{
				tag: "div",
				classes: ["round-bg"]
			}, {
				tag: "div",
				classes: ["right-col"],
				childs: this.generateHTMLPinsOutput()
			}]
		}
	}, bj.prototype.getVariableType = function() {
		for (var a = 0, b = this.pins.length; a < b; ++a)
			if (this.pins[a].isOutput() && !1 === this.pins[a].isDelegateOutput()) return this.pins[a].getConnectorType();
		return {
			connector: "connector",
			type: "object"
		}
	};

	function bb() {
		o.call(this)
	}
	bb.prototype = new o, (bb.prototype.constructor = bb).prototype.generateHTML = function() {
		return this.disableTextOnPins(), {
			tag: "div",
			classes: ["node", "nsubsystem"],
			attrs: [{
				name: "style",
				value: this.generateCssNodeStyle().join(";")
			}, {
				name: "data-id",
				value: this.guid
			}],
			childs: [this.generateHTMLToolTip(), this.generateHTMLBody()]
		}
	}, bb.prototype.generateHTMLBody = function() {
		var a, b, c = "",
			d = 0,
			e = h(this.props, "CustomClass"),
			f = [],
			g = 0;
		if (null !== e && (c = e.value, -1 !== (e = e.value.lastIndexOf("."))))
			if ("DataDrivenCVarEngineSubsystem" === (c = c.substr(e + 1).replace("'", ""))) f = [{
				text: "DataDrivenCVars"
			}];
			else if ("QuartzSubsystem" === c) f = [{
			text: "Quartz"
		}];
		else if ("GeometryCollectionISMPoolSubSystem" === c) f = [{
			text: "Geometry"
		}, {
			tag: "br"
		}, {
			text: "Collection"
		}, {
			tag: "br"
		}, {
			text: "ISMPool"
		}, {
			tag: "br"
		}, {
			text: "Sub System"
		}];
		else if ("PPMChainGraphWorldSubsystem" === c) f = [{
			text: "PPMChain"
		}, {
			tag: "br"
		}, {
			text: "Graph"
		}, {
			tag: "br"
		}, {
			text: "World"
		}, {
			tag: "br"
		}, {
			text: "Subsystem"
		}];
		else
			for (b = (a = c.match(/[A-Z]?[a-z]+|[0-9]+|[A-Z]+(?![a-z])/g)).length; d < b; ++d) f.push({
				text: a[d]
			}), g += a[d].length, "HLOD" !== a[d] && "ISM" !== a[d] && "PCG" !== a[d] && d + 1 < b && (g + a[d + 1].length < 11 ? (f.push({
				text: " "
			}), g += a[d + 1].length) : (f.push({
				tag: "br"
			}), g = 0));
		return {
			tag: "div",
			classes: ["body"],
			childs: [{
				tag: "div",
				classes: ["round-bg"]
			}, {
				tag: "div",
				classes: ["left-col"],
				childs: this.generateHTMLPinsInput()
			}, {
				tag: "div",
				classes: ["left-text"],
				childs: [{
					tag: "span",
					childs: f
				}]
			}, {
				tag: "div",
				classes: ["right-col"],
				childs: this.generateHTMLPinsOutput()
			}]
		}
	}, bb.prototype.disableTextOnPins = function() {
		for (var a = 0, b = this.pins.length; a < b; ++a) null === h(this.pins[a].props, "PinFriendlyName") && this.pins[a].disableText()
	};

	function V() {
		o.call(this)
	}
	V.prototype = new o, (V.prototype.constructor = V).prototype.generateHTML = function() {
		var a = this.getVariableType();
		return {
			tag: "div",
			classes: ["node", "nvariableget", a.connector, a.type],
			attrs: [{
				name: "style",
				value: this.generateCssNodeStyle().join(";")
			}, {
				name: "data-id",
				value: this.guid
			}],
			childs: [this.generateHTMLToolTip(), this.generateHTMLBody()]
		}
	}, V.prototype.generateHTMLBody = function() {
		return {
			tag: "div",
			classes: ["body"],
			childs: [{
				tag: "div",
				classes: ["round-bg"]
			}, {
				tag: "div",
				classes: ["left-col"],
				childs: this.generateHTMLPinsInput()
			}, {
				tag: "div",
				classes: ["right-col"],
				childs: this.generateHTMLPinsOutput()
			}]
		}
	}, V.prototype.getVariableType = function() {
		for (var a = 0, b = this.pins.length; a < b; ++a)
			if (this.pins[a].isOutput() && !1 === this.pins[a].isDelegateOutput()) return this.pins[a].getConnectorType();
		return {
			connector: "connector",
			type: "object"
		}
	};

	function W() {
		o.call(this)
	}
	W.prototype = new o, (W.prototype.constructor = W).prototype.generateHTML = function() {
		var a;
		return this.disableTextOnPins(), {
			tag: "div",
			classes: ["node", "nvariableset", (a = this.getVariableType()).connector, a.type],
			attrs: [{
				name: "style",
				value: this.generateCssNodeStyle().join(";")
			}, {
				name: "data-id",
				value: this.guid
			}],
			childs: [this.generateHTMLToolTip(), this.generateHTMLBody()]
		}
	}, W.prototype.generateHTMLBody = function() {
		var a = this.getVariableType();
		return {
			tag: "div",
			classes: ["body"],
			childs: [{
				tag: "div",
				classes: ["round-bg-color", a.connector, a.type]
			}, {
				tag: "div",
				classes: ["round-bg"],
				text: "SET"
			}, {
				tag: "div",
				classes: ["left-col"],
				childs: this.generateHTMLPinsInput()
			}, {
				tag: "div",
				classes: ["right-col"],
				childs: this.generateHTMLPinsOutput()
			}]
		}
	}, W.prototype.getVariableType = function() {
		for (var a = 0, b = this.pins.length; a < b; ++a)
			if (this.pins[a].isOutput() && !1 === this.pins[a].isDelegateOutput() && "exec" !== this.pins[a].getPropFromPinType("PinCategory").value) return this.pins[a].getConnectorType();
		return {
			connector: "connector",
			type: "object"
		}
	}, W.prototype.disableTextOnPins = function() {
		for (var a = 0, b = this.pins.length; a < b; ++a) this.pins[a].isOutput() && null === h(this.pins[a].props, "PinFriendlyName") && this.pins[a].disableText()
	};

	function v() {
		this.props = [], this.hasToGenerateText = !0, this.hasToGenerateInput = !0, this.override = {
			connectorType: null
		}, this.isBelow413Version = !1, this.id = null, this.inputSelectValues = [], this.inputSelectDefaultValue = 0
	}
	v.prototype.disableText = function() {
		this.hasToGenerateText = !1
	}, v.prototype.enableText = function() {
		this.hasToGenerateText = !0
	}, v.prototype.disableInput = function() {
		this.hasToGenerateInput = !1
	}, v.prototype.enableInput = function() {
		this.hasToGenerateInput = !0
	}, v.prototype.disableTextAndInput = function() {
		this.hasToGenerateText = !1, this.hasToGenerateInput = !1
	}, v.prototype.enableTextAndInput = function() {
		this.hasToGenerateText = !0, this.hasToGenerateInput = !0
	}, v.prototype.addProp = function(a) {
		var b, c = 0;
		if (Array.isArray(a))
			for (b = a.length; c < b; ++c) a[c].name && "PinId" === a[c].name && (this.id = a[c].value), this.props.push(a[c]);
		else a.name && "PinId" === a.name && (this.id = a.value), this.props.push(a)
	}, v.prototype.getLinks = function() {
		var a, b = [],
			c = 0,
			d = 0;
		if (this.isBelow413Version)
			for (d = this.props.length; c < d; ++c) "LinkedTo(" === this.props[c].name.substring(0, 9) && b.push(this.props[c].value);
		else if (null !== (a = h(this.props, "LinkedTo")) && Array.isArray(a.value))
			for (d = a.value.length; c < d; ++c) b.push(a.value[c].value);
		return b
	}, v.prototype.generateTextForUnreal = function(a) {
		var b, c = [],
			d = J(a),
			e = 0,
			f = this.props.length,
			g = [];
		if (this.isBelow413Version) {
			for (b = J(a + 1), c.push(d + 'Begin Object Name="' + this.id + '"'); e < f; ++e) c.push(b + U(this.props[e]));
			c.push(d + "End Object"), c = c.join("\n")
		} else {
			for (c.push("CustomProperties Pin ("); e < f; ++e) g.push(U(this.props[e]));
			c.push(g.join(",")), c.push(")"), c = d + c.join("")
		}
		return c
	}, v.prototype.generateHTML = function(a, b) {
		var c, d = "",
			e = {},
			f = "",
			g = "",
			i = null,
			j = ["label-text"],
			l = null,
			k = [],
			n = null,
			m = null,
			p = null,
			q = "",
			u = "",
			r = null,
			y = null,
			A = [],
			H = 0,
			T = null;
		if (this.isHidden()) return null;
		if (this.hasToHidePin(a) && (d = "hidden"), e = this.getConnectorType(), "NKnot" === b.constructor.name && (e.connector = "connector"), this.isLinkedTo() && (f = "filled"), "" !== e.type && (g = e.type), a = h(b.objectDefinition, "Name"), this.isDelegateOutput()) i = {
			tag: "div",
			classes: ["pin", d],
			attrs: [{
				name: "data-id",
				value: a.value + " " + this.id
			}],
			childs: ["NDelegate" === b.constructor.name && {
				tag: "div",
				classes: [j],
				text: "Event"
			}, {
				tag: "div",
				classes: ["clink", e.connector, e.type, f]
			}]
		};
		else if (this.isInput())
			if (null !== (l = this.getPropFromPinType("PinSubCategory")) && "DynamicAddPin" === l.value && (this.hasToGenerateInput = !1, j.push("icon-plus")), null !== (b = this.getPropFromPinType("PinCategory")) && "WaveTable" === b.value && (this.hasToGenerateInput = !1), k = [], "connector-map" === e.connector && (p = this.getPropFromPinType("PinValueType"), n = h(p.value, "TerminalSubCategoryObject"), m = p.value[0].value, null !== n && ("/Script/CoreUObject.ScriptStruct'" === n.value.substring(0, 33) && (n.value = n.value.substring(20)), "ScriptStruct'/Script/CoreUObject.Vector'" === n.value || "ScriptStruct'\"/Script/CoreUObject.Vector\"'" === n.value || "ScriptStruct'/Script/CoreUObject.Vector3f'" === n.value || "ScriptStruct'\"/Script/CoreUObject.Vector3f\"'" === n.value ? m = "vector" : "ScriptStruct'/Script/CoreUObject.Rotator'" === n.value || "ScriptStruct'\"/Script/CoreUObject.Rotator\"'" === n.value ? m = "rotator" : "ScriptStruct'/Script/CoreUObject.Transform'" !== n.value && "ScriptStruct'\"/Script/CoreUObject.Transform\"'" !== n.value || (m = "transform")), k = [{
					tag: "div",
					classes: ["key", e.type]
				}, {
					tag: "div",
					classes: ["value", m]
				}]), u = "", r = this.getPropFromPinType("bIsReference"), y = this.getPropFromPinType("bIsConst"), null !== r && "True" === r.value && null !== y && "False" === y.value && "delegate" !== e.type && (u = "ref"), A = this.generateHTMLInput(), "connector-map" !== e.connector && "transform" !== e.type || (A = []), b = this.findText(), i = {
					tag: "div",
					classes: ["pin", d],
					attrs: [{
						name: "data-id",
						value: a.value + " " + this.id
					}],
					childs: [{
						tag: "div",
						classes: ["div-inside", g],
						childs: [{
							tag: "div",
							classes: ["clink", u, e.connector, e.type, f],
							childs: k
						}, {
							tag: "div",
							classes: j,
							text: b
						}]
					}]
				}, this.hasInputSelect()) "" !== b && (i.childs[0].childs[1].classes.push("space-input-select"), i.childs[0].childs.push({
				tag: "br"
			})), i.childs[0].childs.push(this.generateInputSelect());
			else
				for (c = A.length; H < c; ++H) i.childs[0].childs.push(A[H]);
		else this.isExecOutput() && (q = "no-margin-bottom"), null !== (l = this.getPropFromPinType("PinSubCategory")) && "DynamicAddPin" === l.value && (this.hasToGenerateInput = !1, j.push("icon-plus")), T = null, b = h(this.props, "PinFriendlyName"), T = (0 < q.length && null === b && this.findText().length, {
			tag: "div",
			classes: j,
			text: this.findText()
		}), k = [], "connector-map" === e.connector && (p = this.getPropFromPinType("PinValueType"), n = h(p.value, "TerminalSubCategoryObject"), m = p.value[0].value, null !== n && ("/Script/CoreUObject.ScriptStruct'" === n.value.substring(0, 33) && (n.value = n.value.substring(20)), "ScriptStruct'/Script/CoreUObject.Vector'" === n.value || "ScriptStruct'\"/Script/CoreUObject.Vector\"'" === n.value || "ScriptStruct'/Script/CoreUObject.Vector3f'" === n.value || "ScriptStruct'\"/Script/CoreUObject.Vector3f\"'" === n.value ? m = "vector" : "ScriptStruct'/Script/CoreUObject.Rotator'" === n.value || "ScriptStruct'\"/Script/CoreUObject.Rotator\"'" === n.value ? m = "rotator" : "ScriptStruct'/Script/CoreUObject.Transform'" !== n.value && "ScriptStruct'\"/Script/CoreUObject.Transform\"'" !== n.value || (m = "transform")), k = [{
			tag: "div",
			classes: ["key", e.type]
		}, {
			tag: "div",
			classes: ["value", m]
		}]), u = "", r = this.getPropFromPinType("bIsReference"), y = this.getPropFromPinType("bIsConst"), null !== r && "True" === r.value && null !== y && "False" === y.value && "delegate" !== e.type && (u = "ref"), i = {
			tag: "div",
			classes: ["pin", d, q],
			attrs: [{
				name: "data-id",
				value: a.value + " " + this.id
			}],
			childs: [{
				tag: "div",
				classes: ["div-inside", g],
				childs: [T, {
					tag: "div",
					classes: ["clink", u, e.connector, e.type, f],
					childs: k
				}]
			}]
		};
		return i
	}, v.prototype.getConnectorType = function() {
		var a, b, c = "connector",
			d = null,
			e = null,
			f = "";
		return null !== this.override.connectorType ? this.override.connectorType : (d = this.getPropFromPinType("PinCategory"), a = this.getPropFromPinType("bIsArray"), e = this.getPropFromPinType("PinSubCategoryObject"), b = this.getPropFromPinType("ContainerType"), null === d ? {
			connector: c,
			type: ""
		} : (d = d.value.toLowerCase(), -1 !== ["exec"].indexOf(f = d) ? c = "connector-image" : null !== a && "True" === a.value ? c = "connector-array" : null !== b && "Set" === b.value ? c = "connector-set" : null !== b && "Map" === b.value ? c = "connector-map" : null !== b && "Array" === b.value ? c = "connector-array" : "trigger" === f && (c = "connector-trigger"), "statictype" === f && null !== e && (-1 !== e.value.indexOf("Niagara.NiagaraInt32") ? f += "-int" : -1 !== e.value.indexOf("Niagara.NiagaraBool") && (f += "-bool")), "struct" === d ? (null !== e && ("/Script/CoreUObject.ScriptStruct'" === e.value.substring(0, 33) && (e.value = e.value.substring(20)), "ScriptStruct'/Script/CoreUObject.Vector'" === e.value || "ScriptStruct'\"/Script/CoreUObject.Vector\"'" === e.value || "ScriptStruct'/Script/CoreUObject.Vector3f'" === e.value || "ScriptStruct'\"/Script/CoreUObject.Vector3f\"'" === e.value ? f = "vector" : "ScriptStruct'/Script/CoreUObject.Rotator'" === e.value || "ScriptStruct'\"/Script/CoreUObject.Rotator\"'" === e.value ? f = "rotator" : "ScriptStruct'/Script/CoreUObject.Transform'" !== e.value && "ScriptStruct'\"/Script/CoreUObject.Transform\"'" !== e.value || (f = "transform")), {
			connector: c,
			type: f
		}) : "type" === d ? (null !== e && ("/Script/CoreUObject.ScriptStruct'" === e.value.substring(0, 33) && (e.value = e.value.substring(20)), "ScriptStruct'\"/Script/Niagara.NiagaraParameterMap\"'" === e.value ? (c = "connector-image", f = "exec") : "ScriptStruct'\"/Script/Niagara.NiagaraFloat\"'" === e.value ? f = "float" : "ScriptStruct'\"/Script/Niagara.NiagaraNumeric\"'" === e.value ? f = "struct" : "ScriptStruct'\"/Script/CoreUObject.Vector\"'" === e.value || "ScriptStruct'\"/Script/CoreUObject.Vector2f\"'" === e.value || "ScriptStruct'\"/Script/CoreUObject.Vector3f\"'" === e.value ? f = "vector" : "ScriptStruct'\"/Script/Niagara.NiagaraInt32\"'" === e.value ? f = "int" : "ScriptStruct'\"/Script/Niagara.NiagaraMatrix\"'" === e.value ? f = "struct" : "ScriptStruct'\"/Script/Niagara.NiagaraBool\"'" === e.value ? f = "bool" : "ScriptStruct'\"/Script/CoreUObject.Vector2D\"'" === e.value || "ScriptStruct'\"/Script/CoreUObject.Vector4\"'" === e.value || "ScriptStruct'\"/Script/CoreUObject.Vector4f\"'" === e.value || "ScriptStruct'\"/Script/CoreUObject.Quat4f\"'" === e.value ? f = "struct" : "ScriptStruct'\"/Script/Niagara.NiagaraPosition\"'" === e.value ? f = "position" : "ScriptStruct'\"/Script/Engine.UserDefinedEnum\"'" !== e.value && "ScriptStruct'\"/Script/CoreUObject.LinearColor\"'" !== e.value || (f = "enum")), {
			connector: c,
			type: f
		}) : ("class" === d && (f = "wildcard"), "misc" === d && (f = "wildcard"), "assetclass" === d && (f = "asset-class"), "softclass" === d && (f = "soft-class"), "softobject" === d && (f = "soft-object"), {
			connector: c,
			type: f = (f = "int32" === (f = "float" === (f = "time:array" === d ? "time" : f) && null !== (a = this.getPropFromPinType("PinSubCategory")) && "time" === a.value ? "time" : f) ? "int" : f).replaceAll(" ", "-")
		})))
	}, v.prototype.isLinkedTo = function() {
		return this.isBelow413Version ? null !== h(this.props, "LinkedTo(0)") : null !== h(this.props, "LinkedTo")
	}, v.prototype.findText = function() {
		var a, b, c = "",
			d = null;
		if (!1 === this.hasToGenerateText) return c;
		if (null !== (a = this.getPropFromPinType("PinSubCategory")) && "DynamicAddPin" === a.value) return c;
		if (d = this.getPropFromPinType("PinCategory"), a = h(this.props, "PinFriendlyName"), null !== (b = h(this.props, "PinName")) && null === a && ("then" === b.value || "execute" === b.value || "exec" === b.value)) return c;
		if (null === d) return c = null === a ? D(b.value) : bf(a);
		if (null !== a) c = bf(a);
		else if (null !== b) {
			if ("trigger" === (a = d.value.toLowerCase())) {
				if ("UE.Source.OnPlay" === b.value) return "On Play";
				if ("UE.Source.OneShot.OnFinished" === b.value) return "On Finished"
			}
			if ("audio" === a && "UE.OutputFormat.Mono.Audio:0" === b.value) return "Out Mono";
			"then" !== b.value && "execute" !== b.value && (c = b.value, "bool" === a && c.match(/^[b][A-Z]/) && (c = c.substring(1)), c = D(c))
		}
		return cp(c)
	}, v.prototype.generateHTMLInput = function() {
		var a, b = [],
			c = null,
			d = null,
			e = null,
			f = "",
			g = ["exec", "delegate", "trigger", "audio"],
			i = "Asset",
			j = "",
			l = [],
			k = [],
			n = 0,
			m = 0;
		if (!1 === this.hasToGenerateInput) return b;
		if (this.isLinkedTo()) return b;
		if (d = this.getPropFromPinType("PinCategory"), a = this.getPropFromPinType("PinSubCategory"), null !== (e = this.getPropFromPinType("PinSubCategoryObject")) && "/Script/CoreUObject.ScriptStruct'" === e.value.substring(0, 33) && (e.value = e.value.substring(20)), f = "", this.isLinkedTo() && (f = "hidden"), d = d.value.toLowerCase(), -1 !== g.indexOf(d)) return b;
		if (-1 !== (g = ["delegate"]).indexOf(d)) return {
			tag: "span",
			classes: ["no-input"]
		};
		if (null !== (g = this.getPropFromPinType("bIsArray")) && "True" === g.value) return [{
			tag: "span",
			classes: ["no-input"]
		}];
		if (null !== (g = this.getPropFromPinType("ContainerType")) && "Array" === g.value) b = [{
			tag: "span",
			classes: ["no-input"]
		}];
		else if ("bool" === d) b = [{
			tag: "input",
			classes: ["checkbox", f],
			attrs: [{
				name: "type",
				value: "checkbox"
			}, {
				name: "value",
				value: "1"
			}]
		}], "true" === this.getValue() && b[0].attrs.push({
			name: "checked",
			value: "checked"
		});
		else if ("struct" === d)
			if (null === e || "ScriptStruct'/Script/CoreUObject.LinearColor'" !== e.value && "ScriptStruct'\"/Script/CoreUObject.LinearColor\"'" !== e.value) {
				if (null !== e && -1 !== e.value.indexOf("/Script/EnhancedInput.ModifyContextOptions")) return [{
					tag: "span",
					classes: ["no-input"]
				}];
				b = null === e || "ScriptStruct'/Script/CoreUObject.Vector2D'" !== e.value && "ScriptStruct'\"/Script/CoreUObject.Vector2D\"'" !== e.value ? null === e || "ScriptStruct'/Script/CoreUObject.Vector'" !== e.value && "ScriptStruct'\"/Script/CoreUObject.Vector\"'" !== e.value && "ScriptStruct'/Script/CoreUObject.Vector3f'" !== e.value && "ScriptStruct'\"/Script/CoreUObject.Vector3f\"'" !== e.value ? null === e || "ScriptStruct'/Script/CoreUObject.Rotator'" !== e.value && "ScriptStruct'\"/Script/CoreUObject.Rotator\"'" !== e.value ? [{
					tag: "span",
					classes: ["fake-input", f],
					attrs: [{
						name: "contenteditable",
						value: "true"
					}],
					text: this.getValue()
				}] : ("" === (c = this.getValue()) && (c = "0.0,0.0,0.0"), 0 < this.findText().length ? [{
					tag: "br"
				}, {
					tag: "span",
					classes: ["tri-input-wrapper", f],
					childs: [{
						tag: "span",
						classes: ["fake-input", "axis", "axis-X", f],
						attrs: [{
							name: "contenteditable",
							value: "true"
						}],
						text: t(c.split(",")[2])
					}, {
						tag: "span",
						classes: ["fake-input", "axis", "axis-Y", f],
						attrs: [{
							name: "contenteditable",
							value: "true"
						}],
						text: t(c.split(",")[0])
					}, {
						tag: "span",
						classes: ["fake-input", "axis", "axis-Z", f],
						attrs: [{
							name: "contenteditable",
							value: "true"
						}],
						text: t(c.split(",")[1])
					}]
				}] : [{
					tag: "span",
					classes: ["fake-input", "axis", "axis-X", f],
					attrs: [{
						name: "contenteditable",
						value: "true"
					}],
					text: t(c.split(",")[2])
				}, {
					tag: "span",
					classes: ["fake-input", "axis", "axis-Y", f],
					attrs: [{
						name: "contenteditable",
						value: "true"
					}],
					text: t(c.split(",")[0])
				}, {
					tag: "span",
					classes: ["fake-input", "axis", "axis-Z", f],
					attrs: [{
						name: "contenteditable",
						value: "true"
					}],
					text: t(c.split(",")[1])
				}]) : ("" === (c = this.getValue()) && (c = "0.0,0.0,0.0"), 0 < this.findText().length ? [{
					tag: "br"
				}, {
					tag: "span",
					classes: ["tri-input-wrapper", f],
					childs: [{
						tag: "span",
						classes: ["fake-input", "axis", "axis-X", f],
						attrs: [{
							name: "contenteditable",
							value: "true"
						}],
						text: t(c.split(",")[0])
					}, {
						tag: "span",
						classes: ["fake-input", "axis", "axis-Y", f],
						attrs: [{
							name: "contenteditable",
							value: "true"
						}],
						text: t(c.split(",")[1])
					}, {
						tag: "span",
						classes: ["fake-input", "axis", "axis-Z", f],
						attrs: [{
							name: "contenteditable",
							value: "true"
						}],
						text: t(c.split(",")[2])
					}]
				}] : [{
					tag: "span",
					classes: ["fake-input", "axis", "axis-X", f],
					attrs: [{
						name: "contenteditable",
						value: "true"
					}],
					text: t(c.split(",")[0])
				}, {
					tag: "span",
					classes: ["fake-input", "axis", "axis-Y", f],
					attrs: [{
						name: "contenteditable",
						value: "true"
					}],
					text: t(c.split(",")[1])
				}, {
					tag: "span",
					classes: ["fake-input", "axis", "axis-Z", f],
					attrs: [{
						name: "contenteditable",
						value: "true"
					}],
					text: t(c.split(",")[2])
				}]) : (c = "" === this.getValue() ? [{
					value: "0.0"
				}, {
					value: "0.0"
				}] : R(this.getValue()), 0 < this.findText().length ? [{
					tag: "br"
				}, {
					tag: "span",
					classes: ["tri-input-wrapper", f],
					childs: [{
						tag: "span",
						classes: ["fake-input", "axis", "axis-X", f],
						attrs: [{
							name: "contenteditable",
							value: "true"
						}],
						text: t(c[0].value)
					}, {
						tag: "span",
						classes: ["fake-input", "axis", "axis-Y", f],
						attrs: [{
							name: "contenteditable",
							value: "true"
						}],
						text: t(c[1].value)
					}]
				}] : [{
					tag: "span",
					classes: ["fake-input", "axis", "axis-X", f],
					attrs: [{
						name: "contenteditable",
						value: "true"
					}],
					text: t(c[0].value)
				}, {
					tag: "span",
					classes: ["fake-input", "axis", "axis-Y", f],
					attrs: [{
						name: "contenteditable",
						value: "true"
					}],
					text: t(c[1].value)
				}])
			} else b = [{
				tag: "span",
				classes: ["fake-input-colorpicker", f],
				attrs: [{
					name: "style",
					value: "background-color: " + this.convertColorToRgbaCssFromValue()
				}]
			}];
		else if ("object" === d || "class" === d) b = !1 === this.hasValue() && !1 === this.hasObject() ? [{
			tag: "span",
			classes: ["no-input"]
		}] : null !== a && "self" === a.value ? [{
			tag: "span",
			classes: ["fake-input", f],
			attrs: [{
				name: "contenteditable",
				value: "false"
			}],
			text: "self"
		}] : (i = "Asset", [{
			tag: "br"
		}, {
			tag: "span",
			classes: ["fake-input-select", f],
			childs: [{
				text: this.getObject(i = "class" === d ? "Class" : i)
			}, {
				tag: "span",
				classes: ["dropdown"]
			}]
		}, {
			tag: "span",
			classes: ["asset-browser", f]
		}, {
			tag: "span",
			classes: ["browse", f]
		}]);
		else if ("type" === d) {
			if (null !== e)
				if (-1 !== e.value.indexOf("Niagara.NiagaraBool")) b = [{
					tag: "input",
					classes: ["checkbox", f],
					attrs: [{
						name: "type",
						value: "checkbox"
					}, {
						name: "value",
						value: "1"
					}]
				}], "true" === this.getValue() && b[0].attrs.push({
					name: "checked",
					value: "checked"
				});
				else if (-1 !== e.value.indexOf("Vector3f") || -1 !== e.value.indexOf("NiagaraPosition")) "" === (c = this.getValue()) && (c = "0.0,0.0,0.0"), b = 0 < this.findText().length ? [{
				tag: "br"
			}, {
				tag: "span",
				classes: ["tri-input-wrapper", f],
				childs: [{
					tag: "span",
					classes: ["fake-input", "axis", "axis-X", f],
					attrs: [{
						name: "contenteditable",
						value: "true"
					}],
					text: t(c.split(",")[0])
				}, {
					tag: "span",
					classes: ["fake-input", "axis", "axis-Y", f],
					attrs: [{
						name: "contenteditable",
						value: "true"
					}],
					text: t(c.split(",")[1])
				}, {
					tag: "span",
					classes: ["fake-input", "axis", "axis-Z", f],
					attrs: [{
						name: "contenteditable",
						value: "true"
					}],
					text: t(c.split(",")[2])
				}]
			}] : [{
				tag: "span",
				classes: ["fake-input", "axis", "axis-X", f],
				attrs: [{
					name: "contenteditable",
					value: "true"
				}],
				text: t(c.split(",")[0])
			}, {
				tag: "span",
				classes: ["fake-input", "axis", "axis-Y", f],
				attrs: [{
					name: "contenteditable",
					value: "true"
				}],
				text: t(c.split(",")[1])
			}, {
				tag: "span",
				classes: ["fake-input", "axis", "axis-Z", f],
				attrs: [{
					name: "contenteditable",
					value: "true"
				}],
				text: t(c.split(",")[2])
			}];
			else if (-1 !== e.value.indexOf("Vector2f")) c = "" === this.getValue() ? [{
				value: "0.0"
			}, {
				value: "0.0"
			}] : R("(" + this.getValue().replace(" ", ",") + ")"), b = 0 < this.findText().length ? [{
				tag: "br"
			}, {
				tag: "span",
				classes: ["tri-input-wrapper", f],
				childs: [{
					tag: "span",
					classes: ["fake-input", "axis", "axis-X", f],
					attrs: [{
						name: "contenteditable",
						value: "true"
					}],
					text: t(c[0].value)
				}, {
					tag: "span",
					classes: ["fake-input", "axis", "axis-Y", f],
					attrs: [{
						name: "contenteditable",
						value: "true"
					}],
					text: t(c[1].value)
				}]
			}] : [{
				tag: "span",
				classes: ["fake-input", "axis", "axis-X", f],
				attrs: [{
					name: "contenteditable",
					value: "true"
				}],
				text: t(c[0].value)
			}, {
				tag: "span",
				classes: ["fake-input", "axis", "axis-Y", f],
				attrs: [{
					name: "contenteditable",
					value: "true"
				}],
				text: t(c[1].value)
			}];
			else if (-1 !== e.value.indexOf("Vector4f")) c = "" === this.getValue() ? [{
				value: "0.0"
			}, {
				value: "0.0"
			}, {
				value: "0.0"
			}, {
				value: "0.0"
			}] : R("(" + this.getValue().replace(" ", ",") + ")"), b = 0 < this.findText().length ? [{
				tag: "br"
			}, {
				tag: "span",
				classes: ["tri-input-wrapper", f],
				childs: [{
					tag: "span",
					classes: ["fake-input", "axis", "axis-X", f],
					attrs: [{
						name: "contenteditable",
						value: "true"
					}],
					text: t(c[0].value)
				}, {
					tag: "span",
					classes: ["fake-input", "axis", "axis-Y", f],
					attrs: [{
						name: "contenteditable",
						value: "true"
					}],
					text: t(c[1].value)
				}, {
					tag: "span",
					classes: ["fake-input", "axis", "axis-Z", f],
					attrs: [{
						name: "contenteditable",
						value: "true"
					}],
					text: t(c[2].value)
				}, {
					tag: "span",
					classes: ["fake-input", "axis", "axis-W", f],
					attrs: [{
						name: "contenteditable",
						value: "true"
					}],
					text: t(c[3].value)
				}]
			}] : [{
				tag: "span",
				classes: ["fake-input", "axis", "axis-X", f],
				attrs: [{
					name: "contenteditable",
					value: "true"
				}],
				text: t(c[0].value)
			}, {
				tag: "span",
				classes: ["fake-input", "axis", "axis-Y", f],
				attrs: [{
					name: "contenteditable",
					value: "true"
				}],
				text: t(c[1].value)
			}, {
				tag: "span",
				classes: ["fake-input", "axis", "axis-Z", f],
				attrs: [{
					name: "contenteditable",
					value: "true"
				}],
				text: t(c[2].value)
			}, {
				tag: "span",
				classes: ["fake-input", "axis", "axis-W", f],
				attrs: [{
					name: "contenteditable",
					value: "true"
				}],
				text: t(c[3].value)
			}];
			else if (-1 !== e.value.indexOf("CoreUObject.LinearColor")) b = [{
				tag: "span",
				classes: ["fake-input-colorpicker", f],
				attrs: [{
					name: "style",
					value: "background-color: " + this.convertColorToRgbaCssFromValue()
				}]
			}];
			else if (-1 === e.value.indexOf("Quat4f") && -1 === e.value.indexOf("Niagara.NiagaraMatrix"))
				if (j = this.getValue(), -1 === (j = -1 === e.value.indexOf("Niagara.NiagaraInt32") && -1 === e.value.indexOf("Niagara.NiagaraFloat") ? j : j.replace(/(\.\d+?)0+\b/, "$1")).indexOf("<br>")) b = [{
					tag: "span",
					classes: ["fake-input", f],
					attrs: [{
						name: "contenteditable",
						value: "true"
					}],
					text: j
				}];
				else {
					for (l = [], m = (k = j.split("<br>")).length; n < m; ++n) l.push({
						text: k[n]
					}), n + 1 < k.length && l.push({
						tag: "br"
					});
					b = [{
						tag: "span",
						classes: ["fake-input", f],
						attrs: [{
							name: "contenteditable",
							value: "true"
						}],
						childs: l
					}]
				}
		} else if (j = this.getValue(), "" === (j = "float" !== d && "double" !== d && "real" !== d && "time" !== d && "int32" !== d ? j : j.replace(/(\.\d+?)0+\b/, "$1")) && ("int32" === d || "int" === d ? j = "0" : "float" !== d && "double" !== d && "real" !== d && "time" !== d || (j = "0.0")), -1 === j.indexOf("<br>")) b = [{
			tag: "span",
			classes: ["fake-input", f],
			attrs: [{
				name: "contenteditable",
				value: "true"
			}],
			text: j
		}];
		else {
			for (l = [], m = (k = j.split("<br>")).length; n < m; ++n) l.push({
				text: k[n]
			}), n + 1 < k.length && l.push({
				tag: "br"
			});
			b = [{
				tag: "span",
				classes: ["fake-input", f],
				attrs: [{
					name: "contenteditable",
					value: "true"
				}],
				childs: l
			}]
		}
		return b
	}, v.prototype.hasValue = function() {
		return null !== h(this.props, "DefaultValue")
	}, v.prototype.hasObject = function() {
		return null !== h(this.props, "DefaultObject")
	}, v.prototype.getObject = function(a) {
		var b = h(this.props, "DefaultObject");
		return null !== b ? ct(bv(b.value)) : "Select " + a
	}, v.prototype.getValue = function() {
		var a = null,
			b = h(this.props, "DefaultValue");
		return null !== b ? bv(b.value) : null !== (a = h(this.props, "DefaultTextValue")) ? "INVTEXT" === a.value ? a.value.substring(10).substring(0, a.value.length - 13) : bv(bf(a)) : ""
	}, v.prototype.convertColorToRgbaCssFromValue = function() {
		var a, b, c = this.getValue(),
			d = [];
		return 0 < c.length ? (c = (d = c.split(","))[0].substr(3), a = d[1].substr(2), b = d[2].substr(2), d = d[3].substr(2, d[3].length - 3), "rgba(" + bI(c) + "," + bI(a) + "," + bI(b) + "," + d + ")") : "rgba(0,0,0,1)"
	}, v.prototype.isHidden = function() {
		var a = h(this.props, "bHidden");
		return null !== a && "True" === a.value
	}, v.prototype.hasToHidePin = function(a) {
		var b;
		return !a && (a = h(this.props, "bAdvancedView"), b = h(this.props, "LinkedTo"), null !== a && "True" === a.value && null === b)
	}, v.prototype.isInput = function() {
		var a = h(this.props, "Direction");
		return null === a || "EGPD_Output" !== a.value
	}, v.prototype.isOutput = function() {
		var a = h(this.props, "Direction");
		return null !== a && "EGPD_Output" === a.value
	}, v.prototype.isDelegateOutput = function() {
		var a = this.getPropFromPinType("PinCategory");
		return this.isOutput() && null !== a && "delegate" === a.value
	}, v.prototype.isExecOutput = function() {
		var a = this.getPropFromPinType("PinCategory");
		return this.isOutput() && null !== a && "exec" === a.value
	}, v.prototype.getPropFromPinType = function(a) {
		var b;
		return this.isBelow413Version ? null === (b = h(this.props, "PinType")) ? null : h(b.value, a) : h(this.props, "PinType." + a)
	}, v.prototype.hasInputSelect = function() {
		return 0 < this.inputSelectValues.length
	}, v.prototype.generateInputSelect = function() {
		var a = {
				tag: "select",
				attrs: [{
					name: "class",
					value: "nmetasound-select"
				}],
				childs: []
			},
			b = 0,
			c = this.inputSelectValues.length,
			d = null,
			e = this.getValue();
		for ("" === e && (e = this.inputSelectDefaultValue); b < c; ++b) d = [{
			name: "value",
			value: this.inputSelectValues[b].value
		}], this.inputSelectValues[b].value === e && d.push({
			name: "selected",
			value: "selected"
		}), a.childs.push({
			tag: "option",
			text: this.inputSelectValues[b].name,
			attrs: d
		});
		return a
	}, v.prototype.setInputSelectValues = function(a, b) {
		this.inputSelectValues = a, this.inputSelectDefaultValue = b
	};

	function bz(a, b) {
		return "object" != typeof a ? new TypeError("Argument 'options' is incorrect, expect object, get " + typeof a) : b instanceof br ? (this.data = {
			options: a
		}, void(this.bus = b)) : new TypeError("Bus argument must be instance of Bus")
	}
	bz.prototype.html = function() {}, bz.prototype.blueprint = function() {}, bz.prototype.cpp = function() {};

	function cm() {
		var a = document.createElement("div");
		return a.innerHTML = "\x3c!--[if lte IE 7]>1<![endif]--\x3e", "1" === a.innerHTML || (-1 !== window.navigator.userAgent.toUpperCase().indexOf("TRIDENT") || -1 !== window.navigator.userAgent.toUpperCase().indexOf("MSIE"))
	}

	function bS(a) {
		return a.classList.contains("connector-image") ? 5 : 6
	}

	function bT(a) {
		return a.classList.contains("connector-image") ? 7 : 6
	}

	function cn(a) {
		for (var b = [{
				css: "asset",
				color: "95FFFF"
			}, {
				css: "asset-class",
				color: "FF95FF"
			}, {
				css: "bool",
				color: "950000"
			}, {
				css: "byte",
				color: "006F65"
			}, {
				css: "class",
				color: "5900BC"
			}, {
				css: "default",
				color: "E1CCAA"
			}, {
				css: "delegate",
				color: "FF3838"
			}, {
				css: "exec",
				color: "FFFFFF"
			}, {
				css: "float",
				color: "A1FF45"
			}, {
				css: "index",
				color: "1EE4AF"
			}, {
				css: "int",
				color: "1EE4AF"
			}, {
				css: "interface",
				color: "F1FFAA"
			}, {
				css: "name",
				color: "CD82FF"
			}, {
				css: "object",
				color: "00AAF5"
			}, {
				css: "rotator",
				color: "A1B4FF"
			}, {
				css: "string",
				color: "FF00D5"
			}, {
				css: "struct",
				color: "0059CC"
			}, {
				css: "text",
				color: "E87CAA"
			}, {
				css: "transform",
				color: "FF7300"
			}, {
				css: "vector",
				color: "FFCA22"
			}, {
				css: "wildcard",
				color: "817A7A"
			}, {
				css: "audio",
				color: "FD94FD"
			}, {
				css: "time",
				color: "95FEFE"
			}, {
				css: "wavetable",
				color: "C800EB"
			}, {
				css: "real",
				color: "38D500"
			}, {
				css: "pcg-spatial-data",
				color: "FFFFFF"
			}, {
				css: "pcg-attribute-set",
				color: "C8811C"
			}, {
				css: "pcg-point-data",
				color: "3F89FF"
			}, {
				css: "pcg-poly-line-data",
				color: "3FE1EA"
			}, {
				css: "pcg-landscape-data",
				color: "D4D44B"
			}, {
				css: "pcg-texture-data",
				color: "E65019"
			}, {
				css: "pcg-render-target-data",
				color: "E77661"
			}, {
				css: "pcg-surface-data",
				color: "45C47E"
			}, {
				css: "pcg-volume-data",
				color: "E645BC"
			}, {
				css: "pcg-primitive-data",
				color: "813FFF"
			}, {
				css: "pcg-concrete-data",
				color: "B3A6FA"
			}, {
				css: "pcg-any-data",
				color: "939393"
			}], c = 0, d = b.length; c < d; ++c)
			if (a.classList.contains(b[c].css)) return b[c].color;
		return "FFFFFF"
	}

	function C(a, b, c) {
		this.dom = {
			canvas: null,
			frame: null,
			overlay: null,
			root: a
		}, this.options = b, this.bus = c, this.eventsBinding = {
			drawNewLink: this.drawNewLink.bind(this),
			moveLink: this.moveLink.bind(this),
			newLink: this.newLink.bind(this)
		}, this.bus.listen("draw_new_link", this.drawNewLink.bind(this)), this.bus.listen("move_link", this.moveLink.bind(this)), this.bus.listen("new_link", this.newLink.bind(this))
	}
	C.prototype.createPlayground = function(a) {
		var b = [],
			c = "CREATE PLAYGROUND...";
		return this.options.height && b.push("height:" + this.options.height), cm() && (c = "This website stop supporting Internet Explorer from version 5.5 to 11, consequently you have to use a modern browser."), b = bq([{
			tag: "div",
			classes: ["bue-render"],
			childs: [{
				tag: "div",
				classes: ["frame"],
				attrs: [{
					name: "style",
					value: b.join(";")
				}],
				childs: [{
					tag: "div",
					classes: ["layer"],
					childs: [{
						tag: "div",
						classes: ["reference"]
					}, {
						tag: "div",
						classes: ["canvas"]
					}]
				}, {
					tag: "div",
					classes: ["frame-header"],
					childs: [{
						tag: "div",
						classes: ["frame-header__buttons"],
						childs: [{
							tag: "div",
							classes: ["frame-header__buttons-panel"]
						}, {
							tag: "div",
							classes: ["frame-header__buttons-separator"]
						}, {
							tag: "div",
							classes: ["frame-header__buttons-fullscreen"],
							text: "Fullscreen"
						}, {
							tag: "div",
							classes: ["frame-header__buttons-reset"],
							text: "Reset"
						}]
					}, {
						tag: "div",
						classes: ["frame-header__breadcrumb"],
						childs: [{
							tag: "span",
							classes: ["frame-header__breadcrumb-item"],
							attrs: [{
								name: "data-node-id",
								value: ""
							}],
							text: "Graph"
						}]
					}, {
						tag: "div",
						classes: ["frame-header__current-zoom"],
						text: "Zoom 1:1"
					}]
				}, {
					tag: "div",
					classes: ["blueprint-type"],
					text: a
				}, {
					tag: "div",
					classes: ["panel"],
					childs: [{
						tag: "div",
						classes: ["panel__menu"],
						childs: [{
							tag: "div",
							classes: ["panel__section", "panel__section--first"],
							text: "Options"
						}, {
							tag: "button",
							classes: ["panel__button"],
							text: "Save current blueprint as image",
							attrs: [{
								name: "data-feature-panel-name",
								value: "generate-image"
							}]
						}]
					}]
				}, {
					tag: "div",
					classes: ["overlay"],
					text: c
				}]
			}]
		}]), this.dom.root.appendChild(b[0]), this.dom.frame = this.dom.root.querySelector(".frame"), this.dom.canvas = this.dom.root.querySelector(".canvas"), this.dom.overlay = this.dom.root.querySelector(".overlay"), !cm()
	}, C.prototype.cleanViewport = function() {
		for (var a = this.dom.canvas.childNodes.length - 1; 0 <= a; --a) this.dom.canvas.childNodes[a].remove()
	}, C.prototype.displayNodesInViewport = function(a) {
		for (var b, c = document.createDocumentFragment(), d = 0, e = a.length; d < e; ++d) try {
			b = a[d].generateHTML(), c.appendChild(bq([b])[0])
		} catch (b) {
			throw a[d].guid ? (b.message = "NodeGUID " + a[d].guid + ": " + b.message, b.NodeGUID = a[d].guid) : (b.message = "Node #" + d + ": " + b.message, b.NodeIdx = d), b
		}
		this.dom.canvas.appendChild(c)
	}, C.prototype.getCenterCanvas = function() {
		var a = this.dom.canvas.getBoundingClientRect();
		return [a.width / 2 >> 0, a.height / 2 >> 0]
	}, C.prototype.computeSVGLink = function(a, b, c) {
		var d = null,
			e = null,
			f = 0,
			g = 0,
			i = a.getBoundingClientRect(),
			j = b.getBoundingClientRect(),
			l = this.dom.canvas.getBoundingClientRect(),
			i = {
				top: i.top + window.scrollY,
				left: i.left + window.scrollX
			},
			j = {
				top: j.top + window.scrollY,
				left: j.left + window.scrollX
			},
			k = this.dom.canvas.offsetTop,
			n = this.dom.canvas.offsetLeft,
			m = l.top + window.scrollY,
			l = l.left + window.scrollX;
		return i.top -= k + m, i.left -= n + l, j.top -= k + m, j.left -= n + l, k = bS(a), m = bT(a), n = Math.min(i.left, j.left) + k, l = Math.min(i.top, j.top) + m, 0 === (f = Math.max(i.left, j.left) - Math.min(i.left, j.left) >> 0) && (f = 2), 0 === (g = Math.max(i.top, j.top) - Math.min(i.top, j.top) >> 0) && (g = 2), k = bG(i, j, f, g), k = bW(k, a, b, i, j, f, g), (d = document.createElementNS("http://www.w3.org/2000/svg", "svg")).classList.add("link"), d.setAttribute("data-id", c), d.setAttribute("style", "transform: translate(" + n + "px, " + l + "px)"), d.setAttribute("width", f), d.setAttribute("height", g), d.setAttribute("pointer-events", "none"), d.setAttribute("position", "absolute"), (e = document.createElementNS("http://www.w3.org/2000/svg", "path")).setAttribute("d", k), e.setAttribute("transform", ""), e.setAttribute("pointer-events", "visibleStroke"), e.setAttribute("fill", "none"), e.setAttribute("stroke", "#" + cn(a)), e.setAttribute("style", ""), e.setAttribute("stroke-width", "2"), d.appendChild(e), d
	}, C.prototype.drawLinks = function(a) {
		for (var b, c, d = document.createDocumentFragment(), e = this.dom.canvas.querySelectorAll(".pin .clink.filled"), f = {}, g = 0, i = e.length, j = 0, l = a.length; g < i; ++g) f[e[g].closest(".pin").getAttribute("data-id")] = e[g];
		for (; j < l; ++j) b = f[(c = a[j].split(","))[0]] || null, c = f[c[1]] || null, null !== b && null !== c && d.appendChild(this.computeSVGLink(b, c, a[j]));
		this.dom.canvas.appendChild(d)
	}, C.prototype.reDrawLinks = function(a, b) {
		for (var c, d, e, f, g = 0, i = a.length, j = null, l = null, k = null, n = this.dom.frame.getBoundingClientRect(), m = {}, p = {}, q = 0, u = 0; g < i; ++g) d = a[g].split(","), j = this.dom.canvas.querySelector('.pin[data-id="' + d[0] + '"] .clink'), l = this.dom.canvas.querySelector('.pin[data-id="' + d[1] + '"] .clink'), k = this.dom.canvas.querySelector('svg[data-id="' + a[g] + '"]'), null !== j && null !== l && null !== k && (d = {
			top: this.dom.canvas.offsetTop,
			left: this.dom.canvas.offsetLeft
		}, f = j.getBoundingClientRect(), c = l.getBoundingClientRect(), e = {
			top: n.top + window.scrollY,
			left: n.left + window.scrollX
		}, m = {
			top: f.top + window.scrollY,
			left: f.left + window.scrollX
		}, p = {
			top: c.top + window.scrollY,
			left: c.left + window.scrollX
		}, m.top -= d.top + e.top, m.left -= d.left + e.left, p.top -= d.top + e.top, p.left -= d.left + e.left, f = bS(j), c = bT(j), d = Math.min(m.left, p.left) + f, e = Math.min(m.top, p.top) + c, 0 === (q = Math.max(m.left, p.left) - Math.min(m.left, p.left)) && (q = 2), 0 === (u = Math.max(m.top, p.top) - Math.min(m.top, p.top)) && (u = 2), f = bG(m, p, q, u), f = bW(f, j, l, m, p, q, u), k.querySelector("path").setAttribute("d", f), k.setAttribute("style", "transform: translate(" + d + "px, " + e + "px)"), k.setAttribute("width", q), k.setAttribute("height", u));
		"function" == typeof b && b()
	}, C.prototype.computeSVGLinkWithMouse = function(a, b, c, d) {
		var e = null,
			f = null,
			g = 0,
			i = 0,
			j = a.getBoundingClientRect(),
			l = this.dom.canvas.getBoundingClientRect(),
			k = l.top + window.scrollY,
			l = l.left + window.scrollX,
			j = {
				top: (j.top + window.scrollY) / d,
				left: (j.left + window.scrollX) / d
			},
			b = {
				left: b.pageX / d,
				top: b.pageY / d
			};
		return j.top -= k / d, j.left -= l / d, b.top -= k / d, b.left -= l / d, k = bS(a), l = bT(a), d = Math.min(j.left, b.left) + k, k = Math.min(j.top, b.top) + l, 0 === (g = Math.max(j.left, b.left) - Math.min(j.left, b.left) >> 0) && (g = 2), 0 === (i = Math.max(j.top, b.top) - Math.min(j.top, b.top) >> 0) && (i = 2), (e = document.createElementNS("http://www.w3.org/2000/svg", "svg")).classList.add("link", "moving"), e.setAttribute("data-id", c), e.setAttribute("style", "transform: translate(" + d + "px, " + k + "px)"), e.setAttribute("width", g), e.setAttribute("height", i), e.setAttribute("pointer-events", "none"), e.setAttribute("position", "absolute"), (f = document.createElementNS("http://www.w3.org/2000/svg", "path")).setAttribute("d", bG(j, b, g, i)), f.setAttribute("transform", ""), f.setAttribute("pointer-events", "visibleStroke"), f.setAttribute("fill", "none"), f.setAttribute("stroke", "#" + cn(a)), f.setAttribute("style", ""), f.setAttribute("stroke-width", "2"), e.appendChild(f), e
	}, C.prototype.drawNewLink = function(a, b, c) {
		a = a.querySelector(".clink"), a = this.computeSVGLinkWithMouse(a, b, "moving", c);
		this.dom.canvas.appendChild(a)
	}, C.prototype.moveLink = function(a, b, c) {
		this.dom.canvas.querySelector("svg.moving").remove(), a = a.querySelector(".clink"), a = this.computeSVGLinkWithMouse(a, b, "moving", c), this.dom.canvas.appendChild(a)
	}, C.prototype.newLink = function(a, b) {
		this.dom.canvas.appendChild(this.computeSVGLink(a, b, ""))
	}, C.prototype.updateLoading = function(a) {
		this.dom.overlay.textContent = a
	}, C.prototype.removeLoading = function() {
		this.dom.overlay.style.display = "none"
	}, C.prototype.showLoading = function() {
		this.dom.overlay.style.display = ""
	}, C.prototype.addDataTimerInPlayground = function(a) {
		this.dom.frame.setAttribute("data-parse_blueprint", (a.parseBlueprint >> 0).toString()), this.dom.frame.setAttribute("data-create_playground", (a.createPlayground >> 0).toString()), this.dom.frame.setAttribute("data-display_nodes", (a.displayNodesInViewport >> 0).toString()), this.dom.frame.setAttribute("data-draw_links", (a.drawLinks >> 0).toString()), this.dom.frame.setAttribute("data-interactions", (a.startAllBinding >> 0).toString()), this.dom.frame.setAttribute("data-sum", (a.parseBlueprint + a.createPlayground + a.displayNodesInViewport + a.drawLinks + a.startAllBinding >> 0).toString())
	}, C.prototype.stop = function() {
		var a = null;
		for (this.dom.canvas = null, this.dom.frame = null, this.dom.overlay = null, a = this.dom.root.lastElementChild; a;) this.dom.root.removeChild(a), a = this.dom.root.lastElementChild;
		this.dom.root = null
	};

	function bU(d, e, f) {
		var g = {},
			i = null;
		return "string" != typeof d ? new TypeError("Argument 'text', expect string, get " + typeof d) : e instanceof HTMLElement ? (g = {
			htmlElement: e,
			options: f || {},
			text: d
		}, this.start = function(a) {
			i && (i.stop(), i = null), (i = new B(g.text, g.htmlElement, g.options, new br)).start(a)
		}, this.updateBlueprintText = function(a, b) {
			if ("string" != typeof a) return new TypeError("Argument 'newBlueprintText', expect string, get " + typeof a);
			g.text = a, i && i.updateBlueprintText(a, b)
		}, this.stop = function() {
			i && (i.stop(), i = null)
		}, this.getBlueprintData = function() {
			return i.getBlueprintData()
		}, void(this.moveTo = function(a, b, c) {
			i.moveTo(a, b, c)
		})) : new TypeError("Argument 'htmlElement', expect HTMLElement, get " + typeof e)
	}
	Object.freeze(bU.prototype), Object.freeze(bU), window.blueprintUE.render.Main = bU
}());