import './scss/lottery.scss';
import YEvent from './yEvent';
import YBase from './yBase';
import YDom from './yDom';
import LotteryItem from './yLottery.item';

class Ylottery extends YEvent {
  constructor(ele, options) {
    super();
    this.$el = YDom(ele);
    this.$dom = YDom;

    // 合并参数
    this.$config = YBase.extend({
        start: 0,
        goods: [],
        btnTxt: '开始抽奖'
      },
      options
    );

    // 数值越大则越慢
    this.$speedStart = 1000; // 开始速度
    this.$speedEnd = 1300; // 结束速度

    // 当前选中索引
    this.$current = this.$config.start;
    this.create();
    this.setDisable(this.$config.disable); // 是否禁用
    this.$el.addClass('ylottery-wrapper');
  }

  // 创建抽奖
  create(nsource) {
    if (nsource) {
      this.$config.source = nsource;
    }

    let goods = this.$config.goods;
    let current = this.$current;

    // 创建奖品单元
    for (let i = 0; i < goods.length; i++) {
      new LotteryItem({
        $el: this.$el,
        curIndex: i,
        isLight: current === i,
        goods: goods[i],
        $parent: this
      });
    }

    // 设置默认选中
    this.$emit('run', this.$current);

    // 创建抽奖按钮
    this.$el.append(`<div class="ylottery-start-btn" id="ylottery-start-btn">${this.$config.btnTxt}</div>`);

    this.startBtn = YDom('#ylottery-start-btn');
    this.startBtn.$el.onclick = () => {
      this.start();
    };
  }

  // 设置不能点击
  setDisable(state) {
    this.$disable = state;
    this.startBtn[this.$disable ? 'addClass' : 'removeClass']('disabled');
  }

  // 开始抽奖
  start() {
    this.$emit('start_click', this.$current);
    if (this.runnner || this.$disable) return;
    this.startBtn.addClass('running');
    this.$config.runningTxt && this.startBtn.html(this.$config.runningTxt);
    this.$emit('start', this.$current);
    this.runAnimate('up');
  }

  // 抽奖结束
  end(endIndex) {

    let goodsLength = this.$config.goods.length;

    // 结束还需要运行的步数
    let offSteps = endIndex + (goodsLength - this.$current);
    let s = (this.$speedEnd - 70) / offSteps; // 加速度
    this.runnner && clearTimeout(this.runnner);
    this.runAnimate('down', offSteps, s);
  }

  runAnimate(state, step, speed) {

    if (state === 'up') { // 匀速运动
      this.currentSpeed = 70;
    } else { // 减速运动
      let t = speed * step;
      this.currentSpeed = this.$speedEnd - t;
    }

    this.runnner = setTimeout(() => {
      let goods = this.$config.goods;
      let nextIndex = this.$current + 1;
      this.$current = nextIndex >= goods.length ? 0 : nextIndex;

      this.$emit('run', this.$current);
      this.$el.attr('current', this.$current);
      this.runAnimate(state, --step, speed);

      // 在指定步数结束
      if (state === 'down' && !step) {
        this.$emit('end', this.$current);
        this.runnner && clearTimeout(this.runnner);
        this.runnner = null;
        this.startBtn.removeClass('running');
        this.startBtn.html(this.$config.btnTxt);
      }

    }, this.currentSpeed);
  }
}

// 实例
const ylottery = (ele, options) => {
  let ins_ = new Ylottery(ele, options);
  return ins_;
};

export {
  ylottery
};
