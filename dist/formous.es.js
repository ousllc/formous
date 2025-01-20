const D = {
  required: {
    // 入力が空でないか確認
    validate: (e, t) => {
      var a, s;
      const r = t.hasAttribute("required") || ((a = t.getAttribute("data-validation")) == null ? void 0 : a.includes("required")) || t.closest('fieldset[data-validation="required"]') !== null;
      if (r && t.type === "radio") {
        const i = t.getAttribute("name");
        if (i)
          return !!((s = t.closest("form")) == null ? void 0 : s.querySelector(`input[name="${i}"]:checked`));
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
      const a = r.querySelectorAll('input[type="checkbox"]'), s = parseInt(r.getAttribute("data-group-min") || "0", 10), i = r.getAttribute("data-group-max") ? parseInt(r.getAttribute("data-group-max") || "0", 10) : a.length, l = Array.from(a).filter((d) => d.checked).length;
      return !r.getAttribute("data-group-min") && l > i || !r.getAttribute("data-group-max") && l < s ? !1 : l >= s && l <= i;
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
      const a = ((f = r == null ? void 0 : r.validationPatterns) == null ? void 0 : f.password) || {}, s = a.minLength ?? 8, i = a.maxLength ?? 100, l = a.requireUppercase ?? !0, d = a.requireNumber ?? !0, m = a.requireSymbol ?? !0;
      return !(e.length < s || e.length > i || l && !/[A-Z]/.test(e) || d && !/\d/.test(e) || m && !/[!@#$%^&*]/.test(e));
    },
    message: (e, t) => {
      var f;
      const r = ((f = t == null ? void 0 : t.validationPatterns) == null ? void 0 : f.password) || {}, a = r.minLength ?? 8, s = r.maxLength ?? 100, i = r.requireUppercase ?? !0, l = r.requireNumber ?? !0, d = r.requireSymbol ?? !0, m = [];
      return m.push(`at least ${a} characters${s !== 100 ? `, maximum ${s} characters` : ""}`), i && m.push("uppercase letter"), l && m.push("number"), d && m.push("special character (!@#$%^&*)"), `Password must contain ${m.join(", ")}`;
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
}, P = { ...D };
function J(e) {
  Object.assign(P, e);
}
function $(e, t, r = !1) {
  var x, p, y;
  const a = e.closest("fieldset[data-validation]");
  let s = !0, i = {};
  e.type === "checkbox" && e.hasAttribute("required") && !e.checked && (i.required = P.required.message(e), s = !1);
  const l = [
    { attr: "required", type: "required" },
    { attr: "min", type: "min" },
    { attr: "max", type: "max" },
    { attr: "minlength", type: "minLength" },
    { attr: "maxlength", type: "maxLength" }
  ], d = {
    email: "email",
    url: "url",
    date: "date",
    time: "time",
    tel: "phone",
    number: "numeric"
  };
  if (e.type in d) {
    const n = d[e.type], c = P[n];
    c && !c.validate(e.value, e) && (i[n] = c.message(e), s = !1);
  }
  l.forEach((n) => {
    var c;
    if (e.hasAttribute(n.attr)) {
      const v = P[n.type];
      if (v && !v.validate(e.value, e)) {
        const w = (c = t == null ? void 0 : t.validationMessages) == null ? void 0 : c[n.type], b = typeof v.message == "function" ? v.message(e) : v.message;
        i[n.type] = w || b, s = !1;
      }
    }
  }), (a ? ((x = a.getAttribute("data-validation")) == null ? void 0 : x.split(" ")) || [] : ((p = e.getAttribute("data-validation")) == null ? void 0 : p.split(" ")) || []).forEach((n) => {
    const c = P[n];
    c && (c.validate(e.value, e, t) || (i[n] = c.message(e, t), s = !1));
  });
  const f = a || e.closest("div");
  if (f) {
    let n;
    if (e.type === "radio") {
      const c = e.closest("div");
      n = ((y = c == null ? void 0 : c.parentElement) == null ? void 0 : y.querySelectorAll('[data-validation="error"]')) || f.querySelectorAll('[data-validation="error"]');
    } else
      n = f.querySelectorAll('[data-validation="error"]');
    O(n, i, e, t);
  }
  const h = e.getAttribute("name");
  if (h) {
    const n = document.querySelectorAll(`[data-validation="error"][data-validation-for="${h}"]`), c = document.querySelector("[data-validation-error-global]");
    (r || c != null && c.classList.contains("active")) && O(n, i, e, t);
    const v = Array.from(n).some(
      (w) => w.style.display === "block"
    );
    c == null || c.classList.toggle("active", v);
  }
  return s;
}
function T(e, t, r, a) {
  var l, d;
  if (!r[e])
    return "";
  const s = (l = t.closest("div")) == null ? void 0 : l.querySelector(`[data-validation-type="${e}"]`);
  if (s != null && s.hasAttribute("data-error-fixed"))
    return s.innerHTML;
  const i = (d = a == null ? void 0 : a.validationMessages) == null ? void 0 : d[e];
  return i ? typeof i == "function" ? i(t) : i : r[e];
}
function O(e, t, r, a) {
  const s = Object.keys(t).length > 0;
  e.forEach((i) => {
    var p, y;
    const l = i.getAttribute("data-validation-type"), d = i, m = d.innerHTML.trim(), f = d.hasAttribute("data-error-fixed");
    if (!l) {
      if (s) {
        const n = Object.keys(t)[0], c = T(n, r, t, a);
        f || ((p = a == null ? void 0 : a.validationMessages) != null && p[n] || !m) && (d.innerHTML = c), d.style.display = "block";
      } else
        d.style.display = "none";
      return;
    }
    const h = T(l, r, t, a);
    if (f) {
      d.style.display = t[l] ? "block" : "none";
      return;
    }
    ((y = a == null ? void 0 : a.validationMessages) == null ? void 0 : y[l]) ? d.innerHTML = h : m || (d.innerHTML = h), d.style.display = t[l] ? "block" : "none";
  });
}
function E(e, t = {}) {
  const {
    offset: r = 50,
    behavior: a = "smooth",
    duration: s = "0.5s"
  } = t;
  document.documentElement.style.setProperty("scroll-behavior", a), document.documentElement.style.setProperty("transition-duration", s), e.style.scrollMargin = `${r}px`;
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
  let m = window.scrollY;
  const f = () => {
    const h = window.scrollY;
    if (h === m && h !== i) {
      document.documentElement.style.removeProperty("scroll-behavior"), document.documentElement.style.removeProperty("transition-duration"), e.focus();
      return;
    }
    m = h, requestAnimationFrame(f);
  };
  requestAnimationFrame(f);
}
function U(e, t) {
  const r = e.querySelectorAll("input, textarea, select");
  let a = !0;
  return r.forEach((s) => {
    $(s, t) || (a && E(s, t == null ? void 0 : t.scrollOptions), a = !1);
  }), a;
}
function j(e, t) {
  const {
    stepOptions: {
      useDisplayNone: r = !1,
      stepActiveClass: a = "active",
      indicatorActiveClass: s = "active",
      indicatorSelector: i = ".step-indicator",
      progressSelector: l = "#step-progress",
      progressFillSelector: d = "#progress-fill"
    } = {}
  } = t || {};
  let m = Array.from(e.querySelectorAll(".step"));
  m.forEach((o, u) => {
    u !== 0 && (r && (o.style.display = "none"), o.classList.remove("active"));
  });
  const f = document.querySelector(d), h = document.querySelectorAll(i), x = document.querySelector(l), p = document.querySelector("[data-step-current]"), y = document.querySelector("[data-step-total]");
  let n = 0;
  const c = () => {
    const o = (n + 1) / m.length * 100;
    f && (f.style.width = `${o}%`), x && x.setAttribute("aria-valuenow", String(o)), h.forEach((u, g) => {
      u.classList.toggle(s, g === n);
    }), p && (p.textContent = String(n + 1)), y && (y.textContent = String(m.length));
  }, v = () => {
    const u = m[n].querySelectorAll(
      'input, textarea, select, [contenteditable="true"], button[role="combobox"], div[role="listbox"], div[role="slider"], div[role="spinbutton"]'
    );
    let g = !0;
    return u.forEach((A) => {
      $(A, t) || (g = !1);
    }), g;
  }, w = () => {
    var g;
    const o = ((g = t == null ? void 0 : t.confirmationOptions) == null ? void 0 : g.delimiter) || ",";
    e.querySelectorAll("[data-confirm]").forEach((A) => {
      var M, R;
      const q = A.getAttribute("data-confirm");
      if (!q) return;
      const S = e.querySelector(`[name="${q}"]`);
      if (!S) return;
      let k = "";
      switch (S.type) {
        case "checkbox":
          const z = e.querySelectorAll(`input[name="${q}"]:checked`);
          k = Array.from(z).map((C) => {
            var F, I;
            return ((I = (F = C.labels) == null ? void 0 : F[0]) == null ? void 0 : I.textContent) || C.value;
          }).join(o);
          break;
        case "radio":
          const L = e.querySelector(`input[name="${q}"]:checked`);
          k = L ? ((R = (M = L.labels) == null ? void 0 : M[0]) == null ? void 0 : R.textContent) || L.value : "";
          break;
        default:
          k = S.value;
      }
      A.textContent = k || "未入力";
    });
  }, b = (o) => {
    m.forEach((u, g) => {
      u.classList.toggle(a, g === o), r && (u.style.display = g === o ? "block" : "none");
    }), n = o, c(), w();
  }, V = () => {
    if (!v()) {
      const g = m[n].querySelector("input:invalid, textarea:invalid, select:invalid");
      g && E(g, t == null ? void 0 : t.scrollOptions);
      return;
    }
    n < m.length - 1 && (b(n + 1), setTimeout(() => {
      const u = document.querySelector('[data-scroll="top"]');
      u && E(u, t == null ? void 0 : t.scrollOptions);
    }, 100));
  }, N = () => {
    n > 0 && (b(n - 1), setTimeout(() => {
      const o = document.querySelector('[data-scroll="top"]');
      o && E(o, t == null ? void 0 : t.scrollOptions);
    }, 100));
  }, Z = (o) => {
    for (let u = n; u < o; u++) {
      const g = m[u], A = g.querySelectorAll(
        'input, textarea, select, [contenteditable="true"]'
      );
      let q = !0;
      if (A.forEach((S) => {
        $(S, t) || (q = !1);
      }), !q) {
        b(u);
        const S = g.querySelector("input:invalid, textarea:invalid, select:invalid");
        return S && E(S, t == null ? void 0 : t.scrollOptions), !1;
      }
    }
    return !0;
  }, H = (o) => {
    o > n && !Z(o) || b(o);
  };
  return b(n), e.addEventListener("click", (o) => {
    const u = o.target;
    if (u.hasAttribute("data-action")) {
      const g = u.getAttribute("data-action");
      if (g === "next" || g === "confirm") V();
      else if (g === "previous") N();
      else if (g === "edit") {
        const A = parseInt(u.getAttribute("data-target-step") || "1") - 1;
        b(A);
      }
    }
  }), h.forEach((o, u) => {
    o.addEventListener("click", () => H(u));
  }), {
    showStep: b,
    handleNext: V,
    handlePrevious: N,
    updateProgressBar: c
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
    s.addEventListener("input", () => $(s, e, !1)), s.addEventListener("blur", () => $(s, e, !1));
  }), e.enableWebflow ? (window.Webflow = window.Webflow || [], window.Webflow.push(() => {
    t.setAttribute("novalidate", "true"), t.addEventListener("submit", function(s) {
      var l;
      if (!U(t, e)) {
        s.preventDefault(), s.stopPropagation();
        return;
      }
      (l = e == null ? void 0 : e.webflowOptions) != null && l.customSubmit && (s.preventDefault(), s.stopPropagation(), e.webflowOptions.customSubmit(t));
    });
  })) : t.addEventListener("submit", async (s) => {
    var l;
    if (!U(t, e)) {
      s.preventDefault(), s.stopPropagation();
      return;
    }
    (l = e == null ? void 0 : e.webflowOptions) != null && l.customSubmit && (s.preventDefault(), s.stopPropagation(), e.webflowOptions.customSubmit(t));
  }), j(t, e);
};
typeof window < "u" && (window.Formous = _);
export {
  _ as Formous
};
