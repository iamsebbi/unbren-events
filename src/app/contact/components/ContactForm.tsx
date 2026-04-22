"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { z } from "zod";
import { useForm, FieldErrors } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import Button from "@/components/ui/events/Button";
import TextReveal from "@/components/ui/events/TextRevealLine";
import { cn } from "@/lib/utils";

// ─────────────────────────────────────────────────────────────────────────────
// Schema & Types
// ─────────────────────────────────────────────────────────────────────────────

const contactSchema = z.object({
  name: z
    .string()
    .min(2, "Numele trebuie să aibă minim 2 caractere")
    .transform((v) => v.trim()),
  email: z.string().email("Adresă de email invalidă"),
  message: z
    .string()
    .min(10, "Mesajul trebuie să conțină minim 10 caractere")
    .max(500, "Mesajul depășește limita de 500 caractere"),
  botcheck: z.boolean().optional(),
});

type ContactFormData = z.infer<typeof contactSchema>;

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────

/** Auto-capitalizes the first letter of each word. */
const capitalizeWords = (val: string): string =>
  val.replaceAll(/\b\w/g, (l) => l.toUpperCase());

export interface SelectedOfferContext {
  category: string;
  packageName: string;
  duration: string;
  benefits: string[];
}

// ─────────────────────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────────────────────

