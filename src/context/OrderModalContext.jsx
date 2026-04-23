import { createContext, useContext, useState } from 'react';

const OrderModalContext = createContext();

export function OrderModalProvider({ children }) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <OrderModalContext.Provider value={{ isModalOpen, openModal, closeModal }}>
            {children}
        </OrderModalContext.Provider>
    );
}

export function useOrderModal() {
    return useContext(OrderModalContext);
}
