"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var DocumentList = (function (_super) {
    __extends(DocumentList, _super);
    function DocumentList() {
        _super.apply(this, arguments);
    }
    DocumentList.prototype.render = function () {
        return (React.createElement("ul", null, this.props.docs.map(function (doc) {
            return (React.createElement("li", {key: doc.id}, doc.slug));
        })));
    };
    return DocumentList;
}(React.Component));
var DocumentListContainer = (function (_super) {
    __extends(DocumentListContainer, _super);
    function DocumentListContainer(props) {
        _super.call(this, props);
        this.state = { docs: [] };
    }
    DocumentListContainer.prototype.componentDidMount = function () {
        var _this = this;
        console.log("component will mount!");
        this.props.api.form('everything').ref(this.props.api.master()).submit(function (err, res) {
            _this.setState({ docs: res.results });
        });
    };
    DocumentListContainer.prototype.render = function () {
        console.log("Render doclistcont");
        return React.createElement(DocumentList, {endpoint: this.props.endpoint, docs: this.state.docs, linkResolver: this.props.linkResolver});
    };
    return DocumentListContainer;
}(React.Component));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = DocumentListContainer;
//# sourceMappingURL=DocumentList.js.map