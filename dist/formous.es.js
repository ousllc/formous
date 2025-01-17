const j = {
  required: {
    // 入力が空でないか確認
    validate: (e, t) => {
      var a, n;
      const r = t.hasAttribute("required") || ((a = t.getAttribute("data-validation")) == null ? void 0 : a.includes("required")) || t.closest('fieldset[data-validation="required"]') !== null;
      if (r && t.type === "radio") {
        const i = t.getAttribute("name");
        if (i)
          return !!((n = t.closest("form")) == null ? void 0 : n.querySelector(`input[name="${i}"]:checked`));
      }
      return !r || e.trim().length > 0;
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
    validate: (e) => e ? /^https?:\/\/([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/[a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=]*)?$/.test(e) : !0,
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
      const a = r.querySelectorAll('input[type="checkbox"]'), n = parseInt(r.getAttribute("data-group-min") || "0", 10), i = r.getAttribute("data-group-max") ? parseInt(r.getAttribute("data-group-max") || "0", 10) : a.length, c = Array.from(a).filter((l) => l.checked).length;
      return !r.getAttribute("data-group-min") && c > i || !r.getAttribute("data-group-max") && c < n ? !1 : c >= n && c <= i;
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
      var d;
      const a = ((d = r == null ? void 0 : r.validationPatterns) == null ? void 0 : d.password) || {}, n = a.minLength ?? 8, i = a.maxLength ?? 100, c = a.requireUppercase ?? !0, l = a.requireNumber ?? !0, o = a.requireSymbol ?? !0;
      return !(e.length < n || e.length > i || c && !/[A-Z]/.test(e) || l && !/\d/.test(e) || o && !/[!@#$%^&*]/.test(e));
    },
    message: (e, t) => {
      var d;
      const r = ((d = t == null ? void 0 : t.validationPatterns) == null ? void 0 : d.password) || {}, a = r.minLength ?? 8, n = r.maxLength ?? 100, i = r.requireUppercase ?? !0, c = r.requireNumber ?? !0, l = r.requireSymbol ?? !0, o = [];
      return o.push(`at least ${a} characters${n !== 100 ? `, maximum ${n} characters` : ""}`), i && o.push("uppercase letter"), c && o.push("number"), l && o.push("special character (!@#$%^&*)"), `Password must contain ${o.join(", ")}`;
    }
  },
  halfwidthKatakana: {
    validate: (e) => e ? /^[ｦ-ﾟ]+$/.test(e) : !0,
    message: () => "半角カタカナで入力してください。"
  },
  zenkaku: {
    validate: (e) => e ? /^[^\x01-\x7E\xA1-\xDF]+$/.test(e) : !0,
    message: () => "全角文字で入力してください。"
  }
}, k = { ...j };
function W(e) {
  Object.assign(k, e);
}
function L(e, t, r = !1) {
  var S, y, p;
  const a = e.closest("fieldset[data-validation]");
  let n = !0, i = {};
  const c = [
    { attr: "required", type: "required" },
    { attr: "min", type: "min" },
    { attr: "max", type: "max" },
    { attr: "minlength", type: "minLength" },
    { attr: "maxlength", type: "maxLength" }
  ], l = {
    email: "email",
    url: "url",
    date: "date",
    time: "time",
    tel: "phone",
    number: "numeric"
  };
  if (e.type in l) {
    const s = l[e.type], u = k[s];
    u && !u.validate(e.value, e) && (i[s] = u.message(e), n = !1);
  }
  c.forEach((s) => {
    var u;
    if (e.hasAttribute(s.attr)) {
      const v = k[s.type];
      if (v && !v.validate(e.value, e)) {
        const q = (u = t == null ? void 0 : t.validationMessages) == null ? void 0 : u[s.type], x = typeof v.message == "function" ? v.message(e) : v.message;
        i[s.type] = q || x, n = !1;
      }
    }
  }), (a ? ((S = a.getAttribute("data-validation")) == null ? void 0 : S.split(" ")) || [] : ((y = e.getAttribute("data-validation")) == null ? void 0 : y.split(" ")) || []).forEach((s) => {
    const u = k[s];
    u && (u.validate(e.value, e, t) || (i[s] = u.message(e, t), n = !1));
  });
  const d = a || e.closest("div");
  if (d) {
    let s;
    if (e.type === "radio") {
      const u = e.closest("div");
      s = ((p = u == null ? void 0 : u.parentElement) == null ? void 0 : p.querySelectorAll('[data-validation="error"]')) || d.querySelectorAll('[data-validation="error"]');
    } else
      s = d.querySelectorAll('[data-validation="error"]');
    D(s, i, e, t);
  }
  const h = e.getAttribute("name");
  if (h) {
    const s = document.querySelectorAll(`[data-validation="error"][data-validation-for="${h}"]`), u = document.querySelector("[data-validation-error-global]");
    (r || u != null && u.classList.contains("active")) && D(s, i, e, t);
    const v = Array.from(s).some(
      (q) => q.style.display === "block"
    );
    u == null || u.classList.toggle("active", v);
  }
  return n;
}
function I(e, t, r, a) {
  var c, l, o;
  if (console.log("Debug getErrorMessage:", {
    type: e,
    errorsByType: r,
    hasError: r[e],
    options: a,
    validationMessages: a == null ? void 0 : a.validationMessages,
    optionMessage: (c = a == null ? void 0 : a.validationMessages) == null ? void 0 : c[e]
  }), !r[e])
    return "";
  const n = (l = t.closest("div")) == null ? void 0 : l.querySelector(`[data-validation-type="${e}"]`);
  if (n != null && n.hasAttribute("data-error-fixed"))
    return console.log("Using fixed message:", n.innerHTML), n.innerHTML;
  const i = (o = a == null ? void 0 : a.validationMessages) == null ? void 0 : o[e];
  if (i) {
    if (console.log("Using option message:", i), typeof i == "function") {
      const d = i(t);
      return console.log("Function message result:", d), d;
    }
    return i;
  }
  return console.log("Using default message:", r[e]), r[e];
}
function D(e, t, r, a) {
  const n = Object.keys(t).length > 0;
  e.forEach((i) => {
    var y, p;
    const c = i.getAttribute("data-validation-type"), l = i, o = l.innerHTML.trim(), d = l.hasAttribute("data-error-fixed");
    if (!c) {
      if (n) {
        const s = Object.keys(t)[0], u = I(s, r, t, a);
        d || ((y = a == null ? void 0 : a.validationMessages) != null && y[s] || !o) && (l.innerHTML = u), l.style.display = "block";
      } else
        l.style.display = "none";
      return;
    }
    const h = I(c, r, t, a);
    if (d) {
      l.style.display = t[c] ? "block" : "none";
      return;
    }
    ((p = a == null ? void 0 : a.validationMessages) == null ? void 0 : p[c]) ? l.innerHTML = h : o || (l.innerHTML = h), l.style.display = t[c] ? "block" : "none";
  });
}
function w(e, t = {}) {
  const {
    offset: r = 50,
    behavior: a = "smooth",
    duration: n = "0.5s"
  } = t;
  document.documentElement.style.setProperty("scroll-behavior", a), document.documentElement.style.setProperty("transition-duration", n), e.style.scrollMargin = `${r}px`;
  const i = window.scrollY, c = e.getBoundingClientRect();
  if (c.top >= 0 && c.bottom <= window.innerHeight) {
    e.focus();
    return;
  }
  e.scrollIntoView({
    behavior: a,
    block: "nearest",
    inline: "nearest"
  });
  let o = window.scrollY;
  const d = () => {
    const h = window.scrollY;
    if (h === o && h !== i) {
      document.documentElement.style.removeProperty("scroll-behavior"), document.documentElement.style.removeProperty("transition-duration"), e.focus();
      return;
    }
    o = h, requestAnimationFrame(d);
  };
  requestAnimationFrame(d);
}
function H(e, t) {
  const r = e.querySelectorAll("input, textarea, select");
  let a = !0, n = null;
  return r.forEach((i) => {
    L(i, t, !0) || (a = !1, n || (n = i));
  }), !a && n && setTimeout(() => {
    n && w(n, t.scrollOptions);
  }, 0), a;
}
function _(e, t) {
  const {
    stepOptions: {
      useDisplayNone: r = !1,
      stepActiveClass: a = "active",
      indicatorActiveClass: n = "active",
      indicatorSelector: i = ".step-indicator",
      progressSelector: c = "#step-progress",
      progressFillSelector: l = "#progress-fill"
    } = {}
  } = t || {};
  let o = Array.from(e.querySelectorAll(".step"));
  o.forEach((m, f) => {
    f !== 0 && (r && (m.style.display = "none"), m.classList.remove("active"));
  });
  const d = document.querySelector(l), h = document.querySelectorAll(i), S = document.querySelector(c), y = document.querySelector("[data-step-current]"), p = document.querySelector("[data-step-total]");
  let s = 0;
  const u = () => {
    const m = (s + 1) / o.length * 100;
    d && (d.style.width = `${m}%`), S && S.setAttribute("aria-valuenow", String(m)), h.forEach((f, g) => {
      f.classList.toggle(n, g === s);
    }), y && (y.textContent = String(s + 1)), p && (p.textContent = String(o.length));
  }, v = () => {
    const f = o[s].querySelectorAll(
      'input, textarea, select, [contenteditable="true"], button[role="combobox"], div[role="listbox"], div[role="slider"], div[role="spinbutton"]'
    );
    let g = !0;
    return f.forEach((b) => {
      L(b, t) || (g = !1);
    }), g;
  }, q = () => {
    var g;
    const m = ((g = t == null ? void 0 : t.confirmationOptions) == null ? void 0 : g.delimiter) || ",";
    e.querySelectorAll("[data-confirm]").forEach((b) => {
      var F, N;
      const A = b.getAttribute("data-confirm");
      if (!A) return;
      const P = e.querySelector(`[name="${A}"]`);
      if (!P) return;
      let E = "";
      switch (P.type) {
        case "checkbox":
          const z = e.querySelectorAll(`input[name="${A}"]:checked`);
          E = Array.from(z).map((R) => {
            var O, C;
            return ((C = (O = R.labels) == null ? void 0 : O[0]) == null ? void 0 : C.textContent) || R.value;
          }).join(m);
          break;
        case "radio":
          const $ = e.querySelector(`input[name="${A}"]:checked`);
          E = $ ? ((N = (F = $.labels) == null ? void 0 : F[0]) == null ? void 0 : N.textContent) || $.value : "";
          break;
        default:
          E = P.value;
      }
      b.textContent = E || "未入力";
    });
  }, x = (m) => {
    o.forEach((b, A) => {
      b.classList.toggle(a, A === m), r && (b.style.display = A === m ? "block" : "none");
    }), s = m, u();
    const f = o[s];
    q();
    const g = f.querySelector('[data-action="next"]');
    g && (g.style.display = "inline-block");
  }, V = () => {
    if (!v()) {
      const g = o[s].querySelector("input:invalid, textarea:invalid, select:invalid");
      g && w(g, t == null ? void 0 : t.scrollOptions);
      return;
    }
    if (s < o.length - 1) {
      const f = e.closest("form") || e;
      w(f, t == null ? void 0 : t.scrollOptions), x(s + 1);
    }
  }, M = () => {
    s > 0 && x(s - 1);
  }, U = (m) => {
    if (m > s && !v()) {
      const b = o[s].querySelector("input:invalid, textarea:invalid, select:invalid");
      b && w(b, t == null ? void 0 : t.scrollOptions);
      return;
    }
    x(m);
  };
  return x(s), e.addEventListener("click", (m) => {
    const f = m.target;
    if (f.hasAttribute("data-action")) {
      const g = f.getAttribute("data-action");
      if (g === "next" || g === "confirm") V();
      else if (g === "previous") M();
      else if (g === "edit") {
        const b = parseInt(f.getAttribute("data-target-step") || "1") - 1;
        x(b);
      }
    }
  }), h.forEach((m, f) => {
    m.addEventListener("click", () => U(f));
  }), {
    showStep: x,
    handleNext: V,
    handlePrevious: M,
    updateProgressBar: u
  };
}
const Z = {
  required: {
    message: "This field is required"
  }
}, Y = Z.required;
console.log(`Custom rule found: ${Y.message}`);
typeof window < "u" && (window.Webflow = window.Webflow || []);
const J = (e) => {
  if (e.enableWebflow) {
    window.Webflow.push(() => {
      T(e);
    });
    return;
  }
  return T(e);
};
function T(e) {
  const t = document.querySelector(e.formSelector);
  if (!t) {
    console.error("Form not found");
    return;
  }
  return e.customRules && W(e.customRules), t.querySelectorAll("input, textarea, select").forEach((a) => {
    a.addEventListener("input", () => L(a, e, !1)), a.addEventListener("blur", () => L(a, e, !1));
  }), e.enableWebflow && (t.setAttribute("novalidate", "true"), t.querySelectorAll('[data-validation="error"]').forEach((a) => {
    a.style.display = "none";
  })), t.addEventListener("submit", async (a) => {
    var c;
    if (e.enableWebflow) {
      if (!H(t, e)) {
        a.preventDefault(), a.stopPropagation();
        return;
      }
      (c = e == null ? void 0 : e.webflowOptions) != null && c.customSubmit && (a.preventDefault(), a.stopPropagation(), e.webflowOptions.customSubmit(t));
      return;
    }
    if (a.preventDefault(), !H(t, e)) {
      const l = t.querySelector("input:invalid, textarea:invalid, select:invalid");
      l && w(l, e.scrollOptions);
      return;
    }
    const i = new FormData(t);
    try {
      "onSubmit" in e && await e.onSubmit(i);
    } catch (l) {
      console.error("Error:", l);
    }
  }), _(t, e);
}
typeof window < "u" && (window.Formous = J);
export {
  J as Formous
};
