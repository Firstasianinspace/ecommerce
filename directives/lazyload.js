/* eslint no-underscore-dangle: 0 */

function loadImage(element) {
  element.dataset.oldUrl = element.dataset.url;
  element.src = element.dataset.url;
}

const createCallback = (element) => (entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      loadImage(element);
      observer.unobserve(element);
    }
  });
};

function initIntersectionObserver(element, cb) {
  const options = {
    root: null,
    threshold: 0,
  };

  const observer = new IntersectionObserver(cb, options);
  observer.observe(element);
  return observer;
}

const inserted = (element) => {
  if (!window.IntersectionObserver) {
    loadImage(element);
  } else {
    const observer = initIntersectionObserver(element, createCallback(element));
    element._lazyloadObserver = observer;
  }
};

function unbind(element) {
  // eslint-disable-next-line no-unused-expressions
  element._lazyloadObserver?.disconnect();
  delete element._lazyloadObserver;
}

export default {
  inserted,
  update: (element) => {
    const { url, oldUrl } = element.dataset;

    if (url !== oldUrl) {
      unbind(element);
      inserted(element);
    }
  },
  unbind,
};
