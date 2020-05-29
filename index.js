
const Discord = require('discord.js');
const download = require('download-file');
const webp = require('webp-converter');
const fs = require('fs')
const PNG = require('pngjs').PNG;
const pixelmatch = require('pixelmatch');
const client = new Discord.Client();
var imageURL;




var options = {
    directory: "",
    filename: "image.webp"
}







client.on('message', msg => {
if (msg.author.bot) return;
if (msg.channel.type == "dm") return;


imageURL = msg.author.displayAvatarURL();
download(imageURL, options, function() {
  webp.dwebp("image.webp","image.png","-o",function(status,error)
    {
    	console.log(status,error);
      checkImage();
    });
});




function checkImage() {





  const img1 = PNG.sync.read(fs.readFileSync('image.png'));
  const img2 = PNG.sync.read(fs.readFileSync('originalImage.png'));
  const {width, height} = img1;
  const diff = new PNG({width, height});

  var pixels = pixelmatch(img1.data, img2.data, diff.data, width, height, {threshold: 0.1});
console.log(pixels);
  if (pixels < 10000) {
        console.log("true");
      }
      else {
        console.log("false");
        let channel = msg.channel;
channel.createInvite({unique: true})
.then(invite => {
        msg.author.send("You are not using the correct profile picture, set your profile picture to the image below. You may do slight edits as long as its not too drastic. (for refrence, your pixel amount was " + pixels + " which is over the allowed amount) and then rejoin the discord https://discord.gg/" + invite.code,  {files: [__dirname+"\\originalImage.png"]});
        setTimeout(kickUser,1000);
      });
      }

fs.unlinkSync(__dirname+"\\image.png");
fs.unlinkSync(__dirname+"\\image.webp");

}


function kickUser() {
  var user = msg.author;
  var member = msg.guild.member(user);
  member.kick();
}
});















client.login("NzE1NjUzNjA5MjAyNzc4MTc0.XtAWaA.PG7pe3f_9WGiXggnK7g0lV7mvTM");
