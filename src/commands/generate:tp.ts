/**
 * Structure for a new Typescript API
 */

module.exports = {
  name: 'generate:tp',
  alias: ['gtp'],
  description: 'Create a new typescript api structure',
  run: async toolbox => {
    const {
      filesystem,
      filesystem: { separator },
      template,
      system,
      parameters,
      print: { success, error, warning, info, spin },
      wantOverwrite
    } = toolbox;

    const projectName = parameters.first;

    // check if the folder exists
    if (filesystem.exists(`${filesystem.cwd()}${separator}${projectName}`)) {
      if (!(await wantOverwrite(projectName))) {
        return;
      }
    }

    // create project folder
    filesystem.dir(`${filesystem.cwd()}${separator}${projectName}`);
    info(`${projectName} folder was created.`);

    // git init
    try {
      await system.run(`cd ${projectName} && git init`);
      success('Git repository initiated.');
    } catch (err) {
      warning(`Couldn't execute '${err.cmd}'. check if you have git instaled and configured in your path.`);
    }

    // create parente folders
    const outerFolders = ['src'];
    outerFolders.map(item =>
      filesystem.dir(
        `${filesystem.cwd()}${separator}${projectName}${separator}${item}`
      )
    );

    const outerFiles = [
      { template: 'typescript-api/.eslintignore.ejs', fileName: '.eslintignore' },
      { template: 'typescript-api/.eslintrc.json.ejs', fileName: '.eslintrc.json' },
      { template: 'typescript-api/.gitignore.ejs', fileName: '.gitignore' },
      { template: 'typescript-api/babel.config.js.ejs', fileName: 'babel.config.js' },
      { template: 'typescript-api/jest.config.js.ejs', fileName: 'jest.config.js' },
      { template: 'typescript-api/package.json.ejs', fileName: 'package.json' },
      { template: 'typescript-api/tsconfig.json.ejs', fileName: 'tsconfig.json' },
    ];

    outerFiles.map(async (item, index) => {
      await template.generate({
        template: item.template,
        target: `${filesystem.cwd()}${separator}${projectName}${separator}${
          item.fileName
        }`,
        props: { projectName }
      });
      info(
        `${projectName}${separator}${item.fileName} was created.`
      );
    });

    const sourceFolders = [
      'assets',
      'config',
      'services',
      'models',
      'controllers',
      'tests'
    ];

    sourceFolders.map(item => {
      filesystem.dir(
        `${filesystem.cwd()}${separator}${projectName}${separator}src${separator}${item}`
      );
      info(`${projectName}${separator}src${separator}${item} was created.`);
    });

    const sourceFiles = [
      {
        template: 'typescript-api/server.ts.ejs',
        fileName: 'server.ts'
      },
      {
        template: 'typescript-api/routes.ts.ejs',
        fileName: 'routes.ts'
      }
    ];

    sourceFiles.map(async item => {
      await template.generate({
        template: item.template,
        target: `${filesystem.cwd()}${separator}${projectName}${separator}src${separator}${
          item.fileName
        }`,
        props: { name: projectName }
      });
      info(
        `${projectName}${separator}src${separator}${item.fileName} was created.`
      );
    });

    // download packages
    try {
      const spinner = spin('Downloading packages.');
      const commandInstall = parameters.options.yarn ? 'yarn' : 'npm install';
      await system.run(`cd ${projectName} && ${commandInstall}`);
      spinner.succeed('Packages successfully downloaded.');
    } catch (err) {
      error(err);
      console.log(err);
      error(
        `couldn't execute '${err.cmd}'. check if you have npm${parameters
          .options.yarn && ' and yarn'} instaled and configured in your path.`
      );
    }
  }
};