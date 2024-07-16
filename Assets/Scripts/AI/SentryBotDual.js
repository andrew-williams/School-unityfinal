enum SentryDualAIState { Patrol=0, Attack=1 };

var isAvoiding:boolean = false;					// Flag for collision avoidance.
var speed:int = 2; 								// Robot's speed.
var wpDir:int = 1;				// 1 or -1.
var moveOpt:int = 2; 			// 0 = None, 1 = GoTo, 2 = Loop, 3 = PingPong.
var collideRange:float = 3.0;					// Distance to trigger collision avoidance.
var rotationSpeed:float = 1.0; 					// How fast the robot rotates.
var pickNextWaypointDistance:float = 2; 		// Works with the waypoint scripts.
var waypointArray:Transform[];
var waypointPosition:Vector3;

var attackDistance:float = 15.0;
var shootForce:float = 1000;
var hand:Transform;
var target:Transform;
var fireBall:Transform; 
var fireRate:float = 1.4;

private var stopPat:boolean = false;
private var controller:CharacterController;
private var wpIndex:int = 0;
private var nextFire:float = 0;
private var state:SentryDualAIState = SentryDualAIState.Patrol;
private var savedWaypoint:Vector3;
private var curWaypoint:Vector3;

function Start () {
	controller = GetComponent(CharacterController);
	UpdateWaypoint();
}

function Update () {
	ConnectWPs();
	CheckState();
	
	switch(state) {
		case SentryDualAIState.Patrol:
			Patrol();
			break;
		case SentryDualAIState.Attack:
			Attack();
			break;
	}
}

function CheckState() {
	var dist = ( target.position - transform.position ).magnitude;
	
	if( dist < attackDistance )
		state = SentryDualAIState.Attack;
	else
		state = SentryDualAIState.Patrol;

} 

function Patrol() {
	if ( moveOpt != 0 ) {
		DoCollideCheck();
		if ( !isAvoiding ) {
			if ( Vector3.Distance( curWaypoint, transform.position ) < pickNextWaypointDistance )
				UpdateWaypoint();
		}
		else if ( isAvoiding && Vector3.Distance( curWaypoint, transform.position ) < 1 ) {
			isAvoiding = false;
			curWaypoint = savedWaypoint;
			print("Stopped avoiding!");
		}
		MoveTowards( curWaypoint );
	}
	else {
		animation.CrossFade("Idle");
	}
}

private function UpdateWaypoint() {
	curWaypoint = waypointArray[wpIndex].position;
	wpIndex += wpDir;
	if ( moveOpt == 1 && stopPat ) {
		moveOpt = 0;
		stopPat = false;
	}
	else if ( moveOpt == 1 && wpIndex == waypointArray.Length ) {
		stopPat = true;
		wpIndex = 0;
	}
	else if ( moveOpt == 2 && wpIndex == waypointArray.Length ) {
		wpIndex = 0;
	}
	else if ( moveOpt == 3 && wpDir == 1 && wpIndex == waypointArray.Length ) {
		wpDir = -1;
		wpIndex = waypointArray.Length-1;
	}
	else if ( moveOpt == 3 && wpDir == -1 && wpIndex == 0 ) {
		wpDir = 1;
		wpIndex = 0;
	}
}

function RotateTowards( position:Vector3 ) { // Not being used.
	var direction:Vector3 = position - transform.position;
	direction.y = 0;
	
	if( direction.magnitude < 0.1 )
		return;
	// Getting rotation increment.
	transform.rotation = Quaternion.Slerp(transform.rotation, Quaternion.LookRotation(direction), 
										  rotationSpeed*Time.deltaTime); 
	transform.eulerAngles = Vector3(0,transform.eulerAngles.y,0); // Getting rid of X and Z and getting a normal angle
}

function MoveTowards( position:Vector3 ) {
	var direction:Vector3 = position - transform.position;
	direction.y = 0;
	
	if( direction.magnitude < 0.5 )
		return;
	// Getting rotation increment.
	transform.rotation = Quaternion.Slerp(transform.rotation, Quaternion.LookRotation(direction), 
										  rotationSpeed*Time.deltaTime); 
	transform.eulerAngles = Vector3(0,transform.eulerAngles.y,0); // Getting rid of X and Z and getting a normal angle
	
	var forward = transform.TransformDirection( Vector3.forward );
	var speedModifier = Vector3.Dot( forward, direction.normalized );
	
	speedModifier = Mathf.Clamp01( speedModifier );
	direction = forward * speed * speedModifier;
	
	controller.SimpleMove(direction);
	animation["Walk"].speed = speedModifier;
	animation.Play("Walk");
}

function Attack() {
	if ( nextFire == 0 ) {
		nextFire = 60;
		transform.LookAt(target);
		animation["Ranged"].speed = 2.0;
		animation.CrossFade("Ranged");
	}
	else if ( nextFire == 45 ) {
		var instanceBullet = Instantiate( fireBall, hand.position, Quaternion.identity );
		instanceBullet.rigidbody.AddForce( transform.forward * shootForce );
	}
	nextFire--;
}

function DoCollideCheck():boolean {
	var fore = transform.TransformDirection( Vector3.forward );
	var pos = transform.position + Vector3(0,0.5,0);
	var hit:RaycastHit;
	var foreHit:boolean = false;
	var cross:Vector3 = Vector3.zero;
	
	Debug.DrawRay( pos, fore * collideRange, Color.yellow);
	if ( Physics.Raycast( pos, fore, hit, collideRange ) ) {
		foreHit = true;
		cross = Vector3.Cross(hit.normal, -fore);
		if ( !isAvoiding ) {
			print("Storing old waypoint.");
			savedWaypoint = curWaypoint;
			isAvoiding = true;
		}
		if ( cross.y < 0 ) { // Negative. Turn left.
			curWaypoint = transform.position + transform.TransformDirection( Vector3(-1.5,0,2) );
		}
		else {
			curWaypoint = transform.position + transform.TransformDirection( Vector3(1.5,0,2) );
		}
		return true;
	}
	return false;
}

function ConnectWPs() {
	for ( var fCtr:int = 1; fCtr < waypointArray.Length; fCtr++ ) {
		Debug.DrawLine(waypointArray[fCtr-1].position, waypointArray[fCtr].position, Color.white);
	}
}

















