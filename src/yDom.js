class yDom {
  constructor(selectors) {

    this.$el = null;

    if (typeof selectors == 'string') {
      this.$el = document.querySelector(selectors)
    } else if (typeof selectors == 'object') {
      this.$el = selectors;
    }

    if (!this.$el || this.$el.nodeType !== 1) {
      throw new Error('第一个参数, 仅能为DOM节点, 或者选择器')
    }

  }

  append(string) {
    let element = this.$el;
    element.innerHTML += string;
  }

  html(string) {
    let element = this.$el;
    element.innerHTML = string;
  }

  attr() {
    let element = this.$el;
    if (arguments.length == 2) {
      element.setAttribute(arguments[0], arguments[1])
    } else {
      return element.getAttribute(arguments[0])
    }
  }

  // 添加class
  addClass(className) {
    let element = this.$el;
    if (!element.className.match(new RegExp('(\\s+|^)' + className + '(\\s+|$)'))) {
      element.className += ' ' + className;
    }
    return element;
  }

  // 移除class
  removeClass(className) {
    let element = this.$el;
    if (element.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'))) {
      element.className = element.className.replace(new RegExp('(\\s|^)' + className + '(\\s|$)'), ' ')
    }
    return element;
  }

  css(css_type, value) {
    let element = this.$el;
    // 赋值
    if (typeof css_type == 'object') {
      for (let c in css_type) {
        element.style[c] = css_type[c];
      }
    } else {
      if (arguments.length == 2) {
        return this.getStyle(elements, css_type);
      }
      element.style[css_type] = value;
    }
    return element;
  }

  getStyle(attr) {
    let element = this.$el;
    if (typeof window.getComputedStyle != 'undefined') { // W3C
      return window.getComputedStyle(element, null)[attr];
    } else if (typeof element.currentStyle != 'underfined') { // IE
      return element.currentStyle[attr];
    }
  }
}

export default (selector) => {
  return new yDom(selector);
};
