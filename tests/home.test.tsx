import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";

vi.mock("next/font/google", () => ({ Geist: () => ({ variable: "geist" }) }));
vi.mock("next/navigation", () => ({ notFound: () => { throw new Error("NOT_FOUND"); } }));

import Home from "@/app/page";
import CropPage, { generateMetadata, generateStaticParams } from "@/app/crops/[id]/page";
import RootLayout, { metadata } from "@/app/layout";
import sitemap from "@/app/sitemap";
import robots from "@/app/robots";

const crop = (id: string) => ({ params: Promise.resolve({ id }) });

describe("home", () => {
  it("lists the three crops with their windows, the honest note and the hub links", () => {
    const html = renderToStaticMarkup(<Home />);
    expect(html).toContain("<h1>Work with the season.</h1>");
    for (const name of ["Okra", "Thai basil", "Morning glory"]) expect(html).toContain(name);
    expect(html).toContain('href="/crops/okra"');
    expect(html).toContain("3 crops");
    expect(html).toContain("not agronomic advice");
    expect(html).toContain('href="https://bookchaowalit.com/"');
    expect(html).not.toMatch(/08\.25|Tap the row/);
  });
});

describe("crop page", () => {
  it("shows facts and all six stages with a task each, plus previous/next", async () => {
    const html = renderToStaticMarkup(await CropPage(crop("basil")));
    expect(html).toContain("<h1>Thai basil</h1>");
    expect(html).toContain("Soil: Drained, composted");
    expect(html).toContain("Week 5 · Harvest");
    expect(html).toContain("Dry a small seed envelope");
    expect(html).not.toContain("No harvest task");
    expect(html).toContain('rel="prev"');
    expect(html).toContain('rel="next"');
  });

  it("404s an unknown crop and builds every crop page", async () => {
    await expect(CropPage(crop("nope"))).rejects.toThrow("NOT_FOUND");
    expect(generateStaticParams()).toEqual([{ id: "okra" }, { id: "basil" }, { id: "morning-glory" }]);
    expect((await generateMetadata(crop("okra"))).title).toBe("Okra | Field / Book");
    const og = (await generateMetadata(crop("okra"))).openGraph as { url?: string; title?: string; description?: string };
    expect(og.url).toBe("/crops/okra");
    expect(og.title).toBe("Okra | Field / Book");
    expect(og.description).toContain("Six-week visit plan");
    expect(await generateMetadata(crop("nope"))).toEqual({});
  });
});

describe("site", () => {
  it("layout, sitemap and robots use farming.bookchaowalit.com", () => {
    expect(renderToStaticMarkup(RootLayout({ children: <p>x</p> }))).toContain('class="geist"');
    expect(String(metadata.metadataBase)).toBe("https://farming.bookchaowalit.com/");
    expect(sitemap().map((entry) => entry.url)).toContain("https://farming.bookchaowalit.com/crops/okra");
    expect(robots().sitemap).toBe("https://farming.bookchaowalit.com/sitemap.xml");
  });
});
