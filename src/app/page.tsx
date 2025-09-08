import Footer from "@/components/Base/Footer";
import Header from "@/components/Base/Header";
import Toolbar from "@/components/Base/Toolbar/Toolbar";

export default function Home() {
  return (
    <div className="w-full min-h-screen flex flex-col gap-4 px-10 py-5">
      <Header />
      <main className="">
        <Toolbar />
      </main>
      <Footer />
    </div>
  );
}
