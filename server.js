const express = require("express");
const prisma = require("./prisma/index.js");
const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/users", async (req, res, next) => {
  try {
    const users = await prisma.user.findMany({
      include: {
        playlists: true,
      },
    });
    res.json(users);
  } catch (error) {
    console.log(error);
  }
});

app.get("/users/:id", async (req, res, next) => {
  const { id } = req.params;
  const user = await prisma.user.findUnique({
    where: { id: parseInt(id) },
    include: {
      playlists: true,
    },
  });
  res.json(user);
});
app.post("/users/:id/playlists", async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  const playlist = await prisma.playlist.create({
    data: {
      name,
      description,
      ownerId: parseInt(id),
    },
  });
  res.json(playlist);
});

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
