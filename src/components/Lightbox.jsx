import { useEffect, useRef } from "react";

import { ArrowLeftIcon, ArrowRightIcon, CloseIcon } from "./Icons.jsx";
import { assetUrl } from "../utils/assets.js";
import { format } from "../utils/i18n.js";

/**
 * Full-size photo viewer on a native `<dialog>` (focus stays inside, Escape
 * closes it). `items` are `{ id, src, width, height, place, caption }`,
 * `index` is the open photo (or null when closed). Previous / Next wrap around
 * and also answer the ArrowLeft / ArrowRight keys; clicking outside the photo
 * closes the viewer. `labels`: previous, next, close, counter, dialog.
 */
const Lightbox = ({ items, index, onChange, onClose, labels }) => {
  const dialogRef = useRef(null);
  const open = index !== null && index !== undefined;
  const item = open ? items[index] : null;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  // Warm the neighbours so stepping through feels instant.
  useEffect(() => {
    if (!open) return;
    for (const step of [-1, 1]) {
      const next = items[(index + step + items.length) % items.length];
      const preload = new Image();
      preload.src = assetUrl(next.src);
    }
  }, [open, index, items]);

  const step = (delta) => onChange((index + delta + items.length) % items.length);

  const onKeyDown = (event) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      step(-1);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      step(1);
    }
  };

  return (
    <dialog
      ref={dialogRef}
      className="lightbox"
      aria-label={labels.dialog}
      onClose={onClose}
      onKeyDown={onKeyDown}
      onClick={(event) => event.target === event.currentTarget && onClose()}
    >
      {item && (
        <div className="lightbox-frame">
          <figure className="lightbox-figure">
            <img
              key={item.id}
              src={assetUrl(item.src)}
              width={item.width}
              height={item.height}
              alt={item.caption}
              className="lightbox-image"
            />
            <figcaption className="lightbox-caption">
              <span className="flex items-center justify-between gap-3">
                <span className="font-mono text-[11px] tracking-widest text-blue-50 uppercase">{item.place}</span>
                <span className="font-mono text-[11px] text-blue-50" aria-live="polite">
                  {format(labels.counter, { n: index + 1, total: items.length })}
                </span>
              </span>
              <span className="mt-1.5 block text-sm leading-relaxed text-white-50 md:text-base">{item.caption}</span>
            </figcaption>
          </figure>

          <div className="lightbox-controls">
            <button type="button" className="lightbox-btn" onClick={() => step(-1)} aria-label={labels.previous} title={labels.previous}>
              <ArrowLeftIcon className="size-5" />
            </button>
            <button type="button" className="lightbox-btn" onClick={() => step(1)} aria-label={labels.next} title={labels.next}>
              <ArrowRightIcon className="size-5" />
            </button>
            <button type="button" className="lightbox-btn ml-auto" onClick={onClose} aria-label={labels.close} title={labels.close}>
              <CloseIcon className="size-5" />
            </button>
          </div>
        </div>
      )}
    </dialog>
  );
};

export default Lightbox;
