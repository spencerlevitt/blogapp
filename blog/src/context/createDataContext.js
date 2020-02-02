import React, { useReducer } from "react";

export default (reducer, actions, initialState) => {
  //Context Context responsible for communicating to deeply nested objects
  //Inside this object, we get a provider, which accepts information and makes available
  //to child components
  const Context = React.createContext();

  const Provider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    // actions === { addBlogPost: (dispatch) => {return () => {} } }
    // Actions are bound to this copy of dispatch
    const boundActions = {};
    for (let key in actions) {
      // key === 'addBlogPost'
      boundActions[key] = actions[key](dispatch);
    }

    return (
      <Context.Provider value={{ state, ...boundActions }}>
        {children}
      </Context.Provider>
    );
  };

  return { Context, Provider };
};
