import Footer from "@/components/Base/Footer";
import Header from "@/components/Base/Header";
import TiptapEditor from "@/components/Document/TiptapEditor";

export default function Home() {
  return (
    <div className="flex min-h-screen w-full flex-col gap-4 px-10 py-5">
      <Header />
      <main className="">
        <TiptapEditor />
      </main>
      <Footer />
    </div>
  );
}
