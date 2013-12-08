(function(){

// DISPLAY UI ELEMENTS
var btc_current = updater('btc-current')
,   btc_high    = updater('btc-high')
,   btc_low     = updater('btc-low');


// MTGOX TICKER DISPLAY UPDATES
PUBNUB.events.bind( 'ticker.BTCUSD', function(data) {
    // SET CURRENT LOW AND HIGH VALUES
    btc_current(data.ticker.last.display_short);
    btc_high(   data.ticker.high.display_short);
    btc_low(    data.ticker.low.display_short);
} );

// MTGOX TRADES (BUY/SELL)
PUBNUB.events.bind( 'ticker.BTCUSD', function(data) {
    //console.log(data);
} );

// UPDATE UI USER INTERFACE VALUES
function updater(name) {
    var node = PUBNUB.$(name);
    return function (value) { node.innerHTML = value }
}

})();
