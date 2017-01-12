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
