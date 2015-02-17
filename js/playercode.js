/*
* jQuery Craftlandia Player v1.2.0
* http://forum.craftlandia.com.br
*
* Copyright 2014, DeathStroker
* Released under the GNU license
*/
//<![CDATA[
$(document).ready(function(){
	var stream = {
		title: "Rádio CraftLandia",
		mp3: "http://74.91.117.97:8000/;stream/1",
	},
	ready = false,
	eurlattempts = 0;

	$("#craftlandia_player").jPlayer({
		ready: function (event) {
			if ($.cookie('radio_player') == undefined){
				$(this).jPlayer("setMedia", stream).jPlayer("play");
			}
				
			if ($.cookie('radio_player') == "play"){
				$(this).jPlayer("setMedia", stream).jPlayer("play");
			}else{
				if ($.cookie('radio_player') == "pause"){
					$(this).jPlayer("setMedia", stream);
				}
			}
			//$.dbg('ready');
		},
		play: function(){
			$.cookie('radio_player', 'play', { expires: 7 });
		},
		pause: function() {
			$.cookie('radio_player', 'pause', { expires: 7 });
			$(this).jPlayer("clearMedia");
			$(this).jPlayer("setMedia", stream);
			//$.dbg('pause');
		},
		error: function(event) {
			if (ready && event.jPlayer.error.type == $.jPlayer.error.URL && eurlattempts<5) {
				var self = this;
				eurlattempts++;

				setTimeout(function(){
					$(self).jPlayer("setMedia", stream).jPlayer("play");
				},1000);
			} else if (ready && event.jPlayer.error.type === $.jPlayer.error.URL_NOT_SET) {
				// Setup the media stream again and play it.
				$(this).jPlayer("setMedia", stream).jPlayer("play");
			} else {
				eurlattempts = 0;
				$('#jp_container_1 .jp-info-bar').text('Error: '+event.jPlayer.error.message+' '+event.jPlayer.error.hint+' ('+event.jPlayer.error.type+' context '+event.jPlayer.error.context+')' + ( event.jPlayer.error.type === $.jPlayer.error.URL_NOT_SET ? 'Y':'N') );
			}
		},
		swfPath: "http://localhost/mini-player/js/player.swf",
		supplied: "mp3",
		solution: "flash,html",
		wmode: "window",
		useStateClassSkin: true,
		autoBlur: false,
		smoothPlayBar: true,
		keyEnabled: true,
		remainingDuration: true,
		toggleDuration: true
	});
});
//]]>