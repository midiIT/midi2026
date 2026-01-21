import { useState } from 'react';
import RoomContent from '../RoomContent';
import useResponsiveTiles from '../../hooks/useResponsiveTiles';
import RoomPC from '../../assets/rooms/activitiesRoomPC.png';
import RoomMobile from '../../assets/rooms/activitiesRoomMobile.png';

const events = [
    {
        date: "March 15, 2026",
        title: "Medieval Fair",
        description: "Join us for a grand medieval celebration featuring jousting tournaments, traditional music, and authentic period cuisine. All students and faculty welcome!"
    },
    {
        date: "April 3, 2026",
        title: "Guest Lecture Series",
        description: "Professor Eleanor Ashford will discuss 'Life in Medieval Universities: Then and Now'. Free admission with student ID."
    },
    {
        date: "April 20, 2026",
        title: "Spring Festival",
        description: "Celebrate the season with outdoor activities, live performances, and a showcase of student art and music projects."
    },
    {
        date: "May 5, 2026",
        title: "Honors Ceremony",
        description: "Annual recognition of outstanding academic achievements and contributions to the university community."
    },
    {
        date: "May 18, 2026",
        title: "Graduation Week",
        description: "Commencement ceremonies and celebrations honoring our graduating class. Events span the entire week."
    }
];

export default function Events() {
    const { isMobile } = useResponsiveTiles();
    const bck = isMobile ? RoomMobile : RoomPC;
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1) % events.length);
    };

    const handleBack = () => {
        setCurrentIndex((prev) => (prev - 1 + events.length) % events.length);
    };

    const currentEvent = events[currentIndex];

    return (
        <RoomContent
            background={bck}
            className="text-black text-center"
        >
            <div className="flex flex-col items-center justify-between h-full py-8">
                <div className="flex-1 flex flex-col justify-center max-w-2xl px-4">
                    <h2 className="text-3xl font-bold mb-6 text-amber-900">Upcoming Events</h2>
                    
                    <div className="mb-6">
                        <p className="text-xl font-semibold text-amber-800 mb-3">
                            {currentEvent.date}
                        </p>
                        <h3 className="text-2xl font-bold mb-4 text-amber-900">
                            {currentEvent.title}
                        </h3>
                        <p className="text-lg leading-relaxed text-gray-800">
                            {currentEvent.description}
                        </p>
                    </div>

                    <p className="text-sm text-gray-600 mt-4">
                        Event {currentIndex + 1} of {events.length}
                    </p>
                </div>

                <div className="flex gap-6 mt-6">
                    <button
                        onClick={handleBack}
                        className="px-8 py-3 bg-amber-800 text-amber-50 rounded font-bold text-lg hover:bg-amber-700 transition-colors shadow-lg border-2 border-amber-900"
                        style={{ fontFamily: 'serif' }}
                    >
                        ← Back
                    </button>
                    <button
                        onClick={handleNext}
                        className="px-8 py-3 bg-amber-800 text-amber-50 rounded font-bold text-lg hover:bg-amber-700 transition-colors shadow-lg border-2 border-amber-900"
                        style={{ fontFamily: 'serif' }}
                    >
                        Next →
                    </button>
                </div>
            </div>
        </RoomContent>
    );
}