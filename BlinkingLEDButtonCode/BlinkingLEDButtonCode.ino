const int buttonPin = 2; //the button connect to pin
const int ledPin = 13;//the led connect to pin13
const int buttonPin2 = 8;
const int ledPin2 = 4;


int buttonState = 0;
int buttonState2 = 0;
int ledState = LOW;
int ledState2 = LOW;


unsigned long previousMillis = 0;
unsigned long previousMillis2 = 0;

const long interval = 1000;
const long interval2 = 100;

void setup()
{
pinMode(buttonPin, INPUT); //initialize thebuttonPin as input
pinMode(ledPin, OUTPUT); //initialize the led pin as output
pinMode(buttonPin2, INPUT);
pinMode(ledPin2, OUTPUT);
}

void loop()

{
  buttonState = digitalRead(buttonPin);
  buttonState2 = digitalRead(buttonPin2);

  unsigned long currentMillis = millis();
  unsigned long currentMillis2 = millis();

  if(buttonState == HIGH){
    if(currentMillis - previousMillis >= interval){
      previousMillis = currentMillis;

      if(ledState == LOW){
        ledState = HIGH;
      }else{
        ledState = LOW;
      }
      
      digitalWrite(ledPin,ledState);
      //interval = (100);
    }
  } else{ digitalWrite(ledPin, LOW);
}

if(buttonState2 == HIGH){
    if(currentMillis2 - previousMillis2 >= interval2){
      previousMillis2 = currentMillis2;

      if(ledState2 == LOW){
        ledState2 = HIGH;
      }else{
        ledState2 = LOW;
      }
      
      digitalWrite(ledPin2,ledState2);
    //interval = (100);
    }
  } else{ digitalWrite(ledPin2, LOW);
}
}