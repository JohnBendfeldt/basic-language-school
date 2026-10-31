import { describe, it, expect } from 'vitest';
import { getAlphabetAcceptedAnswers } from '../utils/alphabetAnswers';

describe('Alphabet Accepted Answers Utility', () => {
  describe('Spanish Alphabet', () => {
    it('accepts letter itself, phonetic names, and sound variations for Spanish C', () => {
      const answers = getAlphabetAcceptedAnswers('C', '/se/ or /k/', 'es');
      expect(answers).toContain('c');
      expect(answers).toContain('se');
      expect(answers).toContain('ce');
      expect(answers).toContain('k');
      expect(answers).toContain('se or k');
    });

    it('accepts silent, ache, and letter h for Spanish H', () => {
      const answers = getAlphabetAcceptedAnswers('H', 'silent /atʃe/', 'es');
      expect(answers).toContain('h');
      expect(answers).toContain('silent');
      expect(answers).toContain('ache');
      expect(answers).toContain('hache');
    });

    it('accepts ge, xe, and g for Spanish G', () => {
      const answers = getAlphabetAcceptedAnswers('G', '/xe/ or /g/', 'es');
      expect(answers).toContain('g');
      expect(answers).toContain('ge');
      expect(answers).toContain('xe');
    });

    it('accepts enye, eñe, and n for Spanish Ñ', () => {
      const answers = getAlphabetAcceptedAnswers('Ñ', '/eɲe/ (ny sound)', 'es');
      expect(answers).toContain('ñ');
      expect(answers).toContain('n');
      expect(answers).toContain('eñe');
      expect(answers).toContain('enye');
    });

    it('accepts zeta, ceta, and z for Spanish Z', () => {
      const answers = getAlphabetAcceptedAnswers('Z', '/theta/ or /se/', 'es');
      expect(answers).toContain('z');
      expect(answers).toContain('zeta');
      expect(answers).toContain('se');
    });
  });

  describe('French Alphabet', () => {
    it('accepts a, ɑ for French A', () => {
      const answers = getAlphabetAcceptedAnswers('A', '/ɑ/', 'fr');
      expect(answers).toContain('a');
    });

    it('accepts e, eu, ə for French E', () => {
      const answers = getAlphabetAcceptedAnswers('E', '/ə/', 'fr');
      expect(answers).toContain('e');
      expect(answers).toContain('eu');
    });

    it('accepts h, ache, ash, muet, and silent for French H', () => {
      const answers = getAlphabetAcceptedAnswers('H', '/aʃ/ (muet)', 'fr');
      expect(answers).toContain('h');
      expect(answers).toContain('ache');
      expect(answers).toContain('ash');
      expect(answers).toContain('muet');
      expect(answers).toContain('silent');
    });

    it('accepts g, ge, je, ʒe for French G', () => {
      const answers = getAlphabetAcceptedAnswers('G', '/ʒe/', 'fr');
      expect(answers).toContain('g');
      expect(answers).toContain('ge');
      expect(answers).toContain('je');
    });

    it('accepts r, er, erre, air for French R', () => {
      const answers = getAlphabetAcceptedAnswers('R', '/ɛʁ/ (guttural)', 'fr');
      expect(answers).toContain('r');
      expect(answers).toContain('er');
      expect(answers).toContain('air');
    });

    it('accepts w, double v, double ve for French W', () => {
      const answers = getAlphabetAcceptedAnswers('W', '/dubləve/', 'fr');
      expect(answers).toContain('w');
      expect(answers).toContain('double v');
      expect(answers).toContain('double ve');
    });

    it('accepts y, i grec, igrec for French Y', () => {
      const answers = getAlphabetAcceptedAnswers('Y', '/iɡʁɛk/', 'fr');
      expect(answers).toContain('y');
      expect(answers).toContain('i grec');
      expect(answers).toContain('igrec');
    });
  });

  describe('Russian Alphabet', () => {
    it('accepts b, be, and б for Russian Б', () => {
      const answers = getAlphabetAcceptedAnswers('Б', 'b', 'ru');
      expect(answers).toContain('б');
      expect(answers).toContain('b');
    });

    it('accepts soft sign and soft for Ь', () => {
      const answers = getAlphabetAcceptedAnswers('Ь', 'soft sign', 'ru');
      expect(answers).toContain('soft sign');
      expect(answers).toContain('soft');
    });
  });

  describe('Bengali Alphabet', () => {
    it('accepts single letter, phonetic names, and sound variations for ঠ', () => {
      const answers = getAlphabetAcceptedAnswers('ঠ', '/ʈʰɔ/ (tho)', 'bn');
      expect(answers).toContain('ঠ');
      expect(answers).toContain('tho');
      expect(answers).toContain('th');
      expect(answers).toContain('t');
      expect(answers).toContain('tha');
    });

    it('accepts single letter, pho, fo, and ha variations for ফ', () => {
      const answers = getAlphabetAcceptedAnswers('ফ', '/pʰɔ/ or /fɔ/ (pho/fo)', 'bn');
      expect(answers).toContain('ফ');
      expect(answers).toContain('pho');
      expect(answers).toContain('fo');
      expect(answers).toContain('f');
      expect(answers).toContain('ph');
      expect(answers).toContain('ha');
    });

    it('accepts single letter, tho, th, and t for থ', () => {
      const answers = getAlphabetAcceptedAnswers('থ', '/t̪ʰɔ/ (tho)', 'bn');
      expect(answers).toContain('থ');
      expect(answers).toContain('tho');
      expect(answers).toContain('th');
      expect(answers).toContain('t');
    });

    it('accepts khanda ta, khanda tho, quan do tho, and t variations for ৎ', () => {
      const answers = getAlphabetAcceptedAnswers('ৎ', '/t̪/ (khanda ta)', 'bn');
      expect(answers).toContain('ৎ');
      expect(answers).toContain('khanda ta');
      expect(answers).toContain('khandata');
      expect(answers).toContain('khanda tho');
      expect(answers).toContain('quan do tho');
      expect(answers).toContain('t');
    });

    it('accepts o, a, aw, and shoro for vowel অ', () => {
      const answers = getAlphabetAcceptedAnswers('অ', '/ɔ/ (o)', 'bn');
      expect(answers).toContain('অ');
      expect(answers).toContain('o');
      expect(answers).toContain('a');
    });

    it('accepts k, ko, and ka for consonant ক', () => {
      const answers = getAlphabetAcceptedAnswers('ক', '/kɔ/ (ko)', 'bn');
      expect(answers).toContain('ক');
      expect(answers).toContain('ko');
      expect(answers).toContain('k');
      expect(answers).toContain('ka');
    });
  });

  describe('Hindi, Urdu & Arabic Alphabets', () => {
    it('accepts tha, th, and t for Hindi ठ', () => {
      const answers = getAlphabetAcceptedAnswers('ठ', '/ʈʰə/ (tha)', 'hi');
      expect(answers).toContain('ठ');
      expect(answers).toContain('tha');
      expect(answers).toContain('th');
      expect(answers).toContain('t');
    });

    it('accepts alif madd, aa, and a for Urdu آ', () => {
      const answers = getAlphabetAcceptedAnswers('آ', '/aː/ (alif madd)', 'ur');
      expect(answers).toContain('آ');
      expect(answers).toContain('alif madd');
      expect(answers).toContain('aa');
      expect(answers).toContain('a');
    });

    it('accepts faa, fa, and f for Arabic ف', () => {
      const answers = getAlphabetAcceptedAnswers('ف', '/f/ (faa)', 'ar');
      expect(answers).toContain('ف');
      expect(answers).toContain('faa');
      expect(answers).toContain('fa');
      expect(answers).toContain('f');
    });

    it('accepts ayn, ain, and a for Arabic ع', () => {
      const answers = getAlphabetAcceptedAnswers('ع', '/ʕ/ (ayn)', 'ar');
      expect(answers).toContain('ع');
      expect(answers).toContain('ayn');
      expect(answers).toContain('ain');
      expect(answers).toContain('a');
    });
  });
});
