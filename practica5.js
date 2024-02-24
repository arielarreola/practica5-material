const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const port = 3700;
const app = express();

app.use(session({
    user: 'admin',
    secret: '784rf8hes94k5=1ks',
    resave: false,
    saveUninitialized: true,
}));

app.use(cookieParser());

app.use((req, res, next) => {
    // Capturamos la ruta actual    
    const currentRoute = req.originalUrl;

    // Inicializamos el valor de la key que apunta a la ruta actual con el valor actual o con cero
    req.session[currentRoute] = req.session[currentRoute] || 0;

    // Incrementamos el valor de la key que apunta a la ruta actual
    req.session[currentRoute]++;

    // Si el contador llega a incrementarse a 3
    if (req.session[currentRoute] === 3) {
        // Mostramos un alert en el navegador del usuario
        res.send('<script>alert("¡Has visitado esta página 3 veces!");</script>');
        // Reiniciamos el contador
        req.session[currentRoute] = 0;
    } else {
        // Si aun no es tres, continuamos la ejecución de las rutas
        next();
    }
});

app.get('/', (req, res) => {
    // Capturamos los datos del navegador del usuario y los guardamos en una cookie
    res.cookie('user-agent', req.headers['user-agent']);
    res.send('Visita las paginas que tu quieras');
});

app.get('/query', (req, res) => {
    // Capturamos 3 datos cualquiera y los guardamos en cookies diferentes
    res.cookie('data1', 'valor1');
    res.cookie('data2', 'valor2');
    res.cookie('data3', 'valor3');
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
    // Mostramos las páginas consultadas
    let paginas = Object.keys(req.session).filter(key => key !== 'cookie');
    res.send(`Páginas consultadas: ${paginas}`);
});

app.listen(port, () => {
    console.log(`Escuchando puerto ${port}`);
});
