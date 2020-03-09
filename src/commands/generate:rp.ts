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

    if (
      filesystem.exists(
        `src${filesystem.separator}pages${filesystem.separator}${name}`
      )
    ) {
      if (!(await wantOverwrite(name))) {
        return;
      }
    }

    await createComponent(`src${toolbox.filesystem.separator}pages`, name);
  }
};
