module.exports = {
  name: 'generate:rc',
  description: 'Create new component inside src/components',
  run: async toolbox => {
    const {
      parameters,
      template,
      print: { success, error }
    } = toolbox;

    if (!parameters.first) {
      error('Component name must be specified');
      return;
    }

    const name = parameters.first;

    await template.generate({
      template: 'component.js.ejs',
      target: `src/components/${name}/index.js`,
      props: { name }
    });

    await template.generate({
      template: 'style.js.ejs',
      target: `src/components/${name}/index.css`,
      props: { name }
    });

    success(`Generated ${name} component.`);
  }
};
