import type { Song, WebAudioSoundManager } from "../model";

export class Player {
    private song: Song;
    private soundManager: WebAudioSoundManager;

    constructor (song: Song, soundManager: WebAudioSoundManager ) {
        this.song = song;
        this.soundManager = soundManager;
        soundManager.decodeAudio('test', song.sampleData[2].buffer);
    }

    play () {
        this.soundManager.play('test');
    }

    stop () {

    }

    pause () {

    }

    resume () {

    }
}