// 1
interface Pocion {
  efecto(): string;
  precio(): number;
}

// 2
class PocionBase implements Pocion {
  private alquimista: string;

  constructor(alquimista: string) {
    this.alquimista = alquimista;
  }

  efecto(): string {
    return "electrolitos para el cuerpo";
  }

  precio(): number {
    return 10;
  }

  getAlquimista() {
    return this.alquimista;
  }
}

// 3
abstract class DecoradorPocion implements Pocion {
  protected pocion: Pocion;

  constructor(pocion: Pocion) {
    this.pocion = pocion;
  }

  abstract efecto(): string;
  abstract precio(): number;
}

// 4
class ConAumentoDeFuerza extends DecoradorPocion {
  efecto(): string {
    return `${this.pocion.efecto()} con aumento de fuerza`;
  }

  precio(): number {
    return this.pocion.precio() + 20;
  }
}

class ConAumentoDeVelocidad extends DecoradorPocion {
  efecto(): string {
    return `${this.pocion.efecto()} con aumento de velocidad`;
  }

  precio(): number {
    return this.pocion.precio() + 30;
  }
}

const pocion = new PocionBase("Merlin");
console.log(
  `${pocion.efecto()} - Precio: ${pocion.precio()} monedas - [Alquimista: ${pocion.getAlquimista()}]`
);

const pocionDeFuerza = new ConAumentoDeFuerza(pocion);
console.log(
  `${pocionDeFuerza.efecto()} - Precio: ${pocionDeFuerza.precio()} monedas`
);

const pocionDeFuerzaVelocidad = new ConAumentoDeVelocidad(pocionDeFuerza);
console.log(
  `${pocionDeFuerzaVelocidad.efecto()} - Precio: ${pocionDeFuerzaVelocidad.precio()} monedas`
);
