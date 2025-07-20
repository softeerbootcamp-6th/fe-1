export const Timer = (time, callback) => {
  let startTime = null;

  const step = (timestamp) => {
    if (!startTime) startTime = timestamp;
    const elapsed = timestamp - startTime;

    if (elapsed >= time) {
      callback();
    } else {
      requestAnimationFrame(step);
    }
  };

  requestAnimationFrame(step);
};
