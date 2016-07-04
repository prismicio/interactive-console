'use strict';
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require("react");
var Codemirror = require('react-codemirror');
require('codemirror/mode/javascript/javascript');
require('codemirror/lib/codemirror.css');
var Editor = (function (_super) {
    __extends(Editor, _super);
    function Editor(props) {
        _super.call(this, props);
        this.state = {
            code: 'function(api) { /* stuff */ }'
        };
    }
    Editor.prototype.updateCode = function (newCode) {
        this.setState({
            code: newCode
        });
    };
    Editor.prototype.render = function () {
        return (React.createElement(Codemirror, {value: this.state.code, onChange: this.updateCode.bind(this), options: {
            lineNumbers: true
        }}));
    };
    return Editor;
}(React.Component));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Editor;
//# sourceMappingURL=Editor.js.map