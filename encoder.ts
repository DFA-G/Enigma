import config from "./config.json" assert { type: "json" };

const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");

const rotor1Alphabet = "dmtwsilruyqnkfejcazbpgxohv".split("");
const rotor2Alphabet = "hqzgpjtmoblncifdyawveusrkx".split("");
const rotor3Alphabet = "uqntlszfmrehdpxkibvygjcwoa".split("");

export class Encoder { 
  rotors: [number, number, number];
  plugboard: Record<string, string>;
  output: string;
  constructor() {
    this.plugboard = config.plugboard;
    this.rotors = config.rotors as [number, number, number];
    this.output = "";
  }
  
  plugencode(input: string) {
    for (const [key, value] of Object.entries(this.plugboard)) {
      if (input === key) return value;
      if (input === value) return key;
    }
    
  }

  encode(input: string) { 
    for (let letter of input) {
      // Check for space
      if (letter === " ") return this.output += " ";

      // Plugboard
      letter = this.plugencode(letter) as string;

      // Turn up
      this.rotors[0]++;
      for (let i = 0; i < 3; i++) {
        if (this.rotors[i] === 26) {
          this.rotors[i] = 0;
          if (i < 2) this.rotors[i + 1]++;
        }
      }

      // Rotor encoding
      let letterNum = alphabet.indexOf(letter);

      if (letterNum + this.rotors[0] > 25) letterNum -= 26;
      letter = rotor1Alphabet[letterNum + this.rotors[0]];
      letterNum = rotor1Alphabet.indexOf(letter);

      if (letterNum + this.rotors[1] > 25) letterNum -= 26;
      letter = rotor2Alphabet[letterNum + this.rotors[1]];
      letterNum = rotor2Alphabet.indexOf(letter);

      if (letterNum + this.rotors[2] > 25) letterNum -= 26;
      letter = rotor3Alphabet[letterNum + this.rotors[2]];
      letterNum = rotor3Alphabet.indexOf(letter);

      if (letterNum + this.rotors[1] > 25) letterNum -= 26;
      letter = rotor2Alphabet[letterNum + this.rotors[1]];
      letterNum = rotor2Alphabet.indexOf(letter);

      if (letterNum + this.rotors[0] > 25) letterNum -= 26;
      letter = rotor1Alphabet[letterNum + this.rotors[0]];
      letterNum = rotor1Alphabet.indexOf(letter);

      // Plugboard
      letter = this.plugencode(letter) as string;

      this.output += letter;
    }
    return(this.output);
  }
}