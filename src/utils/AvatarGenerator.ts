import { generate } from "random-words";

export default function AvatarGenerator(text?: string) {
  // TODO: implement random text generator here for avatar
  return `https://api.multiavatar.com/${text || generate()}.png`;
}
