const http = require("http");
const symbols = require("./symbols");
const axios = require("axios");

global[symbols.whatsappInitialized] = false;

class Whatsapp {
  secretToken;
  securedPath;
  axios;

  defaultTemplate = {
    language: {
      code: "pt_BR",
      policy: "deterministic",
    },
  };

  start({ secretToken, securedPath }) {
    if (this.isStarted()) {
      throw new Error("Do not call .start() more than once");
    }

    if (!secretToken) throw new Error("secretToken is required");
    if (!securedPath) throw new Error("securedPath is required");

    this.secretToken = secretToken;
    this.securedPath = securedPath;

    this.axios = axios.create({
      baseURL: `https://graph.facebook.com/v15.0/${this.securedPath}/`,
      timeout: 5000,
      headers: { Authorization: `Bearer ${this.secretToken}` },
    });

    global[symbols.whatsappInitialized] = true;
  }

  isStarted() {
    return global[symbols.whatsappInitialized];
  }

  sendText(phone, text) {
    return this.axios.post("messages", {
      recipient_type: "individual",
      messaging_product: "whatsapp",
      to: phone,
      type: "text",
      text: {
        body: text,
      },
    });
  }

  sendTemplate(phone, template) {
    return this.axios.post("messages", {
      recipient_type: "individual",
      messaging_product: "whatsapp",
      to: phone,

      type: "template",
      template: { ...this.defaultTemplate, ...template },
    });
  }
}

module.exports = Whatsapp;
