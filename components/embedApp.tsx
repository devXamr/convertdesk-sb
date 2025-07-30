import React from "react";
import { createRoot } from "react-dom/client";
import PreviewChat from "./preview-chat";

export function renderConvertDeskChatbot(props: any) {
    const rootElementId = "convertdesk-chatbot-root";
    let container = document.getElementById(rootElementId);
    if (!container) {
        container = document.createElement("div");
        container.id = rootElementId;
        document.body.appendChild(container);
    }

    const root = createRoot(container);
    root.render(<PreviewChat {...props} />);
}
