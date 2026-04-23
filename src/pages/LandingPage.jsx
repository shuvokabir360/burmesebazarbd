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
import { LandingContentProvider } from '../context/LandingContentContext';

export default function LandingPage() {
    return (
        <LandingContentProvider>
            <OrderModalProvider>
                <HeroSection />
                <TrustBadges />
                <PricingBlock />
                <BenefitsSection />
                <ComboSection />
                <ReviewsSection />
                <FaqSection />
                <Footer />
                <StickyFooter />
            </OrderModalProvider>
        </LandingContentProvider>
    );
}
