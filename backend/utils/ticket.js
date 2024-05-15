const generateTicket = (cart) => {
    let ticket = '<h2>Ticket de compra</h2>';
    cart.forEach(item => {
      ticket += `
        <p>Producto: ${item.name}</p>
        <p>Precio: ${item.price}</p>
        <p>Cantidad: ${item.quantity}</p>
      `;
    });
    return ticket;
  };
  
  module.exports = { generateTicket };
  