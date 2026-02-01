import { useState } from 'react';
import RoomContent from '../RoomContent';
import useResponsiveLayout from '../../hooks/useResponsiveLayout';
import RoomPC from '../../assets/rooms/activitiesRoomPC.png';
import RoomMobile from '../../assets/rooms/activitiesRoomMobile.png';
import eventsData from '../../data/events.json';

export default function Events() {
    const { deviceType } = useResponsiveLayout();
    const bck = deviceType === 'mobile' ? RoomMobile : RoomPC;
    const [currentIndex, setCurrentIndex] = useState(0);

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
            <div className="flex flex-col items-center justify-between h-full py-8">
                <div className="flex-1 flex flex-col justify-center max-w-2xl px-4">
                    
                    
                    <div className="mb-6">
                        <p className="text-xl font-semibold text-amber-800 mb-3">
                            {currentEvent.date}
                        </p>
                        <h3 className="text-2xl font-bold mb-4 text-amber-900">
                            {currentEvent.title}
                        </h3>
                        <p className="text-lg leading-relaxed text-gray-800 mb-4">
                            {currentEvent.description}
                        </p>
                        
                        {currentEvent.link && (
                            <a
                                href={currentEvent.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block px-6 py-2 bg-amber-700 text-amber-50 rounded font-semibold hover:bg-amber-600 transition-colors shadow-md border-2 border-amber-900 mt-2"
                                style={{ fontFamily: 'serif' }}
                            >
                                Nuoroda į renginį
                            </a>
                        )}
                    </div>

                    <p className="text-sm text-gray-600 mt-4">
                        Event {currentIndex + 1} of {eventsData.length}
                    </p>
                </div>

                <div className="flex gap-6 mt-4">
                    <button
                        onClick={handleBack}
                        className="px-2 py-1 bg-amber-800 text-amber-50 rounded font-bold text-lg hover:bg-amber-700 transition-colors shadow-lg border-2 border-amber-900"
                        style={{ fontFamily: 'serif' }}
                    >
                        ← Back
                    </button>
                    <button
                        onClick={handleNext}
                        className="px-2 py-1 bg-amber-800 text-amber-50 rounded font-bold text-lg hover:bg-amber-700 transition-colors shadow-lg border-2 border-amber-900"
                        style={{ fontFamily: 'serif' }}
                    >
                        Next →
                    </button>
                </div>
            </div>
        </RoomContent>
    );
}