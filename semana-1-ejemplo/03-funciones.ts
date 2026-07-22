// function normal
function sumar(a: number, b: number) {
  return a + b;
}

// parametros opcionales
function saludar(nombre: string, saludo?: string): string {
  return `${saludo ?? "Hola"} ${nombre}`;
}

function multiplicar(a: number, b: number = 2): number {
  return a * b;
}

function sumarTodo(...numeros: number[]): number {
  return numeros.reduce((total, n) => total + n, 0);
}
