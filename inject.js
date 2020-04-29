
function imdifferenter() {
  let addedPopup = false;
  let isKeyDown = {'a': false, 's': false};

  let left = null;
  let right = null;
  let popup = null;
  function compare() {
    if (!left || !right) {
      return;
    }
    if (!addedPopup) {
      addedPopup = true;
      popup = document.createElement('CANVAS');
      popup.style.position = 'fixed';
      popup.style.cursor = 'pointer';
      popup.style.border = 'solid red 1px';
      document.body.appendChild(popup);
    }

    const maxWidth = 384;
    const maxHeight = 384;

    let lw = Math.max(left.width, left.naturalWidth);
    let rw = Math.max(right.width, right.naturalWidth);

    let lh = Math.max(left.height, left.naturalHeight);
    let rh = Math.max(right.height, right.naturalHeight);

    popup.width = Math.min(Math.max(lw, rw), maxWidth);
    popup.height = Math.min(Math.max(lh, rh), maxHeight);
    let leftScale = Math.min(popup.width / lw, popup.height / lh);
    let rightScale = Math.min(popup.width / rw, popup.height / rh);
    popup.width = Math.max(lw * leftScale, rw * rightScale);
    popup.height = Math.max(lh * leftScale, rh * rightScale);

    popup.style.display = 'block';

    let c = popup.getContext('2d');
    c.drawImage(left, 0, 0, lw, lh, 0, 0, lw * leftScale, lh * leftScale);
    c.globalCompositeOperation = 'difference';
    c.drawImage(right, 0, 0, rw, rh, 0, 0, rw * rightScale, rh * rightScale);
  }

  window.addEventListener('click', (e) => {
    let target = e.target;
    if (target === popup) {
      popup.style.display = 'none';
      return;
    }
    if (target.nodeName === 'CANVAS' || target.nodeName === 'IMG') {
      if (isKeyDown.a) {
        left = target;
      }
      if (isKeyDown.s) {
        right = target;
      }
      compare();
    }
  });

  window.addEventListener('keydown', (e) => {
    isKeyDown[e.key.toLowerCase()] = true;
  });

  window.addEventListener('keyup', (e) => {
    isKeyDown[e.key.toLowerCase()] = false;
  });
}; imdifferenter();