const http = require("http");
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
        var content = msg.content.toLowerCase().indexOf(x)
        if(y==true){
            y=content
        }else{
            y=content>-1
        }
        return y
    }
    switch(true){
        case msg.search('shinobi on mobile'):case msg.search('shinobi on the go'):case msg.search('shinobi mobile'):
            msg.theReply='This is what you probably want http://shinobi.video/articles/2017-08-03-shinobi-on-the-go'
        break;
        case msg.search('/search ')&&msg.search('/search',true)===0:
            msg.content=msg.content.replace('/search ','').trim()
            if(msg.content==''){
                return
            }
            http.get('http://shinobi.video/articles/search?search='+msg.content, function(data) {
                data.setEncoding('utf8');
                var chunks='';
                data.on('data', (chunk) => {
                    chunks+=chunk;
                });
                data.on('end', () => {
                    try{
                        chunks=JSON.parse(chunks)
                        if(chunks.ok===true&&chunks.articles.length>0){
                            msg.theReply='Here try one of these links :\n'
                            chunks.articles.forEach(function(v){
                                msg.theReply+='http://shinobi.video/articles/'+v.id+'\n'
                            })
                        }
                    }catch(er){
                        console.log(er)
                    }
                    if(!msg.theReply){
                        msg.theReply='Sorry there aren\'t results for your search'
                    }
                    msg.reply(msg.theReply);
                });

            }).on('error', function(e) {

            }).end();
        break;
        case !msg.search('://')&&msg.search('?')&&(msg.search('<@264820556375916546>')||msg.search('@moeiscool')):
            if(!s.oneTimeMessages[foundTerm]){s.oneTimeMessages[foundTerm]={}}
            if(!s.oneTimeMessages[foundTerm][msg.username]){
                s.oneTimeMessages[foundTerm][msg.username]=1
                msg.theReply='Hi there! If you are looking for Moe please know that developer support provided in the Shinobi CE chat is a curteousy. Please ask the question without "@moeiscool" so that others feel okay to answer :smile:. Before asking for help please review the docs http://shinobi.video/docs/. If you would like direct support from a developer please consider a Support Package http://billing.place/cart/shinobi/ or Shinobi Pro http://billing.place/cart/shinobi-pro/. If you would like to make a business proposal you can start a direct message with Moe or fill out the contact form. http://shinobi.video/contact Thanks! :v::skin-tone-4: :sunglasses:'
            }
        break;
    }
    if(msg.theReply){
        msg.reply(msg.theReply);
    }
});
client.login(config.loginToken);