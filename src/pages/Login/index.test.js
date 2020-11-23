import React from "react";
import {users} from 'services/mocks';
import { Provider } from 'react-redux';
import store from 'store';
import renderer from 'react-test-renderer';
import Login from 'pages/Login';

describe("<Login />", () => {
  it("renders text input correctly", () => {
    jest.mock('react-router-dom', () => ({
      useHistory: () => ({
        push: jest.fn(),
      }),
    }));
    const tree = renderer.create( <Provider store={store}><Login /></Provider>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("calls onLogin when button clicked", () => {
    const onSubmitMock = jest.fn();

    const component = Enzyme.mount(
      <Login onSubmit={onSubmitMock} />
    );
    
    component.find("input.user").simulate('change', { target: { value: users[0].user } })
    component.find("input.password").simulate('change', { target: { value:  users[0].password } })
    component.find("form").simulate("submit");

    console.log("onClickMock.mock", onSubmitMock.mock)
    expect(onSubmitMock).toBeCalled()
  });
});