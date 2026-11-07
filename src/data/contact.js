// Contact details, stored base64-encoded and only decoded in the browser after the page loads
// (see src/hooks/useContact.js). Scrapers that read the raw HTML or grep the JavaScript bundle
// for an address or a wa.me number therefore find nothing. This stops naive harvesters, not
// someone who runs the page, which is the point: the chat is the front door.
//
// To change a value, encode the new one and paste it here:
//   node -e "console.log(btoa('new value'))"
// `whatsapp` is the number in international format with no + or spaces.
export const encodedContact = {
  email: 'am9yZWRoZXIzMEBnbWFpbC5jb20=',
  whatsapp: 'NTczMTI3MTQ0NDQ3',
};
