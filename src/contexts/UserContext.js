import React, { createContext, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { register, cleanMessgeUser } from '../store/loginRedux';

export const UserContext = createContext();

const UserProvider = ({
  children,
  createUser,
  error,
  register: handleRegister,
  cleanMessgeUser: actionCleanDataUser
}) => {
  const [load, setLoad] = useState(false);
  const [messageBackend, setMessageBackend] = useState('');

  useEffect(() => {
    if (error) {
      setMessageBackend(error);
    }

    if (createUser) {
      setMessageBackend(createUser);
    }
    actionCleanDataUser();
    setLoad(false);
  }, [actionCleanDataUser, createUser, error]);

  function handleCreateUser(value) {
    setLoad(true);
    handleRegister(value);
  }
  return (
    <UserContext.Provider value={{ handleCreateUser, load, messageBackend }}>
      {children}
    </UserContext.Provider>
  );
};

const mapStateToProps = (state) => ({
  createUser: state.auth.createUser,
  error: state.auth.error
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      register,
      cleanMessgeUser
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(UserProvider);
