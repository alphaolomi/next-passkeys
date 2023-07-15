import { getUserFromDB } from '@/app/lib/db';
import { loggedInUserId, rpID } from '@/app/lib/rp';
import { UserModel } from '@/app/types';
import { verifyAuthenticationResponse } from '@simplewebauthn/server/./dist';
import { NextResponse } from 'next/server'

export async function POST(request: Request) {

    const body = await request.json()

    // (Pseudocode) Retrieve the logged-in user
    const user: UserModel = getUserFromDB(loggedInUserId);
    // (Pseudocode) Get `options.challenge` that was saved above
    const expectedChallenge: string = user.currentChallenge ?? '';
    // (Pseudocode} Retrieve an authenticator from the DB that
    // should match the `id` in the returned credential
    // const authenticator = getUserAuthenticator(user, body.id);
    const authenticator = user.devices.find(device => device.credentialID === body.id);

    if (!authenticator) {
        throw new Error(`Could not find authenticator ${body.id} for user ${user.id}`);
    }

    let verification;
    try {
        verification = await verifyAuthenticationResponse({
            response: body,
            expectedChallenge,
            expectedOrigin: origin,
            expectedRPID: rpID,
            authenticator,
        });
    } catch (error: any) {
        console.error(error);
        //   return res.status(400).send({ error: error.message });
        return NextResponse.json({ error: error?.message }, { status: 400 })
    }

    const { verified } = verification;
    //   return NextResponse.json({ res })
    return NextResponse.json({ verified })
}