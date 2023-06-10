import { Plugins } from 'phaser';
const { BasePlugin } = Plugins;

export class TestPlugin extends BasePlugin {
  constructor(pluginManager) {
    super('TestPlugin', pluginManager);

    console.log('Constructor was called.');
  }

  init() {
    console.log('Init was called.');
  }

  reverseWord(word) {
    return word.split('').reverse().join('');
  }
}
