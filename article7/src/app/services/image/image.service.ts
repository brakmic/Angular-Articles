import { Injectable } from '@angular/core';

@Injectable()
export class ImageService {
    
    private digits = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    constructor() { }

    public imageUrl(customerId: string) {
        // do some complext API stuff here...
        const picture = this.digits[Math.floor(Math.random() * this.digits.length)];
        return `https://brakmic.github.io/sw-demo/assets/images/${picture}.png`;
    }

}
