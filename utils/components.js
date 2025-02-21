const fs = require('fs')

var components = []
var loaded = false
var counts = {loaded: 0, unloaded: 0, both: 0}

function loadComponents() {
  var jsontxt = fs.readFileSync('./components.json', 'utf-8')
  var json = JSON.parse(jsontxt)

  counts.both = json.length
  counts.unloaded = json.length

  json = json.filter(item => {
    return item.enabled == true
  })

  counts.loaded = json.length
  counts.unloaded -= counts.loaded
  components = json

  components.forEach(item => {
    item.componentfn = require('../components/' + item.file)
  })

  loaded = true
}

function listComponents() {
  if (!loaded) return null

  return components
}

function countComponents() {
  if (!loaded) return null

  return counts
}

function getTrigger(trigger) {
  let cc = components.filter(item => {
    return item.calls[trigger] != 'null'
  })

  return cc
}

function callNameTrigger(name, trigger, arg1, arg2, arg3) {
  var component = components.filter(item => {
    return item.name == name
  })

  let a = component[0]

  return a.componentfn[a.calls[trigger]](arg1, arg2, arg3)
}

function callTrigger(trigger, arg1, arg2, arg3) {
  var component = components.filter(item => {
    return item.calls[trigger] != 'null'
  })

  component.forEach(item => {
    item.componentfn[item.calls[trigger]](arg1, arg2, arg3)
  })
}

module.exports = {
  load: loadComponents,
  list: listComponents,
  counts: countComponents,
  getByTrigger: getTrigger,
  callByNameTrigger: callNameTrigger,
  callByTrigger: callTrigger
}
