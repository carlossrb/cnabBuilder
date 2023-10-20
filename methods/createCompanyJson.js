import { storeObject } from "../utils/storeObjects.js";
import {
  COMPANY_LAST_INDEX,
  ADDRESS_FIRST_INDEX,
  ADDRESS_LAST_INDEX,
  COMPANY_FIRST_INDEX,
} from "../constants.js";
export const createCompanyJson = async (cnabArray, segmentIndex) => {
  const Qsegment = segmentIndex["Q"];
  const filteredCnabArray = cnabArray.filter((_, index) => {
    return Qsegment.includes(index + 1);
  });

  console.log(filteredCnabArray);
  const objectToStoreJson = filteredCnabArray.map((el) => ({
    company: el.substring(COMPANY_FIRST_INDEX, COMPANY_LAST_INDEX).trim(),
    address: el.substring(ADDRESS_FIRST_INDEX, ADDRESS_LAST_INDEX).trim(),
  }));

  await storeObject(objectToStoreJson, "company-address.info.json");
};
