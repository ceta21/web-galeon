import Hero from '@/components/Hero';
import Services from '@/components/Services';
import AutomationDemo from '@/components/AutomationDemo';
import About from '@/components/About';
import Process from '@/components/Process';
import Packages from '@/components/Packages';
import Faq from '@/components/Faq';
import ContactSection from '@/components/ContactSection';

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <AutomationDemo />
      <About />
      <Process />
      <Packages />
      <Faq />
      <ContactSection />
    </>
  );
}
