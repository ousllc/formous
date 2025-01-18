const j = {
  required: {
    // 入力が空でないか確認
    validate: (e, t) => {
      var a, n;
      const r = t.hasAttribute("required") || ((a = t.getAttribute("data-validation")) == null ? void 0 : a.includes("required")) || t.closest('fieldset[data-validation="required"]') !== null;
      if (r && t.type === "radio") {
        const s = t.getAttribute("name");
        if (s)
          return !!((n = t.closest("form")) == null ? void 0 : n.querySelector(`input[name="${s}"]:checked`));
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
      const a = r.querySelectorAll('input[type="checkbox"]'), n = parseInt(r.getAttribute("data-group-min") || "0", 10), s = r.getAttribute("data-group-max") ? parseInt(r.getAttribute("data-group-max") || "0", 10) : a.length, c = Array.from(a).filter((u) => u.checked).length;
      return !r.getAttribute("data-group-min") && c > s || !r.getAttribute("data-group-max") && c < n ? !1 : c >= n && c <= s;
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
      const a = ((d = r == null ? void 0 : r.validationPatterns) == null ? void 0 : d.password) || {}, n = a.minLength ?? 8, s = a.maxLength ?? 100, c = a.requireUppercase ?? !0, u = a.requireNumber ?? !0, l = a.requireSymbol ?? !0;
      return !(e.length < n || e.length > s || c && !/[A-Z]/.test(e) || u && !/\d/.test(e) || l && !/[!@#$%^&*]/.test(e));
    },
    message: (e, t) => {
      var d;
      const r = ((d = t == null ? void 0 : t.validationPatterns) == null ? void 0 : d.password) || {}, a = r.minLength ?? 8, n = r.maxLength ?? 100, s = r.requireUppercase ?? !0, c = r.requireNumber ?? !0, u = r.requireSymbol ?? !0, l = [];
      return l.push(`at least ${a} characters${n !== 100 ? `, maximum ${n} characters` : ""}`), s && l.push("uppercase letter"), c && l.push("number"), u && l.push("special character (!@#$%^&*)"), `Password must contain ${l.join(", ")}`;
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
}, E = { ...j };
function z(e) {
  Object.assign(E, e);
}
function P(e, t, r = !1) {
  var S, p, y;
  const a = e.closest("fieldset[data-validation]");
  let n = !0, s = {};
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
    const i = u[e.type], o = E[i];
    o && !o.validate(e.value, e) && (s[i] = o.message(e), n = !1);
  }
  c.forEach((i) => {
    var o;
    if (e.hasAttribute(i.attr)) {
      const v = E[i.type];
      if (v && !v.validate(e.value, e)) {
        const q = (o = t == null ? void 0 : t.validationMessages) == null ? void 0 : o[i.type], x = typeof v.message == "function" ? v.message(e) : v.message;
        s[i.type] = q || x, n = !1;
      }
    }
  }), (a ? ((S = a.getAttribute("data-validation")) == null ? void 0 : S.split(" ")) || [] : ((p = e.getAttribute("data-validation")) == null ? void 0 : p.split(" ")) || []).forEach((i) => {
    const o = E[i];
    o && (o.validate(e.value, e, t) || (s[i] = o.message(e, t), n = !1));
  });
  const d = a || e.closest("div");
  if (d) {
    let i;
    if (e.type === "radio") {
      const o = e.closest("div");
      i = ((y = o == null ? void 0 : o.parentElement) == null ? void 0 : y.querySelectorAll('[data-validation="error"]')) || d.querySelectorAll('[data-validation="error"]');
    } else
      i = d.querySelectorAll('[data-validation="error"]');
    H(i, s, e, t);
  }
  const h = e.getAttribute("name");
  if (h) {
    const i = document.querySelectorAll(`[data-validation="error"][data-validation-for="${h}"]`), o = document.querySelector("[data-validation-error-global]");
    (r || o != null && o.classList.contains("active")) && H(i, s, e, t);
    const v = Array.from(i).some(
      (q) => q.style.display === "block"
    );
    o == null || o.classList.toggle("active", v);
  }
  return n;
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
  const n = (u = t.closest("div")) == null ? void 0 : u.querySelector(`[data-validation-type="${e}"]`);
  if (n != null && n.hasAttribute("data-error-fixed"))
    return console.log("Using fixed message:", n.innerHTML), n.innerHTML;
  const s = (l = a == null ? void 0 : a.validationMessages) == null ? void 0 : l[e];
  if (s) {
    if (console.log("Using option message:", s), typeof s == "function") {
      const d = s(t);
      return console.log("Function message result:", d), d;
    }
    return s;
  }
  return console.log("Using default message:", r[e]), r[e];
}
function H(e, t, r, a) {
  const n = Object.keys(t).length > 0;
  e.forEach((s) => {
    var p, y;
    const c = s.getAttribute("data-validation-type"), u = s, l = u.innerHTML.trim(), d = u.hasAttribute("data-error-fixed");
    if (!c) {
      if (n) {
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
function k(e, t = {}) {
  const {
    offset: r = 50,
    behavior: a = "smooth",
    duration: n = "0.5s"
  } = t;
  document.documentElement.style.setProperty("scroll-behavior", a), document.documentElement.style.setProperty("transition-duration", n), e.style.scrollMargin = `${r}px`;
  const s = window.scrollY, c = e.getBoundingClientRect();
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
    if (h === l && h !== s) {
      document.documentElement.style.removeProperty("scroll-behavior"), document.documentElement.style.removeProperty("transition-duration"), e.focus();
      return;
    }
    l = h, requestAnimationFrame(d);
  };
  requestAnimationFrame(d);
}
function T(e, t) {
  const r = e.querySelectorAll("input, textarea, select");
  let a = !0, n = null;
  return r.forEach((s) => {
    P(s, t, !0) || (a = !1, n || (n = s));
  }), !a && n && setTimeout(() => {
    n && k(n, t.scrollOptions);
  }, 0), a;
}
function W(e, t) {
  const {
    stepOptions: {
      useDisplayNone: r = !1,
      stepActiveClass: a = "active",
      indicatorActiveClass: n = "active",
      indicatorSelector: s = ".step-indicator",
      progressSelector: c = "#step-progress",
      progressFillSelector: u = "#progress-fill"
    } = {}
  } = t || {};
  let l = Array.from(e.querySelectorAll(".step"));
  l.forEach((m, f) => {
    f !== 0 && (r && (m.style.display = "none"), m.classList.remove("active"));
  });
  const d = document.querySelector(u), h = document.querySelectorAll(s), S = document.querySelector(c), p = document.querySelector("[data-step-current]"), y = document.querySelector("[data-step-total]");
  let i = 0;
  const o = () => {
    const m = (i + 1) / l.length * 100;
    d && (d.style.width = `${m}%`), S && S.setAttribute("aria-valuenow", String(m)), h.forEach((f, g) => {
      f.classList.toggle(n, g === i);
    }), p && (p.textContent = String(i + 1)), y && (y.textContent = String(l.length));
  }, v = () => {
    const f = l[i].querySelectorAll(
      'input, textarea, select, [contenteditable="true"], button[role="combobox"], div[role="listbox"], div[role="slider"], div[role="spinbutton"]'
    );
    let g = !0;
    return f.forEach((b) => {
      P(b, t) || (g = !1);
    }), g;
  }, q = () => {
    var g;
    const m = ((g = t == null ? void 0 : t.confirmationOptions) == null ? void 0 : g.delimiter) || ",";
    e.querySelectorAll("[data-confirm]").forEach((b) => {
      var N, F;
      const A = b.getAttribute("data-confirm");
      if (!A) return;
      const L = e.querySelector(`[name="${A}"]`);
      if (!L) return;
      let w = "";
      switch (L.type) {
        case "checkbox":
          const U = e.querySelectorAll(`input[name="${A}"]:checked`);
          w = Array.from(U).map((R) => {
            var O, C;
            return ((C = (O = R.labels) == null ? void 0 : O[0]) == null ? void 0 : C.textContent) || R.value;
          }).join(m);
          break;
        case "radio":
          const $ = e.querySelector(`input[name="${A}"]:checked`);
          w = $ ? ((F = (N = $.labels) == null ? void 0 : N[0]) == null ? void 0 : F.textContent) || $.value : "";
          break;
        default:
          w = L.value;
      }
      b.textContent = w || "未入力";
    });
  }, x = (m) => {
    l.forEach((b, A) => {
      b.classList.toggle(a, A === m), r && (b.style.display = A === m ? "block" : "none");
    }), i = m, o();
    const f = l[i];
    q();
    const g = f.querySelector('[data-action="next"]');
    g && (g.style.display = "inline-block");
  }, V = () => {
    if (!v()) {
      const g = l[i].querySelector("input:invalid, textarea:invalid, select:invalid");
      g && k(g, t == null ? void 0 : t.scrollOptions);
      return;
    }
    if (i < l.length - 1) {
      const f = e.closest("form") || e;
      k(f, t == null ? void 0 : t.scrollOptions), x(i + 1);
    }
  }, M = () => {
    i > 0 && x(i - 1);
  }, D = (m) => {
    if (m > i && !v()) {
      const b = l[i].querySelector("input:invalid, textarea:invalid, select:invalid");
      b && k(b, t == null ? void 0 : t.scrollOptions);
      return;
    }
    x(m);
  };
  return x(i), e.addEventListener("click", (m) => {
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
    m.addEventListener("click", () => D(f));
  }), {
    showStep: x,
    handleNext: V,
    handlePrevious: M,
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
    a.addEventListener("input", () => P(a, e, !1)), a.addEventListener("blur", () => P(a, e, !1));
  }), e.enableWebflow ? (window.Webflow = window.Webflow || [], window.Webflow.push(() => {
    t.setAttribute("novalidate", "true"), t.addEventListener("submit", function(a) {
      var s;
      if (!T(t, e)) {
        console.log("バリデーション失敗: フォーム送信を中止"), a.preventDefault(), a.stopPropagation();
        return;
      }
      console.log("バリデーション成功"), (s = e == null ? void 0 : e.webflowOptions) != null && s.customSubmit && (a.preventDefault(), a.stopPropagation(), e.webflowOptions.customSubmit(t));
    });
  })) : t.addEventListener("submit", async (a) => {
    var s;
    if (!T(t, e)) {
      a.preventDefault(), a.stopPropagation();
      return;
    }
    (s = e == null ? void 0 : e.webflowOptions) != null && s.customSubmit && (a.preventDefault(), a.stopPropagation(), e.webflowOptions.customSubmit(t));
  }), W(t, e);
};
typeof window < "u" && (window.Formous = Y);
export {
  Y as Formous
};
