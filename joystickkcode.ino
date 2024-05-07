#define VRX_PIN A0
#define VRY_PIN A1
#define SW_PIN 2

int joyX = 0, joyY = 0, sw = 0;
bool prevSwState = HIGH; // Variable to store previous state of switch pin

const int numReadings = 10;
int xReadings[numReadings];
int yReadings[numReadings];
int readIndex = 0;
float xTotal = 0, yTotal = 0;
float xAverage = 0, yAverage = 0;
float xStart, yStart;
bool start = false;
unsigned long lastTime = 0;
const int interval = 16;

void setup() {
  Serial.begin(9600);
  pinMode(SW_PIN, INPUT_PULLUP);

  for (int i = 0; i < numReadings; i++) {
    xReadings[i] = 0;
    yReadings[i] = 0;
  }
}

void loop() {
  int x = analogRead(VRX_PIN);
  int y = analogRead(VRY_PIN);
  int sw = digitalRead(SW_PIN);

  // Detect button click and send signal only on rising edge
  if (sw == LOW && prevSwState == HIGH) {
    Serial.println("BUTTON_CLICK");
  }

  prevSwState = sw;

  xTotal = xTotal - xReadings[readIndex];
  yTotal = yTotal - yReadings[readIndex];

  xReadings[readIndex] = x;
  yReadings[readIndex] = y;

  xTotal = xTotal + x;
  yTotal = yTotal + y;

  readIndex = readIndex + 1;

  xAverage = xTotal / numReadings;
  yAverage = yTotal / numReadings;

  if (readIndex >= numReadings) {
    readIndex = 0;
    if (!start) {
      xStart = xAverage;
      yStart = yAverage;
      start = true;
    }
  }

  if (start) {
    unsigned long now = millis();
    if (now - lastTime > interval) {
      Serial.print((int)(xAverage - xStart));
      Serial.print(", ");
      Serial.print((int)(yAverage - yStart));
      Serial.print(", ");
      Serial.println(!sw);

      lastTime = now;
    }
  }
}
