import '@babel/polyfill'
import { readJsonSync, pathExistsSync, readdirSync } from 'fs-extra';
import * as path from 'path'
import chalk from 'chalk';

import { generalLog, errorLog, infoLog } from "./util";
import { Generator, Template } from "../global";
import templateQuestion from "./template";
import fileReadWrite from './file'


const init = async () => {
  generalLog('Welcome to the Gloom');

  let generator: Generator | {} = {};

  try {
    const filePath = `${process.cwd()}/generator.json`;
    generator = await readJsonSync(filePath);
    if (Object.keys(generator).length < 1) throw { syscall: 'no-key' };
  } catch (e) {
    if (e.syscall === 'open') {
      errorLog("Uppps i've got an error !", `It looks like you dont have a ${chalk.green('generator.json')} in your main directory`);
    } else if (e.syscall === 'no-key') {
      errorLog("Uppps i've got an file error !", `There's nothing in your ${chalk.green('generator.json')}.`)
    } else {
      errorLog("Uppps i've got an reading error !", e);
    }
    return;
  }

  let template: Template;
  try {
    const selectedTemplate = await templateQuestion(generator);
    template = generator[selectedTemplate as keyof Generator];
    if (!template.path) throw { error: 'no-path', selectedTemplate };
  } catch (e) {
    if (e.error === 'no-path') {
      errorLog("Uppps i've got an path error !", `There's no path in your ${chalk.green(e.selectedTemplate)} template`);
    } else {
      errorLog("Uppps i've got some error !", e);
    }
    return;
  }

  let files: string[] | [] = []
  try {
    const dir = path.join(process.cwd(), template.path);
    const readDirExists = pathExistsSync(dir);
    if (!readDirExists) throw { error: 'no-dir' };

    files = readdirSync(dir);
    if (files.length < 1) throw { error: 'no-file' }

    files = files.map(file => path.join(dir, file));
  } catch (e) {
    if (e.error === 'no-dir') {
      errorLog("Uppps i've got an error !", `It seems there's no ${chalk.green(template.path)} directory`);
    }
    if (e.error === 'no-file') {
      errorLog("Uppps i've got an error !", `It seems there's no files under ${chalk.green(template.path)}`);
      return;
    }
  }

  try {
    await fileReadWrite(files, template)
  } catch (e) {
    if (e.error === 'empty') {
      errorLog("Uppps i've got an error !", `It seems your ${chalk.green(e.file)} is empty`);
    }
    if (e.error === 'no-path') {
      errorLog("Uppps i've got an error !", `It seems your ${chalk.green(e.file)} has no output path.Please add ${chalk.green('path:your-dir')} in first line`);
    }
    if (e.error === 'write-error') {
      errorLog("Uppps i've got an error !", `It seems there's file writing error `);
    }
    return;
  }

  infoLog("Templates are created as you wish", "")

}





init();