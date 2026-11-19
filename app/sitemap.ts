import type { MetadataRoute } from "next";
import { crops } from "@/lib/farming";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE_URL, changeFrequency: "monthly", priority: 1 },
    ...crops.map((crop) => ({ url: `${SITE_URL}/crops/${crop.id}`, changeFrequency: "monthly" as const, priority: 0.7 })),
  ];
}
