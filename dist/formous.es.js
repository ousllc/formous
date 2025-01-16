const W = {
  required: {
    // 入力が空でないか確認
    validate: (e, t) => {
      var a;
      return !(t.hasAttribute("required") || ((a = t.getAttribute("data-validation")) == null ? void 0 : a.includes("required"))) || e.trim().length > 0;
    },
    message: () => "This field is required."
  },
  email: {
    // メールアドレス形式か確認
    validate: (e) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e),
    message: () => "Please enter a valid email address."
  },
  numeric: {
    // 数字形式か確認
    validate: (e) => /^[0-9]+$/.test(e),
    message: () => "Please enter a valid number."
  },
  alphanumeric: {
    // 英数字形式か確認
    validate: (e) => /^[a-zA-Z0-9]+$/.test(e),
    message: () => "Please enter only letters and numbers."
  },
  minLength: {
    validate: (e, t) => {
      const r = t.getAttribute("minlength");
      return !r || e.length >= parseInt(r);
    },
    message: (e) => `Minimum length is ${e.getAttribute("minlength")}`
  },
  maxLength: {
    validate: (e, t) => {
      const r = t.getAttribute("maxlength");
      return r ? e.length <= Number(r) : !0;
    },
    message: (e) => `Please enter no more than ${e.getAttribute("maxlength")} characters`
  },
  min: {
    validate: (e, t) => {
      const r = t.getAttribute("min");
      if (!r) return !0;
      const a = Number(e);
      return !isNaN(a) && a >= Number(r);
    },
    message: (e) => `Please enter a value greater than or equal to ${e.getAttribute("min")}`
  },
  max: {
    validate: (e, t) => {
      const r = t.getAttribute("max");
      if (!r) return !0;
      const a = Number(e);
      return !isNaN(a) && a <= Number(r);
    },
    message: (e) => `Please enter a value less than or equal to ${e.getAttribute("max")}`
  },
  pattern: {
    // 正規表現パターンに一致するか確認
    validate: (e, t) => {
      const r = t.getAttribute("data-pattern");
      return r ? new RegExp(r).test(e) : !0;
    },
    message: (e) => `Please match the requested format: ${e.getAttribute("data-pattern")}.`
  },
  url: {
    // URL形式か確認
    validate: (e) => /^(https?:\/\/)?([\w\-]+)+([\w\-.]+)+(:\d+)?(\/[\w\-]*)*(\?[\w\-=&]*)?(#[\w\-]*)?$/.test(e),
    message: () => "Please enter a valid URL."
  },
  date: {
    // 有効な日付か確認
    validate: (e) => !isNaN(Date.parse(e)),
    message: () => "Please enter a valid date."
  },
  time: {
    // 時間形式か確認
    validate: (e) => /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(e),
    message: () => "Please enter a valid time in HH:MM format."
  },
  phone: {
    // 電話番号形式か確認
    validate: (e) => /^\+?[0-9\- ]{7,15}$/.test(e),
    message: () => "Please enter a valid phone number."
  },
  postalCode: {
    // 郵便番号形式か確認（日本の形式）
    validate: (e) => /^[0-9]{3}-?[0-9]{4}$/.test(e),
    message: () => "Please enter a valid postal code."
  },
  equals: {
    // 他のフィールドの値と一致するか確認
    validate: (e, t) => {
      const r = t.getAttribute("data-equals"), a = r ? document.getElementById(r) : null;
      return a ? e === a.value : !0;
    },
    message: () => "Values do not match."
  },
  checkboxRequired: {
    // チェックボックスが選択されているか確認
    validate: (e, t) => t.checked,
    message: () => "This checkbox is required."
  },
  fileRequired: {
    // ファイルがアップロードされているか確認
    validate: (e, t) => {
      const r = t.files;
      return r !== null && r.length > 0;
    },
    message: () => "Please upload a file."
  },
  accepted: {
    // フィールドが承認済みか確認（"yes", "on", "1", "true" を確認）
    validate: (e) => ["yes", "on", "1", "true"].includes(e.toLowerCase()),
    message: () => "This field must be accepted."
  },
  json: {
    // JSON形式か確認
    validate: (e) => {
      try {
        return JSON.parse(e), !0;
      } catch {
        return !1;
      }
    },
    message: () => "Please enter a valid JSON string."
  },
  "checkbox-group": {
    validate: (e, t) => {
      const r = t.closest('fieldset[data-validation="checkbox-group"]');
      if (!r) return !0;
      const a = r.querySelectorAll('input[type="checkbox"]'), n = parseInt(r.getAttribute("data-group-min") || "0", 10), s = r.getAttribute("data-group-max") ? parseInt(r.getAttribute("data-group-max") || "0", 10) : a.length, i = Array.from(a).filter((d) => d.checked).length;
      return !r.getAttribute("data-group-min") && i > s || !r.getAttribute("data-group-max") && i < n ? !1 : i >= n && i <= s;
    },
    message: (e) => {
      const t = e.closest('fieldset[data-validation="checkbox-group"]'), r = (t == null ? void 0 : t.getAttribute("data-group-min")) || "0", a = (t == null ? void 0 : t.getAttribute("data-group-max")) || "∞";
      return t != null && t.getAttribute("data-group-min") ? t != null && t.getAttribute("data-group-max") ? `Please select between ${r} and ${a} options.` : `Please select at least ${r} options.` : `Please select at most ${a} options.`;
    }
  },
  "confirm-email": {
    // メールアドレスが一致するか確認
    validate: (e, t) => {
      var a;
      const r = (a = t.form) == null ? void 0 : a.querySelector('input[data-validation~="email"]');
      return !r || !r.value ? !0 : e === r.value;
    },
    message: () => "Email addresses do not match."
  },
  password: {
    validate: (e, t, r) => {
      var g;
      const a = ((g = r == null ? void 0 : r.validationPatterns) == null ? void 0 : g.password) || {}, n = a.minLength ?? 8, s = a.maxLength ?? 100, i = a.requireUppercase ?? !0, d = a.requireNumber ?? !0, l = a.requireSymbol ?? !0;
      return !(e.length < n || e.length > s || i && !/[A-Z]/.test(e) || d && !/\d/.test(e) || l && !/[!@#$%^&*]/.test(e));
    },
    message: (e, t) => {
      var g;
      const r = ((g = t == null ? void 0 : t.validationPatterns) == null ? void 0 : g.password) || {}, a = r.minLength ?? 8, n = r.maxLength ?? 100, s = r.requireUppercase ?? !0, i = r.requireNumber ?? !0, d = r.requireSymbol ?? !0, l = [];
      return l.push(`at least ${a} characters${n !== 100 ? `, maximum ${n} characters` : ""}`), s && l.push("uppercase letter"), i && l.push("number"), d && l.push("special character (!@#$%^&*)"), `Password must contain ${l.join(", ")}`;
    }
  }
}, E = { ...W };
function _(e) {
  Object.assign(E, e);
}
function w(e, t, r = !1) {
  var v, u;
  const a = e.closest("fieldset[data-validation]");
  let n = !0, s = {};
  const i = [
    { attr: "required", type: "required" },
    { attr: "min", type: "min" },
    { attr: "max", type: "max" },
    { attr: "minlength", type: "minLength" },
    { attr: "maxlength", type: "maxLength" }
  ];
  if (e.type === "email") {
    const o = E.email;
    o && !o.validate(e.value, e) && (s.email = o.message(e), n = !1);
  }
  i.forEach((o) => {
    var c;
    if (e.hasAttribute(o.attr)) {
      const m = E[o.type];
      if (m && !m.validate(e.value, e)) {
        const y = (c = t == null ? void 0 : t.validationMessages) == null ? void 0 : c[o.type], x = typeof m.message == "function" ? m.message(e) : m.message;
        s[o.type] = y || x, n = !1;
      }
    }
  }), (a ? ((v = a.getAttribute("data-validation")) == null ? void 0 : v.split(" ")) || [] : ((u = e.getAttribute("data-validation")) == null ? void 0 : u.split(" ")) || []).forEach((o) => {
    const c = E[o];
    c && (c.validate(e.value, e, t) || (s[o] = c.message(e, t), n = !1));
  });
  const l = a || e.closest("div");
  if (l) {
    const o = l.querySelectorAll('[data-validation="error"]');
    O(o, s, e, t);
  }
  const g = e.getAttribute("name");
  if (g) {
    const o = document.querySelectorAll(`[data-validation="error"][data-validation-for="${g}"]`), c = document.querySelector("[data-validation-error-global]");
    (r || c != null && c.classList.contains("active")) && O(o, s, e, t);
    const m = Array.from(o).some(
      (y) => y.style.display === "block"
    );
    c == null || c.classList.toggle("active", m);
  }
  return n;
}
function T(e, t, r, a) {
  var i, d, l;
  if (console.log("Debug getErrorMessage:", {
    type: e,
    errorsByType: r,
    hasError: r[e],
    options: a,
    validationMessages: a == null ? void 0 : a.validationMessages,
    optionMessage: (i = a == null ? void 0 : a.validationMessages) == null ? void 0 : i[e]
  }), !r[e])
    return "";
  const n = (d = t.closest("div")) == null ? void 0 : d.querySelector(`[data-validation-type="${e}"]`);
  if (n != null && n.hasAttribute("data-error-fixed"))
    return console.log("Using fixed message:", n.innerHTML), n.innerHTML;
  const s = (l = a == null ? void 0 : a.validationMessages) == null ? void 0 : l[e];
  if (s) {
    if (console.log("Using option message:", s), typeof s == "function") {
      const g = s(t);
      return console.log("Function message result:", g), g;
    }
    return s;
  }
  return console.log("Using default message:", r[e]), r[e];
}
function O(e, t, r, a) {
  const n = e.length === 1, s = Object.keys(t).length > 0;
  e.forEach((i) => {
    var u, o;
    const d = i.getAttribute("data-validation-type"), l = i, g = l.innerHTML.trim(), v = l.hasAttribute("data-error-fixed");
    if (d) {
      const c = T(d, r, t, a);
      if (v) {
        l.style.display = t[d] ? "block" : "none";
        return;
      }
      ((u = a == null ? void 0 : a.validationMessages) == null ? void 0 : u[d]) ? l.innerHTML = c : g || (l.innerHTML = c), l.style.display = t[d] ? "block" : "none";
    } else if (n) {
      const c = Object.keys(t)[0], m = T(c, r, t, a);
      v || ((o = a == null ? void 0 : a.validationMessages) != null && o[c] || !g) && (l.innerHTML = m), l.style.display = s ? "block" : "none";
    }
  });
}
function $(e, t = {}) {
  const {
    offset: r = 50,
    behavior: a = "smooth",
    duration: n = "0.5s"
  } = t;
  document.documentElement.style.setProperty("scroll-behavior", a), document.documentElement.style.setProperty("transition-duration", n), document.documentElement.style.setProperty("scroll-timeline-name", "scroll"), e.style.scrollMargin = `${r}px`, e.scrollIntoView({
    behavior: a,
    block: "nearest",
    // 最も近い位置にスクロール
    inline: "nearest"
  }), setTimeout(() => {
    document.documentElement.style.removeProperty("scroll-behavior"), document.documentElement.style.removeProperty("transition-duration"), document.documentElement.style.removeProperty("scroll-timeline-name"), setTimeout(() => {
      e.focus();
    }, 100);
  }, parseFloat(n) * 100);
}
function H(e, t) {
  const r = e.querySelectorAll("input, textarea, select");
  let a = !0, n = null;
  return r.forEach((s) => {
    w(s, t, !0) || (a = !1, n || (n = s));
  }), !a && n && setTimeout(() => {
    n && $(n, t.scrollOptions);
  }, 0), a;
}
function z(e, t) {
  const {
    progressFillSelector: r = "#progress-fill",
    indicatorSelector: a = ".step-indicator",
    progressSelector: n = "#step-progress"
  } = t || {};
  let s = Array.from(e.querySelectorAll(".step"));
  const i = e.querySelector(r), d = e.querySelectorAll(a), l = e.querySelector(n), g = e.querySelector("[data-step-current]"), v = e.querySelector("[data-step-total]");
  let u = 0;
  const o = () => {
    const b = (u + 1) / s.length * 100;
    i && (i.style.width = `${b}%`), l && l.setAttribute("aria-valuenow", String(b)), d.forEach((h, f) => {
      h.classList.toggle("active", f <= u);
    }), g && (g.textContent = String(u + 1)), v && (v.textContent = String(s.length));
  }, c = () => {
    const h = s[u].querySelectorAll(
      'input, textarea, select, [contenteditable="true"], button[role="combobox"], div[role="listbox"], div[role="slider"], div[role="spinbutton"]'
    );
    let f = !0;
    return h.forEach((p) => {
      w(p, t) || (f = !1);
    }), f;
  }, m = (b) => {
    s.forEach((p, q) => {
      p.classList.toggle("active", q === b);
    }), u = b, o();
    const h = s[u];
    h.classList.contains("confirmation-step") && y(s[u - 1], h);
    const f = h.querySelector('[data-action="next"]');
    f && (f.style.display = "inline-block");
  }, y = (b, h) => {
    var q;
    const f = h.querySelectorAll(".confirmation-section"), p = ((q = t == null ? void 0 : t.confirmationOptions) == null ? void 0 : q.delimiter) || ",";
    f.forEach((M) => {
      if (!M.getAttribute("data-step")) return;
      M.querySelectorAll("[data-confirm]").forEach((N) => {
        var V, F;
        const S = N.getAttribute("data-confirm");
        if (!S) return;
        const L = e.querySelector(`[name="${S}"]`);
        if (!L) return;
        let A = "";
        switch (L.type) {
          case "checkbox":
            const D = e.querySelectorAll(`input[name="${S}"]:checked`);
            A = Array.from(D).map((R) => {
              var I, C;
              return ((C = (I = R.labels) == null ? void 0 : I[0]) == null ? void 0 : C.textContent) || R.value;
            }).join(p);
            break;
          case "radio":
            const P = e.querySelector(`input[name="${S}"]:checked`);
            A = P ? ((F = (V = P.labels) == null ? void 0 : V[0]) == null ? void 0 : F.textContent) || P.value : "";
            break;
          default:
            A = L.value;
        }
        N.textContent = A || "未入力";
      });
    });
  }, x = () => {
    if (!c()) {
      const f = s[u].querySelector("input:invalid, textarea:invalid, select:invalid");
      f && $(f, t == null ? void 0 : t.scrollOptions);
      return;
    }
    u < s.length - 1 && m(u + 1);
  }, k = () => {
    u > 0 && m(u - 1);
  }, j = (b) => {
    b > u && !c() || m(b);
  };
  return m(u), e.addEventListener("click", (b) => {
    const h = b.target;
    if (h.hasAttribute("data-action")) {
      const f = h.getAttribute("data-action");
      if (f === "next" || f === "confirm") x();
      else if (f === "previous") k();
      else if (f === "edit") {
        const p = parseInt(h.getAttribute("data-target-step") || "1") - 1;
        m(p);
      }
    }
  }), d.forEach((b, h) => {
    b.addEventListener("click", () => j(h));
  }), {
    showStep: m,
    handleNext: x,
    handlePrevious: k,
    updateProgressBar: o
  };
}
const J = {
  required: {
    message: "This field is required"
  }
}, Z = J.required;
console.log(`Custom rule found: ${Z.message}`);
typeof window < "u" && (window.Webflow = window.Webflow || []);
const G = (e) => {
  if (e.enableWebflow) {
    window.Webflow.push(() => {
      U(e);
    });
    return;
  }
  return U(e);
};
function U(e) {
  const t = document.querySelector(e.formSelector);
  if (!t) {
    console.error("Form not found");
    return;
  }
  return e.customRules && _(e.customRules), t.querySelectorAll("input, textarea, select").forEach((a) => {
    a.addEventListener("input", () => w(a, e, !1)), a.addEventListener("blur", () => w(a, e, !1));
  }), e.enableWebflow && (t.setAttribute("novalidate", "true"), t.querySelectorAll('[data-validation="error"]').forEach((a) => {
    a.style.display = "none";
  })), t.addEventListener("submit", async (a) => {
    if (e.enableWebflow) {
      if (!H(t, e)) {
        a.preventDefault(), a.stopPropagation();
        return;
      }
      return;
    }
    if (a.preventDefault(), !H(t, e)) {
      const i = t.querySelector("input:invalid, textarea:invalid, select:invalid");
      i && $(i, e.scrollOptions);
      return;
    }
    const s = new FormData(t);
    try {
      "onSubmit" in e && await e.onSubmit(s);
    } catch (i) {
      console.error("Error:", i);
    }
  }), z(t, e);
}
typeof window < "u" && (window.Formous = G);
export {
  G as Formous
};
