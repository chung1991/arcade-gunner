/**
 * Created by nguyenhieu on 11/16/15.
 */
var res = {
    player_head_atlas: "resources/HD/player/head/head.atlas",
    player_head_json: "resources/HD/player/head/head.json",
    player_head_png: "resources/HD/player/head/head.png",

    player_flag_atlas: "resources/HD/player/flag/flag.atlas",
    player_flag_json: "resources/HD/player/flag/flag.json",
    player_flag_png: "resources/HD/player/flag/flag.png",

    player_mobile_atlas: "resources/HD/player/mobile/mobile.atlas",
    player_mobile_json: "resources/HD/player/mobile/mobile.json",
    player_mobile_png: "resources/HD/player/mobile/mobile.png",

    player_body_atlas: "resources/HD/player/body/body.atlas",
    player_body_json: "resources/HD/player/body/body.json",
    player_body_png: "resources/HD/player/body/body.png",

    bg: "resources/HD/bg/bg1.png"
};

var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}