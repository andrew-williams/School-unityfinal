public static class UI {
	var btnH:float = 0.0;
	var btnP:float = 0.0;
	var btnXxlW:float = 0.0;
	var btnXlgW:float = 0.0;
	var btnLrgW:float = 0.0;
	var btnMedW:float = 0.0;
	var btnSmlW:float = 0.0;
	var bgMarginX:float = 0.0;
	var bgMarginY:float = 0.0;
	var fontNmlSize:int = 0;
	var fontMedSize:int = 0;
	var fontSmlSize:int = 0;
		
	public function ResetUI( arIn:float ) {
		if ( arIn > 0.7 && arIn < 1.3 ) { // Squarish screen.
			fontNmlSize = Mathf.Round( ((Screen.width+Screen.height) / 2) * 0.022);
			fontMedSize = Mathf.Round( ((Screen.width+Screen.height) / 2) * 0.017);
			fontSmlSize = Mathf.Round( ((Screen.width+Screen.height) / 2) * 0.011);
		}
		else if ( Screen.height < Screen.width ) {
			fontNmlSize = Mathf.Round( Screen.height * 0.026);
			fontMedSize = Mathf.Round( Screen.height * 0.020);
			fontSmlSize = Mathf.Round( Screen.height * 0.014);
		}
		else {
			fontNmlSize = Mathf.Round( Screen.width * 0.022);
			fontMedSize = Mathf.Round( Screen.width * 0.017);
			fontSmlSize = Mathf.Round( Screen.width * 0.011);
		}
		btnH = Screen.height * 0.066; 			// ~50 @ 768px
		btnP = Screen.width * 0.05;				// ~50 @ 1024px
		btnXxlW = Screen.width * 0.3;			// ~300 @ 1024px
		btnXlgW = Screen.width * 0.2;			// ~200 @ 1024px
		btnLrgW = Screen.width * 0.15;			// ~150 @ 1024px
		btnMedW = Screen.width * 0.1;			// ~100 @ 1024px
		btnSmlW = Screen.width * 0.066;			// ~70 @ 1024px
		bgMarginX = Screen.width * 0.025;
		bgMarginY = Screen.height * 0.033;
	}
}