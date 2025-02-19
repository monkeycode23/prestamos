const mensaje: string = "Hola, TypeScript!";
console.log(mensaje);

const suma = (a: number, b: number) => a + b;
console.log(suma(2, 3));


const persona = {
    nombre: "Juan",
    edad: 30,
    ciudad: "Madrid"
};

console.log(persona);       

interface Usuario {
    nombre: string;
    edad: number;
    ciudad: string;
}


