var gameDiff:Array = [ "Easy", "Normal", "Hard" ];

public var matArray:Material[];

private var gameDiffIndex:int = 1;
private var qualityLevel:int;
private var qualityNames:String[];

function Awake() {
	DontDestroyOnLoad(transform.gameObject);
	qualityNames = QualitySettings.names;
	qualityLevel = QualitySettings.GetQualityLevel();
}

public function SetGameDiff( diffIn:int ) {
	gameDiffIndex += diffIn;
	if ( gameDiffIndex < 0 ) {
		gameDiffIndex = 0;
	}
	else if ( gameDiffIndex == gameDiff.length ) {
		gameDiffIndex = (gameDiff.length) - 1;
	}
}

public function GetGameDiff():int {
	return gameDiffIndex;
}

public function DoOptionsScreen( callerIn:String, mX:float, mY:float, bH:float, btnLW:float, btnSW:float, fN:int ) {
	if (GUI.Button(Rect(Screen.width/2-btnLW/2,Screen.height-bH*2.5,btnLW,bH),"Return to "+(callerIn == "Title"?"Main Menu":"Game"))) {
		if ( callerIn == "Title" ) {
			camera.main.GetComponent(TitleScript).titleStage = 1;
		}
		else {
			
		}
	}
}