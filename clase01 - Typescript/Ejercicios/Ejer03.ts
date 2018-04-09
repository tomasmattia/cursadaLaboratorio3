var numero : Number=5;
var letras : string;

function checker(numero:Number, frase?:string):void
{
    if(frase !=undefined && numero >0)
    {
        for(let i=0;i<numero;i++)
        {
            console.log(frase);
        }
    }
    else
    {
        console.log(-numero);
    }
}

checker(numero,letras);