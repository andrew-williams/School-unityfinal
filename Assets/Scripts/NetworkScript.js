var disconnecting:boolean = false;
var refreshTime:float;
var playerNum:int = 0;
var serverNum:int = 0;
var serverPort:int;
var teamNum:int;
var hostData:HostData[];
var gameDesc:String = "A multiplayer capture and hold team-based game.";
var gameName:String = "Squad Stronghold";
var gameShortName:String = "SSGame";

private var refreshing:boolean = false;

function Awake() {
	DontDestroyOnLoad(transform.gameObject);
}

function Update() {
	if ( refreshing ) {
		refreshTime -= Time.deltaTime;
		if ( MasterServer.PollHostList().Length != 0 ) {
			refreshTime = 0.0;
			hostData = MasterServer.PollHostList();
			UpdateServerNum();
			refreshing = false;
			if ( disconnecting && hostData[serverNum].playerLimit == 666 ) {
				Network.Disconnect();
				MasterServer.UnregisterHost(); // Doesn't work currently.
				disconnecting = false;
			}
		}
		if ( refreshTime <= 0 ) {
			if ( MasterServer.PollHostList().Length == 0 )
				print( "No hosts found..." );
			refreshTime = 0.0;
			refreshing = false;
		}
	}
}

function StartServer( portIn:int ) {
	serverPort = portIn;
	Network.InitializeServer( 63, portIn, !Network.HavePublicAddress );
	MasterServer.RegisterHost(gameShortName, gameName, gameDesc);
}

function StopServer() {
	Network.maxConnections = 665;
	RefreshHostList();
	disconnecting = true;
}

function UpdateServerNum() {
	for ( var fCtr:int = 0; fCtr < hostData.length; fCtr++ ) {
		if ( serverPort == hostData[fCtr].port ) 
			serverNum = fCtr; 
	}
}

function GetHostLength():int {
	var retLength:int = 0;
	
	if ( hostData ) 
		retLength = hostData.length;
	return retLength;
}

function OnConnectedToServer() {
	networkView.RPC("RefreshHostList", RPCMode.AllBuffered);
}

function OnDisconnectedFromServer() {
	networkView.RPC("RefreshHostList", RPCMode.AllBuffered);
	networkView.RPC("UpdatePlayerNums", RPCMode.All, playerNum);
	if ( Application.loadedLevelName == "TitleScene" ) {
		camera.main.GetComponent(TitleScript).titleStage = 1;
	}
	else 
		Application.LoadLevel("TitleScene");
}

function OnServerInitialized() {
	//SpawnPlayer();
}

function SpawnPlayer() {
	//Network.Instantiate( playerPrefab, spawnObject.position, Quaternion.identity, 0 );
}

function StartGame() {
	networkView.RPC("DoStartGame", RPCMode.All);
}

@RPC
function RefreshHostList() {
	MasterServer.RequestHostList(gameShortName);
	refreshing = true;
	refreshTime = 10.0;
}

@RPC
function UpdatePlayerNums( indexIn:int ) {
	if ( playerNum > indexIn ) 
		playerNum--;
}

@RPC
function DoStartGame() {
	
}