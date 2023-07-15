import { getUserFromDB } from '@/app/lib/db';
import { loggedInUserId, rpID } from '@/app/lib/rp';
import { UserModel } from '@/app/types';
import { verifyRegistrationResponse } from '@simplewebauthn/server/./dist';
import { NextResponse } from 'next/server'

export async function POST(request: Request) {

    const body = await request.json()

    // (Pseudocode) Retrieve the logged-in user
    const user: UserModel = getUserFromDB(loggedInUserId);
    // (Pseudocode) Get `options.challenge` that was saved above
    // const expectedChallenge: string = getUserCurrentChallenge(user);
    const expectedChallenge: string = user.currentChallenge ?? '';

    let verification;
    try {
        verification = await verifyRegistrationResponse({
            response: body,
            expectedChallenge,
            expectedOrigin: origin,
            expectedRPID: rpID,
        });
    } catch (error: any) {
        console.error(error);
        //   return res.status(400).send({ error: error.message });
        return NextResponse.json({ error: error?.message }, { status: 400 })
    }

    const { verified } = verification;
    return NextResponse.json({ verified })
}