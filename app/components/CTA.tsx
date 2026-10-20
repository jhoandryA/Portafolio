"use client";
import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { FiArrowUpRight, FiArrowRight, FiCheck, FiMail } from "react-icons/fi";
import { profile } from "@/app/lib/constants";
import Reveal from "./Reveal";

type FormState = "idle" | "sending" | "success" | "error";
export default function CTA() {
  const formRef = useRef<HTMLFormElement>(null);
  const sending = useRef(false);
  const [state, setState] = useState<FormState>("idle");
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const change = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) =>
    setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (
      sending.current ||
      !formRef.current ||
      !formRef.current.reportValidity()
    )
      return;
    sending.current = true;
    setState("sending");
    try {
      const service = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
      const template = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
      if (!service || !template || !publicKey)
        throw new Error("Contact configuration unavailable");
      await emailjs.sendForm(service, template, formRef.current, { publicKey });
      setState("success");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setState("error");
    } finally {
      sending.current = false;
    }
  };
  return (
    <section
      id="contact"
      className="contact-section content-width"
      aria-labelledby="contact-title"
    >
      <Reveal className="contact-intro">
        <span className="section-index">
          07 / EL SIGUIENTE PROYECTO PUEDE SER EL TUYO
        </span>
        <span className="availability contact-availability">
          <span className="status-dot" /> Disponible para proyectos y
          oportunidades
        </span>
        <h2 id="contact-title">
          HAGAMOS
          <br />
          QUE <span className="gradient-text">SUCEDA.</span>
        </h2>
        <p>
          Una idea, una pregunta o un nuevo reto.
          <br />
          Todo empieza con una conversación.
        </p>
        <a href={`mailto:${profile.email}`} className="contact-email">
          {profile.email} <FiArrowUpRight />
        </a>
        <a
          href={profile.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="text-link whatsapp-link"
        >
          También estoy en WhatsApp <FiArrowUpRight />
        </a>
      </Reveal>
      <Reveal className="contact-form-wrap" delay={0.1}>
        {state === "success" ? (
          <div className="form-success" role="status">
            <span className="success-icon">
              <FiCheck />
            </span>
            <span className="eyebrow">MENSAJE RECIBIDO</span>
            <h3>
              Gracias por
              <br />
              dar el primer paso<span className="accent">.</span>
            </h3>
            <p>Te responderé lo antes posible. Me encantará conocer tu idea.</p>
            <button className="text-link" onClick={() => setState("idle")}>
              Enviar otro mensaje <FiArrowRight />
            </button>
          </div>
        ) : (
          <form
            ref={formRef}
            onSubmit={submit}
            className="contact-form"
            aria-busy={state === "sending"}
          >
            <span className="form-heading">
              <FiMail /> CUÉNTAME EN QUÉ ESTÁS PENSANDO
            </span>
            <div className="form-field">
              <label htmlFor="contact-name">
                <span>01</span> Tu nombre
              </label>
              <input
                id="contact-name"
                name="name"
                placeholder="¿Cómo te llamas?"
                value={form.name}
                onChange={change}
                autoComplete="name"
                required
                maxLength={100}
                disabled={state === "sending"}
              />
            </div>
            <div className="form-field">
              <label htmlFor="contact-email">
                <span>02</span> Tu correo
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                placeholder="hola@tucorreo.com"
                value={form.email}
                onChange={change}
                autoComplete="email"
                required
                maxLength={200}
                disabled={state === "sending"}
              />
            </div>
            <div className="form-field">
              <label htmlFor="contact-message">
                <span>03</span> Tu idea
              </label>
              <textarea
                id="contact-message"
                name="message"
                placeholder="Me gustaría crear..."
                value={form.message}
                onChange={change}
                required
                minLength={10}
                maxLength={5000}
                rows={3}
                disabled={state === "sending"}
              />
            </div>
            <div className="form-submit-row">
              <span>
                Las buenas ideas
                <br />
                merecen una oportunidad.
              </span>
              <button
                className="send-button"
                type="submit"
                disabled={state === "sending"}
              >
                <span>
                  {state === "sending" ? "ENVIANDO" : "ENVIAR MENSAJE"}
                </span>
                <FiArrowUpRight />
              </button>
            </div>
            <p className="form-feedback" role="status" aria-live="polite">
              {state === "error"
                ? "No se pudo enviar el mensaje. Puedes intentarlo otra vez o escribirme directamente por correo o WhatsApp."
                : ""}
            </p>
          </form>
        )}
      </Reveal>
    </section>
  );
}
