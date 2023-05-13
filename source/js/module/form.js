const form = document.getElementById('modal__form');
const nameInput = document.getElementById('modal__name');
const emailInput = document.getElementById('modal__email');
const messageInput = document.getElementById('modal__message');
const submitButton = document.getElementById('modal__submit');

const onEscKey = (evt) => evt.key === 'Escape' || evt.key === 'Esc';

const onClickAndKeydown = (messageType) => {
    messageType.addEventListener('click', () => {
        messageType.remove();
    });

    document.addEventListener('keydown', (evt) => {
        if (onEscKey(evt)) {
            messageType.remove();
        }
    });
};


const onShowPopupSuccess = () => {
    const successFormTemplate = document.querySelector('#success')
        .content
        .querySelector('.modal-content__message--success');
    const successMessage = successFormTemplate.cloneNode(true);
    document.body.appendChild(successMessage);
    onClickAndKeydown(successMessage);
};

const onShowPopupError = () => {
    const errorFormTemplate = document.querySelector('#error')
        .content
        .querySelector('.modal-content__message--error');
    const errorMessage = errorFormTemplate.cloneNode(true);
    document.body.appendChild(errorMessage);
    onClickAndKeydown(errorMessage);
};


const isEmailValid = (email) => {
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
}

const isNameValid = (name) => {
    return name.trim().length > 0;
}

const isMessageValid = (message) => {
    return message.trim().length > 0;
}
const updateSubmitButtonState = () => {
    if (isNameValid(nameInput.value) && isEmailValid(emailInput.value) && isMessageValid(messageInput.value)) {
        submitButton.removeAttribute('disabled');
    } else {
        submitButton.setAttribute('disabled', 'disabled');
    }
};


nameInput.addEventListener('input', updateSubmitButtonState);
emailInput.addEventListener('input', updateSubmitButtonState);
messageInput.addEventListener('input', updateSubmitButtonState);


nameInput.addEventListener('blur', () => {
    nameInput.classList.toggle('invalid', !isNameValid(nameInput.value));
});

emailInput.addEventListener('blur', () => {
    emailInput.classList.toggle('invalid', !isEmailValid(emailInput.value));
});

messageInput.addEventListener('blur', () => {
    messageInput.classList.toggle('invalid', !isMessageValid(messageInput.value));
});


form.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(form);

    const loader = document.createElement('div');
    loader.classList.add('loader');
    document.body.appendChild(loader);

    fetch('https://httpbin.org/post', {
        method: 'POST',
        body: formData,
    })
        .then(response => {
            loader.remove();
            if (response.ok) {
                onShowPopupSuccess();
            } else {
                onShowPopupError();
            }
        })
        .catch(error => {
            loader.remove();
            onShowPopupError();
        });
});



