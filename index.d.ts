export * from './src/model';

export interface ModSoundPlugin {
    init: (file: ArrayBuffer, audioContext: AudioContext) => void;
    reverseWord: (word: string) => string;
    parseModFile: (data: ArrayBuffer) => void;
}