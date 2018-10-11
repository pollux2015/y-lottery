# y-lottery

> 抽奖组件, SASS 自定义样式, 日后会填坑

## 使用

```
var mylottery = ylottery('#lottery-id', options);
```

## 参数 options

| 参数名     | TYPE   | 默认值                                                                     | 描述                              |
| ---------- | ------ | -------------------------------------------------------------------------- | --------------------------------- |
| start      | Number | 0                                                                          | 默认开始位置                      |
| btnTxt     | String | 开始抽奖                                                                   | 开始按钮文字                      |
| runningTxt | String |                                                                            | 抽奖中文字                        |
| goods      | Array  | `[{name: '商品1', img: '图片地址'}, {name: '商品2', img: '图片地址'} ...]` | 商品列表                          |
| disable    | Boolen | false                                                                      | 是禁用 mylottery.setDisable(true) |

## 回调

```
// 开始按钮
mylottery.$on('start', (etype, starIndex) => {
  console.log(etype, starIndex);
  setTimeout(() => {
    mylottery.end(2); // 在第3个位置停止, 开始为0
    // mylottery.setDisable(true) // 禁用
  }, 1000);
});
```

```
// 点击开始按钮
mylottery.$on('start_click', (etype) => {
  console.log(etype)
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
mylottery.$on('run', (etype, curIndex) => {
  console.log(etype, curIndex)
})
```
