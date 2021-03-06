websocket 消息推送插件

## 使用
```
npm i -S ws-remind  
```

入参
1. string 
```
import WSremind from 'ws-remind'  
let wsRemind = new WSremind(WSurl)
直接传入ws路径
```

2. object
```
import WSremind from 'ws-remind'  
let option = {
  url: '...', // ws路径
  count: 0', // 断开重连最大次数设置，10秒重连一次。
  // remind 设置接收到消息，提醒方式，不设置默认alert弹出接收到的信息
  remind: res => { 
    console.log('remind', res)
  }, 
}
let wsRemind = new WSremind(option)
```

## 方法
|方法名|作用|参数|返回值|版本|
|--|--|--|--|--|
|connect|链接ws|null|null|1.0.3|
|send|向服务器推送消息|string|null|1.0.3|
|close|断开链接|null|null|1.0.3|
|getState|获取当前连接状态|null|0-connect,1-open（连接中）,2-closeing,3-closed（断开）;|1.0.3|
|setUrl|设置ws路径|String|null|1.0.3|
|setRemind|设置消息提示的方法|Function|null|1.0.3|
|setCount|设置重连次数|Number|null|1.0.3|