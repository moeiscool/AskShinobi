const Discord = require("discord.js");
const client = new Discord.Client();
var config=require('./conf.json')
s={}
s.oneTimeMessages={}
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    s.clientTag=client.user.tag
});
client.on('message', msg => {
    msg.username=msg.author.username+'#'+msg.author.discriminator
    if(msg.username===s.clientTag){return}
    var foundTerm;
    msg.search=function(x,y){
        foundTerm=x;
        return msg.content.toLowerCase().indexOf(x)>-1
    }
    switch(true){
        case msg.search('shinobi mobile'):
            msg.theReply=''
        break;
        case msg.search('<@264820556375916546>'): case msg.search('@moeiscool'):
            if(!s.oneTimeMessages[foundTerm]){s.oneTimeMessages[foundTerm]={}}
            if(!s.oneTimeMessages[foundTerm][msg.username]){
                s.oneTimeMessages[foundTerm][msg.username]=1
                msg.theReply='Hi there! Shinobi CE is free, thus making it mostly "self-serve". If you are looking for Moe please know that developer support provided in the Shinobi CE chat is a curteousy. If you must speak with him please consider a Support Package http://billing.place/cart/shinobi/ or Shinobi Pro http://billing.place/cart/shinobi-pro/. If you would like to consult a business proposal you can start a direct message with him or fill out the contact form. http://shinobi.video/contact Thanks! :v::skin-tone-4: :sunglasses:'
            }
        break;
    }
    if(msg.theReply){
        msg.reply(msg.theReply);
    }
});
client.login(config.loginToken);