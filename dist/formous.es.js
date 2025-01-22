const D = {
  required: {
    // 入力が空でないか確認
    validate: (e, t) => {
      var a, s;
      const r = t.hasAttribute("required") || ((a = t.getAttribute("data-validation")) == null ? void 0 : a.includes("required")) || t.closest('fieldset[data-validation="required"]') !== null;
      if (r && t instanceof HTMLInputElement && t.type === "checkbox")
        return t.checked;
      if (r && t.type === "radio") {
        const n = t.getAttribute("name");
        if (n)
          return !!((s = t.closest("form")) == null ? void 0 : s.querySelector(`input[name="${n}"]:checked`));
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
      const a = r.querySelectorAll('input[type="checkbox"]'), s = parseInt(r.getAttribute("data-group-min") || "0", 10), n = r.getAttribute("data-group-max") ? parseInt(r.getAttribute("data-group-max") || "0", 10) : a.length, i = Array.from(a).filter((u) => u.checked).length;
      return !r.getAttribute("data-group-min") && i > n || !r.getAttribute("data-group-max") && i < s ? !1 : i >= s && i <= n;
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
      var f;
      const a = ((f = r == null ? void 0 : r.validationPatterns) == null ? void 0 : f.password) || {}, s = a.minLength ?? 8, n = a.maxLength ?? 100, i = a.requireUppercase ?? !0, u = a.requireNumber ?? !0, d = a.requireSymbol ?? !0;
      return !(e.length < s || e.length > n || i && !/[A-Z]/.test(e) || u && !/\d/.test(e) || d && !/[!@#$%^&*]/.test(e));
    },
    message: (e, t) => {
      var f;
      const r = ((f = t == null ? void 0 : t.validationPatterns) == null ? void 0 : f.password) || {}, a = r.minLength ?? 8, s = r.maxLength ?? 100, n = r.requireUppercase ?? !0, i = r.requireNumber ?? !0, u = r.requireSymbol ?? !0, d = [];
      return d.push(`at least ${a} characters${s !== 100 ? `, maximum ${s} characters` : ""}`), n && d.push("uppercase letter"), i && d.push("number"), u && d.push("special character (!@#$%^&*)"), `Password must contain ${d.join(", ")}`;
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
}, k = { ...D };
function J(e) {
  Object.assign(k, e);
}
function $(e, t, r = !1) {
  var w, A, q, h;
  const a = e.closest("fieldset[data-validation]");
  let s = !0, n = {};
  const i = [
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
  if (i.forEach((l) => {
    var m;
    if (e.hasAttribute(l.attr)) {
      const v = k[l.type];
      if (l.type !== "required" && !e.hasAttribute("required") && !e.value)
        return;
      if (v && !v.validate(e.value, e)) {
        const b = (m = t == null ? void 0 : t.validationMessages) == null ? void 0 : m[l.type];
        b ? n[l.type] = b : n[l.type] = v.message(e), s = !1;
      }
    }
  }), e instanceof HTMLInputElement && e.type in u) {
    const l = u[e.type], m = k[l];
    if (!e.hasAttribute("required") && !e.value)
      return !0;
    if (m && !m.validate(e.value, e)) {
      const v = (w = t == null ? void 0 : t.validationMessages) == null ? void 0 : w[l];
      v ? n[l] = v : n[l] = m.message(e), s = !1;
    }
  }
  (a ? ((A = a.getAttribute("data-validation")) == null ? void 0 : A.split(" ")) || [] : ((q = e.getAttribute("data-validation")) == null ? void 0 : q.split(" ")) || []).forEach((l) => {
    var v;
    const m = k[l];
    if (m && !m.validate(e.value, e, t)) {
      const E = (v = t == null ? void 0 : t.validationMessages) == null ? void 0 : v[l];
      E ? n[l] = E : n[l] = m.message(e, t), s = !1;
    }
  });
  const f = a || e.closest("div");
  if (f) {
    let l;
    if (e.type === "radio") {
      const m = e.closest("div");
      l = ((h = m == null ? void 0 : m.parentElement) == null ? void 0 : h.querySelectorAll('[data-validation="error"]')) || f.querySelectorAll('[data-validation="error"]');
    } else
      l = f.querySelectorAll('[data-validation="error"]');
    O(l, n, e, t);
  }
  const p = e.getAttribute("name");
  if (p) {
    const l = document.querySelectorAll(`[data-validation="error"][data-validation-for="${p}"]`), m = document.querySelector("[data-validation-error-global]");
    (r || m != null && m.classList.contains("active")) && O(l, n, e, t);
    const v = Array.from(l).some(
      (b) => b.style.display === "block"
    );
    m == null || m.classList.toggle("active", v);
  }
  return s;
}
function T(e, t, r, a) {
  var i, u;
  if (!r[e])
    return "";
  const s = (i = t.closest("div")) == null ? void 0 : i.querySelector(`[data-validation-type="${e}"]`);
  if (s != null && s.hasAttribute("data-error-fixed"))
    return s.innerHTML;
  const n = (u = a == null ? void 0 : a.validationMessages) == null ? void 0 : u[e];
  return n ? typeof n == "function" ? n(t) : n : r[e];
}
function O(e, t, r, a) {
  const s = Object.keys(t).length > 0;
  e.forEach((n) => {
    var A;
    const i = n.getAttribute("data-validation-type"), u = n, d = u.innerHTML.trim(), f = u.hasAttribute("data-error-fixed");
    if (!i) {
      if (s) {
        const q = Object.keys(t)[0], h = T(q, r, t, a);
        f || (u.innerHTML = h), u.style.display = "block";
      } else
        u.style.display = "none";
      return;
    }
    const p = T(i, r, t, a);
    if (f) {
      u.style.display = t[i] ? "block" : "none";
      return;
    }
    (((A = a == null ? void 0 : a.validationMessages) == null ? void 0 : A[i]) || !d) && (u.innerHTML = p), u.style.display = t[i] ? "block" : "none";
  });
}
function P(e, t = {}) {
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
  let d = window.scrollY;
  const f = () => {
    const p = window.scrollY;
    if (p === d && p !== n) {
      document.documentElement.style.removeProperty("scroll-behavior"), document.documentElement.style.removeProperty("transition-duration"), e.focus();
      return;
    }
    d = p, requestAnimationFrame(f);
  };
  requestAnimationFrame(f);
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
      indicatorSelector: n = ".step-indicator",
      progressSelector: i = "#step-progress",
      progressFillSelector: u = "#progress-fill"
    } = {}
  } = t || {};
  let d = Array.from(e.querySelectorAll(".step"));
  d.forEach((c, o) => {
    o !== 0 && (r && (c.style.display = "none"), c.classList.remove("active"));
  });
  const f = document.querySelector(u), p = document.querySelectorAll(n), w = document.querySelector(i), A = document.querySelector("[data-step-current]"), q = document.querySelector("[data-step-total]");
  let h = 0;
  const l = () => {
    const c = (h + 1) / d.length * 100;
    f && (f.style.width = `${c}%`), w && w.setAttribute("aria-valuenow", String(c)), p.forEach((o, g) => {
      o.classList.toggle(s, g === h);
    }), A && (A.textContent = String(h + 1)), q && (q.textContent = String(d.length));
  }, m = () => {
    const o = d[h].querySelectorAll(
      'input, textarea, select, [contenteditable="true"], button[role="combobox"], div[role="listbox"], div[role="slider"], div[role="spinbutton"]'
    );
    let g = !0;
    return o.forEach((y) => {
      $(y, t) || (g = !1);
    }), g;
  }, v = () => {
    var g;
    const c = ((g = t == null ? void 0 : t.confirmationOptions) == null ? void 0 : g.delimiter) || ",";
    e.querySelectorAll("[data-confirm]").forEach((y) => {
      var M, I;
      const x = y.getAttribute("data-confirm");
      if (!x) return;
      const S = e.querySelector(`[name="${x}"]`);
      if (!S) return;
      let L = "";
      switch (S.type) {
        case "checkbox":
          const z = e.querySelectorAll(`input[name="${x}"]:checked`);
          L = Array.from(z).map((R) => {
            var C, F;
            return ((F = (C = R.labels) == null ? void 0 : C[0]) == null ? void 0 : F.textContent) || R.value;
          }).join(c);
          break;
        case "radio":
          const V = e.querySelector(`input[name="${x}"]:checked`);
          L = V ? ((I = (M = V.labels) == null ? void 0 : M[0]) == null ? void 0 : I.textContent) || V.value : "";
          break;
        default:
          L = S.value;
      }
      y.textContent = L || "未入力";
    });
  }, b = (c) => {
    d.forEach((o, g) => {
      o.classList.toggle(a, g === c), r && (o.style.display = g === c ? "block" : "none");
    }), h = c, l(), v();
  }, E = () => {
    if (!m()) {
      const g = d[h].querySelector("input:invalid, textarea:invalid, select:invalid");
      g && P(g, t == null ? void 0 : t.scrollOptions);
      return;
    }
    h < d.length - 1 && (b(h + 1), setTimeout(() => {
      const o = document.querySelector('[data-scroll="top"]');
      o && P(o, t == null ? void 0 : t.scrollOptions);
    }, 100));
  }, N = () => {
    h > 0 && (b(h - 1), setTimeout(() => {
      const c = document.querySelector('[data-scroll="top"]');
      c && P(c, t == null ? void 0 : t.scrollOptions);
    }, 100));
  }, U = (c) => {
    for (let o = h; o < c; o++) {
      const g = d[o], y = g.querySelectorAll(
        'input, textarea, select, [contenteditable="true"]'
      );
      let x = !0;
      if (y.forEach((S) => {
        $(S, t) || (x = !1);
      }), !x) {
        b(o);
        const S = g.querySelector("input:invalid, textarea:invalid, select:invalid");
        return S && P(S, t == null ? void 0 : t.scrollOptions), !1;
      }
    }
    return !0;
  }, Z = (c) => {
    c > h && !U(c) || b(c);
  };
  return b(h), e.addEventListener("click", (c) => {
    const o = c.target;
    if (o.hasAttribute("data-action")) {
      const g = o.getAttribute("data-action");
      if (g === "next" || g === "confirm") E();
      else if (g === "previous") N();
      else if (g === "edit") {
        const y = parseInt(o.getAttribute("data-target-step") || "1") - 1;
        b(y);
      }
    }
  }), p.forEach((c, o) => {
    c.addEventListener("click", () => Z(o));
  }), {
    showStep: b,
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
      var i;
      if (!H(t, e)) {
        s.preventDefault(), s.stopPropagation();
        return;
      }
      (i = e == null ? void 0 : e.webflowOptions) != null && i.customSubmit && (s.preventDefault(), s.stopPropagation(), e.webflowOptions.customSubmit(t));
    });
  })) : t.addEventListener("submit", async (s) => {
    var i;
    if (!H(t, e)) {
      s.preventDefault(), s.stopPropagation();
      return;
    }
    (i = e == null ? void 0 : e.webflowOptions) != null && i.customSubmit && (s.preventDefault(), s.stopPropagation(), e.webflowOptions.customSubmit(t));
  }), j(t, e);
};
typeof window < "u" && (window.Formous = W);
export {
  W as Formous
};
