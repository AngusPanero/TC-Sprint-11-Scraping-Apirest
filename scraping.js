const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");

const url = "https://elpais.com/ultimas-noticias/";
let noticias = [];

const noticiasDia = async () => {
    try {
        const response = await axios.get(url);
        if (response.status === 200) {
            const html = response.data;
            const $ = cheerio.load(html);

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

            
            fs.writeFileSync('noticias.json', JSON.stringify(noticias, null, 2));

            return noticias;
        }
    } catch (error) {
        console.error("Error En La Solicitud:", error.status);
        
    }
};

module.exports = noticiasDia;