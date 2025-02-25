const D = {
  required: {
    // 入力が空でないか確認
    validate: (e, t) => {
      var n, a;
      const r = t.hasAttribute("required") || ((n = t.getAttribute("data-validation")) == null ? void 0 : n.includes("required")) || t.closest('fieldset[data-validation="required"]') !== null;
      if (r && t instanceof HTMLInputElement && t.type === "checkbox")
        return t.checked;
      if (r && t.type === "radio") {
        const i = t.getAttribute("name");
        if (i)
          return !!((a = t.closest("form")) == null ? void 0 : a.querySelector(`input[name="${i}"]:checked`));
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
      const n = Number(e);
      return !isNaN(n) && n >= Number(r);
    },
    message: (e) => `Please enter a value greater than or equal to ${e.getAttribute("min")}`
  },
  max: {
    validate: (e, t) => {
      const r = t.getAttribute("max");
      if (!r) return !0;
      const n = Number(e);
      return !isNaN(n) && n <= Number(r);
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
      const r = t.getAttribute("data-country") || "JP", a = {
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
      return a ? !e || a.test(e) : !0;
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
      const r = t.getAttribute("data-equals"), n = r ? document.getElementById(r) : null;
      return n ? e === n.value : !0;
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
      const n = r.querySelectorAll('input[type="checkbox"]'), a = parseInt(r.getAttribute("data-group-min") || "0", 10), i = r.getAttribute("data-group-max") ? parseInt(r.getAttribute("data-group-max") || "0", 10) : n.length, s = Array.from(n).filter((d) => d.checked).length;
      return s >= a && s <= i;
    },
    message: (e, t) => {
      var i;
      if ((i = t == null ? void 0 : t.validationMessages) != null && i["checkbox-group"])
        return typeof t.validationMessages["checkbox-group"] == "function" ? t.validationMessages["checkbox-group"](e) : t.validationMessages["checkbox-group"];
      const r = e.closest('[data-validation="checkbox-group"]'), n = (r == null ? void 0 : r.getAttribute("data-group-min")) || "0", a = (r == null ? void 0 : r.getAttribute("data-group-max")) || "∞";
      return `Please select between ${n} and ${a} options.`;
    }
  },
  "confirm-email": {
    // メールアドレスが一致するか確認
    validate: (e, t) => {
      var n;
      const r = (n = t.form) == null ? void 0 : n.querySelector('input[data-validation~="email"]');
      return !r || !r.value ? !0 : e === r.value;
    },
    message: () => "Email addresses do not match."
  },
  password: {
    validate: (e, t, r) => {
      var f;
      const n = ((f = r == null ? void 0 : r.validationPatterns) == null ? void 0 : f.password) || {}, a = n.minLength ?? 8, i = n.maxLength ?? 100, s = n.requireUppercase ?? !0, d = n.requireNumber ?? !0, u = n.requireSymbol ?? !0;
      return !(e.length < a || e.length > i || s && !/[A-Z]/.test(e) || d && !/\d/.test(e) || u && !/[!@#$%^&*]/.test(e));
    },
    message: (e, t) => {
      var f;
      const r = ((f = t == null ? void 0 : t.validationPatterns) == null ? void 0 : f.password) || {}, n = r.minLength ?? 8, a = r.maxLength ?? 100, i = r.requireUppercase ?? !0, s = r.requireNumber ?? !0, d = r.requireSymbol ?? !0, u = [];
      return u.push(`at least ${n} characters${a !== 100 ? `, maximum ${a} characters` : ""}`), i && u.push("uppercase letter"), s && u.push("number"), d && u.push("special character (!@#$%^&*)"), `Password must contain ${u.join(", ")}`;
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
function k(e, t, r = !1) {
  var y, x, g;
  let n = !0, a = {};
  const i = [
    { attr: "required", type: "required" },
    { attr: "min", type: "min" },
    { attr: "max", type: "max" },
    { attr: "minlength", type: "minLength" },
    { attr: "maxlength", type: "maxLength" }
  ], s = {
    email: "email",
    url: "url",
    date: "date",
    time: "time",
    tel: "phone",
    number: "numeric"
  };
  if (i.forEach((c) => {
    var h;
    if (e.hasAttribute(c.attr)) {
      const v = L[c.type];
      if (c.type !== "required" && !e.hasAttribute("required") && !e.value)
        return;
      if (v && !v.validate(e.value, e)) {
        const p = (h = t == null ? void 0 : t.validationMessages) == null ? void 0 : h[c.type];
        p ? a[c.type] = p : a[c.type] = v.message(e), n = !1;
      }
    }
  }), e instanceof HTMLInputElement && e.type in s) {
    const c = s[e.type], h = L[c];
    if (!e.hasAttribute("required") && !e.value)
      return !0;
    if (h && !h.validate(e.value, e)) {
      const v = (y = t == null ? void 0 : t.validationMessages) == null ? void 0 : y[c];
      v ? a[c] = v : a[c] = h.message(e), n = !1;
    }
  }
  [
    ...((x = e.getAttribute("data-validation")) == null ? void 0 : x.split(" ")) || [],
    ...e.closest('[data-validation="checkbox-group"]') ? ["checkbox-group"] : []
  ].forEach((c) => {
    var v;
    const h = L[c];
    if (h && !h.validate(e.value, e, t)) {
      const E = (v = t == null ? void 0 : t.validationMessages) == null ? void 0 : v[c];
      E ? a[c] = E : a[c] = h.message(e, t), n = !1;
    }
  });
  const u = e.closest("div"), f = e.closest('[data-validation="checkbox-group"]'), b = f || u;
  if (b) {
    let c;
    if (e.type === "radio" || f) {
      const h = b.nextElementSibling || ((g = b.closest('[data-error="target"]')) == null ? void 0 : g.nextElementSibling);
      c = h != null && h.matches('[data-validation="error"]') ? /* @__PURE__ */ new Set([h]) : b.querySelectorAll('[data-validation="error"]');
    } else
      c = b.querySelectorAll('[data-validation="error"]');
    O(c, a, e, t);
  }
  const w = e.getAttribute("name");
  if (w && r) {
    const c = document.querySelectorAll(`[data-validation="error"][data-validation-for="${w}"]`);
    O(c, a, e, t);
  }
  return n;
}
function T(e, t, r, n) {
  var s, d;
  if (!r[e])
    return "";
  const a = (s = t.closest("div")) == null ? void 0 : s.querySelector(`[data-validation-type="${e}"]`);
  if (a != null && a.hasAttribute("data-error-fixed"))
    return a.innerHTML;
  const i = (d = n == null ? void 0 : n.validationMessages) == null ? void 0 : d[e];
  return i ? typeof i == "function" ? i(t) : i : r[e];
}
function O(e, t, r, n) {
  const a = Object.keys(t).length > 0;
  e.forEach((i) => {
    var y;
    const s = i.getAttribute("data-validation-type"), d = i, u = d.innerHTML.trim(), f = d.hasAttribute("data-error-fixed");
    if (!s) {
      if (a) {
        const x = Object.keys(t)[0], g = T(x, r, t, n);
        f || (d.innerHTML = g), d.style.display = "block";
      } else
        d.style.display = "none";
      return;
    }
    const b = T(s, r, t, n);
    if (f) {
      d.style.display = t[s] ? "block" : "none";
      return;
    }
    (((y = n == null ? void 0 : n.validationMessages) == null ? void 0 : y[s]) || !u) && (d.innerHTML = b), d.style.display = t[s] ? "block" : "none";
  });
}
function P(e, t = {}) {
  const {
    offset: r = 50,
    behavior: n = "smooth",
    duration: a = "0.5s"
  } = t;
  document.documentElement.style.setProperty("scroll-behavior", n), document.documentElement.style.setProperty("transition-duration", a), e.style.scrollMargin = `${r}px`;
  const i = window.scrollY, s = e.getBoundingClientRect();
  if (s.top >= 0 && s.bottom <= window.innerHeight) {
    e.focus();
    return;
  }
  e.scrollIntoView({
    behavior: n,
    block: "nearest",
    inline: "nearest"
  });
  let u = window.scrollY;
  const f = () => {
    const b = window.scrollY;
    if (b === u && b !== i) {
      document.documentElement.style.removeProperty("scroll-behavior"), document.documentElement.style.removeProperty("transition-duration"), e.focus();
      return;
    }
    u = b, requestAnimationFrame(f);
  };
  requestAnimationFrame(f);
}
function H(e, t) {
  const r = e.querySelectorAll("input, textarea, select");
  let n = !0;
  return r.forEach((a) => {
    k(a, t, !0) || (n && P(a, t == null ? void 0 : t.scrollOptions), n = !1);
  }), n;
}
function j(e, t) {
  const {
    stepOptions: {
      useDisplayNone: r = !1,
      stepActiveClass: n = "active",
      indicatorActiveClass: a = "active",
      indicatorSelector: i = ".step-indicator",
      progressSelector: s = "#step-progress",
      progressFillSelector: d = "#progress-fill"
    } = {}
  } = t || {};
  let u = Array.from(e.querySelectorAll(".step"));
  u.forEach((l, o) => {
    o !== 0 && (r && (l.style.display = "none"), l.classList.remove("active"));
  });
  const f = document.querySelector(d), b = document.querySelectorAll(i), w = document.querySelector(s), y = document.querySelector("[data-step-current]"), x = document.querySelector("[data-step-total]");
  let g = 0;
  const c = () => {
    const l = (g + 1) / u.length * 100;
    f && (f.style.width = `${l}%`), w && w.setAttribute("aria-valuenow", String(l)), b.forEach((o, m) => {
      o.classList.toggle(a, m === g);
    }), y && (y.textContent = String(g + 1)), x && (x.textContent = String(u.length));
  }, h = () => {
    const o = u[g].querySelectorAll(
      'input, textarea, select, [contenteditable="true"], button[role="combobox"], div[role="listbox"], div[role="slider"], div[role="spinbutton"]'
    );
    let m = !0;
    return o.forEach((A) => {
      k(A, t) || (m = !1);
    }), m;
  }, v = () => {
    var m;
    const l = ((m = t == null ? void 0 : t.confirmationOptions) == null ? void 0 : m.delimiter) || ",";
    e.querySelectorAll("[data-confirm]").forEach((A) => {
      var N, C;
      const q = A.getAttribute("data-confirm");
      if (!q) return;
      const S = e.querySelector(`[name="${q}"]`);
      if (!S) return;
      let $ = "";
      switch (S.type) {
        case "checkbox":
          const z = e.querySelectorAll(`input[name="${q}"]:checked`);
          $ = Array.from(z).map((I) => {
            var R, F;
            return ((F = (R = I.labels) == null ? void 0 : R[0]) == null ? void 0 : F.textContent) || I.value;
          }).join(l);
          break;
        case "radio":
          const V = e.querySelector(`input[name="${q}"]:checked`);
          $ = V ? ((C = (N = V.labels) == null ? void 0 : N[0]) == null ? void 0 : C.textContent) || V.value : "";
          break;
        default:
          $ = S.value;
      }
      A.textContent = $ || "未入力";
    });
  }, p = (l) => {
    u.forEach((o, m) => {
      o.classList.toggle(n, m === l), r && (o.style.display = m === l ? "block" : "none");
    }), g = l, c(), v();
  }, E = () => {
    if (!h()) {
      const m = u[g].querySelector("input:invalid, textarea:invalid, select:invalid");
      m && P(m, t == null ? void 0 : t.scrollOptions);
      return;
    }
    g < u.length - 1 && (p(g + 1), setTimeout(() => {
      const o = document.querySelector('[data-scroll="top"]');
      o && P(o, t == null ? void 0 : t.scrollOptions);
    }, 100));
  }, M = () => {
    g > 0 && (p(g - 1), setTimeout(() => {
      const l = document.querySelector('[data-scroll="top"]');
      l && P(l, t == null ? void 0 : t.scrollOptions);
    }, 100));
  }, U = (l) => {
    for (let o = g; o < l; o++) {
      const m = u[o], A = m.querySelectorAll(
        'input, textarea, select, [contenteditable="true"]'
      );
      let q = !0;
      if (A.forEach((S) => {
        k(S, t) || (q = !1);
      }), !q) {
        p(o);
        const S = m.querySelector("input:invalid, textarea:invalid, select:invalid");
        return S && P(S, t == null ? void 0 : t.scrollOptions), !1;
      }
    }
    return !0;
  }, Z = (l) => {
    l > g && !U(l) || p(l);
  };
  return p(g), e.addEventListener("click", (l) => {
    const o = l.target;
    if (o.hasAttribute("data-action")) {
      const m = o.getAttribute("data-action");
      if (m === "next" || m === "confirm") E();
      else if (m === "previous") M();
      else if (m === "edit") {
        const A = parseInt(o.getAttribute("data-target-step") || "1") - 1;
        p(A);
      }
    }
  }), b.forEach((l, o) => {
    l.addEventListener("click", () => Z(o));
  }), {
    showStep: p,
    handleNext: E,
    handlePrevious: M,
    updateProgressBar: c
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
  return t.querySelectorAll('[data-validation="error"]').forEach((a) => {
    a.style.display = "none";
  }), e.customRules && J(e.customRules), t.querySelectorAll("input, textarea, select").forEach((a) => {
    a.addEventListener("input", () => k(a, e, !1)), a.addEventListener("blur", () => k(a, e, !1));
  }), e.enableWebflow ? (window.Webflow = window.Webflow || [], window.Webflow.push(() => {
    t.setAttribute("novalidate", "true"), t.addEventListener("submit", function(a) {
      var s;
      if (!H(t, e)) {
        a.preventDefault(), a.stopPropagation();
        return;
      }
      (s = e == null ? void 0 : e.webflowOptions) != null && s.customSubmit && (a.preventDefault(), a.stopPropagation(), e.webflowOptions.customSubmit(t));
    });
  })) : t.addEventListener("submit", async (a) => {
    var s;
    if (!H(t, e)) {
      a.preventDefault(), a.stopPropagation();
      return;
    }
    (s = e == null ? void 0 : e.webflowOptions) != null && s.customSubmit && (a.preventDefault(), a.stopPropagation(), e.webflowOptions.customSubmit(t));
  }), j(t, e);
};
typeof window < "u" && (window.Formous = W);
export {
  W as Formous
};
