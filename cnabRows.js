"use strict";
import path from "path";
import { readFile } from "fs/promises";
import { fileURLToPath } from "url";

import yargs from "yargs";
import chalk from "chalk";

const { error, log, time, timeEnd } = console;

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
    alias: "segmento",
    describe: "tipo de segmento",
    type: "string",
    demandOption: true,
  })
  .option("d", {
    alias: "dir",
    describe: "Nome do diretório onde se encontra o arquivo",
    type: "string",
    demandOption: true,
  })
  .option("n", {
    alias: "fileName",
    describe: "Nome do arquivo especificado",
    type: "string",
    demandOption: true,
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

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const { from, to, segmento, dir, fileName } = optionsYargs;

const getFilePathAndName = () =>
  path.resolve(`${__dirname}/${dir}/${fileName}`);

const file = getFilePathAndName();

const sliceArrayPosition = (arr, ...positions) => [...arr].slice(...positions);

const messageLog = (segmento, segmentoType, from, to) => `
----- Cnab linha ${segmentoType} -----

posição from: ${chalk.inverse.bgBlack(from)}

posição to: ${chalk.inverse.bgBlack(to)}

item isolado: ${chalk.inverse.bgBlack(segmento.substring(from - 1, to))}

item dentro da linha P: 
  ${segmento.substring(0, from)}${chalk.inverse.bgBlack(
  segmento.substring(from - 1, to)
)}${segmento.substring(to)}

----- FIM ------
`;

time("leitura Async");

readFile(file, "utf8")
  .then((file) => {
    const cnabArray = file.split("\n");

    const cnabHeader = sliceArrayPosition(cnabArray, 0, 2);

    const [cnabBodySegmentoP, cnabBodySegmentoQ, cnabBodySegmentoR] =
      sliceArrayPosition(cnabArray, 2, -2);

    const cnabTail = sliceArrayPosition(cnabArray, -2);

    if (segmento === "p") {
      log(messageLog(cnabBodySegmentoP, "P", from, to));
      return;
    }

    if (segmento === "q") {
      log(messageLog(cnabBodySegmentoQ, "Q", from, to));
      return;
    }

    if (segmento === "r") {
      log(messageLog(cnabBodySegmentoR, "R", from, to));
      return;
    }
  })
  .catch((error) => {
    console.log("🚀 ~ file: cnabRows.js ~ line 76 ~ error", error);
  });
timeEnd("leitura Async");
