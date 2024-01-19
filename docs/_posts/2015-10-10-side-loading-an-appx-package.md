---
layout: post
title:  "Side-loading an appx package onto Windows 10"
author: erik
categories: [ UWP ]
comments: false
---

I was running into a problem with Heep that only affected the deployed app in the store and not while debugging. So I wanted to side-load the `appx` package so i could reproduce the issue, turns out it’s very easy to accomplish…

First uninstall any version of your app currently on your machine if you have one. Then make sure the app has a package created, by right clicking the UWP project in Visual Studio, selecting *Store* > *Create App Packages* … and follow the wizard. This will probably take a while as it may compile for many architectures.

Then find your solutions folder in windows explorer, and you should see a folder called `AppPackages`. Open it and you’ll want to find the package’s folder you want to side-load, in my case it was called `Heep_2.0.0.0_Test`. Once inside, there should be a file called `Add-AppDevPackage`, right click it and select `Run with Powershell`. And you should be set.