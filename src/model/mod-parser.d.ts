export interface ModParser {
    constructor: (modFile: ArrayBuffer) => void;
}

export type Song = {
    title: string;
    sampleInformation: SampleInformation[];
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
