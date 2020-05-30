import './helloView';

function ready(fn: () => void) {
  if (document.readyState != 'loading') {
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

ready(() => {
  console.log('Hello from renderer process');
});
