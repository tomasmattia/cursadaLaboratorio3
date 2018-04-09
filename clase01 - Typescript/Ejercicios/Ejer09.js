function factorial(num) {
    var factor = 1;
    for (var i = 1; i <= num; i++) {
        factor = factor * i;
    }
    console.log(factor);
}
factorial(4);
function cube(num) {
    return num * num * num;
}
function mostrarCube() {
    console.log(cube(5));
}
mostrarCube();


