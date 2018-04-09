function primos():void
{
    var contadorPrimos:number=0;
    for(var i:number=2;contadorPrimos<21;i++)
    {
        for(var k:number=2;k<i/2;k++)
        {
            if(i%k==0)
            {
                break;
            }
        }
        if(i%k!=0 || i==2)
        {
            contadorPrimos++;
            console.log(i);
        }
    }
}

primos();