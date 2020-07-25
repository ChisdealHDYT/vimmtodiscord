const WebSocket = require('ws');
const Discord = require("discord.js");

const config = require("./config.json");

const chalk = require('chalk');
const clear = require('clear');

var vimmchannel = config.vimmtvuser

const bot = new Discord.Client({ disableEveryone: false });

bot.on('ready', () => {

    console.log(`
${chalk.grey('--------------------------------------------------')}
${chalk.yellow('              Welcome to VimmTV to Discord BOT ')}
${chalk.green('          This where Relay from VimmTV to Discord')}
${chalk.green('       BOT is Open source but not allowed steal CODES')}
${chalk.green(' All codes been made Copyrighted and Writen by ChisdealHDYT')}
${chalk.green('       Make sure Like this Project and Fork it if want.')}
${chalk.green('       Check BOT Creaotr Socials Below for Updates')}
${chalk.grey('--------------------------------------------------')}
`);

    console.log(`
${chalk.grey('--------------------------------------------------')}
${chalk.yellow('                   Creator Of BOT ')}
${chalk.green('            Username: ') + 'ChisdealHDYT#7172'}
${chalk.green('         Discord Link: ') + 'discord.gg/RYscPHc'}
${chalk.green('          Twitch: ') + 'twitch.tv/chisdealhdyt'}
${chalk.green('           VimmTV: ') + 'vimm.tv/chisdealhd'}
${chalk.green('         YouTube: ') + 'youtube.com/chisdealhd'}
${chalk.green('         Twitter: ') + 'twitter.com/chisdealhd'}
${chalk.grey('--------------------------------------------------')}
`);

console.log(`
${chalk.grey('--------------------------------------------------')}
${chalk.red('Discord Loaded, Connecting to '+vimmchannel+' VimmTV Chat')}
${chalk.yellow('                   Discord Data ')}
${chalk.green('              Username: ') + bot.user.username+'#'+bot.user.discriminator}
${chalk.green('              Discords Connected: ') + bot.guilds.cache.size}
${chalk.grey('--------------------------------------------------')}
`);

var ws = new WebSocket('wss://www.vimm.tv:9001/ws/chat/'+vimmchannel+'/', {
    rejectUnauthorized: false
  });
  
  
function connect() {
ws.on('open', function open() {
  console.log('Sucessfully connected to '+vimmchannel+' VIMMTV chat.');
  
    keepAlive();
    setInterval(function(){
        keepAlive();
    }, 30000);
});

ws.on('close', function close() {
  console.log('Chat socket closed unexpectedly');
  
    keepAlive();
    setTimeout(function() {
        connect();
    }, 3000);
});

ws.on('error', function error() {
    console.error('An error caused the chat client to disconnect.');
	
    ws.close();
});
 
ws.on('message', function (e) {
  var data = JSON.parse(e);
  
  let channel = bot.channels.cache.get(config.discordchannelid);
  
  channel.send("[VIMMTV] "+data.chatter+": "+data.message);
});

function keepAlive(){
    ws.send(JSON.stringify({
        'mtype': 'signal',
        'message': '',
        'chatter': vimmchannel,
        'channel': vimmchannel,
    }));
}
}

connect();
});

bot.login(config.token);
