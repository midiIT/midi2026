import midiLogo from '../assets/background/midi.webp';

export default function MidiLogo() {
  return (
    <a
      href="https://midi.lt/pagrindinis/"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed top-4 left-4 z-50 block transition-transform duration-200 ease-in-out hover:scale-110 active:scale-110"
      aria-label="MIDI"
    >
      <img
        src={midiLogo}
        alt="MIDI"
        className="h-20 w-auto drop-shadow-lg"
      />
    </a>
  );
}
