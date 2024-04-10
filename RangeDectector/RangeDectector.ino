#define Trigpin 7
#define Echopin 8
#define low_led 9
#define high_led 10

void setup() {
  pinMode(Trigpin, OUTPUT);
  pinMode(Echopin, INPUT);
  pinMode(low_led, OUTPUT);
  pinMode(high_led, OUTPUT);
}

void loop() {
  long duration, distance;
  
  // Trigger the HC-SR04 to start a measurement
  digitalWrite(Trigpin, LOW);
  delayMicroseconds(2);
  digitalWrite(Trigpin, HIGH);
  delayMicroseconds(10);
  digitalWrite(Trigpin, LOW);
  
  // Measure the duration of the pulse returned by the sensor
  duration = pulseIn(Echopin, HIGH);
  
  // Calculate the distance in inches
  distance = duration * 0.0133 / 2; // Speed of sound in inches per microsecond is 0.0133
  
  // Print distance to serial monitor (optional)
  Serial.print("Distance: ");
  Serial.print(distance);
  Serial.println(" inches");
  
  // Turn on appropriate LED based on distance
  if (distance > 20) {
    // Outside of 20 inches, light up low_led (red LED)
    digitalWrite(low_led, HIGH);
    digitalWrite(high_led, LOW);
  } else {
    // Within 20 inches, light up high_led (green LED)
    digitalWrite(low_led, LOW);
    digitalWrite(high_led, HIGH);
  }
  
  // Delay between measurements
  delay(100); // Adjust delay as needed
}
