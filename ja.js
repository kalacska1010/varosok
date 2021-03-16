$(function(){
  // ha a beviteli mező tartalma változik akkor küldjünk egy kérést a szervernek
  $("#vnev").on("keyup", beolvas);
 //az hogy milyen karakterek vannak már leírva a beviteli mezőbe
  //adja vissza azokat a városokat amilyen betűvel kezdődnek
  // ezek kiírása <p>
  
});
var varosok= [];
function beolvas(){
    // console.log($("#vnev").val());
    $.ajax({
        type: "GET",
        url: "feldolgoz.php?nev="+$("#vnev").val(),
        success: function (result){
            console.log(result);
            varosok = JSON.parse(result);
            console.log(varosok);
            //kiir();
        },
        error: function () {
            alert("Hiba az adatok betöltésekor!");
        }
    });
}
