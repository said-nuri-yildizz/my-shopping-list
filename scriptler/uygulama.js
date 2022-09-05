function xssKorumasi(veri) {
    return String(veri)
        .replace(/[\u00A0-\u9999<>\&]/g, function (i) {
            return '&#' + i.charCodeAt(0) + ';';
        });
}


function hizliUrunEkle(urunAdi, element) {
    var eklenecekUrunler = [];
    for (var f1 = 0; f1 < document.getElementsByName("eklenecek_urun").length; f1++) {
        eklenecekUrunler[f1] = document.getElementsByName("eklenecek_urun")[f1].value;
    }
    var inputHTML = "";
    inputHTML += '<div class="input-group mb-3">';
    inputHTML += '<span class="input-group-text bg-light" id="urun_adi_eklenti">';
    inputHTML += '<img style="width: 30px;height: 30px;" src="/gorseller/mavi-etiket.png">';
    inputHTML += '</span>';
    inputHTML += '<input value="' + urunAdi + '" name="eklenecek_urun" type="text" class="form-control lead" placeholder="Enter the product you will receive." aria-label="Enter the product you will receive." aria-describedby="urun_adi_eklenti">';
    inputHTML += '</div>';
    document.getElementById("eklenecek_urunler").innerHTML += inputHTML;
    for (var f1 = 0; f1 < document.getElementsByName("eklenecek_urun").length - 1; f1++) {
        document.getElementsByName("eklenecek_urun")[f1].value = eklenecekUrunler[f1];
    }
    var mevcutResim = element.attributes["resimYolu"].nodeValue;
    element.src = "https://img.icons8.com/cute-clipart/80/000000/ok.png";
    setTimeout(() => {
        element.src = mevcutResim;
    }, 500);
}


function urunEkle(kategoriAdi) {
    for (var f1 = 0; f1 < document.getElementsByName("eklenecek_urun").length; f1++) {
        if (document.getElementsByName("eklenecek_urun")[f1].value.trim() == "") {
            continue;
        }
        var urunMevcutmu = false;
        for (var f2 = 0; f2 < urunler.length; f2++) {
            if (kategoriAdi == urunler[f2][0] && document.getElementsByName("eklenecek_urun")[f1].value == urunler[f2][1]) {
                urunMevcutmu = true;
            }
        }
        if (urunMevcutmu) {
            continue;
        }
        var eklenecekUrun = [kategoriAdi, xssKorumasi(document.getElementsByName("eklenecek_urun")[f1].value.trim().toString()), false];
        urunler.push(eklenecekUrun);
        localStorage.setItem("urunler", JSON.stringify(urunler));
    }
    kategorileriOlustur();
    urunleriOlustur(kategoriAdi);
}


function dinamikModelOlustur(baslik, govde, footerHTML) {
    document.getElementById("dinamik_modelin_basligi").innerText = baslik;
    document.getElementById("dinamik_modelin_govdesi").innerText = govde;
    var butonunHtmlKodu = "";
    if (footerHTML == null) {
        butonunHtmlKodu = '<button type="button" class="btn btn-primary ps-5 pe-5" data-bs-dismiss="modal">Okay</button>';
    } else {
        butonunHtmlKodu = footerHTML;
    }
    document.getElementById("dinamik_modelin_footeri").innerHTML = butonunHtmlKodu;
    document.getElementById("dinamik_modeli_acan_buton").click();
}


function yeniKategoriEkle() {
    var yeniKategoriAdi = xssKorumasi(document.getElementById("yeni_kategori_adi").value.trim().toString());
    if (yeniKategoriAdi != "") {
        var kategoriMevcutmu = false;
        for (var f1 = 0; f1 < kategoriler.length; f1++) {
            if (kategoriler[f1] == yeniKategoriAdi) {
                kategoriMevcutmu = true;
            }
        }
        if (kategoriMevcutmu) {
            dinamikModelOlustur("Category available", "there is a category called \"" + yeniKategoriAdi + "\"");
            return;
        }
        kategoriler.push(yeniKategoriAdi);
        localStorage.setItem("kategoriler", JSON.stringify(kategoriler));
        document.getElementById("kategori_ekleme_modelini_kapatan_buton").click();
        kategorileriOlustur();
        urunleriOlustur();
    }
}


