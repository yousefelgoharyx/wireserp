import { MantineProvider } from "@mantine/core";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { theme } from "./theme/mantine";
import rtlPlugin from "stylis-plugin-rtl";

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <MantineProvider
                withGlobalStyles
                emotionOptions={{ key: "mantine", stylisPlugins: [rtlPlugin] }}
                withNormalizeCSS
                theme={theme}
            >
                <App />
            </MantineProvider>
        </BrowserRouter>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
