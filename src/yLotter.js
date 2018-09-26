import './scss/lottery.scss';
import yEvent from './yEvent';
import yBase from './yBase';
import yDom from './yDom';
import lotteryItem from './yLottery.item';

class Ylottery extends yEvent {
  constructor(ele, options) {
    super();
    this.$el = yDom(ele);
    this.$el.addClass('ylottery-wrapper');

    this.$disabled = false;

    // 合并参数
    this.$config = yBase.extend({
        id: '',
        start: 0,
        maxLength: 9, // 最大长度
        minRound: 2, // 最小圈数
        goods: [],
        btnTxt: '开始抽奖',
        btnStopTxt: '点击停止'
      },
      options
    );

    // 数值越大则越慢
    this.$speedStart = 1000; // 开始速度
    this.$speedEnd = 1300; // 结束速度

    // 当前选中索引
    this.$current = this.$config.start;
    this.create();
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
      new lotteryItem({
        $el: this.$el,
        curIndex: i,
        isLight: current === i,
        goods: goods[i],
        $parent: this
      });
    }

    // 创建抽奖按钮
    this.$el.append(`<div class="ylottery-start-btn" id="ylottery-start-btn">${this.$config.btnTxt}</div>`);

    this.startBtn = yDom('#ylottery-start-btn');
    this.startBtn.$el.onclick = () => {
      if (this.runnner) {
        this.$emit('stop');
      } else {
        this.start();
      }
    }
  }

  // 更新奖品列表
  updateSoure(source) {
    this.$config.source = source;
    this.create();
  }

  // 开始抽奖
  start() {
    if (this.runnner) return;
    this.startBtn.addClass('running');
    this.startBtn.html(this.$config.btnStopTxt);
    this.$emit('start', this.$current);
    this.runAnimate('up');
  }

  // 抽奖结束
  end(endIndex) {
    if (this.$disabled) return;

    this.$disabled = true;
    let goodsLength = this.$config.goods.length;

    // 结束还需要运行的步数
    let offSteps = endIndex + (goodsLength - this.$current);
    let s = (this.$speedEnd - 70) / offSteps; // 加速度

    this.startBtn.removeClass('running');
    this.startBtn.addClass('disabled');
    this.runnner && clearTimeout(this.runnner);
    this.runAnimate('down', offSteps, s)
  }

  runAnimate(state, step, speed) {

    if (state == 'up') { // 匀速运动
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
      this.runAnimate(state, --step, speed);

      // 在指定步数结束
      if (state == 'down' && !step) {
        this.$emit('end', this.$current);
        this.runnner && clearTimeout(this.runnner);
        this.runnner = null;
        this.startBtn.removeClass('disabled');
        this.startBtn.html(this.$config.btnTxt);
        this.$disabled = false;
      }

    }, this.currentSpeed);
  }
}

// 实例
const lottery = (ele, options) => {
  let ins_ = new Ylottery(ele, options);
  return ins_;
};

export default lottery;
