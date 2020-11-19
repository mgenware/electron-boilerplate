import './helloView';
import handleDrop from './handleDrop';
import calls from '../common/calls';

function ready(fn: () => void) {
  if (document.readyState !== 'loading') {
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

// Hook up events.
window.ipcRenderer.on(
  calls.renderer.renderContent,
  (_, filePath: string, fileContents: string) => {
    const filePathElement = document.getElementById('filePath');
    if (filePathElement) {
      filePathElement.textContent = filePath;
    }
    const fileContentsElement = document.getElementById('fileContents');
    if (fileContentsElement) {
      fileContentsElement.textContent = fileContents;
    }
  },
);

ready(() => {
  handleDrop(document.body);
});
