import { LoadingScreen } from '@/components/layout/LoadingScreen';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { MobileMenu } from '@/components/layout/MobileMenu';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { Hero } from '@/components/home/Hero';
import { CakesShowcase } from '@/components/home/CakesShowcase';
import { Collections } from '@/components/home/Collections';
import { CustomCakeSection } from '@/components/home/CustomCakeSection';
import { Testimonials } from '@/components/home/Testimonials';
import { InstagramGallery } from '@/components/home/InstagramGallery';
import { AboutSection } from '@/components/home/AboutSection';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { FlyToCart } from '@/components/cart/FlyToCart';
import { AddedToast } from '@/components/cart/AddedToast';

export default function HomePage() {
  return (
    <>
      <LoadingScreen />
      <SiteHeader />
      <MobileMenu />

      <main>
        <Hero />
        <CakesShowcase />
        <Collections />
        <CustomCakeSection />
        <AboutSection />
        <Testimonials />
        <InstagramGallery />
      </main>

      <SiteFooter />

      <CartDrawer />
      <FlyToCart />
      <AddedToast />
    </>
  );
}
