var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
server.listen(8080);
//配置静态资源
app.use(express.static('node_modules'));
app.use(express.static('public'));
// app.use ('/assets', express.static ("http://assets.mydomain.com"));


app.get('/',function(req, res){
    res.sendFile(__dirname + '/index.html');
    console.log(__dirname);
});

var users = [];

//连接事件,所有交互都是在该连接之后进行的

io.on('connection', function(socket){
    console.log('连接成功'); //打开index.html页面时自动连接。
    //接收登陆的用户,监听login频道
    socket.on('login', function(data){
        users.push(data);//将数据data插入数组users，push() 方法可把它的参数顺序添加到 arrayObject 的尾部。它直接修改 arrayObject，而不是创建一个新的数组。push() 方法和 pop() 方法使用数组提供的先进后出栈的功能。
        // 也可将数据存入库中
        // 推送至所有页面，除了当前客户端。
        console.log('用户'+data.nickName+'上线了');
        //发送至所有用户
        socket.emit('all',users);  //all和login都是频道，用户昵称是某个客户端传递到服务端端，服务端将所有昵称以及其他消息收集后再发送到所有客户端，大家就都可以看到了，但是用户需要刷新后才可以。
        //将新登陆的用户广播至所有的客户端，除了当前客户端，不用刷新的情况下直接将新登陆的用户昵称以及信息广播到所有用户端
        socket.broadcast.emit('new login', data)


    });

    //监听send频道
    socket.on('send', function(data){
        // socket.emit('rec', data);
        socket.broadcast.emit('rec', data);
    });

    //断线提醒？？？
    socket.on('disconnect',function() {
        io.emit('user disconnected');
    });
});
