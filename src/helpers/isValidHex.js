export const isValidHex = word => new RegExp("^[0-9a-fA-F]{24}$").test(word);