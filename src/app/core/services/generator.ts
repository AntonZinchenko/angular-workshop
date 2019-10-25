import { Injectable } from '@angular/core';

const ALPHABET =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

export const GeneratorFactory = (generator: GeneratorService, n: number) => generator.randomSequence(n);

@Injectable()
export class GeneratorService {

  randomSequence(length: number): Array<string> {
    const result = new Array<string>();
    for (let i = length; i > 0; --i) {
      result.push(ALPHABET[Math.round(Math.random() * (ALPHABET.length - 1))]);
    }

    return result;
  }
}
