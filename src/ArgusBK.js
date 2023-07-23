//Argus Backend
const mqtt = require("mqtt");

//Variables Generales
const urlMqtt = "192.68.185.157";
const portMqtt = "1883";
const topic = "Argus/VOLTA/Meter/Sensor";

//Crear Cliente
const client = mqtt.connect(`mqtt://${urlMqtt}:${portMqtt}`, { clientId: "MQTTARG1" });

client.on("connect", () => {
  console.log("Cliente Conectado");
});

//Manejar Mensajes Entrantes
client.on("message", (topic, message, packet) => {
  msgToJson(message);
  //console.log("El Mensaje es "+ message);
  //console.log("El Topico es "+ topic);
});

//Manejar Errores
client.on("error", (error) => {
  console.log(`Error: ${error}`);
  process.exit(1);
});

//Pasar Array a Objeto JSON
const msgToJson = (message) => {
  let vJson = JSON.parse(message);
  console.log(vJson.data);
};

//Suscribir a Topico
client.subscribe(topic, { qos: 1 });
