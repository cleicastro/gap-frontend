export default function messageResponseEdit(response) {
  if (response.status === 200) {
    return {
      message: response.data.message,
      type: 'success',
      status: response.status
    };
  }
  if (response.error) {
    const { status, data } = response.error.response;
    const messageResponse = response.message;
    const statusCode = `status code:  ${status}`;
    const mesError = data.erro ? data.erro.errorInfo.join(', ') : data.message;
    return {
      message: `${messageResponse}: ${statusCode} - message:  ${mesError}`,
      type: 'error',
      status
    };
  }
  return {
    message: 'Falha no serviço',
    type: 'error',
    status: 501
  };
}
