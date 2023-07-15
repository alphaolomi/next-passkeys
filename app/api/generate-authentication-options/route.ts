import { getUserFromDB, setUserCurrentChallenge } from "@/app/lib/db";
import { loggedInUserId } from "@/app/lib/rp";
import { UserModel } from "@/app/types";
import { generateAuthenticationOptions } from "@simplewebauthn/server/./dist";
import {  NextResponse } from "next/server";

export async function GET(request: Request) {

    // (Pseudocode) Retrieve the logged-in user
    const user: UserModel = getUserFromDB(loggedInUserId);
    // (Pseudocode) Retrieve any of the user's previously-
    // registered authenticators
    const userAuthenticators = user.devices

    const options = generateAuthenticationOptions({
        // Require users to use a previously-registered authenticator
        allowCredentials: userAuthenticators.map(authenticator => ({
            id: authenticator.credentialID,
            type: 'public-key',
            // Optional
            transports: authenticator.transports,
        })),
        userVerification: 'preferred',
    });

    // (Pseudocode) Remember this challenge for this user
    setUserCurrentChallenge(user, options.challenge);


    return NextResponse.json(options);
}