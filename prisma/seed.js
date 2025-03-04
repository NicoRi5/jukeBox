// this file should seed the database with at least 3 users
// each user should be seeded with at least 5 playlists
const prisma = require("./index.js");

const seed = async () => {
  const usersData = [
    { username: "firstUser" },
    { username: "secondUser" },
    { username: "thirdUser" },
  ];
  for (const userData of usersData) {
    const user = await prisma.user.create({
      data: {
        username: userData.username,
        playlists: {
          create: Array.from({ length: 5 }).map((_, index) => ({
            name: `Playlist ${index + 1}`,
            description: `Description for Playlist ${index + 1}`,
          })),
        },
      },
    });
    console.log(
      `The following user has been created with 5 playlists: ${user.username}`
    );
  }
  console.log("Database successfully seeded!");
};
seed()
  .then(async () => await prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
