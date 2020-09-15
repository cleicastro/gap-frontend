export default function maskCEP(value) {
  if (value === '') {
    return 0;
  }

  const cep = value.replace(/D/g, '').replace(/^(\d{5})(\d)/, '$1-$2');

  return cep;
}
