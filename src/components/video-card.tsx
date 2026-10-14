"use client";

import Image from "next/image";
import { ArrowUpRight, Film, Play } from "lucide-react";
import type { VideoItem } from "@/data/content";
import { InlineVideo } from "./video-player";
import { useCopy } from "./language-provider";

export function MediaPlaceholder({ item, index = 0, hero = false }: { item: VideoItem; index?: number; hero?: boolean }) {
  const { ui } = useCopy();
  return <div className={`media-placeholder ${item.poster ? "has-poster" : ""} ${hero ? "showreel-media" : ""} ${item.orientation === "portrait" ? "portrait-media" : "landscape-media"}`}>
    {item.poster && <Image className="video-poster" src={item.poster} alt="" fill sizes={hero ? "(max-width: 900px) 90vw, 816px" : "(max-width: 640px) 90vw, 410px"} preload={hero} />}
    <div className="media-top"><span>{hero ? ui.showreel : String(index + 1).padStart(2, "0")}</span><span>{hero ? "16:9" : <Film size={17} strokeWidth={1.4} aria-hidden="true" />}</span></div>
    <div className="media-center">{hero ? <span className="button button-primary">{ui.watchShowreel}<Play size={16} fill="currentColor" aria-hidden="true" /></span> : item.source ? <span className="play-circle"><Play size={17} fill="currentColor" aria-hidden="true" /></span> : <span className="upcoming-video"><Film size={24} strokeWidth={1} aria-hidden="true" /><span>{ui.upcoming}</span></span>}</div>
    <div className="media-bottom"><span>{hero ? "SHOWREEL" : null}</span>{item.duration && <span>{item.duration}</span>}</div>
  </div>;
}
export function VideoCard({ item, index }: { item: VideoItem; index: number }) {
  const { categories } = useCopy();
  const titleParts = item.title.match(/^(.+?)\s+[—–]\s+(.+)$/);
  const title = titleParts?.[1] ?? item.title;
  const author = titleParts?.[2];
  let description = item.description;
  if (author) {
    const prefixes = [`Ролик для ${author}.`, `Ролик для ${author}:`, `Видео для ${author}.`, `A short for ${author}.`, `A video for ${author}.`, `A video for ${author}:`];
    const prefix = prefixes.find(value => description.startsWith(value));
    if (prefix) description = description.slice(prefix.length).trim();
  }
  return <article className="video-card"><InlineVideo item={item}><MediaPlaceholder item={item} index={index} /></InlineVideo>
    <div className="video-info"><div><h3>{title}</h3>{author && <p className="video-author">{author}</p>}<p>{categories[item.category]}{description && <> <span aria-hidden="true">/</span> {description}</>}</p></div><ArrowUpRight size={20} aria-hidden="true" /></div>
  </article>;
}

export function Showreel({ item }: { item: VideoItem }) {
  return <InlineVideo item={item} hero><MediaPlaceholder item={item} hero /></InlineVideo>;
}
