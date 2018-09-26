import yBase from './yBase'
import yDom from './yDom';

class lotteryItem {
  constructor(options) {
    this.$options = options;
    this.$parent = options.$parent; // 父对象
    this.$index = options.curIndex; // 当前商品索引
    this.$goods = options.goods; // 当前商品详情
    this.$pnode = options.$el; // 父节点
    this.activeClass = 'active';

    this.create();
  }

  create() {

    let template = `
      <div class="ylottery-goods-item ylottery-goods-item${this.$index}" id="ylottery-goods-${this.$index}">
        <div class="ylottery-goods-img-outer">
          <span class="ylottery-goods-img">
            <img src="${this.$goods.img}" alt="${this.$goods.name}"/>
          </span>
          </div>
        <div class="ylottery-goods-txt">${this.$goods.name}</div>
      </div>
    `;
    this.$pnode.append(template);

    // 是否跑到当前奖品
    this.$parent.$on('run', (type, curretIndex) => {
      if (this.$index === curretIndex) {
        this.setActive(curretIndex);
      }
    });

    // 是否在当前结束
    this.$parent.$on('done', (type, finalIndex) => {
      this.setActive(finalIndex);
    })
  }

  // 设置选中
  setActive(activeIndex) {
    let goodsList = this.$parent.$config.goods;
    let lastIndex = !activeIndex ? goodsList.length - 1 : activeIndex - 1;
    let curretEl = yDom('#ylottery-goods-' + activeIndex);
    let lastEl = yDom('#ylottery-goods-' + lastIndex);
    curretEl.addClass(this.activeClass);
    lastEl.removeClass(this.activeClass);
  }

}

export default lotteryItem
