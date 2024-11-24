import Navlinks from "./Navlinks";

export default function NavbarComponent() {
  return (
    <div>
      <header className="flex flex-row justify-between fixed bg-[#3F414C] items-center p-4 top-0 left-0 right-0 z-10">
        <h1 className="text-3xl italic font-[600] text-white">MeoShop</h1>
        <Navlinks />
      </header>
    </div>
  );
}
