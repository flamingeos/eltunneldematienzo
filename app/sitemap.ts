import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://eltunneldematienzo.com";
  return [
    { url: base, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${base}/services`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/memberships`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/promotions`, lastModified: new Date(), changeFrequency: "daily", priority: 0.8 },
    { url: `${base}/gallery`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    { url: `${base}/booking`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
  ];
}
