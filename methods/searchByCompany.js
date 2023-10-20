import chalk from "chalk";

// busca de empresa agnostica, mesmo sabendo que estao apenas no segmento Q
export const searchByCompany = (companyPartOfName, cnabArray, segmentIndex) => {
  const findKey = (num) =>
    Object.keys(segmentIndex).find((key) => segmentIndex[key].includes(num)) ||
    null;

  const normalizedNameOfCompany = companyPartOfName
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

  const companyPositions = cnabArray
    .map((element, idx) => {
      const exists = element.toLowerCase().includes(normalizedNameOfCompany);
      if (exists) {
        return {
          segment: findKey(idx + 1),
          line: idx + 1,
          from: element.toLowerCase().indexOf(normalizedNameOfCompany) + 1,
          to:
            element.toLowerCase().indexOf(normalizedNameOfCompany) +
            normalizedNameOfCompany.length,
        };
      }
      return null;
    })
    .filter((item) => item)
    .map(logPositions);
};

const logPositions = (pos) =>
  console.log(
    `Resultado encontrado na linha ${chalk.inverse.blue(
      pos.line
    )} com o seguimento ${chalk.inverse.blue(
      pos.segment
    )} e na posição inicial de ${chalk.inverse.blue(
      pos.from
    )} e final ${chalk.inverse.blue(pos.to)} \n`
  );
