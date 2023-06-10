export interface TestPlugin {
    init: () => void;
    reverseWord: (word: string) => string;
}