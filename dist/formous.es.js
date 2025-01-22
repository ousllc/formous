const D = {
  required: {
    // 入力が空でないか確認
    validate: (e, t) => {
      var a, s;
      const r = t.hasAttribute("required") || ((a = t.getAttribute("data-validation")) == null ? void 0 : a.includes("required")) || t.closest('fieldset[data-validation="required"]') !== null;
      if (r && t instanceof HTMLInputElement && t.type === "checkbox")
        return t.checked;
      if (r && t.type === "radio") {
        const i = t.getAttribute("name");
        if (i)
          return !!((s = t.closest("form")) == null ? void 0 : s.querySelector(`input[name="${i}"]:checked`));
      }
      return r && t instanceof HTMLSelectElement ? t.value !== "" : !r || e.trim().length > 0;
    },
    message: (e) => e.getAttribute("data-validation-message") || "このフィールドは必須です"
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
    validate: (e, t) => {
      const r = t.getAttribute("data-country") || "JP", s = {
        JP: /^[0-9]{3}-[0-9]{4}$/,
        // ハイフンを必須に変更（123-4567のみ許可）
        US: /^\d{5}(-\d{4})?$/,
        UK: /^[A-Z]{1,2}[0-9][A-Z0-9]? ?[0-9][A-Z]{2}$/i,
        CA: /^[ABCEGHJKLMNPRSTVXY]\d[ABCEGHJ-NPRSTV-Z][ ]?\d[ABCEGHJ-NPRSTV-Z]\d$/i,
        DE: /^\d{5}$/,
        FR: /^\d{5}$/,
        AU: /^\d{4}$/,
        IT: /^\d{5}$/,
        ES: /^\d{5}$/,
        NL: /^\d{4}[ ]?[A-Z]{2}$/,
        CN: /^\d{6}$/
      }[r];
      return s ? !e || s.test(e) : !0;
    },
    message: (e) => {
      const t = e.getAttribute("data-country") || "JP";
      return {
        JP: "郵便番号は123-4567の形式（ハイフン必須）で入力してください",
        US: "Please enter a ZIP code in the format 12345 or 12345-6789",
        UK: "Please enter a valid postcode (e.g., AA9A 9AA)",
        CA: "Please enter a valid postal code (e.g., A1A 1A1)",
        DE: "Bitte geben Sie eine gültige Postleitzahl ein (z.B. 12345)",
        FR: "Veuillez entrer un code postal valide (ex: 12345)",
        AU: "Please enter a valid postcode (e.g., 1234)",
        IT: "Inserisci un codice postale valido (es. 12345)",
        ES: "Por favor, introduzca un código postal válido (ej. 12345)",
        NL: "Voer een geldige postcode in (bijv. 1234 AB)",
        CN: "请输入有效的邮政编码（例：123456）"
      }[t] || "正しい郵便番号形式で入力してください";
    }
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
      const r = t.closest('[data-validation="checkbox-group"]');
      if (!r) return !0;
      const a = r.querySelectorAll('input[type="checkbox"]'), s = parseInt(r.getAttribute("data-group-min") || "0", 10), i = r.getAttribute("data-group-max") ? parseInt(r.getAttribute("data-group-max") || "0", 10) : a.length, n = Array.from(a).filter((m) => m.checked).length;
      return !r.getAttribute("data-group-min") && n > i || !r.getAttribute("data-group-max") && n < s ? !1 : n >= s && n <= i;
    },
    message: (e) => {
      const t = e.closest('[data-validation="checkbox-group"]'), r = (t == null ? void 0 : t.getAttribute("data-group-min")) || "0", a = (t == null ? void 0 : t.getAttribute("data-group-max")) || "∞";
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
      var h;
      const a = ((h = r == null ? void 0 : r.validationPatterns) == null ? void 0 : h.password) || {}, s = a.minLength ?? 8, i = a.maxLength ?? 100, n = a.requireUppercase ?? !0, m = a.requireNumber ?? !0, u = a.requireSymbol ?? !0;
      return !(e.length < s || e.length > i || n && !/[A-Z]/.test(e) || m && !/\d/.test(e) || u && !/[!@#$%^&*]/.test(e));
    },
    message: (e, t) => {
      var h;
      const r = ((h = t == null ? void 0 : t.validationPatterns) == null ? void 0 : h.password) || {}, a = r.minLength ?? 8, s = r.maxLength ?? 100, i = r.requireUppercase ?? !0, n = r.requireNumber ?? !0, m = r.requireSymbol ?? !0, u = [];
      return u.push(`at least ${a} characters${s !== 100 ? `, maximum ${s} characters` : ""}`), i && u.push("uppercase letter"), n && u.push("number"), m && u.push("special character (!@#$%^&*)"), `Password must contain ${u.join(", ")}`;
    }
  },
  halfwidthKatakana: {
    validate: (e, t) => e ? /^[ｦ-ﾟ]+$/.test(e) : !0,
    message: () => "半角カタカナで入力してください。"
  },
  zenkaku: {
    validate: (e) => e ? /^[^\x01-\x7E\xA1-\xDF]+$/.test(e) : !0,
    message: () => "全角文字で入力してください。"
  }
}, L = { ...D };
function J(e) {
  Object.assign(L, e);
}
function $(e, t, r = !1) {
  var A, q, f;
  let a = !0, s = {};
  const i = [
    { attr: "required", type: "required" },
    { attr: "min", type: "min" },
    { attr: "max", type: "max" },
    { attr: "minlength", type: "minLength" },
    { attr: "maxlength", type: "maxLength" }
  ], n = {
    email: "email",
    url: "url",
    date: "date",
    time: "time",
    tel: "phone",
    number: "numeric"
  };
  if (i.forEach((l) => {
    var d;
    if (e.hasAttribute(l.attr)) {
      const b = L[l.type];
      if (l.type !== "required" && !e.hasAttribute("required") && !e.value)
        return;
      if (b && !b.validate(e.value, e)) {
        const v = (d = t == null ? void 0 : t.validationMessages) == null ? void 0 : d[l.type];
        v ? s[l.type] = v : s[l.type] = b.message(e), a = !1;
      }
    }
  }), e instanceof HTMLInputElement && e.type in n) {
    const l = n[e.type], d = L[l];
    if (!e.hasAttribute("required") && !e.value)
      return !0;
    if (d && !d.validate(e.value, e)) {
      const b = (A = t == null ? void 0 : t.validationMessages) == null ? void 0 : A[l];
      b ? s[l] = b : s[l] = d.message(e), a = !1;
    }
  }
  [
    ...((q = e.getAttribute("data-validation")) == null ? void 0 : q.split(" ")) || [],
    ...e.closest('[data-validation="checkbox-group"]') ? ["checkbox-group"] : []
  ].forEach((l) => {
    var b;
    const d = L[l];
    if (d && !d.validate(e.value, e, t)) {
      const E = (b = t == null ? void 0 : t.validationMessages) == null ? void 0 : b[l];
      E ? s[l] = E : s[l] = d.message(e, t), a = !1;
    }
  });
  const u = e.closest("div"), p = e.closest('[data-validation="checkbox-group"]') || u;
  if (p) {
    let l;
    if (e.type === "radio") {
      const d = e.closest("div");
      l = ((f = d == null ? void 0 : d.parentElement) == null ? void 0 : f.querySelectorAll('[data-validation="error"]')) || p.querySelectorAll('[data-validation="error"]');
    } else
      l = p.querySelectorAll('[data-validation="error"]');
    O(l, s, e, t);
  }
  const w = e.getAttribute("name");
  if (w) {
    const l = document.querySelectorAll(`[data-validation="error"][data-validation-for="${w}"]`), d = document.querySelector("[data-validation-error-global]");
    (r || d != null && d.classList.contains("active")) && O(l, s, e, t);
    const b = Array.from(l).some(
      (v) => v.style.display === "block"
    );
    d == null || d.classList.toggle("active", b);
  }
  return a;
}
function T(e, t, r, a) {
  var n, m;
  if (!r[e])
    return "";
  const s = (n = t.closest("div")) == null ? void 0 : n.querySelector(`[data-validation-type="${e}"]`);
  if (s != null && s.hasAttribute("data-error-fixed"))
    return s.innerHTML;
  const i = (m = a == null ? void 0 : a.validationMessages) == null ? void 0 : m[e];
  return i ? typeof i == "function" ? i(t) : i : r[e];
}
function O(e, t, r, a) {
  const s = Object.keys(t).length > 0;
  e.forEach((i) => {
    var A;
    const n = i.getAttribute("data-validation-type"), m = i, u = m.innerHTML.trim(), h = m.hasAttribute("data-error-fixed");
    if (!n) {
      if (s) {
        const q = Object.keys(t)[0], f = T(q, r, t, a);
        h || (m.innerHTML = f), m.style.display = "block";
      } else
        m.style.display = "none";
      return;
    }
    const p = T(n, r, t, a);
    if (h) {
      m.style.display = t[n] ? "block" : "none";
      return;
    }
    (((A = a == null ? void 0 : a.validationMessages) == null ? void 0 : A[n]) || !u) && (m.innerHTML = p), m.style.display = t[n] ? "block" : "none";
  });
}
function P(e, t = {}) {
  const {
    offset: r = 50,
    behavior: a = "smooth",
    duration: s = "0.5s"
  } = t;
  document.documentElement.style.setProperty("scroll-behavior", a), document.documentElement.style.setProperty("transition-duration", s), e.style.scrollMargin = `${r}px`;
  const i = window.scrollY, n = e.getBoundingClientRect();
  if (n.top >= 0 && n.bottom <= window.innerHeight) {
    e.focus();
    return;
  }
  e.scrollIntoView({
    behavior: a,
    block: "nearest",
    inline: "nearest"
  });
  let u = window.scrollY;
  const h = () => {
    const p = window.scrollY;
    if (p === u && p !== i) {
      document.documentElement.style.removeProperty("scroll-behavior"), document.documentElement.style.removeProperty("transition-duration"), e.focus();
      return;
    }
    u = p, requestAnimationFrame(h);
  };
  requestAnimationFrame(h);
}
function H(e, t) {
  const r = e.querySelectorAll("input, textarea, select");
  let a = !0;
  return r.forEach((s) => {
    $(s, t) || (a && P(s, t == null ? void 0 : t.scrollOptions), a = !1);
  }), a;
}
function j(e, t) {
  const {
    stepOptions: {
      useDisplayNone: r = !1,
      stepActiveClass: a = "active",
      indicatorActiveClass: s = "active",
      indicatorSelector: i = ".step-indicator",
      progressSelector: n = "#step-progress",
      progressFillSelector: m = "#progress-fill"
    } = {}
  } = t || {};
  let u = Array.from(e.querySelectorAll(".step"));
  u.forEach((c, o) => {
    o !== 0 && (r && (c.style.display = "none"), c.classList.remove("active"));
  });
  const h = document.querySelector(m), p = document.querySelectorAll(i), w = document.querySelector(n), A = document.querySelector("[data-step-current]"), q = document.querySelector("[data-step-total]");
  let f = 0;
  const l = () => {
    const c = (f + 1) / u.length * 100;
    h && (h.style.width = `${c}%`), w && w.setAttribute("aria-valuenow", String(c)), p.forEach((o, g) => {
      o.classList.toggle(s, g === f);
    }), A && (A.textContent = String(f + 1)), q && (q.textContent = String(u.length));
  }, d = () => {
    const o = u[f].querySelectorAll(
      'input, textarea, select, [contenteditable="true"], button[role="combobox"], div[role="listbox"], div[role="slider"], div[role="spinbutton"]'
    );
    let g = !0;
    return o.forEach((y) => {
      $(y, t) || (g = !1);
    }), g;
  }, b = () => {
    var g;
    const c = ((g = t == null ? void 0 : t.confirmationOptions) == null ? void 0 : g.delimiter) || ",";
    e.querySelectorAll("[data-confirm]").forEach((y) => {
      var M, C;
      const x = y.getAttribute("data-confirm");
      if (!x) return;
      const S = e.querySelector(`[name="${x}"]`);
      if (!S) return;
      let k = "";
      switch (S.type) {
        case "checkbox":
          const z = e.querySelectorAll(`input[name="${x}"]:checked`);
          k = Array.from(z).map((I) => {
            var R, F;
            return ((F = (R = I.labels) == null ? void 0 : R[0]) == null ? void 0 : F.textContent) || I.value;
          }).join(c);
          break;
        case "radio":
          const V = e.querySelector(`input[name="${x}"]:checked`);
          k = V ? ((C = (M = V.labels) == null ? void 0 : M[0]) == null ? void 0 : C.textContent) || V.value : "";
          break;
        default:
          k = S.value;
      }
      y.textContent = k || "未入力";
    });
  }, v = (c) => {
    u.forEach((o, g) => {
      o.classList.toggle(a, g === c), r && (o.style.display = g === c ? "block" : "none");
    }), f = c, l(), b();
  }, E = () => {
    if (!d()) {
      const g = u[f].querySelector("input:invalid, textarea:invalid, select:invalid");
      g && P(g, t == null ? void 0 : t.scrollOptions);
      return;
    }
    f < u.length - 1 && (v(f + 1), setTimeout(() => {
      const o = document.querySelector('[data-scroll="top"]');
      o && P(o, t == null ? void 0 : t.scrollOptions);
    }, 100));
  }, N = () => {
    f > 0 && (v(f - 1), setTimeout(() => {
      const c = document.querySelector('[data-scroll="top"]');
      c && P(c, t == null ? void 0 : t.scrollOptions);
    }, 100));
  }, U = (c) => {
    for (let o = f; o < c; o++) {
      const g = u[o], y = g.querySelectorAll(
        'input, textarea, select, [contenteditable="true"]'
      );
      let x = !0;
      if (y.forEach((S) => {
        $(S, t) || (x = !1);
      }), !x) {
        v(o);
        const S = g.querySelector("input:invalid, textarea:invalid, select:invalid");
        return S && P(S, t == null ? void 0 : t.scrollOptions), !1;
      }
    }
    return !0;
  }, Z = (c) => {
    c > f && !U(c) || v(c);
  };
  return v(f), e.addEventListener("click", (c) => {
    const o = c.target;
    if (o.hasAttribute("data-action")) {
      const g = o.getAttribute("data-action");
      if (g === "next" || g === "confirm") E();
      else if (g === "previous") N();
      else if (g === "edit") {
        const y = parseInt(o.getAttribute("data-target-step") || "1") - 1;
        v(y);
      }
    }
  }), p.forEach((c, o) => {
    c.addEventListener("click", () => Z(o));
  }), {
    showStep: v,
    handleNext: E,
    handlePrevious: N,
    updateProgressBar: l
  };
}
const _ = {
  required: {
    message: "This field is required"
  }
}, B = _.required;
console.log(`Custom rule found: ${B.message}`);
typeof window < "u" && (window.Webflow = window.Webflow || []);
const W = (e) => {
  const t = document.querySelector(e.formSelector);
  if (!t) {
    console.error("Form not found");
    return;
  }
  return t.querySelectorAll('[data-validation="error"]').forEach((s) => {
    s.style.display = "none";
  }), e.customRules && J(e.customRules), t.querySelectorAll("input, textarea, select").forEach((s) => {
    s.addEventListener("input", () => $(s, e, !1)), s.addEventListener("blur", () => $(s, e, !1));
  }), e.enableWebflow ? (window.Webflow = window.Webflow || [], window.Webflow.push(() => {
    t.setAttribute("novalidate", "true"), t.addEventListener("submit", function(s) {
      var n;
      if (!H(t, e)) {
        s.preventDefault(), s.stopPropagation();
        return;
      }
      (n = e == null ? void 0 : e.webflowOptions) != null && n.customSubmit && (s.preventDefault(), s.stopPropagation(), e.webflowOptions.customSubmit(t));
    });
  })) : t.addEventListener("submit", async (s) => {
    var n;
    if (!H(t, e)) {
      s.preventDefault(), s.stopPropagation();
      return;
    }
    (n = e == null ? void 0 : e.webflowOptions) != null && n.customSubmit && (s.preventDefault(), s.stopPropagation(), e.webflowOptions.customSubmit(t));
  }), j(t, e);
};
typeof window < "u" && (window.Formous = W);
export {
  W as Formous
};
