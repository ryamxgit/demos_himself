
var numerology = function() {
	
	var x = {A:1, J:1, S:1, B:2, K:2, T:2, C:3, L:3, U:3, D:4, 
		M:4, V:4, E:5, N:5, W:5, F:6, O:6, X:6, G:7, P:7, Y:7, H:8, 
		Q:8, Z:8, I:9, R:9};
	
	var calc = function(s) {
		var name = String.toUpperCase(s); //for example: TOM
		var nameScore = 0;
		
		for( var i = 0; i < name.length; i++ ) {
			var curChar = name.charAt( i );
			var curValue = self.x[ curChar ];
			nameScore = nameScore + curValue;
		}//for()
			
			
		console.log( "Total score for this name is: " + nameScore );

		var singleDigitScore = nameScore;
		while( singleDigitScore >= 10 ) {
			var total = 0;
			var str = '' + singleDigitScore;
			for( var i = 0; i < str.length; i++ ) {
				total = total + parseInt( str.charAt(i) );
			}//for()
			singleDigitScore = total;
		}//while
		return singleDigitScore;
	}
}
