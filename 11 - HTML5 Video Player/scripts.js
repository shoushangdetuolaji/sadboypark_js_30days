/** Get our Elements */
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

/** Build out function */
function togglePlay() {
  const method = video.paused ? 'play' : 'pause';
  video[method]();
}

function updateButton() {
  const icon = this.paused ? '►' : '❚ ❚';  // 这里的this 是对着 video的属性
  toggle.textContent = icon;
}

function skip() {
  console.log(this.dataset.skip);
  video.currentTime += parseInt(this.dataset.skip);
}

function handleRangeUpdate() {
  video[this.name] = this.value;
  console.log(this.name);
  console.log(this.value);
}

function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
  console.log(e);
}

/** Hook up the event listens */

video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);
toggle.addEventListener('click', togglePlay);

skipButtons.forEach(button => button.addEventListener('click', skip));

ranges.forEach(range => range.addEventListener('change', handleRangeUpdate))
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate))

let mousedwon = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedwon && scrub(e));
progress.addEventListener('mousedown', () => mousedwon = true);
progress.addEventListener('mouseup', () => mousedwon = false);