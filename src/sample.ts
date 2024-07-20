import { YahooFinanceTicker } from "./index";
import WebSocket from 'ws';

const stream = new YahooFinanceTicker();

const PORT = 3001;

const wss = new WebSocket.Server({ port: PORT });

wss.on('connection', function connection(ws) {
  console.log('A new client connected!');

  ws.on('message', function incoming(message) {
    console.log('received: %s', message);

    // 回复客户端消息
    ws.send(`Server received: ${message}`);
  });

  ws.on('close', function close() {
    console.log('Connection closed');
  });

  ws.send('Welcome to WebSocket server!');

  stream.subscribe(["EURUSD=X","JPY=X","GBPUSD=X","AUDUSD=X","NZDUSD=X","EURJPY=X","GBPJPY=X","EURGBP=X","EURCAD=X","EURSEK=X","EURCHF=X","EURHUF=X","CNY=X","HKD=X","SGD=X","INR=X","MXN=X","PHP=X","IDR=X","THB=X","MYR=X","ZAR=X","RUB=X"], (ticker) => {
    // console.log(ticker);
    const jsonString: string = JSON.stringify(ticker);
    ws.send(jsonString)
  });
});

console.log(`WebSocket server is running on ws://localhost:${PORT}`);