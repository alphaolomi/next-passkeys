import { UserModel } from "../types"

/**
 * This is a mock database. In a real app, you'd use a database like
 * PostgreSQL or MongoDB to store users and their authenticators.
 */
const users: UserModel[] = [
    { id: '1', username: 'alice', devices: [], currentChallenge: '' },
]

/**
 * Retrieve a user from the mock database
 * 
 * @param id string
 * @returns UserModel
 */
export function getUserFromDB(id: string): UserModel {
    const user = users.find((user) => user.id === id)
    if (!user) {
        throw new Error('User not found')
    }
    return user
}

/**
 * Store the challenge for a user
 * 
 * @param user UserModel
 * @param challenge string
 * @returns void
 */
export function setUserCurrentChallenge(user: UserModel, challenge: string) {
    const userIndex = users.findIndex((u) => u.id === user.id)
    users[userIndex].currentChallenge = challenge
}