import chalk from 'chalk';

const log = console.log;

export const errorLog = (title, desc) => {
  log(`
    ${chalk.red(title)}
    ${chalk.redBright(desc)}  
  `);
};

export const infoLog = (title, desc) => {
  log(`
    ${chalk.blue(title)}
    ${chalk.blueBright(desc)}  
  `);
};

export const generalLog = title => {
  log(`
    ${chalk.magentaBright(title)}
  `);
};
