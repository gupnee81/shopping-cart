import { store } from '../data';
import { size } from 'lodash';

class Checkout {
  constructor(pricingRules) {
    this.checkoutItems = [];
    this.pricingRules = pricingRules;
  }

  scanItems(productList) {
    let totalProductBySKU = [];
    for (let i = 0; i < store.length; i++) {
      totalProductBySKU.push({
        sku: store[i].sku,
        count: size(productList.filter(product => product.sku === store[i].sku))
      });
    }
    this.checkoutItems = totalProductBySKU;
  }

  total() {
    if (this.pricingRules) {
      return this.pricingRules.calculateTotal(this.checkoutItems);
    } else {
      return -1;
    }
  }
}

export default Checkout;
