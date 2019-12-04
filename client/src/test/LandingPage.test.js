// Link.react.test.js
import React from 'react';
import renderer from 'react-test-renderer';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import LandingPage from '../components/LandingPage/LandingPage';

configure({ adapter: new Adapter() });

it('render correctly the Landing Page component', () => {
  const LandingPageComponent = renderer.create(<LandingPage />).toJSON();
  expect(LandingPageComponent).toMatchSnapshot();
});
