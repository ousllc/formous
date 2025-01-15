"use strict";Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const R={required:{validate:(e,t)=>{var a;return!(t.hasAttribute("required")||((a=t.getAttribute("data-validation"))==null?void 0:a.includes("required")))||e.trim().length>0},message:()=>"This field is required."},email:{validate:e=>/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e),message:()=>"Please enter a valid email address."},numeric:{validate:e=>/^[0-9]+$/.test(e),message:()=>"Please enter a valid number."},alphanumeric:{validate:e=>/^[a-zA-Z0-9]+$/.test(e),message:()=>"Please enter only letters and numbers."},minLength:{validate:(e,t)=>{const r=t.getAttribute("minlength");return!r||e.length>=parseInt(r)},message:e=>`Minimum length is ${e.getAttribute("minlength")}`},maxLength:{validate:(e,t)=>{const r=t.getAttribute("maxlength");return r?e.length<=Number(r):!0},message:e=>`Please enter no more than ${e.getAttribute("maxlength")} characters`},min:{validate:(e,t)=>{const r=t.getAttribute("min");if(!r)return!0;const a=Number(e);return!isNaN(a)&&a>=Number(r)},message:e=>`Please enter a value greater than or equal to ${e.getAttribute("min")}`},max:{validate:(e,t)=>{const r=t.getAttribute("max");if(!r)return!0;const a=Number(e);return!isNaN(a)&&a<=Number(r)},message:e=>`Please enter a value less than or equal to ${e.getAttribute("max")}`},pattern:{validate:(e,t)=>{const r=t.getAttribute("data-pattern");return r?new RegExp(r).test(e):!0},message:e=>`Please match the requested format: ${e.getAttribute("data-pattern")}.`},url:{validate:e=>/^(https?:\/\/)?([\w\-]+)+([\w\-.]+)+(:\d+)?(\/[\w\-]*)*(\?[\w\-=&]*)?(#[\w\-]*)?$/.test(e),message:()=>"Please enter a valid URL."},date:{validate:e=>!isNaN(Date.parse(e)),message:()=>"Please enter a valid date."},time:{validate:e=>/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(e),message:()=>"Please enter a valid time in HH:MM format."},phone:{validate:e=>/^\+?[0-9\- ]{7,15}$/.test(e),message:()=>"Please enter a valid phone number."},postalCode:{validate:e=>/^[0-9]{3}-?[0-9]{4}$/.test(e),message:()=>"Please enter a valid postal code."},equals:{validate:(e,t)=>{const r=t.getAttribute("data-equals"),a=r?document.getElementById(r):null;return a?e===a.value:!0},message:()=>"Values do not match."},checkboxRequired:{validate:(e,t)=>t.checked,message:()=>"This checkbox is required."},fileRequired:{validate:(e,t)=>{const r=t.files;return r!==null&&r.length>0},message:()=>"Please upload a file."},accepted:{validate:e=>["yes","on","1","true"].includes(e.toLowerCase()),message:()=>"This field must be accepted."},json:{validate:e=>{try{return JSON.parse(e),!0}catch{return!1}},message:()=>"Please enter a valid JSON string."},"checkbox-group":{validate:(e,t)=>{const r=t.closest('fieldset[data-validation="checkbox-group"]');if(!r)return!0;const a=r.querySelectorAll('input[type="checkbox"]'),n=parseInt(r.getAttribute("data-group-min")||"0",10),l=r.getAttribute("data-group-max")?parseInt(r.getAttribute("data-group-max")||"0",10):a.length,o=Array.from(a).filter(s=>s.checked).length;return!r.getAttribute("data-group-min")&&o>l||!r.getAttribute("data-group-max")&&o<n?!1:o>=n&&o<=l},message:e=>{const t=e.closest('fieldset[data-validation="checkbox-group"]'),r=(t==null?void 0:t.getAttribute("data-group-min"))||"0",a=(t==null?void 0:t.getAttribute("data-group-max"))||"∞";return t!=null&&t.getAttribute("data-group-min")?t!=null&&t.getAttribute("data-group-max")?`Please select between ${r} and ${a} options.`:`Please select at least ${r} options.`:`Please select at most ${a} options.`}},"confirm-email":{validate:(e,t)=>{var a;const r=(a=t.form)==null?void 0:a.querySelector('input[data-validation~="email"]');return!r||!r.value?!0:e===r.value},message:()=>"Email addresses do not match."}},S={...R};function O(e){Object.assign(S,e)}function x(e,t,r=!1){var y,b;const a=e.closest("fieldset[data-validation]");let n=!0,l={};const o=[{attr:"required",type:"required"},{attr:"min",type:"min"},{attr:"max",type:"max"},{attr:"minlength",type:"minLength"},{attr:"maxlength",type:"maxLength"}];if(e.type==="email"){const c=S.email;c&&!c.validate(e.value,e)&&(l.email=c.message(e),n=!1)}o.forEach(c=>{var u;if(e.hasAttribute(c.attr)){const f=S[c.type];if(f&&!f.validate(e.value,e)){const i=(u=t==null?void 0:t.validationMessages)==null?void 0:u[c.type],d=typeof f.message=="function"?f.message(e):f.message;l[c.type]=i||d,n=!1}}}),(a?((y=a.getAttribute("data-validation"))==null?void 0:y.split(" "))||[]:((b=e.getAttribute("data-validation"))==null?void 0:b.split(" "))||[]).forEach(c=>{const u=S[c];u&&(u.validate(e.value,e)||(l[c]=u.message(e),n=!1))});const g=a||e.closest("div");if(g){const c=g.querySelectorAll('[data-validation="error"]');k(c,l,e,t)}const h=e.getAttribute("name");if(h){const c=document.querySelectorAll(`[data-validation="error"][data-validation-for="${h}"]`),u=document.querySelector("[data-validation-error-global]");(r||u!=null&&u.classList.contains("active"))&&k(c,l,e,t);const f=Array.from(c).some(i=>i.style.display==="block");u==null||u.classList.toggle("active",f)}return n}function $(e,t,r,a){var o,s,g;if(console.log("Debug getErrorMessage:",{type:e,errorsByType:r,hasError:r[e],options:a,validationMessages:a==null?void 0:a.validationMessages,optionMessage:(o=a==null?void 0:a.validationMessages)==null?void 0:o[e]}),!r[e])return"";const n=(s=t.closest("div"))==null?void 0:s.querySelector(`[data-validation-type="${e}"]`);if(n!=null&&n.hasAttribute("data-error-fixed"))return console.log("Using fixed message:",n.innerHTML),n.innerHTML;const l=(g=a==null?void 0:a.validationMessages)==null?void 0:g[e];if(l){if(console.log("Using option message:",l),typeof l=="function"){const h=l(t);return console.log("Function message result:",h),h}return l}return console.log("Using default message:",r[e]),r[e]}function k(e,t,r,a){const n=e.length===1,l=Object.keys(t).length>0;e.forEach(o=>{var b,c;const s=o.getAttribute("data-validation-type"),g=o,h=g.innerHTML.trim(),y=g.hasAttribute("data-error-fixed");if(s){const u=$(s,r,t,a);if(y){g.style.display=t[s]?"block":"none";return}((b=a==null?void 0:a.validationMessages)==null?void 0:b[s])?g.innerHTML=u:h||(g.innerHTML=u),g.style.display=t[s]?"block":"none"}else if(n){const u=Object.keys(t)[0],f=$(u,r,t,a);y||((c=a==null?void 0:a.validationMessages)!=null&&c[u]||!h)&&(g.innerHTML=f),g.style.display=l?"block":"none"}})}function w(e,t={}){const{offset:r=50,behavior:a="smooth",duration:n="0.5s"}=t;document.documentElement.style.setProperty("scroll-behavior",a),document.documentElement.style.setProperty("transition-duration",n),document.documentElement.style.setProperty("scroll-timeline-name","scroll"),e.style.scrollMargin=`${r}px`,e.scrollIntoView({behavior:a,block:"nearest",inline:"nearest"}),setTimeout(()=>{document.documentElement.style.removeProperty("scroll-behavior"),document.documentElement.style.removeProperty("transition-duration"),document.documentElement.style.removeProperty("scroll-timeline-name"),setTimeout(()=>{e.focus()},2e3)},parseFloat(n)*1e3)}function E(e,t){const r=e.querySelectorAll("input, textarea, select");let a=!0,n=null;return r.forEach(l=>{x(l,t,!0)||(a=!1,n||(n=l))}),!a&&n&&setTimeout(()=>{n&&w(n,t.scrollOptions)},0),a}function C(e,t=!1,r){let a=Array.from(e.querySelectorAll(".step"));const n=e.querySelector("#progress-fill"),l=e.querySelectorAll(".step-indicator"),o=e.querySelector("#step-progress");let s=0;if(t){let i=e.querySelector('.step[data-confirmation="true"]');i||(i=document.createElement("div"),i.classList.add("step"),i.setAttribute("data-confirmation","true"),i.innerHTML=`
              <h3>Confirmation</h3>
              <div id="confirmation-content"></div>
              <button type="button" data-action="previous">Back</button>
              <button type="submit">Submit</button>
            `,e.appendChild(i)),a=Array.from(e.querySelectorAll(".step"))}const g=i=>{const d=e.querySelector('.step[data-confirmation="true"]');if(!d)return;d.querySelectorAll("[data-confirm]").forEach(v=>{var P,L;const p=v.getAttribute("data-confirm");if(!p)return;if((P=e.querySelector(`fieldset input[name="${p}"]`))==null?void 0:P.closest("fieldset")){const A=e.querySelectorAll(`input[name="${p}"]:checked`),N=Array.from(A).map(I=>{const q=I.nextElementSibling;return(q==null?void 0:q.textContent)||""}).filter(Boolean),T=((L=i.confirmationOptions)==null?void 0:L.delimiter)||",";v.textContent=N.join(T)}else{const A=e.querySelector(`[name="${p}"]`);A?v.textContent=A.value||"未入力":v.textContent="未入力"}})},h=()=>{const i=(s+1)/a.length*100;n&&(n.style.width=`${i}%`),l.forEach((d,m)=>{d.classList.toggle("active",m<=s)}),o&&(o.textContent=`Step ${s+1}/${a.length}`)},y=()=>{const d=a[s].querySelectorAll('input, textarea, select, [contenteditable="true"], button[role="combobox"], div[role="listbox"], div[role="slider"], div[role="spinbutton"]');let m=!0;return d.forEach(v=>{x(v,r)||(m=!1)}),m},b=i=>{a.forEach((p,M)=>p.classList.toggle("active",M===i)),s=i,h();const d=a[s],m=d.querySelector('[data-action="next"]'),v=d.querySelector('[data-action="confirm"]');t&&s===a.length-2?(m&&(m.style.display="none"),v&&(v.style.display="inline-block")):(m&&(m.style.display="inline-block"),v&&(v.style.display="none")),t&&s===a.length-1&&g(r||{formSelector:"#step-form",confirmationOptions:{delimiter:"、"}})},c=()=>{if(!y()){const m=a[s].querySelector("input:invalid, textarea:invalid, select:invalid");m&&w(m,r==null?void 0:r.scrollOptions);return}s<a.length-1&&b(s+1)},u=()=>{s>0&&b(s-1)},f=i=>{i>s&&!y()||b(i)};return b(s),e.addEventListener("click",i=>{const d=i.target;if(d.tagName==="BUTTON"){const m=d.getAttribute("data-action");if(m==="next"||m==="confirm")c();else if(m==="previous")u();else if(m==="edit"){const v=parseInt(d.getAttribute("data-target-step")||"1")-1;b(v)}}}),l.forEach((i,d)=>{i.addEventListener("click",()=>f(d))}),{showStep:b,handleNext:c,handlePrevious:u,updateProgressBar:h,updateConfirmationPage:g}}const H={required:{message:"This field is required"}},j=H.required;console.log(`Custom rule found: ${j.message}`);typeof window<"u"&&(window.Webflow=window.Webflow||[]);const F=e=>{if(e.enableWebflow){window.Webflow.push(()=>{V(e)});return}return V(e)};function V(e){const t=document.querySelector(e.formSelector);if(!t){console.error("Form not found");return}return e.customRules&&O(e.customRules),t.querySelectorAll("input, textarea, select").forEach(a=>{a.addEventListener("input",()=>x(a,e,!1)),a.addEventListener("blur",()=>x(a,e,!1))}),e.enableWebflow&&(t.setAttribute("novalidate","true"),t.querySelectorAll('[data-validation="error"]').forEach(a=>{a.style.display="none"})),t.addEventListener("submit",async a=>{if(e.enableWebflow){if(!E(t,e)){a.preventDefault(),a.stopPropagation();return}return}if(a.preventDefault(),!E(t,e)){const o=t.querySelector("input:invalid, textarea:invalid, select:invalid");o&&w(o,e.scrollOptions);return}const l=new FormData(t);try{"onSubmit"in e&&await e.onSubmit(l)}catch(o){console.error("Error:",o)}}),e.enableConfirmationPage?C(t,!0,e):{validateForm:()=>E(t,e),validateField:a=>x(a,e)}}typeof window<"u"&&(window.Formous=F);exports.Formous=F;
