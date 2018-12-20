/*
    共享数据管理，分：应用级、项目级、页面级、模块级
    使用 proxy 导出代理对象，可实现数据只有访问确无修改权限
    内部引用 notify 封装 setData 类方法，实现只有调用 api 接口才能改变数据的功能
    setData 类方法可使用 immutable 数据提高
*/

import { notify } from './watcher';

const shareData2 = {
  key2: +new Date,
};

export function setShareData2(key, value) {
  if (shareData2[key] === value) return;
  shareData2[key] = value;
  notify(shareData2, key);
}

export default shareData2;