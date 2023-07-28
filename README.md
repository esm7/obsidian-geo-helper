# Obsidian Map View Geo Helper

## Intro

This is an accompanying app to [Obsidian Map View](https://github.com/esm7/obsidian-map-view), a plugin for Obsidian.md that introduces mapping functionality.
It adds to Map View the missing functionality of getting the user's real-time location -- see [here](https://github.com/esm7/obsidian-map-view#gps-location-support) why it's needed and how to use it from inside Map View.

The Geo Helper app currently comes in two variants: a web app [launched from here](https://esm7.github.io/obsidian-geo-helper) and an [Android app](https://github.com/esm7/obsidian-geo-helper/releases).

No matter how you use it, the app runs completely locally and does not send your location to any server.
Feel free to inspect the code and improve it.

## Help Needed

This is an early beta around an already somewhat-hacky solution.
I don't know if it will provide all users the solution they need and how seamless the experience will be for everybody.
Any contribution that will improve users' experience is highly welcome.

**The most important gap right now is that there is no iOS app, and if someone can take ownership of an iOS version, it will be of great help.** The basics are all there (the Android app is based on Capacitor which can also be compiled for iOS), but I don't have the ability to do the last mile and maintain it, since I don't have any iOS devices or the required development environment.

## Usage

All the variants of this app use the same basic concept: Obsidian does not support querying for a location, but it supports launching external apps, and supports getting data via the `obsidian://` URI that apps can register to.

The Geo Helper uses this as follows:

1. Map View can launch the Geo Helper with a specific request (e.g. "show my active location on the map").
2. Geo Helper has the permissions to get the device locations (once you approve it).
3. Once the location is found, it calls back Obsidian with an `obsidian://mapview` URI, with the found location and an echo of the operation it originally requested. Map View is registered to this URI and performs the requested operation.

Now it only comes down to how Map View calls the Geo Helper.

### Android App

The mobile app provides the best experience when using Map View on mobile.
To use it, just [download the app](https://github.com/esm7/obsidian-geo-helper/releases) and install it (you will need to ignore a few warnings, as it is unsigned and unapproved by Google, may get this fixed at some point).
From that point onward, when using the Map View GPS functionality, it should launch the app to get whatever it needs.
You can also use the app directly for quick operations like creating a new note for the current location.

**Help needed here too:** I am by no means an Android developer (this is my very first attempt at it). Contributors who wish to improve or clean up the code are highly welcome.

### Web App

The web app provides a less streamlined experience than the Android app, and is useful for:

- Desktops, Windows tablets, Linux tablets -- given GPS support for these devices and browser compatibility.
- iOS devices -- your mileage may vary; as noted above I have no iOS devices to test it on, so I have no clue how browsers on iOS handle location support. Tips and further instructions from users are very welcome.

The web app needs two different kinds of permissions to be allowed by you.
First, it needs your approval to get the device location (obviously).
Second, after a location is found, it needs to communicate this to Map View using an `obsidian://mapview` URI. Some browsers explicitly ask for permission to do this and some block it by default, marking somewhere that a popup was blocked. **For Geo Helper to work, you need to enable this `obsidian://` popup.** If you enable it permanently, it will greatly improve the next time you use the app.

Additionally, not all browsers support GPS location on all platforms.
For example, Chrome on Linux may require `gpsd` and [gpsd-chrome-polyfill](https://github.com/micolous/gpsd-chrome-polyfill), while Firefox on Linux usually supports this by default.

If you make important findings that can help other users get Geo Helper working on some platforms, please contribute a pull request to this README.

