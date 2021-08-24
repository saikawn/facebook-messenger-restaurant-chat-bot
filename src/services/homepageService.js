import request from "request";
import chatBotService from "../services/chatBotService";

require("dotenv").config();

const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;

let setUpMessengerPlatform = (PAGE_ACCESS_TOKEN) => {
    return new Promise((resolve, reject) => {
        try {
            let data = {
                "get_started": {
                    "payload": "GET_STARTED"
                },
                "persistent_menu": [
                    {
                        "locale": "default",
                        "composer_input_disabled": false,
                        "call_to_actions": [
                            {
                                "type": "web_url",
                                "title": "View Youtube Channel",
                                "url": "https://bit.ly/subscribe-haryphamdev",
                                "webview_height_ratio": "full"
                            },
                            {
                                "type": "web_url",
                                "title": "View Facebook Fan Page",
                                "url": "https://facebook.com/haryphamdev",
                                "webview_height_ratio": "full"
                            },
                            {
                                "type": "postback",
                                "title": "Restart the Bot",
                                "payload": "RESTART_CONVERSATION"
                            }
                        ]
                    }
                ],

                "whitelisted_domains": [
                    process.env.SERVER_URL                ]
            };

            request({
                "uri": "https://graph.facebook.com/v6.0/me/messenger_profile",
                "qs": { "access_token": PAGE_ACCESS_TOKEN },
                "method": "POST",
                "json": data
            }, (err, res, body) => {
                if (!err) {
                    resolve("setup done!");
                } else {
                    reject(err);
                }
            });

        } catch (e) {
            reject(e);
        }
    });
};

let sendResponseGreetings = (sender_psid, locale) => {
    return new Promise(async (resolve, reject) => {
        try {
            let URL = "";
            let text = "";
            if (locale === "es") {
                URL = "https://media0.giphy.com/media/eMBKXi56D0EXC/giphy.gif";
                text = `Hola. Bienvenido al restaurante de HaryPhamDev.\nI'm a chatbot. I can understand the sentences with the meaning: "greetings","thanks" and "bye"\n\nOr you can test me with these button below. Have fun! 😉`;
            } else if (locale === "fr") {
                URL = "https://media1.giphy.com/media/26tk02z9fVjkdTCr6/giphy.gif";
                text = `Salut. Bienvenue au restaurant de HaryPhamDev.\nI'm a chatbot. I can understand the sentences with the meaning: "greetings","thanks" and "bye"\n\nOr you can test me with these button below. Have fun! 😉`;
            } else if (locale === "de") {
                URL = "https://media2.giphy.com/media/9VrAK7bVIPOl23G4h3/giphy.gif?cid=ecf05e476622fe3568933b2bce30155a6a0d3fc6b6bfe52b&rid=giphy.gif";
                text = `Hallo. Willkommen im Restaurant von HaryPhamDev.\nI'm a chatbot. I can understand the sentences with the meaning: "greetings","thanks" and "bye"\n\nOr you can test me with these button below. Have fun! 😉`;
            } else {
                URL = "https://media2.giphy.com/media/OF0yOAufcWLfi/giphy.gif?cid=ecf05e47cdbf04565acc041633c39c5143828c34c09608f7&rid=giphy.gif";
                text = `Hi. Welcome to HaryPhamDev 's restaurant.\nI'm a chatbot. I can understand the sentences with the meaning: "greetings","thanks" and "bye"\n\nOr you can test me with these button below. Have fun! 😉`;
            }


            let response1 = {
                "attachment": {
                    "type": "image",
                    "payload": {
                        "url": URL
                    }
                }
            };


            let response2 = {
                "attachment": {
                    "type": "template",
                    "payload": {
                        "template_type": "button",
                        "text": text,
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "SHOW MAIN MENU",
                                "payload": "MAIN_MENU"
                            },
                            {
                                "type": "postback",
                                "title": "RESERVE A TABLE",
                                "payload": "RESERVE_TABLE",
                            }
                        ]
                    }
                }
            };

            await chatBotService.sendTypingOn(sender_psid);
            await chatBotService.sendMessage(sender_psid, response1);
            await chatBotService.sendTypingOn(sender_psid);
            await chatBotService.sendMessage(sender_psid, response2);

            resolve("done");
        } catch (e) {
            reject(e);
        }
    });
};

