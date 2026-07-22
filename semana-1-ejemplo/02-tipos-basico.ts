let text: string = "hola";
let numero: number = 42;
let valid: boolean = false;

//listas, arrays
let numeros: number[] = [1, 2, 3];
let nombres: Array<string> = ["diego", "carrillo"];

// tupla
let coordenadas: [number, number] = [20, 30];

// union types
let id: string | number = 123;
id = "123";

// any
let anything: any = "whatever";
anything = false;

// unknown
let valorDesconocido: unknown = "texto";
if (typeof valorDesconocido === "string") {
  // do something
}

let sinValor: string | null = null;
let noDefinido: undefined = undefined;
