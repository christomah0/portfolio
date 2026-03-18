import Footer from "@/components/footer";
import Header from "@/components/header";
import Main from "@/components/main";
import { PageViewTracker } from "@/components/page-view-tracker";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50">
      <PageViewTracker />
      <Header />
      <Main />
      <Footer />
    </div>
  )
}
