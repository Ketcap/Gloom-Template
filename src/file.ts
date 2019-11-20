import chalk from "chalk";
import * as inquirer from 'inquirer';
import { readFileSync, pathExistsSync, ensureFileSync, writeFileSync } from "fs-extra";

import { Template } from "../global";
import { infoLog } from "./util";

const question = (variable: string, fileSpesific?: boolean) => (
  {
    type: 'input',
    name: variable,
    message: `What's the declaration of ${chalk.green(variable)} (${!fileSpesific ? 'Global' : 'File'})`,
  }
)

export default async (filePaths: string[], template: Template) => {

  let answers;

  if (!template.variables || template.variables.length < 1) {
    infoLog("There's no global variables", "Skipping...");
  } else {
    answers = await inquirer.prompt(template.variables.map(e => question(e)));
  }

  for await (const path of filePaths) {

    let file = readFileSync(path, 'utf8');

    const pathReg = /path:(.*)/;
    const varReg = /variables:(.*)/;
    const outputRegex = new RegExp(pathReg, "gi").exec(file)
    const variableRegex = new RegExp(varReg, "gi").exec(file);

    const paths = path.split('\\');
    const { [paths.length - 1]: fileName } = paths;


    if (!outputRegex) throw { error: 'no-path', file: path };
    let output = outputRegex[1];

    if (variableRegex) {
      infoLog("Local variable found", `Naming variables from ${chalk.green(fileName)}`);
      const inlineVariable = variableRegex[1].split(',');
      const inlineVariables = await inquirer.prompt(inlineVariable.map(e => question(e, true)));
      answers = { ...answers, inlineVariables };
    }

    Object.keys(answers).map(key => {
      const replaceRegex = new RegExp('{' + key + '}', 'g');
      file = file.replace(replaceRegex, answers[key]);
      output = output.replace(replaceRegex, answers[key]);
    });

    const deleteRegex = new RegExp(/(path:(.*))|(variables:(.*))/gi)
    file = file.replace(deleteRegex, '').trim();

    const fileExists = await pathExistsSync(output);
    if (fileExists) {
      const answer = await inquirer.prompt([{
        type: 'confirm',
        name: 'replace',
        message: `${chalk.green(output)} is already created. Do you want to ${chalk.greenBright('replace')} it`,
        default: true
      }
      ]);
      if (!answer.replace) {
        return;
      }
    }

    try {
      ensureFileSync(output);
      writeFileSync(output, file, { encoding: 'utf8' })
    } catch (e) {
      console.log(e);
      throw { error: 'write-error', e }
    }
  }
}
