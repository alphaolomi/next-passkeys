import { MetadataStatement } from "@simplewebauthn/server/./dist";
import { UserModel } from "../types";

type LoggedInUser = UserModel

export interface LoggedInFIDOUser extends LoggedInUser {
    currentAuthenticationUserVerification?: UserVerificationRequirement;
}

export const fidoRouteSuffix = '/fido';

export const rpName = 'FIDO Conformance Test';


// WIP - Work in Progress
// TODO: Implement this

/**
 * Load JSON metadata statements provided by the Conformance Tools
 *
 * FIDO2 > TESTS CONFIGURATION > DOWNLOAD SERVER METADATA (button)
 */
const statements: MetadataStatement[] = [];

