import configs from "../config"

export default function isBlackFriday(): boolean {
  if (!configs.blackFridayDate) {
    return false
  }

  const blackFriday = new Date(configs.blackFridayDate).toDateString();
  const today = new Date().toDateString();

  return blackFriday === today;
}
