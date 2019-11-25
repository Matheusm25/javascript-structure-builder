/**
 * Create a redux config file
 */
module.exports = {
  name: 'redux:conf',
  alias: ['rxc'],
  description: 'Create a redux config file',
  run: async toolbox => {
    const {
      filesystem,
      wantOverwrite,
      template,
      print: { success }
    } = toolbox;

    if (
      filesystem.exists(
        `src${filesystem.separator}store${filesystem.separator}index.js`
      )
    ) {
      if (!(await wantOverwrite(' a redux config file'))) {
        return;
      }
    }

    await template.generate({
      template: 'redux-conf.js.ejs',
      target: `src${filesystem.separator}store${filesystem.separator}index.js`
    });

    success(`Generated redux config file.`);
  }
};
