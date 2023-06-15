export * from './mod-parser';
export * from './player';

export type WebAudioSoundManager = {
    decodeAudio: (sampleKey: string, sampleData: ArrayBuffer) => void;
    play: (sampleKey: string) => void;
}