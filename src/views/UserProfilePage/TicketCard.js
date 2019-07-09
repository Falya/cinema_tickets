import React from 'react';

const TicketCard = props => {
  const { children } = props;
  if (children.seatNumber) {
    return (
      <div className="ticket_card">
        <div className="seat">
          <span className="icon-ticket"></span>
          Row: <span>{children.rowNumber}</span> / Seat: <span>{children.seatNumber}</span>
        </div>
        <div className="price">Price: {children.price} BYN</div>
        <div className="type">{children.seatType}</div>
        <div className="buy_at">Buyed at: {new Date(children.buyingTime).toLocaleDateString()}</div>
      </div>
    );
  }
  return (
    <div className="feature_card">
      {children.products.map(({ product, amount }) => {
        return (
          <div className="feature_row">
            <div className="feature">
              <span className="icon-cart"></span>
              Product: <span>{product}</span>
            </div>
            <div className="price">
              Amount: <span>{amount}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TicketCard;
