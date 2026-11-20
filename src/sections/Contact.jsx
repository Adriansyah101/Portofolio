import { useEffect, useRef, useState } from "react";

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
 *
 * From 1024px up it is a 50/50 split: `intro`, the card and `children` in a
 * left column that scrolls on its own if it has to, the desk filling the right.
 * Below 1024px the order is intro, card, desk, then `children`.
 */
const Contact = ({ intro = null, children = null }) => {
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
    <section id="contact" className="contact-layout">
      <div className="contact-side scroll-pane">
        {intro}

        <div
          className="mail-card card-border flex flex-col rounded-xl p-6 md:p-10 lg:p-5 xl:p-6"
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

          <h2 className="mt-8 text-2xl font-semibold text-white-50 md:text-3xl lg:mt-3.5 lg:text-xl xl:text-2xl">{text.mail.title}</h2>
          <p className="mt-3 text-blue-50 md:text-lg lg:mt-2 lg:text-[0.9375rem]">{text.mail.body}</p>

          <div className="pt-8 lg:pt-4">
            <a
              href={gmailComposeUrl(text.mail.subject)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={wave}
              aria-label={text.mail.composeLabel}
              className="block h-14 lg:h-12"
            >
              <div className="cta-button group">
                <div className="bg-circle" />
                <p className="cta-text">{text.mail.compose}</p>
                <div className="arrow-wrapper">
                  <SendIcon className="size-5" />
                </div>
              </div>
            </a>

            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:mt-3">
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

        {children && <div className="contact-extra">{children}</div>}
      </div>

      <div className="contact-stage">
        <div className="contact-canvas">
          <ContactExperience theme={theme} waveSignal={waveSignal} />
        </div>
      </div>
    </section>
  );
};

export default Contact;
