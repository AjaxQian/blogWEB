const express = require('express')

const app = express()


// 设置默认采用的模板引擎名称
app.set('view engine', 'ejs')
// 设置模板的存在路径

app.use('/node_modules',express.static('./node_modules'))

app.get('/',(req,res) =>{
    res.render('index',{name:'许倩倩倩啊',age:'23'})
})

// 用户请求的是注册页面
app.get('/register',(req,res) =>{

    res.render('./user/register.html')
})

app.listen(80,() =>{
    console.log('http://127.0.0.1')
})
