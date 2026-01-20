import useResponsiveTiles from "../../hooks/useResponsiveTiles";
import RoomContent from "../RoomContent";
import RoomPC from '../../assets/rooms/contributorsRoomPC.png'
import RoomMobile from '../../assets/rooms/contributorsRoomMobile.png'
import FacebookIcon from '../../assets/social_icons/facebook.png'
import InstagramIcon from '../../assets/social_icons/instagram.png'
import TikTokIcon from '../../assets/social_icons/tiktok.png'

export default function SocialMediaRO() {
  
    const { isMobile } = useResponsiveTiles();
    const bck = isMobile ? RoomMobile : RoomPC;

    return <div className="w-full h-full bg-blue-200 flex items-center justify-center">
        <RoomContent
            background={bck}
            className="text-black text-center"
        >
            <h2 className="text-2xl font-bold mb-4">RO socialinių tinklų kambarys</h2>
            <p className="mb-4">Daugiau informacijos apie RO galite rasti populiariausiose socialinių tinklų platformose.</p>

            <div className="grid gap-2 grid-cols-1 sm:grid-cols-3 items-center justify-items-center mt-4">
                <a href="https://www.facebook.com/rokooperos/" target="_blank" className="inline-block" rel="noopener noreferrer">
                    <div className="flex items-center gap-3 flex-col">
                        <img src={FacebookIcon} className="w-[5rem] sm:w-[8rem] h-auto object-contain" alt="Facebook" />
                        <span className="text-sm sm:text-base font-medium">Facebook</span>
                    </div>
                </a>
                <a href="https://www.instagram.com/roko_operos/" target="_blank" className="inline-block relative" rel="noopener noreferrer">
                    <div className="flex items-center gap-3 flex-col">
                        <img src={InstagramIcon} className="w-[5rem] sm:w-[8rem] h-auto object-contain" alt="Instagram" />
                        <span className="text-sm sm:text-base font-medium">Instagram</span>
                    </div>
                </a>
                <a href="https://www.tiktok.com/@midi.roko.operos" target="_blank" className="inline-block" rel="noopener noreferrer">
                    <div className="flex items-center gap-3 flex-col">
                        <img src={TikTokIcon} className="w-[5rem] sm:w-[8rem] h-auto object-contain" alt="TikTok" />
                        <span className="text-sm sm:text-base font-medium">TikTok</span>
                    </div>
                </a>
            </div>

        </RoomContent>
    </div>;
}