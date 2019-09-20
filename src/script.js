function CountdownTracker(label, value) {
  var el = document.createElement('span');

  el.className = 'flip-clock__piece';
  el.innerHTML = '<span class="flip-clock__slot">' + label + '</span><b class="flip-clock__card card"><b class="card__top"></b><b class="card__bottom"></b><b class="card__back"><b class="card__bottom"></b></b></b>';

  this.el = el;

  var top = el.querySelector('.card__top'),
    bottom = el.querySelector('.card__bottom'),
    back = el.querySelector('.card__back'),
    backBottom = el.querySelector('.card__back .card__bottom');

  this.update = function (val) {
    val = ('0' + val).slice(-2);
    if (val !== this.currentValue) {

      if (this.currentValue >= 0) {
        back.setAttribute('data-value', this.currentValue);
        bottom.setAttribute('data-value', this.currentValue);
      }
      this.currentValue = val;
      top.innerText = this.currentValue;
      backBottom.setAttribute('data-value', this.currentValue);

      this.el.classList.remove('flip');
      void this.el.offsetWidth;
      this.el.classList.add('flip');
    }
  }

  this.update(value);
}

function getTime() {
  var t = new Date();
  return {
    [new Intl.DateTimeFormat('en-US', {
      weekday: 'short'
    }).format(t)]: t.getHours(),
    [new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: '2-digit'
    }).format(t)]: t.getMinutes(),
  };
}

function Clock() {
  var el = document.createElement('div');

  el.className = 'flip-clock';

  var trackers = {},
    t = getTime(),
    key, timeinterval;

  for (key in t) {
    trackers[key] = new CountdownTracker(key, t[key]);
    el.appendChild(trackers[key].el);
  }

  var i = 0;

  function updateClock() {
    timeinterval = requestAnimationFrame(updateClock);

    // throttle so it's not constantly updating the time.
    if (i++ % 10) {
      return;
    }

    var t = getTime();

    for (key in trackers) {
      trackers[key].update(t[key]);
    }
  }

  setTimeout(updateClock, 500);

  return el;
}

document.body.appendChild(new Clock());
