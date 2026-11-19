import type { ReactNode } from "react";
import { ArticleHeader, EntryList, Pager, Prose, Reader, ReaderFoot, ReaderHead, ReaderTop, neighbours, plural } from "@/components/reader-shell";
import { WEEK_STAGES, type Crop } from "@/lib/farming";

const SOURCE = "https://github.com/bookchaowalit-website/sustainability-smart-farming-web";
const NOTE = "Illustrative crop notes for a design demo, not agronomic advice. No sensor or weather feed is connected.";

function Frame({ children }: { children: ReactNode }) {
  return (
    <Reader>
      <ReaderTop name="Field / Book" tagline="Seasonal crop notes" links={[{ href: "/", label: "Crops" }]} />
      <main id="main" className="rs-main">{children}</main>
      <ReaderFoot source={SOURCE} note={NOTE} />
    </Reader>
  );
}

export function HomeView({ crops }: { crops: Crop[] }) {
  return (
    <Frame>
      <ReaderHead
        eyebrow="Smallholder fieldbook"
        title="Work with the season."
        lede="A quiet fieldbook: pick one crop, read its growing window, water and soil, then follow a six-week visit plan one useful step at a time."
      />
      <p className="rs-count" role="status">{plural(crops.length, "crop")}</p>
      <EntryList
        entries={crops.map((crop) => ({
          href: `/crops/${crop.id}`,
          title: crop.name,
          summary: crop.note,
          meta: [crop.window, `Water: ${crop.water.toLowerCase()}`],
          tags: [crop.bed],
        }))}
      />
    </Frame>
  );
}

export function CropView({ crop, crops }: { crop: Crop; crops: Crop[] }) {
  const { previous, next } = neighbours(crops, crops.findIndex((item) => item.id === crop.id));
  return (
    <Frame>
      <article>
        <ArticleHeader
          back={{ href: "/", label: "All crops" }}
          tags={[crop.bed]}
          title={crop.name}
          lede={crop.note}
          meta={[`Window: ${crop.window}`, `Water: ${crop.water}`, `Soil: ${crop.soil}`]}
        />
        <Prose>
          <h2>Six-week visit plan</h2>
          <p>One next action per visit, from preparing the bed to closing it.</p>
          <ol className="fb-plan">
            {WEEK_STAGES.map((stage, index) => (
              <li key={stage}><strong>Week {index + 1} · {stage}</strong> — {crop.tasks[stage]}</li>
            ))}
          </ol>
        </Prose>
        <Pager
          label="More crops"
          previous={previous ? { href: `/crops/${previous.id}`, title: previous.name, label: "Previous crop" } : undefined}
          next={next ? { href: `/crops/${next.id}`, title: next.name, label: "Next crop" } : undefined}
        />
      </article>
    </Frame>
  );
}
