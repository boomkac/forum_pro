const express = require('express')
const router = express.Router()
const db = require('../controller/database')
const url = require('url')
const query = require('../controller/query')

router.get(/^\/(main|login|register|new_message|new_comment|message)/, (req, res)=>{
    res.render('index.html')
})

router.get('/api/main',(req, res)=>{
    const keyword = url.parse(req.url,true).query.keyword

    if(!keyword){ 
        console.log('\n主页面信息获取请求')
        query(db, `select * from message order by ID desc`, [])
        .then(val=>{
            res.send(val)
        })
        .catch(reason=>{
            res.status(500).send(reason)
        })
    }else{
        console.log('\n搜索信息获取请求')
        query(db, `select * from message where title like '%${keyword}%' or content like '%${keyword}%' order by ID desc `, [])
        .then(val=>{
            res.send(val)
        })
        .catch(reason=>{
            res.status(500).send(reason)
        })
    }
})

router.get('/api/message',(req,res)=>{
    const data = url.parse(req.url,true).query
    let sendData = {}

    query(db, 'select * from message where ID = ?', [data.ID])
    .then(val=>{
        sendData.message = val[0]
        return query(db, 'select * from user where ID = ?', [val[0].userID])
    }).then(val=>{
        sendData.user = val[0]
        return query(db, 'select * from comment where messageID = ? ORDER BY ID ASC', [data.ID])
    }).then(val=>{
        sendData.comments = val
        res.send(sendData)
    }).catch(err=>{
        res.status(500).send(err)
    })

})

//判断是否登录
router.get('/api/isLogin', (req, res)=>{
    const session = req.session
    if(session.userID){
        return res.send('YES')
    }
    return res.send('NO')
})

router.post('/api/login',(req, res)=>{
    const data = JSON.parse(JSON.stringify(req.body))
    console.log('收到登录请求',data)

    query(db, 'select * from user where phone=? and password = ?', [data.phone, data.password])
    .then(val=>{
        if(val.length === 0) return res.send("LOGINFAIL")
        val[0].password = 0
        // res.cookie('token','3',{domain: '127.0.0.1',path: '/api',})
        // res.setHeader('Set-Cookie', 'token=5;path=/;domain=127.0.0.1')
        req.session.userID = val[0].ID
        res.send(val[0])
    })
    .catch(err=>{
        res.status(500).send(err)
    })
})

router.post('/api/register', async (req, res)=>{
    const data = JSON.parse(JSON.stringify(req.body))
    console.log('\n收到注册请求')
    console.log(data)

    try{
        const isExistPhone = await query(db, 'select * from user where phone=?', [data.phone])
        if(isExistPhone.length > 0){
            return res.send('PHONE_HAS_BEEN_REGISTERED')
        }

        
        const isExistUsername = await query(db, 'select * from user where username=?', [data.username])
        if(isExistUsername.length > 0){
            return res.send('USERNAME_HAS_BEEN_REGISTERED')
        }

        const result = await query(db, 'insert into user (phone, username, password, time) values(?, ?, ?, ?)',[data.phone, data.username, data.password, new Date().getTime()])
        res.send('REGISTER_SCESSESS')
    }catch(err){
        console.log(err)
        res.status(500).send('SERVER_ERROR')
    }


})

router.post('/api/new_message',(req, res)=>{
    const data = JSON.parse(JSON.stringify(req.body))
    console.log('收到发表文章请求')

    const session = req.session
    console.log('session:',session.userID)
    console.log('data:',data.title)
    query(db, 'insert into message (title, content, userID, time) values(?,?,?,?)',[data.title, data.content, session.userID, new Date()])
    .then(value=>{
        res.send('POSTSECCESS')
    })
    .catch(reason=>{
        res.status(500).send('POSTFAIL')
    })
})

router.post('/api/new_comment', (req, res)=>{
    const data = JSON.parse(JSON.stringify(req.body))
    console.log('收到发表评论请求')

    const session = req.session
    console.log(session.userID)
    console.log(data)

    query(db, 'select username from user where ID=?',[session.userID])
    .then(value=>{
        return query(db, 'insert into comment (messageID, content, username, userID, time) values(?,?,?,?,?)',[Number(data.messageID), data.content, value[0].username, session.userID, new Date().getTime()])
    })
    .then(value=>{
        res.send('POSTSECCESS')
    })
    .catch(reason=>{
        res.status(500).send('POSTFAIL')
    })
})

//实时搜索
router.get('/api/search_current', (req, res)=>{
    const data =  url.parse(req.url,true).query
    query(db, `select ID,title from message where title like '%${data.keyword}%' order by ID desc limit 5 `, [data.keyword])
    .then(val=>{
        res.send(val)
    })
    .catch(reason=>{
        res.status(500).send('err')
    })
})

module.exports = router
