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
        langauge?: {
            code: string;
            policy: string;
        }
        components: component[]
    }

    export interface Whatsapp {
        sendTemplate(phone: string, template: template);
        sendText(phone: string, text: string);
    }
}

declare var Whatsapp: WhatsappNamespace.Whatsapp;
export = Whatsapp;