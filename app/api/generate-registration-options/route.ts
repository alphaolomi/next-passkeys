import { getUserFromDB, setUserCurrentChallenge } from '@/app/lib/db';
import { loggedInUserId, rpID, rpName } from '@/app/lib/rp';
import { UserModel } from '@/app/types';
import {
    GenerateRegistrationOptionsOpts,
    generateRegistrationOptions,
} from '@simplewebauthn/server';

import { NextResponse } from 'next/server';


//   1. Generate registration options
//   One endpoint (GET) needs to return the result of a call to generateRegistrationOptions():
export async function GET(request: Request) {
    // (Pseudocode) Retrieve the user from the database
    // after they've logged in
    const user: UserModel = getUserFromDB(loggedInUserId);

    // (Pseudocode) Retrieve any of the user's previously-
    // registered authenticators
    const userAuthenticatorDevices = user.devices;

    const opts: GenerateRegistrationOptionsOpts = {
        rpName,
        rpID,
        userID: user.id,
        userName: user.username,
        timeout: 60_000,
        // Don't prompt users for additional information about the authenticator
        // (Recommended for smoother UX)
        attestationType: 'none',
        /**
         * Passing in a user's list of already-registered authenticator IDs here prevents users from
         * registering the same device multiple times. The authenticator will simply throw an error in
         * the browser if it's asked to perform registration when one of these ID's already resides
         * on it.
         */

        // Prevent users from re-registering existing authenticators
        excludeCredentials: userAuthenticatorDevices.map(authenticator => ({
            id: authenticator.credentialID,
            type: 'public-key',
            // Optional
            transports: authenticator.transports,
        })),
        authenticatorSelection: {
            residentKey: 'discouraged',
        },
        /**
         * Support the two most common algorithms: ES256, and RS256
         */
        supportedAlgorithmIDs: [-7, -257],
    };
    const options = generateRegistrationOptions(opts);

    // (Pseudocode) Remember the challenge for this user
    setUserCurrentChallenge(user, options.challenge);

    return NextResponse.json(options);
}