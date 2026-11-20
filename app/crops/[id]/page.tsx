import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CropView } from "@/components/fieldbook-views";
import { crops, findCrop } from "@/lib/farming";

type Props = { params: Promise<{ id: string }> };

export const dynamicParams = false;
export function generateStaticParams() {
  return crops.map((crop) => ({ id: crop.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const crop = findCrop((await params).id);
  if (!crop) return {};
  const title = `${crop.name} | Field / Book`;
  const description = `${crop.note} Six-week visit plan, illustrative notes.`;
  const url = `/crops/${crop.id}`;
  // Open Graph is set in full here: a page-level openGraph replaces the layout's, it is not merged.
  return { title, description, alternates: { canonical: url }, openGraph: { type: "article", url, siteName: "Bookchaowalit", title, description } };
}

export default async function CropPage({ params }: Props) {
  const crop = findCrop((await params).id);
  if (!crop) notFound();
  return <CropView crop={crop} crops={crops} />;
}
