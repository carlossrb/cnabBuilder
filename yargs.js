import yargs from "yargs";

const optionsYargs = yargs(process.argv.slice(2))
  .usage("Uso: $0 [options]")
  .option("f", {
    alias: "from",
    describe: "posição inicial de pesquisa da linha do Cnab",
    type: "number",
    demandOption: true,
  })
  .option("t", {
    alias: "to",
    describe: "posição final de pesquisa da linha do Cnab",
    type: "number",
    demandOption: true,
  })
  .option("s", {
    alias: "segment",
    describe: "tipo de segmento",
    type: "string",
    demandOption: true,
  })
  .option("d", {
    alias: "dir",
    describe: "Nome do diretório onde se encontra o arquivo",
    type: "string",
    // demandOption: true,
  })
  .option("n", {
    alias: "fileName",
    describe: "Nome do arquivo especificado",
    type: "string",
    demandOption: true,
  })
  .option("i", {
    alias: "line",
    describe: "Linha do arquivo para buscar o segmento (opcional)",
    type: "number",
  })
  .option("c", {
    alias: "company",
    describe: "Busca pelo nome da empresa",
    type: "string",
  })
  .fail((msg, err) => {
    if (err) throw err;
    console.error("Error:", msg);
    process.exit(1);
  })
  .example(
    "node $0 -d /path/to/directory -n cnabFile.rem -f 21 -t 34 -s p",
    "lista a linha e campo que from e to do cnab"
  ).argv;

export default optionsYargs;
