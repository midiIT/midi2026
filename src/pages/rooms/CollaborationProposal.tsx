import { useState } from 'react';
import RoomContent from '../RoomContent';
import useResponsiveTiles from '../../hooks/useResponsiveTiles';
import RoomPC from '../../assets/rooms/collaborationRoomPC.png';
import RoomMobile from '../../assets/rooms/collaborationRoomMobile.png';

// PDF file paths - replace these with your actual PDF file paths
const pdfFiles = {
    marketingas: '/path/to/marketingas.pdf',
    barterinis: '/path/to/barterinis.pdf'
};

export default function CollaborationProposal() {
    const { isMobile } = useResponsiveTiles();
    const bck = isMobile ? RoomMobile : RoomPC;
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
                    <h2 className="text-3xl font-bold mb-8 text-amber-900 text-center">
                        Bendradarbiavimo pasiūlymai
                    </h2>
                    
                    <p className="text-lg mb-8 text-gray-800 text-center leading-relaxed">
                        Peržiūrėkite mūsų informacinius dokumentus pasirinkdami vieną iš žemiau pateiktų variantų.
                    </p>

                    {/* PDF Selection Buttons */}
                    <div className="flex flex-col gap-6 items-center">
                        <button
                            onClick={() => openPdf('marketingas')}
                            className="w-full max-w-md px-8 py-6 bg-amber-800 text-amber-50 rounded-lg font-bold text-xl hover:bg-amber-700 transition-all shadow-lg border-4 border-amber-900 hover:scale-105"
                            style={{ fontFamily: 'serif' }}
                        >
                            Marketingas
                        </button>
                        
                        <button
                            onClick={() => openPdf('barterinis')}
                            className="w-full max-w-md px-8 py-6 bg-amber-800 text-amber-50 rounded-lg font-bold text-xl hover:bg-amber-700 transition-all shadow-lg border-4 border-amber-900 hover:scale-105"
                            style={{ fontFamily: 'serif' }}
                        >
                            Barterinis
                        </button>
                    </div>

                    <p className="text-center text-sm text-gray-600 mt-8">
                        Click on a document to view it in a new window
                    </p>
                </div>
            </RoomContent>

            {/* PDF Popup Modal */}
            {showPopup && (
                <div 
                    className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
                    onClick={closePopup}
                >
                    <div 
                        className="relative w-full h-full max-w-6xl max-h-[90vh] bg-white rounded-lg shadow-2xl border-4 border-amber-900 overflow-hidden"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close Button */}
                        <button
                            onClick={closePopup}
                            className="absolute top-4 right-4 z-10 bg-amber-800 text-amber-50 px-6 py-3 rounded-lg font-bold text-lg hover:bg-amber-700 transition-all shadow-lg border-2 border-amber-900"
                            style={{ fontFamily: 'serif' }}
                        >
                            ✕ Close
                        </button>

                        {/* PDF Header */}
                        <div className="bg-amber-800 text-amber-50 px-6 py-4 border-b-4 border-amber-900">
                            <h3 className="text-2xl font-bold" style={{ fontFamily: 'serif' }}>
                                {activePdf === 'marketingas' ? 'Marketingas' : 'Barterinis'}
                            </h3>
                        </div>

                        {/* PDF Viewer */}
                        <iframe
                            src={activePdf === 'marketingas' ? pdfFiles.marketingas : pdfFiles.barterinis}
                            className="w-full h-full"
                            style={{ height: 'calc(100% - 80px)' }}
                            title={activePdf === 'marketingas' ? 'Marketingas PDF' : 'Barterinis PDF'}
                        />
                    </div>
                </div>
            )}
        </>
    );
}