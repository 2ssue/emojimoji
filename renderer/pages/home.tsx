import React, {DragEventHandler} from 'react';
import Head from 'next/head';
import Link from 'next/link';

const Home = () => {
  const handleDragStart: DragEventHandler = (e) => {
    e.preventDefault();
  };

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
