const missions = {
  3: { time: '170 s', distance: '827 m', description: 'Three UAVs using the shared policy trained with three agents.' },
  4: { time: '116 s', distance: '704 m', description: 'Four UAVs using the same actor, without retraining.' },
  5: { time: '129 s', distance: '875 m', description: 'Five UAVs using the same actor, without retraining.' }
};
const video = document.getElementById('mission-video');
const buttons = document.querySelectorAll('[data-team]');
buttons.forEach(button => button.addEventListener('click', () => {
  if (button.getAttribute('aria-pressed') === 'true') return;
  const team = button.dataset.team;
  const mission = missions[team];
  video.pause();
  video.poster = `assets/replays/replay-${team}-uavs.jpg`;
  video.querySelector('source').src = `assets/replays/replay-${team}-uavs.mp4`;
  video.querySelector('a').href = `assets/replays/replay-${team}-uavs.mp4`;
  video.setAttribute('aria-label', `${team} UAV mission replay`);
  video.load();
  buttons.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
  document.getElementById('mission-time').textContent = mission.time;
  document.getElementById('mission-distance').textContent = mission.distance;
  document.getElementById('mission-description').textContent = mission.description;
  document.getElementById('download-replay').href = `assets/replays/replay-${team}-uavs.mp4`;
}));
