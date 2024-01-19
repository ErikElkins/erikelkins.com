---
layout: post
title:  "How to fix VSTS API 400 Bad Request DelegatedAuthorizationException"
author: Erik Elkins
categories: [ VSTS ]
---

Real quick, I was integrated with the VSTS (Visual Studio Team Services) API by calling `https://app.vssps.visualstudio.com/oauth2/authorize`, and I was getting the following:

```
400 Bad Request:

Exception of type ‘Microsoft.VisualStudio.Services.Web.Profile.Controllers.DelegatedAuthorizationException’ was thrown.
```

Not a super helpful error message, but the fix was simple.

1. Make sure all your parameter names are spelled correctly, and that the `redirect_uri` parameter matches exactly what you defined when you registered your app here: [https://app.vssps.visualstudio.com/app/register](https://app.vssps.visualstudio.com/app/register).
2. The `redirect_uri` that you registered and the paramater your passing in both have to be `https`.