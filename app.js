const express = require("express");
const app = express();

const fs = require("fs");

app.use(express.json());

app.get("/", (gelen, giden) => {
    giden.redirect('/api');
    giden.end();
});

app.get("/api", (gelen, giden) => {
    giden.send({"hata":"yok","cevap": "Sahibim: Kıraç Armağan Önal","bulunan":["/olabilirmi", "/rastgelesayı", "/yüz", "/font", "/espiri"]});
    giden.end();
});

app.get("/api/olabilirmi", (gelen, giden) => {
    var obj = ["Evet!", "Hayır!", "Belki.", "Emin değilim.", "Tekrar sor.", "Belki daha sonra.", "Büyük ihtimalle evet.", "Büyük ihtimalle hayır.", "Cevap yok...", "Hayır olamaz!", "Evet kesinlikle!"];
    var cevap = obj[Math.floor(Math.random() * obj.length)]
    giden.send({"hata":"yok","cevap": cevap});
    giden.end();
});

app.get("/api/rastgelesay%C4%B1", (gelen, giden) => {
    const min = parseInt(gelen.query.min);
	const max = parseInt(gelen.query.max) + 1;
    if (max || min) {
    const cevap = Math.floor(Math.random() * (max - min)) + min;
   giden.send({"hata":"yok","cevap": String(cevap)});
   giden.end();
    } else {
        giden.send({"hata":"var","cevap": "Hata: Maksimum Veya Minimum Belirtilmemiş. '/rastgelesayı?min=1&max=10' "});
        giden.end();
    }
});

app.get("/api/y%C3%BCz", (gelen, giden) => {
    var yüzler = require("./JSON/Yüzler.json");
    var cevap = yüzler[Math.floor(Math.random() * yüzler.length)]
    giden.send({"hata":"yok","cevap": cevap});
    giden.end();
});

const FontMap = require("./JSON/FontMap.json");

app.get("/api/font", (gelen, giden) => {
    const girdi = gelen.query.girdi;
    const font = gelen.query.font;

    if (girdi && font == "geniş") {
        var cevap = girdi.mapReplace(FontMap.Wide);
        giden.send({"hata":"yok","cevap": cevap})
    } else {
        giden.send({"hata":"var","cevap":"Hata: Girdi Belirtilmemiş Veya Bilinmeyen Font. '/font?girdi=selam&font=' Fontlara '/api/fontlar'dan ulaşabilirsiniz."})
    } 
});

app.get("/api/fontlar", (gelen, giden) => {
    giden.send({"hata":"yok","cevap": ["geniş"]});
});

app.get("/api/espiri", (gelen, giden) => {
   const espiriler = require("./JSON/Espiriler.json");
    var cevap = espiriler[Math.floor(Math.random() * espiriler.length)]
    giden.send({"hata":"yok","cevap": cevap});
});

const _port = process.env.PORT || 8088;
app.listen(_port, () => {
    console.clear();
    console.log("Bilgi: "+_port+" Numaralı Port Dinleniyor.")
});









// Ek Özellikler

//Map Replace

String.prototype.mapReplace = function(map) {
    var regex = [];
    for(var key in map)
        regex.push(key.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&"));
    return this.replace(new RegExp(regex.join('|'),"g"),function(word){
        return map[word];
    });
};