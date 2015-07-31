
var CodeMirror = require('codemirror/lib/codemirror');

require('codemirror/addon/edit/matchbrackets.js');
require('codemirror/addon/edit/closebrackets.js');
require('codemirror/addon/comment/comment.js');
require('codemirror/addon/wrap/hardwrap.js');
require('codemirror/addon/fold/foldcode.js');
require('codemirror/addon/fold/foldgutter.js');
require('codemirror/addon/fold/brace-fold.js');
require('codemirror/addon/fold/comment-fold.js');
require('codemirror/addon/mode/overlay');
require('codemirror/mode/javascript/javascript.js');
require('codemirror/keymap/sublime.js');
require('./lib/jg-template');

var _  = require('lodash');
var template = require('./template');
var generator = require('./lib/ijg/');


var app = {

  // editor common config
  editorConfig: {
    lineNumbers: true,
    mode: "jg-template",
    keyMap: "sublime",
    autoCloseBrackets: true,
    matchBrackets: true,
    tabSize: 2,
    showCursorWhenSelecting: true,
    foldGutter: true,
    foldOptions: {
      minFoldSize: 2,
      widget: '...'
    },
    gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
    theme: "monokai"
  },

  run: function() {
    var _this = this;

    this.cacheDom();

    // main editor
    this.leftEditor = CodeMirror(document.getElementById('left-editor'), _.extend({
      value: template
    }, this.editorConfig));


    // editor that display generate data
    this.rightEditor = CodeMirror(document.getElementById('right-editor'), _.extend({
      readOnly: true
    }, this.editorConfig));
    
    // generate btn click
    this.generateBtn.onclick = function() {
      _this.generate();
    }

    // reset to default template
    this.resetBtn.onclick = function() {
      _this.reset();
    }
  },

  cacheDom: function() {
    this.generateBtn = document.getElementById('generate');
    this.resetBtn = document.getElementById('reset');
  },
  
  // generate
  generate: function() {
    var code = this.leftEditor.getValue();
    
    try {

      // compile
      var func = new Function('return ' + code + ';');
      var jsonTemplate = func();
      var jsonObj = generator.generate(jsonTemplate);

      this.rightEditor.setValue(JSON.stringify(jsonObj, null, 2));

    } catch(e) {
      console.log(e.message);
    }
    
  },

  // reset to default template
  reset: function() {
    this.leftEditor.setValue(template);
  }


};

app.run();
