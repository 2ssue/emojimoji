import React, { DragEventHandler } from 'react';
import { toast } from 'react-toastify';
import Head from 'next/head';
import Link from 'next/link';

const Home = () => {
  const handleDragStart: DragEventHandler = async (e) => {
    const imageName = e.currentTarget.getAttribute('data-name');
    try {
      await navigator.clipboard.writeText(`:${imageName}:`);
      toast(`🦄 Success to copy '${imageName}'!`, {
        position: 'top-center',
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
      });
    } catch (error) {
      toast.error(`😰 Fail to copy '${imageName}'..`);
    }
  };

  return (
    <>
      <Head>
        <title>Home - Nextron (with-typescript)</title>
      </Head>
      <div>
        <p>
          ⚡ Electron + Next.js ⚡ -
          <Link href="/next">
            <a>Go to next page</a>
          </Link>
        </p>
        <img
          onDragStart={handleDragStart}
          src="/images/logo.png"
          data-name="react"
        />
      </div>
    </>
  );
};

export default Home;
