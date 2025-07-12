import React, { useState, useEffect, useContext } from 'react';
import { Header, Sidebar, CategoriesBar, VideoGrid } from './components';
import { SidebarContext } from './context/SidebarContext';
import Home from './pages/Home.jsx';

// App.jsx
const MainContent = () => {
    const { isSidebarOpen } = useContext(SidebarContext);

    return (
        <main className={`bg-[#0f0f0f] text-white pt-16 transition-all duration-300 ease-in-out ${isSidebarOpen ? 'lg:ml-64' : 'lg:ml-20'}`}>
            <CategoriesBar />
            <div className="p-4 sm:p-6 lg:p-8">
                <Home /> {/* ← Use Home instead of VideoGrid directly */}
            </div>
        </main>
    );
};


export default function App() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    useEffect(() => {
        const handleResize = () => {
            const mobile = window.innerWidth < 1024;
            setIsMobile(mobile);
            if (mobile) {
                setIsSidebarOpen(false);
            } else {
                setIsSidebarOpen(true);
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // Initial check

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <SidebarContext.Provider value={{ isSidebarOpen, toggleSidebar, isMobile }}>
            <div className="bg-[#0f0f0f] min-h-screen">
                <Header />
                <Sidebar />
                <MainContent />
            </div>
        </SidebarContext.Provider>
    );
}
