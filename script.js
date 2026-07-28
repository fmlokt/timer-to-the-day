(function () {
  "use strict";

  // Target: 18 Sep 2026, 00:00 (UTC+8) — a fixed instant.
  var TARGET = new Date("2026-09-18T00:00:00+08:00").getTime();

  var MS_PER_SECOND = 1000;
  var MS_PER_MINUTE = 60 * MS_PER_SECOND;
  var MS_PER_HOUR = 60 * MS_PER_MINUTE;
  var MS_PER_DAY = 24 * MS_PER_HOUR;
  var MS_PER_WEEK = 7 * MS_PER_DAY;

  function pad(n, width) {
    var s = String(Math.max(0, n | 0));
    while (s.length < width) s = "0" + s;
    return s;
  }

  function init() {
    var els = {
      weeks: document.getElementById("weeks"),
      hours: document.getElementById("hours"),
    };

    var previous = { weeks: "", hours: "" };
    var timer = null;

    function setCell(key, value) {
      if (previous[key] === value) return;
      previous[key] = value;
      var el = els[key];
      if (!el) return;
      el.textContent = value;
      el.classList.remove("is-tick");
      // Force reflow so the animation restarts cleanly.
      void el.offsetWidth;
      el.classList.add("is-tick");
    }

    function update() {
      var diff = TARGET - Date.now();

      if (diff <= 0) {
        setCell("weeks", "00");
        setCell("hours", "00");
        if (timer !== null) {
          clearInterval(timer);
          timer = null;
        }
        return;
      }

      // Whole weeks, then the remaining hours within that partial week
      // (0–167).
      var weeks = Math.floor(diff / MS_PER_WEEK);
      var hours = Math.floor((diff % MS_PER_WEEK) / MS_PER_HOUR);

      setCell("weeks", pad(weeks, 2));
      setCell("hours", pad(hours, 2));
    }

    update();
    // Hours is the finest unit shown; a 15s cadence keeps the hour
    // boundary crisp without needless work.
    timer = setInterval(update, 15000);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
