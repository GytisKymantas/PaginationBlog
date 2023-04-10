---
title: 'How to Create JSON Web Token (JWT) with Google Apps Script'
date: '2020-11-28'
slug: '/code/json-web-token-201128'
category: 'Code'
tags:
  - 'Google Apps Script'
---

You can use Google Script to create JSON Web Tokens (JWT) that can be provided to secure routes so that only authenticated requests that contain a valid token can connect to the APIs (e.g., the [Zoom API](/code/zoom-meetings-200628)).

All JSON Web Tokens have three parts:

1. The header that specifies the hash algorithm that is used for signing and decrypting the JWT.
2. The payload in JSON format that contains all the user data. The `iat` and `exp` properties represent the issue date and the expiration time respectively but you can pass any data to the payload.
3. The signature data that allows APIs to establish the authenticity of the access token.

The parts are joined with a dot (period) and data is encoded in Base64 using the `Utilities.base64EncodeWebSafe` method of Apps Script.

### Create JSON Web Token

```js
const createJwt = ({ privateKey, expiresInHours, data = {} }) => {
  // Sign token using HMAC with SHA-256 algorithm
  const header = {
    alg: 'HS256',
    typ: 'JWT',
  };

  const now = Date.now();
  const expires = new Date(now);
  expires.setHours(expires.getHours() + expiresInHours);

  // iat = issued time, exp = expiration time
  const payload = {
    exp: Math.round(expires.getTime() / 1000),
    iat: Math.round(now / 1000),
  };

  // add user payload
  Object.keys(data).forEach(function (key) {
    payload[key] = data[key];
  });

  const base64Encode = (text, json = true) => {
    const data = json ? JSON.stringify(text) : text;
    return Utilities.base64EncodeWebSafe(data).replace(/=+$/, '');
  };

  const toSign = `${base64Encode(header)}.${base64Encode(payload)}`;
  const signatureBytes = Utilities.computeHmacSha256Signature(toSign, privateKey);
  const signature = base64Encode(signatureBytes, false);
  return `${toSign}.${signature}`;
};
```

### Generate Token with your Private Key & Payload

```js
const generateAccessToken = () => {
  // Your super secret private key
  const privateKey = 'ZPYu33tz8QYU3hwJQXgHpZsKfYn0r2poopBx7x1n3rmeIvuGU4wf65kk6rV1DrN';
  const accessToken = createJwt({
    privateKey,
    expiresInHours: 6, // expires in 6 hours
    data: {
      iss: Session.getActiveUser().getEmail(),
      userId: 123,
      name: 'Amit Agarwal',
    },
  });
  Logger.log(accessToken);
};
```

You can paste the generated access token in [jwt.io](https://jwt.io/#debugger-io?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2MDY0NjQ1ODYsImlhdCI6MTYwNjU1MDk4NiwiaXNzIjoiYW1pdEBsYWJub2wub3JnIiwidXNlcklkIjoxMjMsIm5hbWUiOiJBbWl0IEFnYXJ3YWwifQ.rnKWho7lvglMogOeT6duGcM6gFSYUhecMemPkxWbay4) and you'll be able to see the content (payload) of the decoded token. Please note that if the token has invalid signature data, the payload may still be decoded as it is encoded in Base64.

### Decoding JWT Payload with Google Apps Script

```js
const parseJwt = (jsonWebToken, privateKey) => {
  const [header, payload, signature] = jsonWebToken.split('.');
  const signatureBytes = Utilities.computeHmacSha256Signature(`${header}.${payload}`, privateKey);
  const validSignature = Utilities.base64EncodeWebSafe(signatureBytes);
  if (signature === validSignature.replace(/=+$/, '')) {
    const blob = Utilities.newBlob(Utilities.base64Decode(payload)).getDataAsString();
    const { exp, ...data } = JSON.parse(blob);
    if (new Date(exp * 1000) < new Date()) {
      throw new Error('The token has expired');
    }
    Logger.log(data);
  } else {
    Logger.log('🔴', 'Invalid Signature');
  }
};
```

If you are new to JWT, the video tutorials by Kyle Cook [here](https://www.youtube.com/watch?v=7Q17ubqLfaM&t=607s) and [here](https://www.youtube.com/watch?v=mbsmsi7l3r4) are a good place to start.
