const Discord = require('discord.js');
const client = new Discord.Client();
const twitch = require('twitch-auth');
const {ApiClient} = require('twitch');

const clientId = '';
const clientSecret = '';


const authProvider = new twitch.ClientCredentialsAuthProvider(clientId,clientSecret);
const apiClient = new ApiClient({authProvider});

async function isStreamLive(userName) {
	let user = await apiClient.helix.users.getUserByName(userName);
	if (!user) {
		return null;
	}
	return await user.getStream();
}


let userList = null;

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if (msg.content === 'ping') {
    msg.reply('Pong!');
  }

  if(msg.content === 'what is my avatar'){
      msg.reply(msg.author.displayAvatarURL());
  }

  if( msg.content === 'show guild' ){
      msg.channel.send(msg.guild);
  }

  if( msg.content === 'list users'){
      client.users.cache.forEach(user => {
        console.log(user.username)
      });
    }

   if( msg.content === 'show stream'){
      
    console.log('WE ARE GETTING INFORMATION ')
       isStreamLive('').then((user) =>{

        if( user === null ){
            console.log('Stream is not live');
        }
        else{
            console.log(JSON.stringify(user));

            let msgJSON ={
                embed:{
                   title:user._data.title,
                   description: user._data.user_name + " is LIVE and streaming " + user._data.game_name, 
                   image:{ url:""},
                   author:"Arska Bot for your service",
                   url:'https://twitch.tv/'+user._data.user_name
                }
            }
           msg.channel.send(msgJSON);      
          }       
       });
     
   }
   
   
});

client.login('');