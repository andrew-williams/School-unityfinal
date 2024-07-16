enum AIState {Idle=0, Cautious=1, Scared=2};

var target:Transform;
var walkSpeed:float = 2.0;
var runSpeed:float = 8.0;
var awareDistance:float = 15.0;
var scaredDistance:float = 10.0;

private var controller:CharacterController;
private var state = AIState.Idle;
private var moveDirection = Vector3.zero;

function Awake () {
	controller = GetComponent(CharacterController);
}

function Update () {
	CheckState();
	switch (state) {
		case AIState.Idle:
			PlayIdle();
			break;
		case AIState.Cautious:
		case AIState.Scared:
			RunAway();
			break;
	}
	controller.SimpleMove(moveDirection * Time.deltaTime);
}

function CheckState() {
	// What state should the Robot be in
	var dist:float = ( target.position - transform.position ).magnitude;
	if ( dist > awareDistance )
		state = AIState.Idle;
	else if ( dist > scaredDistance )
		state = AIState.Cautious;
	else 
		state = AIState.Scared;
}

function PlayIdle() {
	//Robot is not scared
	moveDirection = Vector3.zero;
	animation.CrossFade("Idle");
}

function RunAway() {
	//Robot is scared
	transform.LookAt(target);
	transform.eulerAngles.y += -180;
	
	moveDirection = Vector3(0,0,40);
	moveDirection = transform.TransformDirection(moveDirection);
	if ( state == AIState.Scared ) {
		moveDirection *= runSpeed;
		animation.CrossFade("Run");
	}
	else {
		moveDirection *= walkSpeed;
		animation.CrossFade("Walk");
	}
}







