export default function dateFormatPTBR(value) {
  if (value === '') {
    return 0;
  }

  let price = value;
  price = price.replace(/\D/g, '');
  price = (price / 100).toFixed(2);

  return price;
}
