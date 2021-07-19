import Head from 'next/head';
import React from 'react';
import Layout from '../../components/layout';

function index() {
  return (
    <Layout>
      <Head>
        <title>Posts</title>
      </Head>
      Hello
    </Layout>
  );
}

export default index;
