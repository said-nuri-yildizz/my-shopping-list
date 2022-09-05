function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}


function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}


function bekle(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function googleTranslateElementInit() {
    new google.translate.TranslateElement(
        { pageLanguage: 'en' },
        'google_translate_element'
    );
}
document.write('<script src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"><\/script>');

var dilSecmeModeli = '';
dilSecmeModeli += '<button id="dil_secme_modelini_acan_buton" hidden data-bs-toggle="modal" data-bs-target="#dil_secme_modeli"></button>';
dilSecmeModeli += '<div class="modal fade" id="dil_secme_modeli" tabindex="-1" aria-labelledby="dil_secme_modeli_basligi" aria-hidden="true">';
dilSecmeModeli += '<div class="modal-dialog modal-fullscreen">';
dilSecmeModeli += '<div class="modal-content">';
dilSecmeModeli += '<div class="modal-header">';
dilSecmeModeli += '<h5 class="modal-title" id="dil_secme_modeli_basligi">';
dilSecmeModeli += '<img src="https://img.icons8.com/cute-clipart/64/000000/language.png" />';
dilSecmeModeli += 'Choose your language';
dilSecmeModeli += '</h5>';
dilSecmeModeli += '<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>';
dilSecmeModeli += '</div>';
dilSecmeModeli += '<div class="modal-body">';
dilSecmeModeli += '<p>Select the language you speak from the drop-down list below.</p>';
dilSecmeModeli += '<select translate="no" id="dil-secme-kutusu" class="form-select">';
dilSecmeModeli += '</select>';
dilSecmeModeli += '</div>';
dilSecmeModeli += '<div class="modal-footer">';
dilSecmeModeli += '<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>';
dilSecmeModeli += '<button onclick="dilSec();" type="button" class="btn btn-primary" data-bs-dismiss="modal">Save changes</button>';
dilSecmeModeli += '</div>';
dilSecmeModeli += '</div>';
dilSecmeModeli += '</div>';
dilSecmeModeli += '</div>';
document.write(dilSecmeModeli);

async function dilSecmeKutusunuOlustur() {
    while (true) {
        await bekle(100);
        if (document.getElementById("dil-secme-kutusu") != null) {
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function () {
                if (xhr.readyState == XMLHttpRequest.DONE) {
                    var diller = JSON.parse(xhr.responseText);
                    var htmlKodu = "";
                    for (var f1 = 0; f1 < diller.length; f1++) {
                        htmlKodu += '<option value="' + diller[f1][1] + '">' + diller[f1][0] + '</option>';
                    }
                    document.getElementById("dil-secme-kutusu").innerHTML = htmlKodu;
                }
            }
            xhr.open('GET', 'dil-kodlari.json?x='+ new Date().valueOf(), true);
            xhr.send(null);
            break;
        }
    }
}
dilSecmeKutusunuOlustur();


function dilSec() {
    var dilKodu = document.getElementById("dil-secme-kutusu")[document.getElementById("dil-secme-kutusu").selectedIndex].value;
    if (dilKodu != "") {
        localStorage.setItem("dil", "/en/" + dilKodu)
        setCookie("googtrans", "/en/" + dilKodu, 36500);
        window.location.reload();
    }
}


async function dilSecilmediyseModeliAc() {
    while (true) {
        await bekle(100);
        if (document.getElementById("dil-secme-kutusu") != null) {
            if (localStorage.getItem("dil") == null) {
                document.getElementById("dil_secme_modelini_acan_buton").click();
            } else {
                if (getCookie("googtrans") != localStorage.getItem("dil")) {
                    setCookie("googtrans", localStorage.getItem("dil"), 36500);
                    window.location.reload();
                }
            }
            break;
        }
    }
}
dilSecilmediyseModeliAc();


async function gereksizDilSecmeKutulariniGizle() {
    while (true) {
        await bekle(100);
        if (document.getElementsByClassName("goog-te-banner-frame skiptranslate").length > 0) {
            document.getElementsByClassName("goog-te-banner-frame skiptranslate")[0].style = "visibility: hidden;";
            if (document.getElementById("goog-gt-tt") != null) {
                document.getElementById("goog-gt-tt").remove();
            }
            document.getElementsByTagName("body")[0].style = "";
            break;
        }
    }
}
gereksizDilSecmeKutulariniGizle();