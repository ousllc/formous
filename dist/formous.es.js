const R = {
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
      const a = r.querySelectorAll('input[type="checkbox"]'), n = parseInt(r.getAttribute("data-group-min") || "0", 10), s = r.getAttribute("data-group-max") ? parseInt(r.getAttribute("data-group-max") || "0", 10) : a.length, l = Array.from(a).filter((o) => o.checked).length;
      return !r.getAttribute("data-group-min") && l > s || !r.getAttribute("data-group-max") && l < n ? !1 : l >= n && l <= s;
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
}, S = { ...R };
function I(e) {
  Object.assign(S, e);
}
function x(e, t, r = !1) {
  var y, v;
  const a = e.closest("fieldset[data-validation]");
  let n = !0, s = {};
  const l = [
    { attr: "required", type: "required" },
    { attr: "min", type: "min" },
    { attr: "max", type: "max" },
    { attr: "minlength", type: "minLength" },
    { attr: "maxlength", type: "maxLength" }
  ];
  if (e.type === "email") {
    const c = S.email;
    c && !c.validate(e.value, e) && (s.email = c.message(e), n = !1);
  }
  l.forEach((c) => {
    var m;
    if (e.hasAttribute(c.attr)) {
      const g = S[c.type];
      if (g && !g.validate(e.value, e)) {
        const i = (m = t == null ? void 0 : t.validationMessages) == null ? void 0 : m[c.type], u = typeof g.message == "function" ? g.message(e) : g.message;
        s[c.type] = i || u, n = !1;
      }
    }
  }), (a ? ((y = a.getAttribute("data-validation")) == null ? void 0 : y.split(" ")) || [] : ((v = e.getAttribute("data-validation")) == null ? void 0 : v.split(" ")) || []).forEach((c) => {
    const m = S[c];
    m && (m.validate(e.value, e) || (s[c] = m.message(e), n = !1));
  });
  const h = a || e.closest("div");
  if (h) {
    const c = h.querySelectorAll('[data-validation="error"]');
    k(c, s, e, t);
  }
  const b = e.getAttribute("name");
  if (b) {
    const c = document.querySelectorAll(`[data-validation="error"][data-validation-for="${b}"]`), m = document.querySelector("[data-validation-error-global]");
    (r || m != null && m.classList.contains("active")) && k(c, s, e, t);
    const g = Array.from(c).some(
      (i) => i.style.display === "block"
    );
    m == null || m.classList.toggle("active", g);
  }
  return n;
}
function C(e, t, r, a) {
  var l, o, h;
  if (console.log("Debug getErrorMessage:", {
    type: e,
    errorsByType: r,
    hasError: r[e],
    options: a,
    validationMessages: a == null ? void 0 : a.validationMessages,
    optionMessage: (l = a == null ? void 0 : a.validationMessages) == null ? void 0 : l[e]
  }), !r[e])
    return "";
  const n = (o = t.closest("div")) == null ? void 0 : o.querySelector(`[data-validation-type="${e}"]`);
  if (n != null && n.hasAttribute("data-error-fixed"))
    return console.log("Using fixed message:", n.innerHTML), n.innerHTML;
  const s = (h = a == null ? void 0 : a.validationMessages) == null ? void 0 : h[e];
  if (s) {
    if (console.log("Using option message:", s), typeof s == "function") {
      const b = s(t);
      return console.log("Function message result:", b), b;
    }
    return s;
  }
  return console.log("Using default message:", r[e]), r[e];
}
function k(e, t, r, a) {
  e.forEach((n) => {
    const s = n.getAttribute("data-validation-type");
    if (s && Object.keys(t).length > 0) {
      const l = C(s, r, t, a);
      n.hasAttribute("data-error-fixed") || (n.innerHTML = l), n.style.display = t[s] ? "block" : "none";
    }
  });
}
function w(e, t = {}) {
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
function E(e, t) {
  const r = e.querySelectorAll("input, textarea, select");
  let a = !0, n = null;
  return r.forEach((s) => {
    x(s, t, !0) || (a = !1, n || (n = s));
  }), !a && n && setTimeout(() => {
    n && w(n, t.scrollOptions);
  }, 0), a;
}
function T(e, t = !1, r) {
  let a = Array.from(e.querySelectorAll(".step"));
  const n = e.querySelector("#progress-fill"), s = e.querySelectorAll(".step-indicator"), l = e.querySelector("#step-progress");
  let o = 0;
  if (t) {
    let i = e.querySelector('.step[data-confirmation="true"]');
    i || (i = document.createElement("div"), i.classList.add("step"), i.setAttribute("data-confirmation", "true"), i.innerHTML = `
              <h3>Confirmation</h3>
              <div id="confirmation-content"></div>
              <button type="button" data-action="previous">Back</button>
              <button type="submit">Submit</button>
            `, e.appendChild(i)), a = Array.from(e.querySelectorAll(".step"));
  }
  const h = (i) => {
    const u = e.querySelector('.step[data-confirmation="true"]');
    if (!u) return;
    u.querySelectorAll("[data-confirm]").forEach((f) => {
      var $, L;
      const p = f.getAttribute("data-confirm");
      if (!p) return;
      if (($ = e.querySelector(`fieldset input[name="${p}"]`)) == null ? void 0 : $.closest("fieldset")) {
        const A = e.querySelectorAll(`input[name="${p}"]:checked`), F = Array.from(A).map((N) => {
          const q = N.nextElementSibling;
          return (q == null ? void 0 : q.textContent) || "";
        }).filter(Boolean), M = ((L = i.confirmationOptions) == null ? void 0 : L.delimiter) || ",";
        f.textContent = F.join(M);
      } else {
        const A = e.querySelector(`[name="${p}"]`);
        A ? f.textContent = A.value || "未入力" : f.textContent = "未入力";
      }
    });
  }, b = () => {
    const i = (o + 1) / a.length * 100;
    n && (n.style.width = `${i}%`), s.forEach((u, d) => {
      u.classList.toggle("active", d <= o);
    }), l && (l.textContent = `Step ${o + 1}/${a.length}`);
  }, y = () => {
    const u = a[o].querySelectorAll(
      'input, textarea, select, [contenteditable="true"], button[role="combobox"], div[role="listbox"], div[role="slider"], div[role="spinbutton"]'
    );
    let d = !0;
    return u.forEach((f) => {
      x(f, r) || (d = !1);
    }), d;
  }, v = (i) => {
    a.forEach((p, P) => p.classList.toggle("active", P === i)), o = i, b();
    const u = a[o], d = u.querySelector('[data-action="next"]'), f = u.querySelector('[data-action="confirm"]');
    t && o === a.length - 2 ? (d && (d.style.display = "none"), f && (f.style.display = "inline-block")) : (d && (d.style.display = "inline-block"), f && (f.style.display = "none")), t && o === a.length - 1 && h(r || {
      formSelector: "#step-form",
      confirmationOptions: {
        delimiter: "、"
      }
    });
  }, c = () => {
    if (!y()) {
      const d = a[o].querySelector("input:invalid, textarea:invalid, select:invalid");
      d && w(d, r == null ? void 0 : r.scrollOptions);
      return;
    }
    o < a.length - 1 && v(o + 1);
  }, m = () => {
    o > 0 && v(o - 1);
  }, g = (i) => {
    i > o && !y() || v(i);
  };
  return v(o), e.addEventListener("click", (i) => {
    const u = i.target;
    if (u.tagName === "BUTTON") {
      const d = u.getAttribute("data-action");
      if (d === "next" || d === "confirm") c();
      else if (d === "previous") m();
      else if (d === "edit") {
        const f = parseInt(u.getAttribute("data-target-step") || "1") - 1;
        v(f);
      }
    }
  }), s.forEach((i, u) => {
    i.addEventListener("click", () => g(u));
  }), {
    showStep: v,
    handleNext: c,
    handlePrevious: m,
    updateProgressBar: b,
    updateConfirmationPage: h
  };
}
const O = {
  required: {
    message: "This field is required"
  }
}, D = O.required;
console.log(`Custom rule found: ${D.message}`);
typeof window < "u" && (window.Webflow = window.Webflow || []);
const H = (e) => {
  if (e.enableWebflow) {
    window.Webflow.push(() => {
      V(e);
    });
    return;
  }
  return V(e);
};
function V(e) {
  const t = document.querySelector(e.formSelector);
  if (!t) {
    console.error("Form not found");
    return;
  }
  return e.customRules && I(e.customRules), t.querySelectorAll("input, textarea, select").forEach((a) => {
    a.addEventListener("input", () => x(a, e, !1)), a.addEventListener("blur", () => x(a, e, !1));
  }), e.enableWebflow && (t.setAttribute("novalidate", "true"), t.querySelectorAll('[data-validation="error"]').forEach((a) => {
    a.style.display = "none";
  })), t.addEventListener("submit", async (a) => {
    if (e.enableWebflow) {
      if (!E(t, e)) {
        a.preventDefault(), a.stopPropagation();
        return;
      }
      return;
    }
    if (a.preventDefault(), !E(t, e)) {
      const l = t.querySelector("input:invalid, textarea:invalid, select:invalid");
      l && w(l, e.scrollOptions);
      return;
    }
    const s = new FormData(t);
    try {
      "onSubmit" in e && await e.onSubmit(s);
    } catch (l) {
      console.error("Error:", l);
    }
  }), e.enableConfirmationPage ? T(t, !0, e) : {
    validateForm: () => E(t, e),
    validateField: (a) => x(a, e)
  };
}
typeof window < "u" && (window.Formous = H);
export {
  H as Formous
};
