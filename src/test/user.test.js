import supertest from "supertest";
import { web } from "../application/web.js"
import { prismaClient } from "../application/database.js";

describe('POST /api/users', () => {

    afterEach(async() => {
        await prismaClient.user.deleteMany({
            where: {
                username: "fadlanrizki"
            }
        });
    })
    it('should can register new user', async () => {
        const result = await supertest(web)
            .post('/api/users').send({
                username: "fadlanrizki",
                password: "password",
                name: "fadlan"
            })
        expect(result.status).toBe(200);
        expect(result.body.data.username).toBe("fadlanrizki");
        expect(result.body.data.name).toBe("fadlan");
        expect(result.body.data.password).toBeUndefined();

    });

});
