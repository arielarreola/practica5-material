const express = require('express')
const cookieParser = require('cookie-parser')
const port=3000
const app = express()
app.use(cookieParser())

function createCookies(req, res) {
    res.cookie('Holamundo Cooki1', "Esta es una cookie hola mundo1", {
        maxAge: 100000,
        httpOnly: false,//para que no lo manipule el navegador, sino solo la peticion
        secure: true,//solo en https
        sameSite: 'lax',
        expires: new Date("2024-02-29")
    })
    const agent = req.headers['user-agent']
    res.cookie('InfoNavegador', agent, {
        maxAge: 20000,
        httpOnly:false
    })
}

function deleteCookies(res) {
    res.clearCookie("Holamundo Cooki1")
    res.clearCookie("InfoNavegador")
}

app.get('/', (req, res) => {
    createCookies(req,res)
    res.send('Hello world')
})

app.get('/eliminarcookies', (req, res) => {
    console.log(req.cookies)
    deleteCookies(res)
    res.send('Cookies eliminadas')
})

app.listen(port, ()=>{
    console.log('Escuchando puerto',port)
})
