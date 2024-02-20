const express = require('express')
const cookieParser = require('cookie-parser')
const { Cookie } = require('express-session')
const port=3000
const app = express()
app.use(cookieParser())

function createCookies(req, res) {
    res.cookie('Practica 5', "Esta es una cookie hola mundo", {
        maxAge: 100000,
        httpOnly: true,//para que no lo manipule el navegador, sino solo la peticion
        secure: true,//solo en https
        sameSite: 'lax',
        //expires: new Date("2024-02-29")
    })
    const agent = req.headers['user-agent']
    res.cookie('InfoNavegador', agent, {
        maxAge: 200000
    })
}

function deleteCookies(res) {
    res.clearCookie("Practica 5")
    res.clearCookie("CInfoNavegador")
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
