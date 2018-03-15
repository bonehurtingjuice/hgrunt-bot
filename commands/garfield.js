const garfield = require("garfield");
const moment = require("moment");
const { Client, Message } = require("discord.js"); // eslint-disable-line no-unused-vars

exports.aliases = ["gf", "gar"];

/**
 * @param {Client} client
 * @param {Message} msg
 * @param {string[]} args
 */
exports.run = async (client, msg, args) => {
    msg.channel.startTyping();
    if (args.length === 0) {
        msg.channel.send({ files: [garfield.random()] }).catch(() => msg.channel.send("Failed to get random comic!"));
        msg.channel.stopTyping();
    } else if (args.length === 1) {
        try {
            if (args[0].startsWith("l")) {
                console.log(`https://d1ejxu6vysztl5.cloudfront.net/comics/garfield/${new Date().getFullYear()}/${moment().format("YYYY-MM-DD")}.gif`);
                await msg.channel.send({ files: [`https://d1ejxu6vysztl5.cloudfront.net/comics/garfield/${new Date().getFullYear()}/${moment().format("YYYY-MM-DD")}.gif`] });
                msg.channel.stopTyping();
                return;
            }

            if (!moment(args[0], moment.ISO_8601).isValid()) {
                msg.channel.send("```Usage: !garfield [latest] [YYYY-MM-DD]```");
                msg.channel.stopTyping();
                return;
            }

            const date = moment(args[0], moment.ISO_8601);

            if (date.isBefore(moment("1978-06-19", moment.ISO_8601))) {
                msg.channel.send("You can't search for comics earlier than 1978-06-19!");
                msg.channel.stopTyping();
                return;
            }
            
            await msg.channel.send({ files: [`https://d1ejxu6vysztl5.cloudfront.net/comics/garfield/${date.year()}/${date.format("YYYY-MM-DD")}.gif`] });
            msg.channel.stopTyping();
        } catch (err) {
            if (err) msg.channel.send(err.message);
            msg.channel.stopTyping();
        }
    } else {
        msg.channel.send("```Usage: !garfield [latest] [YYYY-MM-DD]```");
        msg.channel.stopTyping();
    }
};