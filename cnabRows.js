// "use strict";
import path from "path";
import { fileURLToPath } from "url";
import optionsYargs from "./yargs.js";
import { logBySegmentAndLine } from "./methods/fileDirectory.js";
import { readFileSync } from "./utils/readFileSync.js";
import { searchByCompany } from "./methods/searchByCompany.js";
import { createCompanyJson } from "./methods/createCompanyJson.js";

const { time, timeEnd } = console;
const { company, fileName, dir, segment, from, to, line } = optionsYargs;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const getFilePathAndName = (dir = ".", fileName) =>
  path.resolve(`${__dirname}/${dir}/${fileName}`);

(async () => {
  const file = getFilePathAndName(dir, fileName);
  const [segmentIndex, cnabArray] = await readFileSync(file);
  // item 3 -  salvar json com nom e endereço da empresa
  await createCompanyJson(cnabArray, segmentIndex);

  // item 2 -  busca por nome de empresa
  if (company) {
    searchByCompany(company, cnabArray, segmentIndex);
    return;
  }

  // item 1 - passar o diretorio do arquivo
  time("leitura Async");
  logBySegmentAndLine({ segment, line, segmentIndex, cnabArray, from, to });
  timeEnd("leitura Async");
})();
