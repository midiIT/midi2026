import { useState } from 'react';
import RoomContent from '../RoomContent';
import useResponsiveLayout from '../../hooks/useResponsiveLayout';
import RoomSign from '../../components/RoomSign';
import RoomPC from '../../assets/rooms/collaborationRoomPC.png';
import RoomMobile from '../../assets/rooms/collaborationRoomMobile.png';

const pdfFiles = {
    english: '/2026/MIDI_BP_2026_EN.pdf',
    lietuviskai: '/2026/MIDI_BP_2026_LT.pdf'
};

export default function CollaborationProposal() {
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
                <div className="max-w-3xl mx-auto px-4 py-8">
                    <h2 className="text-3xl font-bold mb-8 text-amber-900 text-center pb-10">
                        Bendradarbiavimo pasiūlymai
                    </h2>

                    <div className="flex flex-col gap-6 items-center">
                        <RoomSign
                            deviceType={deviceType}
                            onClick={() => openPdf('english')}
                            asButton
                        >
                            English
                        </RoomSign>
                        
                        <RoomSign
                            deviceType={deviceType}
                            onClick={() => openPdf('lietuviskai')}
                            asButton
                        >
                            Lietuviškai
                        </RoomSign>
                    </div>
                </div>
            </RoomContent>

            {showPopup && (
                <div 
                    className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
                    onClick={closePopup}
                >
                    <div 
                        className="relative w-full h-full max-w-6xl max-h-[90vh] bg-white rounded-lg shadow-2xl border-4 border-amber-900 overflow-hidden"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="absolute top-2 right-4 z-10">
                            <RoomSign
                                deviceType={deviceType}
                                onClick={closePopup}
                                asButton
                            >
                                Close
                            </RoomSign>
                        </div>

                        <div className="bg-amber-800 text-amber-50 px-6 py-4 border-b-4 border-amber-900">
                            <h3 className="text-2xl font-bold" style={{ fontFamily: 'serif' }}>
                                {activePdf === 'english' ? 'English' : 'Lietuviškai'}
                            </h3>
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