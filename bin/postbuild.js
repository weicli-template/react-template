const fs = require('fs');
const dist = './dist';

fs.readdir(dist, (err, files) => {
    if (!err) {
      let vendorFilename = '';
      for (const file of files) {
        if (/^vendors.*\.js$/.test(file)) {
          vendorFilename = file;
          break;
        }
      }
      if (vendorFilename) {
        insertToHtml(vendorFilename);
      } else {
        console.error('没有找到vendors[contenthash].dll.js文件');
      }
    } else {
      
    }
  });

  function insertToHtml(vendorFilename) {
    const indexName = './src/template/index.html';
    fs.readFile(indexName, (err, html) => {
      if (!err) {
        html = html.toString();
        const strScript = `<script id="vendor" src="../../dist/${ vendorFilename }"></script>`;
        html = html.replace(/<!--DLL-->/, strScript);
        html = html.replace(/<script id="vendor".*>.*<\/script>/gi, strScript);
        fs.writeFile(indexName, html, 'utf8', err => {
          if (!err) {
            console.log('将dll文件名写入index.html成功');
          } else {
            console.error('修改index.html失败');
          }
        });
      } else {
        console.error('读取index.html失败');
      }
    });
  }