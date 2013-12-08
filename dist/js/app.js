(function(){

// DISPLAY UI ELEMENTS
var btc_current = updater('btc-current', false )
,   btc_high    = updater('btc-high',    true  )
,   btc_low     = updater('btc-low',     true  );

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
function updater( name, noanimate ) {
    var node = PUBNUB.$(name);

    function fn(value) {
        var up   = { d          : 1,
                     ty         : -10,
                     background : 'rgba(92,184,92,0.8)',
                     color      : '#fff' };
        var down = { d          : 1,
                     ty         : 10,
                     background : 'rgba(217, 83, 79,0.8)',
                     color      : '#fff' };

        node.innerHTML = value;
        (fn.last != value) && !noanimate && animate( node, [
            (fn.last < value) ? up : down,
            { d          : 1,
              ty         : 0,
              background : 'transparent',
              color      : '#f90' }
        ] );
        fn.last = value;
    };

    fn.last = 0;
    fn.node = node;
    return fn;
}

})();
