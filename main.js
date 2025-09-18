import fs from "fs";
import { AnalisadorLexico } from "./src/Scanner.js";
import { TiposDeToken } from "./src/TokenType.js";

/*
 * ===============================================
 * CONSTRUÇÃO DE COMPILADORES I
 * ===============================================
 *
 * Nomes dos Integrantes do Grupo:
 *
 * - Marcely P. Costa
 * - Renan Sena
 * - Daniel Gutemberg
 * - Kauã Vitor
 *
 * ===============================================
 */

function main() {
  try {
    const codigoFonte = fs.readFileSync("programa_checkpoint.txt", "utf-8");

    const analisador = new AnalisadorLexico(codigoFonte);

    let tokenAtual;
    console.log("--- Iniciando Análise Léxica do Arquivo ---");

    do {
      tokenAtual = analisador.proximoToken();
      if (tokenAtual) {
        console.log(tokenAtual.toString());
      }
    } while (tokenAtual && tokenAtual.tipo !== TiposDeToken.FIM_DE_ARQUIVO);

    console.log("--- Análise Léxica Concluída ---");
  } catch (erro) {
    console.error("Ocorreu um erro ao tentar ler o arquivo:", erro.message);
  }
}

main();
