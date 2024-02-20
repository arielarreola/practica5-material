const express = require('express')
const session = require('express-session')
const port = 3500
const app = express()

app.use(session({
    secret: 'aleatoria',
    saveUninitialized: true,
    resave: true,
    cookie:{
        masAge: 50000
    }
}))

app.get('/', (req, res) => {
    req.session.visitados=req.session.visitados?req.session.visitados+1:1
    res.send(`Ruta visitada ${req.session.visitados} veces`)
})


app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto`,port)
})