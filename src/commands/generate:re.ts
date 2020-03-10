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
      filesystem: {
        separator,
      },
      template,
      // system,
      parameters,
      // print: {
      //   success,
      // }
    } = toolbox;
    const projectName = parameters.first;

    // create project folder
    filesystem.dir(`${filesystem.cwd()}${separator}${projectName}`);

    const outerFolders = [
      'public',
      'src',
    ];
    outerFolders.map(item => filesystem.dir(`${filesystem.cwd()}${separator}${projectName}${separator}${item}`));

    const outerFiles = [
      'README.md',
      'TODO.md'
    ];
    outerFiles.map(item => filesystem.write(`${filesystem.cwd()}${separator}${projectName}${separator}${item}`, ''));
    
    const publicFiles = [
      'react-index-html.js.ejs',
      'react-manifest-json.js.ejs',
      'react-robots-txt.js.ejs',
    ];

    const publicFilesNames = [
      'index.html',
      'manifest.json',
      'robots.txt',
    ];

    publicFiles.map(async (item, index) => await template.generate({
      template: item,
      target: `${filesystem.cwd()}${separator}${projectName}${separator}public${separator}${publicFilesNames[index]}`,
      props: { name: projectName },
    }));

    await template.generate({
      template: 'react-package-json.js.ejs',
      target: `${filesystem.cwd()}${separator}${projectName}${separator}package.json`,
      props: { name: projectName },
    })

    const sourceFolders = [
      'assets',
      'components',
      'config',
      'views',
      'services',
      'store',
      'utils',
    ];

    sourceFolders.map(item => filesystem.dir(`${filesystem.cwd()}${separator}${projectName}${separator}src${separator}${item}`));


    // create routes
  }
}