import { describe, expect, it } from "vitest";
import { WEEK_STAGES, crops, findCrop, nextWeek, taskForWeek } from "@/lib/farming";

describe("fieldbook data", () => {
  it("has three crops with unique ids", () => {
    expect(crops.map((c) => c.id)).toEqual(["okra", "basil", "morning-glory"]);
  });

  it("findCrop falls back to the first crop for an unknown id", () => {
    expect(findCrop("basil").name).toBe("Thai basil");
    expect(findCrop("nope").id).toBe("okra");
  });
});

describe("taskForWeek", () => {
  it("returns the crop's note for a week that has one", () => {
    expect(taskForWeek(findCrop("okra"), 0)).toBe("Check first true leaves");
    expect(taskForWeek(findCrop("basil"), 3)).toBe("Dry a small seed envelope");
  });

  it("never renders an empty task for the Harvest and Close weeks", () => {
    // Regression: six stages but four notes per crop, so W05 and W06 showed an empty task.
    for (const crop of crops) {
      for (let week = 0; week < WEEK_STAGES.length; week += 1) {
        expect(taskForWeek(crop, week)).toMatch(/\S/);
      }
    }
    expect(taskForWeek(findCrop("okra"), 4)).toBe("No harvest task in this sample note yet.");
  });
});

describe("nextWeek", () => {
  it("advances one stage and stops at the last", () => {
    expect(nextWeek(0)).toBe(1);
    expect(nextWeek(4)).toBe(5);
    expect(nextWeek(5)).toBe(5);
  });
});
