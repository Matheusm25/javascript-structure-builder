# javascript-structure-builder
A CLI for create some javascript structure like components and config files. 

## Getting Started

### General prerequisites
You only need **npm** to globally install this cli.

### Installing

Get the package from NPM:

```bash
npm install -g js-structure-builder
```

or with yarn:

```bash
yarn global add js-structure-builder
```

### Using

#### Creating react component

Using the **generate:rc** command a react functional component will be created in *src/components*.
```bash
jsb generate:rc componentName
```
Or with the alias:
```bash
jsb grc componentName
```

#### Creating react page

Using the **generate:rp** command a react functional component will be created in *src/pages*.
```bash
jsb generate:rp pageName
```
Or with the alias:
```bash
jsb grp pageName
```

### Creating a redux config file

The **redux:config** command will create a config file for redux in
*src/store/index.js*.
```bash
jsb redux:config
```
Or with the alias:
```bash
jsb rxc 
```

### Creating a reducer

The redux config file use a rootReducers to get all the reducers
in the *src/store/reducers* directory, using the **redux:reducer** 
a reducer will be created.
```bash
jsb redux:reducer reducerName
```
Or with the alias:
```bash
jsb rxr reducerName 
```
