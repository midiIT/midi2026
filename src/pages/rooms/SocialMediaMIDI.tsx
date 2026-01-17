import useResponsiveTiles from "../../hooks/useResponsiveTiles";
import RoomContent from "../RoomContent";
import RoomPC from '../../assets/rooms/contributorsRoomPC.png'
import RoomMobile from '../../assets/rooms/contributorsRoomMobile.png'
import FacebookIcon from '../../assets/rooms/midi_socials/facebook.png'
import InstagramIcon from '../../assets/rooms/midi_socials/instagram.png'
import TikTokIcon from '../../assets/rooms/midi_socials/tiktok.png'

export default function SocialMediaMIDI() {
  
    const { isMobile } = useResponsiveTiles();
    const bck = isMobile ? RoomMobile : RoomPC;

    return <div className="w-full h-full bg-blue-200 flex items-center justify-center">
        <RoomContent
            background={bck}
            className="text-black text-center"
        >
            {/* This is temporary text for Room 1 to showcase the scroll element */}
            <h2 className="text-2xl font-bold mb-4">MIDI socialinių tinklų kambarys</h2>
            <p className="mb-4">Mus galite rasti Facebook, Instagram ir TikTok platformose</p>

            <div className="grid gap-2 grid-cols-1 sm:grid-cols-3 items-center justify-items-center mt-4">
                <a href="https://www.facebook.com/midi.lt/" target="_blank" className="inline-block" rel="noopener noreferrer">
                    <img src={FacebookIcon} className="w-[5rem] sm:w-[8rem] h-auto object-contain" alt="Facebook" />
                </a>
                <a href="https://www.instagram.com/midi.lt/" target="_blank" className="inline-block relative" rel="noopener noreferrer">
                    <img src={InstagramIcon} className="w-[5rem] sm:w-[8rem] h-auto object-contain" alt="Instagram" />
                </a>
                <a href="https://www.tiktok.com/@midi.lt" target="_blank" className="inline-block" rel="noopener noreferrer">
                    <img src={TikTokIcon} className="w-[5rem] sm:w-[8rem] h-auto object-contain" alt="TikTok" />
                </a>
            </div>

        </RoomContent>
    </div>;
}