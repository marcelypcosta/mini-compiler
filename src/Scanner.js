import { TiposDeToken } from "./TokenType.js";
import { Token } from "./Token.js";

/**
 * Requisito 7: Tabela de Palavras Reservadas.
 * Este Map associa strings de palavras-chave aos seus respectivos tipos de token.
 * Usar um Map aqui é eficiente para a consulta.
 */
const PALAVRAS_RESERVADAS = new Map([
  ["int", TiposDeToken.PALAVRA_RESERVADA_INT],
  ["float", TiposDeToken.PALAVRA_RESERVADA_FLOAT],
  ["print", TiposDeToken.PALAVRA_RESERVADA_PRINT],
  ["if", TiposDeToken.PALAVRA_RESERVADA_IF],
  ["else", TiposDeToken.PALAVRA_RESERVADA_ELSE],
]);

export class AnalisadorLexico {
  constructor(codigoFonte) {
    this.codigoFonte = codigoFonte;
    this.posicaoAtual = 0; // Índice do caractere que estamos lendo
    this.linhaAtual = 1; // Linha atual para reportar erros (Requisito 9)
    this.colunaAtual = 1; // Coluna atual para reportar erros (Requisito 9)
  }

  // --- Métodos de Verificação e Navegação ---

  _chegouAoFim() {
    return this.posicaoAtual >= this.codigoFonte.length;
  }

  _avancarCaractere() {
    if (this._chegouAoFim()) return "\0"; // Caractere nulo para fim de arquivo
    const caractere = this.codigoFonte[this.posicaoAtual++];
    if (caractere === "\n") {
      this.linhaAtual++;
      this.colunaAtual = 1;
    } else {
      this.colunaAtual++;
    }
    return caractere;
  }

  _olharProximoCaractere() {
    if (this._chegouAoFim()) return "\0";
    return this.codigoFonte[this.posicaoAtual];
  }

  // --- Métodos de Processamento ---

  _ignorarEspacosEComentarios() {
    while (!this._chegouAoFim()) {
      const proximoCaractere = this._olharProximoCaractere();

      if (/\s/.test(proximoCaractere)) {
        this._avancarCaractere();
        continue;
      }

      // Requisito 8: Ignorar comentário de múltiplas linhas
      if (
        proximoCaractere === "/" &&
        this.codigoFonte[this.posicaoAtual + 1] === "*"
      ) {
        this._avancarCaractere();
        this._avancarCaractere(); // Consome '/*'
        while (
          !this._chegouAoFim() &&
          !(
            this._olharProximoCaractere() === "*" &&
            this.codigoFonte[this.posicaoAtual + 1] === "/"
          )
        ) {
          this._avancarCaractere();
        }
        if (!this._chegouAoFim()) {
          this._avancarCaractere();
          this._avancarCaractere(); // Consome '*/'
        }
        continue; // Volta ao início do loop para continuar ignorando
      }

      // Requisito 8: Ignorar comentário de linha única
      if (proximoCaractere === "#") {
        this._avancarCaractere(); // Consome '#'
        while (
          !this._chegouAoFim() &&
          this._olharProximoCaractere() !== "\n" &&
          this._olharProximoCaractere() !== "\r"
        ) {
          this._avancarCaractere();
        }
        continue;
      }
      // Se não for espaço nem comentário, para a verificação.
      break;
    }
  }

