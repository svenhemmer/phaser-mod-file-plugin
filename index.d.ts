export * from './src/model';

import { Player, WebAudioSoundManager } from './src/model';

export interface ModSoundPlugin {
    init: (soundManager: WebAudioSoundManager) => void;
    parseModFile: (data: ArrayBuffer) => Player;
}