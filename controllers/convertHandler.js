function ConvertHandler() {
  this.units = ['gal', 'L', 'mi', 'km', 'lbs', 'kg'];

  this.invalid_number = "invalid number";
  this.invalid_unit = "invalid unit";
  this.invalid_number_and_unit = "invalid number and unit";

  this.getNum = function(input) {
    let result;

    const nonDigitIndex = input.search(/[^0-9/.]/);
    const numberOfFractions = (input.match(/[/]/g) || []).length
    
    if (nonDigitIndex == 0) {
      result = 1;
    } else {
      try {
        result = Function(`return ${input.slice(0, nonDigitIndex)}`)();
      }
      catch(err) {
        result = this.invalid_number;
      }
    }

    if (numberOfFractions > 1) result = this.invalid_number;

    return result;
  };
  
  this.getUnit = function(input) {
    let result;
    
    const nonDigitIndex = input.search(/[^0-9/.]/);
    const foundUnit = input.slice(nonDigitIndex);

    if (this.units.includes(foundUnit)) result = foundUnit;
    else result = this.invalid_unit;

    return result;
  };
  
  this.getReturnUnit = function(initUnit) {
    switch(initUnit) {
      case 'gal':
        return 'L';
        
      case 'L':
        return 'gal';
        
      case 'mi':
        return 'km';
        
      case 'km':
        return 'mi';
        
      case 'lbs':
        return 'kg';
        
      case 'kg':
        return 'lbs';
        
      default:
        return this.invalid_unit;
    }
  };

  this.spellOutUnit = function(unit) {
    switch(unit) {
      case 'gal':
        return 'gallons';
        
      case 'L':
        return 'liters';
        
      case 'mi':
        return 'miles';
        
      case 'km':
        return 'kilometers';
        
      case 'lbs':
        return 'pounds';
        
      case 'kg':
        return 'kilograms';
        
      default:
        return this.invalid_unit;
    }
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    
    switch(initUnit) {
      case 'gal':
        return Math.round(initNum * galToL * 100000) / 100000;
        
      case 'L':
        return Math.round(initNum / galToL * 100000) / 100000;
        
      case 'mi':
        return Math.round(initNum * miToKm * 100000) / 100000;
        
      case 'km':
        return Math.round(initNum / miToKm * 100000) / 100000;
        
      case 'lbs':
        return Math.round(initNum * lbsToKg * 100000) / 100000;
        
      case 'kg':
        return Math.round(initNum / lbsToKg * 100000) / 100000;
        
      default:
        return this.invalid_unit;
    } 
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
  };
  
}

module.exports = ConvertHandler;
