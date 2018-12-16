const express = require('express')

const app = express()

const bodyparser =require('body-parser')

const mysql = require('mysql')

const moment =require('moment')

const conn = mysql.createConnection({
    host:'127.0.0.1',
    database:'mysql_001',
    user:'root',
    password:'root'
})


// 设置默认采用的模板引擎名称
app.set('view engine', 'ejs')

// 设置模板的存在路径
app.set('views','./views')

// 注册解析表单数据的中间件
app.use(bodyparser.urlencoded({extended:false}))

// 静态目录托管
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
    const body =req.body
    // console.log(body)
    // 校验
    if(body.username.trim().length<=0 || body.password.trim().length<=0 || body.nickname.trim().length<=0)
    {
        return res.send({msg:'请输入完整的用户名或密码',status:400})
    }

    // 查询用户是否重复
    const sql1 = 'select count(*) as count from blog where username=?'
    conn.query(sql1,body.username,(err,result)=>{
        // 如果查询失败 则告知客户端失败
        if(err)  return result.send({mas:'用户名查重失败',status:500})
        // console.log(result)
        if(result[0].count !==0) return res.send({msg:'请更换其它的用户名',status:400})
 
        // 执行注册 的业务逻辑
        body.ctime =moment().format('YYYY-MM-DD HH:mm:ss')
        const sql2 = "insert into blog set ?"

        conn.query(sql2,body,(err,result) =>{
            if(err) return res.send({msg:'注册用户失败',status:400})
            if(result.affectedRows !==1) return res.send({msg:'注册新用户失败',status:400})
            console.log(result, 789987)
            return res.send({msg:'注册用户成功',status:200})
        })


    })
        
    //   return res.send({msg:'ok',status:400})
})

// 监听登录的请求
app.post('/login',(req,res) =>{
    // 获取到表单中的数据
    const body =req.body
    // console.log(body)
    // 执行sql语句 查询用户是否存在
    const sql1 = "select * from blog where username=? and password=?"
    conn.query(sql1,[body.username,body.password],(err,result) =>{
        if(err) return res.send({msg:'用户登录失败',status:400})
        if(result.length !==1) return res.send({msg:'用户登录失败',status:401})
        console.log(result)
        return res.send({msg:'ok',status:403})
    })
     
})

app.listen(80,() =>{
    console.log('http://127.0.0.1')
})
