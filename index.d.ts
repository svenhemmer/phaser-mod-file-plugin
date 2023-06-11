export * from './src/model';

export interface ModSoundPlugin {
    init: (file: ArrayBuffer, audioContext: AudioContext) => void;
    parseModFile: (data: ArrayBuffer) => void;
}