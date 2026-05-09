export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  if (req.method !== "POST") return res.status(405).end();

  const { userId } = req.body;
  if (!userId) return res.status(400).json({ error: "userId manquant" });

  const response = await fetch("https://presence.roblox.com/v1/presence/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Cookie": `.ROBLOSECURITY=${process.env.ROBLOX_COOKIE}`
    },
    body: JSON.stringify({ userIds: [userId] })
  });

  const data = await response.json();
  const presence = data.userPresences?.[0];

  if (!presence) return res.status(404).json({ error: "introuvable" });

  res.json({
    userPresenceType: presence.userPresenceType,
    placeId: presence.placeId,
    rootPlaceId: presence.rootPlaceId,
    gameId: presence.gameId,
    universeId: presence.universeId
  });
}
