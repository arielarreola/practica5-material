const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser')
const port = 3700;
const app = express();
app.use(cookieParser())


app.use(session({
    user: 'admin',
    secret: '784rf8hes94k5=1ks',
    resave: false,
    saveUninitialized: true,
}));
// Middleware para rastrear visitas a cada ruta
app.use((req, res, next) => {
    if(!req.session.visitados){
        req.session.visitados={}
    }
    const rutaActual = req.path
    req.session.visitados[rutaActual] = req.session.visitados[rutaActual]||0
    req.session.visitados[rutaActual]++
    if(req.session.visitados[rutaActual]===3){
        const msg = `Parece que te interesa la ruta ${rutaActual}`
        res.status(200).send(`<script>alert('${msg}')</script>`)
    }else{
        next()
    }

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
    const agent=req.headers['user-agent']
    res.cookie("navegador",agent,{
        httpOnly:true
    })
    res.send('Prueba las paginas que tu quieras, son frutas, Manzana, Pera, Sandia, Mango y Fruta');
});
// Ruta GET con query para capturar tres datos y guardar cada uno en una cookie diferente
app.get('/query', (req, res) => {
    const query_user=req.query
    if(query_user.data1){
        res.cookie("Data1",query_user.data1,{
            httpOnly:true,
            maxAge:1000*10
        })
    }
    if(query_user.data2){
        res.cookie("Data2",query_user.data2,{
            httpOnly:true,
            maxAge:1000*30
        })
    }
    if(query_user.data3){
        res.cookie("Data3",query_user.data3,{
            httpOnly:true,
            maxAge:1000*20
        })
    }

    res.send('Datos guardados en cookies');
});
app.get('/Mango', (req, res) => {
    res.send('Pagina de Mango');
});

app.get('/Pera', (req, res) => {
    res.send('Pagina de Pera');
});
app.get('/Manzana', (req, res) => {
    res.send('Pagina de Manzana');
});

app.get('/Sandia', (req, res) => {
    res.send('Pagina de Sandia');
});
app.get('/Fruta', (req, res) => {
    res.send('Pagina de Fruta');
});
app.get('/historial', (req, res) => {
    const paginas = req.session.visitados
    res.send(`Páginas consultadas: ${JSON.stringify(paginas)}`);
});

app.listen(port, () => {
    console.log(`Escuchando puerto `,port);
});