(function () {
  "use strict";

  // Target: 20 May 2026, 23:55 UTC+8 (absolute instant in time).
  var TARGET = new Date("2026-05-20T23:55:00+08:00").getTime();

  var MS_PER_SECOND = 1000;
  var MS_PER_MINUTE = 60 * MS_PER_SECOND;
  var MS_PER_HOUR = 60 * MS_PER_MINUTE;
  var MS_PER_DAY = 24 * MS_PER_HOUR;

  function pad(n, width) {
    var s = String(n);
    while (s.length < width) s = "0" + s;
    return s;
  }

  function init() {
    var daysEl = document.getElementById("days");
    var hoursEl = document.getElementById("hours");
    var minutesEl = document.getElementById("minutes");
    var secondsEl = document.getElementById("seconds");
    var statusEl = document.getElementById("status");

    var timer = null;

    function update() {
      var diff = TARGET - Date.now();

      if (diff <= 0) {
        daysEl.textContent = "000";
        hoursEl.textContent = "00";
        minutesEl.textContent = "00";
        secondsEl.textContent = "00";
        statusEl.textContent = "We've arrived!";
        statusEl.classList.add("done");
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

      daysEl.textContent = pad(days, days >= 100 ? 3 : 2);
      hoursEl.textContent = pad(hours, 2);
      minutesEl.textContent = pad(minutes, 2);
      secondsEl.textContent = pad(seconds, 2);
    }

    update();
    timer = setInterval(update, 1000);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
