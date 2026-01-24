import RoomContent from '../RoomContent'
import useResponsiveTiles from '../../hooks/useResponsiveTiles';
import RoomPC from '../../assets/rooms/contributorsRoomPC.png'
import RoomMobile from '../../assets/rooms/contributorsRoomMobile.png'

export default function Contributors() {

    const { isMobile } = useResponsiveTiles();
    const bck = isMobile ? RoomMobile : RoomPC;

    return (
        <RoomContent
            background={bck}
            className="text-black text-center"
        >
            {/* This is temporary text for Room 1 to showcase the scroll element */}
            <h2 className="text-2xl font-bold mb-4">Welcome to the Throne Room</h2>
            <p>This is Room 1 content that appears centered.</p>
            <h2 className="text-2xl font-bold mb-4">Welcome to the Throne Room</h2>
            <p>This is Room 1 content that appears centered.</p>
            <h2 className="text-2xl font-bold mb-4">Welcome to the Throne Room</h2>
            <p>This is Room 1 content that appears centered.</p>
            <h2 className="text-2xl font-bold mb-4">Welcome to the Throne Room</h2>
            <p>This is Room 1 content that appears centered.</p>
            <h2 className="text-2xl font-bold mb-4">Welcome to the Throne Room</h2>
            <p>This is Room 1 content that appears centered.</p>
            <h2 className="text-2xl font-bold mb-4">Welcome to the Throne Room</h2>
            <p>This is Room 1 content that appears centered.</p>
        </RoomContent>
    );
}