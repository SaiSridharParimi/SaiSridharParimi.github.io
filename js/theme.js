// Light/dark toggle. Defaults to the OS preference; an explicit choice is
// remembered per browser. The page works fully without this script.
(function () {
  var root = document.documentElement;
  var button = document.querySelector(".theme-toggle");
  if (!button) return;

  var media = window.matchMedia("(prefers-color-scheme: dark)");

  function current() {
    return root.getAttribute("data-theme") || (media.matches ? "dark" : "light");
  }

  function render() {
    // Fixed label + aria-pressed, so screen readers announce "Dark mode, pressed".
    button.setAttribute("aria-pressed", String(current() === "dark"));
  }

  button.hidden = false;
  button.addEventListener("click", function () {
    var next = current() === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    try { localStorage.setItem("theme", next); } catch (e) {}
    render();
  });
  media.addEventListener("change", render);
  render();
})();
