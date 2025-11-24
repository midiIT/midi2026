import miciusLogo from './assets/micius.gif';
import CountdownComponent from './components/Countdown';

function App() {
  return (
    <div className="min-h-screen bg-sky-900 flex flex-col items-center justify-center text-white px-4">
      <div className="text-center space-y-8">
        <h1 className="text-5xl md:text-7xl font-bold mb-4 mt-2">MIDI 2026</h1>

        <p className="text-xl md:text-2xl max-w-4xl mx-auto mb-8">
          Puslapis dar kuriamas...
          <br />
          Sekite naujienas mūsų socialiniuose tinkluose!
        </p>

        <div className="my-12">
          <img
            src={miciusLogo}
            className="w-48 h-48 md:w-64 md:h-64 mx-auto"
            alt="Micius"
          />
        </div>

        <CountdownComponent />

        <p className="text-lg mt-8">
          Jeigu turite klausimų arba norite tapti projekto rėmėjais parašykite
          mums el. paštu:
          <a
            href="mailto:vadovas@midi.lt"
            className="ml-1 mr-1 underline hover:text-indigo-300"
          >
            vadovas@midi.lt
          </a>
          arba
          <a
            href="mailto:marketingas@midi.lt"
            className="ml-1 mr-1 underline hover:text-indigo-300"
          >
            marketingas@midi.lt
          </a>
        </p>
      </div>
    </div>
  );
}

export default App;
