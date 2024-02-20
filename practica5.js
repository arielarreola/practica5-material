const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const port = 3700;
const app = express();
app.use(cookieParser())

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
    const rutaActual =req.path
    req.session.visitados[rutaActual]=req.session.visitados[rutaActual]||0
    req.session.visitados[rutaActual]++
    if(req.session.visitados[rutaActual]===3){
        const msg= `Parece que te interesa el tema de la ruta ${rutaActual}`
        res.status(200).send(`<script>alert(´${msg}´)</script>`)
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
    const agent=req.header["user-agent"]
    res.cookie("Navegador",agent,{
        httpOnly:true
    })
    res.send('Visita los deportes preferidos de la gente de la ruta 1-5');
});
app.get('/query', (req, res) => {
    const query_user=req.query
    if(query_user.data1){
        res.cookie("Data1",query_user.data1,{
            httpOnly:true,
            maxAge:1000*20
        })
    }
        if(query_user.data2){
            res.cookie("Data2",query_user.data2,{
                httpOnly:true,
                maxAge:1000*20
            })
    }
    if(query_user.data3){
        res.cookie("Data3",query_user.data3,{
            httpOnly:false,
            maxAge:1000*20
        })
    }
    res.send('querys');
});
app.get('/ruta1', (req, res) => {
    res.send('Futbol');
});

app.get('/ruta2', (req, res) => {
    res.send('Futbol americano');
});
app.get('/ruta3', (req, res) => {
    res.send('Basquetbol');
});

app.get('/ruta4', (req, res) => {
    res.send('Voleyball');
});
app.get('/ruta5', (req, res) => {
    res.send('Taekwondo');
});
app.get('/historial', (req, res) => {
    const paginas = req.session.visitados
    res.send(`Páginas consultadas: ${JSON.stringify(paginas)}`);
});

app.listen(port, () => {
    console.log(`Escuchando puerto `,port);
});