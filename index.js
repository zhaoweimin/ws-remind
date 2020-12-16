class SocketServer {
  constructor (options) {
    this.setOptions(options)
    if (this._url) {
      this._init()
    }
  }

  // 设置了 配置
  setOptions(options) {
    if(typeof options === 'string') {
      this._url = options
      this._count = 0
      this._remind = ''
    } else {
      this._url = options.url
      this._count = options.count || 0
      this._remind = options.remind || ''
    }
    this._time = 0 
  }

  // 
  _init() {
    let that = this
    const ws = new WebSocket(this._url)
    
    // 链接ws
    ws.onopen = function (e) {
      //成功连接服务器回调
      console.log('ws连接成功')
      this._time = 0
    }
    
    // 接收服务器推送数据
    ws.addEventListener('message', function (e) {
      // 设置remind, 执行remind方法
      if(that._remind && typeof that._remind === 'function') {
        that._remind(e.data)
      } else {
        // 无设置则使用alert，显示推送的消息
        alert(e.data)
      }
      // console.log(e.data)
    })

    // 监听可能发生的错误
    ws.addEventListener('error', function (e) {
      console.log('WebSocket error: ', e.code);
    })

    // 关闭ws
    ws.onclose = function (e) {
      console.log(`Connection closed, code: ${e.code}`);
      switch (e.code) {
        case 1005: // 主动调用close是 code 为1005
          console.log('连接已断开')
          break;
        // 其他状态码待添加
        default:
          that._reconnect()
          break
      }
    };

    this.ws = ws
  }

  // 连接ws
  connect() {
    this._init()
  }

  // 消息推送
  send(data) {
    this.ws.send(data)
  }

  // 断开ws
  close() {
    this.ws.close()
  }

  // _reconnect 重连
  _reconnect() {
    let that = this
    this._time++
    if (this._time == 0 || this._count > this._time) {
      // 10s 后尝试链接一次
      setTimeout(function(){
        console.log("第"+this._time+"次重连");
        that._init()
      }, 10000);
    } else {
      console.log('连接已超时')
    }
  }
}

export default SocketServer