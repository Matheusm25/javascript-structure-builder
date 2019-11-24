/**
 * Create a react component with a index.js and a index.css file
 */
module.exports = {
  name: 'generate:rc',
  description: 'Create new component inside src/components',
  run: async toolbox => {
    const { parameters, createComponent } = toolbox;

    const name = parameters.first;

    await createComponent('src/components', name);
  }
};
