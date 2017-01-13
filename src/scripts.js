// Use special focus styles when keyboard navigation is in use
let lastEventType;
const focusClass = 'js-keyboard-focus';
const links = document.getElementsByTagName('a');
const buttons = document.getElementsByTagName('button');

const blurHandler = event => {
  event.target.classList.remove(focusClass);
  event.target.removeEventListener('blur', blurHandler);
};

const focusHandler = event => {
  if (lastEventType === 'keydown') {
    event.target.classList.add(focusClass);
    event.target.addEventListener('blur', blurHandler);
  }
};

document.body.addEventListener('click', () => lastEventType = 'click');
document.body.addEventListener('keydown', () => lastEventType = 'keydown');

[...links, ...buttons].forEach(el => el.addEventListener('focus', focusHandler));


// Make examples togglable
document.getElementById('docs').addEventListener('click', event => {
  if (event.target.classList.contains('docs-example-toggle')) {
    const parent = event.target.closest('.docs-example');
    if (parent.classList.contains('js-active')) {
      parent.classList.remove('js-active');
      event.target.textContent = "Show example";
    } else {
      parent.classList.add('js-active');
      event.target.textContent = "Hide example";
    }
  }
});


// Sticky nav
const stickyData = {};
let stickyElements = document.getElementsByClassName('js-sticky');
var largeScreenMediaQuery = '(min-width: 700px)';

responsiveInit();

window.addEventListener('resize', responsiveInit);

function responsiveInit() {
  var viewportIsLarge = window.matchMedia(largeScreenMediaQuery).matches;
  if (viewportIsLarge && !stickyData.viewportWasLarge) {
    initForLargeViewport();
    stickyData.viewportWasLarge = true;
    stickyData.initialized = true;
  } else if (viewportIsLarge) {
    destroyStickies();
    initForLargeViewport();
  } else if (!viewportIsLarge && (stickyData.viewportWasLarge || !stickyData.initialized)) {
    teardownForLargeViewport();
    stickyData.viewportWasLarge = false;
    stickyData.initialized = true;
  }
}

function initForLargeViewport() {
  stickyInit(stickyElements);
  handleStickies();
  window.addEventListener('scroll', handleStickies);
}

function teardownForLargeViewport() {
  window.removeEventListener('scroll', handleStickies);
  destroyStickies();
}

function stickyInit(stickyElements) {
  stickyData.stickyElements = [];
  for (let i = 0; i < stickyElements.length; i++) {
    stickyData.stickyElements.push({
      element: stickyElements[i],
      originalTop: stickyElements[i].getBoundingClientRect().top + window.pageYOffset
    });
  }
}

function handleStickies() {
  let top = window.pageYOffset;

  stickyData.stickyElements.forEach(function (elementObj) {
    if (!elementObj.stickyActive && top >= elementObj.originalTop) {
      activateSticky(elementObj);
    } else if (elementObj.stickyActive && top < elementObj.originalTop) {
      deactivateSticky(elementObj);
    }
  });
}

function destroyStickies() {
  if (stickyData.stickyElements) {
    stickyData.stickyElements.forEach(deactivateSticky);
  }
}

function activateSticky(elementObj) {
  elementObj.element.classList.add('js-sticky-active');
  elementObj.stickyActive = true;
}

function deactivateSticky(elementObj) {
  elementObj.element.classList.remove('js-sticky-active');
  elementObj.stickyActive = false;
}
