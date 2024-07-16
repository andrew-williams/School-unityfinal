enum SentryAIState { Patrol=0, Attack=1 };

var speed:int = 2; 								//robot's speed
var rotationSpeed:float = 1.0; 					//how fast the robot rotates
var pickNextWaypointDistance:float = 2.0; 		//works with the waypoint scripts
var oldWaypoint : Vector3;
var waypointPosition:Vector3;

var attackDistance:float = 15.0;
var shootForce:float = 1000;
var hand:Transform;
var target:Transform;
var fireBall:Transform; 
var fireRate:float = 1.4;

private var curWayPoint:AutoWayPoint;
private var controller:CharacterController;
private var nextFire:float = 0;
private var state:SentryAIState = SentryAIState.Patrol;

function Start () {
	controller = GetComponent(CharacterController);	
	UpdateWaypoint( true );
}

function Update () {
	CheckState();
	
	switch(state) {
		case SentryAIState.Patrol:
			Patrol();
			break;
		case SentryAIState.Attack:
			Attack();
			break;
	}
}

function CheckState() {
	var dist = ( target.position - transform.position ).magnitude;
	
	if( dist < attackDistance )
		state = SentryAIState.Attack;
	else
		state = SentryAIState.Patrol;

}

function Patrol() {
	if ( Vector3.Distance( waypointPosition, transform.position ) < pickNextWaypointDistance )
		UpdateWaypoint( false );
	MoveTowards( waypointPosition );
}

private function UpdateWaypoint( onStart:boolean ) {
	if ( onStart )
		curWayPoint = AutoWayPoint.FindClosest( transform.position );
	else 
		curWayPoint = PickNextWayPoint( curWayPoint );
	waypointPosition = curWayPoint.transform.position;
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

















