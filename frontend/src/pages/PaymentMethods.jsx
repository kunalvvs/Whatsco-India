import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiCreditCard, FiPlus, FiTrash2, FiCheck } from 'react-icons/fi';
import './PaymentMethods.css';

function PaymentMethods() {
  const navigate = useNavigate();
  const [cards, setCards] = useState([
    {
      id: 1,
      type: 'Visa',
      last4: '4242',
      expiry: '12/25',
      isDefault: true
    },
    {
      id: 2,
      type: 'Mastercard',
      last4: '8888',
      expiry: '06/26',
      isDefault: false
    }
  ]);

  const [showAddCard, setShowAddCard] = useState(false);
  const [newCard, setNewCard] = useState({
    cardNumber: '',
    cardName: '',
    expiry: '',
    cvv: ''
  });

  const handleSetDefault = (cardId) => {
    setCards(cards.map(card => ({
      ...card,
      isDefault: card.id === cardId
    })));
  };

  const handleDeleteCard = (cardId) => {
    if (window.confirm('Are you sure you want to remove this card?')) {
      setCards(cards.filter(card => card.id !== cardId));
    }
  };

  const handleAddCard = (e) => {
    e.preventDefault();
    const newCardData = {
      id: Date.now(),
      type: newCard.cardNumber.startsWith('4') ? 'Visa' : 'Mastercard',
      last4: newCard.cardNumber.slice(-4),
      expiry: newCard.expiry,
      isDefault: cards.length === 0
    };
    setCards([...cards, newCardData]);
    setShowAddCard(false);
    setNewCard({ cardNumber: '', cardName: '', expiry: '', cvv: '' });
  };

  return (
    <div className="payment-methods-page">
      <div className="payment-header">
        <button className="back-btn" onClick={() => navigate('/account')}>
          <FiArrowLeft />
        </button>
        <h2>Payment Methods</h2>
        <div></div>
      </div>

      <div className="payment-content">
        <div className="cards-list">
          {cards.map(card => (
            <div key={card.id} className={`payment-card ${card.isDefault ? 'default' : ''}`}>
              <div className="card-header">
                <div className="card-type">
                  <FiCreditCard />
                  <span>{card.type}</span>
                </div>
                {card.isDefault && (
                  <span className="default-badge">
                    <FiCheck /> Default
                  </span>
                )}
              </div>
              <div className="card-number">**** **** **** {card.last4}</div>
              <div className="card-footer">
                <span className="card-expiry">Exp: {card.expiry}</span>
                <div className="card-actions">
                  {!card.isDefault && (
                    <button 
                      className="set-default-btn"
                      onClick={() => handleSetDefault(card.id)}
                    >
                      Set as Default
                    </button>
                  )}
                  <button 
                    className="delete-card-btn"
                    onClick={() => handleDeleteCard(card.id)}
                  >
                    <FiTrash2 />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {!showAddCard ? (
          <button className="add-card-btn" onClick={() => setShowAddCard(true)}>
            <FiPlus />
            Add New Card
          </button>
        ) : (
          <form className="add-card-form" onSubmit={handleAddCard}>
            <h3>Add New Card</h3>
            <div className="form-group">
              <label>Card Number</label>
              <input
                type="text"
                placeholder="1234 5678 9012 3456"
                maxLength="19"
                value={newCard.cardNumber}
                onChange={(e) => setNewCard({ ...newCard, cardNumber: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label>Cardholder Name</label>
              <input
                type="text"
                placeholder="John Doe"
                value={newCard.cardName}
                onChange={(e) => setNewCard({ ...newCard, cardName: e.target.value })}
                required
              />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Expiry Date</label>
                <input
                  type="text"
                  placeholder="MM/YY"
                  maxLength="5"
                  value={newCard.expiry}
                  onChange={(e) => setNewCard({ ...newCard, expiry: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>CVV</label>
                <input
                  type="password"
                  placeholder="123"
                  maxLength="3"
                  value={newCard.cvv}
                  onChange={(e) => setNewCard({ ...newCard, cvv: e.target.value })}
                  required
                />
              </div>
            </div>
            <div className="form-buttons">
              <button type="button" className="cancel-btn" onClick={() => setShowAddCard(false)}>
                Cancel
              </button>
              <button type="submit" className="submit-btn">
                Add Card
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default PaymentMethods;
