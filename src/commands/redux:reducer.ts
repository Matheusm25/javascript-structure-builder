/**
 * Create a reducer for redux
 */
module.exports = {
  name: 'redux:reducer',
  alias: ['rxr'],
  description: 'Crete a reducer for redux',
  run: async toolbox => {
    const {
      filesystem,
      wantOverwrite,
      template,
      print: { success, error },
      parameters,
      prompt: { confirm },
      configCombineReducer
    } = toolbox;

    const name = parameters.first;

    if (!name) {
      error('Name must be specified');
      return;
    }

    if (
      filesystem.exists(
        `src${filesystem.separator}store${filesystem.separator}reducers${filesystem.separator}${name}.js`
      )
    ) {
      if (!(await wantOverwrite(name))) {
        return;
      }
    }

    await template.generate({
      template: 'reducer.js.ejs',
      target: `src${filesystem.separator}store${filesystem.separator}reducers${filesystem.separator}${name}.js`,
      props: { name }
    });

    success(
      `Generated src${filesystem.separator}store${filesystem.separator}reducers${filesystem.separator}${name}.js .`
    );

    const configRed = await confirm(
      'Do you want to add the reducers to the combine-reducers? '
    );
    if (configRed) {
      configCombineReducer();
    }
  }
};
