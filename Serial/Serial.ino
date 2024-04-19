#define RED_PIN 3
#define GREEN_PIN 9
#define BLUE_PIN 10
#define PHOTO_PIN A0 // Analog pin for the photoresistor

void setup() {
  // put your setup code here, to run once:
  pinMode(RED_PIN, OUTPUT);
  pinMode(GREEN_PIN, OUTPUT);
  pinMode(BLUE_PIN, OUTPUT);
  Serial.begin(9600); // Number of bits the arduino can receive per second 115200 bits 
  Serial.setTimeout(10); // This is how long the arduino will wait for a message 10 milliseconds
}

void changeColor(int red, int green, int blue) {
  analogWrite(RED_PIN, red);
  analogWrite(GREEN_PIN, green);
  analogWrite(BLUE_PIN, blue);
}

String getValue(String data, char separator, int index)
{
  int found = 0;
  int strIndex[] = {0, -1};
  int maxIndex = data.length()-1;

  for(int i=0; i<=maxIndex && found<=index; i++){
    if(data.charAt(i)==separator || i==maxIndex){
        found++;
        strIndex[0] = strIndex[1]+1;
        strIndex[1] = (i == maxIndex) ? i+1 : i;
    }
  }

  return found>index ? data.substring(strIndex[0], strIndex[1]) : "";
}

void loop() {

  String computerText = Serial.readStringUntil('@');
  computerText.trim();
  if (computerText.length() == 0) {
    return;
  }
  // 92-0-130
  int redColor = getValue(computerText, '-',0).toInt();
  int greenColor = getValue(computerText, '-',1).toInt();
  int blueColor = getValue(computerText, '-', 2).toInt();
  changeColor(redColor, greenColor, blueColor);
  Serial.println("WORKING");
  delay(1000);
//  changeColor(179, 56, 181);
//  delay(2000);
//  changeColor(0,255,0);
//  delay(2000);
//  changeColor(0, 0,0);
//  delay(2000);
// Read the analog input from the photoresistor
  int lightIntensity = analogRead(PHOTO_PIN);

  // Print the light intensity to the serial monitor
  Serial.println("Light Intensity: " + String(lightIntensity));

  delay(1000); // Delay before next loop iteration
}

