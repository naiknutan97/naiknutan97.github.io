"use client";

import { useEffect, useRef, useState } from "react";
import { PageTitle } from "@/components/Section";
import type { GalleryAlbum } from "@/data/gallery";
import { localAlbums } from "@/data/gallery";

export default function Gallery() {
  const [albums, setAlbums] = useState<GalleryAlbum[]>(localAlbums);
  const [activeAlbum, setActiveAlbum] = useState(localAlbums[0]?.id ?? "");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const reelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/data/gallery-sync.json")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (data && data.length > 0) {
          const withPhotos = (data as GalleryAlbum[]).filter((a) => a.photos.length > 0);
          setAlbums(withPhotos);
          setActiveAlbum(withPhotos[0]?.id ?? "");
        }
      })
      .catch(() => {})
      .finally(() => setLoaded(true));
  }, []);

  const album = albums.find((a) => a.id === activeAlbum) ?? albums[0];
  const photo = album?.photos[selectedIndex];

  const selectPhoto = (i: number) => {
    setSelectedIndex(i);
    const thumb = reelRef.current?.children[i] as HTMLElement | undefined;
    thumb?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  };

  return (
    <>
      <PageTitle
        path="gallery"
        title="Field Gallery"
        intro="Photographs from doctoral fieldwork: coal-mine hydrogeochemistry in Madhya Pradesh and seasonal water and sediment sampling in the Bhitarkanika mangroves, Odisha."
      />

      <div className="mt-8 flex gap-6 overflow-x-auto border-b border-line">
        {albums.map((a) => (
          <button
            key={a.id}
            onClick={() => {
              setActiveAlbum(a.id);
              setSelectedIndex(0);
            }}
            className={`-mb-px shrink-0 border-b-2 pb-3 text-left text-sm ${
              activeAlbum === a.id
                ? "border-accent font-medium text-ink"
                : "border-transparent text-muted hover:text-ink"
            }`}
          >
            {a.title}
            <span className="block text-xs font-normal text-muted">
              {a.location}, {a.date}
            </span>
          </button>
        ))}
      </div>

      {!loaded && albums.length === 0 ? (
        <p className="mt-10 text-sm text-muted">Loading photos…</p>
      ) : photo ? (
        <div className="mt-6">
          <figure>
            <div className="relative overflow-hidden rounded-md border border-line bg-line/40">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={photo.src} alt={photo.alt} className="mx-auto max-h-[70vh] w-auto object-contain" />
              {selectedIndex > 0 && (
                <button
                  onClick={() => selectPhoto(selectedIndex - 1)}
                  aria-label="Previous photo"
                  className="absolute left-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white hover:bg-black/60"
                >
                  ‹
                </button>
              )}
              {selectedIndex < album.photos.length - 1 && (
                <button
                  onClick={() => selectPhoto(selectedIndex + 1)}
                  aria-label="Next photo"
                  className="absolute right-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white hover:bg-black/60"
                >
                  ›
                </button>
              )}
            </div>
            <figcaption className="mt-3 flex flex-wrap justify-between gap-2 text-sm">
              <span className="text-ink">{photo.alt}</span>
              <span className="text-muted">
                {photo.location}, {photo.date} · {selectedIndex + 1} of {album.photos.length}
              </span>
            </figcaption>
          </figure>

          <div ref={reelRef} className="mt-5 flex gap-2 overflow-x-auto pb-2">
            {album.photos.map((p, i) => (
              <button
                key={p.src}
                onClick={() => selectPhoto(i)}
                aria-label={`Show photo ${i + 1}`}
                className={`h-[68px] w-[90px] shrink-0 overflow-hidden rounded border-2 ${
                  i === selectedIndex ? "border-accent" : "border-transparent opacity-70 hover:opacity-100"
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.src} alt="" loading="lazy" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      ) : (
        <p className="mt-10 text-sm text-muted">No photos to show yet.</p>
      )}
    </>
  );
}
