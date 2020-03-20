/**
 * Create a react component with a index.js and a index.css file
 */
module.exports = {
  name: 'generate:rc',
  alias: ['grc'],
  description: 'Create new react component inside src/components',
  run: async toolbox => {
    const { parameters, createComponent, filesystem, wantOverwrite } = toolbox;

    const { options } = parameters;
    let path;
    if (options.here) {
      path = '.';
    } else if (options.path) {
      path = options.path;
    } else {
      path = `src${toolbox.filesystem.separator}components`;
    }

    const name = parameters.first;

    if (filesystem.exists(`${path}${filesystem.separator}${name}`)) {
      if (!(await wantOverwrite(name))) {
        return;
      }
    }

    await createComponent(path, name);
  }
};
