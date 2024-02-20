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
    //capturamos la ruta actual
    if (req.session.visitados){
        req.session.visitados={}
    }
    const rutaActual=req.path
    req.session.visitados[rutaActual]=req.session.visitados[rutaActual]||0
    req.session.visitados[rutaActual]++
    
    //inicializamos el valor de la key que apunta a ruta actual con el valor actual o con cero
    //incrementamos el valor de la key que apunta a la ruta actual
    //si el contador llega a incrementarse a 3
        //escribimos el mensaje
        //en una respuesta de texto enviamos un script javascript concatena
    if (req.session.visitados[rutaActual] === 3) {
        res.send(`<script>alert('Has visitado esta página 3 veces');</script>`);
    }
    else {
        next();
    }
});

app.get('/', (req, res) => {
    const userAgent = req.headers['user-agent'];
    res.send(`<p>Tu navegador es: ${userAgent}</p>`);
});

app.get('/query', (req, res) => {
    const query_user=req.query
    if(query_user.dato1){
        res.cookie("cookie1" , query_user.dato1,{maxAge:1000})
    }
    if(query_user.dato2){
        res.cookie("cookie2" , query_user.dato2,{maxAge:1000})
    }
    if(query_user.dato3){
        res.cookie("cookie3" , query_user.dato3,{maxAge:1000})
    }
    
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
    let paginas = null
    res.send(`Páginas consultadas: ${paginas}`);
});

app.listen(port, () => {
    console.log(`Escuchando puerto `,port);
});