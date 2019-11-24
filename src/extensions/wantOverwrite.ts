module.exports = toolbox => {
  const {
    print: {warning},
    prompt
  } = toolbox;

  /**
   * Asks the user if he wants to overwrite the files
   * @param name name of the foo that is trying to be created
   */
  async function wantOverwrite(name: string) {
    warning(`It seems that ${name} already exists.`);
    return await prompt.confirm('Do you want to overwrite it? ');
  }

  toolbox.wantOverwrite = wantOverwrite;
};