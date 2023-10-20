const { log, error } = console;
import chalk from "chalk";

const messageLog = ({ segment, line, from, to }) => `
----- Cnab linha ${line} -----

posição from: ${chalk.inverse.bgBlack(from)}

posição to: ${chalk.inverse.bgBlack(to)}

item isolado: ${chalk.inverse.bgBlack(segment.substring(from - 1, to))}

item dentro da linha ${line}: ${segment.substring(
  0,
  from
)}${chalk.inverse.bgBlack(segment.substring(from - 1, to))}${segment.substring(
  to
)}

----- FIM ------
`;

export const logBySegmentAndLine = ({
  segment,
  line,
  segmentIndex,
  cnabArray,
  from,
  to,
}) => {
  if (!segmentIndex[segment.toUpperCase()].includes(line) && line) {
    error(
      "🚀 ~ file: cnabRows.js ~ Essa linha especificada não possui esse segmento desejado"
    );
    process.exit(1);
  }
  if (line) {
    log(messageLog({ segment: cnabArray[line - 1], line, from, to }));
    return;
  }
  segmentIndex[segment.toUpperCase()].forEach((line) => {
    log(messageLog({ segment: cnabArray[line], line, from, to }));
  });
};
