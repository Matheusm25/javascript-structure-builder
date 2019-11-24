const { build } = require('gluegun');

async function run(argv) {
  const cli = build()
    .brand('jsb')
    .src(__dirname)
    .plugins('./node_modules', { matching: 'jsb-*', hidden: true })
    .help() 
    .version()
    .create();

  const toolbox = await cli.run(argv);

  return toolbox;
}

module.exports = { run };
