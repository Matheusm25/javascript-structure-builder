module.exports = toolbox => {
  const {
    print: { success, error },
    template,
    filesystem
  } = toolbox;

  /**
   * Create a component in that specified folder
   * @param folder folder name where the component will be generated
   * @param name name of the component
   */
  async function createComponent(folder: string, name: string) {
    if (!name) {
      error('Name must be specified');
      return;
    }

    await template.generate({
      template: 'component.js.ejs',
      target: `${folder}${filesystem.separator}${name}${filesystem.separator}index.js`,
      props: { name }
    });

    await template.generate({
      template: 'style.js.ejs',
      target: `${folder}${filesystem.separator}${name}${filesystem.separator}styles.js`,
      props: { name }
    });

    success(`Generated ${folder}${filesystem.separator}${name}.`);
  }

  toolbox.createComponent = createComponent;
};
