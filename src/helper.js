//obtiene la diferencia de años
export function obtenerDiferenciaYear(year){
    return new Date().getFullYear() - year;
}

//calcula la diferencia a pagar segun la marca
export function calcularMarca(marca){
    let incremento

    switch (marca) {
        case 'europeo':
            incremento = 1.3;
            break;
        case 'asiatico':
            incremento = 1.05;
            break;
        case 'americano':
            incremento = 1.15;
            break;
        default:
            break;
    }
    return incremento;
}

//calcular segun el plan
export function calcularPlan(plan){
    return plan === 'basico' ? 1.2 : 1.5;
}

//transforma la primer letra del texto en mayuscula
export function primerMayuscula(texto){
    return texto.charAt(0).toUpperCase() + texto.slice(1);
}