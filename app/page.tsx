import Image from "next/image";
import { NewestProducts } from "./components/NewestProducts";

export default function Home() {
  return (
    <section className="max-w-7xl mx-auto px-4 md:px-8 lg:mt-20 md:mt-14 sm:mt-10 mb-24">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-2xl sm:text-5xl lg:text-6xl font-bold">Empower Your Creativity with Luna Themes</h1>
        <h1 className="text-primary text-1xl sm:text-3xl lg:text-4xl font-semibold mt-5">Discover Premium Themes, Icons, and UI Kits</h1>
        <p className="lg:text-lg text-muted-foreground mx-auto mt-5 w-[90%] font-normal text-base">Luna Themes is your ultimate marketplace for high-quality digital assets. Whether you're a designer looking to sell your creations or a developer seeking the perfect theme, icon, or UI kit, Luna Themes is here to elevate your projects.</p>
      </div>
      <NewestProducts />
    </section>
  );
}
