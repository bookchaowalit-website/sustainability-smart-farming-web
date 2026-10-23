// Fieldbook data and pure helpers shared by the page. Synthetic crop notes, not agronomic advice.

export type Crop = { id: string; name: string; bed: string; window: string; water: string; soil: string; note: string; tasks: string[] };
export const crops: Crop[] = [
  { id: "okra", name: "Okra", bed: "South bed / row 03", window: "May — August", water: "Moderate", soil: "Loose, warm loam", note: "Pick often; the bed rewards a regular pass more than a large harvest day.", tasks: ["Check first true leaves", "Mulch the south edge", "Harvest pods before they harden", "Save two mature pods"] },
  { id: "basil", name: "Thai basil", bed: "Kitchen bed / row 01", window: "All year", water: "Light / frequent", soil: "Drained, composted", note: "Pinch the flower tops before the plant spends its energy on seed.", tasks: ["Pinch flower tips", "Cut above a leaf pair", "Refresh compost ring", "Dry a small seed envelope"] },
  { id: "morning-glory", name: "Morning glory", bed: "Wet edge / row 05", window: "June — October", water: "High", soil: "Moist, rich silt", note: "A fast crop for a wet corner; give the stems a place to climb before they ask.", tasks: ["Set a low trellis", "Keep the wet edge open", "Cut a morning bundle", "Inspect the underside of leaves"] },
];


export const WEEK_STAGES = ["Prepare", "Set out", "Establish", "Train", "Harvest", "Close"] as const;

export function findCrop(id: string): Crop {
  return crops.find((item) => item.id === id) ?? crops[0];
}

// The task for a six-week visit plan. A crop has fewer notes than stages, so a stage without a
// note says so instead of rendering an empty task.
export function taskForWeek(crop: Crop, week: number): string {
  return crop.tasks[week] ?? `No ${WEEK_STAGES[week]?.toLowerCase() ?? "visit"} task in this sample note yet.`;
}

export function nextWeek(week: number): number {
  return Math.min(week + 1, WEEK_STAGES.length - 1);
}
