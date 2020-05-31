import './helloView';
import handleDrop from './handleDrop';

function ready(fn: () => void) {
  if (document.readyState !== 'loading') {
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

ready(() => {
  handleDrop(document.body);
});
