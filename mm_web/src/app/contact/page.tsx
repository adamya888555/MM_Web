import ContactBento from "@/components/sections/Contactbento";

export const metadata = {
  title: "Contact | Mohali Mart",
  description:
    "Get in touch with Mohali Mart — commission art, book a tattoo, or just say hello.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-black">
      <ContactBento />
    </main>
  );
}