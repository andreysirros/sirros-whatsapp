declare namespace WhatsappNamespace {
    interface component {
        type: string;
        sub_type?: string;
        index?: string;
        parameters?: {
            type: string;
            text: string;
        }[]
    }

    interface template {
        name: string;
        language?: {
            code: string;
            policy: string;
        }
        components: component[]
    }

    export interface Whatsapp {
        sendTemplate(phone: string, template: template);
        sendText(phone: string, text: string);
        start(obj: { secretToken: string, securedPath: string })
    }
}

declare var Whatsapp: WhatsappNamespace.Whatsapp;
export = Whatsapp;
