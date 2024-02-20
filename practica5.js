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

const visitados = {};

app.use((req, res, next) => {
    const rutaActual = req.path;
    if (!visitados[rutaActual]) {
        visitados[rutaActual] = 1;
    } else {
        visitados[rutaActual]++;
        if (visitados[rutaActual] === 3) {
            const msg = `Parece que te interesa la página ${rutaActual}`;
            res.send(`<script>alert('${msg}')</script>`);
        }
    }
    next();
});

app.get('/', (req, res) => {
    res.send('Visita las páginas que quieras');
});

app.get('/query', (req, res) => {
    const { dato1, dato2, dato3 } = req.query;
    if (dato1) {
        res.cookie("Cookie1", dato1, { maxAge: 10000 });
    }
    if (dato2) {
        res.cookie("Cookie2", dato2, { maxAge: 10000 });
    }
    if (dato3) {
        res.cookie("Cookie3", dato3, { maxAge: 10000 });
    }
    res.send('Querys recibidos y cookies establecidas');
});

app.get('/ruta1', (req, res) => {
    res.send('Página de ruta1');
});

app.get('/ruta2', (req, res) => {
    res.send('Página de ruta2');
});

app.get('/ruta3', (req, res) => {
    res.send('Página de ruta3');
});

app.get('/ruta4', (req, res) => {
    res.send('Página de ruta4');
});

app.get('/ruta5', (req, res) => {
    res.send('Página de ruta5');
});

app.get('/historial', (req, res) => {
    let paginas = Object.keys(visitados).map(ruta => `${ruta}: ${visitados[ruta]} visitas`).join('<br>');
    res.send(`Páginas consultadas:<br>${paginas}`);
});

app.listen(port, () => {
    console.log(`Escuchando puerto ${port}`);
});
