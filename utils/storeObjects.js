import { readFile, writeFile } from "fs/promises";
import { getFilePathAndName } from "../cnabRows.js";

export const storeObject = async (objectToStore, name) => {
  try {
    const jsonContent = JSON.stringify(objectToStore, null, 1);
    await writeFile(getFilePathAndName("storage", name), jsonContent);
  } catch (err) {
    error("Erro ao armazenar o índice:", err);
  }
};

export const loadFromStoredObj = async (name) => {
  try {
    const jsonContent = await readFile(
      getFilePathAndName("storage", name),
      "utf-8"
    );
    const loadedObj = JSON.parse(jsonContent);
    return loadedObj;
  } catch {
    return null;
  }
};
