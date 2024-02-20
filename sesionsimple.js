const express = require('express')
const session = require('express-session')
const port = 3500
const app = express()

app.use(session({
    secret: 'grupocibernetica4',
    resave: true,
    savUninitialized: true,
}));

app.get('/', (req, res) => {
    req.session.conteo = req.session ? req.session.conteo + 1 : 1;
    res.send(`Ruta visitada ${req.session.conteo} veces`)
})

app.get('/', (req, res) => {
    let veces=0
    res.send(`Ruta visitada ${veces} veces`)
    veces++//variable que no va a funcionar y nunca se actualizará
})


app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto`,port)
})