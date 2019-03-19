"use strict";

var _ = _interopRequireDefault(require("nice-color-palettes/1000"));

var _v = _interopRequireDefault(require("uuid/v1"));

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _svg2png = _interopRequireDefault(require("svg2png"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable prefer-promise-reject-errors */

/* eslint-disable no-else-return */
var gooavatar = {
  setDefaultTemplateProps: function setDefaultTemplateProps(v, u, color, stroke, bgcolor) {
    var template = "\n            <svg width=\"580\" height=\"400\" xmlns=\"http://www.w3.org/2000/svg\">\n            <!-- Created with Method Draw - http://github.com/duopixel/Method-Draw/ -->\n            <g>\n            <title>background</title>\n            <rect fill=\"".concat(bgcolor, "\" id=\"canvas_background\" height=\"402\" width=\"582\" y=\"-1\" x=\"-1\"/>\n            <g display=\"none\" overflow=\"visible\" y=\"0\" x=\"0\" height=\"100%\" width=\"100%\" id=\"canvasGrid\">\n            <rect fill=\"url(#gridpattern)\" stroke-width=\"0\" y=\"0\" x=\"0\" height=\"100%\" width=\"100%\"/>\n            </g>\n            </g>\n            <g>\n            <title>Layer 1</title>\n            <text stroke=\"").concat(stroke, "\" transform=\"matrix(7,0,0,7,-771,-848.625) \" xml:space=\"preserve\" text-anchor=\"start\" font-family=\"Helvetica, Arial, sans-serif\" font-size=\"24\" id=\"svg_1\" y=\"152.866071\" x=\"141.214286\" stroke-width=\"0\" fill=\"").concat(color, "\">").concat(v, "</text>\n            <text stroke=\"").concat(stroke, "\" transform=\"matrix(4.80256399955154,0,0,5.286496041355199,-903.3641023261588,-811.3419012917761) \" xml:space=\"preserve\" text-anchor=\"start\" font-family=\"Helvetica, Arial, sans-serif\" font-size=\"24\" id=\"svg_2\" y=\"195.796925\" x=\"250.162378\" stroke-width=\"0\" fill=\"").concat(color, "\">").concat(u, "</text>\n            </g>\n            </svg>\n        ");
    return template;
  },
  getColors: function getColors() {
    var id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var idd = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    return _.default[id][idd];
  },
  randomIntFromInterval: function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  },
  nameTwerk: function nameTwerk() {
    var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    name = name.toLowerCase();
    name = name.replace(/^mr\s/, '').replace(/^mr.\s/, '').replace(/^mr./, '').replace(/^mr,\s/, '').replace(/^mr,/, '').replace(/^mrs\s/, '').replace(/^mrs.\s/, '').replace(/^mrs./, '').replace(/^mrs,\s/, '').replace(/^mrs,/, '').replace(/^master\s/, '').replace(/^master.\s/, '').replace(/^master./, '').replace(/^master,\s/, '').replace(/^master,/, '').replace(/^miss\s/, '').replace(/^miss.\s/, '').replace(/^miss./, '').replace(/^miss,\s/, '').replace(/^miss,/, '').replace(/^dr\s/, '').replace(/^dr.\s/, '').replace(/^dr./, '').replace(/^dr,\s/, '').replace(/^dr,/, '').replace(/^engr\s/, '').replace(/^engr.\s/, '').replace(/^engr./, '').replace(/^engr,\s/, '').replace(/^engr,/, '').replace(/^madam\s/, '').replace(/^madam.\s/, '').replace(/^madam./, '').replace(/^madam,\s/, '').replace(/^madam,/, '').replace(/^sir\s/, '').replace(/^sir.\s/, '').replace(/^sir./, '').replace(/^sir,\s/, '').replace(/^sir,/, '');

    if (String(name).length > 0) {
      var space = name.split(' ');

      var func = function func(arr) {
        if (arr.length > 1) {
          var a = String(arr[0]).charAt(0);
          var b = String(arr[1]).charAt(0);
          a = String(a).toUpperCase();
          b = String(b).toUpperCase();
          return {
            v: a,
            u: b,
            error: ''
          };
        } else {
          var _a = String(arr[0]).charAt(0);

          _a = String(_a).toUpperCase();
          return {
            v: _a,
            u: '',
            error: ''
          };
        }
      };

      var rep = func(space);
      return rep;
    } else {
      return {
        v: 'n',
        u: '/a',
        error: 'No name added'
      };
    }
  },
  getAvatarSVG: function getAvatarSVG(name) {
    var dir = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '/avatar';

    if (!(String(dir).length > 0)) {
      dir = '/avatar';
    }

    dir = dir.toLowerCase();
    dir = dir.replace(String(__dirname).toLowerCase(), '');
    dir = dir.replace(/\//g, '\\');
    var newname = gooavatar.nameTwerk(name);
    var color = gooavatar.getColors(gooavatar.randomIntFromInterval(0, 999), gooavatar.randomIntFromInterval(0, 3));
    var bgcolor = gooavatar.getColors(gooavatar.randomIntFromInterval(0, 999), gooavatar.randomIntFromInterval(0, 3));
    var template = gooavatar.setDefaultTemplateProps(newname.v, newname.u, color, color, bgcolor);
    var check = dir.split('\\');

    for (var i = 0; i < check.length; i += 1) {
      var directory = "".concat(__dirname, "\\").concat(check[i]);

      if (!_fs.default.existsSync(directory)) {
        _fs.default.mkdirSync(directory);
      }

      if (i != check.length - 1) {
        check[i + 1] = [check[i], check[i + 1]].join('\\');
      }
    }

    var source = "".concat(__dirname, "\\").concat(dir, "\\").concat((0, _v.default)(), ".svg");
    source = source.replace("\\\\", "\\");
    return new Promise(function (resolve, reject) {
      _fs.default.writeFile(source, template, function (err) {
        if (err) {
          reject(err);
        } else {
          resolve(source);
        }
      });
    });
  },
  getAvatarPNG: function getAvatarPNG(name) {
    var dir = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '/avatar';
    return new Promise(function (resolve, reject) {
      gooavatar.getAvatarSVG(name, dir).then(function (directory) {
        var label = _path.default.dirname("".concat(directory));

        var basename = _path.default.basename("".concat(directory), '.svg');

        var newpath = "".concat(label, "\\").concat(basename, ".png");

        _fs.default.readFile(directory, function (err, data) {
          if (err) {
            reject(err);
          } else {
            (0, _svg2png.default)(data, {
              width: 580,
              height: 400
            }).then(function (buffer) {
              _fs.default.writeFile(newpath, buffer, function (error) {
                if (error) reject(error);else {
                  _fs.default.unlinkSync(directory);

                  resolve(newpath);
                }
              });
            }).catch(function (e) {
              reject(e);
            });
          }
        });
      });
    });
  }
};
var gooAvatar = {
  inSVG: function inSVG(name, dir) {
    // Changeable later
    // options name
    var options = 'name';
    return new Promise(function (resolve, reject) {
      if (options == 'name') {
        gooavatar.getAvatarSVG(name, dir).then(function (source) {
          resolve(source.replace(__dirname, '').replace("\\\\", '\\'));
        }).catch(function (err) {
          reject(err);
        });
      } else {
        reject({
          err: 'Updates are coming soon'
        });
      }
    });
  },
  inPNG: function inPNG(name, dir) {
    // Changeable later
    // options name
    var options = 'name';
    return new Promise(function (resolve, reject) {
      if (options == 'name') {
        gooavatar.getAvatarPNG(name, dir).then(function (source) {
          resolve(source.replace(__dirname, ''));
        });
      } else {
        reject({
          err: 'Updates are coming'
        });
      }
    });
  }
};
module.exports = gooAvatar;
