import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import RoomContent from '../RoomContent';
import useResponsiveLayout from '../../hooks/useResponsiveLayout';
import RoomSign from '../../components/RoomSign';
import RoomPC from '../../assets/rooms/activitiesRoomPC.webp';
import RoomMobile from '../../assets/rooms/activitiesRoomMobile.webp';
import eventsData from '../../data/events.json';

interface EventData {
    date_lt: string;
    date_en: string;
    title_lt: string;
    title_en: string;
    description_lt: string;
    description_en: string;
}

export default function Events() {
    const { t, i18n } = useTranslation();
    const { deviceType } = useResponsiveLayout();
    const bck = deviceType === 'mobile' ? RoomMobile : RoomPC;
    const [currentIndex, setCurrentIndex] = useState(0);
    const isMobile = deviceType === 'mobile';
    const lang = i18n.language === 'en' ? 'en' : 'lt';

    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1) % eventsData.length);
    };

    const handleBack = () => {
        setCurrentIndex((prev) => (prev - 1 + eventsData.length) % eventsData.length);
    };

    const currentEvent = (eventsData as EventData[])[currentIndex];

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
                            {currentEvent[`date_${lang}`]}
                        </p>
                        <h3 className="text-xl font-bold mb-3 text-amber-900">
                            {currentEvent[`title_${lang}`]}
                        </h3>
                        <p className="text-base leading-relaxed text-gray-800">
                            {currentEvent[`description_${lang}`]}
                        </p>
                    </div>
                </div>

                <div className="flex-shrink-0 flex flex-col items-center gap-1 py-2">
                    <p className="text-sm text-gray-600">
                        {currentIndex + 1} {t('activities.of')} {(eventsData as EventData[]).length}
                    </p>

                    {!isMobile && (
                        <div className="flex items-center gap-4 mt-1">
                            <RoomSign
                                deviceType={deviceType}
                                onClick={handleBack}
                                asButton
                            >
                                ← {t('activities.back')}
                            </RoomSign>
                            <RoomSign
                                deviceType={deviceType}
                                onClick={handleNext}
                                asButton
                            >
                                {t('activities.next')} →
                            </RoomSign>
                        </div>
                    )}
                </div>
            </div>
        </RoomContent>
    );
}