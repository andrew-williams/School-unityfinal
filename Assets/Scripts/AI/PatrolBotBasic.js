#pragma strict

var speed:int = 2; 								//robot's speed
var rotationSpeed:float = 1.0; 					//how fast the robot rotates
var pickNextWaypointDistance:float = 2.0; 		//works with the waypoint scripts
var oldWaypoint : Vector3;
var waypointPosition:Vector3;

private var controller:CharacterController;

function Start() {
	// Start patrol
	controller = GetComponent(CharacterController);
	StartPatrol();
}

function StartPatrol() {
	var curWayPoint:AutoWayPoint = AutoWayPoint.FindClosest( transform.position );
	while( true ) {
		waypointPosition = curWayPoint.transform.position;
		if ( Vector3.Distance( waypointPosition, transform.position ) < pickNextWaypointDistance ) 
			curWayPoint = PickNextWayPoint( curWayPoint );
		MoveTowards( waypointPosition );
		yield;
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
	print(speedModifier);
	direction = forward * speed * speedModifier;
	
	controller.SimpleMove(direction);
	animation["Walk"].speed = speedModifier;
	animation.Play("Walk");
}

function PickNextWayPoint( currentWaypoint:AutoWayPoint):AutoWayPoint {
	var forward = transform.TransformDirection( Vector3.forward );
	var best = currentWaypoint;
	var bestDot = -10.0; // Will be used for dot product.
	
	for ( var cur:AutoWayPoint in currentWaypoint.connected ) {
		var direction = Vector3.Normalize( cur.transform.position - transform.position);
		var dot = Vector3.Dot(direction,forward);
		
		if ( dot > bestDot && cur !=currentWaypoint ) {
			bestDot = dot;
			best = cur;
		}
	}
	return best;
}

















