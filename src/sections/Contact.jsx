import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

import TitleHeader from "../components/TitleHeader.jsx";
import ContactExperience from "../components/Models/ContactExperience.jsx";
import { SendIcon } from "../components/Icons.jsx";
import { useLocalized } from "../context/LanguageContext.jsx";
import { useTheme } from "../context/ThemeContext.jsx";
import { emailConfig, isEmailConfigured, ui } from "../constants/index.js";

const EMPTY_FORM = { name: "", email: "", message: "" };
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** First invalid field and the key of its message in `ui.contact.status`, or null. */
const validate = (form) => {
  if (!form.name.trim()) return { field: "name", key: "missingName" };
  if (!EMAIL_PATTERN.test(form.email.trim())) return { field: "email", key: "invalidEmail" };
  if (!form.message.trim()) return { field: "message", key: "missingMessage" };
  return null;
};

/**
 * EmailJS form beside the warm 3D desk. Validation is done in code (not by
 * the browser) so its messages follow the site language. Status messages are
 * stored as keys and translated on render, so switching language also
 * translates a message that is already on screen. `compact` drops the section
 * title and the large top margin for use under a page header.
 */
const Contact = ({ compact = false }) => {
  const formRef = useRef(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: null, key: null, field: null });
  const { contact: text } = useLocalized(ui);
  const { theme } = useTheme();

  const handleChange = ({ target }) => {
    setForm((current) => ({ ...current, [target.name]: target.value }));
    if (status.field === target.name) setStatus({ type: null, key: null, field: null });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const invalid = validate(form);
    if (invalid) {
      setStatus({ type: "error", key: invalid.key, field: invalid.field });
      formRef.current?.elements[invalid.field]?.focus();
      return;
    }

    if (!isEmailConfigured) {
      setStatus({ type: "error", key: "notConfigured", field: null });
      return;
    }

    setLoading(true);
    setStatus({ type: null, key: null, field: null });

    try {
      await emailjs.sendForm(emailConfig.serviceId, emailConfig.templateId, formRef.current, {
        publicKey: emailConfig.publicKey,
      });
      setForm(EMPTY_FORM);
      setStatus({ type: "success", key: "success", field: null });
    } catch (error) {
      console.error("EmailJS error:", error);
      setStatus({ type: "error", key: "error", field: null });
    } finally {
      setLoading(false);
    }
  };

  const fieldProps = (name) => ({
    id: name,
    name,
    value: form[name],
    onChange: handleChange,
    required: true,
    "aria-invalid": status.field === name || undefined,
    "aria-describedby": status.field === name ? "contact-status" : undefined,
  });

  return (
    <section id="contact" className={`flex-center ${compact ? "padding-x-lg mt-12" : "section-padding"}`}>
      <div className={`h-full w-full max-w-[1600px] ${compact ? "" : "md:px-10"}`}>
        {!compact && <TitleHeader title={text.sectionTitle} sub={text.sectionSub} />}

        <div className={`${compact ? "" : "mt-16"} grid grid-cols-1 gap-10 xl:grid-cols-12`}>
          <div className="xl:col-span-5">
            <div className="card-border rounded-xl p-6 md:p-10">
              <form ref={formRef} onSubmit={handleSubmit} noValidate className="contact-form flex w-full flex-col gap-7">
                <div>
                  <label htmlFor="name">{text.form.nameLabel}</label>
                  <input type="text" placeholder={text.form.namePlaceholder} autoComplete="name" {...fieldProps("name")} />
                </div>

                <div>
                  <label htmlFor="email">{text.form.emailLabel}</label>
                  <input
                    type="email"
                    inputMode="email"
                    placeholder={text.form.emailPlaceholder}
                    autoComplete="email"
                    {...fieldProps("email")}
                  />
                </div>

                <div>
                  <label htmlFor="message">{text.form.messageLabel}</label>
                  <textarea placeholder={text.form.messagePlaceholder} rows={5} {...fieldProps("message")} />
                </div>

                <div>
                  <button type="submit" disabled={loading} className="w-full disabled:cursor-wait disabled:opacity-70">
                    <div className="cta-button group">
                      <div className="bg-circle" />
                      <p className="cta-text">{loading ? text.form.sending : text.form.send}</p>
                      <div className="arrow-wrapper">
                        <SendIcon className="size-5" />
                      </div>
                    </div>
                  </button>

                  {/* Always mounted so screen readers announce new messages. */}
                  <div id="contact-status" role="status" aria-live="polite">
                    {status.type && (
                      <p className={`form-status mt-5 ${status.type === "success" ? "is-success" : "is-error"}`}>
                        {text.status[status.key]}
                      </p>
                    )}
                  </div>
                </div>
              </form>
            </div>
          </div>

          <div className="min-h-96 xl:col-span-7">
            <div className="contact-canvas">
              <ContactExperience theme={theme} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
