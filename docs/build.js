import util from 'util'
import fs from 'fs'
import path from 'path'
import docchi from 'docchi'
import mustache from 'mustache'
import marked from 'marked'
import mkdirp from 'mkdirp'
import hjs from 'highlight.js'
import inflection from 'inflection'
import chalk from 'chalk'
import sass from 'node-sass'

const pkg = require('../package.json')
const start = Date.now()
const year = new Date().getFullYear()
const sites = [
  {nick: 'cl', name: 'cougarlife'},
  {nick: 'mb', name: 'milfbook'},
  {nick: 'em', name: 'establishedmen'},
  {nick: 'af', name: 'arrangementfinders'},
  {nick: 'ed', name: 'erosdating'},
  {nick: 'mc', name: 'mancrunch'},
  {nick: 'dl', name: 'downlow'}
]

const outputPath = path.join(__dirname, '../docs/build')
const assetPath = path.join(__dirname, 'assets')
const apiPath = path.join(__dirname, '../src')
const templatePath = path.join(__dirname, 'views')
const docPath = path.join(__dirname, 'md')
const stylesheetPath = path.join(__dirname, 'styles')

const templates = {}
const docs = {}

// need to enumerate over each directory in 'src'
// make a section for each module (profiles, stores, utils)
// views are handled on a separate page
// for each section, group the actions and stores together
// collect all the modules and their files dynamically

// this array specifies the various roots
const api = []
let modules = ['profiles', 'search', 'shared']
modules.forEach(module => {
  api.push({StoreActionPair: inflection.capitalize(module)})
  for (let file of fs.readdirSync(`${apiPath}/${module}/actions/`)) {
    file = file.replace('Actions.js', '')
    api.push({
      module: file,
      actions: `/${module}/actions/${file}Actions.js`,
      store: `/${module}/reducers/${file}Reducers.js`
    })
  }
})
const renderer = new marked.Renderer()

renderer.heading = (text, level) => {
  const escapedText = text.toLowerCase().replace(/[^\w]+/g, '-')

  return level !== 1 ?
    `<h${level} id="${escapedText}">${text}<a class="anchor" ` +
    `href="#${escapedText}" title="Link to this section “${text}”">#</a>` +
    `</h${level}>` :
    `<h1>${text}</h1>`
}

const markedOptions = {
  renderer, highlight: code => hjs.highlightAuto(code).value
}

function processAPI (ns, obj) {
  const { type } = obj.context

  obj.context.targetType = /Actions/.test(obj.context.target) ? "actions" : "store"
  if (ns === obj.context.name) {
    obj.context.anchor = ns.toLowerCase()
    obj.context.path = ns
  }
  else {
    obj.context.anchor = (`${ns}-${obj.context.name}`).toLowerCase()
    obj.context.path = `<span class="key">${obj.context.name}</span>`
  }

  if (type === 'class')
    obj.context.isClass = true

  if (type === 'property' || type === 'prop')
    obj.context.isProperty = true

  if (type === 'method' || type === 'function' || type === 'constructor')
    obj.context.isFunction = true

  if (type === 'constructor')
    obj.context.isConstructor = true

  const getName = element => {
    if (element.type === 'AllLiteral') return 'any type'
    if (element.name) return element.name
    if (element.applications) return 'an array of ' +
      element.applications.map(getName).map(s => inflection.pluralize(s)).join(' or ')
    return ''
  }
  const setArray = str => `${str} (array)`
  const params = []

  for (let tag of obj.comment.tags) {
    if (tag.title === 'return') {
      obj.comment.returnType = tag.type.name
      if (tag.type.elements) obj.comment.returnType =
        tag.type.elements.map(getName).join(' | ')
      if (tag.type.applications) obj.comment.returnType =
        tag.type.applications.map(getName).map(setArray).join(' | ')
      continue
    }
    if (tag.title === 'param') {
      let name = tag.name
      let type = tag.type.name

      const description = tag.description
      const isOptional = tag.type.type === 'OptionalType'
      const isArray = tag.type.expression && (tag.type.expression.expression || tag.type.expression).name === 'Array'
      const isUnion = tag.type.expression && tag.type.expression.type === 'UnionType'
      const isRest = tag.type.expression && tag.type.expression.type === 'RestType'

      if (isOptional)
        type = tag.type.expression.name

      if (isArray)
        type = 'Array of ' + inflection.pluralize(
          (tag.type.expression.applications || tag.type.applications).map(getName).map(inflection.pluralize.bind(inflection)).join(', '))

      if (isUnion)
        type = 'Either ' + tag.type.expression.elements.map(getName).join(', or ')

      if (isRest) {
        type = `Arbitrary number of ` + getName(
          tag.type.expression.expression || tag.type.expression)
        name = `&hellip;${name}`
      }

      params.push(`<span class="parameter" title="${type}` + (description ?
        `. ${description}` : '') + `">` +
        (isOptional ? `[${name}]` : name) + '</span>')
    }
  }

  if (params.length) obj.comment.params = params.join(', ')
  if (!obj.comment.description)
    obj.comment.description = "Write me"

  return obj
}

