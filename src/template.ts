import * as inquirer from 'inquirer';

import { Generator } from "../global";

export default async (generator: Generator) => {

  const question = {
    type: "list",
    name: 'template',
    message: "Which template you wanna use ?",
    choices: Object.keys(generator)
  };

  const answer = await inquirer.prompt([question]);
  return answer.template;
}