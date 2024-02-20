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

app.use((req, res, next) => {
    if(!req.session.visitas){
        req.session.visitas={}
    }
    const rutaActual=req.path
    req.session.visitas[rutaActual]=req.session.visitas[rutaActual]||0
    req.session.visitas[rutaActual]++
    if(req.session.visitas[rutaActual]===3){
        const msg= `¡Eres el visitante número ${req.session.visitas['/']}/${rutaActual}`
        res.status(200).send(`<scrip>alert("'${msg}'")</script>`)
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
    const agent=req.headers['user-agent'];
    res.cookie("Navegador",agent,{
        httpOnly:true,
        maxAge: 9000,
    })
    res.send('Visita las paginas que tu quieras');
});
app.get('/query', (req, res) => {
    const_query_user=req.query
    if(query_user.Sabor1){
        res.cookie("Sabor1" , query_user.Sabor1,{
            httpOnly:true,
            maxAge:60*10000
        })
    }
        if(query_user.Sabor2){
            res.cookie("Sabor2" , query_user.Sabor2,{
                httpOnly:true,
                maxAge:60*10000
    })
}
    if(query_user.Sabor3){
        res.cookie("Sabor3" , query_user.Sabor3,{
            httpOnly:true,
            maxAge:60*10000
            })
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
    const paginas = req.session.visitas
    res.send(`Páginas consultadas: ${JSON.stringify(paginas)}`);
});

app.listen(port, () => {
    console.log(`Escuchando puerto `,port);
});