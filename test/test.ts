import * as path from "path";
import * as fs from "fs";
import { parseCurrentTimetable, parseMainDbi, parseSubstitutions } from "../src/index";
import { describe, test } from "mocha";
import { expect } from 'chai';

describe('Substitutions', () => {
    ['class-substitutions-0', 'class-substitutions-1', 'teacher-substitutions-0'].forEach((key) => {
        test(`Parse substitutions ${key}`, () => {
            const inputJson = fs.readFileSync(path.join(__dirname, 'fixtures', `${key}.json`), {
                encoding: 'utf8',
            });
            const expectedResultJson = fs.readFileSync(path.join(__dirname, 'expected', `${key}.json`), {
                encoding: 'utf8',
            });

            const substitutions = parseSubstitutions(inputJson);
            expect(substitutions).to.deep.equal(JSON.parse(expectedResultJson));
        });
    });
});

describe('maindbi', () => {
  ['maindbi-0'].forEach((key) => {
    test(`Parse maindbi ${key}`, () => {
      const inputJson = fs.readFileSync(path.join(__dirname, 'fixtures', `${key}.json`), {
        encoding: 'utf8',
      });
      const expectedResultJson = fs.readFileSync(path.join(__dirname, 'expected', `${key}.json`), {
        encoding: 'utf8',
      });

      const maindbi = parseMainDbi(inputJson);
      expect(maindbi).to.deep.equal(JSON.parse(expectedResultJson));
    });
  });
});

describe('Current timetable', () => {
  ['class-current-timetable-0', 'class-current-timetable-event'].forEach((key) => {
    test(`Parse maindbi ${key}`, () => {
      const inputJson = fs.readFileSync(path.join(__dirname, 'fixtures', `${key}.json`), {
        encoding: 'utf8',
      });
      const expectedResultJson = fs.readFileSync(path.join(__dirname, 'expected', `${key}.json`), {
        encoding: 'utf8',
      });

      const result = parseCurrentTimetable(inputJson);
      expect(result).to.deep.equal(JSON.parse(expectedResultJson));
    });
  });
});
