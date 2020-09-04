const mk = require('makhulu');
const { minify } = require('terser');

const srcDir = './ts_out/';

(async () => {
  // Select all .js files as initial data list.
  const files = await mk.fs.src(srcDir, '**/*.js');
  // Read file contents, now each data entry contains file contents.
  await files.map('Read files', mk.fs.readToString);
  // You can change the content to whatever you want, e.g. uglify the content.
  await files.map('Uglify', async (data) => {
    const content = data[mk.fs.FileContent];
    const uglifyRes = await minify(content);
    data[mk.fs.FileContent] = uglifyRes.code;
    return data;
  });
  await files.map('Write files', mk.fs.writeToDirectory(srcDir));
  await files.forEach('Dest files', mk.fs.printsDestFile);
})();
