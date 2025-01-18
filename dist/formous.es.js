const j = {
  required: {
    // 入力が空でないか確認
    validate: (e, t) => {
      var r, s;
      const a = t.hasAttribute("required") || ((r = t.getAttribute("data-validation")) == null ? void 0 : r.includes("required")) || t.closest('fieldset[data-validation="required"]') !== null;
      if (a && t.type === "radio") {
        const i = t.getAttribute("name");
        if (i)
          return !!((s = t.closest("form")) == null ? void 0 : s.querySelector(`input[name="${i}"]:checked`));
      }
      return !a || e.trim().length > 0;
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
      const a = t.getAttribute("minlength");
      return !a || e.length >= parseInt(a);
    },
    message: (e) => `Minimum length is ${e.getAttribute("minlength")}`
  },
  maxLength: {
    validate: (e, t) => {
      const a = t.getAttribute("maxlength");
      return a ? e.length <= Number(a) : !0;
    },
    message: (e) => `Please enter no more than ${e.getAttribute("maxlength")} characters`
  },
  min: {
    validate: (e, t) => {
      const a = t.getAttribute("min");
      if (!a) return !0;
      const r = Number(e);
      return !isNaN(r) && r >= Number(a);
    },
    message: (e) => `Please enter a value greater than or equal to ${e.getAttribute("min")}`
  },
  max: {
    validate: (e, t) => {
      const a = t.getAttribute("max");
      if (!a) return !0;
      const r = Number(e);
      return !isNaN(r) && r <= Number(a);
    },
    message: (e) => `Please enter a value less than or equal to ${e.getAttribute("max")}`
  },
  pattern: {
    // 正規表現パターンに一致するか確認
    validate: (e, t) => {
      const a = t.getAttribute("data-pattern");
      return a ? new RegExp(a).test(e) : !0;
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
      const a = t.getAttribute("data-equals"), r = a ? document.getElementById(a) : null;
      return r ? e === r.value : !0;
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
      const a = t.files;
      return a !== null && a.length > 0;
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
      const a = t.closest('fieldset[data-validation="checkbox-group"]');
      if (!a) return !0;
      const r = a.querySelectorAll('input[type="checkbox"]'), s = parseInt(a.getAttribute("data-group-min") || "0", 10), i = a.getAttribute("data-group-max") ? parseInt(a.getAttribute("data-group-max") || "0", 10) : r.length, l = Array.from(r).filter((u) => u.checked).length;
      return !a.getAttribute("data-group-min") && l > i || !a.getAttribute("data-group-max") && l < s ? !1 : l >= s && l <= i;
    },
    message: (e) => {
      const t = e.closest('fieldset[data-validation="checkbox-group"]'), a = (t == null ? void 0 : t.getAttribute("data-group-min")) || "0", r = (t == null ? void 0 : t.getAttribute("data-group-max")) || "∞";
      return t != null && t.getAttribute("data-group-min") ? t != null && t.getAttribute("data-group-max") ? `Please select between ${a} and ${r} options.` : `Please select at least ${a} options.` : `Please select at most ${r} options.`;
    }
  },
  "confirm-email": {
    // メールアドレスが一致するか確認
    validate: (e, t) => {
      var r;
      const a = (r = t.form) == null ? void 0 : r.querySelector('input[data-validation~="email"]');
      return !a || !a.value ? !0 : e === a.value;
    },
    message: () => "Email addresses do not match."
  },
  password: {
    validate: (e, t, a) => {
      var m;
      const r = ((m = a == null ? void 0 : a.validationPatterns) == null ? void 0 : m.password) || {}, s = r.minLength ?? 8, i = r.maxLength ?? 100, l = r.requireUppercase ?? !0, u = r.requireNumber ?? !0, o = r.requireSymbol ?? !0;
      return !(e.length < s || e.length > i || l && !/[A-Z]/.test(e) || u && !/\d/.test(e) || o && !/[!@#$%^&*]/.test(e));
    },
    message: (e, t) => {
      var m;
      const a = ((m = t == null ? void 0 : t.validationPatterns) == null ? void 0 : m.password) || {}, r = a.minLength ?? 8, s = a.maxLength ?? 100, i = a.requireUppercase ?? !0, l = a.requireNumber ?? !0, u = a.requireSymbol ?? !0, o = [];
      return o.push(`at least ${r} characters${s !== 100 ? `, maximum ${s} characters` : ""}`), i && o.push("uppercase letter"), l && o.push("number"), u && o.push("special character (!@#$%^&*)"), `Password must contain ${o.join(", ")}`;
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
}, w = { ...j };
function z(e) {
  Object.assign(w, e);
}
function P(e, t, a = !1) {
  var x, y, p;
  const r = e.closest("fieldset[data-validation]");
  let s = !0, i = {};
  e.type === "checkbox" && e.hasAttribute("required") && !e.checked && (i.required = w.required.message(e), s = !1);
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
    const n = u[e.type], c = w[n];
    c && !c.validate(e.value, e) && (i[n] = c.message(e), s = !1);
  }
  l.forEach((n) => {
    var c;
    if (e.hasAttribute(n.attr)) {
      const b = w[n.type];
      if (b && !b.validate(e.value, e)) {
        const S = (c = t == null ? void 0 : t.validationMessages) == null ? void 0 : c[n.type], A = typeof b.message == "function" ? b.message(e) : b.message;
        i[n.type] = S || A, s = !1;
      }
    }
  }), (r ? ((x = r.getAttribute("data-validation")) == null ? void 0 : x.split(" ")) || [] : ((y = e.getAttribute("data-validation")) == null ? void 0 : y.split(" ")) || []).forEach((n) => {
    const c = w[n];
    c && (c.validate(e.value, e, t) || (i[n] = c.message(e, t), s = !1));
  });
  const m = r || e.closest("div");
  if (m) {
    let n;
    if (e.type === "radio") {
      const c = e.closest("div");
      n = ((p = c == null ? void 0 : c.parentElement) == null ? void 0 : p.querySelectorAll('[data-validation="error"]')) || m.querySelectorAll('[data-validation="error"]');
    } else
      n = m.querySelectorAll('[data-validation="error"]');
    T(n, i, e, t);
  }
  const h = e.getAttribute("name");
  if (h) {
    const n = document.querySelectorAll(`[data-validation="error"][data-validation-for="${h}"]`), c = document.querySelector("[data-validation-error-global]");
    (a || c != null && c.classList.contains("active")) && T(n, i, e, t);
    const b = Array.from(n).some(
      (S) => S.style.display === "block"
    );
    c == null || c.classList.toggle("active", b);
  }
  return s;
}
function C(e, t, a, r) {
  var l, u, o;
  if (console.log("Debug getErrorMessage:", {
    type: e,
    errorsByType: a,
    hasError: a[e],
    options: r,
    validationMessages: r == null ? void 0 : r.validationMessages,
    optionMessage: (l = r == null ? void 0 : r.validationMessages) == null ? void 0 : l[e]
  }), !a[e])
    return "";
  const s = (u = t.closest("div")) == null ? void 0 : u.querySelector(`[data-validation-type="${e}"]`);
  if (s != null && s.hasAttribute("data-error-fixed"))
    return console.log("Using fixed message:", s.innerHTML), s.innerHTML;
  const i = (o = r == null ? void 0 : r.validationMessages) == null ? void 0 : o[e];
  if (i) {
    if (console.log("Using option message:", i), typeof i == "function") {
      const m = i(t);
      return console.log("Function message result:", m), m;
    }
    return i;
  }
  return console.log("Using default message:", a[e]), a[e];
}
function T(e, t, a, r) {
  const s = Object.keys(t).length > 0;
  e.forEach((i) => {
    var y, p;
    const l = i.getAttribute("data-validation-type"), u = i, o = u.innerHTML.trim(), m = u.hasAttribute("data-error-fixed");
    if (!l) {
      if (s) {
        const n = Object.keys(t)[0], c = C(n, a, t, r);
        m || ((y = r == null ? void 0 : r.validationMessages) != null && y[n] || !o) && (u.innerHTML = c), u.style.display = "block";
      } else
        u.style.display = "none";
      return;
    }
    const h = C(l, a, t, r);
    if (m) {
      u.style.display = t[l] ? "block" : "none";
      return;
    }
    ((p = r == null ? void 0 : r.validationMessages) == null ? void 0 : p[l]) ? u.innerHTML = h : o || (u.innerHTML = h), u.style.display = t[l] ? "block" : "none";
  });
}
function k(e, t = {}) {
  const {
    offset: a = 50,
    behavior: r = "smooth",
    duration: s = "0.5s"
  } = t;
  document.documentElement.style.setProperty("scroll-behavior", r), document.documentElement.style.setProperty("transition-duration", s), e.style.scrollMargin = `${a}px`;
  const i = window.scrollY, l = e.getBoundingClientRect();
  if (l.top >= 0 && l.bottom <= window.innerHeight) {
    e.focus();
    return;
  }
  e.scrollIntoView({
    behavior: r,
    block: "nearest",
    inline: "nearest"
  });
  let o = window.scrollY;
  const m = () => {
    const h = window.scrollY;
    if (h === o && h !== i) {
      document.documentElement.style.removeProperty("scroll-behavior"), document.documentElement.style.removeProperty("transition-duration"), e.focus();
      return;
    }
    o = h, requestAnimationFrame(m);
  };
  requestAnimationFrame(m);
}
function H(e, t) {
  console.log("validateForm開始");
  const a = e.querySelectorAll('input:not([type="submit"]), textarea, select');
  console.log("検証対象フィールド:", Array.from(a).map((s) => ({
    type: s.getAttribute("type"),
    name: s.getAttribute("name"),
    validation: s.getAttribute("data-validation"),
    required: s.hasAttribute("required"),
    value: s.value
  })));
  let r = !0;
  return a.forEach((s) => {
    const i = P(s, t, !0);
    console.log("フィールドバリデーション結果:", {
      field: s.getAttribute("name"),
      valid: i
    }), i || (r = !1);
  }), console.log("最終バリデーション結果:", r), r;
}
function W(e, t) {
  const {
    stepOptions: {
      useDisplayNone: a = !1,
      stepActiveClass: r = "active",
      indicatorActiveClass: s = "active",
      indicatorSelector: i = ".step-indicator",
      progressSelector: l = "#step-progress",
      progressFillSelector: u = "#progress-fill"
    } = {}
  } = t || {};
  let o = Array.from(e.querySelectorAll(".step"));
  o.forEach((d, g) => {
    g !== 0 && (a && (d.style.display = "none"), d.classList.remove("active"));
  });
  const m = document.querySelector(u), h = document.querySelectorAll(i), x = document.querySelector(l), y = document.querySelector("[data-step-current]"), p = document.querySelector("[data-step-total]");
  let n = 0;
  const c = () => {
    const d = (n + 1) / o.length * 100;
    m && (m.style.width = `${d}%`), x && x.setAttribute("aria-valuenow", String(d)), h.forEach((g, f) => {
      g.classList.toggle(s, f === n);
    }), y && (y.textContent = String(n + 1)), p && (p.textContent = String(o.length));
  }, b = () => {
    const g = o[n].querySelectorAll(
      'input, textarea, select, [contenteditable="true"], button[role="combobox"], div[role="listbox"], div[role="slider"], div[role="spinbutton"]'
    );
    let f = !0;
    return g.forEach((v) => {
      P(v, t) || (f = !1);
    }), f;
  }, S = () => {
    var f;
    const d = ((f = t == null ? void 0 : t.confirmationOptions) == null ? void 0 : f.delimiter) || ",";
    e.querySelectorAll("[data-confirm]").forEach((v) => {
      var N, F;
      const q = v.getAttribute("data-confirm");
      if (!q) return;
      const L = e.querySelector(`[name="${q}"]`);
      if (!L) return;
      let E = "";
      switch (L.type) {
        case "checkbox":
          const U = e.querySelectorAll(`input[name="${q}"]:checked`);
          E = Array.from(U).map((R) => {
            var I, O;
            return ((O = (I = R.labels) == null ? void 0 : I[0]) == null ? void 0 : O.textContent) || R.value;
          }).join(d);
          break;
        case "radio":
          const $ = e.querySelector(`input[name="${q}"]:checked`);
          E = $ ? ((F = (N = $.labels) == null ? void 0 : N[0]) == null ? void 0 : F.textContent) || $.value : "";
          break;
        default:
          E = L.value;
      }
      v.textContent = E || "未入力";
    });
  }, A = (d) => {
    o.forEach((v, q) => {
      v.classList.toggle(r, q === d), a && (v.style.display = q === d ? "block" : "none");
    }), n = d, c();
    const g = o[n];
    S();
    const f = g.querySelector('[data-action="next"]');
    f && (f.style.display = "inline-block");
  }, M = () => {
    if (!b()) {
      const f = o[n].querySelector("input:invalid, textarea:invalid, select:invalid");
      f && k(f, t == null ? void 0 : t.scrollOptions);
      return;
    }
    n < o.length - 1 && (A(n + 1), setTimeout(() => {
      const g = document.querySelector('[data-scroll="top"]');
      g && k(g, t == null ? void 0 : t.scrollOptions);
    }, 100));
  }, V = () => {
    n > 0 && (A(n - 1), setTimeout(() => {
      const d = document.querySelector('[data-scroll="top"]');
      d && k(d, t == null ? void 0 : t.scrollOptions);
    }, 100));
  }, D = (d) => {
    if (d > n && !b()) {
      const v = o[n].querySelector("input:invalid, textarea:invalid, select:invalid");
      v && k(v, t == null ? void 0 : t.scrollOptions);
      return;
    }
    A(d);
  };
  return A(n), e.addEventListener("click", (d) => {
    const g = d.target;
    if (g.hasAttribute("data-action")) {
      const f = g.getAttribute("data-action");
      if (f === "next" || f === "confirm") M();
      else if (f === "previous") V();
      else if (f === "edit") {
        const v = parseInt(g.getAttribute("data-target-step") || "1") - 1;
        A(v);
      }
    }
  }), h.forEach((d, g) => {
    d.addEventListener("click", () => D(g));
  }), {
    showStep: A,
    handleNext: M,
    handlePrevious: V,
    updateProgressBar: c
  };
}
const _ = {
  required: {
    message: "This field is required"
  }
}, Z = _.required;
console.log(`Custom rule found: ${Z.message}`);
typeof window < "u" && (window.Webflow = window.Webflow || []);
const Y = (e) => {
  const t = document.querySelector(e.formSelector);
  if (!t) {
    console.error("Form not found");
    return;
  }
  return t.querySelectorAll('[data-validation="error"]').forEach((s) => {
    s.style.display = "none";
  }), e.customRules && z(e.customRules), t.querySelectorAll("input, textarea, select").forEach((s) => {
    s.addEventListener("input", () => P(s, e, !1)), s.addEventListener("blur", () => P(s, e, !1));
  }), e.enableWebflow ? (window.Webflow = window.Webflow || [], window.Webflow.push(() => {
    t.setAttribute("novalidate", "true"), t.addEventListener("submit", function(s) {
      var l;
      if (!H(t, e)) {
        console.log("バリデーション失敗: フォーム送信を中止"), s.preventDefault(), s.stopPropagation();
        return;
      }
      console.log("バリデーション成功"), (l = e == null ? void 0 : e.webflowOptions) != null && l.customSubmit && (s.preventDefault(), s.stopPropagation(), e.webflowOptions.customSubmit(t));
    });
  })) : t.addEventListener("submit", async (s) => {
    var l;
    if (!H(t, e)) {
      s.preventDefault(), s.stopPropagation();
      return;
    }
    (l = e == null ? void 0 : e.webflowOptions) != null && l.customSubmit && (s.preventDefault(), s.stopPropagation(), e.webflowOptions.customSubmit(t));
  }), W(t, e);
};
typeof window < "u" && (window.Formous = Y);
export {
  Y as Formous
};
