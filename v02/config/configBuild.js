const configBuild = (root) => {

  const indexHtmlFile = root + '/server/index.html'
  //console.log('BUILD.indexHtmlFile = ', indexHtmlFile);

  return {
    minify: false,
    emptyOutDir: true,
    ssrManifest: true,
    //outDir: `./build`,
    //manifest: true,
    assetsDir: 'assets__',
    rollupOptions: {
      input: {
        main: indexHtmlFile,
        //main: resolve(__dirname, 'index.html'),
        //nested: resolve(__dirname, 'nested/index.html')
      },
      output: {
        assetFileNames: (assetInfo) => {
          let extType = assetInfo.name.split('.').at(1);
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
            extType = 'img';
          } else if (/woff|woff2/i.test(extType)) {
            extType = 'font';
          }
          //return `assets__/${extType}/[name]-[hash][extname]`;
          return `assets__/${extType}/[name][extname]`;
        },
        //chunkFileNames: 'assets__/js/[name]-[hash].js',
        //entryFileNames: 'assets__/js/[name]-[hash].js',
        chunkFileNames: 'assets__/js/[name].js',
        entryFileNames: '[name].js',
      },
    }
  };
}
export default configBuild;
