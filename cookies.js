const express = require('express')
const cookieParser = require('cookie-parser')
const port=3000
const app = express()
app.use(cookieParser())

function createCookies(req, res, firstName, carrera) {
    res.cookie('titulo', firstName, {
        maxAge: 180000, //3 minutos = 180000 milisegundos
        httpOnly: false,//para que no lo manipule el navegador, sino solo la peticion
        secure: true,//solo en https
        sameSite: 'lax',
        expires: new Date("2024-02-29")
    })
    res.cookie('descripcion', carrera, {
        maxAge: 180000, //3 minutos = 180000 milisegundos
        httpOnly: false,//para que no lo manipule el navegador, sino solo la peticion
        secure: true,//solo en https
        sameSite: 'lax',
        expires: new Date("2024-02-29")
    })
}

app.post('/guardarDatos',(req,res)=>{
    const { firstName, carrera } = req.body;
    createCookies(req, res, firstName, carrera);
    res.send('Datos guardados en cookies');
})

function deleteCookies(res) {
    res.clearCookie("Hola mundo")
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
