class CohereAPI {

    constructor() {
        this.apiKEY = '';
        this.model = 'command-r';
    }

    getInfo() {

        return {
            id: 'cohereapi',
            name: 'Cohere API',
            blocks: [
                {
                    opcode: 'genText',
                    blockType: Scratch.BlockType.REPORTER,
                    text: 'Cohereに [PROMPT] を送信',
                    arguments: {
                        PROMPT: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: 'Hello Cohere!!'
                        }
                    }
                },
                {
                    opcode: 'apiKeyUse',
                    blockType: Scratch.BlockType.COMMAND,
                    text: 'APIキー [APIKEY] を使用する',
                    arguments: {
                        APIKEY: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: ''
                        }
                    }
                },
                {
                    opcode: 'modelUse',
                    blockType: Scratch.BlockType.COMMAND,
                    text: 'モデル [MODEL] を使用する',
                    arguments: {
                        MODEL: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: 'command-r'
                        }
                    }
                },
                {
                    opcode: 'getApiKey',
                    blockType: Scratch.BlockType.REPORTER,
                    text: 'APIキー',
                    arguments: {
                    }
                },
                {
                    opcode: 'getModel',
                    blockType: Scratch.BlockType.REPORTER,
                    text: 'モデル',
                    arguments: {
                    }
                }
            ]
        };

    }

    async genText(args) {
        const prompt = args.PROMPT.trim();

        if (!prompt) {
            return "エラー: プロンプトが空です";
        }

        if (!this.apiKey) {
            return "エラー: 使用するapiKeyを記入してから実行してください";
        }

        if (!this.model) {
            return "エラー: 使用するモデルを記入してから実行してください";
        }

        const response = await fetch("https://api.cohere.com/v2/chat", {
            method: "POST",
            headers: {
                "Authorization": `"Bearer ${this.apiKey}`,
                "X-Client-Name": "CohereAPI",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "stream": false,
                "model": this.model,
                "messages": [
                    {
                        "role": "user",
                        "content": prompt
                    }
                ]
            }),
        });

        const body = await response.json();
        return body.message.content[0].text;

    }

    async apiKeyUse(args) {
        this.apiKey = args.APIKEY;
    }

    async modelyUse(args) {
        this.model = args.MODEL;
    }

    async getApiKey() {
        return this.apiKey || '';
    }

    async getModel() {
        return this.model || '';
    }

}

Scratch.extensions.register(new CohereAPI());