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
  return crop ? { title: `${crop.name} | Field / Book`, description: `${crop.note} Six-week visit plan, illustrative notes.`, alternates: { canonical: `/crops/${crop.id}` } } : {};
}

export default async function CropPage({ params }: Props) {
  const crop = findCrop((await params).id);
  if (!crop) notFound();
  return <CropView crop={crop} crops={crops} />;
}
