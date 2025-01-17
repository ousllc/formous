const _ = {
  required: {
    // 入力が空でないか確認
    validate: (e, t) => {
      var a, n;
      const r = t.hasAttribute("required") || ((a = t.getAttribute("data-validation")) == null ? void 0 : a.includes("required")) || t.closest('fieldset[data-validation="required"]') !== null;
      if (r && t.type === "radio") {
        const i = t.getAttribute("name");
        if (i)
          return !!((n = t.closest("form")) == null ? void 0 : n.querySelector(`input[name="${i}"]:checked`));
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
    validate: (e) => {
      if (!e) return !0;
      try {
        const t = new URL(e);
        return t.protocol !== "http:" && t.protocol !== "https:" ? !1 : /^([a-zA-Z0-9]([a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/.test(t.hostname);
      } catch {
        try {
          const t = new URL(`https://${e}`);
          return /^([a-zA-Z0-9]([a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/.test(t.hostname);
        } catch {
          return !1;
        }
      }
    },
    message: () => "URLの形式が正しくありません。"
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
      const a = r.querySelectorAll('input[type="checkbox"]'), n = parseInt(r.getAttribute("data-group-min") || "0", 10), i = r.getAttribute("data-group-max") ? parseInt(r.getAttribute("data-group-max") || "0", 10) : a.length, l = Array.from(a).filter((u) => u.checked).length;
      return !r.getAttribute("data-group-min") && l > i || !r.getAttribute("data-group-max") && l < n ? !1 : l >= n && l <= i;
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
      const a = ((d = r == null ? void 0 : r.validationPatterns) == null ? void 0 : d.password) || {}, n = a.minLength ?? 8, i = a.maxLength ?? 100, l = a.requireUppercase ?? !0, u = a.requireNumber ?? !0, o = a.requireSymbol ?? !0;
      return !(e.length < n || e.length > i || l && !/[A-Z]/.test(e) || u && !/\d/.test(e) || o && !/[!@#$%^&*]/.test(e));
    },
    message: (e, t) => {
      var d;
      const r = ((d = t == null ? void 0 : t.validationPatterns) == null ? void 0 : d.password) || {}, a = r.minLength ?? 8, n = r.maxLength ?? 100, i = r.requireUppercase ?? !0, l = r.requireNumber ?? !0, u = r.requireSymbol ?? !0, o = [];
      return o.push(`at least ${a} characters${n !== 100 ? `, maximum ${n} characters` : ""}`), i && o.push("uppercase letter"), l && o.push("number"), u && o.push("special character (!@#$%^&*)"), `Password must contain ${o.join(", ")}`;
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
}, E = { ..._ };
function Y(e) {
  Object.assign(E, e);
}
function L(e, t, r = !1) {
  var x, p, y;
  const a = e.closest("fieldset[data-validation]");
  let n = !0, i = {};
  const l = [
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
    const s = u[e.type], c = E[s];
    c && !c.validate(e.value, e) && (i[s] = c.message(e), n = !1);
  }
  l.forEach((s) => {
    var c;
    if (e.hasAttribute(s.attr)) {
      const b = E[s.type];
      if (b && !b.validate(e.value, e)) {
        const v = (c = t == null ? void 0 : t.validationMessages) == null ? void 0 : c[s.type], k = typeof b.message == "function" ? b.message(e) : b.message;
        i[s.type] = v || k, n = !1;
      }
    }
  }), (a ? ((x = a.getAttribute("data-validation")) == null ? void 0 : x.split(" ")) || [] : ((p = e.getAttribute("data-validation")) == null ? void 0 : p.split(" ")) || []).forEach((s) => {
    const c = E[s];
    c && (c.validate(e.value, e, t) || (i[s] = c.message(e, t), n = !1));
  });
  const d = a || e.closest("div");
  if (d) {
    let s;
    if (e.type === "radio") {
      const c = e.closest("div");
      s = ((y = c == null ? void 0 : c.parentElement) == null ? void 0 : y.querySelectorAll('[data-validation="error"]')) || d.querySelectorAll('[data-validation="error"]');
    } else
      s = d.querySelectorAll('[data-validation="error"]');
    H(s, i, e, t);
  }
  const h = e.getAttribute("name");
  if (h) {
    const s = document.querySelectorAll(`[data-validation="error"][data-validation-for="${h}"]`), c = document.querySelector("[data-validation-error-global]");
    (r || c != null && c.classList.contains("active")) && H(s, i, e, t);
    const b = Array.from(s).some(
      (v) => v.style.display === "block"
    );
    c == null || c.classList.toggle("active", b);
  }
  return n;
}
function Z(e, t, r, a) {
  var l, u, o;
  if (console.log("Debug getErrorMessage:", {
    type: e,
    errorsByType: r,
    hasError: r[e],
    options: a,
    validationMessages: a == null ? void 0 : a.validationMessages,
    optionMessage: (l = a == null ? void 0 : a.validationMessages) == null ? void 0 : l[e]
  }), !r[e])
    return "";
  const n = (u = t.closest("div")) == null ? void 0 : u.querySelector(`[data-validation-type="${e}"]`);
  if (n != null && n.hasAttribute("data-error-fixed"))
    return console.log("Using fixed message:", n.innerHTML), n.innerHTML;
  const i = (o = a == null ? void 0 : a.validationMessages) == null ? void 0 : o[e];
  if (i) {
    if (console.log("Using option message:", i), typeof i == "function") {
      const d = i(t);
      return console.log("Function message result:", d), d;
    }
    return i;
  }
  return console.log("Using default message:", r[e]), r[e];
}
function H(e, t, r, a) {
  const n = Object.keys(t).length > 0;
  e.forEach((i) => {
    var p, y;
    const l = i.getAttribute("data-validation-type"), u = i, o = u.innerHTML.trim(), d = u.hasAttribute("data-error-fixed");
    if (!l) {
      if (n) {
        const s = Object.keys(t)[0], c = Z(s, r, t, a);
        d || ((p = a == null ? void 0 : a.validationMessages) != null && p[s] || !o) && (u.innerHTML = c), u.style.display = "block";
      } else
        u.style.display = "none";
      return;
    }
    const h = Z(l, r, t, a);
    if (d) {
      u.style.display = t[l] ? "block" : "none";
      return;
    }
    ((y = a == null ? void 0 : a.validationMessages) == null ? void 0 : y[l]) ? u.innerHTML = h : o || (u.innerHTML = h), u.style.display = t[l] ? "block" : "none";
  });
}
function M(e, t = {}) {
  const {
    offset: r = 50,
    behavior: a = "smooth",
    duration: n = "0.5s"
  } = t;
  document.documentElement.style.setProperty("scroll-behavior", a), document.documentElement.style.setProperty("transition-duration", n), e.style.scrollMargin = `${r}px`;
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
  let o = window.scrollY;
  const d = () => {
    const h = window.scrollY;
    if (h === o && h !== i) {
      document.documentElement.style.removeProperty("scroll-behavior"), document.documentElement.style.removeProperty("transition-duration"), e.focus();
      return;
    }
    o = h, requestAnimationFrame(d);
  };
  requestAnimationFrame(d);
}
function T(e, t) {
  const r = e.querySelectorAll("input, textarea, select");
  let a = !0, n = null;
  return r.forEach((i) => {
    L(i, t, !0) || (a = !1, n || (n = i));
  }), !a && n && setTimeout(() => {
    n && M(n, t.scrollOptions);
  }, 0), a;
}
function J(e, t) {
  const {
    stepOptions: {
      useDisplayNone: r = !1,
      stepActiveClass: a = "active",
      indicatorActiveClass: n = "active",
      indicatorSelector: i = ".step-indicator",
      progressSelector: l = "#step-progress",
      progressFillSelector: u = "#progress-fill"
    } = {}
  } = t || {};
  let o = Array.from(e.querySelectorAll(".step"));
  o.forEach((m, g) => {
    g !== 0 && (r && (m.style.display = "none"), m.classList.remove("active"));
  });
  const d = document.querySelector(u), h = document.querySelectorAll(i), x = document.querySelector(l), p = document.querySelector("[data-step-current]"), y = document.querySelector("[data-step-total]");
  let s = 0;
  const c = () => {
    const m = (s + 1) / o.length * 100;
    d && (d.style.width = `${m}%`), x && x.setAttribute("aria-valuenow", String(m)), h.forEach((g, f) => {
      g.classList.toggle(n, f === s);
    }), p && (p.textContent = String(s + 1)), y && (y.textContent = String(o.length));
  }, b = () => {
    const g = o[s].querySelectorAll(
      'input, textarea, select, [contenteditable="true"], button[role="combobox"], div[role="listbox"], div[role="slider"], div[role="spinbutton"]'
    );
    let f = !0;
    return g.forEach((A) => {
      L(A, t) || (f = !1);
    }), f;
  }, v = (m) => {
    o.forEach((A, q) => {
      r && (A.style.display = q === m ? "block" : "none"), A.classList.toggle(a, q === m);
    }), s = m, c();
    const g = o[s];
    g.classList.contains("confirmation-step") && k(o[s - 1], g);
    const f = g.querySelector('[data-action="next"]');
    f && (f.style.display = "inline-block");
  }, k = (m, g) => {
    var q;
    const f = g.querySelectorAll(".confirmation-section"), A = ((q = t == null ? void 0 : t.confirmationOptions) == null ? void 0 : q.delimiter) || ",";
    f.forEach((F) => {
      if (!F.getAttribute("data-step")) return;
      F.querySelectorAll("[data-confirm]").forEach((R) => {
        var C, I;
        const S = R.getAttribute("data-confirm");
        if (!S) return;
        const $ = e.querySelector(`[name="${S}"]`);
        if (!$) return;
        let w = "";
        switch ($.type) {
          case "checkbox":
            const W = e.querySelectorAll(`input[name="${S}"]:checked`);
            w = Array.from(W).map((z) => {
              var O, U;
              return ((U = (O = z.labels) == null ? void 0 : O[0]) == null ? void 0 : U.textContent) || z.value;
            }).join(A);
            break;
          case "radio":
            const P = e.querySelector(`input[name="${S}"]:checked`);
            w = P ? ((I = (C = P.labels) == null ? void 0 : C[0]) == null ? void 0 : I.textContent) || P.value : "";
            break;
          default:
            w = $.value;
        }
        R.textContent = w || "未入力";
      });
    });
  }, V = () => {
    if (!b()) {
      const f = o[s].querySelector("input:invalid, textarea:invalid, select:invalid");
      f && M(f, t == null ? void 0 : t.scrollOptions);
      return;
    }
    s < o.length - 1 && v(s + 1);
  }, N = () => {
    s > 0 && v(s - 1);
  }, j = (m) => {
    m > s && !b() || v(m);
  };
  return v(s), e.addEventListener("click", (m) => {
    const g = m.target;
    if (g.hasAttribute("data-action")) {
      const f = g.getAttribute("data-action");
      if (f === "next" || f === "confirm") V();
      else if (f === "previous") N();
      else if (f === "edit") {
        const A = parseInt(g.getAttribute("data-target-step") || "1") - 1;
        v(A);
      }
    }
  }), h.forEach((m, g) => {
    m.addEventListener("click", () => j(g));
  }), {
    showStep: v,
    handleNext: V,
    handlePrevious: N,
    updateProgressBar: c
  };
}
const K = {
  required: {
    message: "This field is required"
  }
}, G = K.required;
console.log(`Custom rule found: ${G.message}`);
typeof window < "u" && (window.Webflow = window.Webflow || []);
const Q = (e) => {
  if (e.enableWebflow) {
    window.Webflow.push(() => {
      D(e);
    });
    return;
  }
  return D(e);
};
function D(e) {
  const t = document.querySelector(e.formSelector);
  if (!t) {
    console.error("Form not found");
    return;
  }
  return e.customRules && Y(e.customRules), t.querySelectorAll("input, textarea, select").forEach((a) => {
    a.addEventListener("input", () => L(a, e, !1)), a.addEventListener("blur", () => L(a, e, !1));
  }), e.enableWebflow && (t.setAttribute("novalidate", "true"), t.querySelectorAll('[data-validation="error"]').forEach((a) => {
    a.style.display = "none";
  })), t.addEventListener("submit", async (a) => {
    if (e.enableWebflow) {
      if (!T(t, e)) {
        a.preventDefault(), a.stopPropagation();
        return;
      }
      return;
    }
    if (a.preventDefault(), !T(t, e)) {
      const l = t.querySelector("input:invalid, textarea:invalid, select:invalid");
      l && M(l, e.scrollOptions);
      return;
    }
    const i = new FormData(t);
    try {
      "onSubmit" in e && await e.onSubmit(i);
    } catch (l) {
      console.error("Error:", l);
    }
  }), J(t, e);
}
typeof window < "u" && (window.Formous = Q);
export {
  Q as Formous
};
