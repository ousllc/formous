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
      const a = r.querySelectorAll('input[type="checkbox"]'), n = parseInt(r.getAttribute("data-group-min") || "0", 10), i = r.getAttribute("data-group-max") ? parseInt(r.getAttribute("data-group-max") || "0", 10) : a.length, l = Array.from(a).filter((u) => u.checked).length;
      return !r.getAttribute("data-group-min") && l > i || !r.getAttribute("data-group-max") && l < n ? !1 : l >= n && l <= i;
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
      const a = ((d = r == null ? void 0 : r.validationPatterns) == null ? void 0 : d.password) || {}, n = a.minLength ?? 8, i = a.maxLength ?? 100, l = a.requireUppercase ?? !0, u = a.requireNumber ?? !0, c = a.requireSymbol ?? !0;
      return !(e.length < n || e.length > i || l && !/[A-Z]/.test(e) || u && !/\d/.test(e) || c && !/[!@#$%^&*]/.test(e));
    },
    message: (e, t) => {
      var d;
      const r = ((d = t == null ? void 0 : t.validationPatterns) == null ? void 0 : d.password) || {}, a = r.minLength ?? 8, n = r.maxLength ?? 100, i = r.requireUppercase ?? !0, l = r.requireNumber ?? !0, u = r.requireSymbol ?? !0, c = [];
      return c.push(`at least ${a} characters${n !== 100 ? `, maximum ${n} characters` : ""}`), i && c.push("uppercase letter"), l && c.push("number"), u && c.push("special character (!@#$%^&*)"), `Password must contain ${c.join(", ")}`;
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
  var q, y, p;
  const a = e.closest("fieldset[data-validation]");
  let n = !0, i = {};
  const l = [
    { attr: "required", type: "required" },
    { attr: "min", type: "min" },
    { attr: "max", type: "max" },
    { attr: "minlength", type: "minLength" },
    { attr: "maxlength", type: "maxLength" }
  ], u = {
    email: "email",
    url: "url",
    date: "date",
    time: "time",
    tel: "phone",
    number: "numeric"
  };
  if (e.type in u) {
    const s = u[e.type], o = k[s];
    o && !o.validate(e.value, e) && (i[s] = o.message(e), n = !1);
  }
  l.forEach((s) => {
    var o;
    if (e.hasAttribute(s.attr)) {
      const v = k[s.type];
      if (v && !v.validate(e.value, e)) {
        const S = (o = t == null ? void 0 : t.validationMessages) == null ? void 0 : o[s.type], x = typeof v.message == "function" ? v.message(e) : v.message;
        i[s.type] = S || x, n = !1;
      }
    }
  }), (a ? ((q = a.getAttribute("data-validation")) == null ? void 0 : q.split(" ")) || [] : ((y = e.getAttribute("data-validation")) == null ? void 0 : y.split(" ")) || []).forEach((s) => {
    const o = k[s];
    o && (o.validate(e.value, e, t) || (i[s] = o.message(e, t), n = !1));
  });
  const d = a || e.closest("div");
  if (d) {
    let s;
    if (e.type === "radio") {
      const o = e.closest("div");
      s = ((p = o == null ? void 0 : o.parentElement) == null ? void 0 : p.querySelectorAll('[data-validation="error"]')) || d.querySelectorAll('[data-validation="error"]');
    } else
      s = d.querySelectorAll('[data-validation="error"]');
    H(s, i, e, t);
  }
  const h = e.getAttribute("name");
  if (h) {
    const s = document.querySelectorAll(`[data-validation="error"][data-validation-for="${h}"]`), o = document.querySelector("[data-validation-error-global]");
    (r || o != null && o.classList.contains("active")) && H(s, i, e, t);
    const v = Array.from(s).some(
      (S) => S.style.display === "block"
    );
    o == null || o.classList.toggle("active", v);
  }
  return n;
}
function O(e, t, r, a) {
  var l, u, c;
  if (console.log("Debug getErrorMessage:", {
    type: e,
    errorsByType: r,
    hasError: r[e],
    options: a,
    validationMessages: a == null ? void 0 : a.validationMessages,
    optionMessage: (l = a == null ? void 0 : a.validationMessages) == null ? void 0 : l[e]
  }), !r[e])
    return "";
  const n = (u = t.closest("div")) == null ? void 0 : u.querySelector(`[data-validation-type="${e}"]`);
  if (n != null && n.hasAttribute("data-error-fixed"))
    return console.log("Using fixed message:", n.innerHTML), n.innerHTML;
  const i = (c = a == null ? void 0 : a.validationMessages) == null ? void 0 : c[e];
  if (i) {
    if (console.log("Using option message:", i), typeof i == "function") {
      const d = i(t);
      return console.log("Function message result:", d), d;
    }
    return i;
  }
  return console.log("Using default message:", r[e]), r[e];
}
function H(e, t, r, a) {
  const n = Object.keys(t).length > 0;
  e.forEach((i) => {
    var y, p;
    const l = i.getAttribute("data-validation-type"), u = i, c = u.innerHTML.trim(), d = u.hasAttribute("data-error-fixed");
    if (!l) {
      if (n) {
        const s = Object.keys(t)[0], o = O(s, r, t, a);
        d || ((y = a == null ? void 0 : a.validationMessages) != null && y[s] || !c) && (u.innerHTML = o), u.style.display = "block";
      } else
        u.style.display = "none";
      return;
    }
    const h = O(l, r, t, a);
    if (d) {
      u.style.display = t[l] ? "block" : "none";
      return;
    }
    ((p = a == null ? void 0 : a.validationMessages) == null ? void 0 : p[l]) ? u.innerHTML = h : c || (u.innerHTML = h), u.style.display = t[l] ? "block" : "none";
  });
}
function w(e, t = {}) {
  const {
    offset: r = 50,
    behavior: a = "smooth",
    duration: n = "0.5s"
  } = t;
  document.documentElement.style.setProperty("scroll-behavior", a), document.documentElement.style.setProperty("transition-duration", n), e.style.scrollMargin = `${r}px`;
  const i = window.scrollY, l = e.getBoundingClientRect();
  if (l.top >= 0 && l.bottom <= window.innerHeight) {
    e.focus();
    return;
  }
  e.scrollIntoView({
    behavior: a,
    block: "nearest",
    inline: "nearest"
  });
  let c = window.scrollY;
  const d = () => {
    const h = window.scrollY;
    if (h === c && h !== i) {
      document.documentElement.style.removeProperty("scroll-behavior"), document.documentElement.style.removeProperty("transition-duration"), e.focus();
      return;
    }
    c = h, requestAnimationFrame(d);
  };
  requestAnimationFrame(d);
}
function T(e, t) {
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
      progressSelector: l = "#step-progress",
      progressFillSelector: u = "#progress-fill"
    } = {}
  } = t || {};
  let c = Array.from(e.querySelectorAll(".step"));
  c.forEach((m, f) => {
    f !== 0 && (r && (m.style.display = "none"), m.classList.remove("active"));
  });
  const d = document.querySelector(u), h = document.querySelectorAll(i), q = document.querySelector(l), y = document.querySelector("[data-step-current]"), p = document.querySelector("[data-step-total]");
  let s = 0;
  const o = () => {
    const m = (s + 1) / c.length * 100;
    d && (d.style.width = `${m}%`), q && q.setAttribute("aria-valuenow", String(m)), h.forEach((f, g) => {
      f.classList.toggle(n, g === s);
    }), y && (y.textContent = String(s + 1)), p && (p.textContent = String(c.length));
  }, v = () => {
    const f = c[s].querySelectorAll(
      'input, textarea, select, [contenteditable="true"], button[role="combobox"], div[role="listbox"], div[role="slider"], div[role="spinbutton"]'
    );
    let g = !0;
    return f.forEach((b) => {
      L(b, t) || (g = !1);
    }), g;
  }, S = () => {
    var g;
    const m = ((g = t == null ? void 0 : t.confirmationOptions) == null ? void 0 : g.delimiter) || ",";
    e.querySelectorAll("[data-confirm]").forEach((b) => {
      var F, N;
      const A = b.getAttribute("data-confirm");
      if (!A) return;
      const $ = e.querySelector(`[name="${A}"]`);
      if (!$) return;
      let E = "";
      switch ($.type) {
        case "checkbox":
          const z = e.querySelectorAll(`input[name="${A}"]:checked`);
          E = Array.from(z).map((R) => {
            var C, I;
            return ((I = (C = R.labels) == null ? void 0 : C[0]) == null ? void 0 : I.textContent) || R.value;
          }).join(m);
          break;
        case "radio":
          const P = e.querySelector(`input[name="${A}"]:checked`);
          E = P ? ((N = (F = P.labels) == null ? void 0 : F[0]) == null ? void 0 : N.textContent) || P.value : "";
          break;
        default:
          E = $.value;
      }
      b.textContent = E || "未入力";
    });
  }, x = (m) => {
    c.forEach((b, A) => {
      b.classList.toggle(a, A === m), r && (b.style.display = A === m ? "block" : "none");
    }), s = m, o();
    const f = c[s];
    S();
    const g = f.querySelector('[data-action="next"]');
    g && (g.style.display = "inline-block");
  }, V = () => {
    if (!v()) {
      const g = c[s].querySelector("input:invalid, textarea:invalid, select:invalid");
      g && w(g, t == null ? void 0 : t.scrollOptions);
      return;
    }
    if (s < c.length - 1) {
      const f = e.closest("form") || e;
      w(f, t == null ? void 0 : t.scrollOptions), x(s + 1);
    }
  }, M = () => {
    s > 0 && x(s - 1);
  }, U = (m) => {
    if (m > s && !v()) {
      const b = c[s].querySelector("input:invalid, textarea:invalid, select:invalid");
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
    updateProgressBar: o
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
      D(e);
    });
    return;
  }
  return D(e);
};
function D(e) {
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
    if (e.enableWebflow) {
      if (!T(t, e)) {
        a.preventDefault(), a.stopPropagation();
        return;
      }
      return;
    }
    if (a.preventDefault(), !T(t, e)) {
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
