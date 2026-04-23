import Navbar from '../components/landing/Navbar';
import HeroSection from '../components/landing/HeroSection';
import ComboSection from '../components/landing/ComboSection';
import PricingBlock from '../components/landing/PricingBlock';
import UspSection from '../components/landing/UspSection';
import ReviewsSection from '../components/landing/ReviewsSection';
import OrderSection from '../components/landing/OrderSection';
import Footer from '../components/landing/Footer';
import FloatingWhatsApp from '../components/ui/FloatingWhatsApp';
import QuickOrderModal from '../components/ui/QuickOrderModal';
import { OrderModalProvider } from '../context/OrderModalContext';
import '../styles/landing.css';

export default function LandingPage() {
    return (
        <OrderModalProvider>
            <Navbar />
            <HeroSection />
            <div>
                <ComboSection />
                <PricingBlock />
            </div>
            <UspSection />
            <ReviewsSection />
            <OrderSection />
            <Footer />
            <FloatingWhatsApp />
            <QuickOrderModal />
        </OrderModalProvider>
    );
}
