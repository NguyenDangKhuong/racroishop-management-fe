export const currencyFormat = (num: number) =>
  num.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })
