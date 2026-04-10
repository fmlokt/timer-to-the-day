(function () {
  "use strict";

  // Target: 20 May 2026, 23:55 (UTC+8) — a fixed instant.
  var TARGET = new Date("2026-05-20T23:55:00+08:00").getTime();

  var MS_PER_SECOND = 1000;
  var MS_PER_MINUTE = 60 * MS_PER_SECOND;
  var MS_PER_HOUR = 60 * MS_PER_MINUTE;
  var MS_PER_DAY = 24 * MS_PER_HOUR;

  function pad(n, width) {
    var s = String(Math.max(0, n | 0));
    while (s.length < width) s = "0" + s;
    return s;
  }

  function init() {
    var els = {
      days: document.getElementById("days"),
      hours: document.getElementById("hours"),
      minutes: document.getElementById("minutes"),
      seconds: document.getElementById("seconds"),
      status: document.getElementById("status"),
    };

    var previous = { days: "", hours: "", minutes: "", seconds: "" };
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
        setCell("days", "000");
        setCell("hours", "00");
        setCell("minutes", "00");
        setCell("seconds", "00");
        if (els.status) {
          els.status.textContent = "— The moment has arrived.";
          els.status.classList.add("is-done");
        }
        if (timer !== null) {
          clearInterval(timer);
          timer = null;
        }
        return;
      }

      var days = Math.floor(diff / MS_PER_DAY);
      var hours = Math.floor((diff % MS_PER_DAY) / MS_PER_HOUR);
      var minutes = Math.floor((diff % MS_PER_HOUR) / MS_PER_MINUTE);
      var seconds = Math.floor((diff % MS_PER_MINUTE) / MS_PER_SECOND);

      setCell("days", pad(days, days >= 100 ? 3 : 2));
      setCell("hours", pad(hours, 2));
      setCell("minutes", pad(minutes, 2));
      setCell("seconds", pad(seconds, 2));
    }

    update();
    timer = setInterval(update, 250);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
