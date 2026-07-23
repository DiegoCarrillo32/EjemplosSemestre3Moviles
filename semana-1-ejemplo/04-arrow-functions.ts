const sumar = (a: number, b: number) => {
  return a + b;
};

const saludar = (nombre: string, saludo?: string): string => {
  return `${saludo ?? "Hola"} ${nombre}`;
};

export {};
