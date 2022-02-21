const bind = (el, binding) => {
  const spinnerMask = document.createElement('div');
  spinnerMask.className = 'custom-loading-mask';
  const spinner = document.createElement('div');
  spinner.className = 'custom-loading-round';
  spinnerMask.appendChild(spinner);
  el.loadingElement = spinnerMask;
  if (binding.value) {
    el.appendChild(spinnerMask);
  }
};

const update = (el, binding) => {
  if (binding.value) {
    if (el.loadingElement?.parentNode === null) {
      el.classList.add('relative');
      el.appendChild(el.loadingElement);
    }
  } else if (el === el.loadingElement?.parentNode) {
    el.removeChild(el.loadingElement);
    el.classList.remove('relative');
  }
};

const unbind = (el) => {
  if (el.loadingElement?.parentNode === el) {
    el.removeChild(el.loadingElement);
  }
  el.loadingElement = null;
};

export default {
  bind,
  update,
  unbind,
};
