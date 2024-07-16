enum EnemyAIState { Idle=0, Chase=1, Attack=2 };

var attackDistance:float = 10.0;
var chaseDistance:float = 15.0; 
var runSpeed:float = 6.0;
var shootForce:float = 1000;
var hand:Transform;
var target:Transform;
var fireBall:Transform; 
var fireRate:float = 1.4;

private var state = EnemyAIState.Idle;
private var controller:CharacterController;
private var nextFire:float = 0;
private var moveDirection:Vector3 = Vector3.zero;

function Awake () {
	controller = GetComponent(CharacterController);
}

function Update () {
	CheckState();
	switch(state) {
		case EnemyAIState.Idle:
			PlayIdle();
			break;
		case EnemyAIState.Chase:
			Chase();
			break;
		case EnemyAIState.Attack:
			Attack();
			break;
	}
	controller.SimpleMove( moveDirection * Time.deltaTime );
}

function CheckState() {
	var dist:float = ( target.position - transform.position ).magnitude;
	
	if( dist < attackDistance )
		state = EnemyAIState.Attack;
	else if ( dist < chaseDistance ) 
		state = EnemyAIState.Chase;
	else
		state = EnemyAIState.Idle;

}

function PlayIdle() {
	//Robot is not attacking
	var rand:int = Random.Range(0,500);
	moveDirection = Vector3.zero;
	if ( rand == 0 ) {
		animation.CrossFade("IdleTap");
		animation.wrapMode = WrapMode.Once;
	}
	else {
		if ( !animation.IsPlaying("IdleTap") ) {
			animation.CrossFade("Idle");
			animation.wrapMode = WrapMode.Once;
		}
	}
}

function Chase() {
	transform.LookAt(target);
	moveDirection = Vector3(0,0,40);
	moveDirection = transform.TransformDirection(moveDirection);
	moveDirection *= runSpeed;
	animation.CrossFade("Run");
}

function Attack() {
	moveDirection = Vector3.zero;
	transform.LookAt(target);
	if ( nextFire == 0 ) {
		nextFire = 60;
		animation["Ranged"].speed = 2.0;
		animation.CrossFade("Ranged");
	}
	else if ( nextFire == 45 ) {
		var instanceBullet = Instantiate( fireBall, hand.position, Quaternion.identity );
		instanceBullet.rigidbody.AddForce( transform.forward * shootForce );
	}
	nextFire--;
}
