const R = {
  required: {
    // 入力が空でないか確認
    validate: (e, a) => {
      var t;
      return !(a.hasAttribute("required") || ((t = a.getAttribute("data-validation")) == null ? void 0 : t.includes("required"))) || e.trim().length > 0;
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
    validate: (e, a) => {
      const r = a.getAttribute("minlength");
      return !r || e.length >= parseInt(r);
    },
    message: (e) => `Minimum length is ${e.getAttribute("minlength")}`
  },
  maxLength: {
    validate: (e, a) => {
      const r = a.getAttribute("maxlength");
      return r ? e.length <= Number(r) : !0;
    },
    message: (e) => `Please enter no more than ${e.getAttribute("maxlength")} characters`
  },
  min: {
    validate: (e, a) => {
      const r = a.getAttribute("min");
      if (!r) return !0;
      const t = Number(e);
      return !isNaN(t) && t >= Number(r);
    },
    message: (e) => `Please enter a value greater than or equal to ${e.getAttribute("min")}`
  },
  max: {
    validate: (e, a) => {
      const r = a.getAttribute("max");
      if (!r) return !0;
      const t = Number(e);
      return !isNaN(t) && t <= Number(r);
    },
    message: (e) => `Please enter a value less than or equal to ${e.getAttribute("max")}`
  },
  pattern: {
    // 正規表現パターンに一致するか確認
    validate: (e, a) => {
      const r = a.getAttribute("data-pattern");
      return r ? new RegExp(r).test(e) : !0;
    },
    message: (e) => `Please match the requested format: ${e.getAttribute("data-pattern")}.`
  },
  url: {
    // URL形式か確認
    validate: (e) => /^(https?:\/\/)?([\w\-]+)+([\w\-.]+)+(:\d+)?(\/[\w\-]*)*(\?[\w\-=&]*)?(#[\w\-]*)?$/.test(e),
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
    validate: (e, a) => {
      const r = a.getAttribute("data-equals"), t = r ? document.getElementById(r) : null;
      return t ? e === t.value : !0;
    },
    message: () => "Values do not match."
  },
  checkboxRequired: {
    // チェックボックスが選択されているか確認
    validate: (e, a) => a.checked,
    message: () => "This checkbox is required."
  },
  fileRequired: {
    // ファイルがアップロードされているか確認
    validate: (e, a) => {
      const r = a.files;
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
    validate: (e, a) => {
      const r = a.closest('fieldset[data-validation="checkbox-group"]');
      if (!r) return !0;
      const t = r.querySelectorAll('input[type="checkbox"]'), n = parseInt(r.getAttribute("data-group-min") || "0", 10), l = r.getAttribute("data-group-max") ? parseInt(r.getAttribute("data-group-max") || "0", 10) : t.length, o = Array.from(t).filter((s) => s.checked).length;
      return !r.getAttribute("data-group-min") && o > l || !r.getAttribute("data-group-max") && o < n ? !1 : o >= n && o <= l;
    },
    message: (e) => {
      const a = e.closest('fieldset[data-validation="checkbox-group"]'), r = (a == null ? void 0 : a.getAttribute("data-group-min")) || "0", t = (a == null ? void 0 : a.getAttribute("data-group-max")) || "∞";
      return a != null && a.getAttribute("data-group-min") ? a != null && a.getAttribute("data-group-max") ? `Please select between ${r} and ${t} options.` : `Please select at least ${r} options.` : `Please select at most ${t} options.`;
    }
  },
  "confirm-email": {
    // メールアドレスが一致するか確認
    validate: (e, a) => {
      var t;
      const r = (t = a.form) == null ? void 0 : t.querySelector('input[data-validation~="email"]');
      return !r || !r.value ? !0 : e === r.value;
    },
    message: () => "Email addresses do not match."
  },
  password: {
    validate: (e, a, r) => {
      var g;
      const t = ((g = r == null ? void 0 : r.validationPatterns) == null ? void 0 : g.password) || {}, n = t.minLength ?? 8, l = t.maxLength ?? 100, o = t.requireUppercase ?? !0, s = t.requireNumber ?? !0, c = t.requireSymbol ?? !0;
      return !(e.length < n || e.length > l || o && !/[A-Z]/.test(e) || s && !/\d/.test(e) || c && !/[!@#$%^&*]/.test(e));
    },
    message: (e, a) => {
      var g;
      const r = ((g = a == null ? void 0 : a.validationPatterns) == null ? void 0 : g.password) || {}, t = r.minLength ?? 8, n = r.maxLength ?? 100, l = r.requireUppercase ?? !0, o = r.requireNumber ?? !0, s = r.requireSymbol ?? !0, c = [];
      return c.push(`at least ${t} characters${n !== 100 ? `, maximum ${n} characters` : ""}`), l && c.push("uppercase letter"), o && c.push("number"), s && c.push("special character (!@#$%^&*)"), `Password must contain ${c.join(", ")}`;
    }
  }
}, A = { ...R };
function T(e) {
  Object.assign(A, e);
}
function x(e, a, r = !1) {
  var p, b;
  const t = e.closest("fieldset[data-validation]");
  let n = !0, l = {};
  const o = [
    { attr: "required", type: "required" },
    { attr: "min", type: "min" },
    { attr: "max", type: "max" },
    { attr: "minlength", type: "minLength" },
    { attr: "maxlength", type: "maxLength" }
  ];
  if (e.type === "email") {
    const u = A.email;
    u && !u.validate(e.value, e) && (l.email = u.message(e), n = !1);
  }
  o.forEach((u) => {
    var d;
    if (e.hasAttribute(u.attr)) {
      const h = A[u.type];
      if (h && !h.validate(e.value, e)) {
        const i = (d = a == null ? void 0 : a.validationMessages) == null ? void 0 : d[u.type], m = typeof h.message == "function" ? h.message(e) : h.message;
        l[u.type] = i || m, n = !1;
      }
    }
  }), (t ? ((p = t.getAttribute("data-validation")) == null ? void 0 : p.split(" ")) || [] : ((b = e.getAttribute("data-validation")) == null ? void 0 : b.split(" ")) || []).forEach((u) => {
    const d = A[u];
    d && (d.validate(e.value, e, a) || (l[u] = d.message(e, a), n = !1));
  });
  const c = t || e.closest("div");
  if (c) {
    const u = c.querySelectorAll('[data-validation="error"]');
    k(u, l, e, a);
  }
  const g = e.getAttribute("name");
  if (g) {
    const u = document.querySelectorAll(`[data-validation="error"][data-validation-for="${g}"]`), d = document.querySelector("[data-validation-error-global]");
    (r || d != null && d.classList.contains("active")) && k(u, l, e, a);
    const h = Array.from(u).some(
      (i) => i.style.display === "block"
    );
    d == null || d.classList.toggle("active", h);
  }
  return n;
}
function M(e, a, r, t) {
  var o, s, c;
  if (console.log("Debug getErrorMessage:", {
    type: e,
    errorsByType: r,
    hasError: r[e],
    options: t,
    validationMessages: t == null ? void 0 : t.validationMessages,
    optionMessage: (o = t == null ? void 0 : t.validationMessages) == null ? void 0 : o[e]
  }), !r[e])
    return "";
  const n = (s = a.closest("div")) == null ? void 0 : s.querySelector(`[data-validation-type="${e}"]`);
  if (n != null && n.hasAttribute("data-error-fixed"))
    return console.log("Using fixed message:", n.innerHTML), n.innerHTML;
  const l = (c = t == null ? void 0 : t.validationMessages) == null ? void 0 : c[e];
  if (l) {
    if (console.log("Using option message:", l), typeof l == "function") {
      const g = l(a);
      return console.log("Function message result:", g), g;
    }
    return l;
  }
  return console.log("Using default message:", r[e]), r[e];
}
function k(e, a, r, t) {
  const n = e.length === 1, l = Object.keys(a).length > 0;
  e.forEach((o) => {
    var b, u;
    const s = o.getAttribute("data-validation-type"), c = o, g = c.innerHTML.trim(), p = c.hasAttribute("data-error-fixed");
    if (s) {
      const d = M(s, r, a, t);
      if (p) {
        c.style.display = a[s] ? "block" : "none";
        return;
      }
      ((b = t == null ? void 0 : t.validationMessages) == null ? void 0 : b[s]) ? c.innerHTML = d : g || (c.innerHTML = d), c.style.display = a[s] ? "block" : "none";
    } else if (n) {
      const d = Object.keys(a)[0], h = M(d, r, a, t);
      p || ((u = t == null ? void 0 : t.validationMessages) != null && u[d] || !g) && (c.innerHTML = h), c.style.display = l ? "block" : "none";
    }
  });
}
function L(e, a = {}) {
  const {
    offset: r = 50,
    behavior: t = "smooth",
    duration: n = "0.5s"
  } = a;
  document.documentElement.style.setProperty("scroll-behavior", t), document.documentElement.style.setProperty("transition-duration", n), document.documentElement.style.setProperty("scroll-timeline-name", "scroll"), e.style.scrollMargin = `${r}px`, e.scrollIntoView({
    behavior: t,
    block: "nearest",
    // 最も近い位置にスクロール
    inline: "nearest"
  }), setTimeout(() => {
    document.documentElement.style.removeProperty("scroll-behavior"), document.documentElement.style.removeProperty("transition-duration"), document.documentElement.style.removeProperty("scroll-timeline-name"), setTimeout(() => {
      e.focus();
    }, 2e3);
  }, parseFloat(n) * 1e3);
}
function E(e, a) {
  const r = e.querySelectorAll("input, textarea, select");
  let t = !0, n = null;
  return r.forEach((l) => {
    x(l, a, !0) || (t = !1, n || (n = l));
  }), !t && n && setTimeout(() => {
    n && L(n, a.scrollOptions);
  }, 0), t;
}
function C(e, a = !1, r) {
  let t = Array.from(e.querySelectorAll(".step"));
  const n = e.querySelector("#progress-fill"), l = e.querySelectorAll(".step-indicator"), o = e.querySelector("#step-progress");
  let s = 0;
  if (a) {
    let i = e.querySelector('.step[data-confirmation="true"]');
    i || (i = document.createElement("div"), i.classList.add("step"), i.setAttribute("data-confirmation", "true"), i.innerHTML = `
              <h3>Confirmation</h3>
              <div id="confirmation-content"></div>
              <button type="button" data-action="previous">Back</button>
              <button type="submit">Submit</button>
            `, e.appendChild(i)), t = Array.from(e.querySelectorAll(".step"));
  }
  const c = (i) => {
    const m = e.querySelector('.step[data-confirmation="true"]');
    if (!m) return;
    m.querySelectorAll("[data-confirm]").forEach((v) => {
      var $, P;
      const y = v.getAttribute("data-confirm");
      if (!y) return;
      if (($ = e.querySelector(`fieldset input[name="${y}"]`)) == null ? void 0 : $.closest("fieldset")) {
        const q = e.querySelectorAll(`input[name="${y}"]:checked`), V = Array.from(q).map((I) => {
          const S = I.nextElementSibling;
          return (S == null ? void 0 : S.textContent) || "";
        }).filter(Boolean), F = ((P = i.confirmationOptions) == null ? void 0 : P.delimiter) || ",";
        v.textContent = V.join(F);
      } else {
        const q = e.querySelector(`[name="${y}"]`);
        q ? v.textContent = q.value || "未入力" : v.textContent = "未入力";
      }
    });
  }, g = () => {
    const i = (s + 1) / t.length * 100;
    n && (n.style.width = `${i}%`), l.forEach((m, f) => {
      m.classList.toggle("active", f <= s);
    }), o && (o.textContent = `Step ${s + 1}/${t.length}`);
  }, p = () => {
    const m = t[s].querySelectorAll(
      'input, textarea, select, [contenteditable="true"], button[role="combobox"], div[role="listbox"], div[role="slider"], div[role="spinbutton"]'
    );
    let f = !0;
    return m.forEach((v) => {
      x(v, r) || (f = !1);
    }), f;
  }, b = (i) => {
    t.forEach((y, w) => y.classList.toggle("active", w === i)), s = i, g();
    const m = t[s], f = m.querySelector('[data-action="next"]'), v = m.querySelector('[data-action="confirm"]');
    a && s === t.length - 2 ? (f && (f.style.display = "none"), v && (v.style.display = "inline-block")) : (f && (f.style.display = "inline-block"), v && (v.style.display = "none")), a && s === t.length - 1 && c(r || {
      formSelector: "#step-form",
      confirmationOptions: {
        delimiter: "、"
      }
    });
  }, u = () => {
    if (!p()) {
      const f = t[s].querySelector("input:invalid, textarea:invalid, select:invalid");
      f && L(f, r == null ? void 0 : r.scrollOptions);
      return;
    }
    s < t.length - 1 && b(s + 1);
  }, d = () => {
    s > 0 && b(s - 1);
  }, h = (i) => {
    i > s && !p() || b(i);
  };
  return b(s), e.addEventListener("click", (i) => {
    const m = i.target;
    if (m.tagName === "BUTTON") {
      const f = m.getAttribute("data-action");
      if (f === "next" || f === "confirm") u();
      else if (f === "previous") d();
      else if (f === "edit") {
        const v = parseInt(m.getAttribute("data-target-step") || "1") - 1;
        b(v);
      }
    }
  }), l.forEach((i, m) => {
    i.addEventListener("click", () => h(m));
  }), e.querySelectorAll('[data-action="next"]').forEach((i) => {
    i.addEventListener("click", (m) => {
      m.preventDefault(), u();
    });
  }), e.querySelectorAll('[data-action="previous"]').forEach((i) => {
    i.addEventListener("click", (m) => {
      m.preventDefault(), d();
    });
  }), {
    showStep: b,
    handleNext: u,
    handlePrevious: d,
    updateProgressBar: g,
    updateConfirmationPage: c
  };
}
const O = {
  required: {
    message: "This field is required"
  }
}, H = O.required;
console.log(`Custom rule found: ${H.message}`);
typeof window < "u" && (window.Webflow = window.Webflow || []);
const U = (e) => {
  if (e.enableWebflow) {
    window.Webflow.push(() => {
      N(e);
    });
    return;
  }
  return N(e);
};
function N(e) {
  const a = document.querySelector(e.formSelector);
  if (!a) {
    console.error("Form not found");
    return;
  }
  return e.customRules && T(e.customRules), a.querySelectorAll("input, textarea, select").forEach((t) => {
    t.addEventListener("input", () => x(t, e, !1)), t.addEventListener("blur", () => x(t, e, !1));
  }), e.enableWebflow && (a.setAttribute("novalidate", "true"), a.querySelectorAll('[data-validation="error"]').forEach((t) => {
    t.style.display = "none";
  })), a.addEventListener("submit", async (t) => {
    if (e.enableWebflow) {
      if (!E(a, e)) {
        t.preventDefault(), t.stopPropagation();
        return;
      }
      return;
    }
    if (t.preventDefault(), !E(a, e)) {
      const o = a.querySelector("input:invalid, textarea:invalid, select:invalid");
      o && L(o, e.scrollOptions);
      return;
    }
    const l = new FormData(a);
    try {
      "onSubmit" in e && await e.onSubmit(l);
    } catch (o) {
      console.error("Error:", o);
    }
  }), e.enableConfirmationPage ? C(a, !0, e) : {
    validateForm: () => E(a, e),
    validateField: (t) => x(t, e)
  };
}
typeof window < "u" && (window.Formous = U);
export {
  U as Formous
};
