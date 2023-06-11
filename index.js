import { Plugins } from 'phaser';
import { ModParser } from './src/mod-loader';
const { BasePlugin } = Plugins;

export class ModSoundPlugin extends BasePlugin {
  constructor(pluginManager) {
    super('ModSoundPlugin', pluginManager);
  }

  init() {
    console.log('Init was called.');
  }

  parseModFile(data) {
    const parser = new ModParser(data);
    parser.parse();
  }

  reverseWord(word) {
    return word.split('').reverse().join('');
  }
}
