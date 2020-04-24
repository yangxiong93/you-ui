#与vant使用区别
指定容器

```html
<view id="container" style="height: 150px;">
  <you-sticky :container="true">
    <you-button type="warning">
      指定容器
    </you-button>
  </you-sticky>
</view>
```

#注意
一个页面最好不要使用多个you-sticky组件。微信小程序端测试无bug，但是h5和app端会出现bug。原因：uni.createIntersectionObserver([this], [options])传入this在h5端和app端无效且报错（希望官方早日修复）。