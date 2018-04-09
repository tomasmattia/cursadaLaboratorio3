var numero :number=8;

function checker(num:number):void
{
    if(num%2!=0)
    {
        console.log("El numero "+numero+" es impar");
    }
    else
    {
        console.log("El numero "+numero+" es par");
    }
}

checker(numero);