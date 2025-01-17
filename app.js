const noticiasDia = require("./scraping");
const express = require("express");
const fs = require("fs");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const noticiasDos = [];

const clonarNoticias = async () => {
    const noticiasClon = await noticiasDia();
    noticiasDos.push(...noticiasClon)
}
clonarNoticias();

app.get("/", (req, res) => {
    res.send(`
        <h1>Noticias del Día - El País</h1>
        <a href="/noticias">
        <p>Mira Las Últimas Noticias del Día</p>
        </a>`)
})

//READ
app.get("/noticias", (req, res) => {
    try {
        res.send(`
        ${noticiasDos.map((noticia) => `
            <h1>${noticia.titulo}</h1>
            <img src="${noticia.imagen}" alt="Imagen Obtenida del Periódico El País" style="max-width:200px;">
            <p>${noticia.descripcion}</p>
            <a href="${noticia.enlace}"><p>Noticia Completa</p></a>
            `).join("")}
        `);
    } 
    catch (error) {
        res.status(500).send("Error en la Respuesta");
    }
});

app.post("/noticias", (req, res ) => {
    const nuevaNoticia = {
        titulo: req.body.titulo,
        imagen: req.body.imagen,
        descripcion: req.body.descripcion,
        enlace: req.body.enlace,
    }
})

app.use((req, res) => {
    res.send(`<h1>404 - No se ha Encontrado la Página</h1>`)
})

app.listen(9000, () => {
    console.log("Server Linstening On PORT, http://localhost:9000");
})
