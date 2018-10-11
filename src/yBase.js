class YBase {

  inArray(arr, value) {
    let i = arr.length;
    while (i--) {
      if (arr[i] === value) {
        return true;
      }
    }
    return false;
  }

  isArray() {
    return Object.prototype.toString.call(arguments[0]) === '[object Array]';
  }

  isPlainObject() {
    return Object.prototype.toString.call(arguments[0]) === '[object Object]';
  }

  extend() {
    let options,
      clone,
      name, // 当前key
      i = 1, // 从第1项开始复制
      deep = false, // 是否为深拷贝
      length = arguments.length,
      target = arguments[0];

    // 第一个参数为Boolean,
    // 则判断是否为深拷贝
    // 并设置设置target为下一个对象
    if (typeof target === 'boolean') {
      deep = target;
      target = arguments[i] || {};
      i++;
    }

    // 若目标参数既不是object类型，则为目标参数重新赋值
    if (typeof target !== 'object') {
      target = {};
    }

    // 遍历
    for (; i < length; i++) {
      if ((options = arguments[i]) !== null) {
        for (name in options) {

          let src = target[name]; // 目标参数中name字段的值
          let copy = options[name]; // 当前参数中name字段的值

          // 若值相等则进行下一个赋值
          if (target === copy) {
            continue;
          }

          // 若当前参数中name字段的值存在且为object类型或Array类型，
          // 且为深度复制
          let copyIsArray = this.isArray(copy);
          let copyIsObject = this.isPlainObject(copy);
          if (deep && copy && (copyIsArray || copyIsObject)) {

            // 若当前参数中name字段的值为Array类型
            // 判断目标参数中name字段的值是否存在，若存在则使用原来的，否则进行初始化
            if (copyIsArray) {
              // copyIsArray = false;
              clone = src && this.isArray(src) ? src : [];
            } else {
              // 若原对象存在，则直接进行使用，而不是创建
              clone = src && this.isPlainObject(src) ? src : {};
            }
            // 递归处理
            // deep为false，则表示浅度拷贝，直接进行赋值
            // 若copy是简单的类型且存在值， 则直接进行赋值
            target[name] = this.extend(deep, clone, copy);
          } else if (copy !== undefined) {
            // 若原对象存在name属性，则直接覆盖掉；若不存在，则创建新的属性
            target[name] = copy;
          }
        }
      }
    }
    return target;
  }

  copy(obj) {
    let newobj = {};
    for (let attr in obj) {
      newobj[attr] = obj[attr];
    }
    return newobj;
  }
}

export default new YBase();
