import { IconSearch } from "@tabler/icons-react";
import logo from "../../../../img/tucaShopLogo.png";

interface NavBarSellerProps {
    setView: (view: 'home' | 'offers' | 'contact' | 'reviews') => void;
    currentView: 'home' | 'offers' | 'contact' | 'reviews';
}

export default function NavBarSeller({ setView, currentView }: NavBarSellerProps) {
    return (
        <nav className="w-full bg-main-dark/10 text-main-dark px-10 py-4 flex justify-between items-center rounded-xl font-quicksand">
            <div className="w-1/3">
                <img src={logo} alt="" className="h-8 w-auto" />
            </div>
            <div className="flex justify-center items-center w-1/3">
                <ul className="flex gap-10 p-3 text-white text-sm font-medium">
                    <li>
                        <button
                            onClick={() => setView('home')}
                            className={`text-main-dark hover:-translate-y-1 transform transition-all duration-300 hover:text-contrast-secondary ${currentView === 'home' ? 'font-bold' : ''}`}>
                            Tienda
                        </button>
                    </li>
                    <li>
                        <button
                            onClick={() => setView('offers')}
                            className={`text-main-dark hover:-translate-y-1 transform transition-all duration-300 hover:text-contrast-secondary ${currentView === 'offers' ? 'font-bold' : ''}`}>
                            Ofertas
                        </button>
                    </li>
                    <li>
                        <button onClick={() => setView('contact')}
                            className={`text-main-dark hover:-translate-y-1 transform transition-all duration-300 hover:text-contrast-secondary ${currentView === 'contact' ? 'font-bold' : ''}`}>
                            Contacto
                        </button>
                    </li>
                    <li>
                        <button onClick={() => setView('reviews')}
                            className={`text-main-dark hover:-translate-y-1 transform transition-all duration-300 hover:text-contrast-secondary ${currentView === 'reviews' ? 'font-bold' : ''}`}>
                            Opiniones
                        </button>
                    </li>
                </ul>
            </div>
            <div className="flex items-center bg-white rounded-full h-10 px-0.5 w-1/3 ml-15">
                <input type="text" className="w-full h-6 p-4 text-sm focus:outline-none" placeholder="Buscar en Unstable Games" />
                <button className="bg-gradient-to-br from-contrast-main to-contrast-secondary rounded-full w-15 h-9 flex items-center justify-center">
                    <IconSearch className="text-white h-6 w-auto stroke-3" />
                </button>
            </div>
        </nav>
    );
}
