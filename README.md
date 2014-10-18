Piano Typing Tutor
==================

When I was a child my school's computer network had "typing tutor" software 
installed on it.  This software helped me learn to type as a child, and I'm 
assuming that similar software could help me learn to play the piano.  There
may already be existing software out there that fills this purpose, but to my
knowledge, none of it is FLOSS; plus I'm hoping this can be a fun project to
relax with on the week-ends.

FYI, this is Free software, a formal license is included, and can also be found
[here](http://www.gnu.org/licenses/gpl.html "GPL Version 3")

## Specifications

At a high level the software will consist of three modes

* Scale Tutor
* Riff Tutor
* Game

Each of these modes presents the user with notes to hit, or combinations notes
to hit.  If the correct notes are pressed, the user is rewarded.  If incorrect
notes are hit the user is penalized.  

Loosely the software can be considered to perform three tasks

* Detect input from keyboard (or other device)
* Present user with notes to hit
* Compare input to output

## Implementation

There are many ways this software could be implemented.  My choice is likely not
even close to the best implementation.  However it is the best implementation
for a hobby project of mine.

The implementation is divided into two major components:

* Server
* Client

The server is responsible for interfacing with the MIDI device, and long term
persistent storage.  The client is responsible for computing results, and 
presenting the software to the user.

This split is not strictly being done for pragmatic reasons.  This being a hobby
project that I would like to make progress with, I am using the language I use
in my day to day, which is JavaScript.

Hey, I was clear that this not likely the best implementation.

Anyhow, with JavaScript it seems a lot easier to get node.js to interface with
a midi device, than a web browser.  With that being said, it seems a lot easier
to display graphical data with a web browser, than with node.js. Thus, we will
be using:

* node.js as our server
* web browser as our client(s)

The client/server split, though not done for pragmatic reasons, is not without
its advantages.

* Server could be localized to a dedicated device, like a Raspberry Pi
* Client could be an iPad, Smart TV, etc


### Implementation Concerns

* Who the hell is going to run this?
* What kind of latency will Midi->Node.js->WebSocket->Browser have?
* Security

Hopefully this will work on Macs, the node-midi library I plan to use runs on
GNU/Linux, Mac, and even Windows.  Outside of the ./scripts folder I will
attempt to make all software platform independent.  ./scripts is sh for now.

With respect to latency, I'm hoping to be able to respond to feedback in less
than one hundred milliseconds; even if the client/server are split by a gigabit
network.

Security is a concern since we're setting up an HTTP server.  This software is
*not* being designed with the intention of being run on the open internet.
Users are expected to run their servers in the privacy of their private networks
(homes), or within the confines of a *single* computer, working as both client,
and server.

### Implementation Nice To Haves

* Central (worldwide) storage for records comparisons
* User contributed tests, riffs, sequences, etc

These are obviously a little more than nice to haves.  These create a *lot* more 
complication than a simple rig a user can run in their home.
