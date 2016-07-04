'use strict';
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require("react");
var ReactDOM = require('react-dom');
var prismic_io_1 = require('prismic.io');
var DocumentList_1 = require('./DocumentList');
var Doc_1 = require('./Doc');
var Editor_1 = require('./Editor');
var endpoint = 'https://blogtemplate.prismic.io/api';
var accessToken = null;
function linkResolver(doc) {
    return '/' + doc.type + '/' + doc.id;
}
var Home = (function (_super) {
    __extends(Home, _super);
    function Home(props) {
        _super.call(this, props);
        this.state = { api: null };
    }
    Home.prototype.componentDidMount = function () {
        var _this = this;
        prismic_io_1.Prismic.api(this.props.endpoint).then(function (api) { return _this.setState({ api: api }); });
    };
    Home.prototype.render = function () {
        if (!this.state.api) {
            return (React.createElement("div", null, "Loading..."));
        }
        return (React.createElement("div", null, 
            React.createElement(Editor_1.default, null), 
            React.createElement(DocumentList_1.default, {api: this.state.api, endpoint: this.props.endpoint, accesstoken: accessToken, linkResolver: linkResolver})));
    };
    return Home;
}(React.Component));
function DocWrapper(props) {
    return React.createElement(Doc_1.default, {params: props.params, endpoint: this.props.endpoint, accesstoken: accessToken, linkResolver: linkResolver});
}
function NoMatch(props) {
    return React.createElement("div", null, "Not found");
}
function init(element, options) {
    return ReactDOM.render(React.createElement(Home, {endpoint: options.endpoint}), element);
}
exports.init = init;
//# sourceMappingURL=index.js.map