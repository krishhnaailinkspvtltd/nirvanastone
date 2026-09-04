import { whatsappLink } from "@/config/site";

export function WhatsAppFloat() {
  return (
    <a
      href={whatsappLink("Namaste! I need help choosing a product.")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="wa-float fixed bottom-[4.5rem] right-4 z-40 flex h-13 w-13 items-center justify-center rounded-full bg-[#25D366] p-3.5 shadow-lg transition-transform hover:scale-105 md:bottom-5 md:right-5"
    >
      <svg width="26" height="26" viewBox="0 0 24 24" fill="#fff" aria-hidden>
        <path d="M12 2a10 10 0 00-8.6 15.1L2 22l5-1.3A10 10 0 1012 2zm0 18.2a8.2 8.2 0 01-4.2-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1112 20.2zm4.6-6.1c-.3-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.6.1a6.7 6.7 0 01-2-1.2 7.4 7.4 0 01-1.4-1.7c-.1-.3 0-.4.1-.5l.4-.5a1.8 1.8 0 00.3-.4.5.5 0 000-.4c0-.1-.6-1.4-.8-1.9s-.4-.4-.6-.4h-.5a1 1 0 00-.7.3 2.9 2.9 0 00-.9 2.1 5 5 0 001.1 2.7 11.4 11.4 0 004.4 3.8 14.5 14.5 0 001.5.6 3.5 3.5 0 001.6.1 2.6 2.6 0 001.7-1.2 2.1 2.1 0 00.2-1.2c-.1-.1-.3-.2-.6-.3z" />
      </svg>
    </a>
  );
}
