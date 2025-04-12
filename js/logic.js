
import { animateText, showError, updateBar, formatTime } from './utils.js';

let liveInterval = null;
let targetTime = null;

export function startCalculation() {
  const input = document.getElementById('datetime-value').value;
  if (!input) return showError(document.getElementById('countdown'), 'Please select a valid date.');

  targetTime = new Date(input).getTime();
  if (targetTime < Date.now()) return showError(document.getElementById('countdown'), '⛔ Time already passed!');

  document.getElementById('sleep-block').style.display = 'block';
  document.getElementById('course-block').style.display = 'block';

  updateCountdown();
  if (liveInterval) clearInterval(liveInterval);
}

export function updateCountdown() {
  const now = Date.now();
  let remaining = targetTime - now;

  const days = Math.ceil(remaining / 86400000);
  const sleep = parseFloat(document.getElementById('sleepHours').value) || 0;
  const sleepMs = sleep * days * 3600000;

  const course = parseFloat(document.getElementById('courseHours').value) || 0;
  const speed = parseFloat(document.getElementById('speed').value);
  const courseMs = (course / speed) * 3600000;

  const finalMs = remaining - sleepMs - courseMs;

  updateBar("sleepBar", sleepMs / remaining);
  updateBar("courseBar", courseMs / remaining);

  animateText(document.getElementById("countdown"), `⏰ ${formatTime(finalMs)} left`);

  document.getElementById("summary").innerHTML = `
    <p><strong>Original:</strong> ${formatTime(remaining)}</p>
    <p><strong>– Sleep (${sleep}h/day):</strong> ${formatTime(sleepMs)}</p>
    <p><strong>– Courses (${course}h @ ${speed}x):</strong> ${formatTime(courseMs)}</p>
    <p><strong>= Final:</strong> ${formatTime(finalMs)}</p>
  `;

  const saved = Math.round((course * (1 - 1 / speed)) * 60);
  const badge = document.getElementById('badge');
  badge.innerText = `You saved ${saved} min today!`;
  badge.style.display = saved > 0 ? 'inline-block' : 'none';
}

export function toggleLive() {
  if (!targetTime) return;
  if (liveInterval) {
    clearInterval(liveInterval);
    liveInterval = null;
    animateText(document.getElementById('countdown'), '⏳ Live stopped.');
  } else {
    updateCountdown();
    liveInterval = setInterval(updateCountdown, 1000);
  }
}

export function resetApp() {
  document.getElementById('datetime-value').value = '';
  document.getElementById('sleepHours').value = '';
  document.getElementById('courseHours').value = '';
  document.getElementById('summary').innerHTML = '';
  document.getElementById('sleep-block').style.display = 'none';
  document.getElementById('course-block').style.display = 'none';
  document.getElementById('sleepBar').style.width = '0';
  document.getElementById('courseBar').style.width = '0';
  document.getElementById('badge').style.display = 'none';
  animateText(document.getElementById('countdown'), '⏳');
  clearInterval(liveInterval);
  liveInterval = null;
}
