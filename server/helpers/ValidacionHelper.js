class ValidacionHelper {

    validarRutChileno(rut) {
        var validado = false;

        if (rut.length == 12) {
            var numero1 = rut.substr(0, 2);
            var punto1 = rut.substr(2, 1);
            var numero2 = rut.substr(3, 3);
            var punto2 = rut.substr(6, 1);
            var numero3 = rut.substr(7, 3);
            var guion = rut.substr(10, 1);
            var digitoVerificador = rut.substr(-1);

            if (Number(numero1) && Number(numero2) && Number(numero3)) {
                if (punto1 == "." && punto2 == ".") {
                    if (guion == "-") {
                        if (Number(digitoVerificador) || digitoVerificador == "k" || digitoVerificador == "K") {
                            validado = true;
                        }
                    }
                }
            }
        }

        if (rut.length == 11) {
            var numero1 = rut.substr(0, 1);
            var punto1 = rut.substr(1, 1);
            var numero2 = rut.substr(2, 3);
            var punto2 = rut.substr(5, 1);
            var numero3 = rut.substr(6, 3);
            var guion = rut.substr(9, 1);
            var digitoVerificador = rut.substr(-1);

            if (Number(numero1) && Number(numero2) && Number(numero3)) {
                if (punto1 == "." && punto2 == ".") {
                    if (guion == "-") {
                        if (Number(digitoVerificador) || digitoVerificador == "k" || digitoVerificador == "K") {
                            validado = true;
                        }
                    }
                }
            }
        }
        return validado;
    }

}

module.exports = ValidacionHelper;