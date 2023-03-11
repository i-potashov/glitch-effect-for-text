# React component for text changing glitch effect

![glitchtext](https://user-images.githubusercontent.com/40663403/224404746-74ad2bc0-d631-495b-ad46-c8d4dfd6b9d1.gif)

## Uses

React Typescript Tailwind

## Start
```sh
$ npm install
$ npm run start
```

## Usage

```javascript
import GlitchEffectForText from './components/glitch-effect-for-text';

// array of output words
const words = ['short', 'medium text', 'long text stroke'];
// string with characters
const symbols = '@░▒▓#&[]{}/_-?:';

// steps - the number of iterations of changing characters between words
// intervals - array of values that determines the speed of characters change
// freezeTimer - time to display words between changes
// componentStyle - string prop for className
 <GlitchEffectForText
        words={words}
        symbols={symbols}
        steps={20}
        intervals={[60, 120, 180]}
        freezeTimer={4000}
        componentStyle={'text-6xl'}
      />
```