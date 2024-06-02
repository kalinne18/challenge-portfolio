document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('formContato');
    const nome = document.getElementById('nome');
    const email = document.getElementById('email');
    const assunto = document.getElementById('assunto');
    const mensagem = document.getElementById('mensagem');
    const submitButton = document.querySelector('.formcontato__botao');

    function validateNome() {
        const errorNome = document.getElementById('error-nome');
        errorNome.textContent = ''; // Limpa mensagens de erro anteriores
        if (nome.value.trim() === '') {
            errorNome.textContent = 'O campo "Nome" não deve ser vazio.';
            return false;
        } else if (nome.value.length > 50) {
            errorNome.textContent = 'O campo "Nome" deve conter no máximo 50 caracteres.';
            return false;
        }
        return true;
    }

    function validateEmail() {
        const errorEmail = document.getElementById('error-email');
        errorEmail.textContent = ''; // Limpa mensagens de erro anteriores
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regex para validar formato de e-mail
        if (email.value.trim() === '') {
            errorEmail.textContent = 'O campo "E-mail" não deve ser vazio.';
            return false;
        } else if (!emailPattern.test(email.value)) {
            errorEmail.textContent = 'O campo "E-mail" deve estar em um formato válido.';
            return false;
        }
        return true;
    }

    function validateAssunto() {
        const errorAssunto = document.getElementById('error-assunto');
        errorAssunto.textContent = ''; // Limpa mensagens de erro anteriores
        if (assunto.value.trim() === '') {
            errorAssunto.textContent = 'O campo "Assunto" não deve ser vazio.';
            return false;
        } else if (assunto.value.length > 50) {
            errorAssunto.textContent = 'O campo "Assunto" deve conter no máximo 50 caracteres.';
            return false;
        }
        return true;
    }

    function validateMensagem() {
        const errorMensagem = document.getElementById('error-mensagem');
        errorMensagem.textContent = ''; // Limpa mensagens de erro anteriores
        if (mensagem.value.trim() === '') {
            errorMensagem.textContent = 'O campo "Mensagem" não deve ser vazio.';
            return false;
        } else if (mensagem.value.length > 300) {
            errorMensagem.textContent = 'O campo "Mensagem" deve conter no máximo 300 caracteres.';
            return false;
        }
        return true;
    }

    function validateForm() {
        const isNomeValid = validateNome();
        const isEmailValid = validateEmail();
        const isAssuntoValid = validateAssunto();
        const isMensagemValid = validateMensagem();

        submitButton.disabled = !(isNomeValid && isEmailValid && isAssuntoValid && isMensagemValid);
        return submitButton.disabled === false;
    }

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Impede o envio padrão do formulário

        if (validateForm()) {
            // Captura os valores do formulário
            const formData = {
                nome: nome.value,
                email: email.value,
                assunto: assunto.value,
                mensagem: mensagem.value
            };

            emailjs.send('service_n4vio7s', 'template_vi1ddwr', formData)
                .then(function(response) {
                    alert('Mensagem enviada com sucesso!', response.status, response.text);
                    form.reset();
                    submitButton.disabled = true; // Desativa o botão de enviar após o reset
                }, function(error) {
                    console.error('Erro ao enviar a mensagem:', error); // Log detalhado no console
                    alert('Erro ao enviar a mensagem.');
                });
        }
    });

    nome.addEventListener('input', validateForm);
    email.addEventListener('input', validateForm);
    assunto.addEventListener('input', validateForm);
    mensagem.addEventListener('input', validateForm);

    validateForm(); // Initial validation to disable the button if fields are empty
});