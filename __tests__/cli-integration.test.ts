const { system, filesystem } = require('gluegun');

const src = filesystem.path(__dirname, '..');

const version = filesystem.read('package.json', 'json').version;

const cli = async cmd =>
  system.run('node ' + filesystem.path(src, 'bin', 'jsb') + ` ${cmd}`);

test('outputs version', async () => {
  const output = await cli('--version');
  expect(output).toContain(version);
});

test('outputs help', async () => {
  const output = await cli('--help');
  expect(output).toContain(version);
});

test('generates file', async () => {
  const foomodel = !!filesystem.read('src/components/foo/index.js');

  expect(foomodel).toBe(true);

  // cleanup artifact
  filesystem.remove('src/components');
});
