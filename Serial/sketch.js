let isConnectted = false;
let port;
let writer;
const enc = new TextEncoder();

async function onChangeColor() {
  if (!isConnectted) {
    alert("You must connect to the USB in order to use this.");
    return;
  }
  try {
    const colorHex = document.getElementById("color-picker").value;
    const colorRgb = hexToRgb(colorHex);
    const computerText = `${colorRgb.r}-${colorRgb.g}-${colorRgb.b}@`;
    await writer.write(enc.encode(computerText));
  } catch (e) {
    console.log(e);
    alert("Could not write color");
  }
}

async function onConnectUsb() {
  try {
    const requestOptions = {
      // Filter on devices with the Arduino USB vendor ID.
      filters: [{ usbVendorId: 0x2341 }],
    };

    // Request an Arduino from the user.
    port = await navigator.serial.requestPort(requestOptions);
    await port.open({ baudRate: 9600 });
    writer = port.writable.getWriter();
    isConnectted = true;
  } catch (e) {
    console.log("err", e);
  }
}

function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

// Function to update background color based on light intensity
function updateBackgroundColor(lightIntensity) {
  // Convert light intensity to a value between 0 and 255
  let brightness = map(lightIntensity, 0, 1023, 0, 255);
  
  // Update background color with the calculated brightness
  document.body.style.backgroundColor = `rgb(${brightness}, ${brightness}, ${brightness})`;
}

// Function to handle incoming serial data
async function handleSerialData(data) {
  // Parse the light intensity value
  let lightIntensity = parseInt(data.trim());

  // Update background color based on the light intensity
  updateBackgroundColor(lightIntensity);
}

// Listen for serial data
port.addEventListener('read', async (event) => {
  let reader = port.readable.getReader();
  while (true) {
    const { value, done } = await reader.read();
    if (done) {
      reader.releaseLock();
      break;
    }
    let decoder = new TextDecoder();
    let data = decoder.decode(value);
    handleSerialData(data);
  }
});
