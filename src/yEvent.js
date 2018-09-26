class yEvent {
  constructor() {

    // 保存事件类型，处理函数数组映射
    this.handlers = {}
  }

  // 注册给定类型的事件处理程序
  // type -> 自定义事件类型
  // handler -> 自定义事件回调函数
  $on(type, handler) {

    //判断事件处理数组是否有该类型事件
    if (this.handlers[type] == undefined) {
      this.handlers[type] = [];
    }

    //将处理事件push到事件处理数组里面
    this.handlers[type].push(handler);
  }

  //触发一个事件
  $emit(type, params) {

    //判断是否存在该事件类型
    if (this.handlers[type] instanceof Array) {
      let _handler = this.handlers[type];

      //在同一个事件类型下的可能存在多种处理事件，找出本次需要处理的事件
      for (let i = 0; i < _handler.length; i++) {

        _handler[i](type, params);
      }
    }
  }

  // 注销事件
  // type -> 自定义事件类型
  // handler -> 自定义事件回调函数
  removeEvent(type, handler) {
    if (this.handlers[type] instanceof Array) {
      let _handler = this.handlers[type];

      //在同一个事件类型下的可能存在多种处理事件，找出本次需要处理的事件
      for (let i = 0; i < _handler.length; i++) {

        //找出本次需要处理的事件下标
        if (_handler[i] == handler) {
          break;
        }
      }

      //删除处理事件
      _handler.splice(i, 1);
    }
  }
}

export default yEvent
