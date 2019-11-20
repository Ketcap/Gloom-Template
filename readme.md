# Gloom Template

Gloom template CLI ( Command Line Interface ) generate files on your folder using your templates and variables so you don't have to create each file one by one.

## Short Explanation

Gloom is gonna read all files on selected template directory. So it will use every file to a spesific directory. After the read it will ask your variables if there's any and replace it.

Last of all it will create all files in the spesific directories as you specified folder

## Installation

You need:

1. `generator.json` in your root folder.

## generator.json

```
{
  "Basic": {
    "path": "./Basic",
    "variables": ["componentName", "fileName", "storyName"]
  }
}
```

In the json file keys are the template names.

`path`: mandatory field for your template directory ( path starts from your project directory)

`variables`: global variables for every file in folder

You can put any type of files in the folder.

## Template Files

- 1st line needs to have `path:./some/path/you/want/to/put/file.js`

- 2nd line can have `variables:var1,var2` each variable needs to be seperated by comma.

To install:
`npm install -g gloom-template`

You can find examples of `templates` and `generator.json` on examples folder

## Usage

After installing, execute the CLI:

`gloom`

This will start the cli and you will get questions for your templates.
