import { GetStaticProps } from 'next';
import Layout from '../components/layout';
import HeroMain from '../components/heroMain';
import AboutMe from '../components/aboutMe';
import { MAIN_TITLE } from '../lib/constants';

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
      <AboutMe />
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
  };
};

export default Home;
