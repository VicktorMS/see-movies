'use client';
import Link from 'next/link';
import { Popcorn, ListHeart } from '@phosphor-icons/react';
import { useState, useEffect } from 'react';

export default function BottomNavigation() {
    const [currentPath, setCurrentPath] = useState('');

    useEffect(() => {
        const handleRouteChange = () => {
            setCurrentPath(window.location.pathname);
        };

        // Atualiza o estado ao montar o componente
        handleRouteChange();

        // Escuta o evento popstate para lidar com a navegação no histórico
        window.addEventListener('popstate', handleRouteChange);

        // Limpa o event listener ao desmontar o componente
        return () => {
            window.removeEventListener('popstate', handleRouteChange);
        };
    }, []);

    return (
        <div className="btm-nav z-[90] md:hidden">
            <NavItem 
                href="/" 
                icon={Popcorn} 
                currentPath={currentPath}
                label="Filmes"
                setCurrentPath={setCurrentPath}
            />
            <NavItem 
                href="/favorites" 
                icon={ListHeart} 
                currentPath={currentPath} 
                label="Favorites"
                setCurrentPath={setCurrentPath}
            />
        </div>
    );
}

function NavItem({ href, icon: Icon, currentPath, label, setCurrentPath }) {
    const isActive = currentPath === href;

    const handleClick = () => {
        setCurrentPath(href);
    };

    return (
        <Link href={href} onClick={handleClick}>
            <Icon 
                size={32} 
                className={`transition-colors duration-300 ease-in-out ${isActive ? 'text-primary' : 'text-black'}`} 
                color={isActive ? '#0f7ec2' : '#000'}
            />
            <p className={`transition-colors duration-300 ease-in-out ${isActive ? 'text-primary font-medium' : 'text-black'}`}>{label}</p>
        </Link>
    );
}
