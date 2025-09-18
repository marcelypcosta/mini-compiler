/**
 * Token.js
 *
 * Define a estrutura de um Token.
 */
export class Token {
    constructor(tipo, texto) {
        this.tipo = tipo;
        this.texto = texto;
    }

    toString() {
        return `Token [Tipo: ${this.tipo}, Texto: '${this.texto}']`;
    }
}