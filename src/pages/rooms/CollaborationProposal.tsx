import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import RoomContent from '../RoomContent';
import useResponsiveLayout from '../../hooks/useResponsiveLayout';
import RoomSign from '../../components/RoomSign';
import RoomPC from '../../assets/rooms/collaborationRoomPC.webp';
import RoomMobile from '../../assets/rooms/collaborationRoomMobile.webp';

const pdfFiles = {
    english: '/2026/MIDI_BP_2026_EN.pdf',
    lietuviskai: '/2026/MIDI_BP_2026_LT.pdf'
};

export default function CollaborationProposal() {
    const { t } = useTranslation();
    const { deviceType } = useResponsiveLayout();
    const bck = deviceType === 'mobile' ? RoomMobile : RoomPC;
    const [showPopup, setShowPopup] = useState(false);
    const [activePdf, setActivePdf] = useState<string | null>(null);

    const openPdf = (pdfType: string) => {
        setActivePdf(pdfType);
        setShowPopup(true);
    };

    const closePopup = () => {
        setShowPopup(false);
        setActivePdf(null);
    };

    return (
        <>
            <RoomContent
                background={bck}
                className="text-black"
            >
                <div 
                    className="flex flex-col justify-between px-4"
                    style={{ minHeight: '100%' }}
                >
                    <h2 className="text-l sm:text-3xl font-bold py-4 text-amber-900 text-center leading-tight">
                        {t('collaboration.title')}
                    </h2>

                    <div className="flex flex-col gap-4 items-center">
                        <RoomSign
                            deviceType={deviceType}
                            onClick={() => openPdf('english')}
                            asButton
                            scale={deviceType === "tablet" ? 1.5 : 1}
                        >
                            {t('collaboration.english')}
                        </RoomSign>

                        <RoomSign
                            deviceType={deviceType}
                            onClick={() => openPdf('lietuviskai')}
                            asButton
                            scale={deviceType === "tablet" ? 1.5 : 1}
                        >
                            {t('collaboration.lithuanian')}
                        </RoomSign>
                    </div>

                    <p className="text-sm sm:text-lg text-amber-900 py-4 text-center">
                        {t('collaboration.email')} <a href="mailto:marketingas@midi.lt" className="underline hover:text-amber-700">marketingas@midi.lt</a>
                    </p>
                </div>
            </RoomContent>

            {showPopup && (
                <div 
                    className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-[200] p-4"
                    onClick={closePopup}
                >
                    <div 
                        className="relative w-full h-full max-w-6xl max-h-[90vh] bg-white rounded-lg shadow-2xl border-4 border-amber-900 overflow-hidden"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="bg-amber-800 text-amber-50 px-6 py-4 border-b-4 border-amber-900 flex justify-between items-center">
                            <h3 className="text-2xl font-bold" style={{ fontFamily: 'serif' }}>
                                {activePdf === 'english' ? t('collaboration.english') : t('collaboration.lithuanian')}
                            </h3>
                            <button 
                                onClick={closePopup} 
                                className="text-amber-50 hover:text-amber-200 text-3xl font-bold w-10 h-10 flex items-center justify-center"
                            >
                                &times;
                            </button>
                        </div>

                        <iframe
                            src={activePdf === 'english' ? pdfFiles.english : pdfFiles.lietuviskai}
                            className="w-full h-full"
                            style={{ height: 'calc(100% - 80px)' }}
                            title={activePdf === 'english' ? 'English PDF' : 'Lietuviškai PDF'}
                        />
                    </div>
                </div>
            )}
        </>
    );
}