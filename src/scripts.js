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
const responsiveBreakpoint = '(min-width: 860px)';
let stickyElements = document.getElementsByClassName('js-sticky');

init();
window.addEventListener('scroll', handleStickies);
window.addEventListener('resize', init);

function init() {
  stickyInit(stickyElements);
  handleStickies();
}

function stickyInit(stickyElements) {
  destroyStickies();
  stickyData.stickyElements = [];
  for (let i = 0; i < stickyElements.length; i++) {
    stickyData.stickyElements.push({
      element: stickyElements[i],
      origTop: stickyElements[i].getBoundingClientRect().top + window.pageYOffset,
      responsive: stickyElements[i].classList.contains('js-sticky-responsive')
    });
  }
}

function handleStickies() {
  let top = window.pageYOffset;

  stickyData.stickyElements.forEach(function (elObj) {
    if (!elObj.stickyActive && (elObj.responsive ? responsiveMatch() : true) && top >= elObj.origTop) {
      activateSticky(elObj);
    } else if (elObj.stickyActive && top < elObj.origTop) {
      deactivateSticky(elObj);
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
  elementObj.element.scrollTop = 0;
  elementObj.stickyActive = true;
}

function deactivateSticky(elementObj) {
  elementObj.element.classList.remove('js-sticky-active');
  elementObj.stickyActive = false;
}

function responsiveMatch() {
  return window.matchMedia(responsiveBreakpoint).matches;
}


// Mobile docs nav masonry
let masonryInstance;
initDocsNavMasonry();
window.addEventListener('resize', initDocsNavMasonry);

function initDocsNavMasonry () {
  if (!masonryInstance && window.matchMedia('(min-width: 360px) and (max-width: 859px)').matches) {
    masonryInstance = new Masonry('.docs-nav', {
      itemSelector: '.docs-nav-section',
      columnWidth: '.docs-nav-section',
      percentPosition: true,
      gutter: 24
    });
  } else if (masonryInstance && window.matchMedia('(max-width: 359px), (min-width: 860px)').matches) {
    masonryInstance.destroy();
    masonryInstance = null;
  }
}
