private var controller:CharacterController;
private var robotCon:RobotController;

function Awake()
{
	//Register the controller variable with the character controller attached as a component to our player robot
	controller = GetComponent(CharacterController);
	robotCon = GetComponent(RobotController);
}

function Update () 
{
	if (Input.GetButtonDown("Fire1") && animation.IsPlaying("Idle")) {
		animation.CrossFade("Ranged"); // Used instead of animation.Play("Ranged");			
		animation.CrossFadeQueued("Idle"); // Play idle after firing; works if button held down.
	}
	else if (Input.GetButtonDown("Fire2") && animation.IsPlaying("Idle")) {
		animation.CrossFade("Spell");
		animation.CrossFadeQueued("Idle");
	}
	else if (Input.GetButtonDown("Fire3") && animation.IsPlaying("Idle")) {
		animation.CrossFade("Punch");
		animation.CrossFadeQueued("Idle");
	}
	else if (Input.GetButtonDown("Jump") ) {
		animation.CrossFade("Jump");
		animation.CrossFadeQueued("Idle");
	} 
	else if(Input.anyKey)
	{
		if ( animation.IsPlaying("Idle") && controller.isGrounded && Health.alive ) {
			if(Input.GetAxis("Vertical") > 0.2)
			{
				animation["Run"].speed = 1.0; //plays animation forwards
				robotCon.speed = 6.0;
				animation.CrossFade("Run");
			}
			else if(Input.GetAxis("Vertical") < -0.2)
			{
				animation["Walk"].speed = -1; //plays animation !forwards
				robotCon.speed = 2.0;
				animation.CrossFade("Walk");
			}
		}
	}
	else
	{
		animation.CrossFade("Idle");
	}
}