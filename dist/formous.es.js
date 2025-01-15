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
      var f;
      const a = ((f = r == null ? void 0 : r.validationPatterns) == null ? void 0 : f.password) || {}, n = a.minLength ?? 8, i = a.maxLength ?? 100, s = a.requireUppercase ?? !0, d = a.requireNumber ?? !0, l = a.requireSymbol ?? !0;
      return !(e.length < n || e.length > i || s && !/[A-Z]/.test(e) || d && !/\d/.test(e) || l && !/[!@#$%^&*]/.test(e));
    },
    message: (e, t) => {
      var f;
      const r = ((f = t == null ? void 0 : t.validationPatterns) == null ? void 0 : f.password) || {}, a = r.minLength ?? 8, n = r.maxLength ?? 100, i = r.requireUppercase ?? !0, s = r.requireNumber ?? !0, d = r.requireSymbol ?? !0, l = [];
      return l.push(`at least ${a} characters${n !== 100 ? `, maximum ${n} characters` : ""}`), i && l.push("uppercase letter"), s && l.push("number"), d && l.push("special character (!@#$%^&*)"), `Password must contain ${l.join(", ")}`;
    }
  }
}, S = { ...T };
function H(e) {
  Object.assign(S, e);
}
function E(e, t, r = !1) {
  var u, y;
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
    const o = S.email;
    o && !o.validate(e.value, e) && (i.email = o.message(e), n = !1);
  }
  s.forEach((o) => {
    var c;
    if (e.hasAttribute(o.attr)) {
      const m = S[o.type];
      if (m && !m.validate(e.value, e)) {
        const p = (c = t == null ? void 0 : t.validationMessages) == null ? void 0 : c[o.type], q = typeof m.message == "function" ? m.message(e) : m.message;
        i[o.type] = p || q, n = !1;
      }
    }
  }), (a ? ((u = a.getAttribute("data-validation")) == null ? void 0 : u.split(" ")) || [] : ((y = e.getAttribute("data-validation")) == null ? void 0 : y.split(" ")) || []).forEach((o) => {
    const c = S[o];
    c && (c.validate(e.value, e, t) || (i[o] = c.message(e, t), n = !1));
  });
  const l = a || e.closest("div");
  if (l) {
    const o = l.querySelectorAll('[data-validation="error"]');
    V(o, i, e, t);
  }
  const f = e.getAttribute("name");
  if (f) {
    const o = document.querySelectorAll(`[data-validation="error"][data-validation-for="${f}"]`), c = document.querySelector("[data-validation-error-global]");
    (r || c != null && c.classList.contains("active")) && V(o, i, e, t);
    const m = Array.from(o).some(
      (p) => p.style.display === "block"
    );
    c == null || c.classList.toggle("active", m);
  }
  return n;
}
function k(e, t, r, a) {
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
      const f = i(t);
      return console.log("Function message result:", f), f;
    }
    return i;
  }
  return console.log("Using default message:", r[e]), r[e];
}
function V(e, t, r, a) {
  const n = e.length === 1, i = Object.keys(t).length > 0;
  e.forEach((s) => {
    var y, o;
    const d = s.getAttribute("data-validation-type"), l = s, f = l.innerHTML.trim(), u = l.hasAttribute("data-error-fixed");
    if (d) {
      const c = k(d, r, t, a);
      if (u) {
        l.style.display = t[d] ? "block" : "none";
        return;
      }
      ((y = a == null ? void 0 : a.validationMessages) == null ? void 0 : y[d]) ? l.innerHTML = c : f || (l.innerHTML = c), l.style.display = t[d] ? "block" : "none";
    } else if (n) {
      const c = Object.keys(t)[0], m = k(c, r, t, a);
      u || ((o = a == null ? void 0 : a.validationMessages) != null && o[c] || !f) && (l.innerHTML = m), l.style.display = i ? "block" : "none";
    }
  });
}
function L(e, t = {}) {
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
function N(e, t) {
  const r = e.querySelectorAll("input, textarea, select");
  let a = !0, n = null;
  return r.forEach((i) => {
    E(i, t, !0) || (a = !1, n || (n = i));
  }), !a && n && setTimeout(() => {
    n && L(n, t.scrollOptions);
  }, 0), a;
}
function U(e, t = !1, r) {
  const {
    progressFillSelector: a = "#progress-fill",
    indicatorSelector: n = ".step-indicator",
    progressSelector: i = "#step-progress"
  } = (r == null ? void 0 : r.stepOptions) || {};
  let s = Array.from(e.querySelectorAll(".step"));
  const d = e.querySelector(a), l = e.querySelectorAll(n), f = e.querySelector(i);
  let u = 0;
  const y = (v) => {
    const h = e.querySelector('.step[data-confirmation="true"]');
    if (!h) return;
    h.querySelectorAll("[data-confirm]").forEach((b) => {
      var $, M;
      const x = b.getAttribute("data-confirm");
      if (!x) return;
      if (($ = e.querySelector(`fieldset input[name="${x}"]`)) == null ? void 0 : $.closest("fieldset")) {
        const A = e.querySelectorAll(`input[name="${x}"]:checked`), R = Array.from(A).map((C) => {
          const w = C.nextElementSibling;
          return (w == null ? void 0 : w.textContent) || "";
        }).filter(Boolean), O = ((M = v.confirmationOptions) == null ? void 0 : M.delimiter) || ",";
        b.textContent = R.join(O);
      } else {
        const A = e.querySelector(`[name="${x}"]`);
        A ? b.textContent = A.value || "未入力" : b.textContent = "未入力";
      }
    });
  }, o = () => {
    const v = (u + 1) / s.length * 100;
    d && (d.style.width = `${v}%`), l.forEach((h, g) => {
      h.classList.toggle("active", g <= u);
    }), f && (f.textContent = `Step ${u + 1}/${s.length}`);
  }, c = () => {
    const h = s[u].querySelectorAll(
      'input, textarea, select, [contenteditable="true"], button[role="combobox"], div[role="listbox"], div[role="slider"], div[role="spinbutton"]'
    );
    let g = !0;
    return h.forEach((b) => {
      E(b, r) || (g = !1);
    }), g;
  }, m = (v) => {
    s.forEach((x, P) => x.classList.toggle("active", P === v)), u = v, o();
    const h = s[u], g = h.querySelector('[data-action="next"]'), b = h.querySelector('[data-action="confirm"]');
    t && u === s.length - 2 ? (g && (g.style.display = "none"), b && (b.style.display = "inline-block")) : (g && (g.style.display = "inline-block"), b && (b.style.display = "none")), t && u === s.length - 1 && y(r || {
      formSelector: "#step-form",
      confirmationOptions: {
        delimiter: "、"
      }
    });
  }, p = () => {
    if (!c()) {
      const g = s[u].querySelector("input:invalid, textarea:invalid, select:invalid");
      g && L(g, r == null ? void 0 : r.scrollOptions);
      return;
    }
    u < s.length - 1 && m(u + 1);
  }, q = () => {
    u > 0 && m(u - 1);
  }, I = (v) => {
    v > u && !c() || m(v);
  };
  return m(u), e.addEventListener("click", (v) => {
    const h = v.target;
    if (h.hasAttribute("data-action")) {
      const g = h.getAttribute("data-action");
      if (g === "next" || g === "confirm") p();
      else if (g === "previous") q();
      else if (g === "edit") {
        const b = parseInt(h.getAttribute("data-target-step") || "1") - 1;
        m(b);
      }
    }
  }), l.forEach((v, h) => {
    v.addEventListener("click", () => I(h));
  }), {
    showStep: m,
    handleNext: p,
    handlePrevious: q,
    updateProgressBar: o,
    updateConfirmationPage: y
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
      F(e);
    });
    return;
  }
  return F(e);
};
function F(e) {
  const t = document.querySelector(e.formSelector);
  if (!t) {
    console.error("Form not found");
    return;
  }
  return e.customRules && H(e.customRules), t.querySelectorAll("input, textarea, select").forEach((a) => {
    a.addEventListener("input", () => E(a, e, !1)), a.addEventListener("blur", () => E(a, e, !1));
  }), e.enableWebflow && (t.setAttribute("novalidate", "true"), t.querySelectorAll('[data-validation="error"]').forEach((a) => {
    a.style.display = "none";
  })), t.addEventListener("submit", async (a) => {
    if (e.enableWebflow) {
      if (!N(t, e)) {
        a.preventDefault(), a.stopPropagation();
        return;
      }
      return;
    }
    if (a.preventDefault(), !N(t, e)) {
      const s = t.querySelector("input:invalid, textarea:invalid, select:invalid");
      s && L(s, e.scrollOptions);
      return;
    }
    const i = new FormData(t);
    try {
      "onSubmit" in e && await e.onSubmit(i);
    } catch (s) {
      console.error("Error:", s);
    }
  }), U(t, e.enableConfirmationPage || !1, e);
}
typeof window < "u" && (window.Formous = W);
export {
  W as Formous
};
