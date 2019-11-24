/**
 * Create a react component with a index.js and a index.css file
 */
module.exports = {
  name: 'generate:rc',
  alias: ['grc'],
  description: 'Create new component inside src/components',
  run: async toolbox => {
    const { parameters, createComponent, filesystem, wantOverwrite } = toolbox;

    const name = parameters.first;

    if (
      filesystem.exists(
        `src${filesystem.separator}components${filesystem.separator}${name}`
      )
    ) {
      if (!(await wantOverwrite(name))) {
        return;
      }
    }

    await createComponent(`src${toolbox.filesystem.separator}components`, name);
  }
};
