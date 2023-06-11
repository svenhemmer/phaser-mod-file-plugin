import type { Song, SampleInformation } from "../model";

export class ModParser {
    private modData: ArrayBuffer;

    private song?: Song;

    constructor(modData: ArrayBuffer) {
        this.modData = modData;
    }

    parse() {
        const sampleData = this.readMODSampleData();
        const title = this.readStringData(0, 20);
        const sampleInformation = this.readSampleInfo();
        this.song = { title, sampleData, sampleInformation };
        console.log(this.song);
    }

    readStringData(offset: number, length: number) {
        const stringBuffer = new Uint8Array(this.modData, offset, length);
        const stringArray = Array.from(stringBuffer).filter((charCode) => charCode !== 0);
        return String.fromCharCode.apply(null, stringArray).trim();
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
        let offset = 20 + 30 * sampleNumber;
        const name = this.readStringData(offset, 22);
        const length = 2 * dataView.getUint16(offset + 22);
        const finetune = 0x0F && dataView.getUint8(offset + 24);
        const volume = dataView.getUint8(offset + 25);
        const repeatPoint = 2 * dataView.getUint16(offset + 26);
        const repeatLength = 2 * dataView.getUint16(offset + 28);
        return { name, length, finetune, volume, repeatLength, repeatPoint };
    }

    readMODSampleData(): Uint8Array[] {
        const fileData = new Uint8Array(this.modData);
        const dataView = new DataView(this.modData);
      
        // Read the number of samples from the MOD file header
        const numSamples = dataView.getUint16(950, false);
        console.log(numSamples);
        
      
        // Calculate the offset where the sample data starts
        const sampleDataOffset = 1084 + numSamples * 30;
      
        // Create an array to store the sample data
        const sampleData: Uint8Array[] = new Array(numSamples);
      
        // Read each sample from the file data
        for (let i = 0; i < numSamples; i++) {
          // Calculate the offset for the current sample
          const sampleOffset = sampleDataOffset + i * 64;
      
          // Extract the sample data
          const sampleBytes = fileData.slice(sampleOffset, sampleOffset + 64);
      
          // Store the processed sample data
          sampleData[i] = sampleBytes;
        }
      
        return sampleData;
      }
      
}