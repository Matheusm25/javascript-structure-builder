/**
 * Create a react page with a index.js and a index.css file
 */
module.exports = {
  name: 'generate:rp',
  alias: ['grp'],
  description: 'Create new react page inside src/pages',
  run: async toolbox => {
    const { parameters, createComponent, filesystem, wantOverwrite } = toolbox;

    const name = parameters.first;

    const { options } = parameters;

    let path;
    if (options.here) {
      path = '.';
    } else if (options.path) {
      path = options.path;
    } else {
      path = `src${toolbox.filesystem.separator}views`;
    }

    if (filesystem.exists(`${path}${filesystem.separator}${name}`)) {
      if (!(await wantOverwrite(name))) {
        return;
      }
    }

    await createComponent(path, name);
  }
};
