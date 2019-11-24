module.exports = toolbox => {
  const {
    print: { success, error },
    template
  } = toolbox;

  /**
   * 
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
      target: `${folder}/${name}/index.js`,
      props: { name }
    });

    await template.generate({
      template: 'style.js.ejs',
      target: `${folder}/${name}/index.css`,
      props: { name }
    });

    success(`Generated ${folder}/${name}.`);
  }

  toolbox.createComponent = createComponent;
};
