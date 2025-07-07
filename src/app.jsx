import { For } from 'solid-js';
import { render } from 'solid-js/web';

import GitHubSVG from '@brybrant/svg-icons/GitHub.svg';

import './app.scss';

import Canvas from './components/canvas.jsx';

const App = () => (
  <>
    <div class='background'>
      <Canvas />
    </div>
    <main>
      <h1>
        <For each={'KALEIDOSCOPE'}>
          {(letter, i) => <span class={`letter-${i()}`}>{letter}</span>}
        </For>
      </h1>
      <a
        class='button'
        href='https://github.com/brybrant/kaleidoscope2'
        target='_blank'
      >
        <GitHubSVG />
      </a>
    </main>
  </>
);

const dispose = render(() => <App />, document.getElementById('app'));

if (import.meta.hot) {
  import.meta.hot.accept();
  import.meta.hot.dispose(dispose);
}
