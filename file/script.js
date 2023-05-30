//Se non si ha un monitor FULL HD (1920 x 1080) usare uno zoom del 67% ma non uscirà bene

const imgpath = [];
const nome = ["La seconda notte di nozze", "Pelè", "Tutti per UMA"];
var sale_posti = [150, 170, 200], guodagni = 0;
var testo_pre = "", testo_cassa = "Totale incasso: 0€", testo_bigletti = "";
var incassosala1 = 0, incassosala2 = 0, incassosala3 = 0;

for (i = 0; i < 3; i++) {
    imgpath.push("file/img"+i+".png");
}

for (i = 0; i < imgpath.length; i++) {
    immagine = document.getElementById("img" + i);
    immagine.src = imgpath[i];
    immagine.title = nome[i];
}


function cassa(sala, flag) {
    posti = sale_posti[sala-1];
    if (document.getElementById("number_field_intero"+sala).value >= 0 && document.getElementById("number_field_ridotto"+sala).value >= 0) {
        temp = parseInt(document.getElementById("number_field_ridotto"+sala).value) + parseInt(document.getElementById("number_field_intero"+sala).value);
    }else temp = -1;
    if (posti > 0 && (temp > 0 && temp <= posti)) {
        guodagni_temp = parseInt(document.getElementById("number_field_ridotto"+sala).value) * 5 + parseInt(document.getElementById("number_field_intero"+sala).value) * 8;
        testo_pre = "Prezzo dei biglietti: "+ guodagni_temp +"€";
        if (flag) {
            sale_posti[sala-1] -= temp;
            guodagni += guodagni_temp;
            (sala == 1) ? incassosala1 += guodagni_temp : (sala == 2) ? incassosala2 += guodagni_temp : incassosala3 += guodagni_temp;
            testo_cassa = "Totale incasso: "+ guodagni +"€"
            testo_bigletti = (sala == 1) ? sale_posti[sala-1] +" / 150 Posti disponibili" : (sala == 2) ? sale_posti[sala-1] +" / 170 Posti disponibili" : sale_posti[sala-1] +" / 200 Posti disponibili";
            check(sala);
        }else testo_bigletti = (sala == 1) ? sale_posti[sala-1] +" / 150 Posti disponibili" : (sala == 2) ? sale_posti[sala-1] +" / 170 Posti disponibili" : sale_posti[sala-1] +" / 200 Posti disponibili";
    }else if (posti == 0) {
        testo_pre = "Errore. Posti terminati";
        testo_bigletti = (sala == 1) ? sale_posti[sala-1] +" / 150 Posti disponibili" : (sala == 2) ? sale_posti[sala-1] +" / 170 Posti disponibili" : sale_posti[sala-1] +" / 200 Posti disponibili";
    }else {
        testo_pre = "Errore. Inserimento errato";
        testo_bigletti = (sala == 1) ? sale_posti[sala-1] +" / 150 Posti disponibili" : (sala == 2) ? sale_posti[sala-1] +" / 170 Posti disponibili" : sale_posti[sala-1] +" / 200 Posti disponibili";
    }visualizza(sala);
}


function check(sala) {
    if (sale_posti[sala - 1] == 0) {
            testo_pre = "Posti ora terminati";
    }
}


function reset(sala) {
    if ((sala == 1) ? sale_posti[sala-1] != 150 : (sala == 2) ? sale_posti[sala-1] != 170 : sale_posti[sala-1] != 200 && guodagni != 0) {
        (sala == 1) ? sale_posti[sala-1] = 150 : (sala == 2) ? sale_posti[sala-1] = 170 : sale_posti[sala-1] = 200;
        document.getElementById("number_field_ridotto"+sala).value = 0;
        document.getElementById("number_field_intero"+sala).value = 0;
        guodagni -= (sala == 1) ? incassosala1 : (sala == 2) ? incassosala2 : incassosala3;
        testo_bigletti = (sala == 1) ? sale_posti[sala-1] +" / 150 Posti disponibili" : (sala == 2) ? sale_posti[sala-1] +" / 170 Posti disponibili" : sale_posti[sala-1] +" / 200 Posti disponibili";
        testo_cassa = "Totale incasso: "+ guodagni +"€"
        testo_pre = "Prezzo dei biglietti: 0€";
        (sala == 1) ? incassosala1 = 0 : (sala == 2) ? incassosala2 = 0 : incassosala3 = 0;
    }else {
        testo_pre = "Errore. Sala già inizializzata";
        testo_bigletti = testo_bigletti = (sala == 1) ? sale_posti[sala-1] +" / 150 Posti disponibili" : (sala == 2) ? sale_posti[sala-1] +" / 170 Posti disponibili" : sale_posti[sala-1] +" / 200 Posti disponibili";
    }visualizza(sala);
}


function visualizza(sala) {
    document.getElementById("prezzo_pre"+sala).innerHTML = testo_pre;
    document.getElementById("incasso").innerHTML = testo_cassa;
    document.getElementById("posti_sala"+sala).innerHTML = testo_bigletti;
}



//DISABILITA LA SELEZIONE TENENDO PREMUTO IL TASTO SINISTRO DEL MOUSE
window.onload = function() {
    document.onselectstart = function() {return false;}
    document.onmousedown = function() {return false;}
}

window.onload = function() {
    var element = document.querySelector("body");
    element.onselectstart = function () { return false; }
}