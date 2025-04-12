
const container = document.getElementById('datetime-picker');
const label = document.createElement('label');
label.innerText = 'Select a future date & time:';
const input = document.createElement('input');
input.type = 'datetime-local';
input.id = 'datetime-value';
input.style.backgroundColor = 'var(--card)';
input.style.color = 'var(--text)';
input.style.padding = '0.75rem';
input.style.fontSize = '1rem';
input.style.border = 'none';
input.style.borderRadius = '0.5rem';
input.style.width = '100%';
input.style.marginTop = '0.5rem';

container.appendChild(label);
container.appendChild(input);
