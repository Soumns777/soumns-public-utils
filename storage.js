// .FIXME: 封装本地存储模块
// 项目中频繁使用到 保存Token和获取Token值,所以可以封装成一个模块

// !  存储数据
export const setItem = (key, value) => {
  // 将数组或对象格式的数据先转为 JSON字符串再进行本地存储
  if (typeof value === 'object') {
    //   将数组或对象格式数据转为 JSON字符串
    value = JSON.stringify(value);
  }
  //   保存到本地
  window.localStorage.setItem(key, value);
};

// !  获取数据
// 如果本地存储中,存储的是字符串,字符串中使用 JSON.parse() 转换会报错
// 这时候就可以使用  try...catch 来捕获错误
// 如果是对象、数组、数值,直接使用 JSON。parse()转换即可
// 如果是字符串,直接返回即可
export const getItem = (key) => {
  // 将获取到数据 JSON字符串转化为 对象数据
  try {
    //   当程序不报错,就直接转换为 对象
    return JSON.parse(window.localStorage.getItem(key));
  } catch (err) {
    //   报错表示的是 字符串,就直接返回这个字符串
    return window.localStorage.getItem(key);
  }
};

// !  删除数据
export const delItem = (key) => {
  window.localStorage.removeItem(key);
};
