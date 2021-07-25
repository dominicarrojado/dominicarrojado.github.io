import Head from 'next/head';
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
