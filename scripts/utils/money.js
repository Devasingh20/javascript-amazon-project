// export function formatPrice(priceCents) {
//   if (typeof priceCents !== 'number') {
//     throw new Error('Price must be a number');
//   }
//   return (priceCents / 100).toFixed(2);
// }

export default function formatPrice(priceCents) {
  if (typeof priceCents !== 'number') {
    throw new Error('Price must be a number');
  }
  return (Math.round(priceCents) / 100).toFixed(2);
}