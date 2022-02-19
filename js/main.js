const randomNumber = function (minNumber,maxNumber) {

  if(minNumber>=maxNumber){
    return Math.floor(Math.random() * (maxNumber - minNumber+1) ) + minNumber;
  }
  return Math.floor(Math.random() * (minNumber - maxNumber+1) ) + maxNumber;
};
randomNumber(2,10);

const lengthString=function(checkString, maxLength){
  if (checkString<=maxLength) {
    return true;
  }
  return false;
};
lengthString(10,11);
