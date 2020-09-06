export default function damStatusEdit(response, type) {
  if (response.status === 200) {
    let damStatus = {};
    if (type === 'pay') {
      damStatus = { pago: true, status: 'Pago' };
    } else if (type === 'cancel') {
      damStatus = { status: 'Cancelado' };
    }

    return {
      damStatus,
      message: {
        message: `O status do DAM foi alterado para ${damStatus.status}`,
        type: type === 'pay' ? 'success' : 'warning',
        status: response.status
      }
    };
  }
  if (response.error) {
    const { status, data } = response.error.response;
    const messageResponse = response.message;
    const statusCode = `status code:  ${status}`;
    const mesError = data.erro ? data.erro.errorInfo.join(', ') : data.message;
    return {
      damStatus: null,
      message: {
        message: `${messageResponse}: ${statusCode} - message:  ${mesError}`,
        type: 'error',
        status
      }
    };
  }
  return {
    damStatus: null,
    message: {
      message: 'Falha no serviço',
      type: 'error',
      status: 501
    }
  };
}
