let userName = "";

/* funçao para abrir uma janela de chat */
function toggleChat() {
    document.getElementById("chat-box").classList.toggle("hidden");
    document.getElementById("chat-box").classList.toggle("opacity-0");
    if (!userName) {
        askUserName();
    }
}

/* adicionar o nome do usuario para interaçao */
function askUserName() {
    let chatBody = document.getElementById("chat-body");
    chatBody.innerHTML = "";
    let namePrompt = document.createElement("div");
    namePrompt.className = "text-sm bg-gray-200 p-2 rounded-lg mb-2 self-start max-w-[80%]";
    namePrompt.innerText = "Olá! Qual é o seu nome? 😊";
    chatBody.appendChild(namePrompt);
}

function setUserName() {
    let nameInput = document.getElementById("name-input").value.trim();
    if (nameInput) {
        userName = nameInput;
        let chatBody = document.getElementById("chat-body");
        chatBody.innerHTML = "";
        let welcomeMessage = document.createElement("div");
        welcomeMessage.className = "text-sm bg-gray-200 p-2 rounded-lg mb-2 self-start max-w-[80%]";
        welcomeMessage.innerText = `Olá ${userName}, como você está? Como posso te ajudar? 😊`;
        chatBody.appendChild(welcomeMessage);
        document.getElementById("name-form").classList.add("hidden");
        document.getElementById("options").classList.remove("hidden");
    }
}

/*  mensagem para o chat */
function sendMessage(option) {
    let chatBody = document.getElementById("chat-body");
    let messages = {
        'cardapio': "Nosso cardápio tem os melhores burgers! Confira aqui: <a href='../cardapio.html' target='_blank' class='text-[#d4a373]'>cardapioBBB</a> 🍔",
        'localizacao': "Estamos na Rua das Estrelas, 123, Centro. Nosso horário de funcionamento é das 18h às 23h. 📍",
        'pagamento': "Aceitamos Pix, cartão de crédito, débito e dinheiro! 💳",
        'pedido': "Para saber o status do seu pedido, acesse este link: <a href='#' target='_blank' class='text-[#d4a373]'>rastreioBBB</a> 🚚"
    };

    /* mensagem do usuario */
    let userMessage = document.createElement("div");
    userMessage.className = "text-sm bg-[#d4a373] text-white p-2 rounded-lg mb-2 self-end max-w-[80%]";
    userMessage.innerText = option;
    chatBody.appendChild(userMessage);

    /* pontinhos para informar q o chat esta digitando */
    let typingIndicator = document.createElement("div");
    typingIndicator.className = "text-sm bg-gray-200 p-2 rounded-lg mb-2 self-start max-w-[80%] flex items-center";
    typingIndicator.innerHTML = "<span class='dot'></span> <span class='dot'></span> <span class='dot'></span>";
    chatBody.appendChild(typingIndicator);
    chatBody.scrollTop = chatBody.scrollHeight;

    setTimeout(() => {
        chatBody.removeChild(typingIndicator);

        let botMessage = document.createElement("div");
        botMessage.className = "text-sm bg-gray-200 p-2 rounded-lg mb-2 self-start max-w-[80%]";
        botMessage.innerHTML = messages[option];
        chatBody.appendChild(botMessage);
        chatBody.scrollTop = chatBody.scrollHeight;
    }, 2000);
}
