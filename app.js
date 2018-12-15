const express = require('express')

const app = express()


// 设置默认采用的模板引擎名称
app.set('view engine', 'ejs')
// 设置模板的存在路径
app.set('views','./views')
app.use('/node_modules',express.static('./node_modules'))
// 用户请求首页
app.get('/',(req,res) =>{
    res.render('index',{name:'许倩倩倩啊',age:'23'})
})

// 用户请求的是注册页面
app.get('/register',(req,res) =>{
    // 当在调用模板引擎的res.render函数的时候 ./相对路径
    res.render('./user/register.ejs',{})
})
// 用户请求的登录页面
app.get('/login',(req,res) =>{
    // 当在调用模板引擎的res.render函数的时候 ./相对路径
    res.render('./user/login.ejs',{})
})

// 要注册新用户了
app.post('/register',(req,res) => {
    // TODO完成用户注册的业务逻辑
    res.send({msg:'ok',status:400})
})

app.listen(80,() =>{
    console.log('http://127.0.0.1')
})
