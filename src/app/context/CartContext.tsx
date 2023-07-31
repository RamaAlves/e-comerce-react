import React, { useState } from "react";
import {
  ChildrenType,
  ProductSchema,
  CartProductSchema,
} from "../interfaces/interfaces";

export const CartContext = React.createContext<any>(null!);

export function CartProvider({ children }: ChildrenType) {
  //states
  //Items cart state
  const [items, setItems] = useState<CartProductSchema[]>([]);
  //Total price state
  const [total, setTotal] = useState<number>(0);

  //add quantity of a product
  function addItem(item: ProductSchema) {
    let updateItems: CartProductSchema[];
    //Check if the item exist in the cart
    const exist = items.some(
      (product: CartProductSchema) => product.id === item.id
    );
    // If exist plus 1 to quantity of item, else add item to cart
    if (exist) {
      updateItems = items.map((product: CartProductSchema) => {
        if (product.id === item.id) {
          product.quantity++;
        }
        return product;
      });
    } else {
      let newItem = { ...item, quantity: 1 };
      updateItems = [...items, newItem];
    }
    //set total price of update items
    updateTotal(updateItems);
    //set items in the cart
    setItems(updateItems);
  }

  //less quantity of a product
  function substractItem(id: number) {
    //sustract 1 to quantity of item
    const updateItems = items.map((product: CartProductSchema) => {
      if (product.id === id) {
        product.quantity--;
      }
      return product;
    });
    //Check quantity of items are greater than 0
    const toDelete = updateItems.some(
      (product: CartProductSchema) => product.quantity < 1
    );
    //If items to be removed
    if (toDelete) {
      //Identify item to delete
      const productFound = updateItems.find(
        (product: CartProductSchema) => product.quantity < 1
      );
      //Remove item
      if (productFound) {
        removeItem(productFound.id);
      }
    } else {
      //set total price of update items
      updateTotal(updateItems);
      //set items in the cart
      setItems(updateItems);
    }
  }

  //Delete an Item 
  function removeItem(id: number) {
    //Identify index of item to delete
    const index = items.findIndex((item: CartProductSchema) => item.id === id);
    //copy array items in updateItems
    const updateItems = items.slice();
    //remove item for index
    updateItems.splice(index, 1);
    //set total price of update items
    updateTotal(updateItems);
    //set items in the cart
    setItems(updateItems);
  }

  //Return total price of items in the cart
  function updateTotal(listaItems: CartProductSchema[]) {
    //temp variable
    let partial: number = 0;
    //sum of the value of all items
    listaItems.forEach((item) => {
      partial += item.price * item.quantity;
    });
    //set total
    setTotal(partial);
  }

  const value = { items, addItem, substractItem, removeItem, total };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
