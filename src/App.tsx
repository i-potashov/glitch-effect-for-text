import React from 'react';
import GlitchEffectForText from './components/glitch-effect-for-text';

const words = ['short', 'medium text', 'long text stroke'];
const symbols = '@░▒▓#&[]{}/_-?:';

function App() {
  return (
    <div className='h-screen w-full flex justify-center items-center'>
      <GlitchEffectForText
        words={words}
        symbols={symbols}
        steps={20}
        intervals={[60, 120, 180]}
        freezeTimer={4000}
        componentStyle={'text-6xl font-black text-white uppercase'}
      />
    </div>
  );
}

export default App;
