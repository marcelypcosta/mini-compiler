/**
 * Token.js
 *
 * Define a estrutura de um Token. Um token é a menor unidade de significado
 * em um código, como uma palavra-chave, um operador ou um número.
 */
export class Token {
    /**
     * Cria uma instância de um Token.
     * @param {string} tipo - A categoria do token (ex: TiposDeToken.IDENTIFICADOR).
     * @param {string} texto - O trecho de código original que este token representa (ex: "minhaVariavel").
     */
    constructor(tipo, texto) {
        this.tipo = tipo;
        this.texto = texto;
    }

    /**
     * Retorna uma representação do token em formato de string para facilitar a depuração.
     */
    toString() {
        return `Token [Tipo: ${this.tipo}, Texto: '${this.texto}']`;
    }
}