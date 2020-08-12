/**
 * Create a controller
 */
module.exports = {
  name: 'generate:controller',
  alias: ['gc'],
  description: 'Create a new controller inside src/controllers',
  run: async toolbox => {
    const {
      parameters,
      filesystem,
      wantOverwrite,
      print: { success, error },
      template,
    } = toolbox;

    const { options } = parameters;
    let path;
    if (options.here) {
      path = '.';
    } else if (options.path) {
      path = options.path;
    } else {
      path = `src${toolbox.filesystem.separator}controllers`;
    }

    const name = parameters.first;

    if (filesystem.exists(`${path}${filesystem.separator}${name}`)) {
      if (!(await wantOverwrite(name))) {
        return;
      }
    }

    if (!name) {
      error('Name must be specified.');
      return;
    }

    await template.generate({
      template: 'typescript-api/newController.ts.ejs',
      target: `${path}${filesystem.separator}${name}Controller.ts`,
      props: { controllerName: name }
    });

    success(`Generated ${path}${filesystem.separator}${name}.`);
  }
};
