//Walk Speed
var speed:float = 6.0;
var rotSpeed:float = 200.0;
//Gravity for the player
var gravity:float = 20.0;
//This will store the player movement as X Y Z, so we register it as a Vector3
private var moveDirection:Vector3 = Vector3.zero; // Vector3(0,0,0)

private var controller:CharacterController;

function Awake()
{
	//Register the controller variable with the character controller attached as a component to our player robot
	controller = GetComponent(CharacterController);
}

function Update() 
{	
	//Don't move the character in mid-air because it's not super mario :D
	if (controller.isGrounded && Health.alive) {
		// We are grounded, so recalculate
		// move direction directly from axes
		
		//We just calculate the movement in Z/Vertical axis
		//You can also add strafe but our robot model doesn't have a strafe animation so...
		moveDirection = Vector3(0, 0, Input.GetAxis("Vertical"));
		moveDirection = transform.TransformDirection(moveDirection);
		
		//We multiply the outcome with our speed variable, so it's customizable in the editor now
		moveDirection *= speed;
	}
		
	//Rotate the player in Y axis based on the mouse X axis
	if(Health.alive)
	{
		var rotateY = (Input.GetAxis("Mouse X") * rotSpeed ) * Time.deltaTime;
		controller.transform.Rotate( 0, rotateY, 0);
		
		// Apply gravity
		//It's not mandatory, because I'm not adding jump to this project yet, and the scene has nowhere to fall, but let's just keep it for now
		moveDirection.y -= gravity * Time.deltaTime;
	
		// Move the controller
		//And finally we add the movement that we calculated earlier
		controller.Move(moveDirection * Time.deltaTime);
	}
}