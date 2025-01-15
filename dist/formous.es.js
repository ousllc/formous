const D = {
  required: {
    // 入力が空でないか確認
    validate: (e, t) => {
      var a;
      return !(t.hasAttribute("required") || ((a = t.getAttribute("data-validation")) == null ? void 0 : a.includes("required"))) || e.trim().length > 0;
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
      const a = r.querySelectorAll('input[type="checkbox"]'), n = parseInt(r.getAttribute("data-group-min") || "0", 10), l = r.getAttribute("data-group-max") ? parseInt(r.getAttribute("data-group-max") || "0", 10) : a.length, u = Array.from(a).filter((f) => f.checked).length;
      return !r.getAttribute("data-group-min") && u > l || !r.getAttribute("data-group-max") && u < n ? !1 : u >= n && u <= l;
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
  }
}, E = { ...D };
function W(e) {
  Object.assign(E, e);
}
function S(e, t, r = !1) {
  var b, y;
  const a = e.closest("fieldset[data-validation]");
  let n = !0, l = {};
  const u = [
    { attr: "required", type: "required" },
    { attr: "min", type: "min" },
    { attr: "max", type: "max" },
    { attr: "minlength", type: "minLength" },
    { attr: "maxlength", type: "maxLength" }
  ];
  if (e.type === "email") {
    const s = E.email;
    s && !s.validate(e.value, e) && (l.email = s.message(e), n = !1);
  }
  u.forEach((s) => {
    var o;
    if (e.hasAttribute(s.attr)) {
      const g = E[s.type];
      if (g && !g.validate(e.value, e)) {
        const x = (o = t == null ? void 0 : t.validationMessages) == null ? void 0 : o[s.type], p = typeof g.message == "function" ? g.message(e) : g.message;
        l[s.type] = x || p, n = !1;
      }
    }
  }), (a ? ((b = a.getAttribute("data-validation")) == null ? void 0 : b.split(" ")) || [] : ((y = e.getAttribute("data-validation")) == null ? void 0 : y.split(" ")) || []).forEach((s) => {
    const o = E[s];
    o && (o.validate(e.value, e) || (l[s] = o.message(e), n = !1));
  });
  const i = a || e.closest("div");
  if (i) {
    const s = i.querySelectorAll('[data-validation="error"]');
    I(s, l, e, t);
  }
  const h = e.getAttribute("name");
  if (h) {
    const s = document.querySelectorAll(`[data-validation="error"][data-validation-for="${h}"]`), o = document.querySelector("[data-validation-error-global]");
    (r || o != null && o.classList.contains("active")) && I(s, l, e, t);
    const g = Array.from(s).some(
      (x) => x.style.display === "block"
    );
    o == null || o.classList.toggle("active", g);
  }
  return n;
}
function N(e, t, r, a) {
  var u, f, i;
  if (console.log("Debug getErrorMessage:", {
    type: e,
    errorsByType: r,
    hasError: r[e],
    options: a,
    validationMessages: a == null ? void 0 : a.validationMessages,
    optionMessage: (u = a == null ? void 0 : a.validationMessages) == null ? void 0 : u[e]
  }), !r[e])
    return "";
  const n = (f = t.closest("div")) == null ? void 0 : f.querySelector(`[data-validation-type="${e}"]`);
  if (n != null && n.hasAttribute("data-error-fixed"))
    return console.log("Using fixed message:", n.innerHTML), n.innerHTML;
  const l = (i = a == null ? void 0 : a.validationMessages) == null ? void 0 : i[e];
  if (l) {
    if (console.log("Using option message:", l), typeof l == "function") {
      const h = l(t);
      return console.log("Function message result:", h), h;
    }
    return l;
  }
  return console.log("Using default message:", r[e]), r[e];
}
function I(e, t, r, a) {
  const n = e.length === 1, l = Object.keys(t).length > 0;
  e.forEach((u) => {
    var y, s;
    const f = u.getAttribute("data-validation-type"), i = u, h = i.innerHTML.trim(), b = i.hasAttribute("data-error-fixed");
    if (f) {
      const o = N(f, r, t, a);
      if (b) {
        i.style.display = t[f] ? "block" : "none";
        return;
      }
      ((y = a == null ? void 0 : a.validationMessages) == null ? void 0 : y[f]) ? i.innerHTML = o : h || (i.innerHTML = o), i.style.display = t[f] ? "block" : "none";
    } else if (n) {
      const o = Object.keys(t)[0], g = N(o, r, t, a);
      b || ((s = a == null ? void 0 : a.validationMessages) != null && s[o] || !h) && (i.innerHTML = g), i.style.display = l ? "block" : "none";
    }
  });
}
function P(e, t = {}) {
  const {
    offset: r = 50,
    behavior: a = "smooth",
    duration: n = "0.5s"
  } = t;
  document.documentElement.style.setProperty("scroll-behavior", a), document.documentElement.style.setProperty("transition-duration", n), document.documentElement.style.setProperty("scroll-timeline-name", "scroll"), e.style.scrollMargin = `${r}px`, e.scrollIntoView({
    behavior: a,
    block: "nearest",
    // 最も近い位置にスクロール
    inline: "nearest"
  }), setTimeout(() => {
    document.documentElement.style.removeProperty("scroll-behavior"), document.documentElement.style.removeProperty("transition-duration"), document.documentElement.style.removeProperty("scroll-timeline-name"), setTimeout(() => {
      e.focus();
    }, 2e3);
  }, parseFloat(n) * 1e3);
}
function M(e, t) {
  const r = e.querySelectorAll("input, textarea, select");
  let a = !0, n = null;
  return r.forEach((l) => {
    S(l, t, !0) || (a = !1, n || (n = l));
  }), !a && n && setTimeout(() => {
    n && P(n, t.scrollOptions);
  }, 0), a;
}
function j(e, t = !1, r) {
  const {
    stepSelector: a = ".step",
    progressFillSelector: n = "#progress-fill",
    indicatorSelector: l = ".step-indicator",
    progressSelector: u = "#step-progress",
    activeClass: f = "active"
  } = (r == null ? void 0 : r.stepOptions) || {};
  let i = Array.from(e.querySelectorAll(a));
  const h = e.querySelector(n), b = e.querySelectorAll(l), y = e.querySelector(u);
  let s = 0;
  if (t) {
    let c = e.querySelector('.step[data-confirmation="true"]');
    c || (c = document.createElement("div"), c.classList.add("step"), c.setAttribute("data-confirmation", "true"), c.innerHTML = `
              <h3>Confirmation</h3>
              <div id="confirmation-content"></div>
              <button type="button" data-action="previous">Back</button>
              <button type="submit">Submit</button>
            `, e.appendChild(c)), i = Array.from(e.querySelectorAll(a));
  }
  const o = (c) => {
    const m = e.querySelector('.step[data-confirmation="true"]');
    if (!m) return;
    m.querySelectorAll("[data-confirm]").forEach((v) => {
      var V, F;
      const A = v.getAttribute("data-confirm");
      if (!A) return;
      if ((V = e.querySelector(`fieldset input[name="${A}"]`)) == null ? void 0 : V.closest("fieldset")) {
        const q = e.querySelectorAll(`input[name="${A}"]:checked`), C = Array.from(q).map((H) => {
          const w = H.nextElementSibling;
          return (w == null ? void 0 : w.textContent) || "";
        }).filter(Boolean), O = ((F = c.confirmationOptions) == null ? void 0 : F.delimiter) || ",";
        v.textContent = C.join(O);
      } else {
        const q = e.querySelector(`[name="${A}"]`);
        q ? v.textContent = q.value || "未入力" : v.textContent = "未入力";
      }
    });
  }, g = () => {
    const c = (s + 1) / i.length * 100;
    h && (h.style.width = `${c}%`), b.forEach((m, d) => {
      m.classList.toggle("active", d <= s);
    }), y && (y.textContent = `Step ${s + 1}/${i.length}`);
  }, x = () => {
    const m = i[s].querySelectorAll(
      'input, textarea, select, [contenteditable="true"], button[role="combobox"], div[role="listbox"], div[role="slider"], div[role="spinbutton"]'
    );
    let d = !0;
    return m.forEach((v) => {
      S(v, r) || (d = !1);
    }), d;
  }, p = (c) => {
    i.forEach((A, k) => A.classList.toggle(f, k === c)), s = c, g();
    const m = i[s], d = m.querySelector('[data-action="next"]'), v = m.querySelector('[data-action="confirm"]');
    t && s === i.length - 2 ? (d && (d.style.display = "none"), v && (v.style.display = "inline-block")) : (d && (d.style.display = "inline-block"), v && (v.style.display = "none")), t && s === i.length - 1 && o(r || {
      formSelector: "#step-form",
      confirmationOptions: {
        delimiter: "、"
      }
    });
  }, L = () => {
    if (!x()) {
      const d = i[s].querySelector("input:invalid, textarea:invalid, select:invalid");
      d && P(d, r == null ? void 0 : r.scrollOptions);
      return;
    }
    s < i.length - 1 && p(s + 1);
  }, $ = () => {
    s > 0 && p(s - 1);
  }, T = (c) => {
    c > s && !x() || p(c);
  };
  return p(s), e.addEventListener("click", (c) => {
    const m = c.target;
    if (m.tagName === "BUTTON") {
      const d = m.getAttribute("data-action");
      if (d === "next" || d === "confirm") L();
      else if (d === "previous") $();
      else if (d === "edit") {
        const v = parseInt(m.getAttribute("data-target-step") || "1") - 1;
        p(v);
      }
    }
  }), b.forEach((c, m) => {
    c.addEventListener("click", () => T(m));
  }), {
    showStep: p,
    handleNext: L,
    handlePrevious: $,
    updateProgressBar: g,
    updateConfirmationPage: o
  };
}
const U = {
  required: {
    message: "This field is required"
  }
}, z = U.required;
console.log(`Custom rule found: ${z.message}`);
typeof window < "u" && (window.Webflow = window.Webflow || []);
const _ = (e) => {
  if (e.enableWebflow) {
    window.Webflow.push(() => {
      R(e);
    });
    return;
  }
  return R(e);
};
function R(e) {
  const t = document.querySelector(e.formSelector);
  if (!t) {
    console.error("Form not found");
    return;
  }
  return e.customRules && W(e.customRules), t.querySelectorAll("input, textarea, select").forEach((a) => {
    a.addEventListener("input", () => S(a, e, !1)), a.addEventListener("blur", () => S(a, e, !1));
  }), e.enableWebflow && (t.setAttribute("novalidate", "true"), t.querySelectorAll('[data-validation="error"]').forEach((a) => {
    a.style.display = "none";
  })), t.addEventListener("submit", async (a) => {
    if (e.enableWebflow) {
      if (!M(t, e)) {
        a.preventDefault(), a.stopPropagation();
        return;
      }
      return;
    }
    if (a.preventDefault(), !M(t, e)) {
      const u = t.querySelector("input:invalid, textarea:invalid, select:invalid");
      u && P(u, e.scrollOptions);
      return;
    }
    const l = new FormData(t);
    try {
      "onSubmit" in e && await e.onSubmit(l);
    } catch (u) {
      console.error("Error:", u);
    }
  }), e.enableConfirmationPage ? j(t, !0, e) : {
    validateForm: () => M(t, e),
    validateField: (a) => S(a, e)
  };
}
typeof window < "u" && (window.Formous = _);
export {
  _ as Formous
};
