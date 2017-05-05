# pac-man

This README outlines the details of collaborating on this Ember application.
A short introduction of this app could easily go here.

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org/) (with NPM)
* [Ember CLI](https://ember-cli.com/)
* [PhantomJS](http://phantomjs.org/)

## Installation

* `git clone <repository-url>` this repository
* `cd pac-man`
* `npm install`

## Running / Development

* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).

### Code Generators

Make use of the many generators for code, try `ember help generate` for more details

### Running Tests

* `ember test`
* `ember test --server`

### Building

* `ember build` (development)
* `ember build --environment production` (production)

### Deploying

Specify what it takes to deploy your app.

## Further Reading / Useful Links

* [ember.js](http://emberjs.com/)
* [ember-cli](https://ember-cli.com/)
* Development Browser Extensions
  * [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  * [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)


# Commented out code

### commented out code from move function

// let stationary =! this.get('isStationary') ||! this.pathNotFree(direction);
// if (! stationary) {
//   this.set('direction', direction);
//   this.set('isStationary', false);
//   this.moveLoop();
// }
// if (this.pathNotFree(direction)){
//   console.log('pathNotFree');
//   this.set('x', this.nextCell('x', direction));
//   this.set('y', this.nextCell('y', direction));
//   let cells = this.get('cells');
//   if (cells[this.get('y')][this.get('x')] == 0){
//     cells[this.get('y')][this.get('x')] = -1;
//     this.incrementProperty('score');
//     // All the dots are consumed
//     if (this.get('score') == this.get('dots')){
//       this.resetGame();
//     }
//   }
// }
