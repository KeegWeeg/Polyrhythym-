Polyrhythm Visualizer 🟣🟡🔵

A generative music tool that visually animates polyrhythms using JavaScript.  
It maps two different rhythmic patterns around a circle, showing their beat positions and relationships over time.

---

Features

- Adjustable polyrhythms (3:4, 4:5, etc)
- Real-time rotation and beat marking
- Beat positions color-coded for each rhythm
- Responsive canvas that resizes with the window
- Smooth animation using `requestAnimationFrame`

---

Tech Stack

- HTML5 Canvas
- JavaScript (no libraries)

---

How It Works

- Calculates beat intervals based on BPM
- Animates a rotating circle marker (like a metronome)
- Places beats along the circle based on time and rhythm ratio
- Visualizes overlaps where rhythms align or phase

---

Why I Built This 

This was an experiment in:
- Visualizing rhythm mathematically
- Practicing canvas animations and time-based rendering
- Learning how to sync music logic with geometry

I have not touched this in a little while but I would love to look back at this again and make it interactable with a pleasing UI.

---
You can change the ratio and BPM in this line:

const polyrhythm = new Polyrhythm(3, 4, 120);

(I had yet to implement the UI for doing this) 
