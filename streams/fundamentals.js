import { Readable } from "node:stream";

class OneToHundredStream extends Readable {
  index = 1;

  _read() {
    const index = this.index++;

    setTimeout(() => {
      if (index > 100) {
        this.push(null);
      } else {
        const buffer = Buffer.from(index.toString());
        this.push(buffer);
      }
    }, 1000);
  }
}

new OneToHundredStream().pipe(process.stdout);
