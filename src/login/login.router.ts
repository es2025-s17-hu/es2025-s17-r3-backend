import { createRouter, Request, Response } from "../utils/router";
import { db } from "../utils/db";
import crypto from "crypto";

const router = createRouter();

router.post("/login/pin", async (req: Request, res: Response) => {
  try {
    const { pin } = req.body;
    db.user
      .findFirst({
        where: {
          pin,
        },
      })
      .then((user) => {
        if (!user || user.role !== "WAITER") {
          res.status(401).send("Unauthorized");
        } else {
          const hash = crypto
            .createHash("md5")
            .update(user.username)
            .digest("hex");
          db.user
            .update({
              where: {
                id: user.id,
              },
              data: {
                token: hash,
              },
            })
            .then(() => {
              res.json({ token: hash });
            });
        }
      });
  } catch (error) {
    console.error("Error logging in: ", error);
    res.status(500).send("Error logging in");
  }
});

router.post("/login", async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    db.user
      .findFirst({
        where: {
          username,
          password,
        },
      })
      .then((user) => {
        if (!user || user.role !== "ADMIN") {
          res.status(401).send("Unauthorized");
        } else {
          const hash = crypto
            .createHash("md5")
            .update(user.username)
            .digest("hex");
          db.user
            .update({
              where: {
                id: user.id,
              },
              data: {
                token: hash,
              },
            })
            .then(() => {
              res.json({ token: hash });
            });
        }
      });
  } catch (error) {
    console.error("Error logging in: ", error);
    res.status(500).send("Error logging in");
  }
});

router.post("/logout", async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (token) {
      await db.user.updateMany({
        where: {
          token,
        },
        data: {
          token: null,
        },
      });
    }
    res.send("Logged out");
  } catch (error) {
    console.error("Error logging out: ", error);
    res.status(500).send("Error logging out");
  }
});

export default router;
