/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable no-else-return */
/* eslint-disable no-param-reassign */
/* eslint-disable no-path-concat */
import colors from 'nice-color-palettes/1000';
import uuid from 'uuid/v1';
import fs from 'fs';
import path from 'path';
import svg2png from 'svg2png';

const gooavatar = {
  setDefaultTemplateProps(v, u, color, stroke, bgcolor) {
    const template = `
            <svg width="580" height="400" xmlns="http://www.w3.org/2000/svg">
            <!-- Created with Method Draw - http://github.com/duopixel/Method-Draw/ -->
            <g>
            <title>background</title>
            <rect fill="${bgcolor}" id="canvas_background" height="402" width="582" y="-1" x="-1"/>
            <g display="none" overflow="visible" y="0" x="0" height="100%" width="100%" id="canvasGrid">
            <rect fill="url(#gridpattern)" stroke-width="0" y="0" x="0" height="100%" width="100%"/>
            </g>
            </g>
            <g>
            <title>Layer 1</title>
            <text stroke="${stroke}" transform="matrix(7,0,0,7,-771,-848.625) " xml:space="preserve" text-anchor="start" font-family="Helvetica, Arial, sans-serif" font-size="24" id="svg_1" y="152.866071" x="141.214286" stroke-width="0" fill="${color}">${v}</text>
            <text stroke="${stroke}" transform="matrix(4.80256399955154,0,0,5.286496041355199,-903.3641023261588,-811.3419012917761) " xml:space="preserve" text-anchor="start" font-family="Helvetica, Arial, sans-serif" font-size="24" id="svg_2" y="195.796925" x="250.162378" stroke-width="0" fill="${color}">${u}</text>
            </g>
            </svg>
        `;
    return template;
  },
  getColors(id = 0, idd = 0) {
    return colors[id][idd];
  },
  randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  },
  nameTwerk(name = '') {
    name = name.toLowerCase();
    name = name
      .replace(/^mr\s/, '')
      .replace(/^mr.\s/, '')
      .replace(/^mr./, '')
      .replace(/^mr,\s/, '')
      .replace(/^mr,/, '')
      .replace(/^mrs\s/, '')
      .replace(/^mrs.\s/, '')
      .replace(/^mrs./, '')
      .replace(/^mrs,\s/, '')
      .replace(/^mrs,/, '')
      .replace(/^master\s/, '')
      .replace(/^master.\s/, '')
      .replace(/^master./, '')
      .replace(/^master,\s/, '')
      .replace(/^master,/, '')
      .replace(/^miss\s/, '')
      .replace(/^miss.\s/, '')
      .replace(/^miss./, '')
      .replace(/^miss,\s/, '')
      .replace(/^miss,/, '')
      .replace(/^dr\s/, '')
      .replace(/^dr.\s/, '')
      .replace(/^dr./, '')
      .replace(/^dr,\s/, '')
      .replace(/^dr,/, '')
      .replace(/^engr\s/, '')
      .replace(/^engr.\s/, '')
      .replace(/^engr./, '')
      .replace(/^engr,\s/, '')
      .replace(/^engr,/, '')
      .replace(/^madam\s/, '')
      .replace(/^madam.\s/, '')
      .replace(/^madam./, '')
      .replace(/^madam,\s/, '')
      .replace(/^madam,/, '')
      .replace(/^sir\s/, '')
      .replace(/^sir.\s/, '')
      .replace(/^sir./, '')
      .replace(/^sir,\s/, '')
      .replace(/^sir,/, '');

    if (String(name).length > 0) {
      let space = name.split(' ');
      const func = arr => {
        if (arr.length > 1) {
          let a = String(arr[0]).charAt(0);
          let b = String(arr[1]).charAt(0);
          a = String(a).toUpperCase();
          b = String(b).toUpperCase();
          return {
            v: a,
            u: b,
            error: ''
          };
        } else {
          let a = String(arr[0]).charAt(0);
          a = String(a).toUpperCase();
          return {
            v: a,
            u: '',
            error: ''
          };
        }
      };
      const rep = func(space);
      return rep;
    } else {
      return {
        v: 'n',
        u: '/a',
        error: 'No name added'
      };
    }
  },
  getAvatarSVG(name, dir = '/avatar') {
    if (!(String(dir).length > 0)) {
      dir = '/avatar';
    }
    dir = dir.toLowerCase();
    dir = dir.replace(String(__dirname).toLowerCase(), '');
    dir = dir.replace(/\//g, '\\');
    const newname = gooavatar.nameTwerk(name);
    const color = gooavatar.getColors(
      gooavatar.randomIntFromInterval(0, 999),
      gooavatar.randomIntFromInterval(0, 3)
    );
    const bgcolor = gooavatar.getColors(
      gooavatar.randomIntFromInterval(0, 999),
      gooavatar.randomIntFromInterval(0, 3)
    );
    const template = gooavatar.setDefaultTemplateProps(newname.v, newname.u, color, color, bgcolor);

    const check = dir.split('\\');
    for (let i = 0; i < check.length; i += 1) {
      const directory = `${__dirname}\\${check[i]}`;
      if (!fs.existsSync(directory)) {
        fs.mkdirSync(directory);
      }
      if (i != check.length - 1) {
        check[i + 1] = [check[i], check[i + 1]].join('\\');
      }
    }
    let source = `${__dirname}\\${dir}\\${uuid()}.svg`;
    source = source.replace(`\\\\`, `\\`);
    return new Promise((resolve, reject) => {
      fs.writeFile(source, template, err => {
        if (err) {
          reject(err);
        } else {
          resolve(source);
        }
      });
    });
  },
  getAvatarPNG(name, dir = '/avatar') {
    return new Promise((resolve, reject) => {
      gooavatar.getAvatarSVG(name, dir).then(directory => {
        const label = path.dirname(`${directory}`);
        const basename = path.basename(`${directory}`, '.svg');
        const newpath = `${label}\\${basename}.png`;
        fs.readFile(directory, (err, data) => {
          if (err) {
            reject(err);
          } else {
            svg2png(data, { width: 580, height: 400 })
              .then(buffer => {
                fs.writeFile(newpath, buffer, error => {
                  if (error) reject(error);
                  else {
                    fs.unlinkSync(directory);
                    resolve(newpath);
                  }
                });
              })
              .catch(e => {
                reject(e);
              });
          }
        });
      });
    });
  }
};

const gooAvatar = {
  inSVG(name, dir) {
    // Changeable later
    // options name
    const options = 'name';
    return new Promise((resolve, reject) => {
      if (options == 'name') {
        gooavatar
          .getAvatarSVG(name, dir)
          .then(source => {
            resolve(source.replace(__dirname, '').replace(`\\\\`,'\\'));
          })
          .catch(err => {
            reject(err);
          });
      } else {
        reject({
          err: 'Updates are coming soon'
        });
      }
    });
  },
  inPNG(name, dir) {
    // Changeable later
    // options name
    const options = 'name';
    return new Promise((resolve, reject) => {
      if (options == 'name') {
        gooavatar.getAvatarPNG(name, dir).then(source => {
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
export default gooAvatar;