let sendResponseThanks = (sender_psid, locale) => {
    return new Promise(async (resolve, reject) => {
        try {
            let URL = "https://media3.giphy.com/media/Q7y3K35QjxCBa/giphy.gif?cid=ecf05e47095b476d732d1cc437dc8d5f7746edf2d2857ec2&rid=giphy.gif";
            let text = "";
            if (locale === "es") {
                text = `De nada! Or you can test me with these button below. Have fun! 😉`;
            } else if (locale === "fr") {
                URL = "https://media1.giphy.com/media/26tk02z9fVjkdTCr6/giphy.gif";
                text = `Vous êtes les bienvenus!\n\nOr you can test me with these button below. Have fun! 😉`;
            } else if (locale === "de") {
                text = `Bitte!\n\nOr you can test me with these button below. Have fun! 😉`;
            } else {
                text = `You're welcome!\n\nOr you can test me with these button below. Have fun! 😉`;
            }


            let response1 = {
                "attachment": {
                    "type": "image",
                    "payload": {
                        "url": URL
                    }
                }
            };


            let response2 = {
                "attachment": {
                    "type": "template",
                    "payload": {
                        "template_type": "button",
                        "text": text,
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "SHOW MAIN MENU",
                                "payload": "MAIN_MENU"
                            },
                            {
                                "type": "postback",
                                "title": "RESERVE A TABLE",
                                "payload": "RESERVE_TABLE",
                            }
                        ]
                    }
                }
            };

            await chatBotService.sendTypingOn(sender_psid);
            await chatBotService.sendMessage(sender_psid, response1);
            await chatBotService.sendTypingOn(sender_psid);
            await chatBotService.sendMessage(sender_psid, response2);
            resolve("done");
        } catch (e) {
            reject(e);
        }
    });
};

let sendResponseBye = (sender_psid, locale) => {
    return new Promise(async (resolve, reject) => {
        try {
            let URL = "https://media0.giphy.com/media/8JIRQqil8mvEA/200.webp?cid=ecf05e479d4d36068fd177fd8823a9f0e813bc694e40a567&rid=200.webp";
            let text = "";
            if (locale === "es") {
                text = `Adiós!\n\nOr you can test me with these button below. Have fun! 😉`;
            } else if (locale === "fr") {
                text = `Au revoir!\n\nOr you can test me with these button below. Have fun! 😉`;
            } else if (locale === "de") {
                text = `Tschüss!\n\nOr you can test me with these button below. Have fun! 😉`;
            } else {
                text = `Bye-bye!\n\nOr you can test me with these button below. Have fun! 😉`;
            }


            let response1 = {
                "attachment": {
                    "type": "image",
                    "payload": {
                        "url": URL
                    }
                }
            };

            let response2 = {
                "attachment": {
                    "type": "template",
                    "payload": {
                        "template_type": "button",
                        "text": text,
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "SHOW MAIN MENU",
                                "payload": "MAIN_MENU"
                            },
                            {
                                "type": "postback",
                                "title": "RESERVE A TABLE",
                                "payload": "RESERVE_TABLE",
                            }
                        ]
                    }
                }
            };

            await chatBotService.sendTypingOn(sender_psid);
            await chatBotService.sendMessage(sender_psid, response1);
            await chatBotService.sendTypingOn(sender_psid);
            await chatBotService.sendMessage(sender_psid, response2);
            resolve("done");
        } catch (e) {
            reject(e);
        }
    });
};

