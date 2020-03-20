/**
 * Structure for a new React project
 */

module.exports = {
  name: 'generate:re',
  alias: ['gre'],
  description: 'Create a new react app structure',
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
      success('Git repository initiate.');
    } catch (err) {
      warning(
        `Couldn't execute '${err.cmd}'. check if you have git instaled and configured in your path.`
      );
    }

    // create parent folders
    const outerFolders = ['public', 'src'];
    outerFolders.map(item =>
      filesystem.dir(
        `${filesystem.cwd()}${separator}${projectName}${separator}${item}`
      )
    );

    // create external files
    const outerFiles = ['README.md', 'TODO.md', '.env'];
    outerFiles.map(item => {
      filesystem.write(
        `${filesystem.cwd()}${separator}${projectName}${separator}${item}`,
        ''
      );
      info(`${projectName}${separator}${item} was created.`);
    });

    // create public files
    const publicFiles = [
      { template: 'react-index-html.js.ejs', fileName: 'index.html' },
      { template: 'react-manifest-json.js.ejs', fileName: 'manifest.json' },
      { template: 'react-robots-txt.js.ejs', fileName: 'robots.txt' },
      { template: 'react-gitignore.js.ejs', fileName: '.gitignore' }
    ];

    publicFiles.map(async (item, index) => {
      await template.generate({
        template: item.template,
        target: `${filesystem.cwd()}${separator}${projectName}${separator}public${separator}${
          item.fileName
        }`,
        props: { name: projectName }
      });
      info(
        `${projectName}${separator}public${separator}${item.fileName} was created.`
      );
    });

    // generate package.json
    await template.generate({
      template: 'react-package-json.js.ejs',
      target: `${filesystem.cwd()}${separator}${projectName}${separator}package.json`,
      props: { name: projectName }
    });
    info(
      `${filesystem.cwd()}${separator}${projectName}${separator}package.json was created.`
    );

    const sourceFolders = [
      'assets',
      'components',
      'config',
      'views',
      'services',
      'store',
      'utils'
    ];

    sourceFolders.map(item => {
      filesystem.dir(
        `${filesystem.cwd()}${separator}${projectName}${separator}src${separator}${item}`
      );
      info(`${projectName}${separator}src${separator}${item} was created.`);
    });

    const sourceFiles = [
      {
        template: 'react-index.js.ejs',
        fileName: 'index.js'
      },
      {
        template: 'react-app.js.ejs',
        fileName: 'App.js'
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

    // download packcages
    try {
      const spinner = spin('Downloading packages.');
      const commandInstall = parameters.options.yarn ? 'yarn' : 'npm install';
      await system.run(`cd ${projectName} && ${commandInstall}`);
      spinner.succeed('Packages successfully downloaded.');
    } catch (err) {
      error(
        `couldn't execute '${err.cmd}'. check if you have npm${parameters
          .options.yarn && ' and yarn'} instaled and configured in your path.`
      );
    }
  }
};
