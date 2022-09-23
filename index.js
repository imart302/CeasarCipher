const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout,
});

const assert = require('node:assert').strict;

class CaesarCipher {
  static alphabetLower = 'abcdefghijklmnñopqrstuvwxyz';
  static alphabetUpper = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ';

  static isLetter(char = '') {
    return char.toLowerCase() != char.toUpperCase(); // A a A, ( ( (
  }

  static isUpperCase(char = '') {
    return char === char.toUpperCase();
  }

  static isLowerCase(char = '') {
    return char === char.toLowerCase();
  }

  constructor(key = 0) {
    this.key = key;
  }

  encrypt(text = '') {
    let chars = text.split('');
    let encoding = [];
    chars.forEach((c) => {
      if (CaesarCipher.isLetter(c)) {
        let newChar;
        if (CaesarCipher.isUpperCase(c)) {
          const pos = CaesarCipher.alphabetUpper.search(c);
          const newPos = (pos + this.key) % 27;
          newChar = CaesarCipher.alphabetUpper.charAt(newPos);
        } else {
          const pos = CaesarCipher.alphabetLower.search(c);
          const newPos = (pos + this.key) % 27;
          newChar = CaesarCipher.alphabetLower.charAt(newPos);
        }
        encoding.push(newChar);
      } else {
        encoding.push(c);
      }
    });

    return encoding.join('');
  }

  decrypt(text) {
    let chars = text.split('');
    let encoding = [];
    chars.forEach((c) => {
      if (CaesarCipher.isLetter(c)) {
        let newChar;
        if (CaesarCipher.isUpperCase(c)) {
          const pos = CaesarCipher.alphabetUpper.search(c);
          const newPos =
            pos - (this.key % 27) < 0
              ? 27 - ((this.key % 27) - pos)
              : pos - (this.key % 27);
          newChar = CaesarCipher.alphabetUpper.charAt(newPos);
        } else {
          const pos = CaesarCipher.alphabetLower.search(c);
          const newPos =
            pos - (this.key % 27) < 0
              ? 27 - ((this.key % 27) - pos)
              : pos - (this.key % 27);
          newChar = CaesarCipher.alphabetLower.charAt(newPos);
        }
        encoding.push(newChar);
      } else {
        encoding.push(c);
      }
    });

    return encoding.join('');
  }
}

function test() {
  let test = 'HelloZ Helloz';

  const mCipher = new CaesarCipher(200);

  const enc = mCipher.encrypt(test);
  const dec = mCipher.decrypt(enc);
  assert(test === dec);
  
}

test();


function main() {
  if(process.argv.length < 3) {
    console.error('NO ARGUMENTS, MUST ENTER A NUMBER');
    process.exit(-1);
  }
  else {
    try {
      let key = Number.parseInt(process.argv[2]);
      readline.question(`plaintext: `, text => {
        const cc = new CaesarCipher(key);
        const c = cc.encrypt(text);
        console.log(`ciphertext: ${c}`);
        process.exit(1);
      });
    }
    catch(error) {
      console.log(error);
      process.exit(-1);
    }
  }

}

main();
