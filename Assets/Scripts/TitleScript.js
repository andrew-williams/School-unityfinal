var guiSkin:GUISkin;
var titleStage:int = 1;

private var firstRefresh:boolean = false;
private var _ms:MetaScript;
private var _ns:NetworkScript;
private var lastSize:Vector2 = Vector2(Screen.width, Screen.height);
private var screenSize:Vector2;

function Awake () {
	_ms = GameObject.Find("MetaHolder").GetComponent(MetaScript);
	_ns = GameObject.Find("NetworkManager").GetComponent(NetworkScript);
	UI.ResetUI( camera.main.aspect );
}

function Update () {
	screenSize = Vector2(Screen.width, Screen.height);
	if ( lastSize != screenSize ) {
		lastSize = screenSize;
		UI.ResetUI( camera.main.aspect );
	}
}

function OnGUI() {
	GUI.skin = guiSkin;
	switch ( titleStage ) {
		case 2: // New game screen.
			DoMultiplayerScreen();
			break;
		case 3: // Options screen.
			DoOptionsScreen();
			break;
		case 4: // Instructions screen.
			DoInstructionsScreen();
			break;
		case 5: // About screen.
			DoAboutScreen();
			break;
		default: // 1: Title screen.
			DoTitleScreen();
			break;
	}
}

private function DoTitleScreen() {
	GUI.skin.button.fontSize = UI.fontNmlSize;
	GUI.skin.button.normal.textColor = Color(1,1,1); // Change.
	if (GUI.Button(Rect(Screen.width/2 - UI.btnXlgW/2,Screen.height-UI.btnH*5.5,UI.btnXlgW,UI.btnH),"New Game"))
		titleStage = 2;
	if (GUI.Button(Rect(Screen.width/2 - UI.btnXlgW/2,Screen.height-UI.btnH*4,UI.btnXlgW,UI.btnH),"Instructions"))
		titleStage = 4;
	if (GUI.Button(Rect(UI.btnMedW,Screen.height-UI.btnH*2.5,UI.btnMedW,UI.btnH),"Options"))
		titleStage = 3;
	if (GUI.Button(Rect(Screen.width/2 - UI.btnXlgW/2,Screen.height-UI.btnH*2.5,UI.btnXlgW,UI.btnH),"Quit Game"))
		Application.Quit();
	if (GUI.Button(Rect(Screen.width - UI.btnMedW*2,Screen.height-UI.btnH*2.5,UI.btnMedW,UI.btnH),"About"))
		titleStage = 5;
}

private function DoMultiplayerScreen() {
	GUI.skin.button.fontSize = UI.fontNmlSize;
	GUI.skin.label.fontSize = UI.fontNmlSize;
	GUI.skin.textField.fontSize = UI.fontNmlSize;
	if ( !Network.isClient && !Network.isServer ) { // Game start/join screen.
		if ( !firstRefresh ) {
			_ns.RefreshHostList();
			firstRefresh = true;
		}
		if ( GUI.Button(Rect(Screen.width/2-UI.btnP*8, UI.btnH*1.5, UI.btnXxlW, UI.btnH),"Start MP Battle Server") && _ns.GetHostLength() < 6 ) {
			_ns.StartServer( 25001 + _ns.GetHostLength() );
			_ns.playerNum = 0;
			_ns.serverNum = _ns.GetHostLength();
			_ns.RefreshHostList();
		}
		GUI.Label(Rect(Screen.width/2+UI.btnP*0.33,UI.btnH*1.5, UI.btnLrgW, UI.btnH), "Battle Name:");
		_ns.gameName = GUI.TextField (Rect(Screen.width/2+UI.btnP*2, UI.btnH*1.5, UI.btnXxlW, UI.btnH), _ns.gameName, 48);
		if (GUI.Button(Rect(Screen.width/2-UI.btnP*8, UI.btnH*3, UI.btnXxlW, UI.btnH),"Refresh Battle List") )
			_ns.RefreshHostList();
		if ( _ns.GetHostLength() > 0 ) {
			for ( var fCtr:int = 0; fCtr < 6; fCtr++ ) {
				if ( true ) {
					GUI.TextField (Rect(Screen.width/2-UI.btnP*8.1, UI.btnH*4.55+((UI.btnH*1.25)*fCtr), UI.btnXxlW*2.7, UI.btnH*0.88), "", 0);
					GUI.Label(Rect(Screen.width/2-UI.btnP*8,UI.btnH*4.5+((UI.btnH*1.25)*fCtr),UI.btnXxlW*1.6,UI.btnH), "Battle #"+(fCtr+1)+":  "+"Alex's Superfantasticgame of Killerdoom");
					GUI.Label(Rect(Screen.width/2+UI.btnP*2,UI.btnH*4.5+((UI.btnH*1.25)*fCtr),UI.btnMedW,UI.btnH), "Players:  "+"0/64");
					if ( GUI.Button( Rect(Screen.width/2+UI.btnP*4,UI.btnH*4.65+((UI.btnH*1.25)*fCtr),UI.btnXlgW,UI.btnH*0.66),"Join Battle") &&
									 _ns.hostData[fCtr].connectedPlayers < 16 ) {
						_ns.playerNum = _ns.hostData[fCtr].connectedPlayers;
						_ns.serverNum = fCtr;
						Network.Connect( _ns.hostData[fCtr] );
						_ns.serverPort = _ns.hostData[fCtr].port;
					}
				}
			}
			/* for ( var fCtr:int = 0; fCtr < _ns.hostData.length; fCtr++ ) {
				if ( _ns.hostData[fCtr].playerLimit != 666 ) {
					GUI.Label(Rect(110,255+(60*fCtr),480,UI.btnH), "Battle:  "+_ns.hostData[fCtr].gameName+
							  "  ____________________________________________________________");
					GUI.Label(Rect(600,255+(60*fCtr),100,UI.btnH), "Players:  "+_ns.hostData[fCtr].connectedPlayers+"/64");
					if ( GUI.Button( Rect(723,264+(60*fCtr),200,UI.btnH*0.66),"Join Battle") &&
									 _ns.hostData[fCtr].connectedPlayers < 16 ) {
						_ns.playerNum = _ns.hostData[fCtr].connectedPlayers;
						_ns.serverNum = fCtr;
						Network.Connect( _ns.hostData[fCtr] );
						_ns.serverPort = _ns.hostData[fCtr].port;
					}
				}
			} */
		}
		if (GUI.Button(Rect(Screen.width/2-UI.btnXxlW/2,Screen.height-UI.btnH*2.5,UI.btnXxlW,UI.btnH),"Return to Main Menu")) {
			if ( Network.isClient )
				Network.Disconnect();
			else if ( Network.isServer ) 
				_ns.StopServer();
			else 
				titleStage = 1;
		}
	}
	else { // Lobby.
		
	}
}

private function DoOptionsScreen() {
	_ms.DoOptionsScreen( "Title", UI.bgMarginX, UI.bgMarginY, UI.btnH, UI.btnXxlW, UI.btnSmlW, UI.fontNmlSize );
}

private function DoInstructionsScreen() {
	if (GUI.Button(Rect(Screen.width/2-UI.btnXxlW/2,Screen.height-UI.btnH*2.5,UI.btnXxlW,UI.btnH),"Return to Main Menu"))
		titleStage = 1;
}

private function DoAboutScreen() {
	if (GUI.Button(Rect(Screen.width/2-UI.btnXxlW/2,Screen.height-UI.btnH*2.5,UI.btnXxlW,UI.btnH),"Return to Main Menu"))
		titleStage = 1;
}
