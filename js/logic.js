
import { animateText, showError, updateBar, formatHM } from './utils.js';

let targetTime = null;

export function startCalculation() {
  const input = document.getElementById('datetime-value').value;
  if (!input) return showError(document.getElementById('countdown'), 'Please select a valid date.');

  targetTime = new Date(input).getTime();
  if (targetTime < Date.now()) return showError(document.getElementById('countdown'), '⛔ Time already passed!');

  document.getElementById('sleep-block').style.display = 'block';
  document.getElementById('course-block').style.display = 'block';

  updateCountdown();
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
  const savedMs = course * 3600000 - courseMs;

  const finalMs = remaining - sleepMs - courseMs;

  updateBar("sleepBar", sleepMs / remaining);
  updateBar("courseBar", courseMs / remaining);

  animateText(document.getElementById("countdown"), `⏰ ${formatHM(finalMs)} left`);

  document.getElementById("summary").innerHTML = `
    <p><strong>Original:</strong> ${formatHM(remaining)}</p>
    <p><strong>– Sleep (${sleep}h/day):</strong> ${formatHM(sleepMs)}</p>
    <p><strong>– Courses (${course}h @ ${speed}x):</strong> ${formatHM(courseMs)}</p>
    <p><strong>= Final:</strong> ${formatHM(finalMs)}</p>
  `;

  const badge = document.getElementById('badge');
  badge.innerText = savedMs > 0 ? `You saved ${formatHM(savedMs)} by watching faster!` : '';
  badge.style.display = savedMs > 0 ? 'inline-block' : 'none';
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
}
