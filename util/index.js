const untildify = require('untildify');

class Util {
  static csvToArray (string) {
    if (string.includes(',')) {
      // if it's a comma separated list, split the string into an array
      // also, argv will transform a ~/ based dir, but the comma throws it off
      // so this makes sure they all get transformed. god help you if you have a tilde in your target urls
      return string.split(',').map(x => untildify(x));
    } else {
      // if it's just one, aemsync wants it to be in an array anyway
      return [string];
    }
  }

  static enforceArray (input) {
    if (typeof input != 'array') {
      return this.csvToArray(input);
    }
    return input;
  }
}

module.exports = Util;
