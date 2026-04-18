(function () {
  var EMAIL = "christin@growthspan.io";

  var yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  var toast = document.getElementById("email-toast");
  var hideTimer;

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.setAttribute("aria-hidden", "false");
    toast.classList.add("toast--visible");
    clearTimeout(hideTimer);
    hideTimer = setTimeout(function () {
      toast.classList.remove("toast--visible");
      toast.setAttribute("aria-hidden", "true");
    }, 3400);
  }

  function copyEmail() {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(EMAIL).then(
        function () {
          return true;
        },
        function () {
          return fallbackCopy();
        }
      );
    }
    return Promise.resolve(fallbackCopy());
  }

  function fallbackCopy() {
    try {
      var ta = document.createElement("textarea");
      ta.value = EMAIL;
      ta.setAttribute("readonly", "");
      ta.style.position = "fixed";
      ta.style.left = "-9999px";
      document.body.appendChild(ta);
      ta.select();
      var ok = document.execCommand("copy");
      document.body.removeChild(ta);
      return ok;
    } catch (e) {
      return false;
    }
  }

  document.querySelectorAll("[data-copy-email]").forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      copyEmail().then(function (ok) {
        if (ok) {
          showToast(EMAIL + " copied");
        } else {
          showToast("Couldn’t copy — your address is " + EMAIL);
        }
      });
    });
  });
})();