let sendGuideToUseBot = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {

            let response1 = {
                "text" : "မင်္ဂလာပါ Ooredoo B2B Sim Card ဆိုတာ" +
                    "\n\n🎯 ရက် ၃၀ စာအကျိုးခံစားခွင့်တွေနဲ့ စွယ်စုံသုံး အစီအစဉ် " +
                    "\n\n🎯 ဝယ်ယူထားတဲ့ အစီအစဉ်တွေနဲ့အတူ ၁၀၀% ဖုန်းဘေလ်ပြန်အမ်းငွေပြန်ရ " +
                    "\n\n🎯 နေ့စဉ် Free ပေးဒေတာနဲ့ ဖုန်းခေါ်ဆိုမှုများကုန်ဆုံးသွားပါလျှင် ပြန်အမ်းငွေ Bonus ထဲမှ ထပ်မံဝယ်ယူနိုင်ပြီး နောက်လအထိ ယူဆောင်သွားနိုင်ပါတယ် " +
                    "\n\n🔖⁠ Ooredoo Sim Card အသစ်တစ်ခုကို Free ရမည်ဖြစ်ပြီး ဝန်ထမ်းများကိုယ်တိုင် အစီအစဉ်ကို အခမဲ့ချိတ်ဆက်ဆောင်ရွက်ပေးနေပါသည်။ 😊"
            };
            let response2 = {
                text: "DIA WiFi (Dedicated Internet Access) ဆိုတာကတော့" +
                    "\n\nစီးပွားရေးလုပ်ငန်းတွေအတွက် Work from Home ကာလတွေကို Ooredoo Myanmar မှ လိုင်းဆွဲအားကောင်းပြီးငြိမ်တဲ့ DIA WiFi နဲ့ ဖြတ်သန်းလိုက်ပါ။ \n\nDedicated ဆိုတော့ upload speed နဲ့ download speed အတူတူရပါမယ်။" +
                    "\n\nSLA Agreement နဲ့ အာမခံချက်ပါသေးတယ်။ လိုင်းဝယ်ပြီး WiFi ပြန်ရောင်းရင်လည်း မဆိုးဘူးဆိုရမှာ 😁"
            };
            let response3 = {
                text:  "Ooredoo ရဲ့ Official Partner အနေနဲ့ နောက်ဆုံးပြောချင်တာတော့ \n\npromo,plan update လျှော့စျေးသတင်းနဲ့ product package အသစ်တွေအတွက် 🤠" +
                    "\n\nသတင်းမှန်မှန်ကန်ကန်ရနိုင်ဖို့ အောက်ပါလင့်နှိပ်ပြီး channel ကို join ပါ👇" +
                    "\nTelegram: \n👉 https://t.me/dream2reality" +
                    "\nViber Group: \n👉 https://invite.viber.com/?g2=AQBlOOzHLIrmtE3X8FkCE1dbuPwO4vNmo0Umm415sZMN2TEuM%2BkcKforc1O5sUqB"
                    
            };
            let response5 = {
                "attachment": {
                    "type": "template",
                    "payload": {
                        "template_type": "button",
                        "text": `B2B Sim Card နဲ့ DIA WiFi အသေးစိတ်ကို ပြန်သွားကြည့်မလား?`,
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "👉 ကြည့်မယ်",
                                "payload": "MAIN_MENU"
                            },
                            {
                                "type": "postback",
                                "title": "RESERVE A TABLE",
                                "payload": "RESERVE_TABLE",
                            }
                        ]
                    }
                }
            };

            await chatBotService.sendTypingOn(sender_psid);
            await chatBotService.sendMessage(sender_psid, response1);
            await chatBotService.sendTypingOn(sender_psid);
            await chatBotService.sendMessage(sender_psid, response2);
            await chatBotService.sendTypingOn(sender_psid);
            await chatBotService.sendMessage(sender_psid, response3);
            await chatBotService.sendTypingOn(sender_psid);
            await chatBotService.sendMessage(sender_psid, response5);

            resolve("done");
        } catch (e) {
            reject(e);
        }
    });
};
module.exports = {
    setUpMessengerPlatform: setUpMessengerPlatform,
    sendResponseGreetings: sendResponseGreetings,
    sendResponseThanks: sendResponseThanks,
    sendResponseBye: sendResponseBye,
    sendGuideToUseBot: sendGuideToUseBot
};
