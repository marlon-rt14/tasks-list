import eightBase from "8base-js-sdk";

export const { api: apiAdmin, auth: authAdmin } = eightBase.configure({
  workspaceId: "cliopw93e000808moesic1fzu",
  autoTokenRefresh: true,
  Auth: {
    strategy: "AUTH0_AUTH" as any,
    settings: {
      authProfileId: "clioq29wl01ka08l37r1b6lwb",
      clientId: "1t4f33qoji6fcsfh4htkthucs2",
      domain: "https://648343f6586f7c00089b26e3.auth.us-east-1.amazoncognito.com",
      logoutRedirectUri: `${window.location.origin}/auth/signin`,
      redirectUri: `${window.location.origin}/home`,
    },
  },
  Api: {},
});

export const { api: apiGuest, auth: authGuest } = eightBase.configure({
    workspaceId: "cliopw93e000808moesic1fzu",
    autoTokenRefresh: true,
    Auth: {
      strategy: "AUTH0_AUTH" as any,
      settings: {
        authProfileId: "clioq37ov00bx08l6c9l53c7m",
        clientId: "1t4f33qoji6fcsfh4htkthucs2",
        domain: "https://648343f6586f7c00089b26e3.auth.us-east-1.amazoncognito.com",
        logoutRedirectUri: `${window.location.origin}/auth/signin`,
        redirectUri: `${window.location.origin}/home`,
      },
    },
    Api: {},
  });
  
