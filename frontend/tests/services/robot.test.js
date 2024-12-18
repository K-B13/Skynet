import createFetchMock from "vitest-fetch-mock";
import { describe, expect, vi } from "vitest";
import { createRobot, getRobotSpeach } from "../../src/services/robot";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

// Mock fetch function
createFetchMock(vi).enableMocks();

describe('robot services', () => {
    describe('createRobot', () => {
        test('creates a robot', async () => {
            fetch.mockResponseOnce(JSON.stringify({message: 'Robot created'}), {
                status: 201,
            });
            const fakeName = 'Wall-E'
            const fakeMood = 'Playful'
            const fakeLikes = ['rubbish', 'plants', 'EEEEEVAAAA']
            const fakeDislikes = ['being alone']
            const fakeUserId = 'i1u45kjnqkj1n34i'
            const fakeToken = "testToken"

            const fakeData = {
                name: fakeName,
                mood: fakeMood,
                likes: fakeLikes,
                dislikes: fakeDislikes,
            }

            const returnedMsg = await createRobot({...fakeData, userId: fakeUserId}, fakeToken)
            
            const fetchArguments = fetch.mock.lastCall;
            const url = fetchArguments[0]
            const options = fetchArguments[1]

            expect(url).toEqual(`${BACKEND_URL}/robot`)
            expect(options.method).toEqual('POST')
            expect(options.headers['Authorization']).toEqual("Bearer testToken")
            expect(options.headers["Content-Type"]).toEqual("application/json");
            expect(options.body).toEqual(JSON.stringify({...fakeData, userId: fakeUserId}));
            expect(returnedMsg).toEqual({message: 'Robot created'})
        })
    })

    describe('Robot Speach', () => {
        test('Gets some text', async () => {
            fetch.mockResponseOnce(JSON.stringify({message: 'Robot conversation'}), {
                status: 200,
            });
            const fakeRobotId = 'i1u45kjnqkj1n34i'

            const returnedMsg = await getRobotSpeach(fakeRobotId)
            
            const fetchArguments = fetch.mock.lastCall;
            const url = fetchArguments[0]

            expect(url).toEqual(`${BACKEND_URL}/robot/${fakeRobotId}/speach`)
            expect(returnedMsg).toEqual({ message: 'Robot conversation' })
        })
    })
})