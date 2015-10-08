'use strict';

const hbs = require('express-handlebars');
const minify = require('html-minifier').minify;
const glob = require('glob');
const Swag = require('swag');
const extend_next_handlebars = require('@financial-times/n-handlebars/src/extend-helpers');
const helper_dir = __dirname + '/helpers/';
const helpers = glob.sync(helper_dir + '**/*.js').reduce((o, filename) => {
  let js = require(filename);
  let name = filename.replace(helper_dir, '').replace(/\.js$/, '');
  if (typeof js === 'function') {
    o[name] = js;
  }
  // TODO:
  //    * many functions per file
  //    * nested files
  return o;
}, extend_next_handlebars(Swag.helpers));

const hbs_instance = hbs.create({
  defaultLayout: 'main',
  extname: '.html',
  helpers: helpers
});

const r = hbs_instance._renderTemplate;
const minify_options = {
  collapseWhitespace: true,
  minifyJS: true,
  minifyCSS: true
};

if (!process.env.MINIFY_OFF) {
  hbs_instance._renderTemplate = (template, context, options) => {
    let o = r(template, context, options);
    if (!!o.then) {
      return o.then(html => minify(html, minify_options));
    } else if (typeof o === 'string') {
      return minify(o, minify_options);
    }

    return o;
  }
}

exports.setup = (app) => {
  app.engine('.html', hbs_instance.engine);
  app.set('view engine', '.html');
};
