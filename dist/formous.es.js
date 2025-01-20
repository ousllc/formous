const z = {
  required: {
    // 入力が空でないか確認
    validate: (e, t) => {
      var r, s;
      const a = t.hasAttribute("required") || ((r = t.getAttribute("data-validation")) == null ? void 0 : r.includes("required")) || t.closest('fieldset[data-validation="required"]') !== null;
      if (a && t.type === "radio") {
        const n = t.getAttribute("name");
        if (n)
          return !!((s = t.closest("form")) == null ? void 0 : s.querySelector(`input[name="${n}"]:checked`));
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
      const r = a.querySelectorAll('input[type="checkbox"]'), s = parseInt(a.getAttribute("data-group-min") || "0", 10), n = a.getAttribute("data-group-max") ? parseInt(a.getAttribute("data-group-max") || "0", 10) : r.length, l = Array.from(r).filter((m) => m.checked).length;
      return !a.getAttribute("data-group-min") && l > n || !a.getAttribute("data-group-max") && l < s ? !1 : l >= s && l <= n;
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
      var g;
      const r = ((g = a == null ? void 0 : a.validationPatterns) == null ? void 0 : g.password) || {}, s = r.minLength ?? 8, n = r.maxLength ?? 100, l = r.requireUppercase ?? !0, m = r.requireNumber ?? !0, o = r.requireSymbol ?? !0;
      return !(e.length < s || e.length > n || l && !/[A-Z]/.test(e) || m && !/\d/.test(e) || o && !/[!@#$%^&*]/.test(e));
    },
    message: (e, t) => {
      var g;
      const a = ((g = t == null ? void 0 : t.validationPatterns) == null ? void 0 : g.password) || {}, r = a.minLength ?? 8, s = a.maxLength ?? 100, n = a.requireUppercase ?? !0, l = a.requireNumber ?? !0, m = a.requireSymbol ?? !0, o = [];
      return o.push(`at least ${r} characters${s !== 100 ? `, maximum ${s} characters` : ""}`), n && o.push("uppercase letter"), l && o.push("number"), m && o.push("special character (!@#$%^&*)"), `Password must contain ${o.join(", ")}`;
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
}, E = { ...z };
function W(e) {
  Object.assign(E, e);
}
function k(e, t, a = !1) {
  var x, y, p;
  const r = e.closest("fieldset[data-validation]");
  let s = !0, n = {};
  e.type === "checkbox" && e.hasAttribute("required") && !e.checked && (n.required = E.required.message(e), s = !1);
  const l = [
    { attr: "required", type: "required" },
    { attr: "min", type: "min" },
    { attr: "max", type: "max" },
    { attr: "minlength", type: "minLength" },
    { attr: "maxlength", type: "maxLength" }
  ], m = {
    email: "email",
    url: "url",
    date: "date",
    time: "time",
    tel: "phone",
    number: "numeric"
  };
  if (e.type in m) {
    const i = m[e.type], c = E[i];
    c && !c.validate(e.value, e) && (n[i] = c.message(e), s = !1);
  }
  l.forEach((i) => {
    var c;
    if (e.hasAttribute(i.attr)) {
      const v = E[i.type];
      if (v && !v.validate(e.value, e)) {
        const w = (c = t == null ? void 0 : t.validationMessages) == null ? void 0 : c[i.type], b = typeof v.message == "function" ? v.message(e) : v.message;
        n[i.type] = w || b, s = !1;
      }
    }
  }), (r ? ((x = r.getAttribute("data-validation")) == null ? void 0 : x.split(" ")) || [] : ((y = e.getAttribute("data-validation")) == null ? void 0 : y.split(" ")) || []).forEach((i) => {
    const c = E[i];
    c && (c.validate(e.value, e, t) || (n[i] = c.message(e, t), s = !1));
  });
  const g = r || e.closest("div");
  if (g) {
    let i;
    if (e.type === "radio") {
      const c = e.closest("div");
      i = ((p = c == null ? void 0 : c.parentElement) == null ? void 0 : p.querySelectorAll('[data-validation="error"]')) || g.querySelectorAll('[data-validation="error"]');
    } else
      i = g.querySelectorAll('[data-validation="error"]');
    T(i, n, e, t);
  }
  const h = e.getAttribute("name");
  if (h) {
    const i = document.querySelectorAll(`[data-validation="error"][data-validation-for="${h}"]`), c = document.querySelector("[data-validation-error-global]");
    (a || c != null && c.classList.contains("active")) && T(i, n, e, t);
    const v = Array.from(i).some(
      (w) => w.style.display === "block"
    );
    c == null || c.classList.toggle("active", v);
  }
  return s;
}
function C(e, t, a, r) {
  var l, m, o;
  if (console.log("Debug getErrorMessage:", {
    type: e,
    errorsByType: a,
    hasError: a[e],
    options: r,
    validationMessages: r == null ? void 0 : r.validationMessages,
    optionMessage: (l = r == null ? void 0 : r.validationMessages) == null ? void 0 : l[e]
  }), !a[e])
    return "";
  const s = (m = t.closest("div")) == null ? void 0 : m.querySelector(`[data-validation-type="${e}"]`);
  if (s != null && s.hasAttribute("data-error-fixed"))
    return console.log("Using fixed message:", s.innerHTML), s.innerHTML;
  const n = (o = r == null ? void 0 : r.validationMessages) == null ? void 0 : o[e];
  if (n) {
    if (console.log("Using option message:", n), typeof n == "function") {
      const g = n(t);
      return console.log("Function message result:", g), g;
    }
    return n;
  }
  return console.log("Using default message:", a[e]), a[e];
}
function T(e, t, a, r) {
  const s = Object.keys(t).length > 0;
  e.forEach((n) => {
    var y, p;
    const l = n.getAttribute("data-validation-type"), m = n, o = m.innerHTML.trim(), g = m.hasAttribute("data-error-fixed");
    if (!l) {
      if (s) {
        const i = Object.keys(t)[0], c = C(i, a, t, r);
        g || ((y = r == null ? void 0 : r.validationMessages) != null && y[i] || !o) && (m.innerHTML = c), m.style.display = "block";
      } else
        m.style.display = "none";
      return;
    }
    const h = C(l, a, t, r);
    if (g) {
      m.style.display = t[l] ? "block" : "none";
      return;
    }
    ((p = r == null ? void 0 : r.validationMessages) == null ? void 0 : p[l]) ? m.innerHTML = h : o || (m.innerHTML = h), m.style.display = t[l] ? "block" : "none";
  });
}
function L(e, t = {}) {
  const {
    offset: a = 50,
    behavior: r = "smooth",
    duration: s = "0.5s"
  } = t;
  document.documentElement.style.setProperty("scroll-behavior", r), document.documentElement.style.setProperty("transition-duration", s), e.style.scrollMargin = `${a}px`;
  const n = window.scrollY, l = e.getBoundingClientRect();
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
  const g = () => {
    const h = window.scrollY;
    if (h === o && h !== n) {
      document.documentElement.style.removeProperty("scroll-behavior"), document.documentElement.style.removeProperty("transition-duration"), e.focus();
      return;
    }
    o = h, requestAnimationFrame(g);
  };
  requestAnimationFrame(g);
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
    const n = k(s, t, !0);
    console.log("フィールドバリデーション結果:", {
      field: s.getAttribute("name"),
      valid: n
    }), n || (r = !1);
  }), console.log("最終バリデーション結果:", r), r;
}
function _(e, t) {
  const {
    stepOptions: {
      useDisplayNone: a = !1,
      stepActiveClass: r = "active",
      indicatorActiveClass: s = "active",
      indicatorSelector: n = ".step-indicator",
      progressSelector: l = "#step-progress",
      progressFillSelector: m = "#progress-fill"
    } = {}
  } = t || {};
  let o = Array.from(e.querySelectorAll(".step"));
  o.forEach((u, d) => {
    d !== 0 && (a && (u.style.display = "none"), u.classList.remove("active"));
  });
  const g = document.querySelector(m), h = document.querySelectorAll(n), x = document.querySelector(l), y = document.querySelector("[data-step-current]"), p = document.querySelector("[data-step-total]");
  let i = 0;
  const c = () => {
    const u = (i + 1) / o.length * 100;
    g && (g.style.width = `${u}%`), x && x.setAttribute("aria-valuenow", String(u)), h.forEach((d, f) => {
      d.classList.toggle(s, f === i);
    }), y && (y.textContent = String(i + 1)), p && (p.textContent = String(o.length));
  }, v = () => {
    const d = o[i].querySelectorAll(
      'input, textarea, select, [contenteditable="true"], button[role="combobox"], div[role="listbox"], div[role="slider"], div[role="spinbutton"]'
    );
    let f = !0;
    return d.forEach((A) => {
      k(A, t) || (f = !1);
    }), f;
  }, w = () => {
    var f;
    const u = ((f = t == null ? void 0 : t.confirmationOptions) == null ? void 0 : f.delimiter) || ",";
    e.querySelectorAll("[data-confirm]").forEach((A) => {
      var N, F;
      const S = A.getAttribute("data-confirm");
      if (!S) return;
      const q = e.querySelector(`[name="${S}"]`);
      if (!q) return;
      let P = "";
      switch (q.type) {
        case "checkbox":
          const j = e.querySelectorAll(`input[name="${S}"]:checked`);
          P = Array.from(j).map((R) => {
            var I, O;
            return ((O = (I = R.labels) == null ? void 0 : I[0]) == null ? void 0 : O.textContent) || R.value;
          }).join(u);
          break;
        case "radio":
          const $ = e.querySelector(`input[name="${S}"]:checked`);
          P = $ ? ((F = (N = $.labels) == null ? void 0 : N[0]) == null ? void 0 : F.textContent) || $.value : "";
          break;
        default:
          P = q.value;
      }
      A.textContent = P || "未入力";
    });
  }, b = (u) => {
    o.forEach((d, f) => {
      d.classList.toggle(r, f === u), a && (d.style.display = f === u ? "block" : "none");
    }), i = u, c(), w();
  }, V = () => {
    if (!v()) {
      const f = o[i].querySelector("input:invalid, textarea:invalid, select:invalid");
      f && L(f, t == null ? void 0 : t.scrollOptions);
      return;
    }
    i < o.length - 1 && (b(i + 1), setTimeout(() => {
      const d = document.querySelector('[data-scroll="top"]');
      d && L(d, t == null ? void 0 : t.scrollOptions);
    }, 100));
  }, M = () => {
    i > 0 && (b(i - 1), setTimeout(() => {
      const u = document.querySelector('[data-scroll="top"]');
      u && L(u, t == null ? void 0 : t.scrollOptions);
    }, 100));
  }, U = (u) => {
    for (let d = i; d < u; d++) {
      const f = o[d], A = f.querySelectorAll(
        'input, textarea, select, [contenteditable="true"]'
      );
      let S = !0;
      if (A.forEach((q) => {
        k(q, t) || (S = !1);
      }), !S) {
        b(d);
        const q = f.querySelector("input:invalid, textarea:invalid, select:invalid");
        return q && L(q, t == null ? void 0 : t.scrollOptions), !1;
      }
    }
    return !0;
  }, D = (u) => {
    u > i && !U(u) || b(u);
  };
  return b(i), e.addEventListener("click", (u) => {
    const d = u.target;
    if (d.hasAttribute("data-action")) {
      const f = d.getAttribute("data-action");
      if (f === "next" || f === "confirm") V();
      else if (f === "previous") M();
      else if (f === "edit") {
        const A = parseInt(d.getAttribute("data-target-step") || "1") - 1;
        b(A);
      }
    }
  }), h.forEach((u, d) => {
    u.addEventListener("click", () => D(d));
  }), {
    showStep: b,
    handleNext: V,
    handlePrevious: M,
    updateProgressBar: c
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
  const t = document.querySelector(e.formSelector);
  if (!t) {
    console.error("Form not found");
    return;
  }
  return t.querySelectorAll('[data-validation="error"]').forEach((s) => {
    s.style.display = "none";
  }), e.customRules && W(e.customRules), t.querySelectorAll("input, textarea, select").forEach((s) => {
    s.addEventListener("input", () => k(s, e, !1)), s.addEventListener("blur", () => k(s, e, !1));
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
  }), _(t, e);
};
typeof window < "u" && (window.Formous = J);
export {
  J as Formous
};
