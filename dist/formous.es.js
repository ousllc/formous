const U = {
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
      const a = r.querySelectorAll('input[type="checkbox"]'), i = parseInt(r.getAttribute("data-group-min") || "0", 10), l = r.getAttribute("data-group-max") ? parseInt(r.getAttribute("data-group-max") || "0", 10) : a.length, c = Array.from(a).filter((f) => f.checked).length;
      return !r.getAttribute("data-group-min") && c > l || !r.getAttribute("data-group-max") && c < i ? !1 : c >= i && c <= l;
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
      const a = ((g = r == null ? void 0 : r.validationPatterns) == null ? void 0 : g.password) || {}, i = a.minLength ?? 8, l = a.maxLength ?? 100, c = a.requireUppercase ?? !0, f = a.requireNumber ?? !0, s = a.requireSymbol ?? !0;
      return !(e.length < i || e.length > l || c && !/[A-Z]/.test(e) || f && !/\d/.test(e) || s && !/[!@#$%^&*]/.test(e));
    },
    message: (e, t) => {
      var g;
      const r = ((g = t == null ? void 0 : t.validationPatterns) == null ? void 0 : g.password) || {}, a = r.minLength ?? 8, i = r.maxLength ?? 100, l = r.requireUppercase ?? !0, c = r.requireNumber ?? !0, f = r.requireSymbol ?? !0, s = [];
      return s.push(`at least ${a} characters${i !== 100 ? `, maximum ${i} characters` : ""}`), l && s.push("uppercase letter"), c && s.push("number"), f && s.push("special character (!@#$%^&*)"), `Password must contain ${s.join(", ")}`;
    }
  }
}, E = { ...U };
function D(e) {
  Object.assign(E, e);
}
function S(e, t, r = !1) {
  var b, p;
  const a = e.closest("fieldset[data-validation]");
  let i = !0, l = {};
  const c = [
    { attr: "required", type: "required" },
    { attr: "min", type: "min" },
    { attr: "max", type: "max" },
    { attr: "minlength", type: "minLength" },
    { attr: "maxlength", type: "maxLength" }
  ];
  if (e.type === "email") {
    const n = E.email;
    n && !n.validate(e.value, e) && (l.email = n.message(e), i = !1);
  }
  c.forEach((n) => {
    var u;
    if (e.hasAttribute(n.attr)) {
      const h = E[n.type];
      if (h && !h.validate(e.value, e)) {
        const x = (u = t == null ? void 0 : t.validationMessages) == null ? void 0 : u[n.type], y = typeof h.message == "function" ? h.message(e) : h.message;
        l[n.type] = x || y, i = !1;
      }
    }
  }), (a ? ((b = a.getAttribute("data-validation")) == null ? void 0 : b.split(" ")) || [] : ((p = e.getAttribute("data-validation")) == null ? void 0 : p.split(" ")) || []).forEach((n) => {
    const u = E[n];
    u && (u.validate(e.value, e, t) || (l[n] = u.message(e, t), i = !1));
  });
  const s = a || e.closest("div");
  if (s) {
    const n = s.querySelectorAll('[data-validation="error"]');
    I(n, l, e, t);
  }
  const g = e.getAttribute("name");
  if (g) {
    const n = document.querySelectorAll(`[data-validation="error"][data-validation-for="${g}"]`), u = document.querySelector("[data-validation-error-global]");
    (r || u != null && u.classList.contains("active")) && I(n, l, e, t);
    const h = Array.from(n).some(
      (x) => x.style.display === "block"
    );
    u == null || u.classList.toggle("active", h);
  }
  return i;
}
function F(e, t, r, a) {
  var c, f, s;
  if (console.log("Debug getErrorMessage:", {
    type: e,
    errorsByType: r,
    hasError: r[e],
    options: a,
    validationMessages: a == null ? void 0 : a.validationMessages,
    optionMessage: (c = a == null ? void 0 : a.validationMessages) == null ? void 0 : c[e]
  }), !r[e])
    return "";
  const i = (f = t.closest("div")) == null ? void 0 : f.querySelector(`[data-validation-type="${e}"]`);
  if (i != null && i.hasAttribute("data-error-fixed"))
    return console.log("Using fixed message:", i.innerHTML), i.innerHTML;
  const l = (s = a == null ? void 0 : a.validationMessages) == null ? void 0 : s[e];
  if (l) {
    if (console.log("Using option message:", l), typeof l == "function") {
      const g = l(t);
      return console.log("Function message result:", g), g;
    }
    return l;
  }
  return console.log("Using default message:", r[e]), r[e];
}
function I(e, t, r, a) {
  const i = e.length === 1, l = Object.keys(t).length > 0;
  e.forEach((c) => {
    var p, n;
    const f = c.getAttribute("data-validation-type"), s = c, g = s.innerHTML.trim(), b = s.hasAttribute("data-error-fixed");
    if (f) {
      const u = F(f, r, t, a);
      if (b) {
        s.style.display = t[f] ? "block" : "none";
        return;
      }
      ((p = a == null ? void 0 : a.validationMessages) == null ? void 0 : p[f]) ? s.innerHTML = u : g || (s.innerHTML = u), s.style.display = t[f] ? "block" : "none";
    } else if (i) {
      const u = Object.keys(t)[0], h = F(u, r, t, a);
      b || ((n = a == null ? void 0 : a.validationMessages) != null && n[u] || !g) && (s.innerHTML = h), s.style.display = l ? "block" : "none";
    }
  });
}
function M(e, t = {}) {
  const {
    offset: r = 50,
    behavior: a = "smooth",
    duration: i = "0.5s"
  } = t;
  document.documentElement.style.setProperty("scroll-behavior", a), document.documentElement.style.setProperty("transition-duration", i), document.documentElement.style.setProperty("scroll-timeline-name", "scroll"), e.style.scrollMargin = `${r}px`, e.scrollIntoView({
    behavior: a,
    block: "nearest",
    // 最も近い位置にスクロール
    inline: "nearest"
  }), setTimeout(() => {
    document.documentElement.style.removeProperty("scroll-behavior"), document.documentElement.style.removeProperty("transition-duration"), document.documentElement.style.removeProperty("scroll-timeline-name"), setTimeout(() => {
      e.focus();
    }, 2e3);
  }, parseFloat(i) * 1e3);
}
function P(e, t) {
  const r = e.querySelectorAll("input, textarea, select");
  let a = !0, i = null;
  return r.forEach((l) => {
    S(l, t, !0) || (a = !1, i || (i = l));
  }), !a && i && setTimeout(() => {
    i && M(i, t.scrollOptions);
  }, 0), a;
}
function j(e, t = !1, r) {
  const {
    stepSelector: a = ".step",
    progressFillSelector: i = "#progress-fill",
    indicatorSelector: l = ".step-indicator",
    progressSelector: c = "#step-progress",
    activeClass: f = "active"
  } = (r == null ? void 0 : r.stepOptions) || {};
  let s = Array.from(e.querySelectorAll(a));
  const g = e.querySelector(i), b = e.querySelectorAll(l), p = e.querySelector(c);
  let n = 0;
  if (t) {
    let o = e.querySelector('.step[data-confirmation="true"]');
    o || (o = document.createElement("div"), o.classList.add("step"), o.setAttribute("data-confirmation", "true"), o.innerHTML = `
              <h3>Confirmation</h3>
              <div id="confirmation-content"></div>
              <button type="button" data-action="previous">Back</button>
              <button type="submit">Submit</button>
            `, e.appendChild(o)), s = Array.from(e.querySelectorAll(a));
  }
  const u = (o) => {
    const d = e.querySelector('.step[data-confirmation="true"]');
    if (!d) return;
    d.querySelectorAll("[data-confirm]").forEach((v) => {
      var N, V;
      const q = v.getAttribute("data-confirm");
      if (!q) return;
      if ((N = e.querySelector(`fieldset input[name="${q}"]`)) == null ? void 0 : N.closest("fieldset")) {
        const A = e.querySelectorAll(`input[name="${q}"]:checked`), C = Array.from(A).map((H) => {
          const $ = H.nextElementSibling;
          return ($ == null ? void 0 : $.textContent) || "";
        }).filter(Boolean), O = ((V = o.confirmationOptions) == null ? void 0 : V.delimiter) || ",";
        v.textContent = C.join(O);
      } else {
        const A = e.querySelector(`[name="${q}"]`);
        A ? v.textContent = A.value || "未入力" : v.textContent = "未入力";
      }
    });
  }, h = () => {
    const o = (n + 1) / s.length * 100;
    g && (g.style.width = `${o}%`), b.forEach((d, m) => {
      d.classList.toggle("active", m <= n);
    }), p && (p.textContent = `Step ${n + 1}/${s.length}`);
  }, x = () => {
    const d = s[n].querySelectorAll(
      'input, textarea, select, [contenteditable="true"], button[role="combobox"], div[role="listbox"], div[role="slider"], div[role="spinbutton"]'
    );
    let m = !0;
    return d.forEach((v) => {
      S(v, r) || (m = !1);
    }), m;
  }, y = (o) => {
    s.forEach((q, k) => q.classList.toggle(f, k === o)), n = o, h();
    const d = s[n], m = d.querySelector('[data-action="next"]'), v = d.querySelector('[data-action="confirm"]');
    t && n === s.length - 2 ? (m && (m.style.display = "none"), v && (v.style.display = "inline-block")) : (m && (m.style.display = "inline-block"), v && (v.style.display = "none")), t && n === s.length - 1 && u(r || {
      formSelector: "#step-form",
      confirmationOptions: {
        delimiter: "、"
      }
    });
  }, L = () => {
    if (!x()) {
      const m = s[n].querySelector("input:invalid, textarea:invalid, select:invalid");
      m && M(m, r == null ? void 0 : r.scrollOptions);
      return;
    }
    n < s.length - 1 && y(n + 1);
  }, w = () => {
    n > 0 && y(n - 1);
  }, T = (o) => {
    o > n && !x() || y(o);
  };
  return y(n), e.addEventListener("click", (o) => {
    const d = o.target;
    if (d.tagName === "BUTTON") {
      const m = d.getAttribute("data-action");
      if (m === "next" || m === "confirm") L();
      else if (m === "previous") w();
      else if (m === "edit") {
        const v = parseInt(d.getAttribute("data-target-step") || "1") - 1;
        y(v);
      }
    }
  }), b.forEach((o, d) => {
    o.addEventListener("click", () => T(d));
  }), e.querySelectorAll('[data-action="next"]').forEach((o) => {
    o.addEventListener("click", (d) => {
      d.preventDefault(), L();
    });
  }), e.querySelectorAll('[data-action="previous"]').forEach((o) => {
    o.addEventListener("click", (d) => {
      d.preventDefault(), w();
    });
  }), {
    showStep: y,
    handleNext: L,
    handlePrevious: w,
    updateProgressBar: h,
    updateConfirmationPage: u
  };
}
const W = {
  required: {
    message: "This field is required"
  }
}, _ = W.required;
console.log(`Custom rule found: ${_.message}`);
typeof window < "u" && (window.Webflow = window.Webflow || []);
const z = (e) => {
  if (e.enableWebflow) {
    window.Webflow.push(() => {
      R(e);
    });
    return;
  }
  return R(e);
};
function R(e) {
  const t = document.querySelector(e.formSelector);
  if (!t) {
    console.error("Form not found");
    return;
  }
  return e.customRules && D(e.customRules), t.querySelectorAll("input, textarea, select").forEach((a) => {
    a.addEventListener("input", () => S(a, e, !1)), a.addEventListener("blur", () => S(a, e, !1));
  }), e.enableWebflow && (t.setAttribute("novalidate", "true"), t.querySelectorAll('[data-validation="error"]').forEach((a) => {
    a.style.display = "none";
  })), t.addEventListener("submit", async (a) => {
    if (e.enableWebflow) {
      if (!P(t, e)) {
        a.preventDefault(), a.stopPropagation();
        return;
      }
      return;
    }
    if (a.preventDefault(), !P(t, e)) {
      const c = t.querySelector("input:invalid, textarea:invalid, select:invalid");
      c && M(c, e.scrollOptions);
      return;
    }
    const l = new FormData(t);
    try {
      "onSubmit" in e && await e.onSubmit(l);
    } catch (c) {
      console.error("Error:", c);
    }
  }), e.enableConfirmationPage ? j(t, !0, e) : {
    validateForm: () => P(t, e),
    validateField: (a) => S(a, e)
  };
}
typeof window < "u" && (window.Formous = z);
export {
  z as Formous
};
