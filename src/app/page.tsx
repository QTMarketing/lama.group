import LaMaLanding from "../components/LaMaLanding";
import HomepageBlog from "../components/HomepageBlog";
import ContactUs from "../components/ContactUs";

export default function Home() {
  return (
    <main className="min-h-screen">
      <LaMaLanding />
      <HomepageBlog />
      <ContactUs />
    </main>
  );
}
