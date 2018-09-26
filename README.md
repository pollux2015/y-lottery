# y-lottery

> 抽奖组件, SASS 自定义样式, 日后会填坑

##使用
var mylottery = y.lottery('#lottery-id', options);

// 点击开始抽奖
mylottery.$on('start', (type, index) => {
console.log(type, index)
})

// 点击停止抽奖
mylottery.$on('stop', (type, params) => {

    // do something ....
    // 设置在第2个位置停止, 索引最小为0
    mylottery.end(2);

})

// 抽奖结束
mylottery.$on('end', (type, params) => {
console.log(type, params)
})

## 参数 options

| 参数名     | TYPE   | 默认值                                                                     | 描述         |
| ---------- | ------ | -------------------------------------------------------------------------- | ------------ |
| start      | Number | 0                                                                          | 默认开始位置 |
| btnTxt     | String | 开始抽奖                                                                   | 开始按钮文字 |
| btnStopTxt | String | 点击停止                                                                   | 停止按钮文字 |
| goods      | Array  | `[{name: '商品1', img: '图片地址'}, {name: '商品2', img: '图片地址'} ...]` | 商品列表     |

## 回调

```
// 开始按钮
mylottery.$on('start', (etype, starIndex) => {
  console.log(etype, starIndex)
})
```

```
// 停止按钮
mylottery.$on('stop', (type, etype) => {
  // dosomething...
  // 手动设置在第2个位置停止
  mylottery.end(2);
})
```

```
// 抽奖结束
mylottery.$on('end', (etype, endIndex) => {
  console.log(etype, endIndex)
})
```

```
// 抽奖中
mylottery.$on('润', (etype, curIndex) => {
  console.log(etype, curIndex)
})
```
