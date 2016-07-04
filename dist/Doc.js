"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var prismic_io_1 = require('prismic.io');
var Doc = (function (_super) {
    __extends(Doc, _super);
    function Doc(props) {
        _super.call(this, props);
        this.state = {
            notFound: false,
            doc: null
        };
    }
    Doc.prototype.componentDidMount = function () {
        var _this = this;
        prismic_io_1.Prismic.api(this.props.endpoint, this.props.accesstoken).then(function (api) {
            return api.getByID(_this.props.params['id'], {}, (function (err, doc) {
                if (doc) {
                    _this.setState({
                        doc: doc
                    });
                }
                else {
                    _this.setState({
                        notFound: true
                    });
                }
            }));
        });
    };
    Doc.prototype.render = function () {
        if (this.state.notFound) {
            return (React.createElement("div", null, "Document not found"));
        }
        else if (!this.state.doc) {
            return (React.createElement("div", null, "Loading..."));
        }
        else {
            return (React.createElement("div", {dangerouslySetInnerHTML: { __html: this.state.doc.asHtml(this.props.linkResolver) }}));
        }
    };
    return Doc;
}(React.Component));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Doc;
//# sourceMappingURL=Doc.js.map