function zip(arrays) {
  return arrays[0].map(function(_,i){
    return arrays.map(function(array){return array[i]})
  });
}

function processActionStore (ns, actions, store) {
  var thing = zip([
    actions.map(processAPI.bind(null, ns)),
    store.map(processAPI.bind(null, ns))
  ])
  thing = [].concat.apply([],thing);
  return thing
}
const render = description => marked(description, markedOptions)

// setup a docs key on each container of the api
// will contain the generated docchi data from the api comments
for (let container of api) {
  if (container.actions && container.store) {

    var jsDocJson = {
      actions: docchi.parse(fs.readFileSync(path.join(apiPath, container.actions)) ).output({render}),
      store: docchi.parse(fs.readFileSync(path.join(apiPath, container.store)) ).output({render}),
    }

    container.docs = processActionStore(
      container.module,
      jsDocJson.actions,
      jsDocJson.store
    )

  }
}

// load the mustache templates into the 'templates' const
for (let file of fs.readdirSync(templatePath)) {
  templates[path.basename(file, '.mustache')] =
    fs.readFileSync(path.join(templatePath, file)).toString()
}

// for each md file
for (let file of fs.readdirSync(docPath)) {
  const basename = path.basename(file, '.md')

  docs[inflection.dasherize(basename.toLowerCase())] = {
    root: '../',
    title: inflection.titleize(basename),
    year, api, sites,
    content: marked(
      fs.readFileSync(path.join(docPath, file)).toString(), markedOptions)
  }
}

(() => {
  const readme = fs.readFileSync(path.join(__dirname, '..', 'README.md')).toString()

  const example = (/(## Example([\s\S]+)(?=\n#))/g).exec(readme)[2]

  docs.readme = {
    root: './',
    title: 'Foster',
    year, api,
    description: pkg.description,
    keywords: pkg.keywords.join(','),
    content: mustache.render(templates.home, { version: pkg.version }) + marked(example, markedOptions),
    sites
  }
})()


// Copy assets
mkdirp.sync(path.join(outputPath, 'assets'))
for (let file of fs.readdirSync(assetPath)) {
  fs.createReadStream(path.join(assetPath, file))
    .pipe(fs.createWriteStream(path.join(outputPath, 'assets', path.basename(file))))
}

// Build stylesheets
const result = sass.renderSync({
  file: path.join(stylesheetPath, 'style.scss'),
  includePaths: ['styles/'],
  outputStyle: 'compressed'
})
fs.writeFileSync(path.join(outputPath, 'assets/style.css'), result.css)

// Build the pages
fs.writeFileSync(
  path.join(outputPath, 'index.html'),
  mustache.render(templates.page, docs.readme, templates)
)

mkdirp.sync(path.join(outputPath, 'api'))
fs.writeFileSync(
  path.join(outputPath, 'api/index.html'),
  mustache.render(templates.page, {
    root: '../',
    title: 'API Reference',
    year, api, sites,
    content: mustache.render(templates.api, api)
  }, templates)
)

for (let doc in docs) {
  mkdirp.sync(path.join(outputPath, doc))

  fs.writeFileSync(
    path.join(outputPath, doc, 'index.html'),
    mustache.render(templates.page, docs[doc], templates)
  )
}

process.stderr.write(chalk.green(`Done! Build finished in ${chalk.bold(((Date.now() - start) / 1000) + ' s')}.\n`))
