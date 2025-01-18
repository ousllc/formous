const j = {
  required: {
    // 入力が空でないか確認
    validate: (e, t) => {
      var a, s;
      const r = t.hasAttribute("required") || ((a = t.getAttribute("data-validation")) == null ? void 0 : a.includes("required")) || t.closest('fieldset[data-validation="required"]') !== null;
      if (r && t.type === "radio") {
        const n = t.getAttribute("name");
        if (n)
          return !!((s = t.closest("form")) == null ? void 0 : s.querySelector(`input[name="${n}"]:checked`));
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
      const a = r.querySelectorAll('input[type="checkbox"]'), s = parseInt(r.getAttribute("data-group-min") || "0", 10), n = r.getAttribute("data-group-max") ? parseInt(r.getAttribute("data-group-max") || "0", 10) : a.length, c = Array.from(a).filter((u) => u.checked).length;
      return !r.getAttribute("data-group-min") && c > n || !r.getAttribute("data-group-max") && c < s ? !1 : c >= s && c <= n;
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
      const a = ((d = r == null ? void 0 : r.validationPatterns) == null ? void 0 : d.password) || {}, s = a.minLength ?? 8, n = a.maxLength ?? 100, c = a.requireUppercase ?? !0, u = a.requireNumber ?? !0, l = a.requireSymbol ?? !0;
      return !(e.length < s || e.length > n || c && !/[A-Z]/.test(e) || u && !/\d/.test(e) || l && !/[!@#$%^&*]/.test(e));
    },
    message: (e, t) => {
      var d;
      const r = ((d = t == null ? void 0 : t.validationPatterns) == null ? void 0 : d.password) || {}, a = r.minLength ?? 8, s = r.maxLength ?? 100, n = r.requireUppercase ?? !0, c = r.requireNumber ?? !0, u = r.requireSymbol ?? !0, l = [];
      return l.push(`at least ${a} characters${s !== 100 ? `, maximum ${s} characters` : ""}`), n && l.push("uppercase letter"), c && l.push("number"), u && l.push("special character (!@#$%^&*)"), `Password must contain ${l.join(", ")}`;
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
function E(e, t, r = !1) {
  var x, p, y;
  const a = e.closest("fieldset[data-validation]");
  let s = !0, n = {};
  e.type === "checkbox" && e.hasAttribute("required") && !e.checked && (n.required = w.required.message(e), s = !1);
  const c = [
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
    const i = u[e.type], o = w[i];
    o && !o.validate(e.value, e) && (n[i] = o.message(e), s = !1);
  }
  c.forEach((i) => {
    var o;
    if (e.hasAttribute(i.attr)) {
      const b = w[i.type];
      if (b && !b.validate(e.value, e)) {
        const S = (o = t == null ? void 0 : t.validationMessages) == null ? void 0 : o[i.type], A = typeof b.message == "function" ? b.message(e) : b.message;
        n[i.type] = S || A, s = !1;
      }
    }
  }), (a ? ((x = a.getAttribute("data-validation")) == null ? void 0 : x.split(" ")) || [] : ((p = e.getAttribute("data-validation")) == null ? void 0 : p.split(" ")) || []).forEach((i) => {
    const o = w[i];
    o && (o.validate(e.value, e, t) || (n[i] = o.message(e, t), s = !1));
  });
  const d = a || e.closest("div");
  if (d) {
    let i;
    if (e.type === "radio") {
      const o = e.closest("div");
      i = ((y = o == null ? void 0 : o.parentElement) == null ? void 0 : y.querySelectorAll('[data-validation="error"]')) || d.querySelectorAll('[data-validation="error"]');
    } else
      i = d.querySelectorAll('[data-validation="error"]');
    H(i, n, e, t);
  }
  const h = e.getAttribute("name");
  if (h) {
    const i = document.querySelectorAll(`[data-validation="error"][data-validation-for="${h}"]`), o = document.querySelector("[data-validation-error-global]");
    (r || o != null && o.classList.contains("active")) && H(i, n, e, t);
    const b = Array.from(i).some(
      (S) => S.style.display === "block"
    );
    o == null || o.classList.toggle("active", b);
  }
  return s;
}
function I(e, t, r, a) {
  var c, u, l;
  if (console.log("Debug getErrorMessage:", {
    type: e,
    errorsByType: r,
    hasError: r[e],
    options: a,
    validationMessages: a == null ? void 0 : a.validationMessages,
    optionMessage: (c = a == null ? void 0 : a.validationMessages) == null ? void 0 : c[e]
  }), !r[e])
    return "";
  const s = (u = t.closest("div")) == null ? void 0 : u.querySelector(`[data-validation-type="${e}"]`);
  if (s != null && s.hasAttribute("data-error-fixed"))
    return console.log("Using fixed message:", s.innerHTML), s.innerHTML;
  const n = (l = a == null ? void 0 : a.validationMessages) == null ? void 0 : l[e];
  if (n) {
    if (console.log("Using option message:", n), typeof n == "function") {
      const d = n(t);
      return console.log("Function message result:", d), d;
    }
    return n;
  }
  return console.log("Using default message:", r[e]), r[e];
}
function H(e, t, r, a) {
  const s = Object.keys(t).length > 0;
  e.forEach((n) => {
    var p, y;
    const c = n.getAttribute("data-validation-type"), u = n, l = u.innerHTML.trim(), d = u.hasAttribute("data-error-fixed");
    if (!c) {
      if (s) {
        const i = Object.keys(t)[0], o = I(i, r, t, a);
        d || ((p = a == null ? void 0 : a.validationMessages) != null && p[i] || !l) && (u.innerHTML = o), u.style.display = "block";
      } else
        u.style.display = "none";
      return;
    }
    const h = I(c, r, t, a);
    if (d) {
      u.style.display = t[c] ? "block" : "none";
      return;
    }
    ((y = a == null ? void 0 : a.validationMessages) == null ? void 0 : y[c]) ? u.innerHTML = h : l || (u.innerHTML = h), u.style.display = t[c] ? "block" : "none";
  });
}
function $(e, t = {}) {
  const {
    offset: r = 50,
    behavior: a = "smooth",
    duration: s = "0.5s"
  } = t;
  document.documentElement.style.setProperty("scroll-behavior", a), document.documentElement.style.setProperty("transition-duration", s), e.style.scrollMargin = `${r}px`;
  const n = window.scrollY, c = e.getBoundingClientRect();
  if (c.top >= 0 && c.bottom <= window.innerHeight) {
    e.focus();
    return;
  }
  e.scrollIntoView({
    behavior: a,
    block: "nearest",
    inline: "nearest"
  });
  let l = window.scrollY;
  const d = () => {
    const h = window.scrollY;
    if (h === l && h !== n) {
      document.documentElement.style.removeProperty("scroll-behavior"), document.documentElement.style.removeProperty("transition-duration"), e.focus();
      return;
    }
    l = h, requestAnimationFrame(d);
  };
  requestAnimationFrame(d);
}
function D(e, t) {
  console.log("validateForm開始");
  const r = e.querySelectorAll('input:not([type="submit"]), textarea, select');
  console.log("検証対象フィールド:", Array.from(r).map((s) => ({
    type: s.getAttribute("type"),
    name: s.getAttribute("name"),
    validation: s.getAttribute("data-validation"),
    required: s.hasAttribute("required"),
    value: s.value
  })));
  let a = !0;
  return r.forEach((s) => {
    const n = E(s, t, !0);
    console.log("フィールドバリデーション結果:", {
      field: s.getAttribute("name"),
      valid: n
    }), n || (a = !1);
  }), console.log("最終バリデーション結果:", a), a;
}
function W(e, t) {
  const {
    stepOptions: {
      useDisplayNone: r = !1,
      stepActiveClass: a = "active",
      indicatorActiveClass: s = "active",
      indicatorSelector: n = ".step-indicator",
      progressSelector: c = "#step-progress",
      progressFillSelector: u = "#progress-fill"
    } = {}
  } = t || {};
  let l = Array.from(e.querySelectorAll(".step"));
  l.forEach((m, f) => {
    f !== 0 && (r && (m.style.display = "none"), m.classList.remove("active"));
  });
  const d = document.querySelector(u), h = document.querySelectorAll(n), x = document.querySelector(c), p = document.querySelector("[data-step-current]"), y = document.querySelector("[data-step-total]");
  let i = 0;
  const o = () => {
    const m = (i + 1) / l.length * 100;
    d && (d.style.width = `${m}%`), x && x.setAttribute("aria-valuenow", String(m)), h.forEach((f, g) => {
      f.classList.toggle(s, g === i);
    }), p && (p.textContent = String(i + 1)), y && (y.textContent = String(l.length));
  }, b = () => {
    const f = l[i].querySelectorAll(
      'input, textarea, select, [contenteditable="true"], button[role="combobox"], div[role="listbox"], div[role="slider"], div[role="spinbutton"]'
    );
    let g = !0;
    return f.forEach((v) => {
      E(v, t) || (g = !1);
    }), g;
  }, S = () => {
    var g;
    const m = ((g = t == null ? void 0 : t.confirmationOptions) == null ? void 0 : g.delimiter) || ",";
    e.querySelectorAll("[data-confirm]").forEach((v) => {
      var N, F;
      const q = v.getAttribute("data-confirm");
      if (!q) return;
      const P = e.querySelector(`[name="${q}"]`);
      if (!P) return;
      let k = "";
      switch (P.type) {
        case "checkbox":
          const U = e.querySelectorAll(`input[name="${q}"]:checked`);
          k = Array.from(U).map((R) => {
            var O, C;
            return ((C = (O = R.labels) == null ? void 0 : O[0]) == null ? void 0 : C.textContent) || R.value;
          }).join(m);
          break;
        case "radio":
          const L = e.querySelector(`input[name="${q}"]:checked`);
          k = L ? ((F = (N = L.labels) == null ? void 0 : N[0]) == null ? void 0 : F.textContent) || L.value : "";
          break;
        default:
          k = P.value;
      }
      v.textContent = k || "未入力";
    });
  }, A = (m) => {
    l.forEach((v, q) => {
      v.classList.toggle(a, q === m), r && (v.style.display = q === m ? "block" : "none");
    }), i = m, o();
    const f = l[i];
    S();
    const g = f.querySelector('[data-action="next"]');
    g && (g.style.display = "inline-block");
  }, M = () => {
    if (!b()) {
      const g = l[i].querySelector("input:invalid, textarea:invalid, select:invalid");
      g && $(g, t == null ? void 0 : t.scrollOptions);
      return;
    }
    if (i < l.length - 1) {
      const f = e.closest("form") || e;
      $(f, t == null ? void 0 : t.scrollOptions), A(i + 1);
    }
  }, V = () => {
    i > 0 && A(i - 1);
  }, T = (m) => {
    if (m > i && !b()) {
      const v = l[i].querySelector("input:invalid, textarea:invalid, select:invalid");
      v && $(v, t == null ? void 0 : t.scrollOptions);
      return;
    }
    A(m);
  };
  return A(i), e.addEventListener("click", (m) => {
    const f = m.target;
    if (f.hasAttribute("data-action")) {
      const g = f.getAttribute("data-action");
      if (g === "next" || g === "confirm") M();
      else if (g === "previous") V();
      else if (g === "edit") {
        const v = parseInt(f.getAttribute("data-target-step") || "1") - 1;
        A(v);
      }
    }
  }), h.forEach((m, f) => {
    m.addEventListener("click", () => T(f));
  }), {
    showStep: A,
    handleNext: M,
    handlePrevious: V,
    updateProgressBar: o
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
  return e.customRules && z(e.customRules), t.querySelectorAll("input, textarea, select").forEach((a) => {
    a.addEventListener("input", () => E(a, e, !1)), a.addEventListener("blur", () => E(a, e, !1));
  }), e.enableWebflow ? (window.Webflow = window.Webflow || [], window.Webflow.push(() => {
    t.setAttribute("novalidate", "true"), t.addEventListener("submit", function(a) {
      var n;
      if (!D(t, e)) {
        console.log("バリデーション失敗: フォーム送信を中止"), a.preventDefault(), a.stopPropagation();
        return;
      }
      console.log("バリデーション成功"), (n = e == null ? void 0 : e.webflowOptions) != null && n.customSubmit && (a.preventDefault(), a.stopPropagation(), e.webflowOptions.customSubmit(t));
    });
  })) : t.addEventListener("submit", async (a) => {
    var n;
    if (!D(t, e)) {
      a.preventDefault(), a.stopPropagation();
      return;
    }
    (n = e == null ? void 0 : e.webflowOptions) != null && n.customSubmit && (a.preventDefault(), a.stopPropagation(), e.webflowOptions.customSubmit(t));
  }), W(t, e);
};
typeof window < "u" && (window.Formous = Y);
export {
  Y as Formous
};
