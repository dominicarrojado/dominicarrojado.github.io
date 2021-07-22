import { useEffect, useState } from 'react';
import cn from 'classnames';
import Window from '../modules/Window';
import styles from './heroMain.module.css';
import Spinner from './spinner';
import ButtonText from './buttonText';

export default function HeroMain() {
  const [windowLoaded, setWindowLoaded] = useState(Window.loaded);

  useEffect(() => {
    const windowOnLoad = async () => {
      setWindowLoaded(true);
    };

    Window.on('load', windowOnLoad);

    return () => {
      Window.off('load', windowOnLoad);
    };
  }, []);

  return (
    <section className={styles.hero}>
      {!windowLoaded && <Spinner />}
      <div
        className={cn(styles.heroBg, {
          [styles.heroBgShow]: windowLoaded,
        })}
      />
      <div className={styles.heroWrapper}>
        <div
          className={cn(styles.heroLogoContainer, {
            [styles.heroLogoTagsShow]: windowLoaded,
          })}
        >
          <img
            src="/images/logos/dominic-arrojado.svg"
            alt="Dominic Arrojado logo"
            className={cn(styles.heroLogo, {
              [styles.heroLogoShow]: windowLoaded,
            })}
          />
        </div>
        <div className={styles.heroDescContainer}>
          <h1
            className={cn(styles.heroDesc, {
              [styles.heroDescShow]: windowLoaded,
            })}
          >
            Dominic Arrojado · Senior Software Engineer
          </h1>
        </div>
        <div
          className={cn(styles.scrollDownBtnContainer, {
            [styles.scrollDownBtnShow]: windowLoaded,
          })}
        >
          <button className={styles.scrollDownBtn}>Scroll Down</button>
          <img
            src="/images/icons/arrow-down.svg"
            alt="arrow down icon"
            className={styles.arrowDownIcon}
          />
        </div>
      </div>
    </section>
  );
}
