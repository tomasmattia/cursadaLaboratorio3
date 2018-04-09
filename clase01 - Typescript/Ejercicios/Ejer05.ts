var nombre:string="tomas";
var apellido:string="mattia";

function MostrarNombreApellido(nombre:string,apellido:string):void
{
    console.log(`${apellido.toUpperCase()} , ${nombre[0].toUpperCase()}${nombre.slice(1).toLowerCase()}`);
}

MostrarNombreApellido(nombre,apellido);
