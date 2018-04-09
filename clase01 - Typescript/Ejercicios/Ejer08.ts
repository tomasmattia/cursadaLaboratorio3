function factorial(num:number):void
{
    var factor:number=1;
    for(let i:number=1;i<=num;i++)
    {
        factor=factor*i;
    }
    console.log(factor);
}

factorial(4);