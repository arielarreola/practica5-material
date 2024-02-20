const express = require('express')
const session = require('express-session')
const port = 3500
const app = express()

app.use(session({
    secret:'qwe',
    saveUninitialized:true,
    resave:true,
    cookie:{
        maxAge:5000
    }
}))

app.get('/', (req, res) => {
    req.session.vistas=req.session.vistas?req.session.vistas+1:1
    res.send(`Ruta visitada ${req.session.vistas} veces`)

})


app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto`,port)
})