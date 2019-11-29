module.exports = toolbox => {
  const { filesystem, template } = toolbox;

  /**
   * Configure the combineReducer file for using redux
   */
  async function configCombineReducer() {
    let reducers =
      filesystem.list(
        `src${filesystem.separator}store${filesystem.separator}reducers${filesystem.separator}`
      ) || [];

    reducers = reducers.map(reducer => reducer.split('.js')[0]);
    reducers = reducers.filter(reducer => reducer !== 'index');

    await template.generate({
      template: 'combine-reducers.js.ejs',
      target: `src${filesystem.separator}store${filesystem.separator}reducers${filesystem.separator}index.js`,
      props: { reducers }
    });
  }

  toolbox.configCombineReducer = configCombineReducer;
};
