import type { Song, SampleInformation, SongInformation, Note, Pattern } from "../model";

const tuning = {
    856: 'C-1',
    808: 'C#-1',
    762: 'D-1',
    720: 'D#-1',
    678: 'E-1',
    640: 'F-1',
    604: 'F#-1',
    570: 'G-1',
    538: 'G#-1',
    508: 'A-1',
    480: 'A#-1',
    453: 'B-1',
    428: 'C-2',
    404: 'C#-2',
    381: 'D-2',
    360: 'D#-2',
    339: 'E-2',
    320: 'F-2',
    302: 'F#-2',
    285: 'G-2',
    269: 'G#-2',
    254: 'A-2',
    240: 'A#-2',
    226: 'B-2',
    214: 'C-3',
    202: 'C#-3',
    190: 'D-3',
    180: 'D#-3',
    170: 'E-3',
    160: 'F-3',
    151: 'F#-3',
    143: 'G-3',
    135: 'G#-3',
    127: 'A-3',
    120: 'A#-3',
    113: 'B-3'
}

export class ModParser {
    private modData: ArrayBuffer;

    private song?: Song;

    constructor(modData: ArrayBuffer) {
        this.modData = modData;
    }

    parse() {
        const title = this.readStringData(0, 20);
        const sampleInformation = this.readSampleInfo();
        const songInformation = this.readSongInformation();
        const numPatterns = Math.max(...songInformation.positions);
        const patterns = this.readPatterns(numPatterns);
        const sampleData = this.readSampleData(numPatterns, sampleInformation);
        this.song = { title, sampleInformation, songInformation, patterns, sampleData };
        console.log(this.song)
    }

    getSong() {
        return this.song;
    }

    readStringData(offset: number, length: number) {
        const stringBuffer = new Uint8Array(this.modData, offset, length);
        const stringArray = Array.from(stringBuffer).filter((charCode) => charCode !== 0);
        return String.fromCharCode.apply(null, stringArray).trim();
    }

    readSampleData (numPatterns: number, sampleInformation: SampleInformation[]) {
        let offset = 1084 + 1024 * numPatterns;
        const sampleData: Uint8Array[] = [];
        for (let i = 0; i < sampleInformation.length; i++) {
            const sampleLength = sampleInformation[i].length;
            const sampleBuffer = new Uint8Array(this.modData, offset, sampleLength);
            sampleData.push(sampleBuffer);
            offset += sampleLength;
        }
        return sampleData;
    }

    readPatterns(numPatterns: number): Pattern[] {
        let offset = 1084;

        const patterns: Pattern[] = [];
        for(let i = 0; i < numPatterns; i++) {
            patterns.push(this.readPattern(offset + 1024 * i));
        }
        return patterns;
    }

    readPattern(offset: number): Pattern {
        const dataView = new DataView(this.modData);
        let values: { channels: Note[] }[] = [];
        for (let i = 0; i < 64; i++) {
            const channels: Note[] = [];
            for (let c = 0; c < 4; c ++) {
                let data = dataView.getUint32(offset + (i + c) * 4);
                const effectCommand = data & 0x00000fff;
                data = data >> 12;
                const lowerPos = data & 0x0000000f;
                data = data >> 4;
                const period = data & 0x00000fff;
                data = data >> 12;
                const upperPos = data & 0x0000000f;
                data = data >> 4;
                const pos = upperPos << 4 | lowerPos;
                channels[c] = {
                    pos,
                    period: period,
                    tune: tuning[period] ? tuning[period]: '---',
                    effect: effectCommand
                };
            }
            values.push({ channels });
        };
        return { values };
    }

    readSongInformation(): SongInformation {
        const dataView = new DataView(this.modData);
        let offset = 950;
        const length = dataView.getUint8(offset);
        const positions: number[] = [];
        for (let i = 0; i < 128; i++) {
            positions.push(dataView.getUint8(offset + 2 + i))
        }
        const letters = this.readStringData(offset + 130, 4);
        return { length, positions, letters };
    }

    readSampleInfo(): SampleInformation[] {
        const infos: SampleInformation[] = [];
        for (let i = 0; i < 31; i++) {
            infos.push(this.readSample(i))
        }
        return infos;
    }

    readSample(sampleNumber: number): SampleInformation {
        const dataView = new DataView(this.modData);
        const offset = 20 + 30 * sampleNumber;
        const name = this.readStringData(offset, 22);
        const length = 2 * dataView.getUint16(offset + 22);
        const finetune = 0x0F && dataView.getUint8(offset + 24);
        const volume = dataView.getUint8(offset + 25);
        const repeatPoint = 2 * dataView.getUint16(offset + 26);
        const repeatLength = 2 * dataView.getUint16(offset + 28);
        return { name, length, finetune, volume, repeatLength, repeatPoint };
    }
      
}