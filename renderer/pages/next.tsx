import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { GetStaticProps } from 'next';
import * as fs from 'fs';

const Next = ({ emojis }: {emojis: string[]}) => (
  <>
    <Head>
      <title>Next - Nextron (with-typescript)</title>
    </Head>
    <div>
      <p>
        <p>
          {emojis.length}
          {' '}
          emojis in Here!
        </p>
        {emojis.map((emoji) => <img src={`/emoji/blobs/${emoji}`} />)}
        <Link href="/home">
          <a>Go to home page</a>
        </Link>
      </p>
    </div>
  </>
);

export const getStaticProps: GetStaticProps = async () => {
  const emojis = fs.readdirSync('./renderer/public/emoji/blobs');
  return {
    props: { emojis },
  };
};

export default Next;
