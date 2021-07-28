module.exports = {
  publicPath: './',
  chainWebpack: (config) => {
    config
      .plugin('html')
      .tap((args) => {
        const argument = [...args];
        argument[0].title = 'Easy Earn';
        return argument;
      });
  },
};
