import { size } from 'lodash';
import { store } from '../data';
import { IPAD, MBP, ATV, VGA, min_ipd, min_atv  } from './constants';

export const cumulateProducts = (productList) => {
  let totalProductBySKU = [];
  for(let i = 0; i<store.length; i++) {
    totalProductBySKU.push({sku: store[i].sku, count: size(productList.filter((product) => product.sku === store[i].sku))});
  }
  console.log('totalProductBySKU    ', totalProductBySKU);
  return calculatePrice(totalProductBySKU);
}

// Business Rule 1 - we're going to have a 3 for 2 deal on Apple TVs. For example, if you buy 3 Apple TVs, you will pay the price of 2 only
// Business Rule 2 - the brand new Super iPad will have a bulk discounted applied, where the price will drop to $499.99 each, if someone buys more than 4
// Business Rule 3 - we will bundle in a free VGA adapter free of charge with every MacBook Pro sold
const calculatePrice = (items) => {
  let totalPrice = 0;
  let vgaNumber = 0;
  items.forEach(item => {
    if (item.sku === VGA) {
      vgaNumber = item.count;
    }
  });

  items.forEach(item => {
    if (item.sku === ATV) {
      let itemPrice = getPriceOfSKU(item.sku);
      let productsOnOffer, productsWithoutOffer;
      if (item.count >= min_atv) {
        productsOnOffer= parseInt(item.count / min_atv);
        productsWithoutOffer = item.count % min_atv;
        if(productsOnOffer != undefined) totalPrice += (itemPrice*2) * productsOnOffer;
        if(productsWithoutOffer != undefined) totalPrice += itemPrice * productsWithoutOffer;
      } else {
        totalPrice += item.count * itemPrice;
      }
    }

    if (item.sku === IPAD) {
      let itemPrice = getPriceOfSKU(item.sku);
      if (item.count > min_ipd) {
        itemPrice = 499.99;
      }
      totalPrice += itemPrice * item.count;
    }

    if (item.sku === MBP) {
      let itemPrice = getPriceOfSKU(item.sku);
      totalPrice += itemPrice * item.count;
      if (vgaNumber >= item.count) vgaNumber -= item.count;
      else vgaNumber = 0;
    }

    if (item.sku === VGA) {
      let itemPrice = getPriceOfSKU(item.sku);
      totalPrice += itemPrice * vgaNumber;
    }
  });

  console.log('totalPrice    ', totalPrice);
  return totalPrice;
}

const getPriceOfSKU = (sku) => {
  for (let i = 0; i < store.length; i++) {
    if (store[i].sku === sku) {
      return store[i].price;
    }
  }
  return -1;
}