/**
 * Room Transition System
 *
 * Flow:
 *  1. Current room content fades out (panel opacity → 0)
 *  2. Video plays full-viewport (in-place, no overlay)
 *  3. Video freezes on last frame
 *  4. Dark overlay fades in (#stage-dark)
 *  5. New room content fades in on top of darkened frame
 *  6. Stage dark + video fade out (panel's own overlay maintains readability)
 */

const stageBg    = document.getElementById('stage-bg');
const stageVideo = document.getElementById('stage-video');
const stageDark  = document.getElementById('stage-dark');

let activePanel = document.querySelector('.room-panel.is-active');
let busy = false;

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function playForward() {
  return new Promise(resolve => {
    stageVideo.currentTime = 0;
    stageVideo.play().catch(() => {});
    stageVideo.addEventListener('ended', resolve, { once: true });
  });
}

function playReverse() {
  const STEP = 1 / 22;
  return new Promise(resolve => {
    let cancelled = false;

    function step() {
      if (cancelled) return;
      if (stageVideo.currentTime <= 0.04) { resolve(); return; }
      stageVideo.currentTime = Math.max(0, stageVideo.currentTime - STEP);
    }

    stageVideo.addEventListener('seeked', () => {
      if (!cancelled) requestAnimationFrame(step);
    });

    const onMeta = () => { stageVideo.currentTime = stageVideo.duration - 0.01; };
    if (stageVideo.readyState >= 1) {
      onMeta();
    } else {
      stageVideo.addEventListener('loadedmetadata', onMeta, { once: true });
    }
  });
}

async function doTransition(targetId, videoSrc, reverse) {
  if (busy) return;
  const targetPanel = document.getElementById(targetId);
  // Re-read from DOM so nav-link switches stay in sync
  activePanel = document.querySelector('.room-panel.is-active') || activePanel;
  if (!targetPanel || targetPanel === activePanel) return;

  busy = true;

  if (prefersReducedMotion) {
    // Skip video: instant room swap
    activePanel.classList.remove('is-active');
    activePanel = targetPanel;
    stageBg.src = targetPanel.dataset.bg || stageBg.src;
    targetPanel.classList.add('is-active');
    busy = false;
    return;
  }

  // ── Step 1: fade out current room ───────────────
  activePanel.classList.remove('is-active');  // triggers opacity: 0 via CSS
  await wait(480);

  // ── Step 2: load & show video ───────────────────
  stageVideo.src = videoSrc;
  stageVideo.load();
  stageVideo.style.opacity = '1';

  // ── Step 3: play (forward or reverse) ──────────
  await new Promise(resolve => {
    if (reverse) {
      stageVideo.addEventListener('loadedmetadata', () => playReverse().then(resolve), { once: true });
    } else {
      stageVideo.addEventListener('canplay', () => playForward().then(resolve), { once: true });
    }
  });

  // ── Step 4: video frozen on last frame — darken ─
  stageDark.style.opacity = '1';
  await wait(350);

  // ── Step 5: swap static bg, bring in new room ──
  stageBg.src = targetPanel.dataset.bg || stageBg.src;
  targetPanel.classList.add('is-active');
  activePanel = targetPanel;

  // ── Step 6: clean up video + stage-dark ────────
  await wait(500);
  stageVideo.style.opacity = '0';
  stageDark.style.opacity = '0';

  await wait(400);
  stageVideo.pause();
  stageVideo.removeAttribute('src');
  stageVideo.load();

  busy = false;
}

// Public API
window.doTransition = doTransition;