function kategorileriOlustur() {
    var htmlKodu = "";
    for (var f1 = 0; f1 < kategoriler.length; f1++) {
        htmlKodu += '<div class="accordion-item">';
        htmlKodu += '<h2 class="accordion-header" id="kategoriID' + f1 + '">';
        htmlKodu += '<button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#kategoriID_' + f1 + '" aria-expanded="false" aria-controls="kategoriID_' + f1 + '">';
        htmlKodu += '<img style="width:35px;height:35px;" src="https://img.icons8.com/cute-clipart/100/000000/shopping-cart.png">&nbsp;' + kategoriler[f1];
        htmlKodu += '</button>';
        htmlKodu += '</h2>';
        htmlKodu += '<div id="kategoriID_' + f1 + '" class="accordion-collapse collapse" aria-labelledby="kategoriID' + f1 + '" data-bs-parent="#kategoriler">';
        htmlKodu += '<div class="accordion-body">';
        htmlKodu += '<table class="table table-bordered text-center table-sm">';
        htmlKodu += '<tr>';
        htmlKodu += '<td>';
        htmlKodu += '<img onclick="urunEklemeModeliniAc(\'' + kategoriler[f1] + "'," + f1 + ')" style="width:35px;height:35px;cursor:pointer;" src="/gorseller/liste-ekle.png">';
        htmlKodu += '</td>';
        htmlKodu += '<td>';
        htmlKodu += '<img onclick="kategoriSilmeModeliniAc(\'' + kategoriler[f1] + "'," + f1 + ');" style="width:35px;height:35px;cursor:pointer;" src="/gorseller/kategori-sil.png">';
        htmlKodu += '</td>';
        htmlKodu += '</tr>';
        htmlKodu += '</table>';
        htmlKodu += '<ul class="list-group" id="kategoriID' + f1 + 'UrunListesi">';
        htmlKodu += '</ul>';
        htmlKodu += '</div>';
        htmlKodu += '</div>';
        htmlKodu += '</div>';
        htmlKodu += '</div> ';
    }
    if (kategoriler.length == 0) {
        htmlKodu += '<div data-bs-toggle="modal" data-bs-target="#kategori_ekleme_modeli" style="cursor:pointer;" class="p-4 bg-white shadow-sm">';
        htmlKodu += '<table>';
        htmlKodu += '<tr>';
        htmlKodu += '<td><img style="width:55px;height:55px;" src="/gorseller/kategori-ekle.png"></td>';
        htmlKodu += '<td>&nbsp;</td>';
        htmlKodu += '<td>There are no categories available. Click here to add a category.</td>';
        htmlKodu += '</tr>';
        htmlKodu += '</table>';
        htmlKodu += '</div>';
    }
    document.getElementById("kategoriler").innerHTML = htmlKodu;
}


function urunleriOlustur(kategoriAdi) {
    for (var f1 = 0; f1 < kategoriler.length; f1++) {
        for (var f2 = 0; f2 < urunler.length; f2++) {
            if (kategoriler[f1] == urunler[f2][0]) {
                var htmlKodu = '<li class="list-group-item d-flex justify-content-between align-items-center">';
                if (urunler[f2][2] == true) {
                    htmlKodu += '<span><input checked onchange="urunuTikle(this,' + f2 + ')" class="form-check-input me-1" type="checkbox" value="" id="' + MD5(unescape(encodeURIComponent(urunler[f2][1]))); +'">';
                    htmlKodu += '<label class="form-check-label" for="firstCheckbox"><span class="text-decoration-line-through">' + urunler[f2][1] + '</span></label></span>';
                } else {
                    htmlKodu += '<span><input onchange="urunuTikle(this,' + f2 + ')" class="form-check-input me-1" type="checkbox" value="" id="' + MD5(unescape(encodeURIComponent(urunler[f2][1]))); +'">';
                    htmlKodu += '<label class="form-check-label" for="firstCheckbox"><span>' + urunler[f2][1] + '</span></label></span>';
                }
                htmlKodu += '<img onclick="urunSil(' + f2 + ',\'' + xssKorumasi(kategoriler[f1]) + '\')" style="width:30px;height:30px;cursor:pointer;" src="https://img.icons8.com/cute-clipart/100/000000/close-window.png">';
                htmlKodu += '</li>';
                document.getElementById("kategoriID" + f1 + "UrunListesi").innerHTML += htmlKodu;
            }
        }
    }
    if (kategoriAdi != null) {
        for (var f1 = 0; f1 < document.getElementsByClassName("accordion-collapse").length; f1++) {
            if (xssKorumasi(document.getElementsByClassName("accordion-button")[f1].innerText.trim()) == kategoriAdi.trim()) {
                document.getElementsByClassName("accordion-collapse")[f1].classList = "accordion-collapse collapse show"
            }
        }
    }
}


