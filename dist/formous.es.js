const D = {
  required: {
    // 入力が空でないか確認
    validate: (e, t) => {
      var a, n;
      const r = t.hasAttribute("required") || ((a = t.getAttribute("data-validation")) == null ? void 0 : a.includes("required")) || t.closest('fieldset[data-validation="required"]') !== null;
      if (r && t instanceof HTMLInputElement && t.type === "checkbox")
        return t.checked;
      if (r && t.type === "radio") {
        const i = t.getAttribute("name");
        if (i)
          return !!((n = t.closest("form")) == null ? void 0 : n.querySelector(`input[name="${i}"]:checked`));
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
      const r = t.getAttribute("data-country") || "JP", n = {
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
      return n ? !e || n.test(e) : !0;
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
      const a = r.querySelectorAll('input[type="checkbox"]'), n = parseInt(r.getAttribute("data-group-min") || "0", 10), i = r.getAttribute("data-group-max") ? parseInt(r.getAttribute("data-group-max") || "0", 10) : a.length, s = Array.from(a).filter((d) => d.checked).length;
      return !r.getAttribute("data-group-min") && s > i || !r.getAttribute("data-group-max") && s < n ? !1 : s >= n && s <= i;
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
      const a = ((f = r == null ? void 0 : r.validationPatterns) == null ? void 0 : f.password) || {}, n = a.minLength ?? 8, i = a.maxLength ?? 100, s = a.requireUppercase ?? !0, d = a.requireNumber ?? !0, u = a.requireSymbol ?? !0;
      return !(e.length < n || e.length > i || s && !/[A-Z]/.test(e) || d && !/\d/.test(e) || u && !/[!@#$%^&*]/.test(e));
    },
    message: (e, t) => {
      var f;
      const r = ((f = t == null ? void 0 : t.validationPatterns) == null ? void 0 : f.password) || {}, a = r.minLength ?? 8, n = r.maxLength ?? 100, i = r.requireUppercase ?? !0, s = r.requireNumber ?? !0, d = r.requireSymbol ?? !0, u = [];
      return u.push(`at least ${a} characters${n !== 100 ? `, maximum ${n} characters` : ""}`), i && u.push("uppercase letter"), s && u.push("number"), d && u.push("special character (!@#$%^&*)"), `Password must contain ${u.join(", ")}`;
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
  var A, x, g;
  let a = !0, n = {};
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
        p ? n[c.type] = p : n[c.type] = v.message(e), a = !1;
      }
    }
  }), e instanceof HTMLInputElement && e.type in s) {
    const c = s[e.type], h = L[c];
    if (!e.hasAttribute("required") && !e.value)
      return !0;
    if (h && !h.validate(e.value, e)) {
      const v = (A = t == null ? void 0 : t.validationMessages) == null ? void 0 : A[c];
      v ? n[c] = v : n[c] = h.message(e), a = !1;
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
      E ? n[c] = E : n[c] = h.message(e, t), a = !1;
    }
  });
  const u = e.closest("div"), f = e.closest('[data-validation="checkbox-group"]'), b = f || u;
  if (b) {
    let c;
    if (e.type === "radio" || f) {
      const h = b.nextElementSibling || ((g = b.closest(".form-section")) == null ? void 0 : g.nextElementSibling);
      c = h != null && h.matches('[data-validation="error"]') ? /* @__PURE__ */ new Set([h]) : b.querySelectorAll('[data-validation="error"]');
    } else
      c = b.querySelectorAll('[data-validation="error"]');
    O(c, n, e, t);
  }
  const w = e.getAttribute("name");
  if (w && r) {
    const c = document.querySelectorAll(`[data-validation="error"][data-validation-for="${w}"]`);
    O(c, n, e, t);
  }
  return a;
}
function T(e, t, r, a) {
  var s, d;
  if (!r[e])
    return "";
  const n = (s = t.closest("div")) == null ? void 0 : s.querySelector(`[data-validation-type="${e}"]`);
  if (n != null && n.hasAttribute("data-error-fixed"))
    return n.innerHTML;
  const i = (d = a == null ? void 0 : a.validationMessages) == null ? void 0 : d[e];
  return i ? typeof i == "function" ? i(t) : i : r[e];
}
function O(e, t, r, a) {
  const n = Object.keys(t).length > 0;
  e.forEach((i) => {
    var A;
    const s = i.getAttribute("data-validation-type"), d = i, u = d.innerHTML.trim(), f = d.hasAttribute("data-error-fixed");
    if (!s) {
      if (n) {
        const x = Object.keys(t)[0], g = T(x, r, t, a);
        f || (d.innerHTML = g), d.style.display = "block";
      } else
        d.style.display = "none";
      return;
    }
    const b = T(s, r, t, a);
    if (f) {
      d.style.display = t[s] ? "block" : "none";
      return;
    }
    (((A = a == null ? void 0 : a.validationMessages) == null ? void 0 : A[s]) || !u) && (d.innerHTML = b), d.style.display = t[s] ? "block" : "none";
  });
}
function P(e, t = {}) {
  const {
    offset: r = 50,
    behavior: a = "smooth",
    duration: n = "0.5s"
  } = t;
  document.documentElement.style.setProperty("scroll-behavior", a), document.documentElement.style.setProperty("transition-duration", n), e.style.scrollMargin = `${r}px`;
  const i = window.scrollY, s = e.getBoundingClientRect();
  if (s.top >= 0 && s.bottom <= window.innerHeight) {
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
  let a = !0;
  return r.forEach((n) => {
    $(n, t, !0) || (a && P(n, t == null ? void 0 : t.scrollOptions), a = !1);
  }), a;
}
function j(e, t) {
  const {
    stepOptions: {
      useDisplayNone: r = !1,
      stepActiveClass: a = "active",
      indicatorActiveClass: n = "active",
      indicatorSelector: i = ".step-indicator",
      progressSelector: s = "#step-progress",
      progressFillSelector: d = "#progress-fill"
    } = {}
  } = t || {};
  let u = Array.from(e.querySelectorAll(".step"));
  u.forEach((l, o) => {
    o !== 0 && (r && (l.style.display = "none"), l.classList.remove("active"));
  });
  const f = document.querySelector(d), b = document.querySelectorAll(i), w = document.querySelector(s), A = document.querySelector("[data-step-current]"), x = document.querySelector("[data-step-total]");
  let g = 0;
  const c = () => {
    const l = (g + 1) / u.length * 100;
    f && (f.style.width = `${l}%`), w && w.setAttribute("aria-valuenow", String(l)), b.forEach((o, m) => {
      o.classList.toggle(n, m === g);
    }), A && (A.textContent = String(g + 1)), x && (x.textContent = String(u.length));
  }, h = () => {
    const o = u[g].querySelectorAll(
      'input, textarea, select, [contenteditable="true"], button[role="combobox"], div[role="listbox"], div[role="slider"], div[role="spinbutton"]'
    );
    let m = !0;
    return o.forEach((y) => {
      $(y, t) || (m = !1);
    }), m;
  }, v = () => {
    var m;
    const l = ((m = t == null ? void 0 : t.confirmationOptions) == null ? void 0 : m.delimiter) || ",";
    e.querySelectorAll("[data-confirm]").forEach((y) => {
      var C, M;
      const q = y.getAttribute("data-confirm");
      if (!q) return;
      const S = e.querySelector(`[name="${q}"]`);
      if (!S) return;
      let k = "";
      switch (S.type) {
        case "checkbox":
          const z = e.querySelectorAll(`input[name="${q}"]:checked`);
          k = Array.from(z).map((I) => {
            var R, F;
            return ((F = (R = I.labels) == null ? void 0 : R[0]) == null ? void 0 : F.textContent) || I.value;
          }).join(l);
          break;
        case "radio":
          const V = e.querySelector(`input[name="${q}"]:checked`);
          k = V ? ((M = (C = V.labels) == null ? void 0 : C[0]) == null ? void 0 : M.textContent) || V.value : "";
          break;
        default:
          k = S.value;
      }
      y.textContent = k || "未入力";
    });
  }, p = (l) => {
    u.forEach((o, m) => {
      o.classList.toggle(a, m === l), r && (o.style.display = m === l ? "block" : "none");
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
  }, N = () => {
    g > 0 && (p(g - 1), setTimeout(() => {
      const l = document.querySelector('[data-scroll="top"]');
      l && P(l, t == null ? void 0 : t.scrollOptions);
    }, 100));
  }, U = (l) => {
    for (let o = g; o < l; o++) {
      const m = u[o], y = m.querySelectorAll(
        'input, textarea, select, [contenteditable="true"]'
      );
      let q = !0;
      if (y.forEach((S) => {
        $(S, t) || (q = !1);
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
      else if (m === "previous") N();
      else if (m === "edit") {
        const y = parseInt(o.getAttribute("data-target-step") || "1") - 1;
        p(y);
      }
    }
  }), b.forEach((l, o) => {
    l.addEventListener("click", () => Z(o));
  }), {
    showStep: p,
    handleNext: E,
    handlePrevious: N,
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
  return t.querySelectorAll('[data-validation="error"]').forEach((n) => {
    n.style.display = "none";
  }), e.customRules && J(e.customRules), t.querySelectorAll("input, textarea, select").forEach((n) => {
    n.addEventListener("input", () => $(n, e, !1)), n.addEventListener("blur", () => $(n, e, !1));
  }), e.enableWebflow ? (window.Webflow = window.Webflow || [], window.Webflow.push(() => {
    t.setAttribute("novalidate", "true"), t.addEventListener("submit", function(n) {
      var s;
      if (!H(t, e)) {
        n.preventDefault(), n.stopPropagation();
        return;
      }
      (s = e == null ? void 0 : e.webflowOptions) != null && s.customSubmit && (n.preventDefault(), n.stopPropagation(), e.webflowOptions.customSubmit(t));
    });
  })) : t.addEventListener("submit", async (n) => {
    var s;
    if (!H(t, e)) {
      n.preventDefault(), n.stopPropagation();
      return;
    }
    (s = e == null ? void 0 : e.webflowOptions) != null && s.customSubmit && (n.preventDefault(), n.stopPropagation(), e.webflowOptions.customSubmit(t));
  }), j(t, e);
};
typeof window < "u" && (window.Formous = W);
export {
  W as Formous
};
