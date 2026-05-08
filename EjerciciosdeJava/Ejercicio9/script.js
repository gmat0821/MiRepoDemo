const contenedorEntradas = document.getElementById("entradas");
const todasLasEntradas = document.querySelectorAll(".entrada");

contenedorEntradas.addEventListener("input", function (e) {
    const objetivo = e.target;
    const valor = objetivo.value;
    if (isNaN(valor)) {
        objetivo.value = "";
        return;
    }
    if (valor !== "") {
        const siguiente = objetivo.nextElementSibling;
        if (siguiente) {
            siguiente.focus();
        }
    }
    verificarCodigo();
});

contenedorEntradas.addEventListener("keyup", function (e) {
    const objetivo = e.target;
    const tecla = e.key.toLowerCase();

    if (tecla === "backspace" || tecla === "delete") {
        objetivo.value = "";
        const anterior = objetivo.previousElementSibling;
        if (anterior) {
            anterior.focus();
        }
    }
});

function verificarCodigo() {
    let codigoCompleto = "";
    todasLasEntradas.forEach(input => {
        codigoCompleto += input.value;
    });
    if (codigoCompleto.length === 4) {
        if (codigoCompleto === "7777") {
            alert("Has iniciado sesión con éxito");
        } else {
            console.log("Código incorrecto");
        }
    }
}