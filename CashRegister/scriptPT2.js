function checkCashRegister(price, cash, cid) {
  var changeDue = cash * 100 - price * 100;
  const totalDue = changeDue;
  var totalCID = 0;
  var increments = [10000,2000,1000,500,100,25,10,5,1];
  var dic = cid.reverse();
  // get rid of floats
  dic.forEach(function(denomination){return denomination[1] = Math.ceil(denomination[1] * 100)});
  var change = dic.map(function(denomination, index){
    totalCID += denomination[1];
    if (changeDue > increments[index] && denomination[1] > 0){
      if (changeDue >= denomination[1]){
        changeDue -= denomination[1];
        denomination[1] /= 100;
      }else if (denomination[1] > changeDue){
        // coins are the maximum number of denominations that we can use
        let coins = Math.trunc(changeDue / increments[index]);
        changeDue -= coins * increments[index];
        denomination[1] = (coins * increments[index]) / 100;
      }
    }else{
      denomination[1]=0;
    }
  })
  if ( totalDue === totalCID){
    return {status: "CLOSED", change: cid.reverse()};
  }
  if ( changeDue > 0 ){
    return {status: "INSUFFICIENT_FUNDS", change: []};
  }
  return {status: "OPEN", change: dic.filter(denomination => denomination[1] > 0)};
}
