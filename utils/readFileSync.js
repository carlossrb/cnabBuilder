import { loadFromStoredObj, storeObject } from "./storeObjects.js";
import { readFile } from "fs/promises";

const sliceArrayPosition = (arr, ...positions) => [...arr].slice(...positions);

export const readFileSync = async (file) => {
  return await readFile(file, "utf8")
    .then(async (file) => {
      const cnabArray = file.split("\n");
      const cnabArrayBody = sliceArrayPosition(cnabArray, 2, -2);
      let segmentIndex = await loadFromStoredObj(`segment.index.json`);
      if (segmentIndex) {
        return [segmentIndex, cnabArrayBody];
      }
      //indexaçao de posiçoes para arquivos grandes
      segmentIndex = {
        P: [],
        Q: [],
        R: [],
      };
      cnabArrayBody.forEach((item, idx) => {
        const segmentStr = Object.keys(segmentIndex).join("");
        const regex = new RegExp(`[${segmentStr}]`);
        const [match] = item.match(regex);
        segmentIndex[match].push(idx + 1);
      });
      await storeObject(segmentIndex, `segment.index.json`);
      return [segmentIndex, cnabArrayBody];
    })
    .catch((err) => {
      error("🚀 ~ file: cnabRows.js ~ ", err);
    });
};
