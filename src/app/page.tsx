import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import Projects from '@/components/sections/Projects';
import Services from '@/components/sections/Services';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      
      <main>
        <div className="hero-section">
          <Hero />
        </div>
        <Projects />
        <Services />
      </main>
      
      <Footer />
    </div>
  );
}
