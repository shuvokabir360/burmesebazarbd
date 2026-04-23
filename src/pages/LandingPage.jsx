import HeroSection from '../components/landing/HeroSection';
import TrustBadges from '../components/landing/TrustBadges';
import BenefitsSection from '../components/landing/BenefitsSection';
import ComboSection from '../components/landing/ComboSection';
import PricingBlock from '../components/landing/PricingBlock';
import ReviewsSection from '../components/landing/ReviewsSection';
import FaqSection from '../components/landing/FaqSection';
import Footer from '../components/landing/Footer';
import StickyFooter from '../components/landing/StickyFooter';
import { OrderModalProvider } from '../components/landing/OrderModal';

export default function LandingPage() {
    return (
        <OrderModalProvider>
            {/* 1. Hero — The Hook */}
            <HeroSection />

            {/* 2. Social Proof & Trust Badges */}
            <TrustBadges />

            {/* 3. Urgency & Pricing (FOMO) */}
            <PricingBlock />

            {/* 4. Product Features (Why Us?) */}
            <BenefitsSection />

            {/* 5. The Combo Package (Value Stack) */}
            <ComboSection />

            {/* 6. Customer Testimonials */}
            <ReviewsSection />

            {/* 7. FAQ */}
            <FaqSection />

            {/* 8. Footer & Final CTA */}
            <Footer />

            {/* Mobile Sticky CTA */}
            <StickyFooter />
        </OrderModalProvider>
    );
}
