// Relying Party
// See https://developer.mozilla.org/en-US/docs/Web/API/Web_Authentication_API

// Human-readable title for your website
export const rpName = 'SimpleWebAuthn Example';
// A unique identifier for your website
export const rpID = 'localhost';
// The URL at which registrations and authentications should occur
export const origin = `http://${rpID}`;

// User
export const loggedInUserId = '1';