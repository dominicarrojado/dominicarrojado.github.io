import { GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../components/layout';
import Date from '../components/date';
import utilStyles from '../styles/utils.module.css';
import { MAIN_TITLE } from '../lib/constants';
import HeroMain from '../components/heroMain';

function Home() {
  return (
    <Layout
      path="/"
      title={MAIN_TITLE}
      description="I'm Dominic Arrojado and my passion is turning design into code. I'm a web developer specializing in both front-end & back-end development. I'm experienced in developing small to large web applications."
      imageUrl=""
      imageWidth={1}
      imageHeight={2}
    >
      <HeroMain />
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
  };
};

export default Home;
