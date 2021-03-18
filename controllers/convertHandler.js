function ConvertHandler() {
  
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
    
    return result;
  };
  
  this.getReturnUnit = function(initUnit) {
    let result;
    
    return result;
  };

  this.spellOutUnit = function(unit) {
    let result;
    
    return result;
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;
    
    return result;
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let result;
    
    return result;
  };
  
}

module.exports = ConvertHandler;
