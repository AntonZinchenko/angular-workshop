import { Injectable } from '@angular/core';

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

@Injectable()
export class GeneratorService {

  private charRanges: Array<Range>;

  constructor(public length: number) {
    if (length <= 0) {
      throw new Error(`Incorrect length value: ${length}`);
    }
  }

  randomSequence(): Array<string> {
    const result = new Array<string>();
    for (let i = this.length; i > 0; --i) {
      result.push(ALPHABET[Math.round(Math.random() * (ALPHABET.length - 1))]);
    }

    return result;

  }
}
