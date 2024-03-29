import { Readable } from "node:stream";

class OneToHundredStream extends Readable {
  index = 1;

  _read() {
    const index = this.index++;

    setTimeout(() => {
      if (index > 5) {
        this.push(null);
      } else {
        const buffer = Buffer.from(index.toString());
        this.push(buffer);
      }
    }, 1000);
  }
}

fetch("http://localhost:3334", {
  method: "POST",
  duplex: "half",
  body: new OneToHundredStream(),
})
  .then(response => response.text())
  .then(console.log);
