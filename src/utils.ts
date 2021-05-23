export const dot = "·";
export const dots = ["·", "."];

export const comma = "–";
export const commas = ["–", ","];

type TypedObject<T> = {[key: string]: T};

export type Original = string;
export type Encoded = string[];

export const morseTranslation: TypedObject<string> = {
    'A': '.-',
    'Á': '.-',
    'B': '-...',
    'C': '-.-.',
    'Č': '-.-.',
    'D': '-..',
    'E': '.',
    'Ě': '.',
    'É': '.',
    'F': '..-.',
    'G': '--.',
    'H': '....',
    'I': '..',
    'Í': '..',
    'J': '.---',
    'K': '-.-',
    'L': '.-..',
    'M': '--',
    'N': '-.',
    'Ň': '-.',
    'O': '---',
    'Ó': '---',
    'P': '.--.',
    'Q': '--.-',
    'R': '.-.',
    'Ř': '.-.',
    'S': '...',
    'Š': '...',
    'T': '-',
    'Ť': '-',
    'U': '..-',
    'Ú': '..-',
    'Ů': '..-',
    'V': '...-',
    'W': '.--',
    'X': '-..-',
    'Y': '-.--',
    'Ý': '-.--',
    'Z': '--..',
    'Ž': '--..',
    '1': '.----',
    '2': '..---',
    '3': '...--',
    '4': '....-',
    '5': '.....',
    '6': '-....',
    '7': '--...',
    '8': '---..',
    '9': '----.',
    '0': '-----',
    ' ': ' ',
    ".": '.-.-.-',
    ',': '--..--',
    '?': '..--..',
  };

export const encode = (input: Original): Encoded => {
    const result: Encoded = [];

    for (const character of input.toUpperCase()) {
        if (character in morseTranslation) {
            result.push(morseTranslation[character]);
        } else {
            throw Error(`Character "${character}" (ASCII = ${character.charCodeAt(0)}) is not in morse translation database.`);
        }
    }

    return result;
};

export const decode = (input: Encoded): Original => {
    let result: Original = "";

    for (const character of input) {
        if (Object.values(morseTranslation).includes(character)) {
            const [res,] = Object.entries(morseTranslation).find(([char, encoded]) => encoded === character) || [""];
            result += res;
        }
    }

    return result;
};