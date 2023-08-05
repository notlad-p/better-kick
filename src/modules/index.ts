import general from "./general";
import player from "./player";
import settings from "./settings";
// TODO: move this to chat module
import './chat/chat.css'

console.log("Loading modules...");

player();

general();

// this needs to run last so that all settings events are registered
settings()
