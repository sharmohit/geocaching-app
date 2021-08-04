# 📍Geocaching App

## Requirements and Implementation
The Toronto Geocaching Club has hired you to develop an application that enables users to use
their phone to participate in geocaching in the Toronto area.
<br><br>
Geocaching is an outdoor activity where players hide random objects in random locations
around a specific geographical area. The goal of the activity is to 1) hide objects for others to
find, and 2) locate objects hidden by others.
<br><br>
If the player hides an object for others to find, the player must report the latitude and longitude
of where they hid the object. Examples of where an object could be hidden include: under a
rock in the forest, inside a tree stump, under a park bench, in a hole of a building’s brick wall,
etc. Note that the player does not specify exactly where they placed the object. The player
simply reports the latitude and longitude of the object’s location.
<br><br>
After the coordinates of the location is reported, other players can search for the object.
Searchers travel to the lat lng coordinate, and then manually search the area for the hidden
object. Because (lat,lng) coordinates generally cover a large region, it is never immediately
obvious is hidden. For example, a single (lat, lng) coordinate could cover a small city park.
Players would travel to the park, and then search for where the object is hidden within the park.
They would manually look at the trees in the park, the playground, etc. etc.
<br><br>
Intro to Geocaching: https://www.youtube.com/watch?v=xE-zMPhiAi0
<br><br>
Using React Native, build a cross platform mobile application that enables users to search for
geocaching sites and keep a record of the items they find.
<br><br>
Your app must provide the following features:
- Display a list of geocaching sites that are **near the current location of the user’s
device**
- Display the nearby geocaching sites on a map (with pins)
- Show details about a specific geocaching site (the name of the cache, description of the
item the person is searching for, latitude and longitude)
- Ability to mark a specific geocaching site as a “favorite”
- Record keeping features:
  - User can track which geocache sites they have “in progress” or “completed”
  - User can keep notes about a specific geocache site (example: I found it by the
water fountain; I searched all the trees but didn’t see anything, etc)
  - User can take a photo of the geocache site (or the item they found)

## Screenshots
<table style="width:100%">
  <tr>
    <th>Sign-In</th>
    <th>Sign-Up</th>
    <th>Geocache Sites</th>
  </tr>
  <tr>
    <td><img src = "https://github.com/sharmohit/geocaching-app/blob/main/screenshots/01-geocaching-app-sign-in.png" alt="Sign-In" width="205" height="443"/></td>
    <td><img src = "https://github.com/sharmohit/geocaching-app/blob/main/screenshots/02-geocaching-app-sign-up.png" alt="Sign-Up" width="205" height="443"/></td>
    <td><img src = "https://github.com/sharmohit/geocaching-app/blob/main/screenshots/03-geocaching-app-sites.png" alt="Geocache Sites" width="205" height="443"/></td>
  </tr>
</table>
<table style="width:100%">
  <tr>
    <th>Geocache Detail</th>
    <th>Add Geocache</th>
    <th>Favorites</th>
  </tr>
  <tr>
    <td><img src = "https://github.com/sharmohit/geocaching-app/blob/main/screenshots/04-geocaching-app-detail.png" alt="Geocache Detail" width="205" height="443"/</td>
    <td><img src = "https://github.com/sharmohit/geocaching-app/blob/main/screenshots/05-geocaching-app-add-site.png" alt="Add Geocache" width="205" height="443"/></td>
    <td><img src = "https://github.com/sharmohit/geocaching-app/blob/main/screenshots/06-geocaching-app-favorites.png" alt="Favorites" width="205" height="443"/></td>
  </tr>
</table>
<table style="width:100%">
  <tr>
    <th>Geocache Map</th>
  </tr>
  <tr>
    <td><img src = "https://github.com/sharmohit/geocaching-app/blob/main/screenshots/07-geocaching-app-map.png" alt="Geocache Map" width="205" height="443"/</td>
  </tr>
</table>

## Task Lists
- [x] 1. Display a List of Geocaching Sites @MohitSharma(101342267)
  - [x] Setup bottom tab navigation
  - [x] Create geocaching sites list screen
  - [x] Fetch the current location of the user’s device
  - [x] Setup firebase console and implement firebase manager and location component
  - [x] Display a list of geocaching sites that are near the fetched location

- [x] 2. Implement Sign-In and Sign-Up Screens @JavteshSinghBhullar(101348129)
  - [x] Create sign-in and sign-up screens
  - [x] Authenticate user with firestore
  - [x] Implement remember me with async storage

- [x] 3. Show Details About a Specific Geocaching Site @MohitSharma(101342267)
  - [x] Create geocaching site detail screen
  - [x] Display the name of the cache, description of the item the person is searching and latitude and longitude

- [x] 4. Implement Geocaching Site Creation Screen @JavteshSinghBhullar(101348129)
  - [x] Create geocaching site creation screen
  - [x] Input name of the cache, description of the item the person is searching and latitude and longitude
  - [x] Add geocaching site to firestore

- [x] 5. Record Keeping Features @MohitSharma(101342267)
  - [x] User can mark a specific geocaching site as a “favorite”
  - [x] User can track which geocache sites they have “in progress” or “completed”
  - [x] User can keep notes about a specific geocache site

- [x] 6. Display the Nearby Geocaching Sites on a Map @JavteshSinghBhullar(101348129)
  - [x] Create map screen
  - [x] Display the nearby geocaching sites on a map with pins
