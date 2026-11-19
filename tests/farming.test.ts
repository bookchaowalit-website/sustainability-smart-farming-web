import { describe, expect, it } from "vitest";
import { WEEK_STAGES, crops, findCrop, taskForWeek } from "@/lib/farming";

describe("fieldbook data", () => {
  it("has three crops with unique ids", () => {
    expect(crops.map((c) => c.id)).toEqual(["okra", "basil", "morning-glory"]);
  });

  it("findCrop returns the crop, or undefined for an unknown id", () => {
    expect(findCrop("basil")?.name).toBe("Thai basil");
    expect(findCrop("nope")).toBeUndefined();
  });
});

describe("taskForWeek", () => {
  it("has a real note for every one of the six stages of every crop", () => {
    // Regression: six stages but four notes per crop, so W05 Harvest and W06 Close were always empty.
    for (const crop of crops) for (let week = 0; week < WEEK_STAGES.length; week += 1) expect(taskForWeek(crop, week)).toMatch(/\S/);
    expect(taskForWeek(findCrop("okra")!, 4)).toBe("Harvest pods before they harden");
    expect(taskForWeek(findCrop("basil")!, 5)).toBe("Dry a small seed envelope");
  });

  it("returns an empty string outside the plan", () => {
    expect(taskForWeek(crops[0], 9)).toBe("");
  });
});
