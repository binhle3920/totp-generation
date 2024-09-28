import express from "express";
import * as OTPAuth from "otpauth";

const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
  res.send("Hello from Express!");
});

// Endpoint to get the secret key and generate the TOTP Token
app.get("/totp", (req, res) => {
  const secret = req.query.secret;

  // Create a new TOTP object.
  let totp = new OTPAuth.TOTP({
    // Algorithm used for the HMAC function.
    algorithm: "SHA1",
    // Length of the generated tokens.
    digits: 6,
    // Interval of time for which a token is valid, in seconds.
    period: 30,
    // Arbitrary key encoded in base32 or OTPAuth.Secret instance
    // (if omitted, a cryptographically secure random secret is generated).
    secret: OTPAuth.Secret.fromBase32(secret),
  });

  // Get the current token.
  let token = totp.generate();
  const expires = Date.now() + 30
  res.json({ token, expires });
});

app.listen(PORT, () => {
  console.log(`Express server running at http://localhost:${PORT}/`);
});