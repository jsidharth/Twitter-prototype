// Link.react.test.js
import React from 'react';
import renderer from 'react-test-renderer';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Sidebar from '../components/Sidebar/Sidebar';

configure({ adapter: new Adapter() });

it('render correctly the sidebar component', () => {
  const sidebarComponent = renderer.create(<Sidebar />).toJSON();
  expect(sidebarComponent).toMatchSnapshot();
});
