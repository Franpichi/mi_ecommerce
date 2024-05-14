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

/* import React, { createContext, useContext, useReducer } from 'react';

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

export const useCart = () => useContext(CartContext); */

import React, { createContext, useContext, useReducer } from 'react';

const CartContext = createContext();

const initialState = {
  items: [],
  total: 0
};

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM':
      const existingItemIndex = state.items.findIndex(item => item.id === action.payload.id);
      if (existingItemIndex > -1) {
        const updatedItems = state.items.map(item => 
          item.id === action.payload.id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
        );
        const newTotal = updatedItems.reduce((total, item) => total + item.price * item.quantity, 0);
        return { ...state, items: updatedItems, total: newTotal };
      } else {
        const newItem = { ...action.payload, quantity: 1 };
        const newItems = [...state.items, newItem];
        const newTotal = newItems.reduce((total, item) => total + item.price * item.quantity, 0);
        return { ...state, items: newItems, total: newTotal };
      }
    case 'REMOVE_ITEM':
      const remainingItems = state.items.filter(item => item.id !== action.payload.id);
      const newTotalAfterRemoval = remainingItems.reduce((total, item) => total + item.price * item.quantity, 0);
      return { ...state, items: remainingItems, total: newTotalAfterRemoval };
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

