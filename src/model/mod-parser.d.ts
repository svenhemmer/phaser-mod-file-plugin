export interface ModParser {
    constructor: (modFile: ArrayBuffer) => void;
}

export type Song = {
    title: string;
    sampleInformation: SampleInformation[];
    songInformation: SongInformation;
    patterns: Pattern[];
    sampleData: Uint8Array[];
}

export type SampleInformation = {
    name: string;
    length: number;
    finetune: number;
    volume: number;
    repeatPoint: number;
    repeatLength: number;
}

export type SongInformation = {
    length: number;
    positions: number[];
    letters: string;
}

type Note = { 
    period: number;
    tune: string;
    effect: number;
    pos: number;
}

export type Pattern = {
    values: {
        channels: Note[]
    }[]; 
}