  /**
   * Retorna o próximo token válido do código-fonte.
   */
  proximoToken() {
    // 1. Limpa espaços e comentários antes de procurar o próximo token.
    this._ignorarEspacosEComentarios();

    // 2. Se depois da limpeza, chegamos ao fim, encerramos.
    if (this._chegouAoFim()) {
      return new Token(TiposDeToken.FIM_DE_ARQUIVO, "FIM_DE_ARQUIVO");
    }

    // 3. Guarda a posição inicial para o caso de um erro.
    const linhaDoToken = this.linhaAtual;
    const colunaDoToken = this.colunaAtual;
    let caractereAtual = this._avancarCaractere(); // Pega o primeiro caractere do novo token

    /**
     * Requisito 1: Identificadores
     * Regra: (a-z | A-Z | _)(a-z | A-Z | _ | 0-9)*
     */
    const isLetra = (c) => (c >= "a" && c <= "z") || (c >= "A" && c <= "Z");
    if (isLetra(caractereAtual) || caractereAtual === "_") {
      let textoCompleto = caractereAtual;
      // Continua consumindo caracteres enquanto forem letras, dígitos ou underscore.
      while (
        !this._chegouAoFim() &&
        (isLetra(this._olharProximoCaractere()) ||
          !isNaN(parseInt(this._olharProximoCaractere())) ||
          this._olharProximoCaractere() === "_")
      ) {
        textoCompleto += this._avancarCaractere();
      }
      // Requisito 7: Antes de retornar, verifica se o texto é uma palavra reservada.
      // Exemplo: Se textoCompleto for "if", o tipo será PALAVRA_RESERVADA_IF.
      //          Se for "idade", o tipo será IDENTIFICADOR.
      const tipo =
        PALAVRAS_RESERVADAS.get(textoCompleto) || TiposDeToken.IDENTIFICADOR;
      return new Token(tipo, textoCompleto);
    }

    /**
     * Requisito 6: Constantes Numéricas
     * Regra: ((0-9)*.)?(0-9)+
     */
    const isDigito = (c) => c >= "0" && c <= "9";
    if (isDigito(caractereAtual) || caractereAtual === ".") {
      let textoCompleto = caractereAtual;
      let temPontoDecimal = caractereAtual === ".";
      // Continua consumindo caracteres enquanto forem dígitos, ou um único ponto decimal.
      while (
        !this._chegouAoFim() &&
        (isDigito(this._olharProximoCaractere()) ||
          (!temPontoDecimal && this._olharProximoCaractere() === "."))
      ) {
        if (this._olharProximoCaractere() === ".") temPontoDecimal = true;
        textoCompleto += this._avancarCaractere();
      }
      // Requisito 9: Tratamento de erros para números.
      if (textoCompleto.endsWith(".") || textoCompleto === ".") {
        console.error(
          `ERRO LÉXICO: Número inválido '${textoCompleto}' na Linha: ${linhaDoToken}, Coluna: ${colunaDoToken}`
        );
        return null;
      }

      // Requisito 1: Varificação de identificador válido (válido: 'nota1' - inválido: '1nota')
      if (isLetra(this._olharProximoCaractere())) {
        // Consome o resto da palavra para mostrar o erro completo
        while (
          !this._chegouAoFim() &&
          (isLetra(this._olharProximoCaractere()) ||
            isDigito(this._olharProximoCaractere()))
        ) {
          textoCompleto += this._avancarCaractere();
        }
        // Requisito 9: Tratamento de erros para identificadores.
        console.error(
          `ERRO LÉXICO: Identificador inválido '${textoCompleto}' na Linha: ${linhaDoToken}, Coluna: ${colunaDoToken}`
        );
        return null;
      }

      return new Token(TiposDeToken.NUMERO, textoCompleto);
    }

    /**
     * Requisitos 2, 3, 4, 5: Operadores e Símbolos
     * Verifica caracteres únicos ou duplos que formam operadores.
     */
    switch (caractereAtual) {
      case "+":
        return new Token(TiposDeToken.OPERADOR_MATEMATICO, "+");
      case "-":
        return new Token(TiposDeToken.OPERADOR_MATEMATICO, "-");
      case "*":
        return new Token(TiposDeToken.OPERADOR_MATEMATICO, "*");
      case "/":
        return new Token(TiposDeToken.OPERADOR_MATEMATICO, "/");
      case "(":
        return new Token(TiposDeToken.PARENTESE_ESQUERDO, "(");
      case ")":
        return new Token(TiposDeToken.PARENTESE_DIREITO, ")");

      case ">":
        if (this._olharProximoCaractere() === "=") {
          this._avancarCaractere(); // consome o "="
          return new Token(TiposDeToken.OPERADOR_RELACIONAL, ">=");
        }
        return new Token(TiposDeToken.OPERADOR_RELACIONAL, ">");

      case "<":
        if (this._olharProximoCaractere() === "=") {
          this._avancarCaractere();
          return new Token(TiposDeToken.OPERADOR_RELACIONAL, "<=");
        }
        return new Token(TiposDeToken.OPERADOR_RELACIONAL, "<");

      case "!":
        if (this._olharProximoCaractere() === "=") {
          this._avancarCaractere();
          return new Token(TiposDeToken.OPERADOR_RELACIONAL, "!=");
        }
        break;

      case "=":
        if (this._olharProximoCaractere() === "=") {
          this._avancarCaractere();
          return new Token(TiposDeToken.OPERADOR_RELACIONAL, "==");
        }
        return new Token(TiposDeToken.OPERADOR_ATRIBUICAO, "=");
    }

    /**
     * Requisito 9: Erro para Símbolos Desconhecidos
     * Se o caractere não se encaixou em nenhuma regra acima, é um erro.
     * Exemplo: O caractere "@" ou "ç" no código fonte.
     */
    console.error(
      `ERRO LÉXICO: Símbolo não reconhecido '${caractereAtual}' na Linha: ${linhaDoToken}, Coluna: ${colunaDoToken}`
    );
    return null;
  }
}