function urunSil(urunNo, kategoriAdi) {
    var yeniurunler = [];
    var f0 = 0;
    for (var f1 = 0; f1 < urunler.length; f1++) {
        if (urunNo != f1) {
            yeniurunler[f0] = urunler[f1];
            f0++;
        }
    }
    urunler = yeniurunler;
    localStorage.setItem("urunler", JSON.stringify(urunler));
    kategorileriOlustur();
    urunleriOlustur(kategoriAdi);
}


function kategoriSil(elemanNo) {
    var yeniKategoriler = [];
    var yeniUrunler = [];
    var f0 = 0;
    for (var f1 = 0; f1 < urunler.length; f1++) {
        if (urunler[f1][0] != kategoriler[0]) {
            yeniUrunler[f0] = urunler[f1];
            f0++;
        }
    }
    f0 = 0;
    for (var f1 = 0; f1 < kategoriler.length; f1++) {
        if (elemanNo != f1) {
            yeniKategoriler[f0] = kategoriler[f1];
            f0++;
        }
    }
    kategoriler = yeniKategoriler;
    urunler = yeniUrunler;
    localStorage.setItem("kategoriler", JSON.stringify(kategoriler));
    localStorage.setItem("urunler", JSON.stringify(urunler));
    kategorileriOlustur();
    urunleriOlustur();
}


function urunEklemeModeliniAc(kategoriAdi, elemanNo) {
    var inputHTML = "";
    inputHTML += '<div class="input-group mb-3">';
    inputHTML += '<span class="input-group-text bg-light" id="urun_adi_eklenti">';
    inputHTML += '<img style="width: 30px;height: 30px;" src="/gorseller/mavi-etiket.png">';
    inputHTML += '</span>';
    inputHTML += '<input maxlength="50" name="eklenecek_urun" type="text" class="form-control lead" placeholder="Enter the product you will receive." aria-label="Enter the product you will receive." aria-describedby="urun_adi_eklenti">';
    inputHTML += '</div>';
    document.getElementById("eklenecek_urunler").innerHTML = inputHTML;
    document.getElementById("urunun_eklenecegi_kategorinin_adi").innerText = kategoriAdi;
    document.getElementById("urun_ekleme_butonu").attributes["onclick"].value = "urunEkle('" + xssKorumasi(kategoriAdi) + "');"
    document.getElementById("urun_ekleme_modelini_acan_buton").click();
}


function eklenecekUrunlerinSayisiniArttir() {
    var eklenecekUrunler = [];
    for (var f1 = 0; f1 < document.getElementsByName("eklenecek_urun").length; f1++) {
        eklenecekUrunler[f1] = document.getElementsByName("eklenecek_urun")[f1].value;
    }
    var inputHTML = "";
    inputHTML += '<div class="input-group mb-3">';
    inputHTML += '<span class="input-group-text bg-light" id="urun_adi_eklenti">';
    inputHTML += '<img style="width: 30px;height: 30px;" src="/gorseller/mavi-etiket.png">';
    inputHTML += '</span>';
    inputHTML += '<input maxlength="50" name="eklenecek_urun" type="text" class="form-control lead" placeholder="Enter the product you will receive." aria-label="Enter the product you will receive." aria-describedby="urun_adi_eklenti">';
    inputHTML += '</div>';
    document.getElementById("eklenecek_urunler").innerHTML += inputHTML;
    for (var f1 = 0; f1 < document.getElementsByName("eklenecek_urun").length - 1; f1++) {
        document.getElementsByName("eklenecek_urun")[f1].value = eklenecekUrunler[f1];
    }
}


function kategoriSilmeModeliniAc(silinecekKategorininAdi, elemanNo) {
    document.getElementById("silinecek_kategorinin_adi").innerText = silinecekKategorininAdi;
    document.getElementById("kategoriyi_silmek_istedigime_eminim_butonu").attributes["onclick"].value = "kategoriSil(" + elemanNo + ");"
    document.getElementById("kategori_silme_modelini_acan_buton").click();
}

function urunuTikle(element, urunNo) {
    if (element.checked == true) {
        console.log(element.parentElement.childNodes[1].classList = "text-decoration-line-through")
        urunler[urunNo][2] = true;
    } else {
        console.log(element.parentElement.childNodes[1].classList = "")
        urunler[urunNo][2] = false;
    }
    localStorage.setItem("urunler", JSON.stringify(urunler));
}

kategorileriOlustur();
urunleriOlustur();