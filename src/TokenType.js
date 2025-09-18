/**
 * TiposDeToken.js
 *
 * Este arquivo exporta um objeto imutável que funciona como uma enumeração (enum)
 * para todas as categorias de tokens que nosso analisador léxico pode reconhecer.
 * Cada chave representa um tipo de token, conforme as regras do Ckp I.
 */
export const TiposDeToken = Object.freeze({
    // == Requisito 7: Palavras Reservadas ==
    PALAVRA_RESERVADA_INT: 'PALAVRA_RESERVADA_INT',
    PALAVRA_RESERVADA_FLOAT: 'PALAVRA_RESERVADA_FLOAT',
    PALAVRA_RESERVADA_PRINT: 'PALAVRA_RESERVADA_PRINT',
    PALAVRA_RESERVADA_IF: 'PALAVRA_RESERVADA_IF',
    PALAVRA_RESERVADA_ELSE: 'PALAVRA_RESERVADA_ELSE',

    // == Requisito 1: Identificadores (nomes de variáveis, etc.) ==
    IDENTIFICADOR: 'IDENTIFICADOR',

    // == Requisito 6: Constantes Numéricas (inteiros e decimais) ==
    NUMERO: 'NUMERO',

    // == Requisito 4: Operadores Relacionais (>, <, ==, etc.) ==
    OPERADOR_RELACIONAL: 'OPERADOR_RELACIONAL',

    // == Requisito 2: Operadores Matemáticos (+, -, *, /) ==
    OPERADOR_MATEMATICO: 'OPERADOR_MATEMATICO',

    // == Requisito 3: Operador de Atribuição (=) ==
    OPERADOR_ATRIBUICAO: 'OPERADOR_ATRIBUICAO',

    // == Requisito 5: Parênteses ==
    PARENTESE_ESQUERDO: 'PARENTESE_ESQUERDO',
    PARENTESE_DIREITO: 'PARENTESE_DIREITO',

    // Token especial para indicar o Fim do Arquivo de código
    FIM_DE_ARQUIVO: 'FIM_DE_ARQUIVO'
});