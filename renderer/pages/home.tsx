import React, {DragEventHandler} from 'react';
import Head from 'next/head';
import Link from 'next/link';
import {ipcRenderer} from 'electron';

const Home = () => {
  const handleDragStart: DragEventHandler = (e) => {
    e.preventDefault();
  };

  if (ipcRenderer) {
    console.log(ipcRenderer.sendSync('synchronous-message', 'ping'));
    ipcRenderer.on('asynchronous-reply', (event, arg) => {
      console.log(arg); // "pong"이 출력됩니다.
    });
    ipcRenderer.send('asynchronous-message', 'ping'); // "pong"이 출력됩니다.
  }

  return (
    <React.Fragment>
      <Head>
        <title>Home - Nextron (with-typescript)</title>
      </Head>
      <div>
        <p>
          ⚡ Electron + Next.js ⚡ -
          <Link href="/next">
            <a onDragStart={handleDragStart}>Go to next page</a>
          </Link>
        </p>
        <img src="/images/logo.png" />
      </div>
    </React.Fragment>
  );
};

export default Home;
