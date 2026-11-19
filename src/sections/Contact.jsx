import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

import TitleHeader from "../components/TitleHeader.jsx";
import ContactExperience from "../components/Models/ContactExperience.jsx";
import { SendIcon } from "../components/Icons.jsx";
import { emailConfig, isEmailConfigured } from "../constants/index.js";

const EMPTY_FORM = { name: "", email: "", message: "" };

const Contact = () => {
  const formRef = useRef(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: null, message: "" });

  const handleChange = ({ target }) => {
    setForm((current) => ({ ...current, [target.name]: target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!isEmailConfigured) {
      setStatus({
        type: "error",
        message: "The contact form isn't configured yet. Please reach out via GitHub in the meantime.",
      });
      return;
    }

    setLoading(true);
    setStatus({ type: null, message: "" });

    try {
      await emailjs.sendForm(emailConfig.serviceId, emailConfig.templateId, formRef.current, {
        publicKey: emailConfig.publicKey,
      });
      setForm(EMPTY_FORM);
      setStatus({ type: "success", message: "Thanks! Your message is on its way — I'll get back to you soon." });
    } catch (error) {
      console.error("EmailJS error:", error);
      setStatus({ type: "error", message: "Something went wrong while sending. Please try again in a moment." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="section-padding flex-center">
      <div className="h-full w-full max-w-[1600px] md:px-10">
        <TitleHeader title="Get in Touch – Let's Connect" sub="Have a porting or graphics project in mind?" />

        <div className="mt-16 grid grid-cols-1 gap-10 xl:grid-cols-12">
          <div className="xl:col-span-5">
            <div className="card-border rounded-xl p-6 md:p-10">
              <form ref={formRef} onSubmit={handleSubmit} className="contact-form flex w-full flex-col gap-7">
                <div>
                  <label htmlFor="name">Your name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="What's your good name?"
                    autoComplete="name"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email">Your Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="What's your email address?"
                    autoComplete="email"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="message">Your Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell me about your port, engine or graphics project..."
                    rows={5}
                    required
                  />
                </div>

                <button type="submit" disabled={loading} className="w-full disabled:cursor-wait disabled:opacity-70">
                  <div className="cta-button group">
                    <div className="bg-circle" />
                    <p className="cta-text">{loading ? "Sending..." : "Send Message"}</p>
                    <div className="arrow-wrapper">
                      <SendIcon className="size-5" />
                    </div>
                  </div>
                </button>

                {status.type && (
                  <p
                    role="status"
                    className={`rounded-md px-4 py-3 text-sm ${
                      status.type === "success"
                        ? "border border-emerald-400/30 bg-emerald-400/10 text-emerald-300"
                        : "border border-rose-400/30 bg-rose-400/10 text-rose-300"
                    }`}
                  >
                    {status.message}
                  </p>
                )}
              </form>
            </div>
          </div>

          <div className="min-h-96 xl:col-span-7">
            <div className="contact-canvas">
              <ContactExperience />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
