import { onMount } from "solid-js";

function App() {
  let container: HTMLElement;
  let startBtn: HTMLElement;
  let statusText: HTMLElement;
  let speedText: HTMLElement;
  let speedTextMBPS: HTMLElement;

  onMount(() => {
    startBtn.onclick = () => {
      startBtn.style.transform = 'translate(-50%, -50%) scale(0.1)';
      startBtn.style.opacity = '0';

      setTimeout(() => {
        startBtn.remove();
      }, 250);

      container.style.transform = 'translate(-50%, -50%) scale(1)';
      container.style.opacity = '1';

      let req = new XMLHttpRequest();
      let startTimestamp = 0;
      req.open('GET', 'https://cdn.phaz.uk/speedtest.dat');

      req.onloadstart = () => {
        console.log('Started');

        statusText.innerHTML = 'Testing...';
        startTimestamp = Date.now();
      }

      req.onprogress = ( e ) => {
        console.log(e.loaded);

        let secs = (Date.now() - startTimestamp) / 1000
        let speed = (e.loaded / 1000000) / secs;

        speedText.innerHTML = speed.toFixed(2);
        speedTextMBPS.innerHTML = (speed * 8).toFixed(2);
      }

      req.onloadend = () => {
        let secs = (Date.now() - startTimestamp) / 1000
        let speed = 100 / secs;

        speedText.innerHTML = speed.toFixed(2);
        speedTextMBPS.innerHTML = (speed * 8).toFixed(2);

        statusText.innerHTML = 'Finished.';
        console.log('Finished in', secs, 's');
      }

      req.send();
    }
  })

  return (
    <>
      <div class="centre" ref={( el ) => container = el}>
        <h2 ref={( el ) => statusText = el}>Connecting...</h2>

        <h1 class="numtext" ref={( el ) => speedText = el}>0</h1>
        <h3>MB/s</h3>

        <hr />

        <h1 class="numtext" ref={( el ) => speedTextMBPS = el}>0</h1>
        <h3>Mbps</h3>
      </div>
      
      <div class="start-button" ref={( el ) => startBtn = el}>Start</div>
      <div class="start-info">This downloads 100MB of data, please do not run this if you are on a metered network connection.</div>
    </>
  )
}

export default App
