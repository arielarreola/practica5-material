const express = require('express')
const session = require('express-session')
const port = 3500
const app = express()

app.use(session({ 
    secret: 'secret', 
    resave: false, 
    saveUninitialized: true,
    cookie:{
        maxAge: 2 * 1000 // 2 minute
    }
}))

app.get('/', (req, res) => {
    req.session.visitas= req.session.visitas ? ++req.session.visitas : 1;
    res.send(`Ruta visitada ${req.session.visitas} veces`)

})


app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto`,port)
})