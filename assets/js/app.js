// Skeleton behaviour: local mock sign-in (language switching lives in translate.js). No network calls.
(function () {
  var store = {
    get: function (k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set: function (k, v) { try { localStorage.setItem(k, v); } catch (e) {} },
    del: function (k) { try { localStorage.removeItem(k); } catch (e) {} }
  };
  function user() { try { return JSON.parse(store.get("pem.user")); } catch (e) { return null; } }

  function renderAuth() {
    var u = user();
    var box = document.getElementById("auth-state");
    var inPages = location.pathname.indexOf("/pages/") !== -1;
    var p = inPages ? "" : "pages/";
    if (box) {
      box.innerHTML = u
        ? u.email + ' <a href="#" id="signout" data-i18n="ui.signout">Sign out</a>'
        : '<a href="' + p + 'account__sign-in.html" data-i18n="ui.signin">Sign in</a>';
      var so = document.getElementById("signout");
      if (so) so.onclick = function (e) { e.preventDefault(); store.del("pem.user"); location.reload(); };
    }
    if (document.body.dataset.confidential === "1") {
      var locked = document.querySelector(".locked"), real = document.querySelector(".real");
      if (locked) locked.hidden = !!u;
      if (real) real.hidden = !u;
    }
    var prof = document.getElementById("profile");
    if (prof) prof.innerHTML = u ? "<p><b>" + u.email + "</b> &middot; " + (u.role || "") + " &middot; " + (u.company || "") + "</p>" : "<p>Not signed in.</p>";
  }

  document.querySelectorAll("form.auth").forEach(function (f) {
    f.addEventListener("submit", function (e) {
      e.preventDefault();
      var d = new FormData(f);
      store.set("pem.user", JSON.stringify({ email: d.get("email"), role: d.get("role") || "", company: d.get("company") || "" }));
      location.href = "account__profile-and-progress.html";
    });
  });

  document.querySelectorAll("pre").forEach(function (pre) {
    var btn = document.createElement("button");
    btn.type = "button"; btn.className = "copy"; btn.textContent = "Copy";
    btn.onclick = function () {
      var code = pre.querySelector("code");
      var t = code ? code.innerText : pre.innerText;
      (navigator.clipboard ? navigator.clipboard.writeText(t) : Promise.reject()).then(function () {
        btn.textContent = "Copied"; setTimeout(function () { btn.textContent = "Copy"; }, 1500);
      }, function () { btn.textContent = "Select and copy"; });
    };
    pre.appendChild(btn);
  });
  renderAuth();
})();
