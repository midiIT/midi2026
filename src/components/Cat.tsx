import { useEffect, useState } from "react";
import useResponsiveTiles from "../hooks/useResponsiveTiles";
import catImg from "../assets/cat_placeholder.jpg";

export default function Cat({ className, inView }: { className?: string; inView: boolean }) {
    const { tileSize, isMobile } = useResponsiveTiles();
    const [talk, setTalk] = useState(false);

    const [randomXRem] = useState(() => {
    const maxOffsetRem = tileSize / 16;
    return (Math.random() * 2 - 1) * maxOffsetRem;
    });


    useEffect(() => {
        if (!talk) return;


        const timeout = setTimeout(() => setTalk(false), 3000);
        return () => clearTimeout(timeout);
    }, [talk, inView]);

    const appearAnimation = `transition-opacity duration-300 
        ${inView && isMobile ? 'opacity-100' : 'opacity-0'} 
        group-hover:opacity-100 group-focus:opacity-100 
        pointer-events-auto`;

    return (
        <div
        className={`absolute left-0 top-0 right-0 bottom-0 ${className ?? ''}`}
        style={{
            padding: tileSize,
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'center',
        }}
        >
        <div style={{ transform: `translateX(${randomXRem}rem)`, marginBottom: `${Math.abs(randomXRem)}rem`, position: 'relative' }}>
            <img
            src={catImg}
            onClick={() => {
            if (inView) setTalk(true);
            }}
            alt="Cat"
            className={`${appearAnimation} h-auto object-contain ${talk ? 'animate-talk' : ''}`}
            style={{ width: `${tileSize / 16}rem`, zIndex: 1000 }}
            loading="lazy"
            />

            {talk && (
            <div
                className={appearAnimation}
                style={{
                position: 'absolute',
                bottom: '100%',
                left: '50%',
                transform: 'translateX(-50%)',
                backgroundColor: 'white',
                padding: '0.25rem 0.5rem',
                borderRadius: '0.25rem',
                whiteSpace: 'nowrap',
                fontSize: '1rem',
                color: 'black',
                zIndex: 2000,
                marginBottom: '0.5rem',
                }}
            >
                miau
            </div>
            )}
        </div>
        </div>
    );
}
