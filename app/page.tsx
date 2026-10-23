"use client";

import { useState } from "react";
import { WEEK_STAGES, crops, findCrop, nextWeek, taskForWeek } from "@/lib/farming";

export default function Home() {
  const [cropId, setCropId] = useState("okra");
  const [week, setWeek] = useState(2);
  const crop = findCrop(cropId);

  return (
    <main className="fieldbook-page">
      <div className="fieldbook-shell">
        <header className="fieldbook-header"><div className="fieldbook-brand"><span className="seed-mark">✳</span><span>FIELD / BOOK</span></div><span>BED 03 · SMALLHOLDER EDITION</span><span className="fieldbook-date">08.25 / 2026</span></header>
        <section className="fieldbook-hero"><div><p className="fieldbook-kicker">read the field before the calendar</p><h1>Work with<br /><em>the season.</em></h1><p className="fieldbook-deck">A quiet fieldbook for choosing one crop, locating its window, and turning a broad growing season into the next useful visit.</p></div><div className="weather-slip"><span>FIELD CONDITIONS</span><strong>Warm / after rain</strong><small>synthetic observation<br />no sensor connected</small></div></section>

        <section className="crop-shelf" aria-label="Crop index"><div className="shelf-heading"><span>THE CROP SHELF</span><span>Choose one bed to read</span></div><div className="crop-tabs">{crops.map((item, index) => <button key={item.id} type="button" className={item.id === crop.id ? "is-active" : ""} onClick={() => { setCropId(item.id); setWeek(0); }}><span>0{index + 1}</span><strong>{item.name}</strong><small>{item.bed}</small></button>)}</div></section>

        <section className="field-reading" aria-labelledby="field-title"><div className="reading-copy"><p className="fieldbook-kicker">CURRENT READING / {crop.bed}</p><h2 id="field-title">{crop.name}<br /><em>needs a rhythm.</em></h2><p>{crop.note}</p><div className="field-facts"><div><span>GROWING WINDOW</span><strong>{crop.window}</strong></div><div><span>WATER NOTE</span><strong>{crop.water}</strong></div><div><span>SOIL</span><strong>{crop.soil}</strong></div></div></div><div className="field-diagram" aria-label={`${crop.name} bed diagram`}><div className="sun-disc" /><div className="bed-line line-one" /><div className="bed-line line-two" /><div className="plant plant-one"><i /><i /><i /></div><div className="plant plant-two"><i /><i /></div><span className="diagram-label label-top">MORNING SIDE</span><span className="diagram-label label-bottom">WET EDGE / KEEP OPEN</span></div></section>

        <section className="week-plan" aria-labelledby="week-title"><div className="plan-heading"><div><p className="fieldbook-kicker">VISIT PLAN / SIX WEEKS</p><h2 id="week-title">One next action.</h2></div><p>Tap the row to see what this stage asks of the grower.</p></div><div className="week-rail">{WEEK_STAGES.map((label, index) => <button key={label} type="button" className={week === index ? "is-active" : ""} onClick={() => setWeek(index)}><span>W{String(index + 1).padStart(2, "0")}</span><strong>{label}</strong></button>)}</div><div className="task-note"><span>THIS WEEK / {WEEK_STAGES[week].toUpperCase()}</span><p>{taskForWeek(crop, week)}</p><button type="button" onClick={() => setWeek(nextWeek)} disabled={week === WEEK_STAGES.length - 1}>Mark the next visit →</button></div></section>
        <footer className="fieldbook-footer"><span>BOOKCHAOWALIT / SMART FARMING FIELDBOOK</span><span>ILLUSTRATIVE CROP NOTES · NOT AGRONOMIC ADVICE</span></footer>
      </div>
    </main>
  );
}
