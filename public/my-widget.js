(function () {
    console.log("ConvertDesk chat widget loaded!");

    const defaults = {
        botSize: 'large', // small | medium | large
        appearanceColor: '#007bff',
        companyName: 'ConvertDesk',
        chatbotName: 'AI Assistant',
        chatColor: '#333',
        welcomeMessages: [
            "Hey there! How can I help you?",
            "You can ask me anything you want about ConvertDesk."
        ],
        defaultMessages: [
            "Tell me about ConvertDesk",
            "What are the services of ConvertDesk?"
        ]
    };

    // Chat bubble
    const bubble = document.createElement("div");
    bubble.textContent = "💬";
    bubble.style.position = "fixed";
    bubble.style.bottom = "20px";
    bubble.style.right = "20px";
    bubble.style.width = "50px";
    bubble.style.height = "50px";
    bubble.style.backgroundColor = defaults.appearanceColor;
    bubble.style.color = "#fff";
    bubble.style.borderRadius = "50%";
    bubble.style.cursor = "pointer";
    bubble.style.display = "flex";
    bubble.style.justifyContent = "center";
    bubble.style.alignItems = "center";
    bubble.style.boxShadow = "0 2px 6px rgba(0,0,0,0.3)";
    bubble.style.zIndex = "1000";
    document.body.appendChild(bubble);

    // Chat window
    const chatWindow = document.createElement("div");
    chatWindow.style.position = "fixed";
    chatWindow.style.bottom = "80px";
    chatWindow.style.right = "20px";
    chatWindow.style.backgroundColor = "#f9f9f9";
    chatWindow.style.border = "1px solid #ccc";
    chatWindow.style.borderRadius = "8px";
    chatWindow.style.boxShadow = "0 2px 6px rgba(0,0,0,0.3)";
    chatWindow.style.zIndex = "1000";
    chatWindow.style.overflow = "hidden";
    chatWindow.style.display = "none";

    if (defaults.botSize === "large") {
        chatWindow.style.width = "450px";
        chatWindow.style.height = "600px";
    } else if (defaults.botSize === "small") {
        chatWindow.style.width = "300px";
        chatWindow.style.height = "400px";
    } else {
        chatWindow.style.width = "400px";
        chatWindow.style.height = "500px";
    }

    chatWindow.innerHTML = `
        <div style="background:${defaults.appearanceColor}; color:white; padding:10px; display:flex; align-items:center; gap:10px;">
            <div style="width:40px; height:40px; background:black; border-radius:50%;"></div>
            <div>${defaults.companyName}</div>
        </div>

        <div id="chat-content" style="height:calc(100% - 110px); overflow-y:auto; padding:10px;"></div>

        <form id="chat-form" style="display:flex; border-top:1px solid #ddd;">
            <input type="text" id="chat-input" placeholder="Type your message…" style="flex:1; padding:10px; border:none; outline:none;" />
            <button type="submit" style="background:white; color:gray; padding:0 15px; border:none; cursor:pointer;">➤</button>
        </form>

        <div style="text-align:center; font-size:12px; color:#666; padding:5px;">powered by ConvertDesk</div>
    `;

    document.body.appendChild(chatWindow);

    const chatContent = chatWindow.querySelector("#chat-content");
    const chatForm = chatWindow.querySelector("#chat-form");
    const chatInput = chatWindow.querySelector("#chat-input");

    // Add welcome messages
    defaults.welcomeMessages.forEach(msg => {
        const div = document.createElement("div");
        div.style.margin = "5px 0";
        div.style.color = defaults.chatColor;
        div.textContent = `${defaults.chatbotName}: ${msg}`;
        chatContent.appendChild(div);
    });

    // Add default suggestions
    if (defaults.defaultMessages.length > 0) {
        const suggestions = document.createElement("div");
        suggestions.style.display = "flex";
        suggestions.style.flexWrap = "wrap";
        suggestions.style.gap = "5px";
        suggestions.style.marginTop = "10px";

        defaults.defaultMessages.forEach(msg => {
            const button = document.createElement("button");
            button.textContent = msg;
            button.style.fontSize = "12px";
            button.style.padding = "3px 8px";
            button.style.border = "1px solid #ccc";
            button.style.borderRadius = "5px";
            button.style.background = "#eee";
            button.style.cursor = "pointer";
            button.addEventListener("click", () => {
                chatInput.value = msg;
                chatInput.focus();
            });
            suggestions.appendChild(button);
        });

        chatContent.appendChild(suggestions);
    }

    // Form submission
    chatForm.addEventListener("submit", e => {
        e.preventDefault();
        const message = chatInput.value.trim();
        if (!message) return;

        const userDiv = document.createElement("div");
        userDiv.style.margin = "5px 0";
        userDiv.style.textAlign = "right";
        userDiv.style.color = defaults.chatColor;
        userDiv.textContent = `You: ${message}`;
        chatContent.appendChild(userDiv);

        chatInput.value = "";

        chatContent.scrollTop = chatContent.scrollHeight;

        setTimeout(() => {
            const wrapper = document.createElement("div");

            const nameDiv = document.createElement("div");
            nameDiv.textContent = defaults.chatbotName;
            nameDiv.style.fontSize = "12px";
            nameDiv.style.marginLeft = "4px";
            nameDiv.style.marginTop = "12px";
            nameDiv.style.color = "#6B7280"; // text-gray-500
            nameDiv.style.fontWeight = "300"; // font-light
            wrapper.appendChild(nameDiv);

            const msgDiv = document.createElement("div");
            msgDiv.textContent = `Thanks for your message!`;
            msgDiv.style.fontSize = "14px";
            msgDiv.style.padding = "8px 16px";
            msgDiv.style.backgroundColor = "#F3F4F6"; // bg-gray-100
            msgDiv.style.borderTopRightRadius = "4px";
            msgDiv.style.borderBottomRightRadius = "4px";
            msgDiv.style.color = "#374151"; // text-gray-700
            msgDiv.style.maxWidth = "70%";
            msgDiv.style.display = "inline-block";
            msgDiv.style.marginTop = "4px";
            wrapper.appendChild(msgDiv);

            chatContent.appendChild(wrapper);

            chatContent.scrollTop = chatContent.scrollHeight;
        }, 500);
    });

    let isOpen = false;

    bubble.addEventListener("click", () => {
        isOpen = !isOpen;
        chatWindow.style.display = isOpen ? "block" : "none";
    });
})();
