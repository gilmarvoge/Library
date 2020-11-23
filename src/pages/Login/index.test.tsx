import React from "react";
//import { render } from '@testing-library/react';
//import Enzyme from 'enzyme';
//import { users } from 'services/mocks';

import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import store from 'store';
import renderer from 'react-test-renderer';
import Login from 'pages/Login';


describe("<Login />", () => {
  it("renders text input correctly", () => {
    const historyMock = { push: jest.fn(), location: {}, listen: jest.fn() };
    const component = renderer.create(
      <Provider store={store}>
        <Router history={historyMock}>
          <Login />
        </Router>
      </Provider>
    ).root;
   
  });


//   const linkElement = screen.getByText(/learn react/i);
// expect(linkElement).toBeInTheDocument();
  // const testValues = {
  //   user: 'FOO',
  //   password: 'BAZ',
  //   handleSubmit: jest.fn(),
  // };

  // it('Submit works', () => {
  //   it('renders the inner Counter', () => {
  //     const wrapper = mount(<Login />);
     
  //   });
    // const historyMock = { push: jest.fn(), location: {}, listen: jest.fn() };
    // const component = Enzyme.mount(
    //   <Provider store={store}>
    //     <Router history={historyMock}>
    //       <Login {...testValues} />
    //     </Router>
    //   </Provider>
    // );
    // console.log("component ",component)
    // component.find('form').simulate('submit');
    // component.find("input.user").simulate('click');
    // expect(testValues.handleSubmit).toHaveBeenCalledTimes(1);
    // expect(testValues.handleSubmit).toBeCalledWith({ username: testValues.username, password: testValues.password });
  // });

  //const onSubmitMock = jest.fn();
  // const historyMock = { push: jest.fn(), location: {}, listen: jest.fn() };
  // const component = renderer.create(
  //   <Provider store={store}> 
  //     <Router history={historyMock}>
  //       <Login />
  //     </Router>
  //   </Provider>
  // )
  // let tree = component.toJSON();

  // component.find("input.user").simulate('change', { target: { value: users[0].user } })
  // component.find("input.password").simulate('change', { target: { value: users[0].password } })
  // component.find("form").simulate("submit");

  // console.log("onClickMock.mock", onSubmitMock.mock)
  // expect(onSubmitMock).toBeCalled()
});
