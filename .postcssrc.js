// .FIXME: 将 px 配置成 rem

module.exports = {
  plugins: {
    // * autoprefixer 用来给 CSS代码添加私有前缀
    // 实际上在 vue-cli 内部已经集成了 autoprefixer
    // 这边再次进行配置,存在冲突

    // autoprefixer: {
    // * 配置要兼容的环境信息
    //   browsers: ['Android >= 4.0', 'iOS >= 8']
    // },

    // *  配置使用 postcss-pxtorem 插件
    // 作用 : 把 px 转为 rem
    'postcss-pxtorem': {
      // 就是基本的设计稿尺寸, rem 设计稿设计的标准,  表示根元素的字体大小
      // ! rootValue 设置为设计稿的宽度的十分之一,  实例工作中移动端设计稿一般都是 750px, 所以一般自己的页面的 rootValue 设置为 750/10=75
      // * Vant 是基于 375px设计稿 写的,所以 Vant的 rootValue 应该设置为 37.5
      // flexible 的 rem 适配方案:把一行分为10份, 每份就是十分之一,每一份就是根字体的大小,每一个的宽就是 rootValue的值

      // * 由于 Vant 和 自己的页面的 rootValue 冲突,所以不能写死(一个定值 37.5),需要用一个函数来返回一个 实际需要的 rootValue
      // rootValue: 37.5,

      // 函数参数返回的是调用 postcss-pxtorem 插件转换内部 css 的文件
      // 可以传入一个形参, ES6结构出返回的对象的 file属性
      rootValue: function ({ file }) {
        // * file 属性实际上就是指调用 postcss-pxtorem 插件转换内部 css 的文件路径
        // console.log(file)

        // 判断 file 中有没有 vant这个字段,如果有的话就将 rootValue 设置为 37.5,反之设置为 75
        return file.indexOf('vant') !== -1 ? 37.5 : 75;
      },

      // propList 就是对哪些属性进行转换
      //  * 表示所有
      propList: ['*'],
    },
  },
};
