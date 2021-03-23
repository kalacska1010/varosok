$(function () {
    // ha a beviteli mező tartalma változik akkor küldjünk egy kérést a szervernek
    $("#vnev").on("keyup", beolvas);
    //az hogy milyen karakterek vannak már leírva a beviteli mezőbe
    //adja vissza azokat a városokat amilyen betűvel kezdődnek
    // ezek kiírása <p>
    $("article").delegate("th", "click", rendez);
    $("article").delegate("th","mouseenter",rarak);
    $("article").delegate("th","mouseleave",levesz);
});
var varosok = [];
function beolvas() {
    // console.log($("#vnev").val());
    $.ajax({
        type: "GET",
        url: "feldolgoz.php?nev=" + $("#vnev").val(),
        success: function (result) {
            console.log(result);
            varosok = JSON.parse(result);
            console.log(varosok);
            kiir();
        },
        error: function () {
            alert("Hiba az adatok betöltésekor!");
        }
    });

    function kiir() {
        var txt = "<table><tr><th id= 'nev'>Városnév</th><th id='Jaras' >Járás</th><th id='megye'>Megye</th></tr><th></th>";
        for (var i = 0; i < varosok.length; i++) {
            txt += "<tr><td>" + varosok[i].nev + "</td><td>" + varosok[i].megye + "</td><td>" + varosok[i].jaras +"</td><td>" + <button id="torol">Töröl</button> + "</td></tr>";
        }
        txt += "</table>";
        $("article").html(txt);

        txt = "<select>";
        for (var i = 0; i < varosok.length; i++) {
            txt += "<option>" + varosok[i].nev + "</option>";
        }
        txt += "</select>";
        $("#legordulo").html(txt);

        varirany = false;



    }

}
var irany = false;
function rendez() {
    console.log($(this).attr("id"));
    var ez = $(this).attr("id");
//    if (ez === "id") {
//        varosok.sort(function (a, b) {
//            if (irany) {
//                return Number(a[ez]) - Number(b[ez]);
//            } else {
//                return Number(b[ez]) - Number(a[ez]);
//            }
//        });
//    } else {
        varosok.sort(function (a, b) {
            if (irany) {
                return Number(a[ez] > b[ez]) - 0.5;
            } else {
                return Number(a[ez] < b[ez]) - 0.5;
            }
        });
//    }
    irany = !irany;
    kiir();

}

function rarak(){
    $(this).addClass("feljec");
}
function levesz(){
    $(this).removeClass("feljec");
}