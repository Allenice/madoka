
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

var _  = require('lodash');
var template = require('./template');

// from http://www.json-generator.com/
CodeMirror.defineMode("jg-template", function(a, b) {
    var c = {
      token: function(a, b) {
        var c;
        if (a.match("{{")) {
          while (null  != (c = a.next()))
            if ("}" == c && "}" == a.next())
              break;
          return a.eat("}"),
            "jg-template"
        }
        while (null  != a.next() && !a.match("{{", !1))
          ;
        return null
      }
    };
    return CodeMirror.overlayMode(CodeMirror.getMode(a, b.backdrop || "javascript"), c)
  }
);

// editor common config
var editorComm = {
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
};


var leftEditor = CodeMirror(document.getElementById('left-editor'), _.extend({
  value: template
}, editorComm));


var rightEditor = CodeMirror(document.getElementById('right-editor'), _.extend({
  readOnly: true
}, editorComm));
