const D = {
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
      const r = t.closest('fieldset[data-validation="checkbox-group"]');
      if (!r) return !0;
      const a = r.querySelectorAll('input[type="checkbox"]'), s = parseInt(r.getAttribute("data-group-min") || "0", 10), n = r.getAttribute("data-group-max") ? parseInt(r.getAttribute("data-group-max") || "0", 10) : a.length, i = Array.from(a).filter((o) => o.checked).length;
      return !r.getAttribute("data-group-min") && i > n || !r.getAttribute("data-group-max") && i < s ? !1 : i >= s && i <= n;
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
      const a = ((f = r == null ? void 0 : r.validationPatterns) == null ? void 0 : f.password) || {}, s = a.minLength ?? 8, n = a.maxLength ?? 100, i = a.requireUppercase ?? !0, o = a.requireNumber ?? !0, u = a.requireSymbol ?? !0;
      return !(e.length < s || e.length > n || i && !/[A-Z]/.test(e) || o && !/\d/.test(e) || u && !/[!@#$%^&*]/.test(e));
    },
    message: (e, t) => {
      var f;
      const r = ((f = t == null ? void 0 : t.validationPatterns) == null ? void 0 : f.password) || {}, a = r.minLength ?? 8, s = r.maxLength ?? 100, n = r.requireUppercase ?? !0, i = r.requireNumber ?? !0, o = r.requireSymbol ?? !0, u = [];
      return u.push(`at least ${a} characters${s !== 100 ? `, maximum ${s} characters` : ""}`), n && u.push("uppercase letter"), i && u.push("number"), o && u.push("special character (!@#$%^&*)"), `Password must contain ${u.join(", ")}`;
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
}, E = { ...D };
function J(e) {
  Object.assign(E, e);
}
function k(e, t, r = !1) {
  var w, p, q, h;
  const a = e.closest("fieldset[data-validation]");
  let s = !0, n = {};
  e.type === "checkbox" && e.hasAttribute("required") && !e.checked && (n.required = E.required.message(e), s = !1);
  const i = [
    { attr: "required", type: "required" },
    { attr: "min", type: "min" },
    { attr: "max", type: "max" },
    { attr: "minlength", type: "minLength" },
    { attr: "maxlength", type: "maxLength" }
  ], o = {
    email: "email",
    url: "url",
    date: "date",
    time: "time",
    tel: "phone",
    number: "numeric"
  };
  if (i.forEach((d) => {
    var m;
    if (e.hasAttribute(d.attr)) {
      const b = E[d.type];
      if (b && !b.validate(e.value, e)) {
        const v = (m = t == null ? void 0 : t.validationMessages) == null ? void 0 : m[d.type];
        v && (n[d.type] = v), s = !1;
      }
    }
  }), e.type in o) {
    const d = o[e.type], m = E[d];
    if (m && !m.validate(e.value, e)) {
      const b = (w = t == null ? void 0 : t.validationMessages) == null ? void 0 : w[d];
      b && (n[d] = b), s = !1;
    }
  }
  (a ? ((p = a.getAttribute("data-validation")) == null ? void 0 : p.split(" ")) || [] : ((q = e.getAttribute("data-validation")) == null ? void 0 : q.split(" ")) || []).forEach((d) => {
    var b;
    const m = E[d];
    if (m && !m.validate(e.value, e, t)) {
      const P = (b = t == null ? void 0 : t.validationMessages) == null ? void 0 : b[d];
      P ? n[d] = P : n[d] = m.message(e, t), s = !1;
    }
  });
  const f = a || e.closest("div");
  if (f) {
    let d;
    if (e.type === "radio") {
      const m = e.closest("div");
      d = ((h = m == null ? void 0 : m.parentElement) == null ? void 0 : h.querySelectorAll('[data-validation="error"]')) || f.querySelectorAll('[data-validation="error"]');
    } else
      d = f.querySelectorAll('[data-validation="error"]');
    T(d, n, e, t);
  }
  const A = e.getAttribute("name");
  if (A) {
    const d = document.querySelectorAll(`[data-validation="error"][data-validation-for="${A}"]`), m = document.querySelector("[data-validation-error-global]");
    (r || m != null && m.classList.contains("active")) && T(d, n, e, t);
    const b = Array.from(d).some(
      (v) => v.style.display === "block"
    );
    m == null || m.classList.toggle("active", b);
  }
  return s;
}
function O(e, t, r, a) {
  var i, o;
  if (!r[e])
    return "";
  const s = (i = t.closest("div")) == null ? void 0 : i.querySelector(`[data-validation-type="${e}"]`);
  if (s != null && s.hasAttribute("data-error-fixed"))
    return s.innerHTML;
  const n = (o = a == null ? void 0 : a.validationMessages) == null ? void 0 : o[e];
  return n ? typeof n == "function" ? n(t) : n : r[e];
}
function T(e, t, r, a) {
  const s = Object.keys(t).length > 0;
  e.forEach((n) => {
    var p;
    const i = n.getAttribute("data-validation-type"), o = n, u = o.innerHTML.trim(), f = o.hasAttribute("data-error-fixed");
    if (!i) {
      if (s) {
        const q = Object.keys(t)[0], h = O(q, r, t, a);
        f || (o.innerHTML = h), o.style.display = "block";
      } else
        o.style.display = "none";
      return;
    }
    const A = O(i, r, t, a);
    if (f) {
      o.style.display = t[i] ? "block" : "none";
      return;
    }
    (((p = a == null ? void 0 : a.validationMessages) == null ? void 0 : p[i]) || !u) && (o.innerHTML = A), o.style.display = t[i] ? "block" : "none";
  });
}
function $(e, t = {}) {
  const {
    offset: r = 50,
    behavior: a = "smooth",
    duration: s = "0.5s"
  } = t;
  document.documentElement.style.setProperty("scroll-behavior", a), document.documentElement.style.setProperty("transition-duration", s), e.style.scrollMargin = `${r}px`;
  const n = window.scrollY, i = e.getBoundingClientRect();
  if (i.top >= 0 && i.bottom <= window.innerHeight) {
    e.focus();
    return;
  }
  e.scrollIntoView({
    behavior: a,
    block: "nearest",
    inline: "nearest"
  });
  let u = window.scrollY;
  const f = () => {
    const A = window.scrollY;
    if (A === u && A !== n) {
      document.documentElement.style.removeProperty("scroll-behavior"), document.documentElement.style.removeProperty("transition-duration"), e.focus();
      return;
    }
    u = A, requestAnimationFrame(f);
  };
  requestAnimationFrame(f);
}
function U(e, t) {
  const r = e.querySelectorAll("input, textarea, select");
  let a = !0;
  return r.forEach((s) => {
    k(s, t) || (a && $(s, t == null ? void 0 : t.scrollOptions), a = !1);
  }), a;
}
function j(e, t) {
  const {
    stepOptions: {
      useDisplayNone: r = !1,
      stepActiveClass: a = "active",
      indicatorActiveClass: s = "active",
      indicatorSelector: n = ".step-indicator",
      progressSelector: i = "#step-progress",
      progressFillSelector: o = "#progress-fill"
    } = {}
  } = t || {};
  let u = Array.from(e.querySelectorAll(".step"));
  u.forEach((l, c) => {
    c !== 0 && (r && (l.style.display = "none"), l.classList.remove("active"));
  });
  const f = document.querySelector(o), A = document.querySelectorAll(n), w = document.querySelector(i), p = document.querySelector("[data-step-current]"), q = document.querySelector("[data-step-total]");
  let h = 0;
  const d = () => {
    const l = (h + 1) / u.length * 100;
    f && (f.style.width = `${l}%`), w && w.setAttribute("aria-valuenow", String(l)), A.forEach((c, g) => {
      c.classList.toggle(s, g === h);
    }), p && (p.textContent = String(h + 1)), q && (q.textContent = String(u.length));
  }, m = () => {
    const c = u[h].querySelectorAll(
      'input, textarea, select, [contenteditable="true"], button[role="combobox"], div[role="listbox"], div[role="slider"], div[role="spinbutton"]'
    );
    let g = !0;
    return c.forEach((y) => {
      k(y, t) || (g = !1);
    }), g;
  }, b = () => {
    var g;
    const l = ((g = t == null ? void 0 : t.confirmationOptions) == null ? void 0 : g.delimiter) || ",";
    e.querySelectorAll("[data-confirm]").forEach((y) => {
      var M, R;
      const x = y.getAttribute("data-confirm");
      if (!x) return;
      const S = e.querySelector(`[name="${x}"]`);
      if (!S) return;
      let L = "";
      switch (S.type) {
        case "checkbox":
          const H = e.querySelectorAll(`input[name="${x}"]:checked`);
          L = Array.from(H).map((C) => {
            var F, I;
            return ((I = (F = C.labels) == null ? void 0 : F[0]) == null ? void 0 : I.textContent) || C.value;
          }).join(l);
          break;
        case "radio":
          const V = e.querySelector(`input[name="${x}"]:checked`);
          L = V ? ((R = (M = V.labels) == null ? void 0 : M[0]) == null ? void 0 : R.textContent) || V.value : "";
          break;
        default:
          L = S.value;
      }
      y.textContent = L || "未入力";
    });
  }, v = (l) => {
    u.forEach((c, g) => {
      c.classList.toggle(a, g === l), r && (c.style.display = g === l ? "block" : "none");
    }), h = l, d(), b();
  }, P = () => {
    if (!m()) {
      const g = u[h].querySelector("input:invalid, textarea:invalid, select:invalid");
      g && $(g, t == null ? void 0 : t.scrollOptions);
      return;
    }
    h < u.length - 1 && (v(h + 1), setTimeout(() => {
      const c = document.querySelector('[data-scroll="top"]');
      c && $(c, t == null ? void 0 : t.scrollOptions);
    }, 100));
  }, N = () => {
    h > 0 && (v(h - 1), setTimeout(() => {
      const l = document.querySelector('[data-scroll="top"]');
      l && $(l, t == null ? void 0 : t.scrollOptions);
    }, 100));
  }, Z = (l) => {
    for (let c = h; c < l; c++) {
      const g = u[c], y = g.querySelectorAll(
        'input, textarea, select, [contenteditable="true"]'
      );
      let x = !0;
      if (y.forEach((S) => {
        k(S, t) || (x = !1);
      }), !x) {
        v(c);
        const S = g.querySelector("input:invalid, textarea:invalid, select:invalid");
        return S && $(S, t == null ? void 0 : t.scrollOptions), !1;
      }
    }
    return !0;
  }, z = (l) => {
    l > h && !Z(l) || v(l);
  };
  return v(h), e.addEventListener("click", (l) => {
    const c = l.target;
    if (c.hasAttribute("data-action")) {
      const g = c.getAttribute("data-action");
      if (g === "next" || g === "confirm") P();
      else if (g === "previous") N();
      else if (g === "edit") {
        const y = parseInt(c.getAttribute("data-target-step") || "1") - 1;
        v(y);
      }
    }
  }), A.forEach((l, c) => {
    l.addEventListener("click", () => z(c));
  }), {
    showStep: v,
    handleNext: P,
    handlePrevious: N,
    updateProgressBar: d
  };
}
const B = {
  required: {
    message: "This field is required"
  }
}, W = B.required;
console.log(`Custom rule found: ${W.message}`);
typeof window < "u" && (window.Webflow = window.Webflow || []);
const _ = (e) => {
  const t = document.querySelector(e.formSelector);
  if (!t) {
    console.error("Form not found");
    return;
  }
  return t.querySelectorAll('[data-validation="error"]').forEach((s) => {
    s.style.display = "none";
  }), e.customRules && J(e.customRules), t.querySelectorAll("input, textarea, select").forEach((s) => {
    s.addEventListener("input", () => k(s, e, !1)), s.addEventListener("blur", () => k(s, e, !1));
  }), e.enableWebflow ? (window.Webflow = window.Webflow || [], window.Webflow.push(() => {
    t.setAttribute("novalidate", "true"), t.addEventListener("submit", function(s) {
      var i;
      if (!U(t, e)) {
        s.preventDefault(), s.stopPropagation();
        return;
      }
      (i = e == null ? void 0 : e.webflowOptions) != null && i.customSubmit && (s.preventDefault(), s.stopPropagation(), e.webflowOptions.customSubmit(t));
    });
  })) : t.addEventListener("submit", async (s) => {
    var i;
    if (!U(t, e)) {
      s.preventDefault(), s.stopPropagation();
      return;
    }
    (i = e == null ? void 0 : e.webflowOptions) != null && i.customSubmit && (s.preventDefault(), s.stopPropagation(), e.webflowOptions.customSubmit(t));
  }), j(t, e);
};
typeof window < "u" && (window.Formous = _);
export {
  _ as Formous
};
