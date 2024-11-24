import FooterComponent from "@/components/ui/Footer/FooterComponent";
import NavbarComponent from "@/components/ui/Navbar/NavbarComponent";

export default function DefaultLayout({ children }) {
  return (
    <>
      <NavbarComponent />
      <main className="min-h-[40vh]">{children}</main>
      <FooterComponent />
    </>
  );
}
