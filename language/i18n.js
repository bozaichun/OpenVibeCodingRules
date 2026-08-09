/**
 * OpenVibeCodingRules · README.html i18n 运行时
 * 依赖：languages.js、messages.js（先加载）
 */
(function () {
  var STORAGE_KEY = "ovcr-ui-lang";
  var languages = window.__OVCR_LANGUAGES__ || [];
  var messages = window.__OVCR_MESSAGES__ || {};
  var defaultCode = "zh-CN";

  function getSaved() {
    try {
      return localStorage.getItem(STORAGE_KEY) || "";
    } catch (e) {
      return "";
    }
  }

  function save(code) {
    try {
      localStorage.setItem(STORAGE_KEY, code);
    } catch (e) {
      /* ignore */
    }
  }

  function resolveCode(code) {
    if (code && messages[code]) return code;
    var nav = (navigator.language || "").toLowerCase();
    if (nav.indexOf("zh-tw") === 0 || nav.indexOf("zh-hk") === 0) return "zh-TW";
    if (nav.indexOf("zh") === 0) return "zh-CN";
    if (nav.indexOf("ru") === 0) return "ru";
    if (nav.indexOf("ja") === 0) return "ja";
    if (nav.indexOf("en") === 0) return "en";
    return defaultCode;
  }

  function meta(code) {
    for (var i = 0; i < languages.length; i++) {
      if (languages[i].code === code) return languages[i];
    }
    return { code: code, name: code, dir: "ltr" };
  }

  function t(code, key) {
    var pack = messages[code] || messages[defaultCode] || {};
    if (pack[key] != null) return pack[key];
    var fallback = messages[defaultCode] || {};
    return fallback[key] != null ? fallback[key] : key;
  }

  function apply(code) {
    var pack = messages[code] || messages[defaultCode];
    if (!pack) return;
    var info = meta(code);
    document.documentElement.lang = code;
    document.documentElement.dir = info.dir || "ltr";

    var nodes = document.querySelectorAll("[data-i18n]");
    for (var i = 0; i < nodes.length; i++) {
      var el = nodes[i];
      var key = el.getAttribute("data-i18n");
      if (!key) continue;
      var val = t(code, key);
      if (el.hasAttribute("data-i18n-html")) {
        el.innerHTML = val;
      } else {
        el.textContent = val;
      }
    }

    var attrs = document.querySelectorAll("[data-i18n-aria]");
    for (var j = 0; j < attrs.length; j++) {
      var a = attrs[j];
      a.setAttribute("aria-label", t(code, a.getAttribute("data-i18n-aria")));
    }

    var titles = document.querySelectorAll("[data-i18n-title]");
    for (var k = 0; k < titles.length; k++) {
      var n = titles[k];
      n.setAttribute("title", t(code, n.getAttribute("data-i18n-title")));
    }

    var select = document.getElementById("lang-switch");
    if (select && select.value !== code) select.value = code;

    document.dispatchEvent(
      new CustomEvent("ovcr:langchange", { detail: { code: code, dir: info.dir } })
    );
  }

  function mountSwitcher() {
    var select = document.getElementById("lang-switch");
    if (!select) return;
    select.innerHTML = "";
    for (var i = 0; i < languages.length; i++) {
      var lang = languages[i];
      var opt = document.createElement("option");
      opt.value = lang.code;
      opt.textContent = lang.name;
      select.appendChild(opt);
    }
    select.addEventListener("change", function () {
      var code = resolveCode(select.value);
      save(code);
      apply(code);
    });
  }

  function init() {
    mountSwitcher();
    var code = resolveCode(getSaved());
    save(code);
    apply(code);
  }

  window.OVCR_I18N = {
    t: function (key) {
      return t(resolveCode(getSaved()), key);
    },
    setLang: function (code) {
      code = resolveCode(code);
      save(code);
      apply(code);
    },
    getLang: function () {
      return resolveCode(getSaved());
    },
    apply: apply,
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
