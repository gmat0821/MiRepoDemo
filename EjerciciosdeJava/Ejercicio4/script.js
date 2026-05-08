$(document).ready(function () {
    var pasoActual, pasoSiguiente, pasoAnterior;
    var indiceActual = 1;
    var totalPasos = $("fieldset").length;

    actualizarProgreso(indiceActual);

    $(".boton-siguiente").click(function () {
        pasoActual = $(this).parent();
        pasoSiguiente = $(this).parent().next();
        $("#barra-pasos li").eq($("fieldset").index(pasoSiguiente)).addClass("activo");

        pasoSiguiente.show();
        pasoActual.animate({ opacity: 0 }, {
            step: function (now) {
                var opacity = 1 - now;
                pasoActual.css({ 'display': 'none', 'position': 'relative' });
                pasoSiguiente.css({ 'opacity': opacity });
            },
            duration: 500
        });

        actualizarProgreso(++indiceActual);
    });

    $(".boton-anterior").click(function () {
        pasoActual = $(this).parent();
        pasoAnterior = $(this).parent().prev();
        $("#barra-pasos li").eq($("fieldset").index(pasoActual)).removeClass("activo");

        pasoAnterior.show();
        pasoActual.animate({ opacity: 0 }, {
            step: function (now) {
                var opacity = 1 - now;
                pasoActual.css({ 'display': 'none', 'position': 'relative' });
                pasoAnterior.css({ 'opacity': opacity });
            },
            duration: 500
        });

        actualizarProgreso(--indiceActual);
    });

    function actualizarProgreso(paso) {
        var porcentaje = ((paso - 1) / (totalPasos - 1)) * 100;
        $(".barra-relleno").css("width", porcentaje + "%");
    }
});