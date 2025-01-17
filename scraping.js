const express = require("express")
const axios = require("axios");
const cheerio = require("cheerio")
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const url = "https://elpais.com/ultimas-noticias/";
let noticias = [];

app.get("/", async (req, res) => {
    try {
        const response = await axios.get(url);
        if (response.status === 200) {
            const html = response.data;
            const $ = cheerio.load(html);
            const title = $("title").text() 
            
            $('article.c.c-d.c--m').each((index, element) => {
                const titulo = $(element).find('.c_t').text().trim() || "Sin título";
                const imagen = $(element).find('.c_m_e').attr('src') || "Sin imagen";
                const descripcion = $(element).find('.c_d').text().trim() || "Sin descripción";
                const enlace = $(element).find('a').attr('href') || "#";

                
                noticias.push({
                    titulo,
                    imagen,
                    descripcion,
                    enlace,
                });
            });

            res.send(`
                <h1>${title}</h1>
                <a href="/noticias">
                <p>Accedé a Las Últimas Noticias de El País</p>
                </a>
            `);
        }
    } catch (error) {
        console.error("Error al procesar la solicitud:", error);
        res.status(500).send("Error interno del servidor");
    }
});

app.get("/noticias", (req, res) => {
    res.send(noticias)
})

app.use((req, res) => {
    res.status(404).send(`
        <h1>404 - Página no Encontrada</h1>
        a href="/">Volver al Home</a>
        `);
});

app.listen(8000, () => {
    console.log("Server Linstening On PORT, http://localhost:8000");
})
console.log("JSON NOTICIAS", noticias);