import React from "react";
import Enzyme from 'enzyme';
import { users } from 'services/mocks';
import { Provider, LocalizeProvider } from 'react-redux';
import { Router } from 'react-router-dom';
import store from 'store';
import renderer from 'react-test-renderer';
import { createMemoryHistory } from 'history'
import Login from 'pages/Login';
import { render, fireEvent, screen } from '../../utils/test.utils';

// it('Renders the connected app with initialState', () => {
//   render(<Login />, { initialState: { user: '1' } })

//   expect(screen.getByText(/redux user/i)).toBeInTheDocument()
// })

describe("<Login />", () => {
  it("renders text input correctly", () => {
    // const historyMock  =jest.mock('react-router-dom', () => ({
    //   ...jest.requireActual('react-router-dom'),
    //   useHistory: () => ({
    //     push: jest.fn()
    //   })
    // }));
    const historyMock = { push: jest.fn(), location: {}, listen: jest.fn() };
    const component  = renderer.create(   
        <Provider store={store}>    
        <Router history={historyMock}>  
          <Login />  
          </Router>         
        </Provider>
    )
       let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("calls onLogin when button clicked", () => {
    const onSubmitMock = jest.fn();

    const component = Enzyme.mount(
      <Login onSubmit={onSubmitMock} />
    );

    component.find("input.user").simulate('change', { target: { value: users[0].user } })
    component.find("input.password").simulate('change', { target: { value: users[0].password } })
    component.find("form").simulate("submit");

    console.log("onClickMock.mock", onSubmitMock.mock)
    expect(onSubmitMock).toBeCalled()
  });
});