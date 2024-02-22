const express = require('express');
const session = require('express-session');
const port = 3700;
const app = express();

app.use(session({
    user: 'admin',
    secret: '784rf8hes94k5=1ks',
    resave: false,
    saveUninitialized: true,
}));

app.use((req, res, next) => {
    if(!req.session.visitados){
        req.session.visitados={}
    }
    next()
    //capturamos la ruta actual
    //inicializamos el valor de la key que apunta a ruta actual con el valor actual o con cero
    //incrementamos el valor de la key que apunta a la ruta actual
    //si el contador llega a incrementarse a 3
        //escribimos el mensaje
        //en una respuesta de texto enviamos un script javascript concatena
    //si aun no es tres... continuamos la ejecucion de las rutas
}

);

app.get('/', (req, res) => {
    const agent=req.header["user-agent"]
    res.cookie("Navegador",agent,{
        httpOnly:true
    })
    res.send('Visita las paginas que tu quieras');
});
app.get('/query', (req, res) => {
    res.send('querys');
});
app.get('/ruta1', (req, res) => {
    res.send('Pagina de ruta1');
});

app.get('/ruta2', (req, res) => {
    res.send('Pagina de ruta2');
});
app.get('/ruta3', (req, res) => {
    res.send('Pagina de ruta3');
});

app.get('/ruta4', (req, res) => {
    res.send('Pagina de ruta4');
});
app.get('/historial', (req, res) => {
    res.send(`Páginas consultadas:`);
});

app.listen(port, () => {
    console.log(`Escuchando puerto `,port);
});