import { useState } from 'react';
import RoomContent from '../RoomContent';
import useResponsiveLayout from '../../hooks/useResponsiveLayout';
import RoomSign from '../../components/RoomSign';
import RoomPC from '../../assets/rooms/activitiesRoomPC.png';
import RoomMobile from '../../assets/rooms/activitiesRoomMobile.png';
import eventsData from '../../data/events.json';

export default function Events() {
    const { deviceType } = useResponsiveLayout();
    const bck = deviceType === 'mobile' ? RoomMobile : RoomPC;
    const [currentIndex, setCurrentIndex] = useState(0);
    const isMobile = deviceType === 'mobile';

    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1) % eventsData.length);
    };

    const handleBack = () => {
        setCurrentIndex((prev) => (prev - 1 + eventsData.length) % eventsData.length);
    };

    const currentEvent = eventsData[currentIndex];

    return (
        <RoomContent
            background={bck}
            className="text-black text-center"
        >
            <div className="flex flex-col h-full">
                {isMobile && (
                    <div className="flex-shrink-0 flex justify-between items-center px-2 py-1">
                        <button
                            onClick={handleBack}
                            className="text-2xl text-amber-800 font-bold px-3 py-1"
                        >
                            ←
                        </button>
                        <button
                            onClick={handleNext}
                            className="text-2xl text-amber-800 font-bold px-3 py-1"
                        >
                            →
                        </button>
                    </div>
                )}

                <div className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-hide px-4 py-2">
                    <div className="mb-4">
                        <p className="text-lg font-semibold text-amber-800 mb-2">
                            {currentEvent.date}
                        </p>
                        <h3 className="text-xl font-bold mb-3 text-amber-900">
                            {currentEvent.title}
                        </h3>
                        <p className="text-base leading-relaxed text-gray-800">
                            {currentEvent.description}
                        </p>
                    </div>
                </div>

                <div className="flex-shrink-0 flex flex-col items-center gap-1 py-2">
                    <p className="text-sm text-gray-600">
                        {currentIndex + 1} iš {eventsData.length}
                    </p>
                    
                    {/* No event links for now */}
                    {/* {currentEvent.link && (
                        <RoomSign
                            deviceType={deviceType}
                            onClick={() => window.open(currentEvent.link, '_blank')}
                            asButton
                        >
                            Nuoroda į renginį
                        </RoomSign>
                    )} */}
                    
                    {!isMobile && (
                        <div className="flex items-center gap-4 mt-1">
                            <RoomSign
                                deviceType={deviceType}
                                onClick={handleBack}
                                asButton
                            >
                                ← Atgal
                            </RoomSign>
                            <RoomSign
                                deviceType={deviceType}
                                onClick={handleNext}
                                asButton
                            >
                                Tolyn →
                            </RoomSign>
                        </div>
                    )}
                </div>
            </div>
        </RoomContent>
    );
}