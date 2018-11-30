# npm_item
使用 npm 简单小测试
## 1. 下载 socket.io
    npm install socket.io --save

## 2. 下载 express
    npm install express --save

## 3. 书写文件。
    1. 服务器端。
        var app = require('express')();
        var server = require('http').Server(app);
        var io = require('socket.io')(server);

        server.listen(80);

        app.get('/', function (req, res) {
          res.sendfile(__dirname + '/index.html');
        });

        io.on('connection', function (socket) {
          socket.emit('news', { hello: 'world' });
          socket.on('my other event', function (data) {
            console.log(data);
          });
        });
    2. 客户端
        <script src="/socket.io/socket.io.js"></script>
        <script>
          var socket = io.connect('http://localhost');
          socket.on('news', function (data) {
            console.log(data);
            socket.emit('my other event', { my: 'data' });
          });
        </script>

## socket 理论理解 ##
1. 在浏览器和服务器之间实现实时、双向和基于事件的通信，它依赖于Engine.IO，它首先建立一个长轮询连接，然后尝试升级到更好的传输，这些传输在侧面被“测试”，比如WebSocket。
2. 自动重新连接支持:
   除非另有说明，否则断开连接的客户端将尝试永久重新连接，直到服务器再次可用。请在此处查看可用的重新连接选项。
3. 断线检测:
   在Engine.IO级别实现心跳机制，允许服务器和客户端知道另一个机制何时不响应。
   通过在服务器和客户端上设置定时器来实现该功能，在连接握手期间共享超时值（pingInterval和pingTimeout参数）。这些计时器需要将任何后续客户端调用定向到同一服务器，因此在使用多个节点时会出现粘性会话要求。
   
