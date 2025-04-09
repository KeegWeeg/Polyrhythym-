
// Aliasing for shorthand ease
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');


// Create a polyrhyhthm circle 
class Polyrhythm {
    constructor(rhythm1, rhythm2, BPM) {
        this.rhythm1 = Math.max(rhythm1, rhythm2); // Rhythm with most beats
        this.rhythm2 = Math.min(rhythm1, rhythm2);// Rhythm with least beats
        this.BPM = BPM; 
  
        // Initial scaling of the polyrhythm circle 
        this.centerX = canvas.width / 2;
        this.centerY = canvas.height / 2;
        this.radius = Math.max(canvas.height, canvas.width) / 6;
        this.angleInDegrees = 270; // Initial angle of measure marker

        // Calculate how much time one measure takes (in milliseconds)
        this.beatDuration = (60 / this.BPM) * 1000; // Time for one beat in ms
        this.BPM2 =  60/((this.rhythm2 / this.rhythm1) * this.BPM) * 1000;
        this.measureDuration = this.beatDuration * this.rhythm1; // Time for one full measure

        // Calculate the angle increment per millisecond
        this.anglePerMs = 360 / this.measureDuration;
      
        this.deltaTime;
        this.currentTime;
        this.lastTime = performance.now();
        
    }
    // Render and start the poly circle
    startPoly() {
        this.resizeCanvas(); // Call resize to make sure everything is to scale
        // Get time in miliseconds
    
        const animate = (currentTime) => { 
            // Find change in time 
     
            this.currentTime = currentTime; 
           this.deltaTime = this.currentTime - this.lastTime; 
           this.lastTime = this.currentTime; 

            // Update the angle based on elapsed time
            this.angleInDegrees = (this.angleInDegrees + this.anglePerMs * this.deltaTime) % 360;

            // Clear canvas and redraw
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            this.draw(); // Draw poly circle
            this.drawDot(this.angleInDegrees, "green", 15);
            this.drawBeats(); // Draw the beats
            requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
    }
  
// Method to draw the rhythm circle 
  draw(){
     ctx.beginPath();
     ctx.arc(this.centerX, this.centerY, this.radius, 0, Math.PI * 2, false);
     ctx.fillStyle = "purple";
     ctx.fill();
     ctx.lineWidth = 2;
     ctx.strokeStyle = 'black';
     ctx.stroke();
    }
   // Method to draw a dot on the circles edge based on angle
 drawDot(angleInDegrees, color, size) {
            const position = this.getPositionOnCircle(angleInDegrees);
            ctx.beginPath();
            ctx.arc(position.x, position.y, size, 0, 2 * Math.PI);  // Draw dot
            ctx.fillStyle = color;
            ctx.fill();
        }
// Method to resize canvas 
  resizeCanvas(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    this.centerX = canvas.width/2;
    this.centerY = canvas.height/2;
    this.radius = Math.max(canvas.height, canvas.width)/6;
    }
  
// Method to get x and y of edge of circle based on angle
 getPositionOnCircle(angleInDegrees) {
    let angleInRadians = angleInDegrees * 0.0174533;
    const x = this.centerX + this.radius * Math.cos(angleInRadians);
    const y = this.centerY + this.radius * Math.sin(angleInRadians);
    return { x, y };
    }
 
  // Method to visualize the beats along the circle
  drawBeats(){
    for (let i = 0; i < this.rhythm1; i++ ){
      let angleInDegrees = 270 + (this.anglePerMs * (i * this.beatDuration));
      this.drawDot(angleInDegrees, "yellow", 15);
    }
    for (let x = 0; x < this.rhythm2; x++ ){
      let angleInDegrees1 = 270 + (this.anglePerMs * (x * this.BPM2));
      this.drawDot(angleInDegrees1, "blue", 10);
    }
  }
}




const polyrhythm = new Polyrhythm(3,4,120); // Create instance of a Polyrhythm
window.addEventListener("resize",  () => polyrhythm.resizeCanvas()); // Resize window automatically
polyrhythm.startPoly();

