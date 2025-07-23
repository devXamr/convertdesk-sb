(function () {
    console.log("ConvertDesk widget loaded!");

    const DEFAULT_SETTINGS = {
        botSize: "medium",
        placement: "bottom-right",
        appearanceColor: "#0d0872",
        chatbotName: "AI Bot",
        companyName: "ConvertDesk",
        chatColor: "#10B981",
        welcomeMessages: [
            "Hey there! How can I help you?",
            "You can ask me anything about ConvertDesk.",
        ],
        defaultMessages: [
            "Tell me about ConvertDesk",
            "What are the services of ConvertDesk?",
        ],
    };

    // Create chat bubble
    const bubble = document.createElement("div");
    bubble.textContent = "💬";
    bubble.style.position = "fixed";
    bubble.style.bottom = "20px";
    bubble.style[DEFAULT_SETTINGS.placement.includes("left") ? "left" : "right"] =
        "20px";
    bubble.style.padding = "12px";
    bubble.style.backgroundColor = DEFAULT_SETTINGS.appearanceColor;
    bubble.style.color = "#fff";
    bubble.style.borderRadius = "50%";
    bubble.style.cursor = "pointer";
    bubble.style.boxShadow = "0 2px 6px rgba(0,0,0,0.3)";
    bubble.style.zIndex = "1000";
    bubble.style.textAlign = "center";

    document.body.appendChild(bubble);

    // Create chat window (hidden by default)
    const chatWindow = document.createElement("div");
    chatWindow.style.position = "fixed";
    chatWindow.style.bottom = "80px";
    chatWindow.style[DEFAULT_SETTINGS.placement.includes("left") ? "left" : "right"] =
        "20px";
    chatWindow.style.width =
        DEFAULT_SETTINGS.botSize === "large"
            ? "450px"
            : DEFAULT_SETTINGS.botSize === "small"
                ? "300px"
                : "400px";
    chatWindow.style.height =
        DEFAULT_SETTINGS.botSize === "large"
            ? "600px"
            : DEFAULT_SETTINGS.botSize === "small"
                ? "400px"
                : "500px";
    chatWindow.style.backgroundColor = "#f9fafb";
    chatWindow.style.border = "1px solid #d1d5db";
    chatWindow.style.borderRadius = "6px";
    chatWindow.style.display = "none";
    chatWindow.style.flexDirection = "column";
    chatWindow.style.boxShadow = "0 4px 10px rgba(0,0,0,0.2)";
    chatWindow.style.zIndex = "1000";
    chatWindow.style.overflow = "hidden";

    document.body.appendChild(chatWindow);

    // Header
    const header = document.createElement("div");
    header.style.backgroundColor = DEFAULT_SETTINGS.appearanceColor;
    header.style.color = "#fff";
    header.style.padding = "10px";
    header.textContent =
        DEFAULT_SETTINGS.chatbotName + " - " + DEFAULT_SETTINGS.companyName;
    chatWindow.appendChild(header);

    // Messages area
    const messagesContainer = document.createElement("div");
    messagesContainer.style.flex = "1";
    messagesContainer.style.overflowY = "auto";
    messagesContainer.style.padding = "8px";
    chatWindow.appendChild(messagesContainer);

    // Welcome messages
    DEFAULT_SETTINGS.welcomeMessages.forEach((msg) => {
        const aiMsg = document.createElement("div");
        aiMsg.style.marginTop = "8px";
        aiMsg.style.marginLeft = "4px";
        aiMsg.style.fontSize = "12px";
        aiMsg.style.color = "gray";
        aiMsg.textContent = DEFAULT_SETTINGS.chatbotName;
        messagesContainer.appendChild(aiMsg);

        const aiBubble = document.createElement("div");
        aiBubble.style.fontSize = "14px";
        aiBubble.style.padding = "8px 12px";
        aiBubble.style.backgroundColor = "#f3f4f6";
        aiBubble.style.color = "#374151";
        aiBubble.style.borderRadius = "4px";
        aiBubble.style.maxWidth = "70%";
        aiBubble.style.width = "fit-content";
        aiBubble.textContent = msg;
        messagesContainer.appendChild(aiBubble);
    });

    // Default suggestion buttons
    const suggestionContainer = document.createElement("div");
    suggestionContainer.style.display = "flex";
    suggestionContainer.style.flexWrap = "wrap";
    suggestionContainer.style.gap = "4px";
    suggestionContainer.style.padding = "4px";
    DEFAULT_SETTINGS.defaultMessages.forEach((msg) => {
        const btn = document.createElement("div");
        btn.textContent = msg;
        btn.style.fontSize = "12px";
        btn.style.padding = "4px 8px";
        btn.style.backgroundColor = "#e5e7eb";
        btn.style.color = "#374151";
        btn.style.borderRadius = "4px";
        btn.style.cursor = "pointer";
        suggestionContainer.appendChild(btn);

        btn.addEventListener("click", () => {
            messageInput.value = msg;
        });
    });
    chatWindow.appendChild(suggestionContainer);

    // Input
    const form = document.createElement("form");
    form.style.display = "flex";
    form.style.borderTop = "1px solid #d1d5db";
    const messageInput = document.createElement("input");
    messageInput.placeholder = "Type your message here…";
    messageInput.style.flex = "1";
    messageInput.style.padding = "10px";
    messageInput.style.border = "none";
    messageInput.style.outline = "none";
    const sendBtn = document.createElement("button");
    sendBtn.type = "submit";
    sendBtn.textContent = "Send";
    sendBtn.style.background = "#fff";
    sendBtn.style.color = "#6b7280";
    sendBtn.style.padding = "0 12px";
    form.appendChild(messageInput);
    form.appendChild(sendBtn);
    chatWindow.appendChild(form);

    const footer = document.createElement("div");
    footer.style.textAlign = "center";
    footer.style.fontSize = "12px";
    footer.style.padding = "4px 0";
    footer.style.color = "#6b7280"; // Tailwind text-gray-500
    footer.style.fontWeight = "300";
    footer.style.display = "flex";
    footer.style.justifyContent = "center";
    footer.style.alignItems = "center";
    footer.innerHTML = `
    <img src="/convertdesklogo.png" alt="convertdesk logo" style="width: 24px; margin-right: 4px;" />
    powered by ConvertDesk
`;

    chatWindow.appendChild(footer);

    function clearSuggestionsAndWelcome() {
        suggestionContainer.style.display = "none";
    }

    // Bubble click toggles chat
    bubble.addEventListener("click", () => {
        chatWindow.style.display =
            chatWindow.style.display === "none" ? "flex" : "none";
    });

    // Handle user message submit
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const msg = messageInput.value.trim();
        if (!msg) return;

        clearSuggestionsAndWelcome();

        // user message
        const userBubble = document.createElement("div");
        userBubble.style.fontSize = "14px";
        userBubble.style.padding = "8px 12px";
        userBubble.style.marginTop = "8px";
        userBubble.style.backgroundColor = DEFAULT_SETTINGS.chatColor;
        userBubble.style.color = "#fff";
        userBubble.style.borderRadius = "4px";
        userBubble.style.maxWidth = "70%";
        userBubble.style.width = "fit-content";
        userBubble.style.marginLeft = "auto";
        userBubble.textContent = msg;
        messagesContainer.appendChild(userBubble);

        messageInput.value = "";

        // mock AI reply
        setTimeout(() => {
            const aiMsg = document.createElement("div");
            aiMsg.style.marginTop = "8px";
            aiMsg.style.marginLeft = "4px";
            aiMsg.style.fontSize = "12px";
            aiMsg.style.color = "gray";
            aiMsg.textContent = DEFAULT_SETTINGS.chatbotName;
            messagesContainer.appendChild(aiMsg);

            const aiBubble = document.createElement("div");
            aiBubble.style.fontSize = "14px";
            aiBubble.style.padding = "8px 12px";
            aiBubble.style.backgroundColor = "#f3f4f6";
            aiBubble.style.color = "#374151";
            aiBubble.style.borderRadius = "4px";
            aiBubble.style.maxWidth = "70%";
            aiBubble.style.width = "fit-content";
            aiBubble.textContent = "This is a mock reply.";
            messagesContainer.appendChild(aiBubble);
        }, 1000);
    });
})();


