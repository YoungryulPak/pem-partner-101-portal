// Language switching through Google Website Translator (machine translation, no hand-written translations).
// The <select id="lang"> options carry Google language codes. Choosing a language sets Google's "googtrans"
// cookie and reloads; the Google script is only loaded when a non-English language is active.
//
// Provider seam: to use another engine (for example Amazon Translate or Cloud Translation behind our own API,
// needed if pages must not be sent to Google), replace loadProvider() and keep the rest unchanged.
// Pages marked confidential are never sent to the provider: they carry <meta name="google" content="notranslate">
// and this script does not load the provider on them.
(function () {
  var sel = document.getElementById("lang");
  var confidential = document.body.getAttribute("data-confidential") === "1";

  function current() {
    var m = /(?:^|;\s*)googtrans=\/[^\/]*\/([^;]+)/.exec(document.cookie);
    return m ? decodeURIComponent(m[1]) : "en";
  }

  function setCookie(lang) {
    var v = lang === "en" ? "" : "/en/" + lang;
    var exp = lang === "en" ? ";expires=Thu, 01 Jan 1970 00:00:00 GMT" : "";
    document.cookie = "googtrans=" + v + ";path=/" + exp;
    if (location.hostname.indexOf(".") > -1) {
      document.cookie = "googtrans=" + v + ";path=/;domain=." + location.hostname + exp;
    }
  }

  function loadProvider(langs) {
    window.googleTranslateElementInit = function () {
      new google.translate.TranslateElement(
        { pageLanguage: "en", includedLanguages: langs.join(","), autoDisplay: false },
        "google_translate_element");
    };
    var s = document.createElement("script");
    s.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    s.async = true;
    document.head.appendChild(s);
  }

  if (!sel) return;
  var langs = Array.prototype.map.call(sel.options, function (o) { return o.value; })
    .filter(function (l) { return l !== "en"; });
  var cur = current();
  sel.value = langs.indexOf(cur) > -1 ? cur : "en";
  sel.addEventListener("change", function () { setCookie(sel.value); location.reload(); });

  if (cur !== "en") {
    if (confidential) {
      var n = document.createElement("p");
      n.className = "ph";
      n.textContent = "Machine translation is turned off on confidential pages, so this page is shown in English.";
      var main = document.querySelector("main");
      if (main) main.insertBefore(n, main.firstChild);
    } else {
      loadProvider(langs);
    }
  }
})();
