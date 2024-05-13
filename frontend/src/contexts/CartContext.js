/* import React, { createContext, useContext, useReducer } from 'react';

const CartContext = createContext();

const initialState = {
  items: [],
  total: 0
};

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM':
      const newItemPrice = parseFloat(action.payload.price) || 0;
      const newItemQuantity = parseInt(action.payload.quantity) || 0;
      return {
        ...state,
        items: [...state.items, {...action.payload, price: newItemPrice, quantity: newItemQuantity}],
        total: state.total + newItemPrice * newItemQuantity
      };
    case 'REMOVE_ITEM':
      const itemToRemove = state.items.find(item => item.id === action.payload.id);
      const itemTotal = itemToRemove ? itemToRemove.price * itemToRemove.quantity : 0;
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload.id),
        total: state.total - itemTotal
      };
    case 'CLEAR_CART':
      return initialState;
    default:
      return state;
  }
}

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Exportamos también una función helper para vaciar el carrito
  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  }

  return (
    <CartContext.Provider value={{ state, dispatch, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
 */







/* 
import React, { createContext, useContext, useReducer } from 'react';

const CartContext = createContext();

const initialState = {
  items: [],
  total: 0
};

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM':
      const newItemPrice = Math.max(0, parseFloat(action.payload.price));
      const newItemQuantity = Math.max(1, parseInt(action.payload.quantity));
      const newItem = {...action.payload, price: newItemPrice, quantity: newItemQuantity};
      return {
        ...state,
        items: [...state.items, newItem],
        total: state.total + newItemPrice * newItemQuantity
      };
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload.id),
        total: state.items.reduce((total, item) => {
          if (item.id !== action.payload.id) {
            return total + (item.price * item.quantity);
          }
          return total;
        }, 0)
      };
    case 'CLEAR_CART':
      return initialState;
    default:
      return state;
  }
}

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const clearCart = () => dispatch({ type: 'CLEAR_CART' });

  return (
    <CartContext.Provider value={{ state, dispatch, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
 */
/* 
import React, { createContext, useContext, useReducer } from 'react';

const CartContext = createContext();

const initialState = {
  items: [],
  total: 0
};

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM':
      const newItemPrice = Math.max(0, parseFloat(action.payload.price));
      const newItemQuantity = Math.max(1, parseInt(action.payload.quantity));
      const newItem = {...action.payload, price: newItemPrice, quantity: newItemQuantity};
      return {
        ...state,
        items: [...state.items, newItem],
        total: state.total + newItemPrice * newItemQuantity
      };
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload.id),
        total: state.items.reduce((total, item) => {
          if (item.id !== action.payload.id) {
            return total + (item.price * item.quantity);
          }
          return total;
        }, 0)
      };
    case 'CLEAR_CART':
      return initialState;
    default:
      return state;
  }
}

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const clearCart = () => dispatch({ type: 'CLEAR_CART' });

  return (
    <CartContext.Provider value={{ state, dispatch, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
 */

import React, { createContext, useContext, useReducer } from 'react';

const CartContext = createContext();

const initialState = {
  items: [],
  total: 0
};

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM':
      const newItemPrice = Math.max(0, parseFloat(action.payload.price));
      const newItemQuantity = Math.max(1, parseInt(action.payload.quantity));
      const newItem = {...action.payload, price: newItemPrice, quantity: newItemQuantity};
      return {
        ...state,
        items: [...state.items, newItem],
        total: state.total + newItemPrice * newItemQuantity
      };
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload.id),
        total: state.items.reduce((total, item) => {
          if (item.id !== action.payload.id) {
            return total + (item.price * item.quantity);
          }
          return total;
        }, 0)
      };
    case 'CLEAR_CART':
      return initialState;
    default:
      return state;
  }
}

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const clearCart = () => dispatch({ type: 'CLEAR_CART' });

  return (
    <CartContext.Provider value={{ state, dispatch, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
