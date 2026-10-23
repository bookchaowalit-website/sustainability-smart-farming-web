import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";
import Home from "@/app/page";

describe("home page", () => {
  it("renders the crop shelf, the week-three task and the synthetic-data notices", () => {
    const html = renderToString(<Home />);
    expect(html).toContain("the season.");
    for (const name of ["Okra", "Thai basil", "Morning glory"]) expect(html).toContain(name);
    expect(html).toContain("THIS WEEK / <!-- -->ESTABLISH");
    expect(html).toContain("Harvest pods before they harden");
    expect(html).toContain("no sensor connected");
    expect(html).toContain("NOT AGRONOMIC ADVICE");
  });
});
