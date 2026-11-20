import { useEffect, useRef, useState } from "react";

import TitleHeader from "../components/TitleHeader.jsx";
import ContactExperience from "../components/Models/ContactExperience.jsx";
import { CheckIcon, CopyIcon, MailIcon, SendIcon } from "../components/Icons.jsx";
import { useLocalized } from "../context/LanguageContext.jsx";
import { useTheme } from "../context/ThemeContext.jsx";
import { contactEmail, gmailComposeUrl, ui } from "../constants/index.js";

const COPIED_MS = 2200;
const [EMAIL_USER, EMAIL_DOMAIN] = contactEmail.split("@");

/**
 * Gmail contact card beside the warm 3D desk. "Write in Gmail" opens Gmail's
 * compose window addressed to `contactEmail` with a localized subject; the
 * other buttons copy the address or hand it to the visitor's own mail app.
 * The 3D developer waves when focus enters the card and on every action.
 * `compact` drops the section title and the large top margin for use under a
 * page header.
 */
const Contact = ({ compact = false }) => {
  const [copied, setCopied] = useState(false);
  const copyTimer = useRef(null);
  // Bumped whenever the visitor reaches for one of the email options: the 3D developer waves.
  const [waveSignal, setWaveSignal] = useState(0);
  const wave = () => setWaveSignal((value) => value + 1);
  const { contact: text } = useLocalized(ui);
  const { theme } = useTheme();

  useEffect(() => () => clearTimeout(copyTimer.current), []);

  const copyEmail = async () => {
    wave();
    try {
      await navigator.clipboard.writeText(contactEmail);
      setCopied(true);
      clearTimeout(copyTimer.current);
      copyTimer.current = setTimeout(() => setCopied(false), COPIED_MS);
    } catch {
      // Clipboard blocked: the address stays on screen to select by hand.
      setCopied(false);
    }
  };

  return (
    <section id="contact" className={`flex-center ${compact ? "padding-x-lg mt-12" : "section-padding"}`}>
      <div className={`h-full w-full max-w-[1600px] ${compact ? "" : "md:px-10"}`}>
        {!compact && <TitleHeader title={text.sectionTitle} sub={text.sectionSub} />}

        <div className={`${compact ? "" : "mt-16"} grid grid-cols-1 gap-10 xl:grid-cols-12`}>
          <div className="xl:col-span-5">
            <div
              className="mail-card card-border flex h-full flex-col rounded-xl p-6 md:p-10"
              // Wave once when focus enters the card, not on every button.
              onFocus={(event) => !event.currentTarget.contains(event.relatedTarget) && wave()}
            >
              <div className="flex items-center gap-4">
                <span className="mail-badge" aria-hidden="true">
                  <MailIcon className="size-6" />
                </span>
                <div className="min-w-0">
                  <p className="font-mono text-xs tracking-widest text-blue-50 uppercase">{text.mail.label}</p>
                  <a href={`mailto:${contactEmail}`} onClick={wave} className="mail-address">
                    {EMAIL_USER}
                    <wbr />@{EMAIL_DOMAIN}
                  </a>
                </div>
              </div>

              <h3 className="mt-8 text-2xl font-semibold text-white-50 md:text-3xl">{text.mail.title}</h3>
              <p className="mt-3 text-blue-50 md:text-lg">{text.mail.body}</p>

              {/* Pinned to the bottom of the card so it lines up with the canvas edge on wide screens. */}
              <div className="mt-auto pt-8">
                <a
                  href={gmailComposeUrl(text.mail.subject)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={wave}
                  aria-label={text.mail.composeLabel}
                  className="block"
                >
                  <div className="cta-button group">
                    <div className="bg-circle" />
                    <p className="cta-text">{text.mail.compose}</p>
                    <div className="arrow-wrapper">
                      <SendIcon className="size-5" />
                    </div>
                  </div>
                </a>

                <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <button type="button" onClick={copyEmail} className={`mail-option ${copied ? "is-done" : ""}`}>
                    {copied ? <CheckIcon className="size-4" /> : <CopyIcon className="size-4" />}
                    <span aria-live="polite">{copied ? text.mail.copied : text.mail.copy}</span>
                  </button>
                  <a href={`mailto:${contactEmail}`} onClick={wave} className="mail-option">
                    <MailIcon className="size-4" />
                    <span>{text.mail.otherApp}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="min-h-96 xl:col-span-7 xl:min-h-[36rem]">
            <div className="contact-canvas">
              <ContactExperience theme={theme} waveSignal={waveSignal} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
