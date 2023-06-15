import { Plugins } from 'phaser';
import { ModParser, Player } from './src/mod-loader';
const { BasePlugin } = Plugins;

export class ModSoundPlugin extends BasePlugin {

  soundManager;

  constructor(pluginManager) {
    super('ModSoundPlugin', pluginManager);
  }

  init(soundManager) {
    this.soundManager = soundManager;
  }

  parseModFile(data) {
    const parser = new ModParser(data);
    parser.parse();
    const player = new Player(parser.getSong(), this.soundManager);
  }
}
