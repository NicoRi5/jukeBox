// this file exports and creates PrismaClient
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
module.exports = prisma;