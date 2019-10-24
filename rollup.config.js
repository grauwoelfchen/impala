import path from 'path';

import buble from 'rollup-plugin-buble';
import commonjs from 'rollup-plugin-commonjs';
import json from 'rollup-plugin-json';
import resolve from 'rollup-plugin-node-resolve';
import replace from 'rollup-plugin-replace';
import strip from 'rollup-plugin-strip';
import { terser } from 'rollup-plugin-terser';
import typescript from 'rollup-plugin-typescript2';

const root = __dirname
    , src = path.join(root, 'src')
    , dst = path.join(root, 'dst')
    , mod = path.join(root, 'node_modules')
    ;

const external = [
    'assert'
  , 'buffer'
  , 'crypto'
  , 'events'
  , 'fs'
  , 'http'
  , 'https'
  , 'net'
  , 'os'
  , 'path'
  , 'querystring'
  , 'stream'
  , 'string_decoder'
  , 'tty'
  , 'url'
  , 'util'
  , 'zlib'
];

const development = {
  input: path.join(src, 'server.ts')
, output: {
    file: path.join(dst, 'server.js')
  , format: 'cjs'
  , sourcemap: true
  }
, external
, plugins: [
    typescript({
      abortOnError: false
    , cacheRoot: '.cache'
    })
  , commonjs()
  , replace({
      'process.env.NODE_ENV': JSON.stringify('development')
    })
  , json()
  , resolve({
      browser: false
    , preferBuiltins: true
    , mainFields: ['dev:module', 'module', 'main', 'jsnext:main']
    , extensions: ['.js', '.json', '.ts']
    })
  , buble({
      objectAssign: 'Object.assign'
    , transforms: {
        asyncAwait: false
      , forOf: false
      , generator: false
      }
    })
  , strip({
      debugger: false
    , functions: []
    , include: [
        path.join(src, '**/*.ts')
      , path.join(mod, '**/*.(ts|js)')
      ]
    , sourceMap: true
    })
  ]
};

const production = {
  input: path.join(src, 'server.ts')
, output: [{
    file: path.join(dst, 'server.min.js')
  , format: 'cjs'
  , sourcemap: false
  }]
, external
, plugins: [
    typescript({
      abortOnError: true
    , cacheRoot: '.cache'
    })
  , commonjs()
  , replace({
      'process.env.NODE_ENV': JSON.stringify('production')
    })
  , json()
  , resolve({
      browser: false
    , preferBuiltins: true
    , mainFields: ['module', 'main', 'jsnext:main']
    , extensions: ['.js', '.json', '.ts']
    })
  , buble({
      objectAssign: 'Object.assign'
    , transforms: {
        asyncAwait: false
      , forOf: false
      , generator: false
      }
    })
  , strip({
      debugger: true
    , functions: ['console.*', 'assert.*']
    , include: [
        path.join(src, '**/*.ts')
      , path.join(mod, '**/*.(js|ts)')
      ]
    , sourceMap: false
    })
  , terser()
  ]
};

export default (args) => {
  if (args.configBuildDevelopment === true) {
    return development;
  } else if (args.configBuildProduction === true) {
    return production;
  }
  throw new Error("unknown args given :'(");
};
