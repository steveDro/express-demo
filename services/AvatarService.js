const sharp = require('sharp');
const uuidv4 = require('uuidv4');
const util = require('util');
const path = require('path');
const fs = require('fs');

const fsunlink = util.promisify(fs.unlink);

class AvatarService {
  constructor(directory) {
    this.directory = directory;
  }

  async store(buffer) {
    const filename = AvatarService.filename();
    const filePath = this.filePath(filename);

    await sharp(buffer)
      .resize(300, 300, {
        fit: sharp.fit.inside,
        withoutEnlargement: true,
      })
      .toFile(filePath);
    return filename;
  }

  async delete(filename) {
    return fsunlink(this.filePath(filename));
  }

  // eslint-disable-next-line class-methods-use-this
  async filename() {
    return `${uuidv4()}.png`;
  }

  filePath(filename) {
    return path.resolve(`${this.directory}/${filename}`);
  }
}

module.exports = AvatarService;
