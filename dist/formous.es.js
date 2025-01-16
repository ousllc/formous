const T = {
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
      const a = r.querySelectorAll('input[type="checkbox"]'), n = parseInt(r.getAttribute("data-group-min") || "0", 10), i = r.getAttribute("data-group-max") ? parseInt(r.getAttribute("data-group-max") || "0", 10) : a.length, s = Array.from(a).filter((m) => m.checked).length;
      return !r.getAttribute("data-group-min") && s > i || !r.getAttribute("data-group-max") && s < n ? !1 : s >= n && s <= i;
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
      var h;
      const a = ((h = r == null ? void 0 : r.validationPatterns) == null ? void 0 : h.password) || {}, n = a.minLength ?? 8, i = a.maxLength ?? 100, s = a.requireUppercase ?? !0, m = a.requireNumber ?? !0, l = a.requireSymbol ?? !0;
      return !(e.length < n || e.length > i || s && !/[A-Z]/.test(e) || m && !/\d/.test(e) || l && !/[!@#$%^&*]/.test(e));
    },
    message: (e, t) => {
      var h;
      const r = ((h = t == null ? void 0 : t.validationPatterns) == null ? void 0 : h.password) || {}, a = r.minLength ?? 8, n = r.maxLength ?? 100, i = r.requireUppercase ?? !0, s = r.requireNumber ?? !0, m = r.requireSymbol ?? !0, l = [];
      return l.push(`at least ${a} characters${n !== 100 ? `, maximum ${n} characters` : ""}`), i && l.push("uppercase letter"), s && l.push("number"), m && l.push("special character (!@#$%^&*)"), `Password must contain ${l.join(", ")}`;
    }
  }
}, A = { ...T };
function H(e) {
  Object.assign(A, e);
}
function E(e, t, r = !1) {
  var d, p;
  const a = e.closest("fieldset[data-validation]");
  let n = !0, i = {};
  const s = [
    { attr: "required", type: "required" },
    { attr: "min", type: "min" },
    { attr: "max", type: "max" },
    { attr: "minlength", type: "minLength" },
    { attr: "maxlength", type: "maxLength" }
  ];
  if (e.type === "email") {
    const o = A.email;
    o && !o.validate(e.value, e) && (i.email = o.message(e), n = !1);
  }
  s.forEach((o) => {
    var c;
    if (e.hasAttribute(o.attr)) {
      const f = A[o.type];
      if (f && !f.validate(e.value, e)) {
        const y = (c = t == null ? void 0 : t.validationMessages) == null ? void 0 : c[o.type], q = typeof f.message == "function" ? f.message(e) : f.message;
        i[o.type] = y || q, n = !1;
      }
    }
  }), (a ? ((d = a.getAttribute("data-validation")) == null ? void 0 : d.split(" ")) || [] : ((p = e.getAttribute("data-validation")) == null ? void 0 : p.split(" ")) || []).forEach((o) => {
    const c = A[o];
    c && (c.validate(e.value, e, t) || (i[o] = c.message(e, t), n = !1));
  });
  const l = a || e.closest("div");
  if (l) {
    const o = l.querySelectorAll('[data-validation="error"]');
    V(o, i, e, t);
  }
  const h = e.getAttribute("name");
  if (h) {
    const o = document.querySelectorAll(`[data-validation="error"][data-validation-for="${h}"]`), c = document.querySelector("[data-validation-error-global]");
    (r || c != null && c.classList.contains("active")) && V(o, i, e, t);
    const f = Array.from(o).some(
      (y) => y.style.display === "block"
    );
    c == null || c.classList.toggle("active", f);
  }
  return n;
}
function k(e, t, r, a) {
  var s, m, l;
  if (console.log("Debug getErrorMessage:", {
    type: e,
    errorsByType: r,
    hasError: r[e],
    options: a,
    validationMessages: a == null ? void 0 : a.validationMessages,
    optionMessage: (s = a == null ? void 0 : a.validationMessages) == null ? void 0 : s[e]
  }), !r[e])
    return "";
  const n = (m = t.closest("div")) == null ? void 0 : m.querySelector(`[data-validation-type="${e}"]`);
  if (n != null && n.hasAttribute("data-error-fixed"))
    return console.log("Using fixed message:", n.innerHTML), n.innerHTML;
  const i = (l = a == null ? void 0 : a.validationMessages) == null ? void 0 : l[e];
  if (i) {
    if (console.log("Using option message:", i), typeof i == "function") {
      const h = i(t);
      return console.log("Function message result:", h), h;
    }
    return i;
  }
  return console.log("Using default message:", r[e]), r[e];
}
function V(e, t, r, a) {
  const n = e.length === 1, i = Object.keys(t).length > 0;
  e.forEach((s) => {
    var p, o;
    const m = s.getAttribute("data-validation-type"), l = s, h = l.innerHTML.trim(), d = l.hasAttribute("data-error-fixed");
    if (m) {
      const c = k(m, r, t, a);
      if (d) {
        l.style.display = t[m] ? "block" : "none";
        return;
      }
      ((p = a == null ? void 0 : a.validationMessages) == null ? void 0 : p[m]) ? l.innerHTML = c : h || (l.innerHTML = c), l.style.display = t[m] ? "block" : "none";
    } else if (n) {
      const c = Object.keys(t)[0], f = k(c, r, t, a);
      d || ((o = a == null ? void 0 : a.validationMessages) != null && o[c] || !h) && (l.innerHTML = f), l.style.display = i ? "block" : "none";
    }
  });
}
function L(e, t = {}) {
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
function N(e, t) {
  const r = e.querySelectorAll("input, textarea, select");
  let a = !0, n = null;
  return r.forEach((i) => {
    E(i, t, !0) || (a = !1, n || (n = i));
  }), !a && n && setTimeout(() => {
    n && L(n, t.scrollOptions);
  }, 0), a;
}
function U(e, t = !1, r) {
  const {
    progressFillSelector: a = "#progress-fill",
    indicatorSelector: n = ".step-indicator",
    progressSelector: i = "#step-progress"
  } = (r == null ? void 0 : r.stepOptions) || {};
  let s = Array.from(e.querySelectorAll(".step"));
  const m = e.querySelector(a), l = e.querySelectorAll(n), h = e.querySelector(i);
  let d = 0;
  if (t) {
    let u = e.querySelector('.step[data-confirmation="true"]');
    u || (u = document.createElement("div"), u.classList.add("step"), u.setAttribute("data-confirmation", "true"), u.innerHTML = `
              <h3>Confirmation</h3>
              <div id="confirmation-content"></div>
              <button type="button" data-action="previous">Back</button>
              <input type="submit" data-wait="Please wait..." data-action="confirm" value="Submit">
            `, e.appendChild(u)), s = Array.from(e.querySelectorAll(".step"));
  }
  const p = (u) => {
    const v = e.querySelector('.step[data-confirmation="true"]');
    if (!v) return;
    v.querySelectorAll("[data-confirm]").forEach((b) => {
      var $, M;
      const x = b.getAttribute("data-confirm");
      if (!x) return;
      if (($ = e.querySelector(`fieldset input[name="${x}"]`)) == null ? void 0 : $.closest("fieldset")) {
        const S = e.querySelectorAll(`input[name="${x}"]:checked`), R = Array.from(S).map((O) => {
          const w = O.nextElementSibling;
          return (w == null ? void 0 : w.textContent) || "";
        }).filter(Boolean), C = ((M = u.confirmationOptions) == null ? void 0 : M.delimiter) || ",";
        b.textContent = R.join(C);
      } else {
        const S = e.querySelector(`[name="${x}"]`);
        S ? b.textContent = S.value || "未入力" : b.textContent = "未入力";
      }
    });
  }, o = () => {
    const u = (d + 1) / s.length * 100;
    m && (m.style.width = `${u}%`), l.forEach((v, g) => {
      v.classList.toggle("active", g <= d);
    }), h && (h.textContent = `Step ${d + 1}/${s.length}`);
  }, c = () => {
    const v = s[d].querySelectorAll(
      'input, textarea, select, [contenteditable="true"], button[role="combobox"], div[role="listbox"], div[role="slider"], div[role="spinbutton"]'
    );
    let g = !0;
    return v.forEach((b) => {
      E(b, r) || (g = !1);
    }), g;
  }, f = (u) => {
    s.forEach((x, P) => x.classList.toggle("active", P === u)), d = u, o();
    const v = s[d], g = v.querySelector('[data-action="next"]'), b = v.querySelector('[data-action="confirm"]');
    t && d === s.length - 2 ? (g && (g.style.display = "none"), b && (b.style.display = "inline-block")) : (g && (g.style.display = "inline-block"), b && (b.style.display = "none")), t && d === s.length - 1 && p(r || {
      formSelector: "#step-form",
      confirmationOptions: {
        delimiter: "、"
      }
    });
  }, y = () => {
    if (!c()) {
      const g = s[d].querySelector("input:invalid, textarea:invalid, select:invalid");
      g && L(g, r == null ? void 0 : r.scrollOptions);
      return;
    }
    d < s.length - 1 && f(d + 1);
  }, q = () => {
    d > 0 && f(d - 1);
  }, I = (u) => {
    u > d && !c() || f(u);
  };
  return f(d), e.addEventListener("click", (u) => {
    const v = u.target;
    if (v.hasAttribute("data-action")) {
      const g = v.getAttribute("data-action");
      if (g === "next" || g === "confirm") y();
      else if (g === "previous") q();
      else if (g === "edit") {
        const b = parseInt(v.getAttribute("data-target-step") || "1") - 1;
        f(b);
      }
    }
  }), l.forEach((u, v) => {
    u.addEventListener("click", () => I(v));
  }), {
    showStep: f,
    handleNext: y,
    handlePrevious: q,
    updateProgressBar: o,
    updateConfirmationPage: p
  };
}
const j = {
  required: {
    message: "This field is required"
  }
}, D = j.required;
console.log(`Custom rule found: ${D.message}`);
typeof window < "u" && (window.Webflow = window.Webflow || []);
const W = (e) => {
  if (e.enableWebflow) {
    window.Webflow.push(() => {
      F(e);
    });
    return;
  }
  return F(e);
};
function F(e) {
  const t = document.querySelector(e.formSelector);
  if (!t) {
    console.error("Form not found");
    return;
  }
  return e.customRules && H(e.customRules), t.querySelectorAll("input, textarea, select").forEach((a) => {
    a.addEventListener("input", () => E(a, e, !1)), a.addEventListener("blur", () => E(a, e, !1));
  }), e.enableWebflow && (t.setAttribute("novalidate", "true"), t.querySelectorAll('[data-validation="error"]').forEach((a) => {
    a.style.display = "none";
  })), t.addEventListener("submit", async (a) => {
    if (e.enableWebflow) {
      if (!N(t, e)) {
        a.preventDefault(), a.stopPropagation();
        return;
      }
      return;
    }
    if (a.preventDefault(), !N(t, e)) {
      const s = t.querySelector("input:invalid, textarea:invalid, select:invalid");
      s && L(s, e.scrollOptions);
      return;
    }
    const i = new FormData(t);
    try {
      "onSubmit" in e && await e.onSubmit(i);
    } catch (s) {
      console.error("Error:", s);
    }
  }), U(t, e.enableConfirmationPage || !1, e);
}
typeof window < "u" && (window.Formous = W);
export {
  W as Formous
};
