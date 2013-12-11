(function(){

/*
    ---- TRADES & TICKERS: USAGE EXAMPLE ----

//  -- MTGOX TICKER DISPLAY -- 
PUBNUB.events.bind( 'trade.BTC', function(data) {
    console.log(data);
} );

// -- MTGOX TRADES (BUY/SELL) -- 
PUBNUB.events.bind( 'ticker.BTCUSD', function(data) {
    console.log(data);
} );

*/

// INITIALIZE PUBNUB
var pubnub = PUBNUB.init({
    subscribe_key : 'sub-c-50d56e1e-2fd9-11e3-a041-02ee2ddab7fe'
});

// MULTIPLEX SUBSCRIBE TO TICKER FEED AND ALSO TRADES FEED
pubnub.subscribe({
    backfill : true,
    channel  : [
        'd5f06780-30a8-4a48-a2f8-7ed181b4a13f', // TICKER
        'dbf1dee9-4f2e-4a08-8cb7-748919a71b21'  // TRADE (BUY/SELL)
    ],
    message  : function(message) {
        // FIRE EVENT WHEN DATA ARRIVES
        PUBNUB.events.fire( message.channel_name, message );
    }
});


// GET HISTORICAL DATA
var now = new Date();
now.setUTCHours(0);
now.setUTCMinutes(0);
now.setUTCSeconds(0);
now.setUTCMilliseconds(0);
var utc_now = now.getTime();

PUBNUB.each( (new Array(12)).join(',').split(','), function( _, d ) {
    var day = utc_now - 86400000 * d;
    pubnub.history({
        limit    : 1,
        channel  : 'd5f06780-30a8-4a48-a2f8-7ed181b4a13f',
        start    : day * 10000,
        callback : function(messages) {
            if (messages[0].length) PUBNUB.events.fire( 'ticker.HISTORY', {
                day  : day,
                data : messages[0][0]
            } );
        }
    })
} );




})();
