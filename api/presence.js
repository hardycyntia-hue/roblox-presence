export default async function handler(req, res) {
  const { userId } = req.body;

  const response = await fetch("https://presence.roblox.com/v1/presence/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
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
