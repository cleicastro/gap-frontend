export const ACTION = {
  DATE_PAY: 'DATE_PAY'
};

const INITIAL_STATE = {
  datePayment: new Date(
    `${new Date(new Date()).toString().split('GMT')[0]} UTC`
  )
    .toISOString()
    .split('.')[0]
};

export const datePaymentDam = (state = INITIAL_STATE, action) => {
  switch (action) {
    case ACTION.DATE_PAY:
      return {
        datePayment: action.payload
      };
    default:
      return state;
  }
};