const ContactForm = ({
  className,
  selectedOffer,
  variant = "default",
  onSubmitSuccess,
}: {
  className?: string;
  selectedOffer?: SelectedOfferContext | null;
  variant?: "default" | "modal";
  onSubmitSuccess?: () => void;
}) => {
  const selectedBenefits = selectedOffer?.benefits || [];
  const selectedCategory = selectedOffer?.category || "";
  const selectedPackage = selectedOffer?.packageName || "";
  const selectedDuration = selectedOffer?.duration || "";
  const isModal = variant === "modal";

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
      botcheck: false,
    },
  });

  const [focusedField, setFocusedField] = useState<string | null>(null);

  // Watch for UI effects (like character count or label floating)
  const nameValue = watch("name");
  const emailValue = watch("email");
  const messageValue = watch("message");

  // ── Form Submission ──────────────────────────────────────────────────
  const onFormSubmit = async (data: ContactFormData) => {
    // If botcheck is true, we simulate a successful submission but don't actually do anything
    if (data.botcheck) {
      console.warn("Honeypot triggered");
      toast.success("Mesaj trimis cu succes!"); // Mock success for bots
      reset();
      onSubmitSuccess?.();
      return;
    }

    const promise = async () => {
      const WEB3_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;
      if (!WEB3_KEY) {
        throw new Error("NEXT_PUBLIC_WEB3FORMS_KEY is not set");
      }

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: WEB3_KEY,
          ...data,
          selected_category: selectedCategory,
          selected_package: selectedPackage,
          selected_duration: selectedDuration,
          selected_benefits: selectedBenefits.join(" | "),
        }),
      });

      if (!response.ok) throw new Error("Server error");
      return await response.json();
    };

    toast.promise(promise(), {
      loading: "Se trimite mesajul...",
      success: () => {
        reset();
        onSubmitSuccess?.();
        return "Mesaj trimis cu succes!";
      },
      error: (err) => {
        console.log("Form Error:", err);
        return "Trimiterea a eșuat. Încearcă din nou.";
      },
    });
  };

  // Handle Zod errors (show first error as toast)
  const onError = (errors: FieldErrors<ContactFormData>) => {
    const errorValues = Object.values(errors);
    if (errorValues.length > 0) {
      const firstError = errorValues[0];
      if (firstError?.message) {
        toast.error(firstError.message as string);
      }
    }
  };

  // ── Render ───────────────────────────────────────────────────────────
  return (
    <div className={cn("w-full", className)}>
      <div
        className={cn(
          "grid items-start gap-y-4",
          isModal ? "grid-cols-1" : "grid-cols-1 gap-x-24 lg:grid-cols-2",
        )}
      >
        {/* ── Left: Title Area ──────────────────────────────────────── */}
        {!isModal && (
          <div className="order-1 flex flex-col gap-2">
            <div>
              <span className="mb-4 block text-xs tracking-widest text-(--color-events-muted) uppercase md:mb-6">
                (CONTACT)
              </span>
              <TextReveal
                text="SCRIE-NE ȘI NOI REVENIM RAPID."
                className="mb-8 text-[8vw] leading-[0.85] text-(--color-events-text) sm:text-[8vw] md:text-7xl lg:text-7xl xl:text-8xl"
                delay={0.1}
              />
            </div>
          </div>
        )}

        {/* ── Right: Form Area ──────────────────────────────────────── */}
        <div
          className={cn(
            "order-2 flex",
            isModal
              ? "justify-start"
              : "justify-center lg:row-span-2 lg:justify-end",
          )}
        >
          <div
            className={cn(
              "w-full border border-(--color-events-border) bg-(--color-events-bg)",
              isModal ? "p-4 md:p-6" : "p-5 md:max-w-xl md:p-9",
            )}
          >
            {/* Form Header */}
            <div className="mb-8">
              <Image
                src="/unbrenlogo.svg"
                alt="UNBREN. Logo"
                width={120}
                height={40}
                className="logo-theme mb-5 h-9 w-auto"
              />
              <h3 className="text-2xl leading-tight font-medium tracking-tight text-(--color-events-text) md:text-4xl">
                Gata să începem povestea?
              </h3>
            </div>

            {/* Form Fields */}
            <form
              onSubmit={handleSubmit(onFormSubmit, onError)}
              className="space-y-5 font-sans"
            >
              <div className="grid grid-cols-1 gap-5">
                <div className="flex flex-col">
                  {/* Honeypot field for anti-spam */}
                  <input
                    type="checkbox"
                    id="botcheck"
                    className="hidden"
                    style={{ display: "none" }}
                    {...register("botcheck")}
                    aria-hidden="true"
                    tabIndex={-1}
                  />

                  <label
                    htmlFor="contact-name"
                    className={`mb-2 block text-[10px] tracking-widest uppercase transition-colors duration-300 ${
                      focusedField === "name" || nameValue
                        ? "text-(--color-events-text)"
                        : "text-(--color-events-muted)"
                    }`}
                  >
                    (Nume si Prenume)*
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    placeholder="Popescu Ion"
                    autoComplete="name"
                    {...register("name")}
                    onFocus={() => setFocusedField("name")}
                    onBlur={(e) => {
                      setFocusedField(null);
                      // Auto-capitalize on blur
                      setValue("name", capitalizeWords(e.target.value));
                    }}
                    className="h-14 border-b border-(--color-events-border) bg-(--color-events-text)/5 px-4 py-4 text-base text-(--color-events-text) transition-all outline-none placeholder:text-(--color-events-muted)/50 focus:border-(--color-events-accent)"
                  />
                </div>
                <div className="flex flex-col">
                  <label
                    htmlFor="contact-email"
                    className={`mb-2 block text-[10px] tracking-widest uppercase transition-colors duration-300 ${
                      focusedField === "email" || emailValue
                        ? "text-(--color-events-text)"
                        : "text-(--color-events-muted)"
                    }`}
                  >
                    (Adresă e-mail)*
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    placeholder="name@example.com"
                    autoComplete="email"
                    {...register("email")}
                    onFocus={() => setFocusedField("email")}
                    onBlur={() => setFocusedField(null)}
                    className="h-14 border-b border-(--color-events-border) bg-(--color-events-text)/5 px-4 py-4 text-base text-(--color-events-text) transition-all outline-none placeholder:text-(--color-events-muted)/50 focus:border-(--color-events-accent)"
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="contact-message"
                  className={`mb-2 block text-[10px] tracking-widest uppercase transition-colors duration-300 ${
                    focusedField === "message" || messageValue
                      ? "text-(--color-events-text)"
                      : "text-(--color-events-muted)"
                  }`}
                >
                  (Mesaj Detalii)*
                </label>
                <textarea
                  id="contact-message"
                  placeholder="Mesajul tău..."
                  autoComplete="off"
                  {...register("message")}
                  onFocus={() => setFocusedField("message")}
                  onBlur={() => setFocusedField(null)}
                  onChange={(e) => {
                    const target = e.target as HTMLTextAreaElement;
                    target.style.height = "auto";
                    target.style.height = `${target.scrollHeight}px`;
                    setValue("message", e.target.value);
                  }}
                  rows={1}
                  className="min-h-14 w-full resize-none overflow-hidden border-b border-(--color-events-border) bg-(--color-events-text)/5 px-4 py-4 text-base text-(--color-events-text) transition-all outline-none placeholder:text-(--color-events-muted)/50 focus:border-(--color-events-accent)"
                />
                <div className="mt-2 flex justify-end">
                  <span
                    className={`text-[10px] transition-colors duration-300 ${
                      messageValue.length < 10 && messageValue.length > 0
                        ? "text-red-500"
                        : "text-(--color-events-muted)"
                    }`}
                  >
                    {messageValue.length < 10
                      ? `Minim 10 caractere (${messageValue.length})`
                      : `${messageValue.length}/500`}
                  </span>
                </div>
              </div>

              {/* Submit & Legal */}
              <div className="space-y-6">
                <div className="flex justify-end">
                  <Button
                    type="submit"
                    text={isSubmitting ? "Se trimite..." : "Trimite"}
                    disabled={isSubmitting}
                    className="border-(--color-events-border)"
                    dotClassName="bg-(--color-events-text)"
                    hoverTextClassName="group-hover:!text-(--color-events-bg)"
                  />
                </div>
                <p className="text-right text-[10px] opacity-60 leading-relaxed text-(--color-events-muted)">
                  Prin trimiterea acestui formular, ești de acord cu{" "}
                  <Link href="/termeni-si-conditii" className="underline">
                    {" "}
                    Termenii și Condițiile{" "}
                  </Link>
                  noastre și{" "}
                  <Link
                    href="/politica-de-confidentialitate"
                    className="underline"
                  >
                    {" "}
                    Politica de Confidențialitate{" "}
                  </Link>
                  .
                </p>
              </div>
            </form>
          </div>
        </div>

        {/* Description & Profile - Shows after form on mobile, below title on desktop */}
        {/* <div className="flex flex-col gap-2 order-3 lg:order-2 max-w-md">
          <p className="text-sm md:text-base text-[var(--color-events-muted)] leading-snug">
            Fie că ai o viziune clară sau cauți inspirație, suntem aici să
            transformăm momentele tale în amintiri vizuale de neuitat.
          </p>

          <div className="flex items-center gap-4">
            <div className="relative w-10 h-10 overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&h=200&auto=format&fit=crop"
                alt="Founder Profile"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h4 className="text-sm font-regular tracking-widest text-[var(--color-events-text)] mb-1">
                Alexandru Chioroste
              </h4>
              <p className="text-xs tracking-widest text-[var(--color-events-muted)]">
                Founder
              </p>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default ContactForm;
