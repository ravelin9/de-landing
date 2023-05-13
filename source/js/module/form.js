const onEscKey = (evt) => evt.key === 'Escape' || evt.key === 'Esc';
const applicantForm = document.getElementById('modal__form');


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


const form = document.getElementById('modal__form');
const nameInput = document.getElementById('modal__name');
const emailInput = document.getElementById('modal__email');
const messageInput = document.getElementById('modal__message');
const submitButton = document.getElementById('modal__submit');

// Функция для проверки валидности email
const isEmailValid = (email) => {
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
}

// Функция для проверки валидности поля "Имя"
const isNameValid = (name) => {
    return name.trim().length > 0;
}

// Функция для проверки валидности поля "Сообщение"
const isMessageValid = (message) => {
    return message.trim().length > 0;
}

// Функция для обновления состояния кнопки "Отправить"
const updateSubmitButtonState = () => {
    if (isNameValid(nameInput.value) && isEmailValid(emailInput.value) && isMessageValid(messageInput.value)) {
        submitButton.removeAttribute('disabled');
    } else {
        submitButton.setAttribute('disabled', 'disabled');
    }
};


// Обновляем состояние кнопки при изменении полей формы
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


// Обрабатываем отправку формы
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
            // Удаляем лоадер в случае успешного ответа
            loader.remove();
            if (response.ok) {
                onShowPopupSuccess();
            } else {
                onShowPopupError();
            }
        })
        .catch(error => {
            // Удаляем лоадер в случае ошибки
            loader.remove();
            onShowPopupError();
        });
});



