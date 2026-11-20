jest.mock("jquery", () => jest.fn());
jest.mock("/src/translator/translateCaller.js", () => ({
  translate: jest.fn(),
}));

import DOMSubtitleVideo from "../src/subtitle/domSubtitleVideo";
import DR from "../src/subtitle/dr";
import SVT from "../src/subtitle/svt";
import TV4Play from "../src/subtitle/tv4play";

describe("DOM subtitle adapters", () => {
  test.each([
    ["DR", DR, /^https:\/\/(?:www\.)?dr\.dk(?:\/|$)/i, "da"],
    ["SVT Play", SVT, /^(https:\/\/)(www\.svtplay\.se)/, "sv"],
    ["TV4 Play", TV4Play, /^https:\/\/(?:www\.)?tv4play\.se(?:\/|$)/, "sv"],
  ])(
    "%s is an independent DOM subtitle adapter",
    (_name, adapter, sitePattern, language) => {
      expect(Object.getPrototypeOf(adapter)).toBe(DOMSubtitleVideo);
      expect(adapter.sitePattern).toEqual(sitePattern);
      expect(adapter.guessSubtitleLang()).toBe(language);
    }
  );
});
