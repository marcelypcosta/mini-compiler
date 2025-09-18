/**
 * TiposDeToken.js
 *
 * Este ficheiro exporta um objeto imutável que funciona como uma enumeração
 * para todas as categorias de tokens que o nosso analisador pode reconhecer.
 */
export const TiposDeToken = Object.freeze({
    // Palavras Reservadas
    PALAVRA_RESERVADA_INT: 'PALAVRA_RESERVADA_INT',
    PALAVRA_RESERVADA_FLOAT: 'PALAVRA_RESERVADA_FLOAT',
    PALAVRA_RESERVADA_PRINT: 'PALAVRA_RESERVADA_PRINT',
    PALAVRA_RESERVADA_IF: 'PALAVRA_RESERVADA_IF',
    PALAVRA_RESERVADA_ELSE: 'PALAVRA_RESERVADA_ELSE',

    // Identificadores (nomes de variáveis)
    IDENTIFICADOR: 'IDENTIFICADOR',

    // Números
    NUMERO: 'NUMERO',

    // Operadores Relacionais (>, <, ==, etc.)
    OPERADOR_RELACIONAL: 'OPERADOR_RELACIONAL',

    // Operadores Matemáticos (+, -, *, /)
    OPERADOR_MATEMATICO: 'OPERADOR_MATEMATICO',

    // Operador de Atribuição (=)
    OPERADOR_ATRIBUICAO: 'OPERADOR_ATRIBUICAO',

    // Parênteses
    PARENTESE_ESQUERDO: 'PARENTESE_ESQUERDO',
    PARENTESE_DIREITO: 'PARENTESE_DIREITO',

    // Fim do Arquivo
    FIM_DE_ARQUIVO: 'FIM_DE_ARQUIVO'
});
