const T = {
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
      const a = r.querySelectorAll('input[type="checkbox"]'), n = parseInt(r.getAttribute("data-group-min") || "0", 10), i = r.getAttribute("data-group-max") ? parseInt(r.getAttribute("data-group-max") || "0", 10) : a.length, s = Array.from(a).filter((d) => d.checked).length;
      return !r.getAttribute("data-group-min") && s > i || !r.getAttribute("data-group-max") && s < n ? !1 : s >= n && s <= i;
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
      const a = ((g = r == null ? void 0 : r.validationPatterns) == null ? void 0 : g.password) || {}, n = a.minLength ?? 8, i = a.maxLength ?? 100, s = a.requireUppercase ?? !0, d = a.requireNumber ?? !0, l = a.requireSymbol ?? !0;
      return !(e.length < n || e.length > i || s && !/[A-Z]/.test(e) || d && !/\d/.test(e) || l && !/[!@#$%^&*]/.test(e));
    },
    message: (e, t) => {
      var g;
      const r = ((g = t == null ? void 0 : t.validationPatterns) == null ? void 0 : g.password) || {}, a = r.minLength ?? 8, n = r.maxLength ?? 100, i = r.requireUppercase ?? !0, s = r.requireNumber ?? !0, d = r.requireSymbol ?? !0, l = [];
      return l.push(`at least ${a} characters${n !== 100 ? `, maximum ${n} characters` : ""}`), i && l.push("uppercase letter"), s && l.push("number"), d && l.push("special character (!@#$%^&*)"), `Password must contain ${l.join(", ")}`;
    }
  }
}, P = { ...T };
function H(e) {
  Object.assign(P, e);
}
function S(e, t, r = !1) {
  var o, p;
  const a = e.closest("fieldset[data-validation]");
  let n = !0, i = {};
  const s = [
    { attr: "required", type: "required" },
    { attr: "min", type: "min" },
    { attr: "max", type: "max" },
    { attr: "minlength", type: "minLength" },
    { attr: "maxlength", type: "maxLength" }
  ];
  if (e.type === "email") {
    const c = P.email;
    c && !c.validate(e.value, e) && (i.email = c.message(e), n = !1);
  }
  s.forEach((c) => {
    var u;
    if (e.hasAttribute(c.attr)) {
      const m = P[c.type];
      if (m && !m.validate(e.value, e)) {
        const x = (u = t == null ? void 0 : t.validationMessages) == null ? void 0 : u[c.type], A = typeof m.message == "function" ? m.message(e) : m.message;
        i[c.type] = x || A, n = !1;
      }
    }
  }), (a ? ((o = a.getAttribute("data-validation")) == null ? void 0 : o.split(" ")) || [] : ((p = e.getAttribute("data-validation")) == null ? void 0 : p.split(" ")) || []).forEach((c) => {
    const u = P[c];
    u && (u.validate(e.value, e, t) || (i[c] = u.message(e, t), n = !1));
  });
  const l = a || e.closest("div");
  if (l) {
    const c = l.querySelectorAll('[data-validation="error"]');
    F(c, i, e, t);
  }
  const g = e.getAttribute("name");
  if (g) {
    const c = document.querySelectorAll(`[data-validation="error"][data-validation-for="${g}"]`), u = document.querySelector("[data-validation-error-global]");
    (r || u != null && u.classList.contains("active")) && F(c, i, e, t);
    const m = Array.from(c).some(
      (x) => x.style.display === "block"
    );
    u == null || u.classList.toggle("active", m);
  }
  return n;
}
function V(e, t, r, a) {
  var s, d, l;
  if (console.log("Debug getErrorMessage:", {
    type: e,
    errorsByType: r,
    hasError: r[e],
    options: a,
    validationMessages: a == null ? void 0 : a.validationMessages,
    optionMessage: (s = a == null ? void 0 : a.validationMessages) == null ? void 0 : s[e]
  }), !r[e])
    return "";
  const n = (d = t.closest("div")) == null ? void 0 : d.querySelector(`[data-validation-type="${e}"]`);
  if (n != null && n.hasAttribute("data-error-fixed"))
    return console.log("Using fixed message:", n.innerHTML), n.innerHTML;
  const i = (l = a == null ? void 0 : a.validationMessages) == null ? void 0 : l[e];
  if (i) {
    if (console.log("Using option message:", i), typeof i == "function") {
      const g = i(t);
      return console.log("Function message result:", g), g;
    }
    return i;
  }
  return console.log("Using default message:", r[e]), r[e];
}
function F(e, t, r, a) {
  const n = e.length === 1, i = Object.keys(t).length > 0;
  e.forEach((s) => {
    var p, c;
    const d = s.getAttribute("data-validation-type"), l = s, g = l.innerHTML.trim(), o = l.hasAttribute("data-error-fixed");
    if (d) {
      const u = V(d, r, t, a);
      if (o) {
        l.style.display = t[d] ? "block" : "none";
        return;
      }
      ((p = a == null ? void 0 : a.validationMessages) == null ? void 0 : p[d]) ? l.innerHTML = u : g || (l.innerHTML = u), l.style.display = t[d] ? "block" : "none";
    } else if (n) {
      const u = Object.keys(t)[0], m = V(u, r, t, a);
      o || ((c = a == null ? void 0 : a.validationMessages) != null && c[u] || !g) && (l.innerHTML = m), l.style.display = i ? "block" : "none";
    }
  });
}
function k(e, t = {}) {
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
    }, 2e3);
  }, parseFloat(n) * 1e3);
}
function M(e, t) {
  const r = e.querySelectorAll("input, textarea, select");
  let a = !0, n = null;
  return r.forEach((i) => {
    S(i, t, !0) || (a = !1, n || (n = i));
  }), !a && n && setTimeout(() => {
    n && k(n, t.scrollOptions);
  }, 0), a;
}
function U(e, t = !1, r) {
  const {
    progressFillSelector: a = "#progress-fill",
    indicatorSelector: n = ".step-indicator",
    progressSelector: i = "#step-progress"
  } = (r == null ? void 0 : r.stepOptions) || {};
  let s = Array.from(e.querySelectorAll(".step"));
  const d = e.querySelector(a), l = e.querySelectorAll(n), g = e.querySelector(i);
  let o = 0;
  const p = (v) => {
    const f = e.querySelector('.step[data-confirmation="true"]');
    if (!f) return;
    f.querySelectorAll("[data-confirm]").forEach((b) => {
      var E, w;
      const y = b.getAttribute("data-confirm");
      if (!y) return;
      if ((E = e.querySelector(`fieldset input[name="${y}"]`)) == null ? void 0 : E.closest("fieldset")) {
        const L = e.querySelectorAll(`input[name="${y}"]:checked`), R = Array.from(L).map((O) => {
          const $ = O.nextElementSibling;
          return ($ == null ? void 0 : $.textContent) || "";
        }).filter(Boolean), C = ((w = v.confirmationOptions) == null ? void 0 : w.delimiter) || ",";
        b.textContent = R.join(C);
      } else {
        const L = e.querySelector(`[name="${y}"]`);
        L ? b.textContent = L.value || "未入力" : b.textContent = "未入力";
      }
    });
  }, c = () => {
    const v = (o + 1) / s.length * 100;
    d && (d.style.width = `${v}%`), l.forEach((f, h) => {
      f.classList.toggle("active", h <= o);
    }), g && (g.textContent = `Step ${o + 1}/${s.length}`);
  }, u = () => {
    const f = s[o].querySelectorAll(
      'input, textarea, select, [contenteditable="true"], button[role="combobox"], div[role="listbox"], div[role="slider"], div[role="spinbutton"]'
    );
    let h = !0;
    return f.forEach((b) => {
      S(b, r) || (h = !1);
    }), h;
  }, m = (v) => {
    s.forEach((E, w) => E.classList.toggle("active", w === v)), o = v, c();
    const f = e.querySelector("[data-step-current]"), h = e.querySelector("[data-step-total]");
    f && (f.textContent = String(o + 1)), h && (h.textContent = String(s.length));
    const b = s[o], y = b.querySelector('[data-action="next"]'), q = b.querySelector('[data-action="confirm"]');
    t && o === s.length - 2 ? (y && (y.style.display = "none"), q && (q.style.display = "inline-block")) : (y && (y.style.display = "inline-block"), q && (q.style.display = "none")), t && o === s.length - 1 && p(r || {
      formSelector: "#step-form",
      confirmationOptions: {
        delimiter: "、"
      }
    });
  }, x = () => {
    if (!u()) {
      const h = s[o].querySelector("input:invalid, textarea:invalid, select:invalid");
      h && k(h, r == null ? void 0 : r.scrollOptions);
      return;
    }
    o < s.length - 1 && m(o + 1);
  }, A = () => {
    o > 0 && m(o - 1);
  }, I = (v) => {
    v > o && !u() || m(v);
  };
  return m(o), e.addEventListener("click", (v) => {
    const f = v.target;
    if (f.hasAttribute("data-action")) {
      const h = f.getAttribute("data-action");
      if (h === "next" || h === "confirm") x();
      else if (h === "previous") A();
      else if (h === "edit") {
        const b = parseInt(f.getAttribute("data-target-step") || "1") - 1;
        m(b);
      }
    }
  }), l.forEach((v, f) => {
    v.addEventListener("click", () => I(f));
  }), {
    showStep: m,
    handleNext: x,
    handlePrevious: A,
    updateProgressBar: c,
    updateConfirmationPage: p
  };
}
const j = {
  required: {
    message: "This field is required"
  }
}, D = j.required;
console.log(`Custom rule found: ${D.message}`);
typeof window < "u" && (window.Webflow = window.Webflow || []);
const W = (e) => {
  if (e.enableWebflow) {
    window.Webflow.push(() => {
      N(e);
    });
    return;
  }
  return N(e);
};
function N(e) {
  const t = document.querySelector(e.formSelector);
  if (!t) {
    console.error("Form not found");
    return;
  }
  return e.customRules && H(e.customRules), t.querySelectorAll("input, textarea, select").forEach((a) => {
    a.addEventListener("input", () => S(a, e, !1)), a.addEventListener("blur", () => S(a, e, !1));
  }), e.enableWebflow && (t.setAttribute("novalidate", "true"), t.querySelectorAll('[data-validation="error"]').forEach((a) => {
    a.style.display = "none";
  })), t.addEventListener("submit", async (a) => {
    if (e.enableWebflow) {
      if (!M(t, e)) {
        a.preventDefault(), a.stopPropagation();
        return;
      }
      return;
    }
    if (a.preventDefault(), !M(t, e)) {
      const s = t.querySelector("input:invalid, textarea:invalid, select:invalid");
      s && k(s, e.scrollOptions);
      return;
    }
    const i = new FormData(t);
    try {
      "onSubmit" in e && await e.onSubmit(i);
    } catch (s) {
      console.error("Error:", s);
    }
  }), e.enableConfirmationPage ? U(t, !0, e) : {
    validateForm: () => M(t, e),
    validateField: (a) => S(a, e)
  };
}
typeof window < "u" && (window.Formous = W);
export {
  W as Formous
};
