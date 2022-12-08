import React from 'react';

function ImagePopup({ isOpen, onClose, card }) {
    return(
        <section 
            className={`popup popup_type_image ${isOpen && "popup_opened"}`}
        >
            <div className="popup__wrapper">
                <figure className="popup__figure">
                    <img 
                        src={isOpen ? card.link : ''} 
                        alt={card.name} 
                        className="popup__image" 
                    />
                    <figcaption className="popup__caption">
                        {card.name}
                    </figcaption>
                </figure>
                <button 
                    type="button" 
                    className="popup__close-button" 
                    onClick={onClose} 
                />
            </div>
        </section>
    )
}

export default ImagePopup;