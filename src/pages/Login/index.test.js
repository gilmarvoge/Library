import React from "react";
import { users } from 'services/mocks';
import { Provider, LocalizeProvider } from 'react-redux';
import store from 'store';
import renderer from 'react-test-renderer';
import Login from 'pages/Login';
import { render, fireEvent, screen } from '../../utils/test.utils';

// it('Renders the connected app with initialState', () => {
//   render(<Login />, { initialState: { user: '1' } })

//   expect(screen.getByText(/redux user/i)).toBeInTheDocument()
// })

describe("<Login />", () => {
  it("renders text input correctly", () => {
    jest.mock('react-router-dom', () => ({
      useHistory: () => ({
        push: jest.fn(),
      }),
    }));
    const component  = renderer.create(   
        <Provider store={store}>
          <Login />
        </Provider>
    )
       let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  // it("calls onLogin when button clicked", () => {
  //   const onSubmitMock = jest.fn();

  //   const component = Enzyme.mount(
  //     <Login onSubmit={onSubmitMock} />
  //   );

  //   component.find("input.user").simulate('change', { target: { value: users[0].user } })
  //   component.find("input.password").simulate('change', { target: { value: users[0].password } })
  //   component.find("form").simulate("submit");

  //   console.log("onClickMock.mock", onSubmitMock.mock)
  //   expect(onSubmitMock).toBeCalled()
  // });
});