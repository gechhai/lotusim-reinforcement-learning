const missions = {
  3: { time: '170 s', distance: '827 m', description: 'Three UAVs using the shared policy trained with three agents.' },
  4: { time: '116 s', distance: '704 m', description: 'Four UAVs using the same actor, without retraining.' },
  5: { time: '129 s', distance: '875 m', description: 'Five UAVs using the same actor, without retraining.' }
};
const replay = document.getElementById('mission-replay');
const buttons = document.querySelectorAll('[data-team]');
const toggle = document.getElementById('toggle-animation');
let activeTeam = '3';
let animating = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
function updateReplay() {
  replay.src = `assets/replays/replay-${activeTeam}-uavs.${animating ? 'gif?v=2' : 'jpg'}`;
  replay.alt = `${animating ? 'Looping GIF' : 'Still image'} of the recorded ${activeTeam}-UAV exploration mission`;
  toggle.textContent = animating ? 'Stop animation' : 'Play animation';
  toggle.setAttribute('aria-pressed', String(animating));
}
toggle.addEventListener('click', () => {
  animating = !animating;
  updateReplay();
});
buttons.forEach(button => button.addEventListener('click', () => {
  if (button.getAttribute('aria-pressed') === 'true') return;
  activeTeam = button.dataset.team;
  const mission = missions[activeTeam];
  updateReplay();
  buttons.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
  document.getElementById('mission-time').textContent = mission.time;
  document.getElementById('mission-distance').textContent = mission.distance;
  document.getElementById('mission-description').textContent = mission.description;
  document.getElementById('download-replay').href = `assets/replays/replay-${activeTeam}-uavs.gif?v=2`;
}));
updateReplay();
