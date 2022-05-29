import { render } from '@testing-library/react';
import * as customHooks from '../../lib/custom-hooks';
import * as HeroSub from '../../components/heroSub';
import * as AboutSection from '../../components/aboutSection';
import About from '../about.page';

describe('<About />', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should render expected components', async () => {
    // mock for HeroMain/HeroSub component (prevent re-render & window.matchMedia not a func)
    jest.spyOn(customHooks, 'useScrollOpacityEffect').mockReturnValue(1);
    jest.spyOn(customHooks, 'useMounted').mockReturnValue(true);

    const heroSubSpy = jest.spyOn(HeroSub, 'default');
    const aboutSectionSpy = jest.spyOn(AboutSection, 'default');

    render(<About />);

    expect(heroSubSpy).toBeCalledTimes(1);
    expect(heroSubSpy).toBeCalledWith(
      {
        title: 'About Me',
        description:
          'An introduction of myself - my passion, experiences and interests',
      },
      {}
    );

    expect(aboutSectionSpy).toBeCalledTimes(1);
  });
});
