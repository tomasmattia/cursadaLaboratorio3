export abstract class FiguraGeometrica
{
    protected _color : string;
    protected _perimetro : number;
    protected _superficie : number;

    public constructor(color:string)
    {
        this._color=color;
    }

    public GetColor():string
    {
        return this._color;
    }

    public abstract Dibujar():string;

    protected abstract CalcularDatos():string;

    public ToString():string
    {
        return this._color+" "+this._perimetro+" "+this._superficie+" "+this.Dibujar();
    }
}

class Rectangulo extends FiguraGeometrica
{
    private _ladoUno:number;
    private _ladoDos:number;

    public constructor(color:string,l1:number,l2:number)
    {
        super(color);
        this._ladoUno=l1;
        this._ladoDos=l2;
    }

    protected CalcularDatos()
    {
        
    }
}