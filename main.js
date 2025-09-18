import fs from "fs";
import { AnalisadorLexico } from "./src/Scanner.js";
import { TiposDeToken } from "./src/TokenType.js";

/**
 * Função principal que executa o programa.
 */
function main() {
  try {
    // Carrega o conteúdo do arquivo de código-fonte de teste.
    const codigoFonte = fs.readFileSync("programa_checkpoint.txt", "utf-8");

    // Cria uma nova instância do nosso analisador.
    const analisador = new AnalisadorLexico(codigoFonte);

    let tokenAtual;
    console.log("--- Iniciando Análise Léxica do Arquivo ---");

    // Loop para obter todos os tokens, um por um, até o fim do arquivo.
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

// Inicia a execução.
main();
