import React, { createContext, useState, useEffect, useRef } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Axios from 'axios';

import { requestContribuinte } from '../store/contribuinteReducer';

export const ContribuinteContext = createContext();

const ContribuinteProvier = (props) => {
  const {
    children,
    requestContribuinte: handleRequestContribuinte,
    listContribuinte,
    pagination
  } = props;
  const [order, setOrder] = useState('id');
  const [sort, setSort] = useState(false);
  const [params, setParams] = useState({});
  const timerToClearSomewhere = useRef(false);

  useEffect(() => {
    const tokenContribuinte = Axios.CancelToken.source();
    function request(token) {
      return handleRequestContribuinte(
        {
          ...params,
          order,
          sort,
          page: 1
        },
        token.token
      );
    }
    if (Object.keys(params).length !== 0) {
      timerToClearSomewhere.current = setTimeout(() => {
        request(tokenContribuinte);
      }, 500);
    } else {
      request(tokenContribuinte);
    }

    return () => {
      tokenContribuinte.cancel('Request cancell');
      clearTimeout(timerToClearSomewhere.current);
    };
  }, [handleRequestContribuinte, order, sort, params]);

  function setPagination() {
    const tokenContribuinte = Axios.CancelToken.source();
    if (pagination.current_page < pagination.last_page) {
      handleRequestContribuinte(
        {
          ...params,
          order,
          sort,
          page: Number(pagination.current_page) + 1
        },
        tokenContribuinte.token
      );
    }
  }

  function handleOrderSort(campo, isDefaultOrder) {
    if (campo === order) {
      setSort((isSort) => !isSort);
    } else {
      setSort((isSort) => (isDefaultOrder ? true : !isSort));
      setOrder(campo);
    }
  }

  function handleParams(event) {
    const { id, value } = event.target;
    setParams((prev) => ({ ...prev, [id]: value }));
  }

  return (
    <ContribuinteContext.Provider
      value={{
        handleOrderSort,
        handleParams,
        setPagination,
        listContribuinte,
        order,
        sort,
        params,
        pagination
      }}>
      {children}
    </ContribuinteContext.Provider>
  );
};

const mapStateToProps = (state) => ({
  listContribuinte: state.contribuinte.listContribuinte,
  pagination: state.contribuinte.pagination
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      requestContribuinte
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContribuinteProvier);
