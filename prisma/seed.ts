import { hashPassword } from "../src/utils/passwords";
import { PrismaClient } from "@prisma/client";

const db = new PrismaClient()
async function createOrUpdateAdminUser() {
    const email = process.env.ADMIN_EMAIL
    const username = process.env.ADMIN_USERNAME
    const password = process.env.ADMIN_PASSWORD
    if (!email || !password || !username) throw new Error("admin email/username/password are required")
    const hash = await hashPassword(password)
    const user = await db.user.upsert({
        where: {
            email
        },
        create: {
            email,
            username,
            password: hash,
            verified: true,
            active: true,
            role: "ADMIN",
        },
        update: {

            email,
            username,
            password: hash,
            verified: true,
            active: true,
            role: "ADMIN",

        }
    })
    console.log(`created and email user ${email} `)

}
createOrUpdateAdminUser().then(async () => {
    await db.$disconnect()
}).catch(async (err) => {
    console.log(err)
    await db.$disconnect()
    process.exit(1)
})