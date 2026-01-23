import { useEffect, useState } from "react";
import useResponsiveTiles from "../hooks/useResponsiveTiles";
import catImg from "../assets/cat_placeholder.jpg";

export default function Cat({ className, inView }: { className?: string; inView: boolean }) {
    const { tileSize, isMobile } = useResponsiveTiles();

    const [talk, setTalk] = useState(false);

    useEffect(() => {
        if (!talk) return;
        const timeout = setTimeout(() => setTalk(false), 3000);
        return () => clearTimeout(timeout);
    }, [talk]);

    const isCurrentlyTalking = talk && inView;

    const appearAnimation = `transition-opacity duration-900
        ${inView && isMobile ? 'opacity-100 delay-[800ms]' : 'opacity-0 delay-[800ms]'} 
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
            pointerEvents: 'none',
            zIndex:'999'
        }}
        >
        <div style={{ marginBottom: `1rem`, position: 'relative' }}>         
            <img
            src={catImg}
            onClick={() => setTalk(true)}
            alt="Cat"
            className={`${appearAnimation} h-auto object-contain cursor-pointer ${talk ? 'animate-talk' : ''}`}
            style={{ width: `${tileSize / 6}rem`, zIndex: 1000 }}
            />

            {isCurrentlyTalking && (
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
                zIndex: 9999,
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
