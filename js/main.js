// Entry point to load modules and bind events
import './picker.js';
import { startCalculation, toggleLive, resetApp } from './logic.js';
window.startCalculation = startCalculation;
window.toggleLive = toggleLive;
window.resetApp = resetApp;