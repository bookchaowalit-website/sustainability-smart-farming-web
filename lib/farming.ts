// Fieldbook data and pure helpers shared by the pages. Illustrative crop notes, not agronomic advice.

export const WEEK_STAGES = ["Prepare", "Set out", "Establish", "Train", "Harvest", "Close"] as const;
export type Stage = (typeof WEEK_STAGES)[number];

/** One note per stage of the six-week visit plan, so no week is ever empty. */
export type Crop = { id: string; name: string; bed: string; window: string; water: string; soil: string; note: string; tasks: Record<Stage, string> };

export const crops: Crop[] = [
  {
    id: "okra", name: "Okra", bed: "South bed / row 03", window: "May — August", water: "Moderate", soil: "Loose, warm loam",
    note: "Pick often; the bed rewards a regular pass more than a large harvest day.",
    tasks: { Prepare: "Loosen the bed and work in compost", "Set out": "Sow once the soil is warm", Establish: "Check first true leaves", Train: "Mulch the south edge", Harvest: "Harvest pods before they harden", Close: "Save two mature pods" },
  },
  {
    id: "basil", name: "Thai basil", bed: "Kitchen bed / row 01", window: "All year", water: "Light / frequent", soil: "Drained, composted",
    note: "Pinch the flower tops before the plant spends its energy on seed.",
    tasks: { Prepare: "Mix compost into a drained bed", "Set out": "Plant seedlings a hand-span apart", Establish: "Pinch flower tips", Train: "Cut above a leaf pair", Harvest: "Cut in the morning and refresh the compost ring", Close: "Dry a small seed envelope" },
  },
  {
    id: "morning-glory", name: "Morning glory", bed: "Wet edge / row 05", window: "June — October", water: "High", soil: "Moist, rich silt",
    note: "A fast crop for a wet corner; give the stems a place to climb before they ask.",
    tasks: { Prepare: "Set a low trellis", "Set out": "Plant along the wet edge", Establish: "Keep the wet edge open", Train: "Inspect the underside of leaves", Harvest: "Cut a morning bundle", Close: "Clear old stems from the trellis" },
  },
];

export function findCrop(id: string): Crop | undefined {
  return crops.find((item) => item.id === id);
}

/** The task for one week (0-based) of the six-week visit plan. */
export function taskForWeek(crop: Crop, week: number): string {
  const stage = WEEK_STAGES[week];
  return stage ? crop.tasks[stage] : "";
}
