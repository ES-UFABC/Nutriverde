import { IOrder } from "../interfaces";

const CART_KEY = "@nutriverde-cart";

export function getCart() {
  const cart = sessionStorage.getItem(CART_KEY);
  if (cart !== null) return JSON.parse(cart) as Array<IOrder>;
}

export function cleanCart() {
  sessionStorage.removeItem(CART_KEY);
}

export function contains(productId: number): boolean {
  const cart = getCart();
  let pedido;
  if (cart)
    pedido = cart.find((value) => {
      value.productId === productId;
    });
  if (pedido) return true;
  else return false;
}

export function remove(productId: number) {
  const cart = getCart();
  let new_cart;
  if (cart)
    new_cart = cart.map((value) => {
      if (value.productId === productId) return;
      return value;
    });
  sessionStorage.setItem(CART_KEY, JSON.stringify(new_cart));
}

export function addOrUpdate(productId: number, quantity: number) {
  if (contains(productId)) {
    remove(productId);
  }
  const cart = getCart();
  let new_cart: Array<IOrder> = [];
  if (cart) {
    new_cart = cart;
  }
  new_cart.push({ productId: productId, quantity: quantity });
  sessionStorage.setItem(CART_KEY, JSON.stringify(new_cart));
}

export function getItem(productId: number) {
  const cart = getCart();
  let pedido;
  if (cart)
    pedido = cart.find((value) => {
      value.productId === productId;
    });
  if (pedido) return pedido;

  return null;
}
